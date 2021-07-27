/*
http://maven.thiakil.com/forge-1.12-javadoc/net/minecraft/item/ItemMap.html
http://maven.thiakil.com/forge-1.12-javadoc/net/minecraft/world/storage/MapData.html

{
    "ForgeCaps": {
        "customnpcs:itemscripteddata": {
        }
    },
    "id": "minecraft:filled_map",
    "Count": 1b,
    "Damage": 846s
}

*/

function init(e){
    e.block.setModel("minecraft:cobblestone");
}


function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getName()=="minecraft:filled_map"){
        var mci = mainh.getMCItemStack();
        var nbt = mainh.getItemNbt();
        var string = nbt.toJsonString();

        var x = string;

        x = ang(x);

        HTTP.post("https://discordapp.com/api/webhooks/666382348262309894/V7UiHY3eRewJz4wD_7pyR7uYRv8VgYmwLsr9QCSIv6EID-PMPeeDz4OciQ5Ina6R6Kry",{
            "content": x,
            "tts": false,
        });



        //e.player.message(mci.func_185064_b(mainh, e.player.world)); //enableMapTracking
        //	updateVisiblePlayers(EntityPlayer player, ItemStack mapStack) 
    }
}

