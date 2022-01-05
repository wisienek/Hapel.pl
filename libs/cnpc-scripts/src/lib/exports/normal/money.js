var API = Java.type('noppes.npcs.api.NpcAPI').Instance();
var knut = API.getIWorlds()[0].createItem('minecraft:diamond', 0, 1);
knut.setCustomName('§fKnut');
var sykl = API.getIWorlds()[0].createItem('minecraft:iron_ingot', 0, 1);
sykl.setCustomName('§fSykl');
var galeon = API.getIWorlds()[0].createItem('minecraft:coal', 1, 1);
galeon.setCustomName('§fGaleon');

var values = {
  Knut: 1,
  Sykl: 21,
  Galeon: 357,
};

function giveMoney(player, ammount) {
  while (ammount > 0) {
    if (ammount / values['Galeon'] >= 1) {
      var x = parseInt(ammount / values['Galeon']);
      if (x > 64) {
        x = 64;
      }
      galeon.setStackSize(x);
      ammount -= values['Galeon'] * x;
      player.giveItem(galeon);
    } else if (ammount / values['Sykl'] >= 1) {
      var x = parseInt(ammount / values['Sykl']);
      if (x > 64) {
        x = 64;
      }
      sykl.setStackSize(x);
      ammount -= values['Sykl'] * x;
      player.giveItem(sykl);
    } else {
      knut.setStackSize(ammount);
      player.giveItem(knut);
      ammount = 0;
    }
  }
  player.updatePlayerInventory();
  return true;
}

function countMoney(cont) {
  var items = cont.getItems();
  var count = {
    Knut: 0,
    Sykl: 0,
    Galeon: 0,
  };
  for (var i = 0; i < 9; i++) {
    if (
      [
        knut.getDisplayName(),
        sykl.getDisplayName(),
        galeon.getDisplayName(),
      ].indexOf(items[i].getDisplayName()) > -1
    ) {
      count[items[i].getDisplayName().split('§f')[1]] +=
        items[i].getStackSize();
    }
  }
  var hasMoney = 0;
  var v = Object.keys(count);
  for (var i = 0; i < v.length; i++) {
    hasMoney += count[v[i]] * values[v[i]];
  }
  return hasMoney;
}

function takeMoney(player, has, ammount) {
  var cont = player.getInventory();
  if (!has) {
    has = countMoney(cont);
  }
  if (ammount > has) {
    return false;
  }
  var items = cont.getItems();
  for (var i = 0; i < 9; i++) {
    //change 9 to number of slots in inventory
    if (
      [
        knut.getDisplayName(),
        sykl.getDisplayName(),
        galeon.getDisplayName(),
      ].indexOf(items[i].getDisplayName()) > -1
    ) {
      items[i].setStackSize(0);
    }
  }
  player.updatePlayerInventory();

  has -= ammount;

  giveMoney(player, has);
  return true;
}
