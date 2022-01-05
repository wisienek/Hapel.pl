function interact(e){
    if(e.player.isSneaking()) return
    if(e.type==2){
        e.player.message("--------------§bStoreddata");
        var data = e.target.getStoreddata();
        var keys = data.getKeys();
        for(var i=0; i<keys.length; i++){
            e.player.message("§a"+keys[i]+" §7: §c"+data.get(keys[i]));
        }
        e.player.message("--------------§bTempdata");

        data = e.target.getTempdata();
        keys = data.getKeys();
        for(var i=0; i<keys.length; i++){
            e.player.message("§a"+keys[i]+" §7: §c"+data.get(keys[i]));
        }
    }
}