package net.woolf.hplpl.classes;

import net.woolf.hplpl.ElementsHapeladdons;
import net.woolf.hplpl.Hapeladdons;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;

import net.minecraft.server.MinecraftServer;

public class MacUtils {
	
	public static List<String> getBannedMacs(MinecraftServer server) throws IOException{
		List < String > bannedMacs = new ArrayList < String > ();
        String absPath = server.getDataDirectory().getAbsolutePath();
        if (absPath.endsWith("."))
            absPath = absPath.substring(0, absPath.length() - 1);

        String fileName = absPath + "banned-macs.json";
        File BannedMacsFile = new File(fileName);
        
        if (BannedMacsFile.exists() == true) {
            String bMacs = ElementsHapeladdons.readFile(fileName);
            JsonArray jsonOb = new JsonParser().parse(bMacs).getAsJsonArray();

            bannedMacs = new Gson().fromJson(jsonOb, new TypeToken < List < String >> () {}.getType());
        }
		
		return bannedMacs;
	}
	
	public static Boolean saveBannedMacs(MinecraftServer server, List<String> jsonOb) throws IOException {
		Boolean saved = false;
		
	    String absPath = server.getDataDirectory().getAbsolutePath();
	    if (absPath.endsWith("."))
	    	absPath = absPath.substring(0, absPath.length() - 1);

	    String fileName = absPath + "banned-macs.json";
		
        try (Writer writer = new FileWriter(fileName)) {
            Gson gson = new GsonBuilder().create();
            gson.toJson(new Gson().toJsonTree(jsonOb).getAsJsonArray(), writer);

            saved = true;
        }
		
		return saved;
	}
	
	
}
