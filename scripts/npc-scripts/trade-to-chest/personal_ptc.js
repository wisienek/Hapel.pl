/*! \file trade_to_chest.js
*
* \brief CNCP script for Player's trader
*
* Script made for MC server Hapel.pl
* Trader will put any items that player's paid into chest,
* And get those sold items from the same chests under it.
* You can change how many blocks under it will check by changing the box value in conditios
* Owner: ★
* Admin: ☆
* other: ☢
*
* requires: 
* - postreq
*
* \author Wisienek / Woolf
* \date 2020.07.25
* \version 1.03.02
*/
var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var npc;
var nrole;
function init(e){
    npc = e.npc;
    nrole = e.npc.getRole();
}

function interact(e){
    var mainh = e.player.getMainhandItem();
    var lore = mainh.getLore();
    if(lore.length==0){return}
    var npcData = e.npc.getStoreddata();

    var owner = npcData.get("owner");
    var admins = JSON.parse(npcData.get("admins")) || {};
    if(mainh.getName()=="variedcommodities:blueprint" && mainh.getDisplayName().indexOf("NPC edit")>-1 && ( (owner && owner.indexOf(e.player.getName())>-1) || owner.indexOf(e.player.getUUID())>-1 ) || (Object.keys(admins).indexOf(e.player.getUUID()) >-1) ){
        e.setCanceled(true);
        e.player.message("[§cEditor§f] §7Wejście w tryb edycji npc");
        return gui1(e.player);
    }

}

function role(e){ 
    if(e.npc.getRole().getType() == 1) {
        if(!e.sold){return}
        if(e.sold.getStackSize()>0){ 
            if(e.receiving === undefined){
                var chest1 = e.npc.world.getBlock(e.npc.getBlockX(), e.npc.getBlockY(), e.npc.getBlockZ());
                var data = e.npc.getStoreddata();
                var hook = data.get("webhook");
                    if(getsold(e.sold, chest1, e, 0)){
                        var curr="";
                        if(e.currency1){
                            lookforitems(e.currency1,chest1,e,0);
                            curr+=e.currency1.getStackSize()+"x " + e.currency1.getDisplayName();
                            getCurr(e, e.currency1);
                        }
                        if(e.currency2){
                            lookforitems(e.currency2,chest1,e,0);
                            if(curr.length>0){curr+=" "}
                              curr+=e.currency2.getStackSize()+"x " + e.currency2.getDisplayName();
                            getCurr(e,e.currency2);
                        }
                        if(hook){
                            var x = "**"+e.player.getDisplayName() + "** kupil " + e.sold.getStackSize() + "x " + e.sold.getDisplayName().replace(/§./g, "").replace(/\&./g, "") + " za " + curr.replace(/§./g, "").replace(/\&./g, "");
                            x=ang(x);
                            HTTP.post(hook,{
                                "content": x,
                                "tts": false,
                            });
                        }
                        executeCommand("traderlog " + e.player.getDisplayName() + " kupil " + e.sold.getStackSize() + "x " + e.sold.getDisplayName() + " za " + curr);
                    }else{
                        e.setCanceled(true);
                        if(hook){
                            var x = "NPC: **"+e.npc.getName()+"** Nie ma towaru: **"+e.sold.getDisplayName().replace(/§./g, "").replace(/\&./g, "")+"** ("+e.sold.getStackSize()+")";
                            x=ang(x);
                            HTTP.post(hook,{
                                "content": x,
                                "tts": false,
                            });
                        }
                        return;
                    }
            }else{
                return;
            }
        }
    }
}

//! Function that searches for item that is beeing sold
/*!
    \param i1 - IItemStack object that's beeing searched
    \param chest1 - IBlock object that's beeing searched through
    \param e - event object
    \param box - integer type value that indicates how many boxes it searched
*/
function getsold(i1,chest1,e,box){
    if( box==4 && i1.getStackSize() > 0 ){
        e.npc.say("Sprzedawca nie ma towaru: "+ i1.getDisplayName() + ", "+ i1.getStackSize());
        return false;
    }
    if( !chest1.isContainer() && box != 4 ){
        chest1 = e.npc.world.getBlock(chest1.getX(), chest1.getY()-1, chest1.getZ());
        return getsold( i1, chest1, e, box+1);
    }
    if(chest1.isContainer()&&chest1.getName()=="minecraft:chest"){
        var chest = chest1.getContainer();
        var size = chest.getSize();
        var i = 0;
        while( i<size ){
            var y = chest.getSlot(i);
            if(i1.getDisplayName()==y.getDisplayName() && y.getStackSize()>=i1.getStackSize()){
                if(y.getStackSize()-i1.getStackSize()>=0){
                    y.setStackSize(y.getStackSize()-i1.getStackSize());
                    return true;
                }else if(y.getStackSize()-i1.getStackSize()<0){
                    i1.setStackSize(i1.getStackSize()-y.getStackSize());
                    y.setStackSize(0);
                    return getsold(i1,chest,e,box);
                }
            }
            i++;
        }
        if(i==size){
            chest1 = e.npc.world.getBlock(chest1.getX(), chest1.getY()-1, chest1.getZ());
            return getsold(i1,chest1,e,box+1);
        }
    }
}
//! Function that searches and removes items form chests below npc.
/*!
    \param i1 Type IItemStack - searched item
    \param chest1 type IBlock - container (chest)
    \param e - parsed event
    \param box - integer value, how many blocks it has checked already
*/
function lookforitems(i1,chest1,e,box){
    if(box==4){
        e.npc.say("Nie trafiło do skrzyni: " + i1.getDisplayName() + " (" + i1.getStackSize() + ")");
        return e.npc.say("Nie znaleziono skrzyni pod npc w ilości 3 kratek");
    }
    if(!chest1 || chest1.getName()!="minecraft:chest"){
        chest1 = e.npc.world.getBlock(chest1.getX(), chest1.getY()-1, chest1.getZ());
        return lookforitems(i1,chest1,e,box+1);
    }
    if(chest1.getName()=="minecraft:chest"){
        var chest = chest1.getContainer();
        var size = chest.getSize();
        var maxsize = i1.getMaxStackSize();
        var i = 0;
        while(i<size){
            var y = chest.getSlot(i);
            if(y.isEmpty()){
                chest.setSlot(i,i1);
                break;
            }else if(i1.getDisplayName()==y.getDisplayName() && y.getStackSize()<=maxsize){
                if(y.getStackSize()+i1.getStackSize()<=maxsize){
                    y.setStackSize(y.getStackSize()+i1.getStackSize());
                    break;
                }else if(y.getStackSize()!=maxsize && y.getStackSize()+i1.getStackSize()>maxsize){
                    i1.setStackSize(i1.getStackSize()-maxsize+y.getStackSize());
                    y.setStackSize(maxsize);
                    lookforitems(i1,chest1,e,box);
                    break;
                }
            }
            i++;
        }
        if(i==size){
            chest1 = e.npc.world.getBlock(chest1.getX(), chest1.getY()-1, chest1.getZ());
            return lookforitems(i1,chest1,e,box+1);
        }
    }else{
        return;
    }
}

//!Function that checks if item bought is currency
//This can be thrown away it just counts taxes on my server
function getCurr(e ,cur){
    var val;
    var name = cur.getDisplayName();
    if(name.indexOf("Knut")>-1){val=1}else
    if(name.indexOf("Sykl")){val=21}else
    if(name.indexOf("Galeon")){val=365}
    else{val=0}
    if(val>0){
        var data = e.npc.world.getStoreddata();
        var vatp = e.npc.world.getStoreddata().get("VatVal");
        var kasa = data.get("MMVat");
        kasa += val*cur.getStackSize()*vatp;
        data.put("MMVat", kasa);
        var p = e.npc.world.getPlayer("Przesladowca");
        if(p){
            p.message("[§cPodatnik§f] §7Pobrano vat z: §e"+val*cur.getStackSize()+"§7k ("+cur.getStackSize()*vatp+"), aktualny stan: §e"+kasa.toFixed(2)+"§7k");
        }
    }
    return;
}


function executeCommand(cmd) {
    return API.createNPC(API.getIWorld(0).getMCWorld()).executeCommand(cmd);
}

function baseGui(player, option){
    var gui = API.createCustomGui(1, 256, 256, false)
    var data = npc.getStoreddata();
    var owner = data.get("owner");
    var admins = JSON.parse(data.get("admins")) || {}; //♚★☢
    var status;

    if(option=="trader"){
        gui.addLabel(2, "§eEdytor NPC §7-->", 85, 5, 80, 15);
        gui.setBackgroundTexture("customnpcs:textures/gui/tradersetup1.png");

        status = gui.addLabel(545, "", 240, 5, 20, 20).setHoverText(["§c§l♚ §7- Właściciel", "§c§l★ §7- Administrator", "§c§l☢ §7- Inny"]);
    }else if(option=="tradere"){
        gui.addLabel(2, "§eEdytor NPC §7-->", 85, 25, 80, 15);
        gui.setBackgroundTexture("customnpcs:textures/gui/inve.png");
        status = gui.addLabel(545, "", 225, 20, 20, 20).setHoverText(["§c§l♚ §7- Właściciel", "§c§l★ §7- Administrator", "§c§l☢ §7- Inny"]);
    }else{
        gui.addLabel(2, "§eEdytor NPC §7-->", 85, 40, 80, 15);
        gui.setBackgroundTexture("customnpcs:textures/gui/stdbg.png");
        status = gui.addLabel(545, "", 240, 35, 20, 20).setHoverText(["§c§l♚ §7- Właściciel", "§c§l★ §7- Administrator", "§c§l☢ §7- Inny"]);
    }
    if(status) player.getName()==owner? status.setText("§c♚"): admins[player.getUUID()]? status.setText("§c★"): status.setText("§c☢");


    return gui;
}

function gui1(player){
    var gui = baseGui(player);

    gui.addLabel(12, "§cGłówna strona", 135, 40, 80, 15);

    gui.addButton(3, "§2Zmień wygląd", 90, 80, 80, 20);
    gui.addButton(4, "§3Edycja sklepu", 90, 110, 80, 20);
    gui.addButton(5, "§5Zmiana funkcjonalności", 90, 140, 80, 20);


    player.showCustomGui(gui);
    return gui;
}
function gui2(player){
    var gui = baseGui(player);
    gui.addLabel(9, "§cWygląd", 140, 40, 80, 15);

    var display = npc.getDisplay();

    var nazwa = display.getName();
    gui.addLabel(10, "§9Nazwa", 65, 80, 25, 15)
    .setHoverText(["§4Uwaga!","§7Aby dodać kolor do nazwy", "§7Poprzedź tekst znakiem §l&§r§7 i kodem koloru (patrz niżej)", "§e&eZłoty król"]);
    gui.addTextField(11, 90, 80, 80, 15).setText(nazwa);

    var url = display.getSkinUrl().split("/").pop();
    gui.addLabel(12, "§9Skin", 70, 100, 15, 15)
    .setHoverText(["§4Uwaga!","§7Skin musi być zapisany na platformie imgur", "§7Wpisz tylko końcówkę linku zaznaczoną zielonym kolorem poniżej", "§chttps://i.imgur.com/§aDEiZteW.png"]);
    gui.addTextField(13, 90, 100, 80, 15).setText(url);

    var rozmiar = display.getSize();
    gui.addButton(8, "§6Zmień rozmiar: "+rozmiar, 90, 120, 80, 20 );

    gui.addButton(901, "§c✖", 105, 195, 20, 20 );
    gui.addButton(200, "§a✍", 135, 195, 20, 20 );

    player.showCustomGui(gui);
    return gui;
}
function gui3(player){
    var gui = baseGui(player, "trader");
    gui.addLabel(9, "§cSklep", 140, 5, 80, 15);

    gui.showPlayerInventory(8, 120);

    //pierwszy rząd 1
    for(var i=1; i<=6; i++){
        gui.addItemSlot(-23, -12 + ((i-1) * 21), nrole.getCurrency1(i-1));
    }
    //drugi rząd
    for(var i=11; i<=16; i++){
        gui.addItemSlot(-3, -12 + ((i-11) * 21), nrole.getCurrency2(i-11));
    }
    //trzeci rząd
    for(var i=21; i<=26; i++){
        //0-5
        gui.addItemSlot(24, -12 + ((i-21) * 21), nrole.getSold(i-21));
    }

    //pierwszy rząd 2
    for(var i=101; i<=106; i++){
        gui.addItemSlot(58, -12 + ((i-101) * 21), nrole.getCurrency1(i-95));
    }
    //drugi rząd
    for(var i=111; i<=116; i++){
        gui.addItemSlot(78, -12 + ((i-111) * 21), nrole.getCurrency2(i-105));
    }
    //trzeci rząd
    for(var i=121; i<=126; i++){
        //6-11
        gui.addItemSlot(105, -12 + ((i-121) * 21), nrole.getSold(i-115));
    }

    //pierwszy rząd 3
    for(var i=201; i<=206; i++){
        gui.addItemSlot(139, -12 + ((i-201) * 21), nrole.getCurrency1(i-189));
    }
    //drugi rząd
    for(var i=211; i<=216; i++){
        gui.addItemSlot(159, -12 + ((i-211) * 21), nrole.getCurrency2(i-199));
    }
    //trzeci rząd
    for(var i=221; i<=226; i++){
        //12-17
        gui.addItemSlot(186, -12 + ((i-221) * 21), nrole.getSold(i-209));
    }

    gui.addButton(901, "§c✖", 225, 205, 20, 20 );

    player.showCustomGui(gui);
    return gui;
}

function gui4(player){
    var gui = baseGui(player, "tradere");
    gui.addLabel(9, "§cFunkcjonalność", 140, 25, 80, 15);

    gui.addTextField(11, 50, 65, 140, 20).setHoverText(["§7Wklej tutaj cały webhook z discorda"]);
    gui.addButton(201, "§a✍", 200, 65, 20, 20 ).setHoverText(["§7Zapisz webhook"]);

    gui.addButton(7,  "§bDodaj admina", 50, 100, 80, 20);
    gui.addButton(17, "§cUsuń admina", 140, 100, 80, 20);
    gui.addButton(1,  "§dSkrystalizuj NPC", 95, 125, 80, 20);

    gui.addButton(901, "§c✖", 213, 185, 20, 20 );

    gui.showPlayerInventory(8, 113);

    player.showCustomGui(gui);
    return gui;
}

function gui5(player, usun, search){
    var gui = baseGui(player);
    gui.addLabel(9, "§cWspółwłaściciel", 140, 40, 80, 15);

    var lista=[];
    if(usun){
        var data = npc.getStoreddata();
        var admins = JSON.parse(data.get("admins")) || {};
        var keys = Object.keys(admins);
        for(var i=0; i<keys.length; i++){
            if(search && admins[ keys[i] ].toLowerCase().indexOf(search.toLowerCase())>-1 ){
                lista.push( admins[ keys[i] ] + " / " + keys[i] );
            }else if(!search){
                lista.push( admins[ keys[i] ] + " / " + keys[i] );
            }
        }
    }else{
        var players = player.world.getAllPlayers();

        for(var i=0; i<players.length; i++){
            if(search && players[i].getName().toLowerCase().indexOf(search.toLowerCase())>-1){
                lista.push(players[i].getName());
            }else if(!search){
                lista.push(players[i].getName());
            }
        }
    }

    gui.addScroll(usun? 17: 11, 10, 65, 120, 150, lista);

    // Owner: ♚
    // Admin: ★
    // other: ☢

    var data = npc.getStoreddata();
    var owner = data.get("owner");
    var admins = JSON.parse(data.get("admins")) || {};
    var keys = Object.keys(admins);

    var j = ["§c♚ §7"+owner];

    for(var i=0; i<keys.length; i++){
        j.push( "§c★ §7"+admins[ keys[i] ] );
    }

    gui.addLabel(20, "§2[Info o adminach]", 160, 135, 80, 20).setHoverText(j);
    gui.addLabel(19, "§4§l[?]", 10, 40, 15, 15).setHoverText(["§7Kliknij §edwukrotnie§7 na osobę z listy", "§7Aby dodać/usunąć ją jako współwłaściciela", "§7Współwłaściciel ma §eTakie same §7prawa co właściciel"]);

    gui.addTextField(12, 140, 80, 100, 20);
    gui.addButton(usun?14:13, "§eSzukaj po nazwie", 150, 105, 80, 20);

    player.showCustomGui(gui);
    return gui;
}

function customGuiScroll(e){
    switch(e.scrollId){
        case 11:{
            //add admin
            if(!e.doubleClick){ return }
            var name = e.selection[0];
            var sowner = e.player.world.getPlayer(name);
            if(!sowner){return e.player.message("[§cNPC§f] §7Nie znaleziono gracza!")}
            var sdata = npc.getStoreddata();
            var admins = JSON.parse(sdata.get("admins")) || {};
            admins[sowner.getUUID()] = name;
            sdata.put("admins", JSON.stringify(admins));
            e.player.message("[§cNPC§f] §7Dodano gracza §b"+name+"§7 jako współwłaściciela!");
            return gui5(e.player);
        }
        case 17:{
            //remove admin
            if(!e.doubleClick){ return }
            var name = e.selection[0];

            var data = npc.getStoreddata();
            var admins = JSON.parse(data.get("admins")) || {};
            var keys = Object.keys(admins);

            var id = name.split("/ ")[1];
            if(keys.indexOf(id)==-1){ return e.player.message("[§cNPC§f] §7Nie ma takiego admina!");}

            delete admins[ id ];
            data.put('admins', JSON.stringify(admins));

            e.player.message("[§cNPC§f] §7Usunięto gracza §b"+name+"§7 ze współwłaścicieli!");
            return gui5(e.player, true);
        }
    }
}

function customGuiButton(e) {
    switch ( e.buttonId ){
        case 1:{
            //crystalize npc
            var item = e.player.world.createItem("variedcommodities:gem_ruby",0,1);
            item.setCustomName("§cSkrystalizowany sprzedawca");
            item.setLore(["§7Tajemniczy kryształ trzyma w sobie", "§7Duszę androida sprzedawcy!", npc.getName(), "§8Kliknij Prawym przyciskiem myszy aby ją uwolnić"]);
            npc.storeAsClone(7, npc.getName());
            e.player.giveItem(item);
            e.player.message("[§cNPC§f] §7Skrystalizowano sprzedawcę!");
            npc.despawn();
            e.player.closeGui();
            return;
        }
        case 3: { return gui2(e.player); } //gui navigation
        case 4: { return gui3(e.player); } //gui navigation
        case 5: { return gui4(e.player); } //gui navigation
        case 7: { return gui5(e.player); } //gui navigation
        case 8:{
            // change size of npc
            var rozmiar = e.gui.getComponent(8).getLabel().split(": ")[1];
            rozmiar = parseInt(rozmiar);
            if(!rozmiar || isNaN(rozmiar) || rozmiar<=0 || rozmiar>7){ return e.player.message("[§cNPC§f] §7Rozmiar musi być z zakresu <1;7>") }
            if(!npc){ e.player.message("nie ma npc") }
            if(rozmiar == 7){ rozmiar = 1; }else{ rozmiar++; }
            npc.getDisplay().setSize(rozmiar);
            e.gui.getComponent(8).setLabel("§6Zmień rozmiar: "+rozmiar);
            e.player.message("[§cNPC§f] §7Zmieniono rozmiar na §b"+rozmiar);
            return e.player.showCustomGui(e.gui);
        }
        case 13:{
            //search by name - add to adminlist
            var text = e.gui.getComponent(12).getText();
            if(!text){return e.player.message("[§cNPC§f] §7Nie ma tekstu w polu!")}
            return gui5(e.player, false, text);
        }
        case 14:{
            //search by name - delete from adminlist
            var text = e.gui.getComponent(12).getText();
            if(!text){return e.player.message("[§cNPC§f] §7Nie ma tekstu w polu!")}
            return gui5(e.player, true, text);
        }
        case 17:{ return gui5(e.player, true);}
        case 200:{
            //save skin and name of npc
            var nazwa = e.gui.getComponent(11).getText();
            var skin = e.gui.getComponent(13).getText();
            var display = npc.getDisplay();
            if(nazwa && nazwa != display.getName()){
                nazwa = nazwa.replace(/&/g, "§");
                display.setName(nazwa);
                e.player.message("[§cNPC§f] §7Zmieniono nazwę na §b"+nazwa);
            }
            if(skin && skin != display.getSkinUrl().split("/").pop()){
                display.setSkinUrl("https://i.imgur.com/"+skin);
                e.player.message("[§cNPC§f] §7Zmieniono skin na §bhttps://i.imgur.com/"+skin);
            }
            return gui2(e.player);
        }
        case 201:{
            //save webhook
            var text = e.gui.getComponent(11).getText();
            if(!text){
                npc.getStoreddata().remove("webhook");
                return e.player.message("[§cNPC§f] §7Resetowano webhook!");
            }

            if(text.indexOf("discord")==-1 || text.indexOf("api")==-1 || text.indexOf("webhook")==-1){
                return e.player.message("[§cNPC§f] §7Niepoprawny webhook!");
            }

            npc.getStoreddata().put("webhook", text);
            return e.player.message("[§cNPC§f] §7Zmieniono webhook na: §e"+text);
        }
        case 901:{ return gui1(e.player); }
    }
}

function customGuiSlot(e){
    var slot1;
    var slot2;
    var slot3;
    var id;
    if( (e.slotId>=0 && e.slotId<=5) || (e.slotId>=18 && e.slotId<=23) || (e.slotId>=36 && e.slotId<=41) ){
        slot1 = e.stack;
    }
    else if( (e.slotId>=6 && e.slotId<=11) || (e.slotId>=24 && e.slotId<=29) || (e.slotId>=42 && e.slotId<=47) ){
        slot2 = e.stack;
    }
    else if( (e.slotId>=12 && e.slotId<=17) || (e.slotId>=30 && e.slotId<=35) || (e.slotId>=48 && e.slotId<=53) ){
        slot3 = e.stack;
    }
    
    if(e.slotId>=0  && e.slotId<=5) { id = e.slotId    }else
    if(e.slotId>=6  && e.slotId<=11){ id = e.slotId-6  }else
    if(e.slotId>=12 && e.slotId<=17){ id = e.slotId-12 }else
    if(e.slotId>=18 && e.slotId<=23){ id = e.slotId-12 }else
    if(e.slotId>=24 && e.slotId<=29){ id = e.slotId-18 }else
    if(e.slotId>=30 && e.slotId<=35){ id = e.slotId-24 }else
    if(e.slotId>=36 && e.slotId<=41){ id = e.slotId-24 }else
    if(e.slotId>=42 && e.slotId<=47){ id = e.slotId-30 }else
    if(e.slotId>=48 && e.slotId<=53){ id = e.slotId-36 }

    if(slot1){ nrole.set(id, slot1, nrole.getCurrency2(id), nrole.getSold(id));      }else
    if(slot2){ nrole.set(id, nrole.getCurrency1(id), slot2, nrole.getSold(id));      }else
    if(slot3){ nrole.set(id, nrole.getCurrency1(id), nrole.getCurrency2(id), slot3); }
    return;
}