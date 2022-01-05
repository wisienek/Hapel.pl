var opt;
function init(e) {
  e.item.setTexture(22, 'minecraft:rabbit_foot');
  e.item.setItemDamage(22);
  e.item.setDurabilityShow(false);
  e.item.setCustomName('Gwizdek');
  e.item.setLore([
    '§bGwizdek Stefana',
    '§eLPM:§r Zmienia opcje',
    '§cPPM:§r Gwiżdże',
    '§7Opcja 1: Powiadamia o niebezpieczeństwie',
    '§7Opcja 2: Powiadamia o chęci wejścia',
  ]);
  opt = 0;
}

function attack(e) {
  if (opt == 0) {
    e.player.message(
      '§c[Gwizdek]§7 Wybrałeś opcję 1: powiadomienie o niebezpieczeństwu'
    );
    opt = 1;
  } else {
    e.player.message(
      '§c[Gwizdek]§7 Wybrałeś opcję 2: powiadomienie o chęci wejścia'
    );
    opt = 0;
  }
}

function interact(e) {
  var stefan = e.player.world.getEntity('9bface2a-6576-46be-9da5-c6bb767bbbc7');
  var pos = e.player.getPos();
  var bpos = [
    [89, 90, 83],
    [9, 119, 243],
    [24, 82, 473],
  ];
  var sblok;
  var dist;
  for (var x in bpos) {
    var blok = e.player.world.getBlock(bpos[x][0], bpos[x][1], bpos[x][2]);
    var dist1 = pos.distanceTo(blok.getPos());
    if (dist > dist1 || dist == undefined) {
      dist = dist1;
      if (x == 0) {
        sblok = 'obozu';
      } else if (x == 1) {
        sblok = 'biblioteki';
      } else if (x == 2) {
        sblok = 'błoni';
      }
    }
  }

  if (!stefan) {
    e.player.message('Stefan nie usłyszał gwizdka');
    return;
  } else {
    e.player.message('Stefan usłyszał gwizdek!');
    if (opt == 1) {
      stefan.say(
        '§7hej, mamy kłopot! (§e' +
          e.player.getDisplayName() +
          '§7, najbliżej przejścia: §c' +
          sblok +
          ' [' +
          parseInt(dist) +
          'm]§7)'
      );
    } else {
      stefan.say(
        '§e' +
          e.player.getDisplayName() +
          '§7 chce wejść! jest najbliżej wejścia:§c ' +
          sblok +
          ' [' +
          parseInt(dist) +
          'm]'
      );
    }
    return;
  }
}
