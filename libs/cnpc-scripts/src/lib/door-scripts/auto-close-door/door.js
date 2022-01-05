
function init(event) {
    event.	block.setBlockModel("minecraft:wooden_door");
}

function interact(event) {
    event.setCanceled(true);
}


function collide(event) {
    if(event.entity.type == EntityType_PLAYER) {
        if(event.block.getOpen() == false){
            event.block.setOpen(true);
            runDelay(2, function(){
                event.block.setOpen(false);
            });
        }
    }
}

function tick(event) {
    runDelayTick();
}






var _TIMERS = [];
/**
 * Executes a function after a certain amount of time
 * @param {int} seconds Time in seconds
 * @param {Function} callback Function to execute
 */
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








