package net.woolf.hplpl.gui;

import org.lwjgl.opengl.GL11;
import org.lwjgl.input.Keyboard;

import net.woolf.hplpl.item.ItemKartaczarodzieirare;
import net.woolf.hplpl.item.ItemKartaczarodzieilegendary;
import net.woolf.hplpl.item.ItemKartaczarodzieicommon;
import net.woolf.hplpl.item.ItemKartaCzarodzieiUncommon;
import net.woolf.hplpl.item.ItemKartaCzarodziei;
import net.woolf.hplpl.Hapeladdons;
import net.woolf.hplpl.ElementsHapeladdons;
import net.woolf.hplpl.item.ItemBinder;

import net.minecraftforge.fml.relauncher.Side;
import net.minecraftforge.fml.common.network.simpleimpl.MessageContext;
import net.minecraftforge.fml.common.network.simpleimpl.IMessageHandler;
import net.minecraftforge.fml.common.network.simpleimpl.IMessage;
import net.minecraftforge.fml.common.event.FMLPreInitializationEvent;
import net.minecraftforge.items.CapabilityItemHandler;

import net.minecraft.world.World;
import net.minecraft.util.math.BlockPos;
import net.minecraft.util.ResourceLocation;
import net.minecraft.item.ItemStack;
import net.minecraft.inventory.Slot;
import net.minecraft.inventory.Container;
import net.minecraft.entity.player.EntityPlayerMP;
import net.minecraft.entity.player.EntityPlayer;
import net.minecraft.client.gui.inventory.GuiContainer;
import net.minecraft.client.gui.GuiButton;
import net.minecraft.nbt.NBTTagCompound;
import net.minecraft.util.EnumHand;

import java.util.function.Supplier;
import java.util.Map;
import java.util.HashMap;

import java.io.IOException;
import net.minecraftforge.items.ItemStackHandler;
import net.minecraft.util.text.TextComponentString;

@ElementsHapeladdons.ModElement.Tag
public class GuiBinderGui extends ElementsHapeladdons.ModElement {
	public static int GUIID = 3;
	public static HashMap guistate = new HashMap();
	public GuiBinderGui(ElementsHapeladdons instance) {
		super(instance, ElementsHapeladdons.getNext());
	}

	@Override
	public void preInit(FMLPreInitializationEvent event) {
		elements.addNetworkMessage(GUIButtonPressedMessageHandler.class, GUIButtonPressedMessage.class, Side.SERVER);
		elements.addNetworkMessage(GUISlotChangedMessageHandler.class, GUISlotChangedMessage.class, Side.SERVER);
	}
	public static class GuiContainerMod extends Container implements Supplier<Map<Integer, Slot>> {
		//private IInventory internal;
		private ItemStackHandler internal;
		private ItemStack binderStack;
		private World world;
		private EntityPlayer entity;
		private int x, y, z;
		private Map<Integer, Slot> customSlots = new HashMap<>();
		public GuiContainerMod(World world, int x, int y, int z, EntityPlayer player) {
			this.world = world;
			this.entity = player;
			this.x = x;
			this.y = y;
			this.z = z;
			this.binderStack = player.getHeldItem(EnumHand.MAIN_HAND);
			this.internal = (ItemStackHandler) binderStack.getCapability(CapabilityItemHandler.ITEM_HANDLER_CAPABILITY, null);
			
			ItemBinder.ItemCustom.testNBT(binderStack);
			readFromNBT(binderStack.getTagCompound());
			ItemBinder.ItemCustom.testNBT(binderStack);
			/*
			this.internal = new InventoryBasic("binder", true, 72);
			TileEntity ent = world.getTileEntity(new BlockPos(x, y, z));
			if (ent instanceof IInventory)
				this.internal = (IInventory) ent;
			*/

				
			this.customSlots.put(0, this.addSlotToContainer(new SlotBinder(internal, 0, 7, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(1, this.addSlotToContainer(new SlotBinder(internal, 1, 7, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(2, this.addSlotToContainer(new SlotBinder(internal, 2, 7, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(3, this.addSlotToContainer(new SlotBinder(internal, 3, 7, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(4, this.addSlotToContainer(new SlotBinder(internal, 4, 7, 78) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(5, this.addSlotToContainer(new SlotBinder(internal, 5, 7, 96) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(6, this.addSlotToContainer(new SlotBinder(internal, 6, 7, 114) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(7, this.addSlotToContainer(new SlotBinder(internal, 7, 7, 132) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(8, this.addSlotToContainer(new SlotBinder(internal, 8, 7, 150) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(9, this.addSlotToContainer(new SlotBinder(internal, 9, 25, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(10, this.addSlotToContainer(new SlotBinder(internal, 10, 25, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(11, this.addSlotToContainer(new SlotBinder(internal, 11, 25, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(12, this.addSlotToContainer(new SlotBinder(internal, 12, 25, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(13, this.addSlotToContainer(new SlotBinder(internal, 13, 25, 78) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(14, this.addSlotToContainer(new SlotBinder(internal, 14, 25, 96) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(15, this.addSlotToContainer(new SlotBinder(internal, 15, 25, 114) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(16, this.addSlotToContainer(new SlotBinder(internal, 16, 25, 132) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(17, this.addSlotToContainer(new SlotBinder(internal, 17, 25, 150) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieicommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(18, this.addSlotToContainer(new SlotBinder(internal, 18, 45, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(19, this.addSlotToContainer(new SlotBinder(internal, 19, 63, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(20, this.addSlotToContainer(new SlotBinder(internal, 20, 81, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(21, this.addSlotToContainer(new SlotBinder(internal, 21, 99, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(22, this.addSlotToContainer(new SlotBinder(internal, 22, 117, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(23, this.addSlotToContainer(new SlotBinder(internal, 23, 135, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(24, this.addSlotToContainer(new SlotBinder(internal, 24, 153, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(25, this.addSlotToContainer(new SlotBinder(internal, 25, 171, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(26, this.addSlotToContainer(new SlotBinder(internal, 26, 189, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(27, this.addSlotToContainer(new SlotBinder(internal, 27, 45, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(28, this.addSlotToContainer(new SlotBinder(internal, 28, 63, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(29, this.addSlotToContainer(new SlotBinder(internal, 29, 81, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(30, this.addSlotToContainer(new SlotBinder(internal, 30, 99, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(31, this.addSlotToContainer(new SlotBinder(internal, 31, 117, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(32, this.addSlotToContainer(new SlotBinder(internal, 32, 135, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(33, this.addSlotToContainer(new SlotBinder(internal, 33, 153, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(34, this.addSlotToContainer(new SlotBinder(internal, 34, 171, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(35, this.addSlotToContainer(new SlotBinder(internal, 35, 189, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodzieiUncommon.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(36, this.addSlotToContainer(new SlotBinder(internal, 36, 45, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(37, this.addSlotToContainer(new SlotBinder(internal, 37, 63, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(38, this.addSlotToContainer(new SlotBinder(internal, 38, 81, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(39, this.addSlotToContainer(new SlotBinder(internal, 39, 99, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(40, this.addSlotToContainer(new SlotBinder(internal, 40, 117, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(41, this.addSlotToContainer(new SlotBinder(internal, 41, 135, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(42, this.addSlotToContainer(new SlotBinder(internal, 42, 153, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(43, this.addSlotToContainer(new SlotBinder(internal, 43, 171, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(44, this.addSlotToContainer(new SlotBinder(internal, 44, 189, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(45, this.addSlotToContainer(new SlotBinder(internal, 45, 45, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(46, this.addSlotToContainer(new SlotBinder(internal, 46, 63, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(47, this.addSlotToContainer(new SlotBinder(internal, 47, 81, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(48, this.addSlotToContainer(new SlotBinder(internal, 48, 99, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(49, this.addSlotToContainer(new SlotBinder(internal, 49, 117, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(50, this.addSlotToContainer(new SlotBinder(internal, 50, 135, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(51, this.addSlotToContainer(new SlotBinder(internal, 51, 153, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(52, this.addSlotToContainer(new SlotBinder(internal, 52, 171, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(53, this.addSlotToContainer(new SlotBinder(internal, 53, 189, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieirare.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(54, this.addSlotToContainer(new SlotBinder(internal, 54, 209, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodziei.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(55, this.addSlotToContainer(new SlotBinder(internal, 55, 209, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodziei.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(56, this.addSlotToContainer(new SlotBinder(internal, 56, 209, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodziei.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(57, this.addSlotToContainer(new SlotBinder(internal, 57, 209, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodziei.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(58, this.addSlotToContainer(new SlotBinder(internal, 58, 209, 78) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodziei.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(59, this.addSlotToContainer(new SlotBinder(internal, 59, 209, 96) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodziei.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(60, this.addSlotToContainer(new SlotBinder(internal, 60, 209, 114) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodziei.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(61, this.addSlotToContainer(new SlotBinder(internal, 61, 209, 132) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodziei.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(62, this.addSlotToContainer(new SlotBinder(internal, 62, 209, 150) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaCzarodziei.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(63, this.addSlotToContainer(new SlotBinder(internal, 63, 227, 6) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieilegendary.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(64, this.addSlotToContainer(new SlotBinder(internal, 64, 227, 24) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieilegendary.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(65, this.addSlotToContainer(new SlotBinder(internal, 65, 227, 42) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieilegendary.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(66, this.addSlotToContainer(new SlotBinder(internal, 66, 227, 60) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieilegendary.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(67, this.addSlotToContainer(new SlotBinder(internal, 67, 227, 78) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieilegendary.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(68, this.addSlotToContainer(new SlotBinder(internal, 68, 227, 96) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieilegendary.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(69, this.addSlotToContainer(new SlotBinder(internal, 69, 227, 114) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieilegendary.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(70, this.addSlotToContainer(new SlotBinder(internal, 70, 227, 132) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieilegendary.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			this.customSlots.put(71, this.addSlotToContainer(new SlotBinder(internal, 71, 227, 150) {
				@Override
				public boolean isItemValid(ItemStack stack) {
					return (new ItemStack(ItemKartaczarodzieilegendary.block, (int) (1)).getItem() == stack.getItem());
				}
			}));
			int si;
			int sj;
			for (si = 0; si < 3; ++si)
				for (sj = 0; sj < 9; ++sj)
					this.addSlotToContainer(new Slot(player.inventory, sj + (si + 1) * 9, 37 + 8 + sj * 18, 12 + 84 + si * 18));
			for (si = 0; si < 9; ++si)
				this.addSlotToContainer(new Slot(player.inventory, si, 37 + 8 + si * 18, 12 + 142){
					@Override
					public boolean canTakeStack(EntityPlayer playerIn)
					{
						return false;
					}
						
				});
		}

		public Map<Integer, Slot> get() {
			return customSlots;
		}

		@Override
		public boolean canInteractWith(EntityPlayer player) {
			return true;//internal.isUsableByPlayer(player);
		}

		@Override
		public ItemStack transferStackInSlot(EntityPlayer playerIn, int index) {
			ItemStack itemstack = ItemStack.EMPTY;
			Slot slot = (Slot) this.inventorySlots.get(index);

			ItemBinder.ItemCustom.testNBT(playerIn.getActiveItemStack());
			
			if (slot != null && slot.getHasStack()) {
				ItemStack itemstack1 = slot.getStack();
				itemstack = itemstack1.copy();
				if (index < 72) {
					if (!this.mergeItemStack(itemstack1, 72, this.inventorySlots.size(), true)) {
						return ItemStack.EMPTY;
					}
					slot.onSlotChange(itemstack1, itemstack);
				} else if (!this.mergeItemStack(itemstack1, 0, 72, false)) {
					if (index < 72 + 27) {
						if (!this.mergeItemStack(itemstack1, 72 + 27, this.inventorySlots.size(), true)) {
							return ItemStack.EMPTY;
						}
					} else {
						if (!this.mergeItemStack(itemstack1, 72, 72 + 27, false)) {
							return ItemStack.EMPTY;
						}
					}
					return ItemStack.EMPTY;
				}
				if (itemstack1.getCount() == 0) {
					slot.putStack(ItemStack.EMPTY);
				} else {
					slot.onSlotChanged();
				}
				if (itemstack1.getCount() == itemstack.getCount()) {
					return ItemStack.EMPTY;
				}
				slot.onTake(playerIn, itemstack1);
			}
			return itemstack;
		}

		@Override /**
					 * Merges provided ItemStack with the first avaliable one in the
					 * container/player inventor between minIndex (included) and maxIndex
					 * (excluded). Args : stack, minIndex, maxIndex, negativDirection. /!\ the
					 * Container implementation do not check if the item is valid for the slot
					 */
		protected boolean mergeItemStack(ItemStack stack, int startIndex, int endIndex, boolean reverseDirection) {
			boolean flag = false;
			int i = startIndex;
			if (reverseDirection) {
				i = endIndex - 1;
			}
			if (stack.isStackable()) {
				while (!stack.isEmpty()) {
					if (reverseDirection) {
						if (i < startIndex) {
							break;
						}
					} else if (i >= endIndex) {
						break;
					}
					Slot slot = this.inventorySlots.get(i);
					ItemStack itemstack = slot.getStack();
					if (slot.isItemValid(itemstack) && !itemstack.isEmpty() && itemstack.getItem() == stack.getItem()
							&& (!stack.getHasSubtypes() || stack.getMetadata() == itemstack.getMetadata())
							&& ItemStack.areItemStackTagsEqual(stack, itemstack)) {
						int j = itemstack.getCount() + stack.getCount();
						int maxSize = Math.min(slot.getSlotStackLimit(), stack.getMaxStackSize());
						if (j <= maxSize) {
							stack.setCount(0);
							itemstack.setCount(j);
							slot.putStack(itemstack);
							flag = true;
						} else if (itemstack.getCount() < maxSize) {
							stack.shrink(maxSize - itemstack.getCount());
							itemstack.setCount(maxSize);
							slot.putStack(itemstack);
							flag = true;
						}
					}
					if (reverseDirection) {
						--i;
					} else {
						++i;
					}
				}
			}
			if (!stack.isEmpty()) {
				if (reverseDirection) {
					i = endIndex - 1;
				} else {
					i = startIndex;
				}
				while (true) {
					if (reverseDirection) {
						if (i < startIndex) {
							break;
						}
					} else if (i >= endIndex) {
						break;
					}
					Slot slot1 = this.inventorySlots.get(i);
					ItemStack itemstack1 = slot1.getStack();
					if (itemstack1.isEmpty() && slot1.isItemValid(stack)) {
						if (stack.getCount() > slot1.getSlotStackLimit()) {
							slot1.putStack(stack.splitStack(slot1.getSlotStackLimit()));
						} else {
							slot1.putStack(stack.splitStack(stack.getCount()));
						}
						slot1.onSlotChanged();
						flag = true;
						break;
					}
					if (reverseDirection) {
						--i;
					} else {
						++i;
					}
				}
			}
			return flag;
		}

		/*
		 * @Override public void onContainerClosed(EntityPlayer playerIn) {
		 * super.onContainerClosed(playerIn); if ((internal instanceof InventoryBasic)
		 * && (playerIn instanceof EntityPlayerMP)) { //this.clearContainer(playerIn,
		 * playerIn.world, internal); } }
		 */

		//tutaj			

		public void onContainerClosed(EntityPlayer player) {
			if (binderStack != null && binderStack.getTagCompound() != null){
				if( binderStack.isItemEqual(player.getHeldItem(EnumHand.MAIN_HAND)) ){
					writeToNBT(binderStack.getTagCompound()); // Save data
				}else{
					System.out.println("Nie zapisano klasera");
				}
			}
		super.onContainerClosed(player);	
		}


		
		public void writeToNBT(NBTTagCompound nbt) {
			nbt.setTag("Items" + binderStack.getTagCompound().getInteger("page"), internal.serializeNBT());
			//System.out.println(nbt);
		}


		public void readFromNBT(NBTTagCompound nbt) {
			if(nbt.getCompoundTag("Items" + nbt.getInteger("page")) != null)
				internal.deserializeNBT(nbt.getCompoundTag("Items" + nbt.getInteger("page")));
			//System.out.println(nbt);
		}


		
		public ItemStack getBinderStack() {
			return binderStack;
		}

		 
		private void slotChanged(int slotid, int ctype, int meta) {
		System.out.println("Slot zmieniony: " + slotid);
			if (this.world != null && this.world.isRemote) {
				Hapeladdons.PACKET_HANDLER.sendToServer(new GUISlotChangedMessage(slotid, x, y, z, ctype, meta));
				handleSlotAction(entity, slotid, ctype, meta, x, y, z);
			}
		}
	}

	public static class GuiWindow extends GuiContainer {
		private World world;
		private int x, y, z;
		private EntityPlayer entity;
		public GuiWindow(World world, int x, int y, int z, EntityPlayer entity) {
			super(new GuiContainerMod(world, x, y, z, entity));
			this.world = world;
			this.x = x;
			this.y = y;
			this.z = z;
			this.entity = entity;
			this.xSize = 250;
			this.ySize = 190;
		}
		private static final ResourceLocation texture = new ResourceLocation("hapeladdons:textures/bindergui.png");
		@Override
		public void drawScreen(int mouseX, int mouseY, float partialTicks) {
			this.drawDefaultBackground();
			super.drawScreen(mouseX, mouseY, partialTicks);
			this.renderHoveredToolTip(mouseX, mouseY);
		}

		@Override
		protected void drawGuiContainerBackgroundLayer(float par1, int par2, int par3) {
			GL11.glColor4f(1.0F, 1.0F, 1.0F, 1.0F);
			this.mc.renderEngine.bindTexture(texture);
			int k = (this.width - this.xSize) / 2;
			int l = (this.height - this.ySize) / 2;
			this.drawTexturedModalRect(k, l, 0, 0, this.xSize, this.ySize);
			zLevel = 100.0F;
		}

		@Override
		public void updateScreen() {
			super.updateScreen();
		}

		@Override
		protected void mouseClicked(int mouseX, int mouseY, int mouseButton) throws IOException {
			super.mouseClicked(mouseX, mouseY, mouseButton);
		}

		@Override
		protected void keyTyped(char typedChar, int keyCode) throws IOException {
			super.keyTyped(typedChar, keyCode);
		}

		@Override
		protected void drawGuiContainerForegroundLayer(int par1, int par2) {
		}

		@Override
		public void onGuiClosed() {
			super.onGuiClosed();
			Keyboard.enableRepeatEvents(false);
		}

		@Override
		public void initGui() {
			super.initGui();
			this.guiLeft = (this.width - 250) / 2;
			this.guiTop = (this.height - 190) / 2;
			Keyboard.enableRepeatEvents(true);
			//this.buttonList.clear();
						this.buttonList.add(new GuiButton(0, (this.width + this.xSize)/2, this.height/2 - 50, 20, 20, "-"));
			this.buttonList.add(new GuiButton(1, (this.width + this.xSize)/2, this.height/2 - 20, 20, 20, "+"));
		}

		@Override
		protected void actionPerformed(GuiButton button) {
			Hapeladdons.PACKET_HANDLER.sendToServer(new GUIButtonPressedMessage(button.id, x, y, z));
			handleButtonAction(entity, button.id, x, y, z);
		}

		@Override
		public boolean doesGuiPauseGame() {
			return false;
		}
	}

	public static class GUIButtonPressedMessageHandler implements IMessageHandler<GUIButtonPressedMessage, IMessage> {
		@Override
		public IMessage onMessage(GUIButtonPressedMessage message, MessageContext context) {
			EntityPlayerMP entity = context.getServerHandler().player;
			ItemStack binderStack = entity.getHeldItem(entity.getActiveHand());

			if (!binderStack.hasTagCompound() || !binderStack.getTagCompound().hasKey("page"))
				return null;

			int c = -1;
			int d = ItemBinder.ItemCustom.getCurrentPage(binderStack);
			if(message.buttonID==0){
				entity.closeContainer();
				ItemBinder.ItemCustom.changePageBy(binderStack, -1);
				c = ItemBinder.ItemCustom.getCurrentPage(binderStack);
			}else
			if(message.buttonID==1){
				entity.closeContainer();
				ItemBinder.ItemCustom.changePageBy(binderStack, 1);
				c = ItemBinder.ItemCustom.getCurrentPage(binderStack);
			}
			if(c!=d){
				entity.sendMessage(new TextComponentString("[Info] Zmieniono strone na: " + c)) ;
			}
			 
			entity.getServerWorld().addScheduledTask(() -> {
				int buttonID = message.buttonID;
				int x = message.x;
				int y = message.y;
				int z = message.z;
				handleButtonAction(entity, buttonID, x, y, z);
			});
			return null;
		}
	}

	public static class GUISlotChangedMessageHandler implements IMessageHandler<GUISlotChangedMessage, IMessage> {
		@Override
		public IMessage onMessage(GUISlotChangedMessage message, MessageContext context) {
			EntityPlayerMP entity = context.getServerHandler().player;
			entity.getServerWorld().addScheduledTask(() -> {
				int slotID = message.slotID;
				int changeType = message.changeType;
				int meta = message.meta;
				int x = message.x;
				int y = message.y;
				int z = message.z;
				handleSlotAction(entity, slotID, changeType, meta, x, y, z);
			});
			return null;
		}
	}

	public static class GUIButtonPressedMessage implements IMessage {
		int buttonID, x, y, z;
		public GUIButtonPressedMessage() {
		}

		public GUIButtonPressedMessage(int buttonID, int x, int y, int z) {
			this.buttonID = buttonID;
			this.x = x;
			this.y = y;
			this.z = z;
		}

		@Override
		public void toBytes(io.netty.buffer.ByteBuf buf) {
			buf.writeInt(buttonID);
			buf.writeInt(x);
			buf.writeInt(y);
			buf.writeInt(z);
		}

		@Override
		public void fromBytes(io.netty.buffer.ByteBuf buf) {
			buttonID = buf.readInt();
			x = buf.readInt();
			y = buf.readInt();
			z = buf.readInt();
		}
	}

	public static class GUISlotChangedMessage implements IMessage {
		int slotID, x, y, z, changeType, meta;
		public GUISlotChangedMessage() {
		}

		public GUISlotChangedMessage(int slotID, int x, int y, int z, int changeType, int meta) {
			this.slotID = slotID;
			this.x = x;
			this.y = y;
			this.z = z;
			this.changeType = changeType;
			this.meta = meta;
		}

		@Override
		public void toBytes(io.netty.buffer.ByteBuf buf) {
			buf.writeInt(slotID);
			buf.writeInt(x);
			buf.writeInt(y);
			buf.writeInt(z);
			buf.writeInt(changeType);
			buf.writeInt(meta);
		}

		@Override
		public void fromBytes(io.netty.buffer.ByteBuf buf) {
			slotID = buf.readInt();
			x = buf.readInt();
			y = buf.readInt();
			z = buf.readInt();
			changeType = buf.readInt();
			meta = buf.readInt();
		}
	}
	private static void handleButtonAction(EntityPlayer entity, int buttonID, int x, int y, int z) {
		World world = entity.world;
		// security measure to prevent arbitrary chunk generation
		if (!world.isBlockLoaded(new BlockPos(x, y, z)))
			return;
	}

	private static void handleSlotAction(EntityPlayer entity, int slotID, int changeType, int meta, int x, int y, int z) {
		World world = entity.world;
		// security measure to prevent arbitrary chunk generation
		if (!world.isBlockLoaded(new BlockPos(x, y, z)))
			return;
	}
}
