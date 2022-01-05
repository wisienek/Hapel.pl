var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var npc = API.getIWorlds()[0].getEntity("42642532-372a-40c3-8663-c759c6a3272b");

function interact(e) {
    gui1(e.player);


}
function baseGui(){
    var width = 256; 
    var height = 256;
    var gui = API.createCustomGui(1, width, height, false);
    gui.setScriptHandler(npc);
    gui.setBackgroundTexture("customnpcs:textures/gui/gd.jpg");
    //gui.setSize(256,256); //160,180
    return gui;
}

function gui1(player){
    var gui = baseGui();
    
    gui.addLabel(3, "§eWprowadź hasło", 100, 0, 200, 30);
    gui.addTextField(12, 80, 100, 100, 20);
    gui.addButton(10, "Sprawdź", 90, 130, 80, 15);
    gui.addButton(13, "M", 190, 40, 15, 15);
    
    player.showCustomGui(gui);
    return gui;
}
function gui2(player){
    var gui = baseGui();

    gui.addLabel(1, "§eNajbliźsi gracze", 100, 0, 200, 30);

    var ents = player.world.getNearbyEntities(player.getPos(), 100, 2);
    var list = [];
    for(var x=0;x<ents.length;x++){
        list.push(ents[x].getName() + " ("+ parseInt(player.getPos().distanceTo(ents[x].getPos())) + ")" );
    }
    gui.addScroll(2, 50, 40, 150, 180, list);


    player.showCustomGui(gui);
    return gui;
}

function customGuiButton(e) {
    if(e.buttonId == 13){
        gui2(e.player);
    }
    else if(e.buttonId == 10){
        var b = e.gui.getComponent(e.buttonId);
        var txt = e.gui.getComponent(12).getText();
        if(!txt){
            b.setLabel("§eWprowadź hasło");
            return e.gui.update(e.player);
        }
    
        if(e.gui.getComponent(12).getText() == "masło"){
            b.setLabel("§aHasło poprawne!");
    
            e.player.setPosition(-519,4,-321);
            e.player.closeGui();
            return e.player.message("[§eGruba Dama§f] §7Hasło poprawne §e**obraz otwiera się**");
        }else{
            b.setLabel("§cHasło niepoprawne!");
        }
        e.gui.update(e.player);
    }
    
}