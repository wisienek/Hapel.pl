/*! \file trade_to_chest.js
 *
 * \brief CNCP script for Player's trader
 *
 * Script made for MC server Hapel.pl
 * Trader will put any items that player's paid into chest,
 * And get those sold items from the same chests under it.
 * You can change how many blocks under it will check by changing the box value in conditios
 *
 * \author Wisienek
 * \date 2019.12.23
 * \version 1.02.24
 */

function role(e) {
  if (e.npc.getRole().getType() == 1) {
    if (e.sold.getStackSize() > 0) {
      if (e.receiving === undefined) {
        var chest1 = e.npc.world.getBlock(
          e.npc.getBlockX(),
          e.npc.getBlockY(),
          e.npc.getBlockZ()
        );
        if (getsold(e.sold, chest1, e, 0)) {
          var curr = '';
          if (e.currency1) {
            lookforitems(e.currency1, chest1, e, 0);
            curr +=
              e.currency1.getStackSize() + 'x ' + e.currency1.getDisplayName();
            getCurr(e, e.currency1);
          }
          if (e.currency2) {
            lookforitems(e.currency2, chest1, e, 0);
            if (curr.length > 0) {
              curr += ' ';
            }
            curr +=
              e.currency2.getStackSize() + 'x ' + e.currency2.getDisplayName();
            getCurr(e, e.currency2);
          }
          executeCommand(
            'traderlog ' +
              e.player.getDisplayName() +
              ' kupil ' +
              e.sold.getStackSize() +
              'x ' +
              e.sold.getDisplayName() +
              ' za ' +
              curr
          );
          var x =
            e.player.getDisplayName() +
            ' kupil ' +
            e.sold.getStackSize() +
            'x ' +
            e.sold.getDisplayName() +
            ' za ' +
            curr;
          x = ang(x);
          HTTP.post(passes.hooks.mainLog, {
            content: x,
            tts: false,
          });
        } else {
          return e.setCanceled(true);
        }
      } else {
        return;
      }
    }
  }
}
//! Function that searches for item that is beeing sold
/*!
    \param i1 - IItemStack object that's beeing searched
    \param chest1 - IBlock object that's beeing searched through
    \param e - event object
    \param box - integer type value that indicates how many boxes it searched
*/
function getsold(i1, chest1, e, box) {
  if (box == 4 && i1.getStackSize() > 0) {
    e.npc.say(
      'Sprzedawca nie ma towaru: ' +
        i1.getDisplayName() +
        ', ' +
        i1.getStackSize()
    );
    return false;
  }
  if (!chest1.isContainer() && box != 4) {
    chest1 = e.npc.world.getBlock(
      chest1.getX(),
      chest1.getY() - 1,
      chest1.getZ()
    );
    return getsold(i1, chest1, e, box + 1);
  }
  if (chest1.isContainer() && chest1.getName() == 'minecraft:chest') {
    var chest = chest1.getContainer();
    var size = chest.getSize();
    var i = 0;
    while (i < size) {
      var y = chest.getSlot(i);
      if (
        i1.getDisplayName() == y.getDisplayName() &&
        y.getStackSize() >= i1.getStackSize()
      ) {
        if (y.getStackSize() - i1.getStackSize() >= 0) {
          y.setStackSize(y.getStackSize() - i1.getStackSize());
          return true;
        } else if (y.getStackSize() - i1.getStackSize() < 0) {
          i1.setStackSize(i1.getStackSize() - y.getStackSize());
          y.setStackSize(0);
          return getsold(i1, chest, e, box);
        }
      }
      i++;
    }
    if (i == size) {
      chest1 = e.npc.world.getBlock(
        chest1.getX(),
        chest1.getY() - 1,
        chest1.getZ()
      );
      return getsold(i1, chest1, e, box + 1);
    }
  }
}
//! Function that searches and removes items form chests below npc.
/*!
    \param i1 Type IItemStack - searched item
    \param chest1 type IBlock - container (chest)
    \param e - parsed event
    \param box - integer value, how many blocks it has checked already
*/
function lookforitems(i1, chest1, e, box) {
  if (box == 4) {
    e.npc.say(
      'Nie trafiło do skrzyni: ' +
        i1.getDisplayName() +
        ' (' +
        i1.getStackSize() +
        ')'
    );
    return e.npc.say('Nie znaleziono skrzyni pod npc w ilości 3 kratek');
  }
  if (!chest1 || chest1.getName() != 'minecraft:chest') {
    chest1 = e.npc.world.getBlock(
      chest1.getX(),
      chest1.getY() - 1,
      chest1.getZ()
    );
    return lookforitems(i1, chest1, e, box + 1);
  }
  if (chest1.getName() == 'minecraft:chest') {
    var chest = chest1.getContainer();
    var size = chest.getSize();
    var maxsize = i1.getMaxStackSize();
    var i = 0;
    while (i < size) {
      var y = chest.getSlot(i);
      if (y.isEmpty()) {
        chest.setSlot(i, i1);
        break;
      } else if (
        i1.getDisplayName() == y.getDisplayName() &&
        y.getStackSize() <= maxsize
      ) {
        if (y.getStackSize() + i1.getStackSize() <= maxsize) {
          y.setStackSize(y.getStackSize() + i1.getStackSize());
          break;
        } else if (
          y.getStackSize() != maxsize &&
          y.getStackSize() + i1.getStackSize() > maxsize
        ) {
          i1.setStackSize(i1.getStackSize() - maxsize + y.getStackSize());
          y.setStackSize(maxsize);
          lookforitems(i1, chest1, e, box);
          break;
        }
      }
      i++;
    }
    if (i == size) {
      chest1 = e.npc.world.getBlock(
        chest1.getX(),
        chest1.getY() - 1,
        chest1.getZ()
      );
      return lookforitems(i1, chest1, e, box + 1);
    }
  } else {
    return;
  }
}

//!Function that checks if item bought is currency
function getCurr(e, cur) {
  var val;
  var name = cur.getDisplayName();
  if (name.indexOf('Knut') > -1) {
    val = 1;
  } else if (name.indexOf('Sykl')) {
    val = 21;
  } else if (name.indexOf('Galeon')) {
    val = 365;
  } else {
    val = 0;
  }
  if (val > 0) {
    var data = e.npc.world.getStoreddata();
    var vatp = e.npc.world.getStoreddata().get('VatVal');
    var kasa = data.get('MMVat');
    kasa += val * cur.getStackSize() * vatp;
    data.put('MMVat', kasa);
    var p = e.npc.world.getPlayer('Przesladowca');
    if (p) {
      p.message(
        '[§cPodatnik§f] §7Pobrano vat z: §e' +
          val * cur.getStackSize() +
          '§7k (' +
          cur.getStackSize() * vatp +
          '), aktualny stan: §e' +
          kasa.toFixed(2) +
          '§7k'
      );
    }
  }
  return;
}

function executeCommand(cmd) {
  var API = Java.type('noppes.npcs.api.NpcAPI').Instance();
  return API.executeCommand(cmd);
}
