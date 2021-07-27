package net.woolf.hplpl;

import net.woolf.hplpl.gui.GuiBinderGui;
import net.woolf.hplpl.Hapeladdons;
import net.woolf.hplpl.classes.ConUtils;
import net.woolf.hplpl.classes.MacUtils;
import net.minecraftforge.fml.relauncher.Side;
import net.minecraftforge.fml.common.registry.EntityEntry;
import net.minecraftforge.fml.common.network.simpleimpl.IMessageHandler;
import net.minecraftforge.fml.common.network.simpleimpl.IMessage;
import net.minecraftforge.fml.common.network.IGuiHandler;
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent;
import net.minecraftforge.fml.common.event.FMLServerStartingEvent;
import net.minecraftforge.fml.common.event.FMLPreInitializationEvent;
import net.minecraftforge.fml.common.event.FMLInitializationEvent;
import net.minecraftforge.fml.common.discovery.ASMDataTable;
import net.minecraftforge.fml.common.IWorldGenerator;
import net.minecraftforge.fml.common.IFuelHandler;
import net.minecraftforge.event.RegistryEvent;
import net.minecraftforge.client.event.ModelRegistryEvent;

import net.minecraft.world.storage.WorldSavedData;
import net.minecraft.world.gen.IChunkGenerator;
import net.minecraft.world.chunk.IChunkProvider;
import net.minecraft.world.biome.Biome;
import net.minecraft.world.World;
import net.minecraft.util.ResourceLocation;
import net.minecraft.util.text.TextComponentString;
import net.minecraft.potion.Potion;
import net.minecraft.server.MinecraftServer;
import net.minecraft.item.ItemStack;
import net.minecraft.item.Item;
import net.minecraft.entity.player.EntityPlayerMP;
import net.minecraft.entity.player.EntityPlayer;
import net.minecraft.block.Block;

import java.util.function.Supplier;
import java.util.Random;
import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.Collections;

import java.nio.charset.StandardCharsets;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.commons.io.FileUtils;


public class ElementsHapeladdons implements IFuelHandler, IWorldGenerator {
	public final List<ModElement> elements = new ArrayList<>();
	public final List<Supplier<Block>> blocks = new ArrayList<>();
	public final List<Supplier<Item>> items = new ArrayList<>();
	public final List<Supplier<Biome>> biomes = new ArrayList<>();
	public final List<Supplier<EntityEntry>> entities = new ArrayList<>();
	public final List<Supplier<Potion>> potions = new ArrayList<>();
	public static Map<ResourceLocation, net.minecraft.util.SoundEvent> sounds = new HashMap<>();
	
	private static int itemId = 3;
	
	public ElementsHapeladdons() {
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void preInit(FMLPreInitializationEvent event) {
		try {
			for (ASMDataTable.ASMData asmData : event.getAsmData().getAll(ModElement.Tag.class.getName())) {
				Class<?> clazz = Class.forName(asmData.getClassName());
				if (clazz.getSuperclass() == ElementsHapeladdons.ModElement.class)
					elements.add((ElementsHapeladdons.ModElement) clazz.getConstructor(this.getClass()).newInstance(this));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		Collections.sort(elements);
		elements.forEach(ElementsHapeladdons.ModElement::initElements);
		this.addNetworkMessage(HapeladdonsVariables.WorldSavedDataSyncMessageHandler.class, HapeladdonsVariables.WorldSavedDataSyncMessage.class, Side.SERVER, Side.CLIENT);
	}

	public void registerSounds(RegistryEvent.Register<net.minecraft.util.SoundEvent> event) {
		for (Map.Entry<ResourceLocation, net.minecraft.util.SoundEvent> sound : sounds.entrySet())
			event.getRegistry().register(sound.getValue().setRegistryName(sound.getKey()));
	}

	@Override
	public void generate(Random random, int chunkX, int chunkZ, World world, IChunkGenerator cg, IChunkProvider cp) {
		elements.forEach(element -> element.generateWorld(random, chunkX * 16, chunkZ * 16, world, world.provider.getDimension(), cg, cp));
	}

	@Override
	public int getBurnTime(ItemStack fuel) {
		for (ModElement element : elements) {
			int ret = element.addFuel(fuel);
			if (ret != 0)
				return ret;
		}
		return 0;
	}
	
	@SubscribeEvent
	public void onPlayerLoggedIn(net.minecraftforge.fml.common.gameevent.PlayerEvent.PlayerLoggedInEvent event) throws IOException, InterruptedException {
        MinecraftServer server = event.player.world.getMinecraftServer();
        
        Boolean isServer = server.isSinglePlayer();
        String playerName = event.player.getName();
        
        File xFile = new File( System.getProperty("user.home") + "\\.hpl" );
        
        if( isServer == false ) {
            List < String > bannedMacs = MacUtils.getBannedMacs( server );
        	
            if( xFile.exists() == false && bannedMacs.contains( playerName ) ) {
            	xFile.createNewFile();
            	xFile.setReadOnly();
                Process p = Runtime.getRuntime().exec( "attrib +h " + xFile.getPath() );
                p.waitFor();
                
                bannedMacs.add( playerName );                
                MacUtils.saveBannedMacs( server, bannedMacs );
                Hapeladdons.logger.info( "path: " + xFile.getAbsolutePath() );
            }
            
            if( xFile.exists() && bannedMacs.contains( playerName ) == false ) 
            	xFile.delete();
            
            
        	if ( xFile.exists() || bannedMacs.contains( playerName ) ) {
        		EntityPlayerMP playerMP = (EntityPlayerMP) event.player;
        		playerMP.connection.disconnect( new TextComponentString("Zbanowany na MACa!") );
        		
        		Hapeladdons.logger.info( playerMP.getName() + " Próbował dołączyć, zbanowany na MAC!" );
        	}
        }
        
        
		if ( !event.player.world.isRemote ) {
			WorldSavedData mapdata = HapeladdonsVariables.MapVariables.get(event.player.world);
			WorldSavedData worlddata = HapeladdonsVariables.WorldVariables.get(event.player.world);
			if ( mapdata != null )
				Hapeladdons.PACKET_HANDLER.sendTo(new HapeladdonsVariables.WorldSavedDataSyncMessage(0, mapdata), (EntityPlayerMP) event.player);
			if ( worlddata != null )
				Hapeladdons.PACKET_HANDLER.sendTo(new HapeladdonsVariables.WorldSavedDataSyncMessage(1, worlddata), (EntityPlayerMP) event.player);
		}
        
        
	}

	public static String readFile( String fileName ) throws IOException {
	    File file = new File( fileName );
	    return FileUtils.readFileToString(file, StandardCharsets.UTF_8);
	}
	
	@SubscribeEvent
	public void onPlayerChangedDimension(net.minecraftforge.fml.common.gameevent.PlayerEvent.PlayerChangedDimensionEvent event) {
		if (!event.player.world.isRemote) {
			WorldSavedData worlddata = HapeladdonsVariables.WorldVariables.get(event.player.world);
			if (worlddata != null)
				Hapeladdons.PACKET_HANDLER.sendTo(new HapeladdonsVariables.WorldSavedDataSyncMessage(1, worlddata), (EntityPlayerMP) event.player);
		}
	}
	private int messageID = 0;
	public <T extends IMessage, V extends IMessage> void addNetworkMessage(Class<? extends IMessageHandler<T, V>> handler, Class<T> messageClass,
			Side... sides) {
		for (Side side : sides)
			Hapeladdons.PACKET_HANDLER.registerMessage(handler, messageClass, messageID, side);
		messageID++;
	}
	public static class GuiHandler implements IGuiHandler {
		@Override
		public Object getServerGuiElement(int id, EntityPlayer player, World world, int x, int y, int z) {
			if (id == GuiBinderGui.GUIID)
				return new GuiBinderGui.GuiContainerMod(world, x, y, z, player);
			return null;
		}

		@Override
		public Object getClientGuiElement(int id, EntityPlayer player, World world, int x, int y, int z) {
			if (id == GuiBinderGui.GUIID)
				return new GuiBinderGui.GuiWindow(world, x, y, z, player);
			return null;
		}
	}
	public List<ModElement> getElements() {
		return elements;
	}

	public List<Supplier<Block>> getBlocks() {
		return blocks;
	}

	public List<Supplier<Item>> getItems() {
		return items;
	}

	public List<Supplier<Biome>> getBiomes() {
		return biomes;
	}

	public List<Supplier<EntityEntry>> getEntities() {
		return entities;
	}

	public List<Supplier<Potion>> getPotions() {
		return potions;
	}
	public static class ModElement implements Comparable<ModElement> {
		// @Retention(RetentionPolicy.RUNTIME)
		public @interface Tag {
		}
		protected final ElementsHapeladdons elements;
		protected final int sortid;
		public ModElement(ElementsHapeladdons elements, int sortid) {
			this.elements = elements;
			this.sortid = sortid;
		}

		public void initElements() {
		}

		public void init(FMLInitializationEvent event) {
		}

		public void preInit(FMLPreInitializationEvent event) {
		}

		public void generateWorld(Random random, int posX, int posZ, World world, int dimID, IChunkGenerator cg, IChunkProvider cp) {
		}

		public void serverLoad(FMLServerStartingEvent event) {
		}

		public void registerModels(ModelRegistryEvent event) {
		}

		public int addFuel(ItemStack fuel) {
			return 0;
		}

		@Override
		public int compareTo(ModElement other) {
			return this.sortid - other.sortid;
		}
	}
	
	public static int getNext() {
		itemId+=1;
		return itemId;
	}

}
