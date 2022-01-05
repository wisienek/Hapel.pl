var locs = [[1024, 85, 1240], [922, 85, 1100], [898, 85, 1275], [928, 85, 1337], [1048, 122, 1311], [1020, 125, 1439]];
var clock = "937 85 1243";
var npc;

function init(e){
    npc = e.npc;
}

function interact(e){
    var data = e.player.getStoreddata();
    var niegor = data.get("niegor");
    if(niegor && niegor=="szuka"){
        gui2(e);
        return randLock(e);
    }else if(e.player.getMainhandItem().getName()=="minecraft:torch"){
        e.npc.setPosition(937, 85, 1243);
        e.npc.setHome(937, 85, 1243);
        clock = "937 85 1243";
        return;
    }else if(niegor && niegor=="znalazł"){
        return e.player.message("[§dNiegor§f] §7Z tobą już się bawiłem!");
    }else if(!niegor){
        return gui1(e);
    }
}

function baseGui(e){
    var gui = e.API.createCustomGui(1, 256, 256, false);
    gui.setBackgroundTexture("customnpcs:textures/gui/elki_e.png");
    return gui;
}

function gui1(e){
    var gui = baseGui(e);

    gui.addLabel(9,"§dNiegor", 110, 0, 80, 20);
    gui.addLabel(10,"§7Chcesz pograć ze mną w chowanego?\nBędzie bardzo fajnie!\nA jak mnie złapiesz to moze się czymś z tobą podzielę!\n§6**zaśmiał się dzieciencym głosem**", 70, 70, 120, 20);

    gui.addTexturedButton(1, "§aJasne, zagram!", 5, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(2, "§cNie, dzięki...", 170, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");

    e.player.showCustomGui(gui);
    return gui;
}

function gui2(e){
    var gui = baseGui(e);

    gui.addLabel(9,"§dNiegor", 110, 0, 80, 20);
    gui.addLabel(10,"§7WOW, znalazłeś mnie tak szybko!\nChyba ty zostaniesz nowym mistrzem chowanego.\nNo nic, jak mówiłem dziele się swoimi zdobyczami z mistrzostw!\nNie wiem do czego ten srebrny pieniążek, ale wygląda podejrzanie. Możesz się za mnie dowiedzieć!", 70, 70, 120, 20);

    gui.addTexturedButton(3, "§aOdbierz", 90, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");

    e.player.showCustomGui(gui);
    return gui;
}

function customGuiButton(e) {
    switch(e.buttonId){
        case 1:{
            var data = e.player.getStoreddata();
            var niegor = data.get("niegor");
            if(niegor=="szuka" || niegor=="znalazł"){
                return e.player.message("[§dNiegor§f] §7Ty szukasz już albo znalazłeś!");
            }
            e.player.message("[§dNiegor§f] §e**Zaśmiał się cichym głosikiem i zaraz zniknął!**");
            e.player.closeGui();
            niegor = "szuka";
            data.put("niegor", niegor);
            return randLock(e);
        }
        case 2:{ return e.player.closeGui(); }
        case 3:{
            var data = e.player.getStoreddata();
            var niegor = data.get("niegor");
            if(!niegor || niegor=="znalazł"){return e.player.message("[§dNiegor§f] §7Ty szukasz już albo znalazłeś!"); }

            var pieniążek = e.player.world.createItem("variedcommodities:coin_iron",0,1);
            pieniążek.setCustomName("§7Srebrny pieniążek");
            e.player.giveItem(pieniążek);
            var knut = e.player.world.createItem("minecraft:diamond",0,15);
            knut.setCustomName("§fKnut");
            e.player.giveItem(knut);
            var reds = e.player.world.createItem("minecraft:redstone",0,5);
            e.player.giveItem(reds);

            niegor = "znalazł";
            data.put("niegor",niegor);
            e.API.executeCommand(e.player.world, "dcdpm Przesladowca Gracz "+e.player.getName()+" zakończył questa i odebrał nagrodę!");
            randLock(e);
            return e.player.closeGui();
        }
    }
}

function randLock(e){
    var t = Math.floor(Math.random() * locs.length);
    while(locs[t].join(" ")==clock){
        t = Math.floor(Math.random() * locs.length);
    }
    npc.setPosition(locs[t][0], locs[t][1], locs[t][2]);
    npc.setHome(locs[t][0], locs[t][1], locs[t][2]);
    clock = locs[t].join(" ");
}