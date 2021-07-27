
package net.woolf.hplpl.item;

import net.woolf.hplpl.gui.GuiBinderGui;
import net.woolf.hplpl.gui.BinderInventory;
import net.woolf.hplpl.creativetab.TabWoolfAddons;
import net.woolf.hplpl.Hapeladdons;
import net.woolf.hplpl.ElementsHapeladdons;

import net.minecraftforge.fml.relauncher.SideOnly;
import net.minecraftforge.fml.relauncher.Side;
import net.minecraftforge.fml.common.registry.GameRegistry;
import net.minecraftforge.common.capabilities.ICapabilityProvider;
import net.minecraftforge.client.model.ModelLoader;
import net.minecraftforge.client.event.ModelRegistryEvent;

import net.minecraft.world.World;
import net.minecraft.util.EnumHand;
import net.minecraft.util.ActionResult;
import net.minecraft.nbt.NBTTagCompound;
import net.minecraft.item.ItemStack;
import net.minecraft.item.Item;
import net.minecraft.entity.player.EntityPlayer;
import net.minecraft.client.renderer.block.model.ModelResourceLocation;
import net.minecraft.block.state.IBlockState;

import javax.annotation.Nullable;

@ElementsHapeladdons.ModElement.Tag
public class ItemBinder extends ElementsHapeladdons.ModElement {
	@GameRegistry.ObjectHolder("hapeladdons:binder")
	public static final Item block = null;
	public ItemBinder(ElementsHapeladdons instance) {
		super(instance, ElementsHapeladdons.getNext());
	}

	@Override
	public void initElements() {
		elements.items.add(() -> new ItemCustom());
	}

	@SideOnly(Side.CLIENT)
	@Override
	public void registerModels(ModelRegistryEvent event) {
		ModelLoader.setCustomModelResourceLocation(block, 0, new ModelResourceLocation("hapeladdons:binder", "inventory"));
	}
	public static class ItemCustom extends Item {
		public ItemCustom() {
			setMaxDamage(0);
			maxStackSize = 1;
			setUnlocalizedName("binder");
			setRegistryName("binder");
			setCreativeTab(TabWoolfAddons.tab);
		}

		@Override
		public ActionResult<ItemStack> onItemRightClick(World world, EntityPlayer player, EnumHand hand) {
			if(player.getHeldItem(hand) != player.getHeldItemMainhand()){
				return super.onItemRightClick(world, player, hand);
			}
			testNBT(player.getHeldItem(hand));
			player.openGui(Hapeladdons.instance, GuiBinderGui.GUIID, world, 0, 0, 0);
			return super.onItemRightClick(world, player, hand);
		}

		public static void testNBT(ItemStack binderStack) {
			if (binderStack.getTagCompound() == null) {// Create nbt if not already existing
				NBTTagCompound nbtTag = new NBTTagCompound();
				nbtTag.setInteger("page", 0);
				if(nbtTag.getCompoundTag("Items") != null){
					NBTTagCompound old = nbtTag.getCompoundTag("Items");
					nbtTag.setTag("Items0", old);
					nbtTag.removeTag("Items");
				}
				binderStack.setTagCompound(nbtTag);
			}
		}

		public static int changePageBy(ItemStack binderStack, int count) {
			int current = getCurrentPage(binderStack);
			if(current + count < 0 || current + count > 3){
				return current;
			}
			return setCurrentPage(binderStack, current + count);
		}

		public static int setCurrentPage(ItemStack binderStack, int page) {
			testNBT(binderStack);
			NBTTagCompound nbtTag = binderStack.getTagCompound();
			nbtTag.setInteger("page", page);
			binderStack.setTagCompound(nbtTag);
			binderStack.writeToNBT(nbtTag);
	
			return getCurrentPage(binderStack);
		}
	
		public static int getCurrentPage(ItemStack binderStack) {
			testNBT(binderStack);
	
			return binderStack.getTagCompound().getInteger("page");
		}

		

		@Nullable
		public ICapabilityProvider initCapabilities(ItemStack stack, @Nullable NBTTagCompound nbt) {
			return new BinderInventory();
		}

		@Override
		public int getItemEnchantability() {
			return 0;
		}

		@Override
		public int getMaxItemUseDuration(ItemStack itemstack) {
			return 0;
		}

		@Override
		public float getDestroySpeed(ItemStack par1ItemStack, IBlockState par2Block) {
			return 1F;
		}
	}
}
