var ents = [];
var ai;
function init(e){
    ai = e.npc.getAi();
}
function tick(e){
    ents = e.npc.world.getNearbyEntities(e.npc.getPos(), 2, 1);
    if(ents.length>0){
        e.npc.setRotation(Math.random()*360);
        ai.setNavigationType(1);
        var x = e.npc.getMCEntity();
        x.func_191958_b(Math.random()*1,3,9,0.5);
        var timers = e.npc.getTimers();
        timers.forceStart(1,40,false);
    }
}

function timer(e){
    if(e.id==1){
        ai.setNavigationType(0);
    }
}


