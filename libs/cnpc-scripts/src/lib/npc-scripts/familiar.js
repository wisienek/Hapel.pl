var owner;

function init(e) {
  var data = e.npc.getStoreddata();
  owner = data.get('owner');
}

function interact(e) {
  if (e.player.isSneaking()) {
    if (owner != e.player.getName()) {
      return;
    }
    var riders = e.player.getAllRiders();

    if (riders.length > 0) {
      e.player.clearRiders();
      if (riders[0] != e.npc) {
        e.player.addRider(e.npc);
      }
    } else {
      e.player.addRider(e.npc);
    }
  }
}
