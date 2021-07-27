package net.woolf.hplpl;

import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.common.event.FMLPreInitializationEvent;

import java.io.File;
import net.minecraftforge.common.config.Configuration;

@Mod.EventBusSubscriber
public class ConfigHandler
{
    public static Configuration config;
    public static int playersInARow;
    public static String tabHeader;
    public static String tabFooter;
    public static Boolean newTabEnabled;
    public static Boolean tabHeads;
    public static int tabHeight;
    
    public static void init(final File file) {
        ConfigHandler.config = new Configuration(file);
        final String category = "Tab";
        ConfigHandler.config.addCustomCategoryComment(category, "Konfiguracja Tabulatora");
        ConfigHandler.tabHeader = ConfigHandler.config.getString("headerText", category, "&6&lSerwer Hapel.pl", "Tab Header");
        ConfigHandler.tabFooter = ConfigHandler.config.getString("footerText", category, "&6&lGraczy Online: %online%&7&l/&6&l%maxplayers%", "Tab Footer: %online%- ilość online, %maxplayers%- max online, %ping%- aktualny ping ");
        ConfigHandler.playersInARow = ConfigHandler.config.getInt("playersInARow", category, 5, 1, 5, "PIR");
        ConfigHandler.newTabEnabled = ConfigHandler.config.getBoolean("newTabEnabled", category, false, "Wpisz: false - aby powrócić do starej listy, true - aby uaktywnić nową");
        ConfigHandler.tabHeads = ConfigHandler.config.getBoolean("tabHeads", category, true, "Wpisz: false - aby wyłączyć głowy z listy, true - aby pozostały włączone");
        ConfigHandler.tabHeight = ConfigHandler.config.getInt("tabHeight", category, 18, 10, 20, "Wielkość komórek tabu.");
        ConfigHandler.config.save();
    }
    
    public static void registerConfig(final FMLPreInitializationEvent event) {
        (Hapeladdons.config = new File(event.getModConfigurationDirectory() + "/" + "hapeladdons")).mkdirs();
        init(new File(Hapeladdons.config.getPath(), "hapeladdons.cfg"));
    }
    
    static {
    	ConfigHandler.tabHeight = 18;
    	ConfigHandler.tabHeads = true;
    	ConfigHandler.newTabEnabled = false;
        ConfigHandler.playersInARow = 5;
        ConfigHandler.tabHeader = "&6&lSerwer Hapel.pl";
        ConfigHandler.tabFooter = "&6&lGraczy Online: %online%&7&l/&6&l%maxplayers%";
    }
}