function interact(e){

    var data = e.npc.getStoreddata();
    if(data.get("clickable")==1){return}

    e.player.message("[§bZając§f] §7Nie udało Ci się złapać zająca!");
    data.put("clickable",1);
    runDelay(1, function(){
        data.put("clickable",0);
    });

    var m = Math.random()*9;
    if(m>6){
        var r = Math.random()*360;
        e.player.knockback(4,r);
        var displ = e.npc.getDisplay();
        displ.setVisible(1);
        runDelay(3, function(){
            displ.setVisible(0);
        });
    }
}

function tick(e){
    runDelayTick();
}
var _TIMERS = [];
function runDelay(seconds, callback) {
    _TIMERS.push({
        end: new Date().getTime()+seconds*1000,
        callback: callback
    });
}
function runDelayTick() {
    if(_TIMERS.length > 0) {
        var _newTimers = [];
        var _curTime = new Date().getTime();
        var timer;
        for(var i = 0; i < _TIMERS.length; i++) {
            timer = _TIMERS[i];
            if(_curTime >= timer.end) {
                timer.callback();
            } else {
                _newTimers.push(timer);
            }
        }
        _TIMERS = _newTimers;
    }
}