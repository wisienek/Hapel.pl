var inventory;
function interact(e){
    if(mainh.getDisplayName().indexOf("Plecak.")>-1){
        var JIb = Java.type('net.minecraft.inventory.InventoryBasic');
        var JItemS = Java.type('net.minecraft.item.ItemStack');
        var JSToNbt = Java.type('net.minecraft.nbt.JsonToNBT');
        var lore = mainh.getLore();
        var pMC = e.player.MCEntity;
        var pdata = e.player.getStoreddata();
        var data = e.player.world.getStoreddata();
        var plecaki = data.get("plecaki");

        var nrp;
        if(!inventory){
            var plecak;
            if(plecaki){
                plecaki = JSON.parse(plecaki);
                if(lore.length==0){
                    nrp = plecaki['nr'];
                    nrp++;
                    plecaki['nr']=nrp;
                    plecaki[nrp] = [];
                    mainh.setLore(["§0"+nrp, "§0"+e.player.getUUID()]);
                    data.put("plecaki",JSON.stringify(plecaki));
                    var x = "**"+e.player.getName()+"** Zainicjował "+mainh.getDisplayName().split(" ")[0]+" plecak z numerem: **"+nrp+"**";
                    x=ang(x);
                    HTTP.post(passes.hooks.mainLog,{
                        "content": x,
                        "tts": false,
                    });
                    return e.player.message("[§cPlecak§f] §7Wpisano plecak do bazy.");
                }
                if(lore.length==1){
                    lore = [lore[0],"§0"+e.player.getUUID()];
                    mainh.setLore(lore);
                    e.player.message("[§cPlecak§f] §7Ustawiono plecak jako własny");
                }
                plecak = plecaki[lore[0].split("§0")[1]];
                if(!plecak){return e.player.message("[§cPleak§f] §7Coś poszło nie tak!")}
            }else{
                if(lore.length>0){return e.player.message("[§cPleak§f] §7Nie można zapisać plecaka")}
                mainh.setLore(["§01"]);
                plecaki = {"nr":1, 1:[]};
                nrp=1;
                data.put("plecaki",JSON.stringify(plecaki));
                return e.player
            }
            if(lore[1].indexOf(e.player.getUUID())>-1 || e.player.getGamemode()==1){
                if(mainh.getDisplayName().split(" ")[0]=="§cŚredni"){
                    inventory = new JIb("\u00A74Średni Plecak \u00A7e"+mainh.getLore()[0].split("§0")[1], true, 18);
                }else if(mainh.getDisplayName().split(" ")[0]=="§cDuży"){
                    inventory = new JIb("\u00A74Duży Plecak \u00A7e"+mainh.getLore()[0].split("§0")[1], true, 27);
                }else{
                    inventory = new JIb("\u00A74Mały Plecak \u00A7e"+mainh.getLore()[0].split("§0")[1], true, 9);
                }
                for(var x=0;x<plecak.length;x++){
                    var item = new JItemS(JSToNbt.func_180713_a(plecak[x][1]));
                    inventory.func_70299_a(plecak[x][0], item);//slot, item
                }
            }else{
                return e.player.message("[§cPlecak§f] §7Nie możesz otwierać czyjegoś plecaka!");
            }
        }
        if(lore.length>0){
            nrp = lore[0].split("§0")[1];
        }
        pdata.put("plecak",nrp);
        try{
            if(inventory){
                pMC.func_71007_a(inventory);
            }
        }catch(err){
            e.player.message('\u00A7c'+err);
        }
    }
}

//tutaj copy

function pickUp(e){
    //checkBags(e);
}

function checkBags(e){
    if(e.player.getGamemode()==1){return}
    var cont = e.player.getInventory();
    var items = cont.getItems();
    var pl = [];
    for(var i=0;i<items.length;i++){
        if(!items[i] || !items[i].getName()){continue}
        if(items[i].getDisplayName().indexOf("Plecak.")>-1){
            if(items[i].getLore().length>0){
                pl.push(items[i]);
            }
        }
    }
    if(e.item){
        if(e.item.getDisplayName().indexOf("Plecak.")>-1){
            if(e.item.getLore().length>0){
                if(pl.length>0){
                    e.setCanceled(true);
                    return;
                }
            }
        }
    }
    if(pl.length>1){
        e.player.message(pl.length);
        for(var i=1;i<pl.length;i++){
            e.player.dropItem(e.player.world.createItemFromNbt(pl[i].getItemNbt()));
            pl[i].setStackSize(0);
        }
        e.player.message("[§cPlecak§f] §7Nie możesz mieć więcej niż jeden plecak w eq!");
    }
    return pl.length;
}


//plecaki i skrytki
function containerClosed(e){
    var tempdata = e.player.getStoreddata();
    var sejf = tempdata.get("sejf");
    var plecak = tempdata.get("plecak");
    //checkBags(e);
    if(e.container.getSize()-37==9){return}
    if(sejf){
        var block = e.player.world.getBlock(sejf[0],sejf[1],sejf[2]);
        var blockdata = block.getStoreddata();
        var size = e.container.getSize()-37;
        var items = [];
        for(var x=0;x<=size;x++){
            var slot=e.container.getSlot(x);
            if(slot.getName().indexOf("air")==-1){
                items.push([x,slot.getItemNbt().toJsonString()]);
            }
        }
        blockdata.put("itemy",JSON.stringify(items));
        tempdata.remove("sejf");
        return;
    }
    if(plecak){
        var size = e.container.getSize()-37;
        var items = [];
        for(var x=0;x<=size;x++){
            var slot = e.container.getSlot(x);
            if(slot.getName().indexOf("air")==-1){
                if(slot.getDisplayName().indexOf("Plecak.")>-1){
                    var lore=slot.getLore();
                    if(lore.length>0){
                        if(lore[0].split("§0")[1]==plecak){
                            e.player.giveItem(slot);
                            e.player.message("[§cPlecak§f] §7Nie możesz przechowywać plecaka w samym sobie!");
                            continue;
                        }
                    }
                }
                items.push([x,slot.getItemNbt().toJsonString()]);
            }
        }
        var worlddata = e.player.world.getStoreddata();
        var plecaki = worlddata.get("plecaki");
        plecaki = JSON.parse(plecaki);
        plecaki[plecak] = items;
        tempdata.remove("plecak");
        worlddata.put("plecaki",JSON.stringify(plecaki));
        return;
    }
    return;
}

//logout
function logout(e){
    var tempdata = e.player.getStoreddata();
    var sejf = tempdata.get("sejf");
    var plecak = tempdata.get("plecak");
    if(sejf){
        var block = e.player.world.getBlock(sejf[0],sejf[1],sejf[2]);
        var blockdata = block.getStoreddata();
        var size = e.player.getOpenContainer().getSize()-37;
        var items = [];
        for(var x=0;x<=size;x++){
            var slot=e.player.getOpenContainer().getSlot(x);
            if(slot.getName().indexOf("air")==-1){
                items.push([x,slot.getItemNbt().toJsonString()]);
            }
        }
        blockdata.put("itemy",JSON.stringify(items));
        tempdata.remove("sejf");
        return;
    }
    if(plecak){
        var size = e.player.getOpenContainer().getSize()-37;
        var items = [];
        for(var x=0;x<=size;x++){
            var slot = e.player.getOpenContainer().getSlot(x);
            if(slot.getName().indexOf("air")==-1){
                if(slot.getDisplayName().indexOf("Plecak.")>-1){
                    var lore=slot.getLore();
                    if(lore.length>0){
                        if(lore[0].split("§0")[1]==plecak){
                            e.player.giveItem(slot);
                            e.player.message("[§cPlecak§f] §7Nie możesz przechowywać plecaka w samym sobie!");
                            continue;
                        }
                    }
                }
                items.push([x,slot.getItemNbt().toJsonString()]);
            }
        }
        var worlddata = e.player.world.getStoreddata();
        var plecaki = worlddata.get("plecaki");
        plecaki = JSON.parse(plecaki);
        plecaki[plecak] = items;
        tempdata.remove("plecak");
        worlddata.put("plecaki",JSON.stringify(plecaki));
        return;
    }
    return;
}