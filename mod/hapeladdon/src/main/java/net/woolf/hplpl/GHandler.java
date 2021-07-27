package net.woolf.hplpl;

import net.woolf.hplpl.gui.GuiBinderGui;

import net.minecraftforge.fml.common.event.FMLServerStartingEvent;
import net.minecraftforge.fml.common.event.FMLPreInitializationEvent;
import net.minecraftforge.fml.common.event.FMLInitializationEvent;
import net.minecraftforge.client.event.ModelRegistryEvent;
import net.minecraftforge.fml.common.network.IGuiHandler;

import net.minecraft.entity.player.EntityPlayer;
import net.minecraft.util.EnumHand;
import net.minecraft.world.gen.IChunkGenerator;
import net.minecraft.world.chunk.IChunkProvider;
import net.minecraft.world.World;

import java.util.Random;
import net.minecraft.item.ItemStack;

@ElementsHapeladdons.ModElement.Tag
public class GHandler implements IGuiHandler {
	public GHandler() {
	}

	@Override
	public Object getServerGuiElement(int id, EntityPlayer player, World world, int x, int y, int z) {
		if (id == GuiBinderGui.GUIID){
			ItemStack binderStack = player.getHeldItem(EnumHand.MAIN_HAND);
			
			return new GuiBinderGui.GuiContainerMod(world, x, y, z, player);
		}
		return null;
	}

	@Override
	public Object getClientGuiElement(int id, EntityPlayer player, World world, int x, int y, int z) {
		if (id == GuiBinderGui.GUIID){
			ItemStack binderStack = player.getHeldItem(EnumHand.MAIN_HAND);

			return new GuiBinderGui.GuiWindow(world, x, y, z, player);
		}
		return null;
	}

}
