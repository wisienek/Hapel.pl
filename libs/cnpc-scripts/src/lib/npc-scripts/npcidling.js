// npc object
var npc;
// if npc is looking or not
var looking = true;
// what block is he looking for
var LookingForBlock = 'minecraft:staircase';
// npc's timers
var timers;
// if found staircase it will resolve to below var
var LBlock;

function init(e) {
  npc = e.npc;

  timers = npc.getTimers();

  // start looking around every 3s
  timers.forceStart(1, 60, true);
  // create some function that will imitate npc looking around
  // animateLookingNPC();
}

function timer(e) {
  switch (e.id) {
    case 1:
      return handleLooking(e);
    case 2:
      return checkIfStopped(e);
    case 3:
      return returnBack(e);
  }
}

function handleLooking(e) {
  // scan for block that's npc is looking at
  var raytraced = npc.rayTraceBlock(15, true, false);
  LBlock = raytraced.getBlock();

  if (LBlock && LBlock.getName() === LookingForBlock) {
    // x,y,z, speed
    npc.navigateTo(LBlock.getX(), LBlock.getY() + 1, LBlock.getZ(), 1);

    // stop looking around
    timers.stop(1);
    // start checking if arived
    timers.forceStart(2, 20, true);
  }
}

function checkIfStopped(e) {
  var npcX = parseInt(npc.getX());
  var npcZ = parseInt(npc.getZ());

  if (looking) {
    var blockX = parseInt(LBlock.getX());
    var blockZ = parseInt(LBlock.getZ());

    if (npcX === blockX && npcZ === blockZ) {
      // change state to no longer look for it
      looking = false;

      // stop timer if arrived
      timers.stop(2);

      // reset block
      LBlock = null;

      // change animation to sitting and chillin'
      // animateSittingNPC();

      // timer till npc will come back to original place
      timers.forceStart(3, 20 * 60, false);
    }
  } else {
    // going back
    var pos = npc.getSpawnPoint();
    if (pos.getX() === npcX && pos.getZ() === npcZ) {
      // set back looking
      looking = true;

      // stop this check
      timers.stop(2);

      // start looking around again - if you want it to be delayed just add another timer that's not repeating and fire this one after it's done
      timers.forceStart(1, 60, true);
    }
  }
}

function returnBack(e) {
  // change animation to normal
  // animateNormalNPC();

  var pos = npc.getSpawnPoint();

  npc.navigateTo(pos.getX(), pos.getY(), pos.getZ(), 1);
}
