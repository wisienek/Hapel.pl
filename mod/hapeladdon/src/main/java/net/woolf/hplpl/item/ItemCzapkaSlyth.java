
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
public class ItemCzapkaSlyth extends ElementsHapeladdons.ModElement {
	@GameRegistry.ObjectHolder("hapeladdons:czapkaslyth")
	public static final Item block = null;
	public ItemCzapkaSlyth(ElementsHapeladdons instance) {
		super(instance, ElementsHapeladdons.getNext());
	}

	@Override
	public void initElements() {
		elements.items.add(() -> new ItemCustom());
	}

	@SideOnly(Side.CLIENT)
	@Override
	public void registerModels(ModelRegistryEvent event) {
		ModelLoader.setCustomModelResourceLocation(block, 0, new ModelResourceLocation("hapeladdons:czapkaslyth", "inventory"));
	}
	public static class ItemCustom extends Item {
		public ItemCustom() {
			setMaxDamage(0);
			maxStackSize = 4;
			setUnlocalizedName("czapkaslyth");
			setRegistryName("czapkaslyth");
			setCreativeTab(TabWoolfAddons.tab);
		}

		@Override
		public int getItemEnchantability() {
			return 20;
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
