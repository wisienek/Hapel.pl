function interact(e){
    if(e.player.isSneaking()){return}
    var data = e.npc.getStoreddata();
    var last = data.get("last") || Date.now()-86500000;
    if(timeElapsed(last,"24hrs")){
        var date = new Date(Date.now());
        var wdata = e.player.world.getStoreddata().get("plecaki");
        if(wdata){wdata=JSON.parse(wdata)}else{wdata={}}
        
        var dts = date.getDate()+"_"+(date.getMonth()+1)+"_"+date.getFullYear();
       
        var x = saveFile("plecaki_copy/"+dts+".json",wdata);
        if(x){e.player.world.broadcast("[§cPlecaki§f] §7Stworzono kopię zapasową plecaków!");}
        data.put("last",date.getTime());
    }else{
        var date = new Date(last);
        last = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+" o "+date.getUTCHours()+":"+date.getUTCMinutes();
        e.player.message("[§cNPC§f] §7Ostatnia kopia została wykonana: §b"+last+"§7. Można robić co 24h");
    }
}
function timeElapsed(e,t){if(!t){t="10sec"}if(!e)return!1;switch((t={length:parseInt(t),type:t.split(parseInt(t))[1].toLocaleLowerCase(),dnow:Date.now()}).type){case"sec":t.length*=1e3;break;case"min":t.length*=6e4;break;case"hrs":t.length*=36e5;break;case"days":t.length*=864e5;break;case"mon":t.length*=2592e6;break;case"yrs":t.length*=31104e6}return e+t.length-t.dnow<0}

