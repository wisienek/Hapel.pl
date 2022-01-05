/*! \file mmvat.js
 *
 * \brief CNCP script for Player's trader (vat only)
 *
 * Script made for MC server Hapel.pl
 * Trader will get vat from products and store it in world data
 *
 * \author Wisienek
 * \date 2019.12.23
 * \version 1.02.24
 */

function role(e) {
  if (e.npc.getRole().getType() == 1) {
    if (e.sold.getStackSize() > 0) {
      if (e.receiving === undefined) {
        var curr = '';
        if (e.currency1) {
          curr +=
            e.currency1.getStackSize() + 'x ' + e.currency1.getDisplayName();
          getCurr(e, e.currency1);
        }
        if (e.currency2) {
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
        //e.player.sendNotification("Sprzedaż","Kupiono " + e.sold.getDisplayName() + " (" + e.sold.getStackSize() + ")" ,0);
      } else {
        return;
      }
    }
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
  return API.createNPC(API.getIWorld(0).getMCWorld()).executeCommand(cmd);
}
