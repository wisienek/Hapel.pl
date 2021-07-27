//import postreq

function interact(e){
    /*
        Declare some value to export to dc as string.
    */
    var mainh = e.player.getMainhandItem().getItemNbt();
    var x = mainh.toJsonString();


    x = ang(x);

   HTTP.post("https://discordapp.com/api/webhooks/666382348262309894/V7UiHY3eRewJz4wD_7pyR7uYRv8VgYmwLsr9QCSIv6EID-PMPeeDz4OciQ5Ina6R6Kry",{
        "content": x,
        "tts": false,
    });

}