function damaged(e){
    var curh = e.npc.getHealth();

    var mainh = e.source.getMainhandItem();
    if(mainh.getDisplayName()=="§cPogromca szczurów"){
        e.npc.setHealth(curh-3);
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
    x['Normal']+=1;

    if( x['Normal']/20 != 0 && x['Normal']%20 == 0 ){
        e.source.message("[§cQuestLog§f] §7Gratulacje, pokonałeś już §6"+ x['Normal']+ "§7 małych szczurów!");

        var item = world.createItem("variedcommodities:coin_iron",0,1);
        item.setCustomName("§7Srebrny pieniążek");
        e.source.giveItem(item);
    }

    data[e.source.getName()] = x;

    return world.getStoreddata().put("szczury", JSON.stringify(data) );
}
