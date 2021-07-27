/*
    requires:
    - postreq
*/


function init(e){
    e.block.setModel("cfm:printer");
}


function clicked(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getName().indexOf("book")>-1){
        var paper = e.player.world.createItem("minecraft:paper",0,11);
        if(maItem(e.player,paper)){

            var copy = e.player.world.createItemFromNbt(mainh.getItemNbt());
            e.player.giveItem(copy);

            var x = "Gracz **"+e.player.getName()+"** Wydrukował kopię książki: **"+mainh.getDisplayName()+"**, opis: "+mainh.getLore();
            x=ang(x);
            HTTP.post(passes.hooks.mainLog,{
                "content": x,
                "tts": false,
            });

            return e.player.message("[§cDrukarnia§f] §7Wydrukowano kopię książki!");

        }else{
            return e.player.message("[§cDrukarnia§f] §7Musisz mieć w jednym staku 11 papieru!");
        }
    }

}



function maItem(player,item){
    var inv = player.getInventory();
    var items = inv.getItems();
    for(var x=0;x<items.length;x++){
        if(items[x].getName()==item.getName() && items[x].getDisplayName()==item.getDisplayName()){
            var i = items[x];
            i.setStackSize(i.getStackSize()-item.getStackSize());
            return true;
        }
    }
    return false;
}

