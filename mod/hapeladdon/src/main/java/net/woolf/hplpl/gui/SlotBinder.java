package net.woolf.hplpl.gui;

import net.minecraft.item.ItemStack;
import net.minecraftforge.items.IItemHandler;
import net.minecraftforge.items.SlotItemHandler;

import javax.annotation.Nonnull;

public class SlotBinder extends SlotItemHandler {

	public SlotBinder(IItemHandler inventory, int index, int xPosition, int yPosition) {
		super(inventory, index, xPosition, yPosition);
	}

	@Override
    public int getSlotStackLimit()
    {
        return 127;
    }

	@Nonnull
	@Override
	public ItemStack getStack() {
		return super.getStack();
	}

}