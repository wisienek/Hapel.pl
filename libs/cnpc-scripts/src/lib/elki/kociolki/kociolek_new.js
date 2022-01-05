var API = Java.type('noppes.npcs.api.NpcAPI').Instance();
var KOCIOLEK;
var pos;
var version = '19.12.2021-1';

var dev = false;

/*
    Eliksir: {
        name: nazwa
        list: [...kroki]
        wait: timestamp - do kiedy czekać musi
        temp: temperatura
    }
    KOCIOLEK: {
        current: baseKociolek,
        side: baseKociolek,
    }


    required:
    - sql_main
    - postreq
    - str_mani
    - pass
    - kociolek_helper
*/

function init(e) {
  try {
    e.block.setModel('minecraft:cauldron');
    e.block.setHardness(1);
    KOCIOLEK = e.block;
    pos = KOCIOLEK.getPos();

    var data = e.block.getStoreddata();
    var elk = data.get('elki');
    elk = JSON.parse(elk) || {};
    var change;

    if (data.get('update') != version) updateKociolekDependencies(e);

    if (!elk.current) {
      elk.current = new baseKociolek({
        id: 'Główny',
      });
      change = true;
    }

    if (!elk.side) {
      elk.side = new baseKociolek();
      change = true;
    }

    if (change) data.put('elki', JSON.stringify(elk));
  } catch (er) {
    print('init error: ' + er);
  }
}

function harvested(e) {
  try {
    var tmp = e.block.getStoreddata();
    var kociolek = tmp.get('kociolek') || 'Cynowy kociołek rozmiar 2';

    var item = e.block.world.createItem('minecraft:cauldron', 0, 1);
    item.setCustomName('§c' + kociolek);
    e.player.dropItem(item).setOwner(e.player.getName());
  } catch (er) {
    print('Harvest error: ' + er);
  }
}

function interact(e) {
  try {
    if (!KOCIOLEK) KOCIOLEK = e.block;

    var mainh = e.player.getMainhandItem();
    if (dev == true && mainh.getDisplayName().indexOf('testera') == -1)
      return e.player.message(
        '[§cInfo§f] §7Kociołki chwilowo niedostępne (testowanie) :v'
      );

    if (!KOCIOLEK || !pos) {
      KOCIOLEK = e.block;
      pos = KOCIOLEK.getPos();
    }

    var startGui = _GUI['start'];
    //print("GUI: ", JSON.stringify(_GUI, null,2));

    return startGui.show(e);
  } catch (er) {
    print('interact error: ' + er);
  }
}

function customGuiSlot(e) {
  try {
    if (!KOCIOLEK) throw 'Nie znaleziono egzekującego bloku!';

    switch (e.slotId) {
      case 0: {
        if (e.stack.getDisplayName().indexOf('Tajemniczy eliksir:') > -1) {
          var _id = e.stack.getDisplayName().split(': ')[1];
          var zlane = getZlane(_id);

          if (zlane.error || !zlane.result[0]) {
            e.player.message(
              '[§cDebugger§f] §7Error, pisz do administracji: ' + zlane.error
            );
            throw zlane.error;
          }
          zlane = zlane.result[0];

          var data = KOCIOLEK.getStoreddata();
          var elki = data.get('elki');
          elki = JSON.parse(elki) || {};
          elki.current = JSON.parse(zlane.json);

          data.put('elki', JSON.stringify(elki));

          return _GUI['eliksirCreatorMenu'].show(e);
        }
        break;
      }
      case 1: {
        if (e.stack.getName().indexOf('book') > -1) {
          var nbt = e.stack.getNbt();
          if (nbt.has('przepis')) {
            try {
              var list = nbt.getList('przepis', nbt.getListType('przepis'));
              list = Java.from(list);
              list.unshift('§aPrzepis: ');
              list = list.join('\n§7◆ ');

              var data = KOCIOLEK.getStoreddata();
              data.put('przepis', list);
              e.player.message('[§cDebugger§f] §7Załadowano przepis!');

              return _GUI['eliksirCreatorMenu'].show(e);
            } catch (er) {
              print(er);
              e.player.message('[§cDebugger§f] §7Nastąpił error: ' + er);
            }
          }
        }
        return;
      }
    }
  } catch (er) {
    print('Slot error: ' + er);
  }
}

// handlers:
function customGuiScroll(e) {
  try {
    if (!KOCIOLEK) throw 'Nie znaleziono egzekującego bloku!';

    switch (e.scrollId) {
      case id('s-ingredient'): {
        if (!e.doubleClick) return;

        var sel = e.selection[0];
        sel = sel.split('  [');
        //sel[0] = sel[0].split(""); sel[0].pop(); sel[0] = sel[0].join("");
        var typ = e.gui.getComponent(id('l-type')).getText().replace(/§./g, '');
        var ile = parseFloat(
          e.gui.getComponent(id('in-quantity')).getText()
        ).toFixed(2);
        if (!ile || ile <= 0 || isNaN(ile))
          return e.player.message(
            '[§cEliksiry§f] §7Nie wpisano ile jednostki dodajesz! Wpisz ją i dopiero wtedy wybierz produkt.'
          );

        sel[1] = sel[1].split(']')[0];
        var skladnik = {
          name: sel[0],
          ile: ile,
          jednostka: sel[1],
          akcje: [],
          typ: typ,
        };
        var ndata = KOCIOLEK.getStoreddata();
        var elki = ndata.get('elki');
        elki = JSON.parse(elki) || {};
        if (elki.current) elki.current.skladnik = skladnik;
        ndata.put('elki', JSON.stringify(elki));

        //Edytuj składnik:
        return _GUI['modifyIngredient'].show(e, skladnik);
      }
      case id('s-eqIngredient'): {
        //dodaj custom składnik
        var ile = parseFloat(e.gui.getComponent(id('in-quantity1')).getText());
        if (!ile || ile <= 0 || isNaN(ile))
          return e.player.message(
            '[§cEliksiry§f] §7Wpisz ile jednostek chcesz dodać!'
          );

        var sel = e.selection[0];
        var ilosc = sel.split('[§c')[1].replace(']', '');
        sel = {
          name: sel.split(' §7[')[0],
          ilosc: parseFloat(ilosc),
          jednostka: ilosc.split(parseFloat(ilosc))[1],
        };

        if (ile > sel.ilosc)
          return e.player.message(
            '[§cEliksiry§f] §7Wpisałeś za dużą jednostkę. Składnik ma tylko: §b' +
              sel.ilosc +
              sel.jednostka
          );

        var items = e.player.getInventory().getItems();
        var item;
        for (var i = 0; i < items.length; i++) {
          if (items[i].getDisplayName().indexOf(sel.name) > -1) {
            var lore = items[i].getLore();
            if (
              lore.length >= 2 &&
              lore[0].toLowerCase() == '§askładnik eliksiru'
            ) {
              if (parseFloat(lore[1].split('§c')[1]) >= ile) {
                item = items[i];
                i = items.length;
              }
            }
          }
        }
        if (!item)
          return e.player.message('[§cEliksiry§f] §7Nie znaleziono składnika!');

        if (item.getDisplayName().indexOf('§6Składnik Czasu') > -1) {
          var ndata = KOCIOLEK.getStoreddata();
          var elki = JSON.parse(ndata.get('elki')) || {};
          elki.current.wait = 0;
          ndata.put('elki', JSON.stringify(elki));
          e.player.message(
            '[§cEliksiry§f] §7Użyto specjalnego itemu przyśpieszającego czas oczekiwania na eliksir!'
          );

          if (ile != sel.ilosc) {
            var lore = Java.from(item.getLore());
            lore[1] = '§c' + (sel.ilosc - ile) + sel.jednostka;
            item.setLore(lore);
          } else if (ile == sel.ilosc) {
            item.setStackSize(item.getStackSize() - 1);
          }

          _GUI['eliksirCreatorMenu'].show(e, true, true);
        } else {
          if (ile != sel.ilosc) {
            var lore = Java.from(item.getLore());
            lore[1] = '§c' + (sel.ilosc - ile) + sel.jednostka;
            item.setLore(lore);
          } else if (ile == sel.ilosc) {
            item.setStackSize(item.getStackSize() - 1);
          }

          var skladnik = {
            name: item.getDisplayName(),
            ile: ile,
            jednostka: sel.jednostka,
            akcje: [],
            typ: 'eq',
          };
          var ndata = KOCIOLEK.getStoreddata();
          var elki = ndata.get('elki');
          elki = JSON.parse(elki) || {};
          if (!elki.current) {
            elki.current = {
              list: [],
              wait: 0,
              temp: 0,
            };
          }

          elki.current.skladnik = skladnik;
          ndata.put('elki', JSON.stringify(elki));

          return _GUI['modifyIngredient'].show(e, skladnik);
        }
        break;
      }
      case id('s-list'): {
        // wyświetl info o zaznaczonym kroku na liście
        if (!e.doubleClick) return;

        var select = e.selection[0];
        var label = e.gui.getComponent(id('l-info1'));
        label.setHoverText(select.split('\n'));

        return e.gui.update(e.player);
      }
      case id('s-eliksirs'): {
        if (!e.doubleClick) return;

        //wyślij do weryfikacji
        var tmp = KOCIOLEK.getStoreddata();
        var elki = tmp.get('elki');
        elki = JSON.parse(elki) || {};
        var ename = e.selection[0];
        var kociolek = tmp.get('kociolek');

        var dcid = '';
        try {
          dcid = KOCIOLEK.executeCommand('dcdid ' + e.player.getName()) || '';
          dcid = dcid.replace('\n', '').replace(/\s/g, '');
          dcid = dcid || null;
        } catch (er) {
          e.player.message('[§cDebugger§f] §7Error przy pobieraniu discorda!');
        }

        if (elki.current) {
          if (elki.current.list && elki.current.list.length >= 2) {
            var r = (Math.random() * 100).toString(36).slice(0, 13); //id
            var ver = {
              gracz: e.player.getName(),
              uuid: e.player.getUUID(),
              nazwa: ename,
              eliksir: elki.current.list,
              cena: elki.current.price || 0,
            };

            if (dcid) {
              var firstTime = getOczekujace({
                discord: dcid,
              });
              if (firstTime.error)
                return e.player.message(
                  '[§cDebugger§f] §7Error przy wydawaniu nagrody!'
                );

              if (
                (firstTime.result || []).length == 0 ||
                (firstTime.result || []).length % 50 == 0
              ) {
                var Przep = e.player.world.createItem(
                  'variedcommodities:letter',
                  0,
                  3
                );
                Przep.setCustomName('§cPrzepustka do składziku');
                Przep.setLore([
                  '§7**Przepustka pozwala odebrać gotowy dowolny eliksir**',
                ]);

                var nbt = Przep.getNbt();
                nbt.setString('createdBy', 'Console');
                e.player.dropItem(Przep).setOwner(e.player.getName());

                e.player.sendNotification('Eliksiry', 'Pierwszy Eliksir!', 2);
              }
            }

            // zamienić
            var test = addOczekujace(
              r,
              escapeString(ename),
              e.player.getName(),
              e.player.getUUID(),
              dcid,
              escapeString(JSON.stringify(elki.current.list)),
              elki.current.price,
              kociolek
            );
            if (test.error)
              return e.player.message(
                '[§cDebugger§f] §7Error, pisz do administracji: ' + test.error
              );

            var x =
              ver.gracz +
              ' Wysłał eliksir do weryfikacji! kod: `' +
              r +
              '`, nazwa: *' +
              ver.nazwa +
              '*, cena: *' +
              (ver.cena || 0) +
              '* knutów\nKociołek: ' +
              (kociolek || 'Brak danych');
            x = ang(x);
            HTTP.post(passes.hooks.elki, {
              content: x,
              tts: false,
            });
            elki.current = {
              list: [],
              wait: 0,
              temp: 0,
              ignis: false,
            };
            tmp.put('elki', JSON.stringify(elki));
            KOCIOLEK.getTimers().stop(id('t-smoking'));

            _GUI['start'].show(e);
            return e.player.message(
              '[§cEliksiry§f] §7Wysłano eliksir do weryfikacji! Pod ALT+G możesz sprawdzić status swoich eliksirów.'
            );
          } else {
            return e.player.message(
              '[§cEliksiry§f] §7Brakuje listy, lub za krótka!'
            );
          }
        } else {
          return e.player.message(
            '[§cEliksiry§f] §7Nie znaleziono obecnego wywaru!'
          );
        }
      }
      case id('s-inocreation'): {
        //inokreacja
        var n = e.selection[0];
        var items = e.player.getInventory().getItems();
        var eliksir;
        for (var i = 0; i < items.length; i++) {
          if (items[i].getDisplayName() == '§eTajemniczy Eliksir') {
            var lore = items[i].getLore();
            if (
              n.indexOf(lore[0]) > -1 &&
              n.indexOf(lore[1]) > -1 &&
              n.indexOf(lore[2]) > -1
            ) {
              eliksir = items[i];
              i = items.length;
            }
          }
        }
        if (!eliksir) {
          e.player.message('[§cEliksiry§f] §7Nie znaleziono eliksiru!');
          return _GUI['start'].show(e);
        }
        var inokreacja = eliksir.getNbt().getString('Inokreacja');
        var data = eliksir.getNbt().getLong('Data');
        var date = Date.now();
        date = parseInt((date - data) / 86400000);

        e.player.message(
          '[§cEliksiry§f] §7Wynik Inokreacji: §e**' + inokreacja + '**'
        );

        if (date >= 0) {
          e.player.message(
            '§e**Nie widać żadnych plamek na pokrywie kociołka**'
          );
        } else {
          date *= -1;
          var plamki = Math.floor(Math.random() * date);
          if (date <= 0) {
            e.player.message(
              '§e**Na pokrywie kociołka nie widać żadnych plamek**'
            );
          }
          if (plamki == date || plamki == 0) {
            e.player.message(
              '§e**Na pokrywie kociołka widać ' + date + ' duże plamki**'
            );
          } else {
            e.player.message(
              '§e**Na pokrywie kociołka widać ' +
                (date - plamki) +
                ' duże plamki i ' +
                plamki +
                ' małe plamki**'
            );
          }
        }

        _GUI['start'].show(e);
        break;
      }
      case id('s-labelSelector'): {
        var _id = e.selection[0].split('.')[0];
        return _GUI['labelMaker'].show(e, _id);
      }
    }
  } catch (er) {
    print('Scroll error: ' + er);
  }
}

function customGuiButton(e) {
  if (!e) return print('NO EVENT!!!!');

  try {
    if (!KOCIOLEK) throw 'Nie znaleziono egzekującego bloku!';

    switch (e.buttonId) {
      // navigation
      case id('b-goBack'): {
        var currentGui = e.gui.getComponent(id('l-currentGui')).getText();

        var current = _GUI[currentGui];
        if (current && current.showPrev) return current.showPrev(e);

        break;
      }
      case id('b-ingredientType5'): {
        return _GUI['eqIngredient'].show(e);
      }
      case id('b-continueBrewing'): {
        return _GUI['continueBrewing'].show(e);
      }
      case id('b-inocreation'): {
        return _GUI['eliksirInocreation'].show(e);
      }
      case id('b-labelMaker'): {
        return _GUI['labelMaker'].show(e);
      }
      case id('b-swtichToCrucible'): {
        return _GUI['basicInputs'].show(e);
      }
      case id('b-goAddIngredient'): {
        return _GUI['ingredientSelector'].show(e);
      }
      case id('b-steps'): {
        return _GUI['stepList'].show(e);
      }
      case id('b-newEliksir'): {
        var newGui = _GUI['eliksirCreatorMenu'];
        return newGui.show(e);
      }
      case id('b-ingredientType1'):
      case id('b-ingredientType2'):
      case id('b-ingredientType3'):
      case id('b-ingredientType4'): {
        var text = e.gui.getComponent(e.buttonId).getLabel().replace(/§./g, '');
        return _GUI['ingredientSelector'].show(e, text);
      }

      // events
      case id('b-saveRecipe'): {
        //zapisz przepis:
        var inv = e.player.getInventory();
        var has;
        for (var i = 0; i < 9; i++) {
          var item = inv.getSlot(i);
          if (item.getName().indexOf('writable_book') > -1) has = i;
        }
        if (has) {
          var name = e.gui.getComponent(id('in-confirm')); // ????
          if (!name) {
            var x = e.gui
              .addTextField(id('in-confirm'), 0, 260, 256, 20)
              .setHoverText([
                '§7Podaj Nazwę przepisu',
                '§7I kliknij przycisk ponownie!',
              ]);

            x.setText('Przepis ' + e.player.getDisplayName());
            return e.gui.update(e.player);
          }
          var scroll = e.gui.getComponent(id('s-list')).getList();
          name = name.getText();
          name = name.replace(/&/g, '§');

          var item = inv.getSlot(has);
          if (item && item.getName().indexOf('writable_book') > -1) {
            item.setStackSize(item.getStackSize() - 1);
            item = e.player.world.createItem('minecraft:book', 0, 1);

            item.setCustomName(name);
            item.setLore([
              '§7Specjalny przepis',
              '§7Przygotowany przez: §7' + e.player.getDisplayName(),
            ]);

            var nbt = item.getNbt();
            nbt.setList('przepis', scroll);

            item = e.player.dropItem(item);
            item.setOwner(e.player.getName());
          }

          return e.player.message('[§cEliksiry§f] §7Zapisano przepis!');
        }
        return e.player.message('[§cEliksiry§f] §7Nie znaleziono zeszytu!');
      }
      case id('b-addLabel'): {
        //dodawanie etykiety
        var etykieta = e.gui.getComponent(id('in-labelText')).getText();
        if (!etykieta || etykieta.length <= 2)
          return e.player.message(
            '[§cEliksiry§f] §7Wpisz co najmniej 2 znaki!'
          );

        etykieta = etykieta.replace(/&/g, '§');

        var _id = e.gui.getComponent(id('l-eliksir')).getText();
        if (!_id)
          return e.player.message('[§cEliksiry§f] §7Nie znaleziono id!');

        var items = e.player.getInventory().getItems();
        var eliksir = items[_id];
        if (
          !eliksir ||
          eliksir.getDisplayName().indexOf('Tajemniczy Eliksir') == -1
        )
          return e.player.message('[§cEliksiry§f] §7Nie znaleziono eliksiru!');

        if (eliksir.getNbt().getString('Etykieta'))
          return e.player.message('[§cEliksiry§f] §7Eliksir ma już etykietę!');

        var lore = Java.from(eliksir.getLore());
        lore.push('', etykieta);
        eliksir.setLore(lore);
        eliksir.getNbt().setString('Etykieta', etykieta);

        _GUI['start'].show(e);
        pisz(e.player, 'Nakleił etykietę z eliksiru: ' + etykieta + '');
        return e.player.message(
          '[§cEliksiry§f] §7Zmieniono etykietę na: ' + etykieta
        );
      }
      case id('b-removeLabel'): {
        //etykiety usuwanie
        var _id = e.gui.getComponent(id('l-eliksir')).getText();
        if (!_id)
          return e.player.message('[§cEliksiry§f] §7Nie znaleziono id!');

        var items = e.player.getInventory().getItems();
        var eliksir = items[_id];
        if (
          !eliksir ||
          eliksir.getDisplayName().indexOf('Tajemniczy Eliksir') == -1
        )
          return e.player.message('[§cEliksiry§f] §7Nie znaleziono eliksiru!');

        var etykieta = eliksir.getNbt().getString('Etykieta');
        if (!etykieta)
          return e.player.message('[§cEliksiry§f] §7Eliksir nie ma etykiety!');

        var lore = Java.from(eliksir.getLore());
        var i = lore.indexOf(etykieta) - 1;
        if (i <= -1)
          return e.player.message(
            '[§cEliksiry§f] §7Nie znaleziono etykiety w lore!'
          );

        lore.splice(i, 2);
        eliksir.setLore(lore);
        eliksir.getNbt().remove('Etykieta');

        pisz(e.player, 'Usunął etykietę z eliksiru');

        _GUI['labelMaker'].show(e);
        return e.player.message('[§cEliksiry§f] §7Usunięto etykietę!');
      }
      case id('b-switchCrucible'): {
        // zmień na side kociołek
        var data = KOCIOLEK.getStoreddata();
        var elki = JSON.parse(data.get('elki'));

        if (elki.switch && Date.now() - elki.switch < 5000)
          return e.player.message(
            '[§cEliksiry§f] §7Musisz zaczekać §a5 §7sekund za każdą zmianą!'
          );

        var x = elki.side;
        elki.side = elki.current;
        elki.current = x;
        elki.switch = Date.now();

        if (!elki.id) {
          elki.id = 'Główny';
        }
        elki.id == 'Główny' ? (elki.id = 'Dodatkowy') : (elki.id = 'Główny');

        data.put('elki', JSON.stringify(elki));

        e.player.message(
          '[§cEliksiry§f] §7Zmieniono kociołek na: §a' + elki.id
        );
        return pisz(e.player, '*Zmienił kociołek*');
      }
      case id('b-mergeCrucibles'): {
        // dodaj eliksir z drugiego kociołka do aktualnego
        var data = KOCIOLEK.getStoreddata();
        var elki = JSON.parse(data.get('elki')) || {};
        if (elki.side && elki.side.list.length > 0) {
          if (!elki.current.price) {
            elki.current.price = 0;
          }
          if (!elki.side.price) {
            elki.side.price = 0;
          }

          elki.current.price += elki.side.price;
          elki.current.list.push(
            'Przelej wywar z drugiego kociołka:\n- ' +
              elki.side.list.join('\n- ')
          );
          elki.side = { list: [], wait: 0, temp: 0, ignis: false };

          data.put('elki', JSON.stringify(elki));
          return pisz(e.player, 'Przelał wywar z jednego kociołka do drugiego');
        }
        return e.player.message(
          '[§cEliksiry§f] §7w drugim kociołku nic nie ma!'
        );
      }
      case id('b-saveEliksir'): {
        //zapisz do itemu
        var r = (Math.random() * 100).toString(36).slice(0, 13);
        var item = e.player.world.createItem(
          'harvestcraft:blueberryjuiceitem',
          0,
          1
        );
        item.setCustomName('§9Tajemniczy eliksir: ' + r);
        item.setLore([
          '§7Przedmiot jest tymczasowy',
          '§7Przechowuje on informacje o tworzonym eliksirze.',
          '§7Możesz go wrzucić do kociołka aby dokończyć tworzenie!',
          '§7Aby to zrobić kliknij w opcję: §2Dokończ eliksir',
          '§7I daj item do slotu',
        ]);

        var tmp = KOCIOLEK.getStoreddata().get('elki');
        tmp = JSON.parse(tmp) || {};
        if (!tmp.current || tmp.current.list.length == 0)
          return e.player.message('[§cEliksiry§f] §7Nie masz czego zlewać!');

        var zlane = addZlane(r, escapeString(JSON.stringify(tmp.current)));
        if (zlane.error)
          return e.player.message(
            '[§cDebugger§f] §7Error, pisz do administracji: ' + zlane.error
          );

        pisz(e.player, 'Zlał eliksir do butelki aby dokończyć go później');

        tmp.current = new baseKociolek().toJson();
        KOCIOLEK.getStoreddata().put('elki', JSON.stringify(tmp));
        KOCIOLEK.getTimers().stop(id('t-smoking'));
        e.player.giveItem(item);
        break;
      }
      case id('b-submitEliksir'): {
        /* Wyślij, check name */
        var data = getOczekujace({
          gracz: e.player.getName(),
          weryfikowane: 3,
          odebrane: 0,
        });
        if (data.error)
          return e.player.message(
            '[§cDebugger§f] Error, pisz do administracji: ' + data.error
          );

        data = data.result;

        var n = data.length;
        if (n > 7)
          return e.player.message(
            '[§cEliksiry§f] §7Możesz mieć tylko §c§l6§r§7 eliksirów na raz w tworzeniu!'
          );

        var current = JSON.parse(KOCIOLEK.getStoreddata().get('elki')) || {};
        if (current.current.list && current.current.list.length < 2)
          return e.player.message('[§cEliksiry§f] §7Kociołek jest pusty!');

        return _GUI['selectEliksirToSend'].show(e);
      }
      case id('b-trash'): {
        //wylewanie elka
        var tmp = KOCIOLEK.getStoreddata().get('elki');
        tmp = JSON.parse(tmp) || {};
        if (tmp.current.list && tmp.current.list.length == 0)
          return e.player.message('[§cEliksiry§f] §7Kociołek jest pusty!');

        tmp['current'] = { name: '', list: [], wait: 0, temp: 0, ignis: false };
        KOCIOLEK.getStoreddata().put('elki', JSON.stringify(tmp));

        pisz(e.player, 'Wylewa eliksir z kociołka');
        e.player.message(
          '[§cEliksiry§f] §7Wylano eliksir! Możesz zacząć tworzyć od nowa.'
        );

        return KOCIOLEK.getTimers().stop(id('t-smoking'));
      }
      case id('b-removeRecipe'): {
        // usuwanie przepisu
        var data = KOCIOLEK.getStoreddata();
        data.remove('przepis');

        return e.player.message('[§cKociołek§f] §7Usunięto przepis!');
      }
      //handle kociołek
      case id('b-crush'):
      case id('b-snip'):
      case id('b-tear'):
      case id('b-crumble'):
      case id('b-peel'):
      case id('b-burn'):
      case id('b-dry'):
      case id('b-rub'):
      case id('b-grind'):
      case id('b-break'):
      case id('b-put&pull'):
      case id('b-cut'):
      case id('b-ignisOn'):
      case id('b-ignisOff'):
      case id('b-addAlcohol'):
      case id('b-addWater'):
      case id('b-increaseTemperature'):
      case id('b-lowerTemperature'):
      case id('b-turnLeft'):
      case id('b-turnRight'):
      case id('b-timeKeeper'): {
        var text = id(e.buttonId);
        // if(!text) return e.player.message("[§cDebugger§f] §7Nie znaleziono Textu do buttona!")

        addElement(
          e,
          HANDLE_ADD.indexOf(text) > -1,
          text || '[NIEZ NALEZIONO AKCJI!!!!]'
        );
        return;
      }
      case id('b-customAction'): {
        var akcja = e.gui.getComponent(id('in-customAction')).getText();
        if (!akcja) return e.player.message('[§cKociołek§f] §7');

        var ndata = KOCIOLEK.getStoreddata();
        var elki = addToList(
          JSON.parse(ndata.get('elki')),
          'AC: ' + akcja,
          e.player
        );
        if (elki) ndata.put('elki', JSON.stringify(elki));

        pisz(e.player, akcja);
        break;
      }
      case id('b-addIngredient'): {
        //dodawanie przygotowanego składnika
        var ndata = KOCIOLEK.getStoreddata();
        var elki = ndata.get('elki');
        elki = JSON.parse(elki) || {};
        var eq = e.gui.getComponent(id('l-info1'));

        if (elki.current.skladnik) {
          var t = Date.now();
          if (t - elki.current.wait < 0) {
            pisz(
              e.player,
              'Niecierpliwy zrobił coś nie tak, a eliksir zaraz wybuchł mu przed nosem!'
            );
            elki.current = new baseKociolek().toJson();

            KOCIOLEK.getTimers().stop(id('t-smoking'));
            ndata.put('elki', JSON.stringify(elki));
            KOCIOLEK.world.playSoundAt(
              pos,
              'minecraft:entity.generic.explode',
              0.5,
              0.8
            );
            return KOCIOLEK.world.spawnParticle(
              'explode',
              pos.getX() + 0.5,
              pos.getY() + 1.2,
              pos.getZ() + 0.5,
              0.3,
              0.4,
              0.3,
              0.05,
              40
            );
          }
          var skladnik = elki.current.skladnik;

          var x =
            'Dodaj: ' +
            skladnik.name +
            ' [' +
            skladnik.ile +
            ' ' +
            skladnik.jednostka +
            ' ' +
            skladnik.akcje.join(', ') +
            ']';
          if (!eq) calculatePrice(e.player, skladnik);

          var ndata = KOCIOLEK.getStoreddata();
          var elki = addToList(JSON.parse(ndata.get('elki')), x, e.player);
          if (elki) ndata.put('elki', JSON.stringify(elki));

          pisz(
            e.player,
            'Dodał wcześniej przygotowany składnik do kociołka: §c' +
              skladnik.name
          );

          elki = JSON.parse(ndata.get('elki'));
          elki.current.skladnik = {};

          ndata.put('elki', JSON.stringify(elki));
          KOCIOLEK.world.spawnParticle(
            'splash',
            pos.getX() + 0.5,
            pos.getY() + 1.2,
            pos.getZ() + 0.5,
            0.2,
            0.4,
            0.2,
            0.01,
            40
          );
          KOCIOLEK.world.playSoundAt(
            pos,
            'minecraft:entity.generic.splash',
            0.3,
            1.5
          );
        } else {
          return e.player.message('[§cEliksiry§f] §7Coś poszło nie tak!');
        }
        //powrót do menu
        return _GUI['eliksirCreatorMenu'].show(e, true, true);
      }
      case id('b-searchByName11'): {
        var text = e.gui.getComponent(id('in-searchByName')).getText();
        return _GUI['selectEliksirToSend'].show(e, text);
      }
      case id('b-searchByName7'): {
        var text = e.gui.getComponent(id('in-searchByName')).getText();
        var b = e.gui.getComponent(id('l-type')).getText().replace(/§./g, '');

        return _GUI['ingredientSelector'].show(e, b, text);
      }
    }
  } catch (er) {
    print('Button error: ' + er);
  }
}

function timer(e) {
  try {
    if (!KOCIOLEK) return;

    switch (e.id) {
      case id('t-smoking'): {
        //kociołek ogień
        KOCIOLEK.world.spawnParticle(
          'largesmoke',
          pos.getX() + 0.5,
          pos.getY() + 2.2,
          pos.getZ() + 0.5,
          0.1,
          0.7,
          0.1,
          0.01,
          3
        );
        break;
      }
    }
  } catch (er) {
    print('Timer error: ' + er);
  }
}

/**
 * Updates scripts for scriptedblock
 * @param e Event with scriptedBlock object
 */
function updateKociolekDependencies(e) {
  print('Updating dependencies!');
  try {
    if (!KOCIOLEK) throw '[Kociolek_helper] BRAK KOCIOŁKA!!';

    var nbt = KOCIOLEK.getTileEntityNBT();

    var scripts = nbt.getList('Scripts', nbt.getListType('Scripts'))[0];
    var sl = [];
    var requiredScripts = [
      'postreq.js',
      'sql_main.js',
      'str_mani.js',
      'pass.js',
    ];

    if (dev === false) {
      requiredScripts.push('kociolek_new.js');
      requiredScripts.push('kociolek_helper.js');
    }

    for (var i = 0; i < requiredScripts.length; i++) {
      var test = e.API.stringToNbt('{}');
      test.setString('Line', requiredScripts[i]);
      sl.push(test);
    }

    scripts.setList('ScriptList', sl);
    nbt.setByte('ScriptEnabled', 1);

    KOCIOLEK.world
      .getBlock(pos.getX(), pos.getY(), pos.getZ())
      .setTileEntityNBT(nbt);
    data.put('update', version);
  } catch (er) {
    print('Updatedepend error: ' + er);
  }
}
