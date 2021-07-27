var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var npc;

function interact(e) {
    if(e.player.getMainhandItem().getName()=="minecraft:torch"){
        var sdata = e.npc.getStoreddata();
        var namioty = sdata.get("namioty");
        namioty=JSON.parse(namioty) || {};
        var ar=[];
        for(var i=1;i<26;i++){ar.push(i)}
        ar.splice(7,1);
        ar.splice(19,1);
        namioty = {zajete: {}, wolne: ar, zarezerwowane: {}}
        sdata.put("namioty", JSON.stringify(namioty));
        return;
    }
    gui1(e.player);
    npc = e.npc;
}

function init(e){
    var sdata = e.npc.getStoreddata();
    var namioty = sdata.get("namioty");
    if(!namioty){
        var ar=[];
        for(var i=1;i<28;i++){ar.push(i)}
        namioty = {zajete: {}, wolne: ar, zarezerwowane: {}}
        sdata.put("namioty", JSON.stringify(namioty));
    }
}

function baseGui(b){
    var gui = API.createCustomGui(1, 256,256, false);
    b?gui.setBackgroundTexture("customnpcs:textures/gui/elki_e.png"):gui.setBackgroundTexture("customnpcs:textures/gui/elki.png");
    return gui;
}

function gui1(player){
    //main gui
    var gui = baseGui(true);
    gui.addLabel(9, "§4Pole namiotowe MŚQ", 95, 0, 80, 20);
    
    gui.addTexturedButton(1, "§2Wynajem namiotu", 90, 70, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(6, "§9Twoje rezerwacje", 90, 100, 80, 15, "customnpcs:textures/gui/pp_button.png");
    //gui.addTexturedButton(2, "§5Dorób kluczyk", 90, 130, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(3, "§7Oddaj kluczyk", 90, 130, 80, 15, "customnpcs:textures/gui/pp_button.png");
    
    player.showCustomGui(gui);
    return gui;
}

function gui2(player, namioty, nr){
    //wybierz namiot
    var gui = baseGui(true);

    if(!nr){
        gui.addLabel(9, "§4Wybierz namiot", 100, 0, 80, 20);
        gui.addScroll(1, 30, 25, 200, 210, namioty);
    }else{
        gui.addLabel(9, "§4Namiot nr. §e"+nr, 100, 0, 80, 20);

        gui.addLabel(1, "§1Koszt wynajmu namiotu: §c30 knutów", 60, 70, 160, 20);
        gui.addLabel(2, "§1Koszt wynajmu z rezerwacją: §c20+20 knutów", 44, 90, 160, 20);
        gui.addLabel(10, "§1Rezerwacja trwa: §c2 dni", 81, 110, 160, 20);
        gui.addLabel(8, "§1Ilość kluczy do namiotu: §c5", 60, 130, 160, 20);
        gui.addLabel(7, "§1Zwrot kosztów za oddany klucz: §c3 knuty", 37, 150, 160, 20);
    
        gui.addTexturedButton(4, "§dRezerwuj", 5, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");
        gui.addTexturedButton(5, "§aWynajmnij", 170, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");
    }

    player.showCustomGui(gui);
    return gui;
}
function gui3(player, klucze){
    //zwróć klucze
    var gui = baseGui(true);

    gui.addLabel(9, "§4Wybierz klucz do zwrotu", 90, 0, 80, 20);
    gui.addScroll(2, 30, 25, 200, 210, klucze);

    player.showCustomGui(gui);
    return gui;
}
function gui4(player, namioty, selected){
    //kończ rezerwację
    var gui = baseGui(true);
    if(!selected){
        gui.addLabel(9, "§4Wybierz nr rezerwacji", 90, 0, 80, 20);
        gui.addScroll(3, 30, 25, 200, 210, namioty);
    }else{
        gui.addLabel(9, "§4Rezerwacja namiotu nr."+selected, 90, 0, 80, 20);

        gui.addLabel(1, "§1Zostało do zapłaty: §c20 knutów", 71, 70, 160, 20);
        gui.addLabel(2, "§1Przedłużenie rezerwacji o 2 dni: §c10 knutów", 30, 90, 160, 20);

        gui.addTexturedButton(11, "§aDokończ rezerwację", 5, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");
        gui.addTexturedButton(12, "§cRezygnuj z rezerwacji", 170, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");
    }


    player.showCustomGui(gui);
    return gui;
}

//event hadnler
function customGuiButton(e) {
    switch ( e.buttonId ){
        case 1:{
            //wybierz namiot
            var sdata = npc.getStoreddata();
            var namioty = sdata.get("namioty");
            if(!namioty){
                var ar=[];
                for(var i=1;i<28;i++){ar.push(i)}
                namioty = {zajete: {}, wolne: ar, zarezerwowane: {}};
            }else{ namioty = JSON.parse(namioty); }

            var lista = [];
            for(var i=0; i<namioty.wolne.length; i++){
                lista.push("§aNamiot nr. §e"+namioty.wolne[i]);
            }

            return gui2(e.player, lista);
        }
        case 3:{
            //oddanie kluczy
            var items = e.player.getInventory().getItems();
            var klucze = [];
            for(var i=0; i<items.length; i++){
                if(items[i].getDisplayName().indexOf("Klucz do namiotu nr.")>-1){
                    klucze.push(items[i].getDisplayName());
                }
            }
            if(!klucze){return e.player.message("[§cNamioty§f] §7Nie masz żadnych kluczy do zwrotu!")}
            return gui3(e.player, klucze);
        }
        case 4:{
            //rezerwacja namiotu
            var nr = e.gui.getComponent(9).getText().split("§e")[1];
            nr = parseInt(nr);
            if(!nr || isNaN(nr)){ return e.player.message("[§cNamioty§f] §7Coś poszło nie tak, nie znaleziono numeru namiotu!") }
            if(takeMoney(e.player,false, 20)){
                var sdata = npc.getStoreddata();
                var namioty = sdata.get("namioty");
                if(!namioty){
                    var ar=[];
                    for(var i=1;i<28;i++){ar.push(i)}
                    namioty = {zajete: {}, wolne: ar, zarezerwowane: {}};
                }else{ namioty = JSON.parse(namioty); }
                var index = namioty.wolne.indexOf(nr);
                namioty.wolne.splice(index,1);
                var date = Date.now()+(86400000 * 2);
                namioty.zarezerwowane[nr] = {
                    gracz: e.player.getName(),
                    wygasa: date
                }
                sdata.put("namioty",JSON.stringify(namioty));
                gui1(e.player);
                return e.player.message("[§cNamioty§f] §7Zarezerwowano namiot nr.§e"+nr);
            }
            else{
                return e.player.message("[§cNamioty§f] §7Nie masz wystarczającej gotówki! Trzymaj kasę na toolbarze!");
            }
        }
        case 5:{
            //wynajem namiotu
            var nr = e.gui.getComponent(9).getText().split("§e")[1];
            nr = parseInt(nr);
            if(!nr || isNaN(nr)){ return e.player.message("[§cNamioty§f] §7Coś poszło nie tak, nie znaleziono numeru namiotu!") }
            if(takeMoney(e.player,false, 30)){
                var chest = e.player.world.getBlock(924, 84, 1292).getContainer().getItems();
                if(!chest){ return e.player.message("[§cNamioty§f] §7Nie znaleziono kluczy!") }
                var key = chest[nr-1];
                if(key.getName().indexOf("air")>-1){ return e.player.message("[§cNamioty§f] §7Nie znaleziono klucza!") }
                key.setStackSize(5);
                e.player.giveItem(key);

                var sdata = npc.getStoreddata();
                var namioty = sdata.get("namioty");
                if(!namioty){
                    var ar=[];
                    for(var i=1;i<28;i++){ar.push(i)}
                    namioty = {zajete: {}, wolne: ar, zarezerwowane: {}};
                }else{ namioty = JSON.parse(namioty); }
                var index = namioty.wolne.indexOf(nr);
                namioty.wolne.splice(index,1);
                namioty.zajete[nr] = {
                    gracz: e.player.getName(),
                    klucze: 5
                }
                sdata.put("namioty",JSON.stringify(namioty));
                gui1(e.player);
                return e.player.message("[§cNamioty§f] §7Wynajęto namiot nr.§e"+nr);
            }
            else{
                return e.player.message("[§cNamioty§f] §7Nie masz wystarczającej gotówki! Trzymaj kasę na toolbarze!");
            }
        }
        case 6:{
            var sdata = npc.getStoreddata();
            var namioty = sdata.get("namioty");
            if(!namioty){
                var ar=[];
                for(var i=1;i<28;i++){ar.push(i)}
                namioty = {zajete: {}, wolne: ar, zarezerwowane: {}};
            }else{ namioty = JSON.parse(namioty); }

            var lista = [];

            var keys = Object.keys(namioty.zarezerwowane);
            for(var i=0; i<keys.length; i++){
                if(namioty.zarezerwowane[ keys[i] ].gracz == e.player.getName()){
                    lista.push("§eNamiot nr."+keys[i]);
                }
            }
            if(lista.length==0){ return e.player.message("[§cNamioty§f] §7Nie masz żadnych rezerwacji!") }

            return gui4(e.player, lista);
        }
        case 11:{
            //dokończ rezerwację
            if(takeMoney(e.player, false, 20)){
                var sdata = npc.getStoreddata();
                var namioty = sdata.get("namioty");
                if(!namioty){
                    var ar=[];
                    for(var i=1;i<28;i++){ar.push(i)}
                    namioty = {zajete: {}, wolne: ar, zarezerwowane: {}};
                }else{ namioty = JSON.parse(namioty); }
                var nr = e.gui.getComponent(9).getText().split("nr.")[1];
                delete namioty.zarezerwowane[nr]
                namioty.zajete[nr] = {
                    gracz: e.player.getName(),
                    klucze: 5
                }

                var chest = e.player.world.getBlock(924, 84, 1292).getContainer().getItems();
                if(!chest){ return e.player.message("[§cNamioty§f] §7Nie znaleziono kluczy!") }
                var key = chest[nr-1];
                if(key.getName().indexOf("air")>-1){ return e.player.message("[§cNamioty§f] §7Nie znaleziono klucza!") }
                key.setStackSize(5);
                e.player.giveItem(key);

                sdata.put("namioty",JSON.stringify(namioty));
                gui1(e.player);
                return e.player.message("[§cNamioty§f] §7Wynajęto namiot nr.§e"+nr);
            }else{
                return e.player.message("[§cNamioty§f] §7Nie masz wystarczającej gotówki! Trzymaj kasę na toolbarze!");
            }
        }
        case 12:{
            //rezygnuj rezerwację
            var sdata = npc.getStoreddata();
            var namioty = sdata.get("namioty");
            if(!namioty){
                var ar=[];
                for(var i=1;i<28;i++){ar.push(i)}
                namioty = {zajete: {}, wolne: ar, zarezerwowane: {}};
            }else{ namioty = JSON.parse(namioty); }
            var nr = e.gui.getComponent(9).getText().split("nr.")[1];
            delete namioty.zarezerwowane[nr];
            sdata.put("namioty",JSON.stringify(namioty));
            gui1(e.player);
            return e.player.message("[§cNamioty§f] §7Zrezygnowano z rezerwacji namiotu nr."+nr);
        }
    }
}

function customGuiScroll(e){
    switch(e.scrollId){
        case 1:{
            var nr = e.selection[0].split("§e")[1];
            return gui2(e.player, false, nr);
        }
        case 2:{
            var nr = e.selection[0].split("nr.")[1];

            var items = e.player.getInventory().getItems();
            var odd = false;
            for(var i=0; i<9; i++){
                if( items[i].getDisplayName( )== e.selection[0] ){
                    items[i].setStackSize(items[i].getStackSize()-1);
                    giveMoney(e.player, 3);
                    e.player.message("[§cNamioty§f] §7Oddano klucz: §e"+e.selection[0]+" §7Zwrot za wynajem: §e3 knuty");
                    odd=true;

                    var sdata = npc.getStoreddata();
                    var namioty = sdata.get("namioty");
                    if(!namioty){
                        var ar=[];
                        for(var i=1;i<28;i++){ar.push(i)}
                        namioty = {zajete: {}, wolne: ar, zarezerwowane: {}};
                    }else{ namioty = JSON.parse(namioty); }

                    if(namioty.zajete[nr]){
                        namioty.zajete[nr].klucze--;
                        sdata.put("namioty",JSON.stringify(namioty));
                    }
                }
            }
            if(!odd){ e.player.message("[§cNamioty§f] §7Musisz trzymać kluczyk na toolbarze!") }

            return gui1(e.player);
        }
        case 3:{
            var nr = e.selection[0].split("nr.")[1];
            nr = parseInt(nr);
            return gui4(e.player, false, nr);
        }
    }
}


var knut = API.getIWorlds()[0].createItem("minecraft:diamond",0,1);
    knut.setCustomName("§fKnut");
var sykl = API.getIWorlds()[0].createItem("minecraft:iron_ingot",0,1);
    sykl.setCustomName("§fSykl");
var galeon = API.getIWorlds()[0].createItem("minecraft:coal",1,1);
    galeon.setCustomName("§fGaleon");

var values = {
    "Knut":1,
    "Sykl":21,
    "Galeon":357 
}

function giveMoney(player, ammount){
    while( ammount > 0 ){
        if(ammount / values['Galeon'] >= 1 ){
            var x = parseInt( ammount / values['Galeon'] );
            if(x>64){ x=64 }
            galeon.setStackSize( x );
            ammount -= ( values['Galeon'] * x );
            player.giveItem(galeon);
        }
        else if( ammount / values['Sykl'] >= 1 ){
            var x = parseInt( ammount / values['Sykl'] );
            if(x>64){ x=64 }
            sykl.setStackSize( x );
            ammount -= ( values['Sykl'] * x );
            player.giveItem(sykl);
        }
        else{
            knut.setStackSize(ammount);
            player.giveItem(knut);
            ammount = 0;
        }
    }
    player.updatePlayerInventory();
    return true;
}

function countMoney(cont){
    var items = cont.getItems();
    var count = {
        "Knut": 0,
        "Sykl": 0,
        "Galeon": 0
    }
    for(var i=0; i<9; i++){
        if([knut.getDisplayName(), sykl.getDisplayName(), galeon.getDisplayName()].indexOf(items[i].getDisplayName()) > -1){
            count[ items[i].getDisplayName().split("§f")[1] ] += items[i].getStackSize();
        }
    }

    var hasMoney = 0;

    var v = Object.keys(count);
    for(var i=0; i<v.length; i++){
        hasMoney += (count[ v[i] ] * values[ v[i] ] );
    }

    return hasMoney;
}


function takeMoney(player, has, ammount){
    var cont = player.getInventory();
    if(!has){
        has = countMoney(cont);
    }
    if(ammount>has){
        return false;
    }
    var items = cont.getItems();
    for(var i=0; i<9; i++){
        if([knut.getDisplayName(), sykl.getDisplayName(), galeon.getDisplayName()].indexOf(items[i].getDisplayName()) > -1){
            items[i].setStackSize(0);
        }
    }
    player.updatePlayerInventory();

    has -= ammount;

    giveMoney(player, has);

    return true;
}