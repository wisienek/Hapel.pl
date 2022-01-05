var data;
var sc;
var teams;
var x = 0;
function init(e) {
  data = e.API.getIWorld(0).getStoreddata();
  sc = e.API.getIWorld(0).getScoreboard();
  teams = data.get('teams').split(',');
}

function attack(e) {
  if (x < 3) {
    x++;
  } else {
    x = 0;
  }
  e.player.message('Załadowano: ' + teams[x]);
  e.item.setLore(['§e' + teams[x] + ': ' + data.get(teams[x] + '-spawn')]);
}

function interact(e) {
  var pos = e.player.getPos();
  data.put(
    teams[x] + '-spawn',
    pos.getX() + ' ' + pos.getY() + ' ' + pos.getZ()
  );
  e.item.setLore(['§e' + teams[x] + ': ' + data.get(teams[x] + '-spawn')]);
  return e.player.message('Dodano punkt ' + teams[x]);
}
