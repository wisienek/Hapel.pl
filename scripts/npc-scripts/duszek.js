var can;
function init(e){
    can = true;
}

function interact(e){
    if(can==false){ return e.npc.say("0") }
    var mainh = e.player.getMainhandItem();
    if(mainh.getDisplayName()=="§7Siatka na duszka"){
        var timers = e.npc.getTimers();
        timers.forceStart(1, 120, false);
        can = false;

        var rand = Math.floor(Math.random()*100);
        if(rand.toString().indexOf("6")>-1){
            mainh.setCustomName("§bSiatka z duszkiem");
            return e.player.message("[§cInfo§f] §7Złapano duszka!");
        }
    }
}

function timer(e){
    if(e.id==1){
        can=true;
        e.npc.say('1');
    }
}
