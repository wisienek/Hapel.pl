package net.woolf.hplpl;

import net.minecraftforge.fml.relauncher.SideOnly;
import net.woolf.hplpl.commands.banMac;
import net.woolf.hplpl.events.EventHandler;
import net.minecraftforge.fml.relauncher.Side;
import net.minecraftforge.fml.common.registry.GameRegistry;
import net.minecraftforge.fml.common.registry.EntityEntry;
import net.minecraftforge.fml.common.network.simpleimpl.SimpleNetworkWrapper;
import net.minecraftforge.fml.common.network.NetworkCheckHandler;
import net.minecraftforge.fml.common.network.NetworkRegistry;
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent;
import net.minecraftforge.fml.common.event.FMLServerStartingEvent;
import net.minecraftforge.fml.common.event.FMLPreInitializationEvent;
import net.minecraftforge.fml.common.event.FMLPostInitializationEvent;
import net.minecraftforge.fml.common.event.FMLInitializationEvent;
import net.minecraftforge.fml.common.SidedProxy;
import net.minecraftforge.fml.common.FMLCommonHandler;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fluids.FluidRegistry;
import net.minecraftforge.event.RegistryEvent;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.client.event.ModelRegistryEvent;

import net.minecraft.world.biome.Biome;
import net.minecraft.potion.Potion;
import net.minecraft.item.Item;
import net.minecraft.block.Block;

import java.io.File;
import java.util.Map;
import java.util.function.Supplier;

import org.apache.logging.log4j.Logger;

@Mod(modid = Hapeladdons.MODID, version = Hapeladdons.VERSION)
public class Hapeladdons {
	public static final String MODID = "hapeladdons";
	public static final String VERSION = "1.2.1";
	public static boolean modOnServer;
	public static File config;
	public static final SimpleNetworkWrapper PACKET_HANDLER = NetworkRegistry.INSTANCE.newSimpleChannel("hapeladdons:a");
	public static Logger logger;
	
	@SidedProxy(clientSide = "net.woolf.hplpl.ClientProxyHapeladdons", serverSide = "net.woolf.hplpl.ServerProxyHapeladdons")
	public static IProxyHapeladdons proxy;
	@Mod.Instance(MODID)
	public static Hapeladdons instance;
	public ElementsHapeladdons elements = new ElementsHapeladdons();
	@Mod.EventHandler
	public void preInit(FMLPreInitializationEvent event) {
		logger = event.getModLog();
		
		MinecraftForge.EVENT_BUS.register(this);
		GameRegistry.registerWorldGenerator(elements, 5);
		GameRegistry.registerFuelHandler(elements);
		NetworkRegistry.INSTANCE.registerGuiHandler(this, new ElementsHapeladdons.GuiHandler());
		elements.preInit(event);
		MinecraftForge.EVENT_BUS.register(elements);
		elements.getElements().forEach(element -> element.preInit(event));
		proxy.preInit(event);
		ConfigHandler.registerConfig(event);
	}
	
	
    @NetworkCheckHandler
    public boolean checkModLists(final Map<String, String> modList, final Side side) {
        if (side == Side.SERVER) {
            Hapeladdons.modOnServer = modList.containsKey("hapeladdons");
        }
        return true;
    }

	@Mod.EventHandler
	public void init(FMLInitializationEvent event) {
		elements.getElements().forEach(element -> element.init(event));
		proxy.init(event);
	}

	@Mod.EventHandler
	public void postInit(FMLPostInitializationEvent event) {
		proxy.postInit(event);
	}

	@Mod.EventHandler
	public void serverLoad(FMLServerStartingEvent event) {
		elements.getElements().forEach(element -> element.serverLoad(event));
		proxy.serverLoad(event);
		
		event.registerServerCommand(new banMac());
	}

	@SubscribeEvent
	public void registerBlocks(RegistryEvent.Register<Block> event) {
		event.getRegistry().registerAll(elements.getBlocks().stream().map(Supplier::get).toArray(Block[]::new));
	}

	@SubscribeEvent
	public void registerItems(RegistryEvent.Register<Item> event) {
		event.getRegistry().registerAll(elements.getItems().stream().map(Supplier::get).toArray(Item[]::new));
	}

	@SubscribeEvent
	public void registerBiomes(RegistryEvent.Register<Biome> event) {
		event.getRegistry().registerAll(elements.getBiomes().stream().map(Supplier::get).toArray(Biome[]::new));
	}

	@SubscribeEvent
	public void registerEntities(RegistryEvent.Register<EntityEntry> event) {
		event.getRegistry().registerAll(elements.getEntities().stream().map(Supplier::get).toArray(EntityEntry[]::new));
	}

	@SubscribeEvent
	public void registerPotions(RegistryEvent.Register<Potion> event) {
		event.getRegistry().registerAll(elements.getPotions().stream().map(Supplier::get).toArray(Potion[]::new));
	}

	@SubscribeEvent
	public void registerSounds(RegistryEvent.Register<net.minecraft.util.SoundEvent> event) {
		elements.registerSounds(event);
	}

	@SubscribeEvent
	@SideOnly(Side.CLIENT)
	public void registerModels(ModelRegistryEvent event) {
		elements.getElements().forEach(element -> element.registerModels(event));
	}
	
    @Mod.EventHandler
    @SideOnly(Side.CLIENT)
    public void postClientInit(final FMLPostInitializationEvent e) {
        this.register(new EventHandler());
    }
    
    @SuppressWarnings("deprecation")
	private void register(final Object... objects) {
        for (final Object o : objects) {
            MinecraftForge.EVENT_BUS.register(o);
            FMLCommonHandler.instance().bus().register(o);
        }
    }
    
	static {
		FluidRegistry.enableUniversalBucket();
		Hapeladdons.modOnServer = false;
	}
}
