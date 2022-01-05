function init(e) {
  e.block.setModel('minecraft:lit_pumpkin');
}
function interact(e) {
  if (e.player.isSneaking()) {
    return e.player.message('[§cDowody§f] §7Kucasz, akcja przerwana!');
  }
  var mainh = e.player.getMainhandItem();
  if (mainh.getName() == 'minecraft:writable_book') {
    return e.player.message('[§cDowody§f] §7Książka musi być podpisana!');
  }
  if (mainh.getName() == 'minecraft:written_book') {
    var text = mainh.getText();
    var book = e.player.world.createItem('minecraft:enchanted_book', 0, 2);
    var lore = [];
    for (var x = 0; x < text.length; x++) {
      var t = JSON.parse(text[x]);
      var t1 = t['text'].split('\n');
      for (var y = 0; y < t1.length; y++) {
        t1[y] = '§7' + t1[y].split('§0')[1];
      }
      if (x == 0) {
        book.setCustomName(t1[0]);
        t1.shift();
      }
      lore = lore.concat(t1);
    }
    book.setLore(lore);
    mainh.setStackSize(0);
    e.player.giveItem(book);
    return e.player.message('[§cDowody§f] §7Dodano dowód! (+1 kopia)');
  } else {
    return e.player.message('[§cDowody§f] §7Musisz trzymać podpisaną książkę!');
  }
}
