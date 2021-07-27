
package net.woolf.hplpl.item;

import net.woolf.hplpl.creativetab.TabWoolfAddons;
import net.woolf.hplpl.ElementsHapeladdons;

import net.minecraftforge.fml.relauncher.SideOnly;
import net.minecraftforge.fml.relauncher.Side;
import net.minecraftforge.fml.common.registry.GameRegistry;
import net.minecraftforge.client.model.ModelLoader;
import net.minecraftforge.client.event.ModelRegistryEvent;

import net.minecraft.item.ItemStack;
import net.minecraft.item.Item;
import net.minecraft.client.renderer.block.model.ModelResourceLocation;
import net.minecraft.block.state.IBlockState;

@ElementsHapeladdons.ModElement.Tag
public class ItemKosa extends ElementsHapeladdons.ModElement {
	@GameRegistry.ObjectHolder("hapeladdons:kosa")
	public static final Item block = null;
	public ItemKosa(ElementsHapeladdons instance) {
		super(instance, ElementsHapeladdons.getNext());
	}

	@Override
	public void initElements() {
		elements.items.add(() -> new ItemCustom());
	}

	@SideOnly(Side.CLIENT)
	@Override
	public void registerModels(ModelRegistryEvent event) {
		ModelLoader.setCustomModelResourceLocation(block, 0, new ModelResourceLocation("hapeladdons:kosa", "inventory"));
	}
	public static class ItemCustom extends Item {
		public ItemCustom() {
			setMaxDamage(8);
			maxStackSize = 1;
			setUnlocalizedName("kosa");
			setRegistryName("kosa");
			setCreativeTab(TabWoolfAddons.tab);
		}

		@Override
		public int getItemEnchantability() {
			return 25;
		}

		@Override
		public int getMaxItemUseDuration(ItemStack itemstack) {
			return 1600;
		}

		@Override
		public float getDestroySpeed(ItemStack par1ItemStack, IBlockState par2Block) {
			return 2F;
		}
	}
}
