function init(e) {
  e.block.setModel('minecraft:quartz_block');
}

function interact(e) {
  var mainh = e.player.getMainhandItem();

  if (mainh.getName() == 'minecraft:written_book') {
    var text = mainh.getText();
    var przepustka = e.player.world.createItem(
      'variedcommodities:letter',
      0,
      2
    );
    var lore = [];
    przepustka.setCustomName('§6Przepustka do pokoju VIP Gringotta');
    lore.push('§9Przepustka należy do:');

    var t = JSON.parse(text[0]);
    var t1 = t['text'].split('\n')[0];
    lore.push('§e' + t1);

    przepustka.setLore(lore);
    mainh.setStackSize(0);
    e.player.giveItem(przepustka);
    return e.player.message('[§cGringott§f] §7Dodano Przepustkę! (+1 kopia)');
  }
}
