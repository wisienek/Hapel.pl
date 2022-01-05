/*
    requires:
    - moneyv
    - postreq
    - sql_main
*/

function baseGui(e) {
  var gui = e.API.createCustomGui(1, 256, 256, false);
  gui.setBackgroundTexture('customnpcs:textures/gui/elki_e.png');
  return gui;
}

function interact(e) {
  var item = e.player.getMainhandItem();
  var lore = item.getLore();
  if (lore.length > 0) {
    if (lore[0].indexOf('Składnik Eliksiru') > -1) {
      var tdata = e.player.getTempdata();
      var wymiana = tdata.get('wymiana');
      wymiana = JSON.parse(wymiana) || {};

      var name = item.getDisplayName().replace(/§./g, '');
      var ile = parseInt(parseFloat(lore[1].split('§c')[1]));
      var war = lore[1].split(ile)[1];

      if (wymiana[name]) {
        wymiana[name].ile += ile;
      } else {
        wymiana[name] = {
          ile: ile,
          war: war,
          itemName: item.getName(),
        };
      }

      tdata.put('wymiana', JSON.stringify(wymiana));
      item.setStackSize(item.getStackSize() - 1);
      return e.player.message(
        '[§cZielarz§f] §7Dodano do wymiany: §c' + ile + ' ' + name
      );
    }
  }

  return menu(e);
  //if(e.player.getName()=="Przesladowca" || e.player.getName()=="Woolf"){ return menu(e); }
  //return e.player.message("Chwilowo nieczynne!");
}

function menu(e) {
  var gui = baseGui(e);

  gui.addLabel(9, '§1Sprzedawca składników', 90, 0, 130, 20);

  gui.addTexturedButton(
    1,
    '§aKup składnik',
    90,
    80,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );
  gui.addTexturedButton(
    2,
    '§6Sprzedaj składnik',
    45,
    120,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );
  gui.addTexturedButton(
    5,
    '§6Wymień składnik',
    130,
    120,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );
  gui.addTexturedButton(
    3,
    '§dKoszyk',
    90,
    160,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  e.player.showCustomGui(gui);
  return gui;
}

function sprzedaj(e, lista) {
  var gui = baseGui(e);

  gui.addLabel(9, '§1Wybierz składnik', 95, 0, 120, 20);
  gui.addScroll(3, 8, 25, 240, 200, lista);

  e.player.showCustomGui(gui);
  return gui;
}

function confsprzedaj(e, sprzedaje) {
  //nazwa, ilosc, jednostka
  var gui = baseGui(e);

  gui.addLabel(9, '§1Konfiguruj składnik', 95, 0, 120, 20);

  var skladnik = getSkladnik({
    nazwa: sprzedaje.nazwa,
  });

  if (!skladnik || skladnik.error || skladnik.result.length == 0) {
    return e.player.message(
      skladnik.error
        ? '[§cDebugger§f] §7Napotkałeś błąd: ' + skladnik.error
        : '[§cZielarz§f] §7Nie znaleziono składnika na liście!'
    );
  }
  skladnik = skladnik.result[0];

  var wart = (skladnik.cena / skladnik.ilosc) * sprzedaje.ilosc * 0.85;

  gui.addLabel(12, '§cSkładnik: §9' + sprzedaje.nazwa, 86, 50, 140, 20);
  gui.addLabel(
    13,
    '§cWartość za jednostkę: §9§l' +
      ((skladnik.cena / skladnik.ilosc) * 0.85).toFixed(2) +
      ' §r§9knutów',
    40,
    70,
    160,
    20
  );
  gui.addLabel(
    14,
    '§cCena składnika: §9§l' + wart + ' §r§9knutów',
    65,
    90,
    120,
    20
  );

  gui.addTexturedButton(
    15,
    '§bZmień ilość',
    27,
    123,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );
  gui.addTextField(16, 120, 120, 60, 20).setText(sprzedaje.ilosc);

  gui.addTexturedButton(
    21,
    '§aSprzedaj',
    5,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );
  gui.addTexturedButton(
    2,
    '§dWybierz inny składnik',
    170,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  e.player.showCustomGui(gui);
  return gui;
}

function wymien(e, lista) {
  var gui = baseGui(e);

  var add = [];
  var keys = Object.keys(lista);
  for (var i = 0; i < keys.length; i++)
    add.push(
      '§a[' + keys[i] + '] §c' + lista[keys[i]].ile + ' ' + lista[keys[i]].war
    );

  gui.addLabel(9, '§1Wybierz składnik do wymiany', 75, 0, 120, 20);
  gui.addScroll(5, 8, 25, 240, 200, add);

  e.player.showCustomGui(gui);
  return gui;
}

function kup(e, opcja) {
  var gui = baseGui(e);
  //pokaż listę składników z {opcja}, wybierz + ilość
  //po wybraniu lista zakupów, zatwierdź i zapłać  ||  wybierz i modyfikuj cenę/usuń z listy
  if (opcja) {
    gui.addLabel(9, '§1Wybierz składnik i wpisz ilość', 85, 0, 120, 20);
    gui.addLabel(11, '§b' + opcja, 10, 17, 120, 20);

    var skladniki = getSkladnik({
      typ: opcja,
    });
    if (!skladniki || skladniki.error || skladniki.result.length == 0) {
      return e.player.message(
        '[§cDebugger§f] §7Napotkałeś błąd: ' + skladniki.error
      );
    }
    skladniki = skladniki.result;

    var lista = [];
    for (var i = 0; i < skladniki.length; i++) {
      if (skladniki[i].dostępny != 0) {
        lista.push(
          '§e' +
            skladniki[i].nazwa +
            ' §7(§c' +
            skladniki[i].cena +
            'k §7/ §c' +
            skladniki[i].ilosc +
            skladniki[i].jednostka +
            '§7)'
        );
      }
    }
    lista.sort();

    gui.addTextField(5, 90, 20, 80, 15);
    gui.addScroll(1, 8, 45, 240, 200, lista);
  } else {
    gui.addLabel(9, '§1Wybierz typ składnika', 95, 0, 80, 20);
    gui.addTexturedButton(
      301,
      '§7Nieorganiczne',
      40,
      80,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      302,
      '§7Bazy wodne',
      130,
      80,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      303,
      '§7Roślinne',
      40,
      110,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      304,
      '§7Zwierzęce',
      130,
      110,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  }

  e.player.showCustomGui(gui);
  return gui;
}

function guikoszyk(e, koszyk, produkt) {
  var gui = baseGui(e);
  if (!koszyk) {
    e.player.message('[§cZielarz§f] §7Nie znaleziono koszyka!');
    return menu(e);
  }
  gui.addLabel(9, '§1Twój koszyk', 105, 0, 80, 20);

  if (!produkt) {
    var kasa = 0;
    var keys = Object.keys(koszyk);
    for (var i = 0; i < keys.length; i++) {
      kasa += koszyk[keys[i]].cena;
    }
    gui.addLabel(8, '§eCena: §c§l' + Math.ceil(kasa), 8, 10, 80, 20);
    gui.addScroll(2, 8, 30, 240, 200, keys);

    gui.addTexturedButton(
      19,
      '§7Menu główne',
      5,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      4,
      '§dZakup',
      170,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else {
    if (koszyk[produkt]) {
      gui.addLabel(12, '§aProdukt: §9' + produkt, 86, 50, 140, 20);
      gui.addLabel(
        13,
        '§aWartość za jednostkę: §9§l' +
          (koszyk[produkt].cena / koszyk[produkt].ilosc).toFixed(2) +
          ' §r§9knutów',
        40,
        70,
        160,
        20
      );
      gui.addLabel(
        14,
        '§aCena składnika: §9§l' +
          koszyk[produkt].cena.toFixed(2) +
          ' §r§9knutów',
        65,
        90,
        120,
        20
      );

      gui.addTexturedButton(
        10,
        '§bZmień ilość',
        27,
        123,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
      gui.addTextField(11, 120, 120, 60, 20).setText(koszyk[produkt].ilosc);

      gui.addTexturedButton(
        20,
        '§cUsuń z koszyka',
        5,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
      gui.addTexturedButton(
        3,
        '§dKoszyk',
        170,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
    }
  }

  e.player.showCustomGui(gui);
  return gui;
}

function customGuiButton(e) {
  try {
    switch (e.buttonId) {
      case 1: {
        return kup(e);
      }
      case 2: {
        var lista = [];
        var items = e.player.getInventory().getItems();
        for (var i = 0; i < 9; i++) {
          if (
            items[i].getLore().length > 0 &&
            items[i].getLore()[0].toLowerCase() == '§askładnik eliksiru'
          ) {
            var name = items[i].getDisplayName().split('');
            name.splice(0, 2);
            name = name.join('');
            lista.push('§e' + name + ' §7(' + items[i].getLore()[1] + '§7)');
          }
        }
        return sprzedaj(e, lista);
      }
      case 3: {
        var pdata = e.player.getTempdata();
        var koszyk = pdata.get('koszyk');
        koszyk = JSON.parse(koszyk) || {};
        return guikoszyk(e, koszyk);
      }
      case 4: {
        // zakup koszyk
        var pdata = e.player.getTempdata();
        var koszyk = pdata.get('koszyk');

        koszyk = JSON.parse(koszyk) || {};

        var cena = e.gui.getComponent(8).getText().split('§c§l')[1];
        var playerWallet = wallet(e.player.getName());

        cena = Number(cena) || 0;
        if (typeof playerWallet == 'object') {
          e.player.message(
            '[§cDebugger§f] §7Wystąpił błąd podczas pobierania portfela gracza: ' +
              playerWallet.error
          );
          throw playerWallet.error;
        }

        if (playerWallet >= cena) {
          if (!requestPayment(e.player.getName(), cena))
            return e.player.message('[§cZielarz§f] §7Coś poszło nie tak!');

          var keys = Object.keys(koszyk);
          if (keys.length == 0)
            return e.player.message(
              '[§cZielarz§f] Brak przedmiotów w koszyku!'
            );

          for (var i = 0; i < keys.length; i++) {
            var item = e.player.world.createItem(koszyk[keys[i]].item, 0, 1);
            item.setCustomName('§c' + keys[i]);
            item.setLore([
              '§aSkładnik Eliksiru',
              '§c' + koszyk[keys[i]].ilosc + koszyk[keys[i]].jednostka,
            ]);
            item.getNbt().setInteger('HideFlags', 37);
            e.player.giveItem(item);

            var x =
              e.player.getName() +
              ' kupił: ' +
              keys[i] +
              ' (' +
              koszyk[keys[i]].ilosc +
              koszyk[keys[i]].jednostka +
              ') za **' +
              Math.ceil(koszyk[keys[i]].cena) +
              '** knutów';
            if (Math.ceil(koszyk[keys[i]].cena) >= 10000) {
              x += '\n@everyone';
            }
            x = ang(x);
            HTTP.post(passes.hooks.zielarz, {
              content: x,
              tts: false,
            });
          }

          e.player.updatePlayerInventory();

          pdata.remove('koszyk');
          e.player.message('[§cZielarz§f] §7Pomyślnie zakupiono składniki!');
          return menu(e);
        } else {
          return e.player.message(
            '[§cZielarz§f] §7Nie masz wystarczająco pieniążków aby zakupić produkty!'
          );
        }
      }
      case 5: {
        var tdata = e.player.getTempdata();
        var lista = tdata.get('wymiana');
        lista = JSON.parse(lista) || {};

        return wymien(e, lista);
      }
      case 10: {
        var nazwa = e.gui.getComponent(12).getText().split('§9')[1];
        var ile = parseInt(parseFloat(e.gui.getComponent(11).getText()));
        if (!ile) {
          return e.player.message(
            '[§cZielarz§f] §7Podałeś nieodpowiednią liczbę!'
          );
        }
        if (ile <= 0 || ile > 5000) {
          return e.player.message(
            '[§cZielarz§f] §7Liczba powinna miścić się w przedziale (0;5000> !'
          );
        }
        var pdata = e.player.getTempdata();
        var koszyk = pdata.get('koszyk');
        koszyk = JSON.parse(koszyk) || {};
        var wartosc = koszyk[nazwa].cena / koszyk[nazwa].ilosc;

        koszyk[nazwa].ilosc = ile;
        koszyk[nazwa].cena = wartosc * ile;

        pdata.put('koszyk', JSON.stringify(koszyk));

        return guikoszyk(e, koszyk, nazwa);
      }
      case 15: {
        var ile = parseInt(parseFloat(e.gui.getComponent(16).getText()));
        if (!ile || ile <= 0) {
          return e.player.message('[§cZielarz§f] §7Niepoprawna ilość!');
        }
        var pdata = e.player.getTempdata();
        var sprzedaje = pdata.get('sprzedaje');
        sprzedaje = JSON.parse(sprzedaje) || {};
        sprzedaje.ilosc = ile;
        pdata.put('sprzedaje', JSON.stringify(sprzedaje));
        return confsprzedaj(e, sprzedaje);
      }
      case 19: {
        return menu(e);
      }
      case 20: {
        var nazwa = e.gui.getComponent(12).getText().split('§9')[1];
        var pdata = e.player.getTempdata();
        var koszyk = pdata.get('koszyk');
        koszyk = JSON.parse(koszyk) || {};
        delete koszyk[nazwa];

        pdata.put('koszyk', JSON.stringify(koszyk));
        return guikoszyk(e, koszyk);
      }
      case 21: {
        // sprzedaj składnik
        var pdata = e.player.getTempdata();
        var sprzedaje = pdata.get('sprzedaje');
        sprzedaje = JSON.parse(sprzedaje) || {};

        var items = e.player.getInventory().getItems();
        var item;
        for (var i = 0; i < 9; i++) {
          if (items[i].getDisplayName().indexOf(sprzedaje.nazwa) > -1) {
            var lore = items[i].getLore();
            if (lore.length >= 2 && lore[0].indexOf('Składnik Eliksiru') > -1) {
              var ilosc =
                parseInt(parseFloat(lore[1].split('§c')[1])) *
                items[i].getStackSize();
              var jednostka = lore[1].split(ilosc)[1];
              if (ilosc >= sprzedaje.ilosc) {
                item = items[i];
              }
            }
          }
        }
        if (!item) {
          pdata.remove('sprzedaje');
          e.player.message(
            '[§cZielarz§f] §7Nie znaleziono przedmiotu sprzedawanego w ekwipunku!'
          );
          return menu(e);
        }

        var ilosc = parseInt(parseFloat(item.getLore()[1].split('§c')[1])); // 1
        var max = item.getStackSize() * ilosc; // 5
        var jednostka = item.getLore()[1].split(ilosc)[1]; // szt

        //print("ilosc: "+ilosc);
        //print("iloscS: "+sprzedaje.ilosc);
        //print("max: "+max);

        if (ilosc - sprzedaje.ilosc > 0) {
          //print("1");
          var lore = [
            '§aSkładnik Eliksiru',
            '§c' + (ilosc - sprzedaje.ilosc) + jednostka,
          ];
          if (item.getStackSize() > 1) {
            var name = item.getDisplayName();
            var _item = e.player.world.createItem(item.getName(), 0, 1);

            item.setStackSize(item.getStackSize() - 1);

            _item.setCustomName(name);
            _item.setLore(lore);
            var x = e.player.dropItem(_item);
            x.setOwner(e.player.getName());
            item.setStackSize(item.getStackSize() - 1);
          } else {
            item.setLore(lore);
          }
        } else {
          if (ilosc - sprzedaje.ilosc == 0) {
            //print("Usunięte!");
            item.getStackSize() == 1
              ? item.setStackSize(0)
              : item.setStackSize(item.getStackSize() - 1);
          } else {
            //print("2");
            //print("Usun: "+usun+", reszta: "+reszta );
            var usun, reszta;
            if (ilosc == 1) {
              usun = max - sprzedaje.ilosc;
              item.setStackSize(usun);
            } else {
              var usun = (max - sprzedaje.ilosc) / ilosc;
              var reszta = ilosc - (Math.ceil(usun) - usun) * ilosc;
              usun = Math.floor(usun);

              var _new = e.player.world.createItem(item.getName(), 0, 1);
              _new.setCustomName(item.getDisplayName());
              _new.setLore(['§aSkładnik Eliksiru', '§c' + reszta + jednostka]);
              var x = e.player.dropItem(_new);
              x.setOwner(e.player.getName());
              item.setStackSize(usun);
            }
          }
        }

        var wart = parseFloat(
          e.gui.getComponent(13).getText().split('§9§l')[1].split(' ')[0]
        );
        if (!wart) {
          return e.player.message(
            '[§cZielarz§f] §7Niepoprawna jednostka wartościowa!'
          );
        }
        var x =
          e.player.getName() +
          ' Sprzedał ' +
          sprzedaje.nazwa +
          ' (' +
          sprzedaje.ilosc +
          jednostka +
          ') za **' +
          Math.floor(wart * sprzedaje.ilosc) +
          '** knutów';
        if (Math.floor(wart * sprzedaje.ilosc) >= 10000) {
          x += '\n@everyone';
        }
        x = ang(x);
        HTTP.post(passes.hooks.zielarz, {
          content: x,
          tts: false,
        });
        payPlayer(e.player.getName(), Math.floor(wart * sprzedaje.ilosc));
        return menu(e);
      }
      case 301:
      case 302:
      case 303:
      case 304: {
        var text = e.gui.getComponent(e.buttonId).getLabel().split('§7')[1];
        return kup(e, text);
      }
    }
  } catch (er) {
    print('Error on button: ' + er);
  }
}

function customGuiScroll(e) {
  if (!e.doubleClick) {
    return;
  }
  switch (e.scrollId) {
    case 1: {
      //kup składnik
      var ilosc = parseInt(parseFloat(e.gui.getComponent(5).getText()));
      var kat = e.gui.getComponent(11).getText().split('§b')[1];
      if (!ilosc || isNaN(ilosc)) {
        return e.player.message('[§cZielarz§f] §7Nie podałeś ilości!');
      }
      if (ilosc > 5000 || ilosc <= 0) {
        return e.player.message(
          '[§cZielarz§f] §7Ilość musi być z przedziału (0;5000>!'
        );
      }
      var sel = e.selection[0].toLowerCase();
      var item = getItemName(kat, sel);

      if (!item)
        return e.player.message(
          '[§cZielarz§f] Nie udało się pobrać itemu składnika!'
        );

      var nazwa = e.selection[0].split('§e')[1].split(' §7')[0];

      var skladnik = getSkladnik({
        nazwa: nazwa,
      });
      if (!skladnik || skladnik.error || skladnik.result.length == 0)
        return e.player.message(
          '[§cDebugger§f] §7Coś poszło nie tak: ' + skladnik.error
        );

      skladnik = skladnik.result[0];
      var wart = (skladnik.cena / skladnik.ilosc) * ilosc;

      var pdata = e.player.getTempdata();
      var koszyk = pdata.get('koszyk');
      koszyk = JSON.parse(koszyk) || {};
      koszyk[nazwa] = {
        ilosc: ilosc,
        cena: wart,
        item: item,
        jednostka: skladnik.jednostka,
      };
      pdata.put('koszyk', JSON.stringify(koszyk));

      e.player.message(
        '[§cZielarz§f] §7Dodano do koszyka  §b' +
          nazwa +
          ' §c' +
          ilosc +
          skladnik.jednostka
      );

      return guikoszyk(e, koszyk);
    }
    case 2: {
      var nazwa = e.selection[0];
      var pdata = e.player.getTempdata();
      var koszyk = pdata.get('koszyk');
      koszyk = JSON.parse(koszyk) || {};

      return guikoszyk(e, koszyk, nazwa);
    }
    case 3: {
      var nazwa = e.selection[0].split('§e')[1].split(' §7')[0];
      var v = e.selection[0].split('§e')[1].split(' §7(§c')[1];
      v = v.replace('§7)', '');
      var ilosc = parseInt(parseFloat(v));
      if (!ilosc) {
        return e.player.message('[§cZielarz§f] §7Coś poszło nie tak!');
      }
      var jednostka = v.split(ilosc)[1];

      var pdata = e.player.getTempdata();
      var sprzedaje = pdata.get('sprzedaje');
      sprzedaje = JSON.parse(sprzedaje) || {};

      sprzedaje.nazwa = nazwa;
      sprzedaje.ilosc = ilosc;
      sprzedaje.jednostka = jednostka;

      pdata.put('sprzedaje', JSON.stringify(sprzedaje));
      return confsprzedaj(e, sprzedaje);
    }
    case 5: {
      var name = e.selection[0].match(/\[.*.\]/gi) || [];
      if (!name || name.length == 0)
        return e.player.message('[§cDebugger§f] §7Nie znaleziono wyboru!');

      name = name[0].replace('[', '').replace(']', '');

      var tdata = e.player.getTempdata();
      var lista = tdata.get('wymiana');
      lista = JSON.parse(lista) || {};

      if (!lista[name])
        return e.player.message(
          '[§cDebugger§f] §7Nie znaleziono składnika na liście!'
        );

      var item = e.player.world.createItem(lista[name].itemName, 0, 1);
      item.setCustomName('§c' + name);
      item.setLore([
        '§aSkładnik Eliksiru',
        '§c' + lista[name].ile + lista[name].war,
      ]);

      e.player.dropItem(item).setOwner(e.player.getName());

      delete lista[name];
      tdata.put('wymiana', JSON.stringify(lista));

      return e.player.message('[§cZielarz§f] §7Wymieniono Składnik!');
    }
  }
}

function getItemName(kat, sel) {
  var item;
  if (kat == 'Zwierzęce') {
    if (sel.indexOf('krew') > -1) {
      item = 'harvestcraft:cherryjuiceitem';
    }
    if (sel.indexOf('ośmiornica') > -1) {
      item = 'harvestcraft:calamariraw';
    }
    if (sel.indexOf('nietoperz') > -1) {
      item = 'minecraft:flint';
    }
    if (sel.indexOf('bezoar') > -1) {
      item = 'minecraft:golden_apple';
    }
    if (sel.indexOf('płetwa') > -1) {
      item = 'harvestcraft:musselrawitem';
    }
    if (sel.indexOf('róg') > -1) {
      item = 'bewitchment:hellhound_horn';
    }
    if (sel.indexOf('ucho') > -1) {
      item = 'variedcommodities:severed_ear';
    }
    if (sel.indexOf('serc') > -1) {
      item = 'bewitchment:heart';
    }

    if (sel.indexOf('kręgosłup') > -1 || sel.indexOf('kość') > -1) {
      item = 'variedcommodities:skull';
    }
    if (sel.indexOf('miód') > -1 || sel.indexOf('mocz') > -1) {
      item = 'harvestcraft:applejuiceitem';
    }
    if (sel.indexOf('noga') > -1 || sel.indexOf('odnoże') > -1) {
      item = 'bewitchment:lizard_leg';
    }
    if (sel.indexOf('oko') > -1 || sel.indexOf('oczy') > -1) {
      item = 'minecraft:spider_eye';
    }
    if (sel.indexOf('język') > -1 || sel.indexOf('jęzor') > -1) {
      item = 'bewitchment:tongue_of_dog';
    }
    if (sel.indexOf('pióro') > -1 || sel.indexOf('skrzydło') > -1) {
      item = 'minecraft:feather';
    }
    if (sel.indexOf('sproszkowan') > -1 || sel.indexOf('suszon') > -1) {
      item = 'minecraft:firework_charge';
    }

    if (
      sel.indexOf('igła') > -1 ||
      sel.indexOf('dziób') > -1 ||
      sel.indexOf('kieł') > -1 ||
      sel.indexOf('kolec') > -1 ||
      sel.indexOf('żądło') > -1
    ) {
      item = 'harvestcraft:shrimpcookeditem';
    }
    if (
      sel.indexOf('jad') > -1 ||
      sel.indexOf('łza') > -1 ||
      sel.indexOf('śluz') > -1
    ) {
      item = 'harvestcraft:blueberryjuiceitem';
    }
    if (
      sel.indexOf('jajko') > -1 ||
      sel.indexOf('jajo') > -1 ||
      sel.indexOf('jajeczko') > -1
    ) {
      item = 'minecraft:egg';
    }
    if (
      sel.indexOf('pancerz') > -1 ||
      sel.indexOf('skorupa') > -1 ||
      sel.indexOf('łuska') > -1
    ) {
      item = 'minecraft:shulker_shell';
    }
    if (
      sel.indexOf('włos') > -1 ||
      sel.indexOf('futro') > -1 ||
      sel.indexOf('skóra') > -1
    ) {
      item = 'minecraft:rabbit_hide';
    }
    if (!item) {
      item = 'minecraft:rotten_flesh';
    }
  } else if (kat == 'Roślinne') {
    if (sel.indexOf('korzeń') > -1) {
      item = 'harvestcraft:ediblerootitem';
    }

    if (sel.indexOf('kwiat') > -1 || sel.indexOf('płatek') > -1) {
      item = 'minecraft:red_flower';
    }
    if (sel.indexOf('kora') > -1 || sel.indexOf('kory') > -1) {
      item = 'harvestcraft:vanillaitem';
    }

    if (
      sel.indexOf('liść') > -1 ||
      sel.indexOf('listki') > -1 ||
      sel.indexOf('liście') > -1
    ) {
      item = 'harvestcraft:tealeafitem';
    }

    if (
      sel.indexOf('ropa') > -1 ||
      sel.indexOf('sok') > -1 ||
      sel.indexOf('oliwa') > -1 ||
      sel.indexOf('olej') > -1 ||
      sel.indexOf('wywar') > -1 ||
      sel.indexOf('wyciąg') > -1
    ) {
      item = 'harvestcraft:papayajuiceitem';
    }
    if (
      sel.indexOf('nasiona') > -1 ||
      sel.indexOf('pestki') > -1 ||
      sel.indexOf('słonecznik') > -1 ||
      sel.indexOf('ziarna') > -1
    ) {
      item = 'minecraft:wheat_seeds';
    }
    if (
      sel.indexOf('sproszkowan') > -1 ||
      sel.indexOf('suszon') > -1 ||
      sel.indexOf('cukier') > -1
    ) {
      item = 'harvestcraft:flouritem';
    }
    if (!item) {
      item = 'minecraft:tallgrass';
    }
  } else if (kat == 'Nieorganiczne') {
    if (sel.indexOf('srebro') > -1) {
      item = 'bewitchment:silver_ingot';
    }
    if (sel.indexOf('złoto') > -1) {
      item = 'minecraft:gold_ingot';
    }
    if (sel.indexOf('rtęć') > -1) {
      item = 'bewitchment:heaven_extract';
    }
    if (sel.indexOf('sztuczny składnik') > -1) {
      item = 'minecraft:end_crystal';
    }
    if (sel.indexOf('kryształ') > -1) {
      item = 'variedcommodities:crystal';
    }
    if (sel.indexOf('saargo') > -1) {
      item = 'variedcommodities:coin_stone';
    }
    if (sel.indexOf('sól') > -1 || sel.indexOf('skruszon') > -1) {
      item = 'harvestcraft:saltitem';
    }
    if (!item) {
      item = 'minecraft:magma_cream';
    }
  } else if (kat == 'Bazy wodne') {
    if (!item) {
      item = 'minecraft:potion';
    }
  } else {
    e.player.message('[§cZielarz§f] §7Niepoprawna kategoria');
    return null;
  }

  return item;
}
