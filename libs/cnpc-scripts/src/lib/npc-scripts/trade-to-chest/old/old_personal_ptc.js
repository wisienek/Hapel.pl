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
 * \version 1.02.28
 */

function interact(e) {
  var mainh = e.player.getMainhandItem();
  var lore = mainh.getLore();
  if (lore.length == 0) {
    return;
  }
  var npcData = e.npc.getStoreddata();
  var tempData = e.npc.getTempdata();

  var owner = npcData.get('owner');

  if (
    mainh.getName() == 'variedcommodities:blueprint' &&
    mainh.getDisplayName().indexOf('NPC edit') > -1 &&
    mainh.getLore()[0] == 'Edytowanie' &&
    owner &&
    owner == e.player.getUUID()
  ) {
    if (tempData.get('edit') == true) {
      tempData.put('edit', false);
      return e.player.message('[§cNPC§f] §7Wyłączono tryb edytowania!');
    } else {
      tempData.put('edit', true);
      return e.player.message('[§cNPC§f] §7Włączono tryb edytowania!');
    }
  }
  if (
    mainh.getName() == 'variedcommodities:blueprint' &&
    mainh.getDisplayName().indexOf('NPC edit') > -1 &&
    owner &&
    owner == e.player.getUUID() &&
    tempData.get('edit') == true
  ) {
    if (lore[0] == 'Edytowanie') {
      if (tempData.get('edit') == true) {
        tempData.put('edit', false);
        return e.player.message('[§cNPC§f] §7Wyłączono tryb edytowania!');
      } else {
        tempData.put('edit', true);
        return e.player.message(
          '[§cNPC§f] §7Włączono tryb edytowania! Wybierz teraz opcję (na blueprincie i PPM na NPC)'
        );
      }
    } else if (lore[0] == 'Dodaj przedmiot') {
      tempData.put('mode', 'dodawanie');
      tempData.put('ustaw', 'buy1');
      e.player.message('[§cNPC§f] §7Włączono tryb dodawania przedmiotów!');
      return e.player.message(
        '[§cNPC§f] §7Weź przedmiot 1 do łapy, walnij NPCta, weź 2 walnij, weź sprzedawane i walnij'
      );
    } else if (lore[0] == 'Usuń przedmiot') {
      tempData.put('mode', 'usuwanie');
      e.player.message('[§cNPC§f] §7Włączono tryb usuwania przedmiotów!');
      return e.player.message(
        '[§cNPC§f] §7Napisz w książce jaki numer chcesz usunąć i walnij nią NPCta'
      );
    } else if (lore[0] == 'Edytuj wygląd') {
      tempData.put('mode', 'wygląd');
      e.player.message('[§cNPC§f] §7Włączono tryb edytowania wyglądu!');
      return e.player.message(
        '[§cNPC§f] §7Zapisz w zeszycie: 1linijka- Nazwa/Skin, 2linijka- nazwa/LINK do skina'
      );
    } else if (lore[0] == 'Edytuj webhook') {
      tempData.put('mode', 'webhook');
      e.player.message('[§cNPC§f] §7Włączono tryb edytowania webhooka!');
      return e.player.message(
        '[§cNPC§f] §7Zapisz w zeszycie: 1linijka: webhook, 2linijka: link do webhooka'
      );
    } else {
      return e.player.message('[§cNPC§f] §7Wystąpił błąd!');
    }
  }
}

function role(e) {
  if (e.npc.getRole().getType() == 1) {
    if (!e.sold) {
      return;
    }
    if (e.sold.getStackSize() > 0) {
      if (e.receiving === undefined) {
        var chest1 = e.npc.world.getBlock(
          e.npc.getBlockX(),
          e.npc.getBlockY(),
          e.npc.getBlockZ()
        );
        var data = e.npc.getStoreddata();
        var hook = data.get('webhook');
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
          if (hook) {
            var x =
              '**' +
              e.player.getDisplayName() +
              '** kupil ' +
              e.sold.getStackSize() +
              'x ' +
              e.sold.getDisplayName() +
              ' za ' +
              curr;
            x = ang(x);
            HTTP.post(hook, {
              content: x,
              tts: false,
            });
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
        } else {
          e.setCanceled(true);
          if (hook) {
            var x =
              'NPC: **' +
              e.npc.getName() +
              '** Nie ma towaru: **' +
              e.sold.getDisplayName() +
              '** (' +
              e.sold.getStackSize() +
              ')';
            x = ang(x);
            HTTP.post(hook, {
              content: x,
              tts: false,
            });
          }
          return;
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
  return API.createNPC(API.getIWorld(0).getMCWorld()).executeCommand(cmd);
}

var URL = Java.type('java.net.URL');
var HttpURLConnection = Java.type('java.net.HttpURLConnection');
var BufferedReader = Java.type('java.io.BufferedReader');
var DataOutputStream = Java.type('java.io.DataOutputStream');
var InputStreamReader = Java.type('java.io.InputStreamReader');
var String = Java.type('java.lang.String');

var HTTP = {
  get: function (url, contentType) {
    var obj = new URL(url);
    var con = obj.openConnection();

    con.setRequestMethod('GET');
    con.setRequestProperty('User-Agent', 'Mozilla/5.0');

    var responseCode = con.getResponseCode();

    var input = new BufferedReader(new InputStreamReader(con.getInputStream()));
    var inputLine;
    var response = '';
    while ((inputLine = input.readLine()) != null) {
      response = response + inputLine + '\n';
    }
    input.close();
    print(response);

    switch (contentType) {
      case 'application/json':
        response = cson_parse(response);
        break;
    }

    return {
      success: responseCode === 200,
      data: response,
      reponseCode: responseCode,
    };
  },
  post: function (url, data) {
    var obj = new URL(url);
    var con = obj.openConnection();
    con.setDoInput(true);
    con.setDoOutput(true);
    con.setInstanceFollowRedirects(false);
    con.setRequestMethod('POST');
    con.setRequestProperty('Content-Type', 'application/json; utf-8');
    con.setRequestProperty('User-Agent', 'Mozilla/5.0');

    var os;
    try {
      os = con.getOutputStream();
      var writer = new DataOutputStream(os);
      writer.writeBytes(new String(JSON.stringify(data)));
      writer.flush();
      writer.close();
      os.close();
    } catch (exc) {
      //print("problem:" +exc);
    }
    var br;
    var res = null;
    try {
      br = new BufferedReader(
        new InputStreamReader(con.getInputStream(), 'UTF-8')
      );
      var response = '';
      var responseLine = null;
      while ((responseLine = br.readLine()) != null) {
        response += responseLine.trim();
      }
      res = JSON.parse(response.toString());
    } catch (exc) {
      //print("problem:" +exc);
    }
    con.disconnect();

    return res;
  },
};

function ang(txt) {
  txt = txt
    .replace(/ą/g, 'a')
    .replace(/Ą/g, 'A')
    .replace(/ć/g, 'c')
    .replace(/Ć/g, 'C')
    .replace(/ę/g, 'e')
    .replace(/Ę/g, 'E')
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'L')
    .replace(/ń/g, 'n')
    .replace(/Ń/g, 'N')
    .replace(/ó/g, 'o')
    .replace(/Ó/g, 'O')
    .replace(/ś/g, 's')
    .replace(/Ś/g, 'S')
    .replace(/ż/g, 'z')
    .replace(/Ż/g, 'Z')
    .replace(/ź/g, 'z')
    .replace(/Ź/g, 'Z')
    .replace(/§/g, '&');
  return txt;
}
