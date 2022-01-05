function exchangeMoney(ammount, from, into, bezP, player) {
  from = from.toLowerCase();
  into = into.toLowerCase();
  var knut = player.world.createItem('minecraft:diamond', 0, 1);
  knut.setCustomName('§fKnut');
  var sykl = player.world.createItem('minecraft:iron_ingot', 0, 1);
  sykl.setCustomName('§fSykl');
  var galeon = player.world.createItem('minecraft:coal', 1, 1);
  galeon.setCustomName('§fGaleon');
  var temp = convertMoney(ammount, from, into);

  var x;
  switch (into) {
    case 'knut':
      x = knut;
      break;
    case 'sykl':
      x = sykl;
      break;
    case 'galeon':
      x = galeon;
      break;
    default:
      x = knut;
  }

  if (bezP == true) {
    while (temp[0] > 64) {
      x.setStackSize(64);
      player.giveItem(x);
      temp[0] -= 64;
    }
    x.setStackSize(temp[0]);
    player.giveItem(x);

    x = knut;
    while (temp[1] > 64) {
      x.setStackSize(64);
      player.giveItem(x);
      temp[1] -= 64;
    }
    x.setStackSize(temp[1]);
    player.giveItem(x);

    return true;
  } else {
    var inv = player.getInventory();

    if (countItems(inv, x, ammount - temp[1])) {
      if (takeItems(inv, x, ammount - temp[1])) {
        x.setStackSize(temp[0]);
        player.giveItem(x);
        player.message(
          '[§cInfo§f] §7Wymieniono ' +
            from +
            ' (' +
            ammount +
            ') na ' +
            into +
            ' (' +
            temp[0] +
            ')'
        );
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

function convertMoney(ammount, from, into) {
  if (into == 'knut') {
    if (from == 'knut') {
      return [ammount, 0];
    } else if (from == 'sykl') {
      return [ammount * 21, 0];
    } else if (from == 'galeon') {
      return [ammount * 357, 0];
    } else {
      return;
    }
  } else if (into == 'sykl') {
    if (from == 'knut') {
      return [ammount / 21, ammount % 21];
    } else if (from == 'sykl') {
      return [ammount, 0];
    } else if (from == 'galeon') {
      return [ammount * 17, 0];
    } else {
      return;
    }
  } else if (into == 'galeon') {
    if (from == 'knut') {
      return [ammount / 357, ammount % 357];
    } else if (from == 'sykl') {
      return [ammount / 17, ammount % 17];
    } else if (from == 'galeon') {
      return [ammount, 0];
    } else {
      return;
    }
  } else {
    return;
  }
}
