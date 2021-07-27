package net.woolf.hplpl.events;

import net.minecraft.world.GameType;
import com.google.common.collect.ComparisonChain;
import net.minecraftforge.fml.relauncher.Side;
import net.minecraftforge.fml.relauncher.SideOnly;
import net.woolf.hplpl.ConfigHandler;
import net.woolf.hplpl.Hapeladdons;

import java.util.Comparator;
import net.minecraft.client.network.NetHandlerPlayClient;
import net.minecraft.scoreboard.ScoreObjective;
import java.util.List;
import net.minecraft.scoreboard.Team;
import net.minecraft.scoreboard.ScorePlayerTeam;
import java.awt.Color;

import net.minecraft.client.gui.FontRenderer;
import net.minecraft.client.gui.Gui;
import org.lwjgl.opengl.GL11;
import net.minecraft.client.gui.ScaledResolution;
import net.minecraft.client.Minecraft;
import net.minecraftforge.fml.common.gameevent.InputEvent;
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent;
import net.minecraftforge.client.event.RenderGameOverlayEvent;
import net.minecraft.client.network.NetworkPlayerInfo;
import com.google.common.collect.Ordering;

public class EventHandler
{
    private boolean toggle;
    private static final Ordering<NetworkPlayerInfo> ENTRY_ORDERING;
    
    public EventHandler() {
        this.toggle = false;
    }
    
    @SubscribeEvent
    public void onTabListDrawed(final RenderGameOverlayEvent.Pre e) {
        if (e.getType() == RenderGameOverlayEvent.ElementType.PLAYER_LIST) {
        	if( ConfigHandler.newTabEnabled == true ) {
                e.setCanceled(true);
                this.renderTabList();
        	}
        }
    }
    
    @SubscribeEvent
    public void onKeyInput(final InputEvent.KeyInputEvent event) {
        this.toggle = Minecraft.getMinecraft().gameSettings.keyBindPlayerList.isKeyDown();
    }
    
    private void renderTabList() {
        final Minecraft mc = Minecraft.getMinecraft();
        final List<NetworkPlayerInfo> players = (List<NetworkPlayerInfo>)EventHandler.ENTRY_ORDERING.sortedCopy((Iterable)Minecraft.getMinecraft().player.connection.getPlayerInfoMap());
        final int players_count = players.size();
        final ScaledResolution res = new ScaledResolution(mc);
        final int width = res.getScaledWidth();
        final int height = res.getScaledHeight();
        final int columns = ConfigHandler.playersInARow;
        final ScoreObjective scoreobjective = mc.world.getScoreboard().getObjectiveInDisplaySlot(0);
        final NetHandlerPlayClient handler = mc.player.connection;
        final FontRenderer renderer = Minecraft.getMinecraft().fontRenderer;
        final int playersPerPage = 120;
        final int columnWidth = 400 / columns;
        final int columnHeight = ConfigHandler.tabHeight;
        final int left = (width - columns * columnWidth) / 2;
        final int border = 20;
        final int currentPage = 0;
        if (mc.gameSettings.keyBindPlayerList.isKeyDown() && (!mc.isIntegratedServerRunning() || handler.getPlayerInfoMap().size() > 1 || scoreobjective != null)) {
        	int ping = (int) mc.getCurrentServerData().pingToServer;
            GL11.glPushMatrix();
            GL11.glDisable(2929);
            Gui.drawRect(left, 0, left + columnWidth * columns - 1, 18, Integer.MIN_VALUE); //header
            for (int i = 0; i < players_count; ++i) {
            	//for ( int j=0; j<= 60; j++) {
                    final int cellPtr = i - currentPage * 120;
                    final int xPos = left + cellPtr % columns * columnWidth;
                    final int yPos = 18 + cellPtr / columns * columnHeight;
                    if ( i < players_count ) {
                        Gui.drawRect(xPos, yPos, xPos + columnWidth - 1, yPos + columnHeight - 1, new Color(158, 152, 152, 100).getRGB());
                        
                        final NetworkPlayerInfo player = players.get(i);
                        final String playerName = player.getGameProfile().getName();
                        final ScorePlayerTeam team = Minecraft.getMinecraft().world.getScoreboard().getPlayersTeam(playerName);
                        final String[] displayName = ScorePlayerTeam.formatPlayerName((Team)team, playerName).replaceAll("&", "§").split(" ");
                        final String name = (displayName.length == 1) ? displayName[0] : displayName[1];
                        final String tName = team != null? team.getDisplayName() != null ? team.getDisplayName().replaceAll("&", "§").replaceAll("!w..", "") : "" : "";

                        final int maxStrWidth = columnWidth - ( ConfigHandler.tabHeads == true ? (columnWidth + columnHeight)/4: ( columnWidth - (int)(columnHeight * 1.5) )/4 ); 
                        
                        renderer.drawString(
                        		renderer.trimStringToWidth( tName + name, maxStrWidth ),
                        		xPos + (ConfigHandler.tabHeads == true? columnHeight: 0) + 2, 
                        		yPos + getFreeSpace(columnHeight), 
                        		16777215
                        	);
                        
                        if ( ConfigHandler.tabHeads == true ) {
                        	mc.getTextureManager().bindTexture(player.getLocationSkin());
                        	Gui.drawScaledCustomSizeModalRect(xPos, yPos, 8.0f, 8.0f, 8, 8, columnHeight - 1, columnHeight - 1, 64.0f, 64.0f);
                        }
                    }
            	//}
            }
            final int yPosOnline = (int)Math.ceil(players_count / (double)columns) * columnHeight + 17;
            Gui.drawRect(left, yPosOnline, left + columnWidth * columns - 1, yPosOnline + 19, Integer.MIN_VALUE); //footer
            Minecraft.getMinecraft().ingameGUI.drawCenteredString(renderer, ConfigHandler.tabHeader.replaceAll("&", "§").replace("%online%", String.valueOf(players_count)).replaceAll("%maxplayers%", String.valueOf(handler.currentServerMaxPlayers)).replace("%ping%", String.valueOf(ping)+"ms" ) , width / 2, 6, -1);
            Minecraft.getMinecraft().ingameGUI.drawCenteredString(renderer, ConfigHandler.tabFooter.replaceAll("&", "§").replace("%online%", String.valueOf(players_count)).replaceAll("%maxplayers%", String.valueOf(handler.currentServerMaxPlayers)).replace("%ping%", String.valueOf(ping)+"ms" ) , width / 2, yPosOnline + 6, -1);
            GL11.glPopMatrix();
            GL11.glEnable(2929);
        }
    }
    
    private int getFreeSpace(int height) {
    	if( height == 10) return 1;
    	if( height > 10 && height <= 18) return (int) Math.ceil(height/4);
    	return (int) Math.ceil(height/3);
    }
    
    private String getNumEnding(final int num, final String[] ends_arrays) {
        int number = num;
        number %= 100;
        String result = null;
        if (number >= 11 && number <= 19) {
            result = ends_arrays[2];
        }
        else {
            final int i = number % 10;
            switch (i) {
                case 1: {
                    result = ends_arrays[0];
                    break;
                }
                case 2:
                case 3:
                case 4: {
                    result = ends_arrays[1];
                    break;
                }
                default: {
                    result = ends_arrays[2];
                    break;
                }
            }
        }
        return result;
    }
    
    static {
        ENTRY_ORDERING = Ordering.from( (Comparator) new PlayerComparator() );
    }
    
    @SideOnly(Side.CLIENT)
    static class PlayerComparator implements Comparator<NetworkPlayerInfo>
    {
        private PlayerComparator() {
        }


        @SuppressWarnings("rawtypes")
		@Override
        public int compare(final NetworkPlayerInfo p_compare_1_, final NetworkPlayerInfo p_compare_2_) {
            final ScorePlayerTeam scoreplayerteam = p_compare_1_.getPlayerTeam();
            final ScorePlayerTeam scoreplayerteam2 = p_compare_2_.getPlayerTeam();
            
            final String[] displayName1 = ScorePlayerTeam.formatPlayerName((Team)scoreplayerteam, p_compare_1_.getGameProfile().getName()).replaceAll("&", "").split(" ");
            final String name1 = (displayName1.length == 1) ? displayName1[0] : displayName1[1];
            final String prefix1 = (displayName1.length > 1) ? displayName1[0] : "";
            final String teamName1 = scoreplayerteam != null ? scoreplayerteam.getDisplayName().replaceAll("&.", "").replace("!w..", "") : "";
            final int teamWeight1 = scoreplayerteam != null ? scoreplayerteam.getDisplayName().substring(0, 1) == "!w"? Integer.parseInt(scoreplayerteam.getDisplayName().substring(2, 3)) : 0 : 0;
            
            final String[] displayName2 = ScorePlayerTeam.formatPlayerName((Team)scoreplayerteam, p_compare_2_.getGameProfile().getName()).replaceAll("&", "").split(" ");
            final String name2 = (displayName2.length == 1) ? displayName2[0] : displayName2[1];
            final String prefix2 = (displayName2.length > 1) ? displayName2[0] : "";
            final String teamName2 = scoreplayerteam2 != null ? scoreplayerteam2.getDisplayName().replaceAll("&.", "").replace("!w..", "") : "";
            final int teamWeight2 = scoreplayerteam2 != null ? scoreplayerteam2.getDisplayName().substring(0, 1) == "!w"? Integer.parseInt(scoreplayerteam2.getDisplayName().substring(2, 3)) : 0 : 0;
            
            
			return ComparisonChain.start().compareTrueFirst(
            		p_compare_1_.getGameType() != GameType.SPECTATOR, 
            		p_compare_2_.getGameType() != GameType.SPECTATOR)
		    .compare(
	            		(Comparable) teamWeight1,
	            		(Comparable) teamWeight2
	                )
            .compare(
            			(Comparable) teamName1,
            			(Comparable) teamName2
            		)
            .compare(
                		(Comparable)((prefix1 != null) ? prefix1: name1),
                		(Comparable)((prefix2 != null) ? prefix2: name2))
            .compare(
            			(Comparable)p_compare_1_.getGameProfile().getName(), 
            			(Comparable)p_compare_2_.getGameProfile().getName())
            .result();
        }
    }
}
