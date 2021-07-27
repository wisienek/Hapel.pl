
package net.woolf.hplpl.creativetab;

import net.woolf.hplpl.item.ItemPaczkaKart;
import net.woolf.hplpl.ElementsHapeladdons;

import net.minecraftforge.fml.relauncher.SideOnly;
import net.minecraftforge.fml.relauncher.Side;

import net.minecraft.item.ItemStack;
import net.minecraft.creativetab.CreativeTabs;

@ElementsHapeladdons.ModElement.Tag
public class TabWoolfAddons extends ElementsHapeladdons.ModElement {
	public TabWoolfAddons(ElementsHapeladdons instance) {
		super(instance, ElementsHapeladdons.getNext());
	}

	@Override
	public void initElements() {
		tab = new CreativeTabs("tabwoolfaddons") {
			@SideOnly(Side.CLIENT)
			@Override
			public ItemStack getTabIconItem() {
				return new ItemStack(ItemPaczkaKart.block, (int) (1));
			}

			@SideOnly(Side.CLIENT)
			public boolean hasSearchBar() {
				return true;
			}
		}.setBackgroundImageName("item_search.png");
	}
	public static CreativeTabs tab;
}
