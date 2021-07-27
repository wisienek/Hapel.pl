var npc;
function baseGui(e){
    var gui = e.API.createCustomGui(1, 256, 256, false);
    gui.setBackgroundTexture("customnpcs:textures/gui/elki_e.png");

    var wdata = e.npc.getStoreddata();
    var p = wdata.get(e.player.getName());
    p = parseInt(p) || 0;

    gui.addLabel(99,"§c§l"+p, 225, 5, 80, 20);

    return gui;
}

function init(e){
    npc = e.npc;
}

function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getName().indexOf("wygaszacz")>-1){
        var wdata = e.npc.getStoreddata();
        if(mainh.getDisplayName() != "Wygaszacz"){
            wdata.remove(mainh.getDisplayName());
            e.player.message("[§cPunkty§f] §7Usunięto: "+mainh.getDisplayName());
        }
        var keys = wdata.getKeys();
        for(var i=0; i<keys.length; i++){
            e.player.message("[§cPunkty§f] §a"+keys[i]+" §4: §b"+wdata.get( keys[i] ));
        }
        return e.player.message("[§cPunkty§f] §7Koniec!");
    }
    if(mainh.getName().indexOf("hapeladdons:kartaczarodziei")>-1){
        var pkt=0;
        switch(mainh.getName().split("hapeladdons:kartaczarodziei_")[1]){
            case "common":{ pkt = 1; break; }
            case "uncommon":{ pkt = 5; break; }
            case "ancient":{ pkt = 25; break; }
            case "rare":{ pkt = 75; break; }
            case "legendary":{ pkt = 1000; break; }
        }
        
        var wdata = e.npc.getStoreddata();
        var p = wdata.get(e.player.getName());
        p = parseInt(p) || 0;

        var val;
        e.player.isSneaking()? val = (pkt * mainh.getStackSize()) : val = pkt;
        p+=val;

        wdata.put(e.player.getName(), p);
        
        e.player.isSneaking()? mainh.setStackSize(0): mainh.setStackSize( mainh.getStackSize() - 1 );
        return e.player.message("[§cKarty§f] §7Wymieniono kartę "+mainh.getDisplayName()+"§7 za §e"+val+"§7pkt!");
    }
    return gui1(e);
}

function gui1(e){
    var gui = baseGui(e);

    gui.addLabel(9,"§1Wymiana kart", 110, 0, 80, 20);

    var id = {
        "kartaczarodziei_rare":1,
        "kartaczarodziei_uncommon":2,
        "kartaczarodziei_common":3,
        "kartaczarodziei_legendary":4,
        "kartaczarodziei_ancient": "karta"
    }

    var items = [e.player.world.createItem("hapeladdons:kartaczarodziei_common",0,1),
                e.player.world.createItem("hapeladdons:kartaczarodziei_uncommon",0,1),
                e.player.world.createItem("hapeladdons:kartaczarodziei_ancient",0,1),
                e.player.world.createItem("hapeladdons:kartaczarodziei_rare",0,1),
                e.player.world.createItem("hapeladdons:kartaczarodziei_legendary",0,1),
                ];
    var x = 60, y = 200; // cell position
    var ids = 10;
    for(var i=0; i<items.length; i++){
        
        var item = items[i];
        var pkt=0;
        switch(item.getName().split("hapeladdons:kartaczarodziei_")[1]){
            case "common":{ pkt = 2; break; }
            case "uncommon":{ pkt = 10; break; }
            case "ancient":{ pkt = 50; break; }
            case "rare":{ pkt = 150; break; }
            case "legendary":{ pkt = 2000; break; }
        }
        gui.addTexturedRect(ids+i, "customnpcs:textures/gui/trader.png", x+(30*i), y, 18, 18, 31, 139);
        gui.addButton(ids+i+100, "Kup", x+(30*i), y - 30, 20, 20);
        var component = gui.addTexturedRect(ids+i+30, item.getName().slice(0, item.getName().indexOf(':'))+':textures/items/'+ id[ item.getName().slice( item.getName().indexOf(':') + 1 ) ] +'.png', x+1+(i*30), y+1, 256, 256).setHoverText(["§7Ilość wymaganych pkt:","§c"+pkt]);
        component.setScale(0.0625);

    }

    e.player.showCustomGui(gui);
    return gui;
}


function customGuiButton(e) {
    var wdata = npc.getStoreddata();
    var p = wdata.get(e.player.getName());
    p = parseInt(p) || 0;
    if(p<=0){return e.player.message("[§cKarty§f] §7Masz za mało punktów")}

    switch(e.buttonId){
        case 110:{
            if(p>=2){
                karta(e, "common");
                p-=2;
                wdata.put(e.player.getName(), p);
                
                e.gui.getComponent(99).setText("§c§l"+p);
                e.player.showCustomGui(e.gui);

                return e.player.message("[§cKarty§f] §7Zakupiono kartę typu §acommon §7!");
            }else{
                return e.player.message("[§cKarty§f] §7Masz za mało punktów aby zakupić tę kartę!");
            }
        }
        case 111:{
            if(p>=10){
                karta(e, "uncommon");
                p-=10;
                wdata.put(e.player.getName(), p);
                
                e.gui.getComponent(99).setText("§c§l"+p);
                e.player.showCustomGui(e.gui);

                return e.player.message("[§cKarty§f] §7Zakupiono kartę typu §auncommon §7!");
            }else{
                return e.player.message("[§cKarty§f] §7Masz za mało punktów aby zakupić tę kartę!");
            }
        }
        case 112:{
            if(p>=50){
                karta(e, "ancient");
                p-=50;
                wdata.put(e.player.getName(), p);
                
                e.gui.getComponent(99).setText("§c§l"+p);
                e.player.showCustomGui(e.gui);

                return e.player.message("[§cKarty§f] §7Zakupiono kartę typu §aancient §7!");
            }else{
                return e.player.message("[§cKarty§f] §7Masz za mało punktów aby zakupić tę kartę!");
            }
        }
        case 113:{
            if(p>=150){
                karta(e, "rare");
                p-=150;
                wdata.put(e.player.getName(), p);

                e.gui.getComponent(99).setText("§c§l"+p);
                e.player.showCustomGui(e.gui);

                return e.player.message("[§cKarty§f] §7Zakupiono kartę typu §arare §7!");
            }else{
                return e.player.message("[§cKarty§f] §7Masz za mało punktów aby zakupić tę kartę!");
            }
        }
        case 114:{
            if(p>=2000){
                karta(e, "legendary");
                p-=2000;
                wdata.put(e.player.getName(), p);
                
                e.gui.getComponent(99).setText("§c§l"+p);
                e.player.showCustomGui(e.gui);

                return e.player.message("[§cKarty§f] §7Zakupiono kartę typu §alegendary §7!");
            }else{
                return e.player.message("[§cKarty§f] §7Masz za mało punktów aby zakupić tę kartę!");
            }
        }
    }

}

function karta(e, typ){
    var karty = e.player.world.getStoreddata().get("karty");
    karty = JSON.parse(karty) || {};
    if(Object.keys(karty).length==0){return false}
    var rarity = typ;

    var id = Math.floor(Math.random() * karty[ rarity ].length);
    var item = e.player.world.createItem("hapeladdons:kartaczarodziei_"+rarity,0,1);
    item.setCustomName("§cKarta Czarodziejów §b"+ karty[ rarity ][ id ].name);
    var lore = ["§aRzadkość: §d"+rarity, "§aNumer: §f"+karty[ rarity ][ id ].numer];
    for(var i=0; i<karty[ rarity ][ id ].opis.length; i++){
        lore.push(karty[ rarity ][ id ].opis[i]);
    }
    item.setLore(lore);
    var nbt = item.getNbt();
    nbt.setInteger("id", karty[ rarity ][ id ].numer);
    nbt.setString("rarity", rarity);
    var drop = e.player.dropItem(item);
    drop.setOwner(e.player.getName());

    return true;
}
