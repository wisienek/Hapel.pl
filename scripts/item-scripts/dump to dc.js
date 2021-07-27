//import postreq

function interact(e){
    /*
        Declare some value to export to dc as string.
    */
    var mainh = e.player.getMainhandItem().getItemNbt();
    var x = mainh.toJsonString();


    x = ang(x);

   HTTP.post(passes.hooks.mainLog,{
        "content": x,
        "tts": false,
    });

}