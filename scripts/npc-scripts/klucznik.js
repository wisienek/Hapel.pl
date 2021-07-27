function interact(e){
    var pos = e.npc.getPos();

    var sdata = e.npc.getStoreddata();

    var mainh = e.player.getMainhandItem();
    if(mainh.getName().indexOf("wygaszacz")>-1){
        e.player.message("[§cKlucznik§f] §7Hardreset");
        return sdata.clear();
    }
    var list = sdata.get("lista");
    list = JSON.parse(list) || {};
    if(list[ e.player.getName() ]){
        return e.player.message("[§cKlucznik§f] §7Już dostałeś jedną skrzynkę: "+ list[ e.player.getName() ]);
    }
    var klucze = values(list);

    var found;
    var blocks = [e.npc.world.getBlock(pos.getX(), pos.getY()-2, pos.getZ()),
    e.npc.world.getBlock(pos.getX(), pos.getY()-3, pos.getZ()),
    e.npc.world.getBlock(pos.getX(), pos.getY()-4, pos.getZ())];
    var current = 0;
    
    try{
        for(var v=0; v<=2; v++){
            if(blocks[v] && blocks[v].isContainer() && !found){
                var cont = blocks[current].getContainer();
                if(cont){
                    var items = cont.getItems();
                    for(var i=0; i<items.length; i++){
                        if(items[i].getName().indexOf("air")==-1){
                            if(klucze.indexOf( items[i].getDisplayName() )==-1){
                                found = items[i];
            
                                list[ e.player.getName() ] = found.getDisplayName();
                                sdata.put("lista", JSON.stringify(list));
            
                                var newd = e.player.world.createItemFromNbt(found.getItemNbt());
                                var drop = e.player.dropItem(newd);
                                drop.setOwner(e.player.getName());
                                
                                print(e.player.getName()+" -> "+found.getDisplayName());
                                return e.player.message("[§cKlucznik§f] §7Zajęto skrzynkę: "+found.getDisplayName());
                            }
                        }
                    }
                }
                current++;
            }
        }
        if(!found){
            return e.npc.say("[§cKlucznik§f] §7Wszystkie magazyny zostały już zajęte!");
        }
    }
    catch(er){
        print(er);
    }

}

function values(x){
    var keys = Object.keys(x);
    var values = [];
    for(var i=0; i<keys.length; i++){
        values.push( x[ keys[i] ] );
    }
    return values;
}