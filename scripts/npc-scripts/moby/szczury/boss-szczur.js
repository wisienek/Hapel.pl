function damaged(e){
    var maxh = e.npc.getMaxHealth();
    var curh = e.npc.getHealth();

    var mainh = e.source.getMainhandItem();
    if(mainh.getDisplayName()=="§cPogromca szczurów"){
        e.npc.setHealth(curh-4);
    }

    if(curh<maxh/2 && curh>0){
        if(Math.random() * 10 < 3){
            var pos = e.npc.getPos();
            e.npc.world.spawnClone(pos.getX(), pos.getY(), pos.getZ(), 4, "Mały szczur Beta");
            e.npc.say("ꙅǫᴎi|ɿɘbᴎu ʏm oǫ");
        }
    }
}

function kill(e){
    e.npc.say("!ɘm ||iʞ ||iw ɘᴎo oᴎ ,ɒʜ ɒʜ ɒʜ")
}
function died(e){
    var world = e.npc.world;
    var data = world.getStoreddata().get("szczury");
    if(!data){ data = {}}else{ data = JSON.parse(data) }

    var x;
    if(data[e.source.getName()]){
        x = data[e.source.getName()];
    }else{
        x = {
            "Omega":0,
            "Alfa":0,
            "Normal":0
        }
    }
    x['Omega']+=1;

    if( x['Omega']/5 != 0 && x['Omega']%5 ==0 ){
        e.source.message("[§cQuestLog§f] §7Gratulacje, pokonałeś już §6"+ x['Omega']+ "§7 Szczurów Omega!");

        var item = world.createItem("variedcommodities:coin_gold",0,1);
        item.setCustomName("§eZłoty pieniążek");
        e.source.giveItem(item);
    }

    data[e.source.getName()] = x;

    return world.getStoreddata().put("szczury", JSON.stringify(data) );
}
