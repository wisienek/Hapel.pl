function pickUp(e){
    //checkBags(e);
}

/*
    required scripts:
    - sql main
    - str mani
*/

function checkBags(e){
    if(e.player.getGamemode()==1){return}

    var pl = [];
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

    var cont = e.player.getInventory();
    var items = cont.getItems();

    for( var i=0; i < items.length; i++ ){
        if(!items[i] || !items[i].getName())    
            continue

        if(items[i].getDisplayName().indexOf("Plecak.")>-1)
            if(items[i].getLore().length>0)
                pl.push(items[i]);
    }

    if( pl.length > 1 ){
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
    if(!e.container){ return }
    var tempdata = e.player.getStoreddata();
    var sejf = tempdata.get("sejf");
    var plecak = tempdata.get("plecak");

    //checkBags(e);
    if(e.container.getSize()-37==9)
        return


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
    }else
    if(plecak){
        var size = e.container.getSize() - 37;
        var items = [];
        for(var x=0; x <= size; x++){
            var slot = e.container.getSlot(x);
            if(slot.getName().indexOf("air")==-1){
                if( slot.getName() == "hapeladdons:binder" ){
                    e.player.giveItem(slot);
                    e.player.message("[§cPlecak§f] §7Nie możesz przechowywać klasera w plecaku!")
                    continue;
                }

                if( slot.getDisplayName().indexOf("Plecak.") >- 1 ){
                    var lore=slot.getLore();
                    if( lore.length > 0 ){
                        if( lore[0].replace(/§./g, "") == plecak ){
                            e.player.giveItem(slot);
                            e.player.message("[§cPlecak§f] §7Nie możesz przechowywać plecaka w samym sobie!");
                            continue;
                        }
                    }
                }
                var nbt = slot.getItemNbt().toJsonString().replace(/\s{2,}/g, "").replace(/\n/g, "");
                items.push([x, nbt]);
            }
        }
        updateBag(escapeString(JSON.stringify(items))  , plecak);
        tempdata.remove("plecak");
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
        for(var x=0; x <= size; x++){
            var slot = e.player.getOpenContainer().getSlot(x);
            if(slot.getName().indexOf("air")==-1){
                items.push([x, slot.getItemNbt().toJsonString()]);
            }
        }
        blockdata.put("itemy",JSON.stringify(items));
        tempdata.remove("sejf");
        return;
    }
    if(plecak){
        var size = e.player.getOpenContainer().getSize() - 37;
        var items = [];
        for(var x=0; x<= size; x++){
            var slot = e.player.getOpenContainer().getSlot(x);
            if( slot.getName().indexOf("air") == -1 ){
                if( slot.getName() == "hapeladdons:binder" ){
                    e.player.giveItem(slot);
                    e.player.message("[§cPlecak§f] §7Nie możesz przechowywać klasera w plecaku!")
                    continue;
                }

                if( slot.getDisplayName().indexOf("Plecak.") > -1 ){
                    var lore=slot.getLore();
                    if( lore.length > 0 ){
                        if( lore[0].replace(/§./g, "") == plecak ){
                            e.player.giveItem(slot);
                            e.player.message("[§cPlecak§f] §7Nie możesz przechowywać plecaka w samym sobie!");
                            continue;
                        }
                    }
                }
                var nbt = slot.getItemNbt().toJsonString().replace(/\s{2,}/g, "").replace(/\n/g, "");
                items.push([x, nbt]);
            }
        }
        updateBag(escapeString(JSON.stringify(items)), plecak);
        tempdata.remove("plecak");
        return;
    }
    return;
}
