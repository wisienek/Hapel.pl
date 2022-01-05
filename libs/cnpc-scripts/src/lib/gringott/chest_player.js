function containerClosed(e) {
  var tempdata = e.player.getTempdata();
  var sejf = tempdata.get('sejf');
  var plecak = tempdata.get('plecak');
  if (sejf) {
    var block = e.player.world.getBlock(sejf[0], sejf[1], sejf[2]);
    var blockdata = block.getStoreddata();
    var size = e.container.getSize() - 37;
    var items = [];
    for (var x = 0; x <= size; x++) {
      var slot = e.container.getSlot(x);
      if (slot.getName().indexOf('air') == -1) {
        items.push([x, slot.getItemNbt().toJsonString()]);
      }
    }
    blockdata.put('itemy', JSON.stringify(items));
    tempdata.remove('sejf');
    return;
  }
  if (plecak) {
    var size = e.container.getSize() - 37;
    var items = [];
    for (var x = 0; x <= size; x++) {
      var slot = e.container.getSlot(x);
      if (slot.getName().indexOf('air') == -1) {
        if (slot.getDisplayName().indexOf('Plecak.') > -1) {
          var lore = slot.getLore();
          if (lore.length > 0) {
            if (lore[0].split('§0')[1] == plecak) {
              e.player.giveItem(slot);
              e.player.message(
                '[§cPlecak§f] §7Nie możesz przechowywać plecaka w samym sobie!'
              );
              continue;
            }
          }
        }
        items.push([x, slot.getItemNbt().toJsonString()]);
      }
    }
    var worlddata = e.player.world.getStoreddata();
    var plecaki = worlddata.get('plecaki');
    plecaki = JSON.parse(plecaki);
    plecaki[plecak] = items;
    tempdata.remove('plecak');
    worlddata.put('plecaki', JSON.stringify(plecaki));
    return;
  }
  return;
}

//logout
function logout(e) {
  var tempdata = e.player.getTempdata();
  var sejf = tempdata.get('sejf');
  var plecak = tempdata.get('plecak');
  if (sejf) {
    var block = e.player.world.getBlock(sejf[0], sejf[1], sejf[2]);
    var blockdata = block.getStoreddata();
    var size = e.player.getOpenContainer().getSize() - 37;
    var items = [];
    for (var x = 0; x <= size; x++) {
      var slot = e.player.getOpenContainer().getSlot(x);
      if (slot.getName().indexOf('air') == -1) {
        items.push([x, slot.getItemNbt().toJsonString()]);
      }
    }
    blockdata.put('itemy', JSON.stringify(items));
    tempdata.remove('sejf');
    return;
  }
  if (plecak) {
    var size = e.player.getOpenContainer().getSize() - 37;
    var items = [];
    for (var x = 0; x <= size; x++) {
      var slot = e.player.getOpenContainer().getSlot(x);
      if (slot.getName().indexOf('air') == -1) {
        if (slot.getDisplayName().indexOf('Plecak.') > -1) {
          var lore = slot.getLore();
          if (lore.length > 0) {
            if (lore[0].split('§0')[1] == plecak) {
              e.player.giveItem(slot);
              e.player.message(
                '[§cPlecak§f] §7Nie możesz przechowywać plecaka w samym sobie!'
              );
              continue;
            }
          }
        }
        items.push([x, slot.getItemNbt().toJsonString()]);
      }
    }
    var worlddata = e.player.world.getStoreddata();
    var plecaki = worlddata.get('plecaki');
    plecaki = JSON.parse(plecaki);
    plecaki[plecak] = items;
    tempdata.remove('plecak');
    worlddata.put('plecaki', JSON.stringify(plecaki));
    return;
  }
  return;
}
