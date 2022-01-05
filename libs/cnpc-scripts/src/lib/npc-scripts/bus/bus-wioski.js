var wioski = [
  'Londyn',
  'Hogsmeade',
  'River Heights',
  'Spinners end',
  'Dolina Godryka',
  'Little Hangleton',
];

function attack(e) {
  var lore = e.item.getLore();
  if (lore.length == 0) {
    e.item.setLore([wioski[0]]);
    e.player.message(wioski[0]);
    e.player.message('Ustawiono: ' + wioski[0]);
    return;
  }
  if (wioski.indexOf(lore[0]) > -1) {
    var i = wioski.indexOf(lore[0]);
    if (i == wioski.length - 1) {
      i = 0;
    } else {
      i++;
    }
    e.item.setLore([wioski[i]]);
    e.player.message('Zmieniono na: ' + wioski[i]);
    return;
  }
}

function interact(e) {
  if (e.player.isSneaking()) {
    return e.player.message('return');
  }
  var lore = e.item.getLore();
  var data = e.player.world.getStoreddata();
  if (!lore[0]) {
    return e.player.message('Nie ma lore[0]');
  }
  if (!data.get('Bus-Wioski')) {
    data.put('Bus-Wioski', '{}');
  }
  var stops = JSON.parse(data.get('Bus-Wioski'));
  var pos = e.player.getPos();
  stops[lore[0]] = [pos.getX(), pos.getY() + 1, pos.getZ()];

  data.put('Bus-Wioski', JSON.stringify(stops));

  e.player.message('Dodano stop ' + lore[0] + ' !');
}
