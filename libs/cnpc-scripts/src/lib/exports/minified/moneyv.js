var API = Java.type('noppes.npcs.api.NpcAPI').Instance(),
  world = API.getIWorlds()[0];
function payPlayer(e, r) {
  if (!e) return 'No name!';
  if (isNaN(parseFloat(r))) return 'Wrong ammount';
  var a = API.executeCommand(world, 'eco give ' + e + ' ' + r);
  return !!(a && a.indexOf('dodane do') > -1) || 'Error!';
}
function requestPayment(e, r) {
  if (!e) return 'No name!';
  if (isNaN(parseFloat(r))) return 'Wrong ammount';
  if (0 == r) return !0;
  var a = API.executeCommand(world, 'balance ' + e);
  if (((a = a.split('§c  ')[1]), isNaN(a))) return 'NAN';
  if (a < r) return "Player's broke!";
  var n = API.executeCommand(world, 'eco take ' + e + ' ' + r);
  return !!(n && n.indexOf('taken from') > -1) || 'Error!';
}
function wallet(e) {
  if (!e) return 'No name!';
  var r = API.executeCommand(world, 'balance ' + e);
  return (r = r.split('§c  ')[1]), isNaN(r) ? 0 : parseFloat(r);
}
