var skins = [
  'toast.png',
  'black.png',
  'brown.png',
  'caerbannog.png',
  'gold.png',
  'salt.png',
  'white.png',
  'white_splotched.png',
];
function init(e) {
  function ri() {
    var m = Math.floor(Math.random() * skins.length);
    return skins[m];
  }
  e.npc.display.setSkinTexture('minecraft:textures/entity/rabbit/' + ri());
}
function interact(e) {
  var data = e.npc.getStoreddata();
  if (data.get('clickable') == 1) {
    return;
  }
  if (e.player.hasActiveQuest(8)) {
    data.put('clickable', 1);
    runDelay(1, function () {
      data.put('clickable', 0);
    });
    var w = Math.floor(Math.random() * 5);
    if (w == 0) {
      var displ = e.npc.getDisplay();
      displ.setVisible(1);
      runDelay(5, function () {
        displ.setVisible(0);
      });
    }

    var v = Math.floor(Math.random() * 350);
    if (v == 0) {
      e.player.addRider(e.npc);
      data.put('clickable', 1);
      e.player.message('[§cZając§f] §7Złapano szczęśliwego zajączka!');
      e.player.world.broadcast(
        '[§cZając§f] §b' +
          e.player.getName() +
          '§7 Złapał szczęśliwego zajączka!'
      );
      e.player.message(
        '[§cZając§f] §7Zanieś go spowrotem do jajcarza aby odebrać nagrodę!'
      );
    } else {
      return e.player.message('[§cZając§f] §7Zając uciekł!');
    }
  } else {
    return e.player.message('[§cZając§f] §7Nie masz zaakceptowanego questa!');
  }
}

function tick(e) {
  runDelayTick();
}
var _TIMERS = [];
function runDelay(seconds, callback) {
  _TIMERS.push({
    end: new Date().getTime() + seconds * 1000,
    callback: callback,
  });
}
function runDelayTick() {
  if (_TIMERS.length > 0) {
    var _newTimers = [];
    var _curTime = new Date().getTime();
    var timer;
    for (var i = 0; i < _TIMERS.length; i++) {
      timer = _TIMERS[i];
      if (_curTime >= timer.end) {
        timer.callback();
      } else {
        _newTimers.push(timer);
      }
    }
    _TIMERS = _newTimers;
  }
}
