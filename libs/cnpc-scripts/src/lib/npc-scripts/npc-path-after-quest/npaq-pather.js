var points = [];
var n = 0;
function init(e) {
  e.item.setTexture(9, 'minecraft:compass');
  e.item.setItemDamage(9);
  e.item.setDurabilityShow(false);
  e.item.setCustomName('Pather do NPC');
  e.item.setLore([
    'Instrukcja użycia:',
    '§f§l1.§rStań na miejscu, które zostanie punktem',
    '§f§l2.§rKliknij §e§lPPM§r aby zapisać punkt',
    '§f§l3.§rPo zapisaniu wszystkich punktów Kliknij §e§lPPM§r na NPC',
    '§rJeżeli chcesz resetować punkty kliknij §c§lLPM§r!',
    '=============================================',
  ]);
}
function attack(e) {
  if (n == 0) {
    n = 1;
    return e.player.message(
      'Kliknij §c§lLPM§r jeszcze raz aby potwierdzić usunięcie wszystkich punktów'
    );
  }
  points = [];
  n = 0;
  e.player.message('Resetowano punkty!');
}
function interact(e) {
  if (e.type == 1) {
    if (e.npc.getTempData().has('punkty')) {
      e.npc.getTempData().put('punkty', points);
      e.player.message(
        'Dodano ' + points.length + ' punktów do npc ' + e.npc.getDisplayName()
      );
      points = [];
      return;
    }
    return e.player.message('niepowodzenie!');
  } else {
    var pos = e.player.getPos();
    var point = [pos.getX(), pos.getY(), pos.getZ()];
    points.push(point);
    e.player.message(
      'Dodano punkt: X:' + point[0] + ' Y:' + point[1] + ' Z:' + point[2]
    );
  }
}
