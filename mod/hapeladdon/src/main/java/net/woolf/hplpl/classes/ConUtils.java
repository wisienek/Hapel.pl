package net.woolf.hplpl.classes;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import com.google.gson.JsonObject;


public class ConUtils {

	public static Boolean logMac( String secret, String mac, String uuid ) throws IOException, InterruptedException {
		HttpURLConnection con = null;

        try {
    		// Prepare the HTTP request.
        	String parsedSecret = String.format( "%d", mac.length() + secret.length() );
        	String query = "?mac="+mac+"&uuid="+uuid+"&secret="+parsedSecret; 
    		String host = "http://hapel-ic.pl/api/users/macs" + query;
            
            URL myurl = new URL( host );
            con = (HttpURLConnection) myurl.openConnection();

            con.setDoOutput(true);
            con.setRequestMethod("POST");
            con.setRequestProperty("User-Agent", "Java client");
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            con.setRequestProperty("Accept", "application/json");

            OutputStreamWriter wr = new OutputStreamWriter( con.getOutputStream() );
            wr.write( query );
            
            
            try( BufferedReader br = new BufferedReader( new InputStreamReader( con.getInputStream(), "utf-8" ) ) ) {
            	StringBuilder response = new StringBuilder();
            	String responseLine = null;
            	
            	while ( (responseLine = br.readLine()) != null ) {
            		response.append(responseLine.trim());
            	}
            	
            	System.out.println( "Odpowiedz: " + response.toString());
            }

        } finally {
            con.disconnect();
        }
        
		return true;
	}
	
	
}
