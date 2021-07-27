package net.woolf.hplpl.commands;

import net.woolf.hplpl.Hapeladdons;
import net.woolf.hplpl.classes.MacUtils;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import net.minecraft.command.CommandBase;
import net.minecraft.command.CommandException;
import net.minecraft.command.ICommandSender;
import net.minecraft.entity.player.EntityPlayerMP;
import net.minecraft.server.MinecraftServer;
import net.minecraft.util.text.TextComponentString;


public class banMac extends CommandBase {
	
	@Override
	public boolean checkPermission(MinecraftServer server, ICommandSender sender) {
	    return ( (EntityPlayerMP) sender.getCommandSenderEntity()).isCreative();
	}

    @Override
    public void execute(MinecraftServer server, ICommandSender sender, String[] params) throws CommandException {
    	
    	if( ( (EntityPlayerMP) sender.getCommandSenderEntity()).isCreative() == false ) {
    		return;
    	}

        if (params != null && params.length > 0) {
            try {
                if( params.length < 1 ){
                    sender.sendMessage(new TextComponentString(this.getUsage(sender)));
                    return;
                }
                else{
                    String playerName = params.length ==2? params[1]: "";

                    Boolean changed = false;
                    List < String > bannedMacs = MacUtils.getBannedMacs(server);

                    if ( params[0].equals("ban") ) {
                        if ( playerName.isEmpty() ){
                            sender.sendMessage(new TextComponentString(this.getUsage(sender)));
                            return;
                        }
                        
                    	boolean banned = false;
                        if( bannedMacs.contains( playerName ) == false ) {
                        	bannedMacs.add( playerName );
                        	banned = true;
                        	changed = true;
                        }
                        
                        if( Arrays.asList(server.getPlayerList().getOnlinePlayerNames()).contains(playerName) ) {
                        	EntityPlayerMP playerMP = server.getPlayerList().getPlayerByUsername(playerName);
                        	
                        	playerMP.connection.disconnect( new TextComponentString("Zbanowany na MACa!") );
                        	
                        }
                        
                        if( banned ) {
                            sender.sendMessage(new TextComponentString("Dodano banmac dla gracza: " + playerName));
                            Hapeladdons.logger.info("Gracz " + sender.getName() +" nałożył banMac dla "+ playerName +"!");
                        } else {
                        	sender.sendMessage(new TextComponentString("Nie udało się nałożyć MAC-bana na gracza: " + playerName));
                        }
                    } else if ( params[0].equals("unban") ) {
                        if ( playerName.isEmpty() ){
                            sender.sendMessage(new TextComponentString(this.getUsage(sender)));
                            return;
                        }
                        
                        boolean unbanned = false;
                        
                        if( bannedMacs.contains(playerName) ) {
                        	bannedMacs.remove(playerName);
                        	unbanned = true;
                        	changed = true;
                        }
                        
                        if( unbanned ) {
                            sender.sendMessage(new TextComponentString("Odbanowano użytkownika: "+ playerName));
                            Hapeladdons.logger.info("Gracz " + sender.getName() +" odbanował mac dla: "+ playerName );
                        } else {
                        	sender.sendMessage(new TextComponentString("Nie udało się odbanować MAC-bana dla gracza: " + playerName));
                        }
                    } else if ( params[0].equals("list") ) {
                    	String wiad = "Zbanowani gracze na MACa: (może być więcej jeżeli grają na tym samym komputerze) ";
                    	for( String mac : bannedMacs )
                    		wiad += "\n- " + mac;
                    	
                    	sender.sendMessage( new TextComponentString(wiad) );
                    	return;
                    } else if ( params[0].equals("check") ) {
                        if ( playerName.isEmpty() ){
                            sender.sendMessage(new TextComponentString(this.getUsage(sender)));
                            return;
                        }
                        
                    	boolean banned = false;
                    	if( bannedMacs.contains(playerName) )
                    		banned = true;
                    	
                    	sender.sendMessage( new TextComponentString( "Gracz "+playerName+" " + (banned? "Posiada MAC-bana!": "Nie jest zbanowany na MAC!") ) );
                    	return;
                    }
                    
                    // zapisz i kończ
                    if ( changed == true ) 
                        MacUtils.saveBannedMacs(server, bannedMacs);
                }
            } catch (IOException e) {
                e.printStackTrace();
                Hapeladdons.logger.info( "BUBU na BanMac!" );
            }
        } else {
        	sender.sendMessage( new TextComponentString( this.getUsage(sender) ) );
        }
    }

    @Override
    public String getName() {
        return "banmac";
    }

    @Override
    public String getUsage(ICommandSender sender) {
        return "/banmac ban/unban/list/check <Nick>";
    }
}