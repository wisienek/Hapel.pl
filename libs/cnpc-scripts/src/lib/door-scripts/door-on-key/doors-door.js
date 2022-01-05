/*! \file doors-door.js
 *
 * \brief CNCP script for doors with keys
 *
 * Script made for MC server Hapel.pl
 * PL version
 *
 * Put this into ScriptedDoor.
 * After this right click on it while holding any item that's named "Kluczyk do drzwi"
 * and with lore: ["**nieprzypisany kluczyk**"]
 * You'll recive 6 keys and door will be saved in the file ./doors.json
 * You can also apply locks to the door that can be picked with special item.
 * Some locks can't be picked (100p. one)
 *
 *
 * \author Wisienek
 * \date 2020.01.05
 * \version 1.04.16
 */

var toggle, claim, picked, hardness;
var API = Java.type('noppes.npcs.api.NpcAPI').Instance();
function init(e) {
  var pos = e.block.getPos();
  var kordy = pos.getX() + ' ' + pos.getY() + ' ' + pos.getZ();
  hardness = 0;
  loaddoor(kordy);
  e.block.setBlockModel('minecraft:spruce_door');
  e.block.setOpen(false);
  toggle = 0;
  picked = 0;
}

function interact(e) {
  var mainh = e.player.getMainhandItem();
  if (picked == 1) {
    if (toggle == 1) {
      e.block.setOpen(false);
      toggle = 0;
    } else {
      e.block.setOpen(true);
      toggle = 1;
    }
    picked = 0;
    return;
  }
  if (mainh != null) {
    if (
      mainh.getDisplayName().toLowerCase() == 'admin-key' &&
      mainh.getLore()[0].toLowerCase() ==
        '§c§l**admin key ' + e.player.getDisplayName().toLowerCase() + '**'
    ) {
      e.player.message('Otworzono drzwi Kluczem-admina');
      toggle == 1 ? (toggle = 0) : (toggle = 1);
      toggle == 1 ? e.block.setOpen(true) : e.block.setOpen(false);
      return;
    }
    var pos = e.block.getPos();
    var kordy = pos.getX() + ' ' + pos.getY() + ' ' + pos.getZ();
    if (mainh.getDisplayName() == 'Kluczyk do drzwi') {
      if (mainh.getLore().length == 0) {
        e.setCanceled(true);
        return e.player.message('Coś dziwny ten kluczyk :v');
      }
      if (claim == 0) {
        if (
          mainh.getLore()[0] == '§a**Oryginalny kluczyk**' ||
          mainh.getLore()[0] == '§c**Podrobiony kluczyk**'
        ) {
          e.setCanceled(true);
          e.player.message('Kluczyk nie pasuje do tych drzwi!');
          return;
        } else if (
          mainh.getLore()[0].toLowerCase() == '**nieprzypisany kluczyk**'
        ) {
          if (toggle == 0) {
            toggle = 1;
            e.block.setOpen(true);
            mainh.setStackSize(6);
            mainh.setLore([
              '§a**Oryginalny kluczyk**',
              '§0' + kordy,
              '§0' + e.player.getUUID(),
            ]);
            e.block.getStoreddata().put('DOwner', e.player.getUUID());
            savedoor(e.player, kordy, loaddoor(kordy), 1, hardness);
            claim = 1;
            e.player.message('Zarezerwowano drzwi na kluczyk!');
          } else {
            toggle = 0;
            //executeCommand(e.player, '/me Zamyka drzwi');
            e.block.setOpen(false);
          }
        } else {
          e.setCanceled(true);
          return e.player.message('To chyba nie kluczyk');
        }
      } else {
        if (mainh.getLore().length > 2) {
          if (
            mainh.getLore()[2].indexOf(e.block.getStoreddata().get('DOwner')) >
              -1 &&
            mainh.getLore()[1].indexOf(kordy) > -1
          ) {
            if (toggle == 1) {
              e.block.setOpen(false);
              toggle = 0;
              //executeCommand('sudo '+e.player.getName()+' /me Zamyka drzwi');
            } else {
              toggle = 1;
              e.block.setOpen(true);
              //executeCommand(e.player, '/me Otwiera drzwi');
            }
          } else {
            e.setCanceled(true);
            return e.player.message('Kluczyk nie pasuje do dziurki');
          }
        } else {
          if (mainh.getLore()[1] == '§cKopia') {
            mainh.setLore([
              '§a**Oryginalny kluczyk**',
              '§0' + kordy,
              '§0' + e.block.getStoreddata().get('DOwner'),
            ]);
            if (mainh.getStackSize() < 2) {
              mainh.setStackSize(2);
            }
          }
          e.setCanceled(true);
          e.player.message('Nie masz odpowiedniego kluczyka!');
        }
      }
    } else if (
      mainh.getDisplayName() == 'Wytrych' &&
      (mainh.getLore()[0].toLowerCase() == '**dobrej jakości wytrych**' ||
        mainh.getLore()[0].toLowerCase() ==
          '**dobrej jakości magiczny wytrych**')
    ) {
      if (
        hardness >= 80 &&
        hardness != 100 &&
        mainh.getLore()[0].toLowerCase() !=
          '**dobrej jakości magiczny wytrych**'
      ) {
        e.setCanceled(true);
        return e.player.message(
          'Drzwi nie da się otworzyć normalnym wytrychem'
        );
      } else if (hardness == 100) {
        e.setCanceled(true);
        return e.player.message('Drzwi wydają się być nieprzenikalne!');
      }
      if (wytrych() == true) {
        e.player.sendNotification('Włamywacz', 'Otworzono drzwi!', 2);
        //executeCommand(e.player, "/me Otworzył drzwi za pomocą wytrychu dobrej jakości");
        e.block.setOpen(true);
        picked = 1;
        toggle == 1 ? (toggle = 0) : (toggle = 1);
      } else {
        e.setCanceled(true);
        e.player.message('**nie powiodło się, wytrych zużył się!**');
        //executeCommand(e.player, "/do Wytrych pękł");
        var times = Number(mainh.getLore()[1].split('/')[0]);
        if (times > 1) {
          times -= 1;
          mainh.setLore([
            mainh.getLore()[0],
            times + '/' + mainh.getLore()[1].split('/')[1],
          ]);
        } else {
          mainh.setStackSize(mainh.getStackSize() - 1);
        }
        return;
      }
    } else if (
      mainh.getDisplayName() == 'Magiczny zamek' &&
      mainh.getLore()[0].toLowerCase() == '**prawdziwy zaklęty zamek**'
    ) {
      if (mainh.getLore().length < 3) {
        return e.player.message('Zamek nie ma narzuconego zabezpieczenia :<');
      }
      if (Number(mainh.getLore()[2]) <= hardness) {
        return e.player.message('Na drzwiach jest potężniejszy zamek');
      }
      e.setCanceled(true);
      var hardness1 = Number(mainh.getLore()[2]);
      mainh.setStackSize(mainh.getStackSize() - 1);
      e.player.sendNotification(
        'Zaklęto drzwi',
        'Pomyślnie nałożono kłudkę o mocy: ' + hardness1,
        2
      );
      savedoor(e.player, kordy, loaddoor(kordy), claim, hardness1);
      hardness = hardness1;
      return;
    } else if (mainh.getDisplayName() == 'info') {
      e.setCanceled(true);
      return e.player.message(
        'claim: ' +
          claim +
          ', Zabezpieczenie: ' +
          hardness +
          ', Kordy: ' +
          kordy +
          ', uuid: ' +
          e.block.getStoreddata().get('DOwner')
      );
    } else if (
      mainh.getDisplayName() == 'lock-break' &&
      mainh.getLore()[0] == '**Admin lock breaker**' &&
      claim == 1
    ) {
      savedoor(e.player, kordy, loaddoor(kordy), 0, 0);
      return e.player.sendNotification(
        'Lock-Breaker',
        'Z powodzeniem złamano zabezpieczenia drzwi',
        2
      );
    } else {
      e.setCanceled(true);
      return;
    }
  } else {
    return e.setCanceled(true);
  }
}

//wytrych
function wytrych() {
  return Math.floor(Math.random() * 100) < 15;
}

//zapisz odczyt
function savedoor(player, kordy, data5, claim, hardness) {
  var writer = new java.io.FileWriter('./door.json');
  data5[kordy] = [player.getUUID(), claim, hardness];
  writer.write(JSON.stringify(data5, null, 2));
  writer.close();
}

function loaddoor(kordy) {
  var ips = new java.io.FileInputStream('./door.json');
  var fileReader = new java.io.InputStreamReader(ips, 'UTF-8');
  var data1 = fileReader.read();
  var data;
  var start1 = '';
  while (data1 != -1) {
    data = String.fromCharCode(data1);
    start1 = start1 + data;
    data1 = fileReader.read();
  }
  ips.close();
  if (start1.length == 0) {
    start1 = '{}';
  }
  var data5 = JSON.parse(start1);
  if (data5[kordy]) {
    claim = data5[kordy][1];
    hardness = data5[kordy][2];
  } else {
    claim = 0;
  }
  return data5;
}
/*
function executeCommand(cmd){
    var API = Java.type('noppes.npcs.api.NpcAPI').Instance();
    return API.createNPC(API.getIWorld(0).getMCWorld()).executeCommand(cmd);
}

function executeCommand(player, command) {
    return API.createNPC(player.world.getMCWorld()).executeCommand("/execute "+player.getName()+" ~ ~ ~ "+command);
}
*/
