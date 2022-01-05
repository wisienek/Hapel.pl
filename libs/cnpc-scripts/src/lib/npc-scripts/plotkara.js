var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var npc;

/*
    - postreq,
    - moneyV
*/

function init(e){
    npc = e.npc;
}
function interact(e){
    gui1(e);
}

function baseGui(){
    var gui = API.createCustomGui(1, 256, 256, false);
    gui.setBackgroundTexture("customnpcs:textures/gui/gossip.png");
    return gui;
}


function gui1(e){
    var gui = baseGui();
    
    gui.addTextField(1, 5, 45, 230, 30);
    gui.addButton(2, "§7✍", 235, 50, 20, 20);

    var wdata = e.player.world.getStoreddata();
    var plotkara = wdata.get("plotkara");
    if(!plotkara){
        plotkara = 5;
        wdata.put("plotkara", plotkara);
    }

    gui.addLabel(3, "§cCena:§e "+plotkara+"k", 115, 20, 60, 20);
    
    e.player.showCustomGui(gui);
    return gui;
}