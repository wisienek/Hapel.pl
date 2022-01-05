var server = Java.type('org.bukkit.Bukkit').getServer();

function baseGui(e) {
  var gui = e.API.createCustomGui(1, 256, 256, false);
  gui.setBackgroundTexture('customnpcs:textures/gui/elki_e.png');
  return gui;
}

/*
    required scripts:
    - commandutils
    - postreq
    - urldownload
    - MoneyV
    - Filemanager
    - sqlmain

*/

function gui1(e, gracz) {
  var gui = baseGui(e);

  if (!gracz) {
    gui.addLabel(9, '§1Panel administratora', 100, 0, 80, 20);
    gui.addTexturedButton(
      1,
      '§7Eliksiry',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      2,
      '§7Placaki',
      90,
      60,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      3,
      '§7Przedmioty',
      90,
      80,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );

    if (
      e.player.getName() == 'Przesladowca' ||
      e.player.getName() == 'TheWookie' ||
      e.player.getName() == 'em411'
    ) {
      gui.addTexturedButton(
        4,
        '§7Pliki',
        90,
        100,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
    }

    gui.addTexturedButton(
      5,
      '§7Karty',
      90,
      120,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      8,
      '§7Cennik',
      90,
      140,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      10,
      '§7Role',
      90,
      160,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else {
    gui.addLabel(9, '§1Panel gracza', 110, 0, 80, 20);
    gui.addTexturedButton(
      901,
      '§7Eliksiry',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      902,
      '§7Cennik',
      90,
      60,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      903,
      '§7Role',
      90,
      80,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  }

  e.player.showCustomGui(gui);
  return gui;
}

function gui2(e, gracz) {
  //eliksiry base
  var gui = baseGui(e);

  gui.addLabel(9, '§1Panel Eliksirów', 110, 0, 80, 20);

  if (!gracz) {
    gui.addTexturedButton(
      101,
      '§7oczekujace',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      102,
      '§7zweryfikowane',
      90,
      60,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );

    gui.addTexturedButton(
      913,
      '§aNowy Składnik',
      5,
      100,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      914,
      '§dEdytuj Składnik',
      5,
      120,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );

    gui.addTexturedButton(
      915,
      '§aNowy Eliksir',
      90,
      100,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      916,
      '§dEdytuj Eliksir',
      90,
      120,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );

    gui.addTexturedButton(
      918,
      '§5Weź Eliksir',
      175,
      100,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      919,
      '§5Weź Kupon',
      175,
      120,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );

    gui.addTexturedButton(
      991,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else {
    gui.addTexturedButton(
      911,
      '§7oczekujace',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      912,
      '§7zweryfikowane',
      90,
      60,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );

    gui.addTexturedButton(
      992,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  }

  e.player.showCustomGui(gui);
  return gui;
}

function gui3(e, txt, gracz) {
  //eliksiry handle zgody
  var gui = baseGui(e);

  gui.addLabel(9, '§1Eliksiry ' + txt, 100, 0, 120, 20);

  var wer = txt == 'oczekujace' ? 3 : 1;

  var oczekujace =
    gracz == true
      ? getOczekujace({
          gracz: e.player.getName(),
          weryfikowane: wer,
          odebrane: 0,
        })
      : getOczekujace({
          weryfikowane: wer,
          odebrane: 0,
        });

  if (oczekujace.error) {
    return e.player.message('[§cDebugger§f] §7Error: ' + oczekujace.error);
  }
  oczekujace = oczekujace.result;

  var list = [];
  for (var i = 0; i < oczekujace.length; i++) {
    list.push(
      '§' +
        (oczekujace[i].odebrane == 1 ? 'c' : '6') +
        oczekujace[i].gracz +
        ' (' +
        oczekujace[i].id +
        ')'
    );
  }

  var id = txt == 'oczekujace' ? (gracz ? 951 : 1) : gracz ? 952 : 2;

  if (!gracz) {
    gui.addTexturedButton(
      991,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else {
    gui.addTexturedButton(
      992,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  }

  gui.addScroll(id, 30, 15, 200, 210, list);

  e.player.showCustomGui(gui);
  return gui;
}

function gui4(e, current, id, grupa, gracz) {
  //akceptacja odrzucenie || odbiór (lista składników)
  var gui = baseGui(e);
  gui.addLabel(9, '§1Eliksir§b ' + id, 100, 0, 80, 20);
  gui.addLabel(19, '§eCena:§c§l ' + current.cena, 5, 0, 80, 20);
  gui.addLabel(29, '§2Nazwa:§a ' + current.eliksir, 5, 15, 160, 20);
  gui
    .addLabel(39, '§4[?]', 240, 20, 15, 15)
    .setHoverText(['§7Info o zaznaczonym wybrze: ']);

  gui.addScroll(11, 10, 40, 240, 190, current.przepis);

  if (!gracz) {
    if (grupa == 'oczekujace') {
      gui.addTexturedButton(
        104,
        '§aAkceptuj',
        5,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
      gui.addTexturedButton(
        105,
        '§cOdrzuć',
        90,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
      gui.addTexturedButton(
        106,
        '§cUsuń',
        175,
        3,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
    } else if (grupa == 'zweryfikowane') {
      gui.addTexturedButton(
        106,
        '§cUsuń',
        5,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
    }
    gui.addTexturedButton(
      991,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else {
    if (grupa == 'zweryfikowane') {
      var items = e.player.getInventory().getItems();
      var przep = false;
      for (var i = 0; i < items.length; i++) {
        if (
          items[i] &&
          items[i].getDisplayName() &&
          current.eliksir &&
          (items[i].getDisplayName() == '§cPrzepustka do składziku' ||
            (items[i].getDisplayName().indexOf('Kupon na eliksir:') > -1 &&
              items[i].getDisplayName().indexOf(current.eliksir) > -1))
        ) {
          przep = true;
        }
      }

      if (current.odebrane == 1) {
        gui.addTexturedButton(
          107,
          '§cUsuń',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        );
      } else {
        gui.addTexturedButton(
          109,
          '§aZapłać i Odbierz',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        );
      }
      if (przep == true) {
        gui.addTexturedButton(
          110,
          '§cOdbierz i nie płać',
          90,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        );
      }
    }
    gui.addTexturedButton(
      992,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  }

  e.player.showCustomGui(gui);
  return gui;
}

function gui5(e, id, eliksir) {
  //szczegóły eliksiru itemkowego
  var gui = baseGui(e);
  gui.addLabel(9, '§1Eliksir§b ' + id, 100, 0, 80, 20);

  if (!eliksir) {
    return e.player.message('[§cAdmin§f] §7Brak eliksiru!!!');
  } else {
    gui.addLabel(29, '§2Konfiguruj opcje', 95, 15, 80, 20);

    var current = getOczekujace({
      id: id,
    });
    if (current.result[0]) {
      current = current.result[0];
    }

    //zmień ważność
    gui
      .addTextField(40, 60, 80, 40, 15)
      .setText(current.pdata || eliksir.data || '14');
    gui.addTexturedButton(
      30,
      '§7Zmień ważność',
      110,
      80,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    //zmień ilość  //def:4
    gui
      .addTextField(60, 60, 100, 40, 15)
      .setText(current.pile || eliksir.ile || '4');
    gui.addTexturedButton(
      50,
      '§7Zmień Ilość',
      110,
      100,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );

    gui.addTexturedButton(
      210,
      '§aZatwierdź',
      5,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  }
  gui.addTexturedButton(
    990,
    '§8Wróc do opisu',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  e.player.showCustomGui(gui);
  return gui;
}

function gui6(e, typ, szukaj) {
  var gui = baseGui(e);

  if (typ) {
    gui.addLabel(9, '§1Wyszukaj składnik z:§c ' + typ, 85, 0, 160, 20);

    var skladniki = getSkladnik({
      typ: typ,
    });
    if (skladniki.error) {
      return e.player.message('[§cDebugger§f] §7Error: ' + skladniki.error);
    }
    skladniki = skladniki.result;

    var lista1 = [];
    for (var i = 0; i < skladniki.length; i++) {
      if (
        szukaj &&
        skladniki[i].nazwa.toLowerCase().indexOf(szukaj.toLowerCase()) > -1
      ) {
        lista1.push(skladniki[i].nazwa);
      } else if (!szukaj) {
        lista1.push(skladniki[i].nazwa);
      }
    }

    gui.addTextField(7, 90, 235, 70, 15);
    gui.addTexturedButton(
      255,
      '§bSzukaj po nazwie',
      5,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );

    lista1.sort();
    gui.addScroll(91, 10, 35, 240, 190, lista1);
  } else {
    gui.addLabel(9, '§1Wybierz typ', 110, 0, 80, 20);

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
  gui.addTexturedButton(
    991,
    '§8Powrót',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  e.player.showCustomGui(gui);
  return gui;
}

function gui7(e, nowy, skladnik) {
  //edytuj składnik [admin]
  var gui = baseGui(e);

  gui.addLabel(9, '§1Edytuj składnik', 110, 0, 80, 20);

  gui
    .addLabel(10, '§cNazwa', 65, 40, 25, 20)
    .setHoverText([
      '§7Nazwa musi zmieścić się w §l32§r§7 znakach!',
      '§7Niedozwolone są znaki specjalne',
      '§7Można używać spacji',
    ]);
  var nazwa = gui.addTextField(11, 90, 40, 120, 20);

  gui
    .addLabel(18, '§cTyp', 75, 70, 20, 20)
    .setHoverText([
      '§7Kategoria składnika:',
      'Nieorganiczne',
      'Bazy wodne',
      'Roślinne',
      'Zwierzęce',
    ]);
  var typ = gui.addTextField(19, 90, 70, 120, 20);

  gui
    .addLabel(12, '§cCena', 70, 100, 20, 20)
    .setHoverText([
      '§7Cena liczona jest od liczby podanej poniżej.',
      '§7Automatycznie zostaje przeliczana na mniejsze i większe jednostki',
    ]);
  var cena = gui.addTextField(13, 90, 100, 120, 20);

  gui
    .addLabel(14, '§cIlość', 67, 130, 20, 20)
    .setHoverText([
      '§7Potrzebna jako podstawa do wyliczenia ceny',
      '§7Przykładowo 24knuty za 1000jednostek produktu',
    ]);
  var ilosc = gui.addTextField(15, 90, 130, 120, 20);

  gui
    .addLabel(16, '§cJednostka', 47, 160, 40, 20)
    .setHoverText([
      '§7Wartość estetyczna.',
      'Wpisz tutaj najmniejszą jednostkę np. Kg -> g, Litry -> ml, m^2 -> cm^2...',
    ]);
  var jednostka = gui.addTextField(17, 90, 160, 120, 20);

  gui
    .addLabel(20, '§cDostępny', 50, 190, 40, 20)
    .setHoverText([
      '§7Czy składnik ma być dostępny dla graczy?',
      '§a1 §7- tak',
      '§c0 §7- nie',
    ]);
  var dostępny = gui.addTextField(21, 90, 190, 20, 20);

  if (!nowy) {
    if (skladnik) {
      nazwa.setText(skladnik.nazwa);
      typ.setText(skladnik.typ);
      cena.setText(skladnik.cena);
      ilosc.setText(skladnik.ilosc);
      jednostka.setText(skladnik.jednostka);
      dostępny.setText(skladnik.dostępny);
    }
    gui.addTexturedButton(
      261,
      '§aUpdate!',
      5,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      265,
      '§cUsuń!',
      90,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else {
    gui.addTexturedButton(
      262,
      '§bZapisz składnik!',
      5,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  }

  gui.addTexturedButton(
    991,
    '§8Powrót',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  e.player.showCustomGui(gui);
  return gui;
}

function gui8(e, nowy, eliksir) {
  //edytuj Eliksir [admin]
  var gui = baseGui(e);

  gui.addLabel(9, '§1Edytuj Eliksir', 110, 0, 80, 20);

  gui
    .addLabel(10, '§cNazwa', 20, 40, 25, 20)
    .setHoverText([
      '§7Nazwa Eliksiru!',
      '§7Niedozwolone są znaki specjalne',
      '§7Można używać spacji',
      '§7Aby dodać do nazwy kliknij §a+',
      '§7Aby resetować nazwę kliknij §cR',
    ]);
  var nazwa = gui.addTextField(11, 45, 40, 170, 20);

  gui
    .addLabel(18, '§cKolor', 35, 70, 20, 20)
    .setHoverText(['§7Kolor eliksiru:', '§7Kolor pisemnie np. §aPerłowy']);
  var kolor = gui.addTextField(19, 55, 70, 65, 20);

  gui
    .addLabel(12, '§cHex c.', 125, 70, 25, 20)
    .setHoverText([
      '§7Kolor w zapisie HexaDecimal (szesnastkowym)',
      "§7Wpisz w google frazę 'hex color' przesuś suwakiem i skopiuj wynik",
      '§7Przykładowy kolor: §afafae7',
      '§4BEZ ZNAKU #',
    ]);
  var hex = gui.addTextField(13, 150, 70, 65, 20);

  gui
    .addLabel(14, '§cZapach', 30, 100, 25, 20)
    .setHoverText([
      '§7Jak pachnie eliksir?',
      '§7Wpisz zapach eliksiru np. §aKoszona trawa',
    ]);
  var zapach = gui.addTextField(15, 55, 100, 65, 20);

  gui
    .addLabel(16, '§cSmak', 130, 100, 25, 20)
    .setHoverText([
      '§7Jak smakuje eliksir?',
      '§7Jeżeli posmakujemy kropelkę co poczujemy?',
      '§7Przykładowo: §asłodki §7/ §asłony §7/ §akarmelu',
    ]);
  var smak = gui.addTextField(17, 150, 100, 65, 20);

  gui
    .addLabel(20, '§cCzas', 35, 130, 25, 20)
    .setHoverText([
      '§7Jak długo trwa eliksir?',
      '§7Wpisz ilość minut trwania eliksiru np. §a60 §7/ §aTrwały §7/ §aAntidotum §7etc...',
    ]);
  var czas = gui.addTextField(21, 55, 130, 65, 20);

  gui
    .addLabel(22, '§cData', 130, 130, 25, 20)
    .setHoverText([
      '§7Jak długo jest ważny eliksir?',
      '§7Wpisz ilość dni ile będzie ważny eliksir zanim się nie zepsuje.',
    ]);
  var data = gui.addTextField(23, 150, 130, 65, 20);

  gui
    .addLabel(24, '§cInokreacja', 5, 160, 40, 20)
    .setHoverText([
      '§7Wynik inokreacji',
      '§7Jak wygląda inokreacja?',
      '§7Kliknij Plus aby dodać do tekstu, R żeby restować',
    ]);
  var inokreacja = gui.addTextField(25, 45, 160, 170, 20);

  gui
    .addLabel(30, '§cP. cena', 10, 190, 35, 20)
    .setHoverText([
      '§7Przewidywana cena',
      '§7Może być cena rynkowa',
      '§7Za ile mogą kupić / sprzedać / zrobić eliksir',
    ]);
  var pcena = gui.addTextField(31, 45, 190, 20, 20);

  if (!nowy) {
    if (eliksir) {
      nazwa.setText(eliksir.nazwa);
      kolor.setText(eliksir.kolor);
      hex.setText(eliksir.hex);
      zapach.setText(eliksir.zapach);
      smak.setText(eliksir.smak);
      czas.setText(eliksir.czas);
      data.setText(eliksir.data);
      inokreacja.setText(eliksir.inokreacja);
      pcena.setText(eliksir.pcena);
    }
    gui.addTexturedButton(
      263,
      '§aUpdate!',
      5,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      266,
      '§cUsuń!',
      90,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else {
    gui.addTexturedButton(
      264,
      '§bZapisz Eliksir!',
      5,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  }

  gui.addTexturedButton(
    991,
    '§8Powrót',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  e.player.showCustomGui(gui);
  return gui;
}

function gui9(e, bool, szukaj, kupon) {
  //edytuj Eliksir [admin]
  var gui = baseGui(e);

  if (bool) {
    gui.addLabel(9, '§1Wybierz Eliksir!' + (kupon ? '!' : ''), 110, 0, 80, 20);
  } else {
    gui.addLabel(9, '§1Wybierz Eliksir', 110, 0, 80, 20);
  }

  var elki = getEliksir();
  if (elki.error) {
    return e.player.message('[§cDebugger§f] §7Error: ' + elki.error);
  }
  elki = elki.result;

  var lista1 = [];
  for (var i = 0; i < elki.length; i++) {
    if (
      szukaj &&
      elki[i].nazwa.toLowerCase().indexOf(szukaj.toLowerCase()) > -1
    ) {
      lista1.push(elki[i].nazwa);
    } else if (!szukaj) {
      lista1.push(elki[i].nazwa);
    }
  }

  gui.addTextField(7, 90, 235, 70, 15);
  gui.addTexturedButton(
    256,
    '§bSzukaj po nazwie',
    5,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  if (bool) {
    //weź eliksir do eq
    gui.addScroll(kupon ? 94 : 93, 10, 35, 240, 190, lista1);
  } else {
    gui.addScroll(92, 10, 35, 240, 190, lista1);
  }

  gui.addTexturedButton(
    991,
    '§8Powrót',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  e.player.showCustomGui(gui);
  return gui;
}

function gui10(e, przywracanie, search) {
  var gui = baseGui(e);

  if (!przywracanie) {
    gui.addLabel(9, '§1Plecaki', 120, 0, 80, 20);
    gui.addTexturedButton(
      420,
      '§7Przywróć plecak',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      421,
      '§7Zapisz kopie',
      90,
      80,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else {
    gui
      .addLabel(9, '§1Wybierz datę', 110, 0, 80, 20)
      .setHoverText([
        '§7Format:',
        '§cID §a|§bData §a|§fgodzina §a|§d[timestamp]',
      ]);

    var files = getCopiedBagIds();

    var names = [];
    for (var i = 0; i < files.length; i++) {
      var data = new Date(Number(files[i].data));
      if (search && JSON.stringify(files[i]).indexOf(search) > -1) {
        names.push(
          '§c' +
            files[i].id +
            ' §a| §b' +
            (data.getDate() +
              '.' +
              (data.getMonth() + 1) +
              '.' +
              data.getFullYear() +
              ' §a|§f ' +
              data.getHours() +
              ':' +
              data.getMinutes()) +
            ' [§d' +
            files[i].data +
            '§f]'
        );
      } else if (!search) {
        names.push(
          '§c' +
            files[i].id +
            ' §a| §b' +
            (data.getDate() +
              '.' +
              (data.getMonth() + 1) +
              '.' +
              data.getFullYear() +
              ' §a|§f ' +
              data.getHours() +
              ':' +
              data.getMinutes()) +
            ' [§d' +
            files[i].data +
            '§f]'
        );
      }
    }
    names.sort();

    gui.addTextField(423, 90, 235, 70, 15);
    gui.addTexturedButton(
      424,
      '§bSzukaj po nazwie',
      5,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );

    gui.addScroll(422, 10, 35, 240, 190, names);
  }

  gui.addTexturedButton(
    991,
    '§8Powrót',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  e.player.showCustomGui(gui);
  return gui;
}

function gui11(e) {
  var gui = baseGui(e);
  //file manager
  gui.addLabel(9, '§1File manager', 120, 0, 80, 20);

  gui.addTexturedButton(
    6,
    '§7CNPC',
    90,
    40,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  ); // cnpc
  gui.addTexturedButton(
    7,
    '§7Skript',
    90,
    60,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  ); // Skript
  gui.addTexturedButton(
    9,
    '§7MagicSpells',
    90,
    80,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  ); // mgcspells

  gui.addTexturedButton(
    991,
    '§8Powrót',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  e.player.showCustomGui(gui);
  return gui;
}

function gui12(e, select, state) {
  var gui = baseGui(e);
  gui.addLabel(9, '§1Menadżer kart', 105, 0, 80, 20);

  if (!select && !state) {
    gui.addTexturedButton(
      11,
      '§2Dodaj nową',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      12,
      '§cUsuń kartę',
      90,
      60,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      13,
      '§dEdytuj kartę',
      90,
      80,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      17,
      '§8Weź kartę',
      90,
      100,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else if (!select && (state == 'add' || state == 'edit')) {
    gui
      .addLabel(1, '§8Typ:', 45, 40, 15, 15)
      .setHoverText([
        '§cUwaga!',
        '§7Do wyboru są jedynie:',
        'common (50%)',
        'uncommon (33,5%)',
        'rare (5%)',
        'legendary (1,5%)',
        'ancient (10%)',
      ]);
    var typ = gui.addTextField(11, 62, 40, 60, 15);

    gui
      .addLabel(2, '§8Nazwa:', 35, 70, 35, 15)
      .setHoverText([
        '§cCo to za czarodziej?',
        '§7Napisz imię i nazwisko czarodzieja!',
        '§7np. Harry Bodder',
      ]);
    var nazwa = gui.addTextField(12, 62, 70, 80, 15);

    gui
      .addLabel(3, '§8Opis:', 40, 100, 20, 15)
      .setHoverText([
        '§cKrótki opis czarodzieja',
        '§7Nowe linijki oddziel przez dodanie §c//',
      ]);
    var opis = gui.addTextField(13, 62, 100, 140, 15);

    if (state == 'edit') {
      var temp = e.player.getTempdata().get('edit');
      temp = JSON.parse(temp) || {};
      if (Object.keys(temp).length > 0) {
        typ.setText(temp.typ);
        nazwa.setText(temp.nazwa);
        opis.setText(temp.opis);
      } else {
        e.player.message('[§cAdmin§f] §7Nie udało się załadować karty!');
      }
      gui.addTexturedButton(
        15,
        '§2Zmień kartę',
        5,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
    } else {
      gui.addTexturedButton(
        14,
        '§2Dodaj kartę',
        5,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
    }
  } else if (!select && state == 'remove') {
    var karta = gui.addLabel(1, '§8Podgląd karty', 100, 70, 50, 15);

    var temp = e.player.getTempdata().get('edit');
    temp = JSON.parse(temp) || [];
    if (temp.length > 0) {
      karta.setHoverText(temp);
    } else {
      e.player.message('[§cAdmin§f] §7Nie udało się załadować karty!');
      return gui12(e);
    }
    gui.addTexturedButton(
      16,
      '§cUsuń kartę',
      90,
      100,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else if (select) {
    var wdata = e.player.world.getStoreddata();
    var karty = wdata.get('karty');
    karty = JSON.parse(karty) || {};
    if (Object.keys(karty).length == 0) {
      e.player.message('[§cAdmin§f] §7Nie można było załadować kart!');
      return gui12(e);
    }
    var lista = [];
    var keys = Object.keys(karty);
    for (var i = 0; i < keys.length; i++) {
      var current = karty[keys[i]];
      for (var j = 0; j < current.length; j++) {
        lista.push(keys[i] + ' / ' + j + ' / ' + current[j].name);
      }
    }
    var id;
    if (select == 'get') {
      id = 4;
    } else if (select == 'edit') {
      id = 5;
    } else {
      id = 3;
    }
    gui.addScroll(id, 10, 35, 240, 190, lista);
  }

  gui.addTexturedButton(
    991,
    '§8Powrót',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );

  e.player.showCustomGui(gui);
  return gui;
}

function gui13(e, skript, list, options) {
  var gui = baseGui(e);

  var path;
  var id;

  if (skript == 'cnpc') {
    path = './Hogwart/customnpcs/scripts/ecmascript/';
    id = 600;
  } else if (skript == 'skript') {
    path = './plugins/Skript/scripts/';
    id = 601;
  } else if (skript == 'MS') {
    path = './plugins/MagicSpells/';
    id = 602;
  }

  gui.addLabel(1, skript, 500, 30, 140, 20);
  gui.addLabel(2, path, 500, 50, 140, 20);

  if (list) {
    var pliki = listFilesInDir(path);
    var lista = [];
    for (var i = 0; i < pliki.length; i++) {
      lista.push(pliki[i].getName());
    }
    lista.sort();

    gui.addScroll(id, 30, 20, 200, 200, lista);
  } else {
    if (options) {
      gui.addLabel(10, options, 65, 30, 140, 20);
      gui
        .addTextField(id + 105, 90, 60, 80, 15)
        .setHoverText([
          '§7Zmień nazwę',
          'Musi posiadać odpowiednie rozszerzenie!',
        ]);
      gui.addTexturedButton(
        id + 10,
        '§aZmień nazwę',
        90,
        80,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
      gui.addTexturedButton(
        id + 20,
        '§cUsuń',
        90,
        100,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
    } else {
      gui.addTextField(id + 104, 30, 40, 200, 15);
      gui.addTextField(id + 103, 90, 60, 80, 15);
      gui
        .addLabel(id + 105, '§7Rename', 60, 60, 30, 15)
        .setHoverText([
          '§4§lUwaga!',
          '§7Musisz wpisać całą nazwę z rozszerzeniem pliku!',
        ]);
      gui
        .addTexturedButton(
          id,
          '§aPobierz',
          90,
          80,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        )
        .setHoverText([path]);
      gui
        .addLabel(8, '§4§l[i]', 235, 40, 20, 15)
        .setHoverText([
          '§4§lUwaga',
          '§7Link musi być direct!',
          '§7To znaczy, że musi kierować dokładnie do pliku aby go pobrać:',
          '§ahttps://domena.pl/folder/plik.js',
          '§chttps://domena.pl/zdjecie',
          '§7Musi zawierać po kropce rozszerzenie. Format http i samo ip też wystarczy',
        ]);

      gui
        .addTexturedButton(
          609,
          '§cLista plików',
          90,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        )
        .setHoverText([path]);
    }
  }

  gui.addTexturedButton(
    993,
    '§8Powrót',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );
  e.player.showCustomGui(gui);
  return gui;
}

function gui14(e, mode, weryfikowany) {
  var gui = baseGui(e);

  gui.addLabel(9, '§1Cennik', 120, 0, 80, 20);

  if (!mode) {
    gui.addTexturedButton(
      230,
      '§7Weryfikacja',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      231,
      '§7Edytowanie',
      90,
      60,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    //gui.addTexturedButton(232, "§7Sprawdzanie", 90, 80, 80, 15, "customnpcs:textures/gui/pp_button.png");
  } else {
    if (mode == 'Item') {
      gui.setBackgroundTexture('customnpcs:textures/gui/inve.png');

      gui
        .addLabel(11, '§2Item', 90, 62, 40, 20)
        .setHoverText(['§7Włóż tutaj item']);
      gui.addItemSlot(100, 20).setHoverText(['§7Włóż tutaj item']);
      gui.showPlayerInventory(8, 113);
    } else if (weryfikowany) {
      gui
        .addLabel(8, '§5[I]', 5, 0, 20, 20)
        .setHoverText([
          '§aid: §b' + weryfikowany.id,
          '§aAutor: §b' + weryfikowany.autor,
          '§aItem: §b' + (weryfikowany.item ? 'Tak' : 'Nie'),
        ]);
      gui
        .addButton(236, '§4✘', 225, 5, 20, 20)
        .setHoverText(['§cUsuń §7Ticket']);

      gui
        .addLabel(10, '§3Nazwa', 20, 40, 30, 20)
        .setHoverText([
          '§7Nazwa ticketu',
          '§7np. §cPrzedmiot - Kieł wampira',
          '§7Max 120 znaków.',
        ]);
      gui
        .addTextField(11, 50, 40, 180, 20)
        .setText(weryfikowany.nazwa)
        .setHoverText([weryfikowany.nazwa || 'nazwa...']);

      gui
        .addLabel(12, '§3Opis', 20, 65, 30, 20)
        .setHoverText([
          '§7Opis produktu / usługi',
          '§7Napisz co to jest, jeżeli biznes to dokładnie opisz co potrzebujesz do niego.',
          '§7Max 4096 znaków.',
        ]);
      gui
        .addTextField(13, 50, 65, 180, 20)
        .setText(weryfikowany.opis)
        .setHoverText([weryfikowany.opis || 'opis...']);

      gui
        .addLabel(14, '§3Tagi', 20, 90, 30, 20)
        .setHoverText([
          '§7Kilka tagów',
          '§7Po przecinku wymień co się znajduje w opisie',
          '§7np. §cfutro wilkołaka, miecz, magiczny miecz, sadzonka madragory',
          '§7Max 512 znaków.',
        ]);
      gui
        .addTextField(15, 50, 90, 180, 20)
        .setText(weryfikowany.tagi)
        .setHoverText([weryfikowany.tagi || 'tagi...']);

      gui
        .addLabel(16, '§3Dostępny', 15, 115, 35, 20)
        .setHoverText([
          '§7Czy ma być dostępne dla wszystkich?',
          '§a1 §7- dostępne dla wszystkich',
          '§c0 §7- dostępne tylko dla specjalnych osób',
          '§7Z reguły powinny być dostępne przedmioty i podobne, Biznesy i bardziej personalne sprawy możesz dać niedostępne.',
        ]);
      gui.addTextField(17, 50, 115, 20, 20).setText(weryfikowany.dostępne || 1);

      gui
        .addLabel(18, '§3Cena', 85, 115, 20, 20)
        .setHoverText(['§7Cena produktu wyrażona w knutach', '§a25']);
      gui.addTextField(19, 110, 115, 30, 20).setText(weryfikowany.cena || 0);

      gui
        .addLabel(20, '§3Przecena', 150, 115, 35, 20)
        .setHoverText([
          '§7Ilość przeceny w %',
          '§7np. §e20',
          '§7Nie pisz §l§c%§r§7!',
        ]);
      gui.addTextField(21, 185, 115, 20, 20).setText(weryfikowany.sale);

      gui
        .addLabel(22, '§3Sprzedawcy', 8, 140, 40, 20)
        .setHoverText([
          '§7Czy ma być tylko dla specjalnych sprzedawców?',
          '§e1§7 - tak, tylko osoby upoważnione mogą kupić (z odpowiednim itemem)',
          '§c0§7 - nie, nikt oprócz pewnych osób nie widzi',
        ]);
      gui.addTextField(23, 50, 140, 20, 20).setText(weryfikowany.monly || 0);

      gui
        .addLabel(24, '§3Przecena Sprzedawcy', 80, 140, 40, 20)
        .setHoverText([
          '§7Ilość przeceny w % dla specjalnych sprzedawców',
          '§7np. §e20',
          '§7Nie pisz §l§c%§r§7!',
        ]);
      gui.addTextField(25, 125, 140, 30, 20).setText(weryfikowany.msale);

      // dodać działanie
      gui
        .addTexturedButton(
          234,
          '§8Dodaj item',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        )
        .setHoverText([
          '§7Wyświetli menu ze slotem',
          '§7Po włożeniu zniknie i pojawi się item.',
        ]);
      gui.addTexturedButton(
        235,
        '§2Zapisz',
        90,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
    } else if (!weryfikowany) {
      var weryfikowane = getCennik({
        wer: mode == 'Edytowanie' ? 1 : 0,
      });
      if (weryfikowane.error) {
        return e.player.message(
          '[§cDebugger§f] §7Error: ' + weryfikowane.error
        );
      }
      weryfikowane = weryfikowane.result;

      var lista = [];
      for (var i = 0; i < weryfikowane.length; i++) {
        lista.push(
          weryfikowane[i].id +
            '. §e' +
            weryfikowane[i].nazwa +
            ' ' +
            weryfikowane[i].autor +
            ' §c[' +
            (weryfikowane[i].tagi ? weryfikowane[i].tagi : '') +
            ']'
        );
      }

      gui.addScroll(mode == 'Edytowanie' ? 235 : 232, 15, 15, 230, 210, lista);
    }
  }

  gui.addTexturedButton(
    8,
    '§8Powrót',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );
  e.player.showCustomGui(gui);
  return gui;
}

function gui15(e, mode, weryfikowany) {
  var gui = baseGui(e);

  gui.addLabel(9, '§1Cennik', 120, 0, 80, 20);

  if (!mode) {
    gui.addTexturedButton(
      232,
      '§7Wyślij ticket',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    gui.addTexturedButton(
      233,
      '§7Lista ticketów',
      90,
      60,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
    //gui.addTexturedButton(232, "§7Sprawdzanie", 90, 80, 80, 15, "customnpcs:textures/gui/pp_button.png");
  } else if (mode == 'Wyślij ticket') {
    // pola do wypełnienia

    gui
      .addLabel(20, '§4[U]', 20, 0, 20, 20)
      .setHoverText(['§7Najlepiej wkleić już gotowy text']);

    // nazwa 120, opis 1024, tagi 512
    gui
      .addLabel(10, '§3Nazwa', 20, 60, 30, 20)
      .setHoverText([
        '§7Nazwa ticketu',
        '§7np. §cPrzedmiot - Kieł wampira',
        '§7Max 120 znaków.',
      ]);
    gui.addTextField(11, 50, 60, 180, 20);

    gui
      .addLabel(12, '§3Opis', 20, 80, 30, 20)
      .setHoverText([
        '§7Opis produktu / usługi',
        '§7Napisz co to jest, jeżeli biznes to dokładnie opisz co potrzebujesz do niego.',
        '§7Max 4096 znaków.',
      ]);
    gui.addTextField(13, 50, 80, 180, 20);

    gui
      .addLabel(14, '§3Tagi', 20, 100, 30, 20)
      .setHoverText([
        '§7Kilka tagów',
        '§7Po przecinku wymień co się znajduje w opisie',
        '§7np. §cfutro wilkołaka, miecz, magiczny miecz, sadzonka madragory',
        '§7Max 512 znaków.',
      ]);
    gui.addTextField(15, 50, 100, 180, 20);

    gui
      .addLabel(16, '§3Dostępny', 15, 120, 35, 20)
      .setHoverText([
        '§7Czy ma być dostępne dla wszystkich?',
        '§a1 §7- dostępne dla wszystkich',
        '§c0 §7- dostępne tylko dla specjalnych osób',
        '§7Z reguły powinny być dostępne przedmioty i podobne, Biznesy i bardziej personalne sprawy możesz dać niedostępne.',
      ]);
    gui.addTextField(17, 50, 120, 180, 20).setText('1');

    gui.addTexturedButton(
      237,
      '§2Weryfikuj',
      90,
      160,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else if (mode == 'Lista ticketów') {
    if (!weryfikowany) {
      var weryfikowane = getCennik({
        wer: 1,
        dostępne: 1,
      });
      if (weryfikowane.error) {
        return e.player.message(
          '[§cDebugger§f] §7Error: ' + weryfikowane.error
        );
      }
      weryfikowane = weryfikowane.result;
      var wer1 = getCennik({
        wer: 1,
        dostępne: 0,
        autor: e.player.getName(),
      });
      if (wer1.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + wer1.error);
      }
      weryfikowane.concat(wer1.result);

      var lista = [];
      for (var i = 0; i < weryfikowane.length; i++) {
        lista.push(
          weryfikowane[i].id +
            '. §e' +
            weryfikowane[i].nazwa +
            ' §c[' +
            (weryfikowane[i].tagi ? weryfikowane[i].tagi : '') +
            ']'
        );
      }

      gui.addScroll(236, 15, 15, 230, 210, lista);
    } else {
      gui
        .addLabel(20, '§4[i]', 20, 0, 20, 20)
        .setHoverText([
          '§aID: §b' + weryfikowany.id,
          '§aAutor: §b' + weryfikowany.autor,
          '§aItem: §b' + (weryfikowany.item ? 'Tak' : 'Nie'),
          '§aCena: §b' + weryfikowany.cena,
          '§aDostępne: §b' + (weryfikowany.dostępne == 1 ? 'Tak' : 'Nie'),
          '§aRabat: §b' +
            (weryfikowany.sale > 0 ? weryfikowany.sale + ' %' : 'Brak'),
          '§aTylko sprzedawcy: §b' + (weryfikowany.monly == 1 ? 'Tak' : 'Nie'),
          '§aRabat sprzedawcy: §b' +
            (weryfikowany.msale > 0 ? weryfikowany.msale + ' %' : 'Brak'),
        ]);

      gui
        .addLabel(21, '§c{Nazwa}', 60, 100, 40, 20)
        .setHoverText(['§cNazwa: §b' + weryfikowany.nazwa]);
      gui
        .addLabel(22, '§c{Opis}', 120, 100, 30, 20)
        .setHoverText(['§cOpis: §b' + weryfikowany.opis]);
      gui
        .addLabel(23, '§c{Tagi}', 180, 100, 30, 20)
        .setHoverText(['§cTagi: §b' + weryfikowany.tagi]);

      if (weryfikowany.item && weryfikowany.dostępne == 1) {
        var item = e.player.world.createItemFromNbt(
          e.API.stringToNbt(weryfikowany.item)
        );
        gui
          .addTexturedRect(
            24,
            'customnpcs:textures/gui/trader.png',
            120,
            130,
            18,
            18,
            31,
            139
          )
          .setHoverText([
            item.getDisplayName(),
            Java.from(item.getLore()).join('\n'),
          ]);
        gui
          .addTexturedRect(
            25,
            item.getName().slice(0, item.getName().indexOf(':')) +
              ':textures/items/' +
              item.getName().split(':')[1] +
              '.png',
            120,
            130,
            256,
            256
          )
          .setScale(0.0625);

        gui.addTexturedButton(
          222,
          '§aZakup',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        );
        gui
          .addTextField(26, 90, 235, 40, 15)
          .setText('1')
          .setHoverText([
            '§7Wpisz ile itemów chcesz zakupić',
            '§7Liczba musi być w przedziale §c<1;64>',
          ]);
      }
    }
  }

  gui.addTexturedButton(
    902,
    '§8Powrót',
    175,
    235,
    80,
    15,
    'customnpcs:textures/gui/pp_button.png'
  );
  e.player.showCustomGui(gui);
  return gui;
}

function gui16(e, gracz, mode) {
  //role gracz
  var gui = baseGui(e);

  gui.addLabel(9, '§1Menadżer', 115, 0, 80, 20);

  if (gracz) {
    if (!mode) {
      var x = gui.addTexturedRect(
        10,
        'betterrecords:textures/items/urlrecord.png',
        230,
        10,
        256,
        256
      );
      x.setScale(0.0625);
      gui
        .addTexturedButton(
          721,
          '',
          230,
          10,
          20,
          20,
          'betterrecords:textures/items/urlrecord.png'
        )
        .setHoverText(['Reload']);

      gui.addTexturedButton(
        701,
        '§7Stwórz rolę',
        90,
        40,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
      gui.addTexturedButton(
        702,
        '§2Aplikuj',
        90,
        60,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
      gui.addTexturedButton(
        703,
        '§3Aplikacje',
        90,
        80,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
    } else {
      switch (mode) {
        case 'create': {
          gui
            .addTextField(720, 55, 40, 140, 20)
            .setHoverText([
              '§cInfo',
              '§7Nazwa grupy §lJednowyrazowa',
              '§7Przykłady (§aDobry §cZły§7):',
              '§aPracownikDTM',
              '§aGazetaHogsmeade',
              "§cdruk'arnia pana zdzisłafkaq231@@@@",
            ]);
          gui
            .addTextField(721, 55, 65, 80, 20)
            .setHoverText([
              '§cInfo',
              '§7DisplayName §lSkrócona nazwa',
              '§7Przykłady (§aDobry §cZły§7):',
              '§a[&7Pr&6DTM&f]',
              '§a[GazHogs]',
              '§c{NiewidocznyCzłowiekPna&cP&aA&bP&8i&3E&dŻ&2A}',
            ]);
          gui
            .addTextField(722, 155, 65, 40, 20)
            .setHoverText([
              '§cInfo',
              '§7Waga nazwy §lLiczba',
              '§7Prefix roli wyświetla się w zależności od wagi (w przypadku posiadania kilku ról)',
              '§7Waga Może znajdować się w przedziale §a<0 §7; §c70>',
            ]);
          gui
            .addTextField(723, 30, 90, 200, 20)
            .setHoverText([
              '§cInfo',
              '§7Dodatkowe permissie §lplugin.permissia',
              '§7Jakie dodatkowe permissie powinna posiadać grupa (nie licząc z dziedziczenia od nadżędnej)',
              '§7Wypisz permissie po spacji',
              '§7Jeżeli nie znasz permissi, zapytaj moderatora!',
              '§7Przykłady §aDobre §cZłe:',
              '§ahapel.playas hapel.sedzia hapel.slap essentials.fly.*',
              '§c*, jpr jalapeńo-pepeer admin',
            ]);
          gui
            .addTexturedButton(
              724,
              '§5Dodaj grupę',
              45,
              115,
              80,
              15,
              'customnpcs:textures/gui/pp_button.png'
            )
            .setHoverText([
              '§cInfo',
              '§7Wybierz z jakiej grupy powinna dziedziczyć dana rola',
              '§7będzie to grupa §lNadżędna§r',
              '§7To znaczy, że twoja rola będzie miała takie same permissie co ta grupa.',
            ]);
          gui
            .addTexturedButton(
              725,
              '§5Dodaj ścieżkę',
              130,
              115,
              80,
              15,
              'customnpcs:textures/gui/pp_button.png'
            )
            .setHoverText([
              '§cInfo',
              '§7Wybierz w jakiej ścieżce ma być rola',
              '§7Ścieżki to sposób rozwijania roli od §llewej§r§7 do §lprawej',
              '§7Mając rolę w ścieżce możesz awansować lub być degradowany na niższą pozycję',
            ]);

          gui
            .addTexturedButton(
              730,
              '§2Wyślij',
              90,
              235,
              80,
              15,
              'customnpcs:textures/gui/pp_button.png'
            )
            .setHoverText([
              '§aWyślij do weryfikacji',
              '§7Aplikacja zostanie zweryfikowana po czasie',
              '§7Przez ekipę serwera',
              '§7Po tym możesz otrzymać rolę i nią zarządzać.',
            ]);
          break;
        }
        case 'path': {
          var tdata = e.player.getTempdata();
          var globalpaths = tdata.get('globalP');
          globalpaths = JSON.parse(globalpaths) || [];
          var mypath = tdata.get('myP');
          mypath = mypath || '';

          gui.addLabel(700, '§dZaładowano: §c' + mypath, 90, 20, 100, 15);

          gui
            .addScroll(720, 40, 40, 180, 170, globalpaths)
            .setHoverText([
              '§cInfo',
              '§7Globalne ścieżki, które możesz załadować',
            ]);

          gui.addTexturedButton(
            701,
            '§aPowrót do tworzenia',
            90,
            235,
            80,
            15,
            'customnpcs:textures/gui/pp_button.png'
          );

          break;
        }
        case 'group': {
          var tdata = e.player.getTempdata();
          var globalgroups = tdata.get('globalG');
          globalgroups = JSON.parse(globalgroups) || [];
          var mygroups = tdata.get('myG');
          mygroups = JSON.parse(mygroups) || [];

          gui
            .addScroll(730, 20, 40, 90, 150, globalgroups)
            .setHoverText([
              '§cInfo',
              '§7Globalne grupy, które możesz załadować',
            ]);

          gui.addButton(750, '§c>', 120, 90, 20, 20).setHoverText('§7Załaduj');
          gui.addButton(751, '§c<', 120, 120, 20, 20).setHoverText('§7Wyładuj');

          gui
            .addScroll(731, 150, 40, 90, 150, mygroups)
            .setHoverText([
              '§cInfo',
              '§7Załadowane grupy nadżędne - ładowanie permissi',
            ]);

          gui.addTexturedButton(
            701,
            '§aPowrót do tworzenia',
            90,
            235,
            80,
            15,
            'customnpcs:textures/gui/pp_button.png'
          );

          break;
        }
        case 'apply': {
          break;
        }
        case 'applications': {
          break;
        }
      }
    }
  }

  e.player.showCustomGui(gui);
  return gui;
}
// dodać system permissi / grup

function customGuiButton(e) {
  switch (e.buttonId) {
    case 1: {
      /* przejdź do panelu eliksirów */
      gui2(e);
      break;
    }
    case 2: {
      /* przywracanie plecaka */
      gui10(e);
      break;
    }
    case 4: {
      /* Pliki */
      gui11(e);
      break;
    }
    case 5: {
      /* karty */
      gui12(e);
      break;
    }
    case 6: {
      /* PLiki ncpc */
      gui13(e, 'cnpc');
      break;
    }
    case 7: {
      /* PLiki skript */
      gui13(e, 'skript');
      break;
    }
    case 9: {
      /* Pliki mspells */
      gui13(e, 'MS');
      break;
    }
    case 8: {
      /* Cennik admin */
      gui14(e);
      break;
    }
    case 11: {
      /* dodaj kartę */
      gui12(e, false, 'add');
      break;
    }
    case 12: {
      /* select karta */
      gui12(e, true, 'remove');
      break;
    }
    case 13: {
      /* edytuj kartę */
      gui12(e, 'edit', 'edit');
      break;
    }
    case 230:
    case 231:
    case 232:
    case 233: {
      /* Edytuj, weryfikuj cennik */
      var text = e.gui.getComponent(e.buttonId).getLabel().replace(/§./g, '');
      return e.buttonId > 231 ? gui15(e, text) : gui14(e, text);
    }
    case 234: {
      /* Dodaj item */
      return gui14(e, 'Item');
    }
    case 902: {
      /* gracz- cennik */
      return gui15(e);
    }

    case 14: {
      //dodaj kartę
      var typ = e.gui.getComponent(11).getText();
      var nazwa = e.gui.getComponent(12).getText();
      var opis = e.gui.getComponent(13).getText();
      if (!typ || !nazwa || !opis) {
        return e.player.message(
          '[§cAdmin§f] §7Musisz wypełnić wszystkie pola!'
        );
      }
      if (
        ['ancient', 'common', 'legendary', 'uncommon', 'rare'].indexOf(typ) ==
        -1
      ) {
        return e.player.message(
          '[§cAdmin§f] §7Niepoprawny typ! Najedź na label i przepisz jeden.'
        );
      }
      opis = opis.split('//') || [opis];
      var wdata = e.player.world.getStoreddata();
      var karty = wdata.get('karty');
      var top = wdata.get('karty_top');
      top = Number(top);
      karty = JSON.parse(karty);
      if (Object.keys(karty).length == 0 || !top) {
        return e.player.message('[§cAdmin§f] §7Błąd podczas ładowania danych!');
      }
      top++;
      karty[typ].push({
        name: nazwa,
        opis: opis,
        numer: top,
      });
      wdata.put('karty', JSON.stringify(karty));
      wdata.put('karty_top', top);
      e.player.message('[§cAdmin§f] §7Dodano nową kartę!');

      var x = ang(
        'Moderator **' +
          e.player.getName() +
          '** Dodał kartę czarodziejów:\n```Typ: ' +
          typ +
          '\nNumer: ' +
          top +
          '\nNazwa: ' +
          nazwa +
          '\nOpis: ' +
          opis +
          '```'
      );
      var url = passes.hooks.karty;

      var test = sqlPut(
        'INSERT INTO karty(numer, typ, nazwa, opis) VALUES (' +
          top +
          ', "' +
          typ +
          '", "' +
          nazwa +
          '", "' +
          opis +
          '");'
      );
      if (test.error) {
        e.player.message(
          '[§cDebugger§f] §7Wystąpił błąd w przepisywaniu do bazy danych, ' +
            test.error
        );
      }

      HTTP.post(url, {
        content: x,
        tts: false,
      });

      return gui1(e);
    }
    case 15: {
      //zmień kartę
      var typ = e.gui.getComponent(11).getText();
      var nazwa = e.gui.getComponent(12).getText();
      var opis = e.gui.getComponent(13).getText();
      if (!typ || !nazwa || !opis) {
        return e.player.message(
          '[§cAdmin§f] §7Musisz wypełnić wszystkie pola!'
        );
      }
      if (
        ['ancient', 'common', 'legendary', 'uncommon', 'rare'].indexOf(typ) ==
        -1
      ) {
        return e.player.message(
          '[§cAdmin§f] §7Niepoprawny typ! Najedź na label i przepisz jeden.'
        );
      }
      opis = opis.split('//') || [opis];

      var tdata = e.player.getTempdata();
      var edit = tdata.get('edit'); //{ typ: sel[0], nazwa: current.name, opis: current.opis.join("//") }
      var path = tdata.get('edit_i'); // [0]=> typ, [1]=> id, [2]=>nazwa
      if (!path || !edit) {
        return e.player.message(
          '[§cDebugger§f] §7Nie znaleziono wybranej karty!'
        );
      }
      edit = JSON.parse(edit);
      path = JSON.parse(path);
      if (edit.typ == typ && edit.nazwa == nazwa && edit.opis == opis) {
        return e.player.message('[§cAdmin§f] §7Karty są identyczne!');
      }

      var wdata = e.player.world.getStoreddata();
      var karty = wdata.get('karty');
      karty = JSON.parse(karty);
      if (Object.keys(karty).length == 0) {
        return e.player.message('[§cAdmin§f] §7Błąd podczas ładowania danych!');
      }

      var current = karty[path[0]][path[1]];
      karty[path[0]].splice(path[1], 1);
      current.name = nazwa;
      current.opis = opis;
      karty[typ].push(current);
      wdata.put('karty', JSON.stringify(karty));
      tdata.remove('edit');
      tdata.remove('edit_i');

      e.player.message('[§cAdmin§f] §7Zmieniono kartę!');
      var x = ang(
        'Moderator **' +
          e.player.getName() +
          '** zmienił kartę: \n```Nazwa: ' +
          path[2] +
          ' -> ' +
          current.name +
          ' \nTyp: ' +
          path[0] +
          ' -> ' +
          typ +
          ' \nOpis: ' +
          edit.opis +
          ' -> ' +
          current.opis +
          '```'
      );
      var url = passes.hooks.karty;

      var test = sqlPut(
        'UPDATE karty SET typ="' +
          typ +
          '", nazwa="' +
          nazwa +
          '", opis="' +
          opis +
          '" WHERE numer=' +
          top +
          ';'
      );
      if (test.error) {
        e.player.message(
          '[§cDebugger§f] §7Wystąpił błąd w przepisywaniu do bazy danych, ' +
            test.error
        );
      }

      HTTP.post(url, {
        content: x,
        tts: false,
      });

      return gui1(e);
    }
    case 16: {
      //usuń kartę
      var temp = e.player.getTempdata();
      var remove = temp.get('remove');
      remove = JSON.parse(remove) || [];
      if (temp.length == 0 || remove.length == 0) {
        e.player.message('[§cAdmin§f] §7Błąd, ponów wybieranie!');
        return gui12(e);
      }
      var wdata = e.player.world.getStoreddata();
      var karty = wdata.get('karty');
      karty = JSON.parse(karty) || {};
      if (Object.keys(karty).length == 0) {
        e.player.message('[§cAdmin§f] §7Nie można było załadować kart!');
        return gui12(e);
      }
      var current = karty[remove[0]][remove[1]];
      karty[remove[0]].splice(remove[1], 1);
      wdata.put('karty', JSON.stringify(karty));
      temp.remove('remove');
      temp.remove('edit');

      var x = ang(
        'Moderator **' +
          e.player.getName() +
          '** Usunął kartę czarodziejów:\n```Typ: ' +
          remove[0] +
          '\nNumer: ' +
          current.numer +
          '\nNazwa: ' +
          current.name +
          '\nOpis: ' +
          current.opis +
          '```'
      );
      var url = passes.hooks.karty;

      var test = sqlPut('DELETE FROM karty WHERE numer=' + top + ';');
      if (test.error) {
        e.player.message(
          '[§cDebugger§f] §7Wystąpił błąd w przepisywaniu do bazy danych, ' +
            test.error
        );
      }

      HTTP.post(url, {
        content: x,
        tts: false,
      });

      e.player.message('[§cAdmin§f] §7Usunięto kartę!');
      return gui12(e);
    }
    case 17: {
      return gui12(e, 'get');
    }
    case 30:
    case 50: {
      //edytowanie szczegółów elku
      var ile = parseFloat(e.gui.getComponent(60).getText());
      var waz = parseFloat(e.gui.getComponent(40).getText());
      var id = e.gui.getComponent(9).getText().split(' ')[1];
      if (!ile || !waz || isNaN(ile) || isNaN(waz) || ile <= 0 || waz <= 0) {
        return e.player.message('[§cEliksiry§f] §7Niepoprawny text!');
      }

      var test = updateOczekujace(id, {
        ile: ile,
        data: waz,
      });
      if (test.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + test.error);
      }
      var eliksir = getOczekujace({
        id: id,
      });
      if (eliksir.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + eliksir.error);
      }

      return gui5(e, id, eliksir);
    }
    case 901: {
      /* przejdź do panelu eliksirów */
      gui2(e, true);
      break;
    }
    case 101:
    case 102:
    case 103: {
      var txt = e.gui.getComponent(e.buttonId).getLabel().split('§7')[1];
      gui3(e, txt);
      break;
    }
    case 911:
    case 912: {
      var txt = e.gui.getComponent(e.buttonId).getLabel().split('§7')[1];
      gui3(e, txt, true);
      break;
    }
    case 104: {
      //akceptuj eliksir (admin)
      var id = e.gui.getComponent(9).getText().split(' ')[1];

      var eliksir = getOczekujace({
        id: id,
      });
      if (eliksir.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + eliksir.error);
      }

      eliksir = getEliksir({
        nazwa: eliksir.eliksir,
      });
      if (eliksir.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + eliksir.error);
      }

      gui5(e, id, eliksir);
      break;
    }
    case 105: {
      //odrzuć eliksir
      var id = e.gui.getComponent(9).getText().split(' ')[1];
      var powod = e.gui.getComponent(99);
      if (!powod) {
        e.gui
          .addTextField(99, 0, 260, 256, 20)
          .setHoverText([
            '§7Podaj powód odrzucenia',
            "§7I kliknij '§cOdrzuć§7' ponownie!",
          ]);
        return e.gui.update(e.player);
      }
      powod = powod.getText() || '';

      var current = getOczekujace({
        id: id,
      });
      if (current.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + current.error);
      }
      current = current.result[0];

      var test = removeOczekujace(id);
      if (test.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + test.error);
      }

      e.API.executeCommand(
        e.player.world,
        'dcdpm ' +
          current.gracz +
          ' Twój eliksir: `' +
          current.eliksir +
          ' (' +
          id +
          ')` został odrzucony!' +
          (powod.length > 0
            ? '\nWiadomość odrzucenia:\n```' + powod + '```'
            : '')
      );
      e.player.message(
        '[§cEliksiry§f] §7Odrzucono eliksir gracza §b' +
          current.gracz +
          '§7 (§b' +
          id +
          '§7)!'
      );
      var x = e.player.world.getPlayer(current.gracz);
      if (x) {
        x.message(
          '[§cEliksiry§f] §7Twój eliksir został zweryfikowany przez moderatora. Wynik: §cNegatywny!'
        );
      }
      post(
        false,
        'Moderator: **' +
          e.player.getName() +
          '** Odrzucił eliksir `' +
          current.eliksir +
          ' (' +
          id +
          ')` gracza **' +
          current.gracz +
          '** <@' +
          current.discord +
          '>'
      );

      gui3(e, 'oczekujace');
      break;
    }
    case 106:
    case 107: {
      //Usuń eliksir
      var id = e.gui.getComponent(9).getText().split(' ')[1];

      var current = getOczekujace({
        id: id,
      });
      if (current.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + current.error);
      }
      current = current.result[0];

      if (e.buttonId == 106) {
        e.API.executeCommand(
          e.player.world,
          'dcdpm ' +
            current.gracz +
            ' Twój eliksir: `' +
            current.eliksir +
            ' (' +
            id +
            ')` został Usunięty!' +
            (current.odebrane == 1 ? '\nEliksir był już odebrany' : '')
        );
        e.player.message(
          '[§cEliksiry§f] §7Usunięto eliksir gracza §b' +
            current.gracz +
            '§7 (§b' +
            id +
            '§7)!'
        );
        post(
          false,
          'Moderator: **' +
            e.player.getName() +
            '** Usunął eliksir `' +
            current.eliksir +
            ' (' +
            id +
            ')` gracza **' +
            current.gracz +
            '** <@' +
            current.discord +
            '>!'
        );
      } else {
        e.player.message('[§cEliksiry§f] §7Usunięto eliksir §b' + id + ' §7!');
        post(
          false,
          'Gracz: **' +
            e.player.getName() +
            '** <@' +
            current.discord +
            '> Usunął swój eliksir `' +
            current.eliksir +
            ' (' +
            id +
            ')`!'
        );
      }

      var test = removeOczekujace(id);
      if (test.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + test.error);
      }

      gui3(e, 'oczekujace', e.buttonId == 107 ? true : false);
      break;
    }
    case 109:
    case 110: {
      //zapłać i odbierz eliksir [gracz]
      var id = e.gui.getComponent(9).getText().split(' ')[1];

      var current = getOczekujace({
        id: id,
      });

      if (current.error)
        return e.player.message('[§cDebugger§f] §7Error: ' + current.error);
      if (!current.result[0] || current.result[0].odebrane == 1)
        return e.player.message('[§cEliksiry§f] §7Już odebrałeś eliksir!');

      current = current.result[0];

      var spalona = false;
      if (e.buttonId == 110) {
        var items = e.player.getInventory().getItems();
        for (var i = 0; i < items.length; i++) {
          if (
            items[i] &&
            !spalona &&
            (items[i].getDisplayName() == '§cPrzepustka do składziku' ||
              (items[i].getDisplayName().indexOf('Kupon na eliksir:') > -1 &&
                items[i].getDisplayName().indexOf(current.eliksir) > -1))
          ) {
            items[i].setStackSize(items[i].getStackSize() - 1);
            spalona = true;
            break;
          }
        }
        if (spalona) {
          current.cena = 0;
          e.player.message(
            '[§cEliksiry§f] §7Przepustka została spalona wzamian za składniki do eliksiru!'
          );
        }
      }

      if (
        spalona == true ||
        requestPayment(e.player.getName(), current.cena) == true
      ) {
        var eliksir = getEliksir({
          nazwa: current.eliksir,
        });
        if (eliksir.error)
          return e.player.message('[§cDebugger§f] §7Error: ' + eliksir.error);

        eliksir = eliksir.result[0];

        var titem = e.player.world.createItem('minecraft:potion', 0, 1);
        var data = new Date(
          Date.now() + (current.pdata || eliksir.data) * 86400000
        );
        var y = data.getTime();
        y = y.toString(16).split('').reverse().join('');
        var lore = [
          '§5Kolor: §a' + eliksir.kolor,
          '§5Zapach: §a' + eliksir.zapach,
          '§5Smak: §a' + eliksir.smak,
          '',
          '§cData ważności:§7 ' + y,
        ];
        titem.setCustomName('§eTajemniczy Eliksir');
        titem.setLore(lore);
        var nbt = titem.getNbt();
        nbt.setString('Eliksir', eliksir.nazwa);
        nbt.setString('Czas', eliksir.czas);
        nbt.setString('Inokreacja', eliksir.inokreacja);
        nbt.setLong('Data', data.getTime());
        nbt.setLong('CustomPotionColor', parseInt(eliksir.hex, 16) || 3093151);
        nbt.setInteger('HideFlags', 37);

        current.stack = titem.getItemNbt().toJsonString();

        var item = e.player.world.createItemFromNbt(
          e.API.stringToNbt(current.stack)
        );
        var ile = current.pile || eliksir.ile || 4;

        for (var i = 0; i < ile; i++) {
          e.player.dropItem(item).setOwner(e.player.getName());
        }

        e.player.message(
          '[§cEliksiry§f] §7Uwaga! Jeżeli nie widzisz wszystkich eliksirów w eq otwórz jakieś inventory np. skrzynkę/piec etc.'
        );

        var x =
          'Gracz **' +
          e.player.getName() +
          '** Odebrał eliksir: ' +
          current.eliksir +
          ' (`' +
          id +
          '`), zapłacił za składniki: *' +
          current.cena +
          '* knutów.';
        if (spalona) x += '\nUżyto przepuski/kuponu !';
        x = ang(x);
        post(false, x);

        var test = updateOczekujace(id, {
          odebrane: 1,
          data_odebrania: Date.now(),
        });
        if (test.error)
          return e.player.message('[§cDebugger§f] §7Error: ' + test.error);
      } else {
        return e.player.message(
          '[§cEliksiry§f] §7Nie masz wystarczająco pieniążków w portfelu!'
        );
      }
      break;
    }
    case 210: {
      //zatwierdź eliksir (koniec)
      var id = e.gui.getComponent(9).getText().split(' ')[1];

      var current = getOczekujace({
        id: id,
      });
      if (current.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + current.error);
      }
      current = current.result[0];

      var eliksir = getEliksir({
        nazwa: current.eliksir,
      });
      if (eliksir.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + eliksir.error);
      }
      eliksir = eliksir.result[0];

      var akc = updateOczekujace(id, {
        weryfikowane: 1,
      });
      if (akc.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + akc.error);
      }

      var _ile = current.pile ? current.pile : eliksir.ile;
      var _data = current.pdata ? current.pdata : eliksir.data;

      var data = new Date(Date.now() + _data * 86400000);
      var y = data.getTime();
      y = y.toString(16).split('').reverse().join('');
      var lore = [
        '§5Kolor: §a' + eliksir.kolor,
        '§5Zapach: §a' + eliksir.zapach,
        '§5Smak: §a' + eliksir.smak,
        '',
        '§cData ważności:§7 ' + y,
      ];

      var item = e.player.world.createItem('minecraft:potion', 0, 1);
      item.setCustomName('§eTajemniczy Eliksir');
      item.setLore(lore);
      var nbt = item.getNbt();
      nbt.setString('Eliksir', eliksir.nazwa);
      nbt.setString('Czas', eliksir.czas);
      nbt.setString('Inokreacja', eliksir.inokreacja);
      nbt.setLong('Data', data.getTime());
      nbt.setLong('CustomPotionColor', parseInt(eliksir.hex, 16) || 3093151);
      nbt.setInteger('HideFlags', 37);

      current.stack = item.getItemNbt().toJsonString();

      e.player.dropItem(item).setOwner(e.player.getName());
      e.player.message('[§cEliksiry§f] §7Otrzymano kopię eliksiru');

      e.API.executeCommand(
        e.player.world,
        'dcdpm ' +
          current.gracz +
          ' Twój eliksir: ' +
          eliksir.nazwa +
          ' (`' +
          id +
          '`)  został zaakceptowany!\nWejdź na serwer i wciśnij `ALT+G` aby go odebrać.'
      );

      var x =
        'Moderator **' +
        e.player.getName() +
        '** zweryfikował eliksir gracza **' +
        current.gracz +
        '** <@' +
        current.discord +
        '> (`' +
        id +
        '`)\n```--Eliksir: ' +
        eliksir.nazwa +
        '\n--Data: ' +
        new Date(data).toDateString() +
        '\n--Ilość: ' +
        _ile +
        '    ```';
      x = ang(x);
      post(false, x);
      e.player.getTempdata().remove('current');
      gui3(e, 'oczekujace');
      break;
    }
    case 222: {
      //zakup item z cennika
      try {
        var ile = e.gui.getComponent(26).getText() || 1;
        if (!ile || isNaN(parseInt(ile)) || ile < 1 || ile > 64) {
          throw 'Wpisano niepoprawną kwotę: §e' + ile;
        }
        var tempdata = e.player.getTempdata();
        var wer = JSON.parse(tempdata.get('cennikWer'));
        if (Object.keys(wer).length == 0) {
          throw 'Brak obiektu ticketu!';
        }
        if (!wer.item) {
          throw 'Brak itemu w tickecie!';
        }

        var item = e.player.world.createItemFromNbt(
          e.API.stringToNbt(wer.item)
        );
        var max = item.getMaxStackSize();
        if (ile > max) {
          throw 'Maksymalna ilość itemu w stacku to: §e' + max;
        }

        var cena = wer.cena * ile;
        if (wer.sale) {
          cena -= (cena * parseInt(wer.sale)) / 100;
        }
        cena = Math.ceil(cena);

        if (requestPayment(e.player.getName(), cena) !== true) {
          throw 'Nie udało się pobrać kasy!';
        }

        item.setStackSize(ile);
        e.player.dropItem(item).setOwner(e.player.getName());

        var x =
          'Gracz **' +
          e.player.getName() +
          '** Kupił *' +
          ile +
          'x ' +
          item.getDisplayName().replace(/§./g, '') +
          '* za **' +
          cena +
          '** knutów, ticket (`' +
          wer.id +
          '`)';
        HTTP.post(passes.hooks.cennik, {
          tts: false,
          content: ang(x),
        });

        return e.player.message(
          '[§cCennik§f] §7Zakupiono: §b' + ile + '§7x ' + item.getDisplayName()
        );
      } catch (er) {
        return e.player.message('[§cCennik§f] §7Wystąpił błąd: §c' + er);
      }
      break;
    }
    case 236: {
      //usuń ticket
      try {
        var tempdata = e.player.getTempdata();
        var wer = tempdata.has('cennikWer')
          ? JSON.parse(tempdata.get('cennikWer'))
          : 0;
        var item = tempdata.has('cennikItem') ? tempdata.get('cennikItem') : 0;
        if (!wer || Object.keys(wer).length == 0) throw 'Brak id w cenniku!';
        var test = removeCennik(wer.id);
        if (test.error) throw test.error;

        if (wer.autor)
          e.API.executeCommand(
            e.player.world,
            'dcdpm ' +
              wer.autor +
              ' Twój ticket (`' +
              wer.id +
              '`) na **' +
              wer.nazwa +
              '** został usunięty!'
          );
        e.player.message('[§Cenink§f] §7Usunięto ticket o id: §e' + wer.id);

        var hook = {
          username: 'Cennik hook',
          avatar_url: 'https://i.imgur.com/vOmJQrd.png',
          content: '**' + e.player.getName() + '** Usunął ticket!',
          embeds: [
            {
              title: 'Autor: ' + wer.autor,
              url: 'https://forum.hapel.pl/u/' + wer.autor,
              color: 15258703,
              fields: [
                {
                  name: 'ID',
                  value: '' + wer.id,
                },
                {
                  name: 'Nazwa',
                  value:
                    wer.nazwa.length >= 1024
                      ? wer.nazwa.substring(0, 1000) + ' ...'
                      : wer.nazwa,
                },
                {
                  name: 'Opis',
                  value:
                    wer.opis.length >= 1024
                      ? wer.opis.substring(0, 1000) + ' ...'
                      : wer.opis,
                },
                {
                  name: 'Tagi',
                  value:
                    wer.tagi.length >= 1024
                      ? wer.tagi.substring(0, 1000) + ' ...'
                      : wer.tagi,
                },
              ],
            },
          ],
        };

        hook = JSON.parse(ang(JSON.stringify(hook)));
        HTTP.post(passes.hooks.cennik, hook);

        return gui14(e);
      } catch (er) {
        return e.player.message('[§cDebbuger§f] §7Error: §c' + er);
      }
    }
    case 235: {
      // zapisz cennik
      try {
        var tempdata = e.player.getTempdata();
        var wer = tempdata.has('cennikWer')
          ? JSON.parse(tempdata.get('cennikWer'))
          : 0;
        var item = tempdata.has('cennikItem') ? tempdata.get('cennikItem') : 0;
        var sure = tempdata.has('cennikOK') ? 1 : 0;
        if (!wer || Object.keys(wer).length == 0) throw 'Brak id w cenniku!';
        if (!item) {
          if (!sure) {
            tempdata.put('cennikOK', true);
            return e.player.message(
              '[§cCennik§f] §7Nie dodano itemu, kliknij ponownie aby zaakceptować.'
            );
          }
        }
        var nazwa = e.gui.getComponent(11).getText();
        var opis = e.gui.getComponent(13).getText();
        var tagi = e.gui.getComponent(15).getText();
        var dostępny = e.gui.getComponent(17).getText();
        var cena = e.gui.getComponent(19).getText();
        var sale = e.gui.getComponent(21).getText();
        var monly = e.gui.getComponent(23).getText();
        var msale = e.gui.getComponent(25).getText();

        var obj = {
          nazwa: escapeString(nazwa),
          opis: escapeString(opis),
          cena: cena,
          wer: 1,
          dostępne: dostępny,
        };
        if (item) {
          obj.item = item;
        }
        if (sale && parseInt(sale) > 0) {
          obj.sale = parseInt(sale);
        }
        if (tagi && tagi.length > 0) {
          obj.tagi = escapeString(tagi);
        }
        if (monly == true || monly == false) {
          obj.monly = monly;
        }
        if (msale && parseInt(msale) > 0) {
          obj.msale = parseInt(msale);
        }

        var test = updateCennik(wer.id, obj);
        if (test.error) throw test.error;

        var hook = {
          username: 'Cennik hook',
          avatar_url: 'https://i.imgur.com/vOmJQrd.png',
          content: '',
          embeds: [
            {
              title: 'Autor: ' + wer.autor,
              url: 'https://forum.hapel.pl/u/' + wer.autor,
              color: 15258703,
              fields: [
                {
                  name: 'ID',
                  value: '' + wer.id,
                  inline: true,
                },
                {
                  name: 'Dostępne',
                  value: obj.dostępne == true ? 'Tak' : 'Nie',
                  inline: true,
                },
                {
                  name: 'Tylko sprzedawcy',
                  value: monly == true ? 'Tak' : 'Nie',
                  inline: true,
                },
                {
                  name: 'Nazwa',
                  value:
                    obj.nazwa.length >= 1024
                      ? obj.nazwa.substring(0, 1000) + ' ...'
                      : obj.nazwa,
                },
                {
                  name: 'Opis',
                  value:
                    obj.opis.length >= 1024
                      ? obj.opis.substring(0, 1000) + ' ...'
                      : obj.opis,
                },
                {
                  name: 'Tagi',
                  value:
                    tagi.length >= 1024
                      ? tagi.substring(0, 1000) + ' ...'
                      : tagi,
                },
                {
                  name: 'Cena',
                  value: obj.cena + ' knutów',
                  inline: true,
                },
                {
                  name: 'Przecena',
                  value: sale ? sale + '%' : 'Brak',
                  inline: true,
                },
                {
                  name: 'Przecena Sprzedawcy',
                  value: msale ? msale + '%' : 'Brak',
                  inline: true,
                },
              ],
              footer: {
                text: 'Weryfikowano przez: ' + e.player.getName() + '!',
                icon_url: 'https://i.imgur.com/vkxI2M7.png',
              },
            },
          ],
        };

        var x = JSON.parse(ang(JSON.stringify(hook)));
        HTTP.post(passes.hooks.cennik, x);

        e.player.message(
          '[§Cennik§f] §7Wyceniono ticket o id §e' + wer.id + '§7!'
        );
        return gui14(e, 'Edytowanie');
      } catch (er) {
        return e.player.message('[§cDebbuger§f] §7Error: ' + er);
      }

      return gui14(e, 'Edytowanie');
    }
    case 237: {
      // wyślij ticket
      var n = e.gui.getComponent(11);
      var o = e.gui.getComponent(13);
      var t = e.gui.getComponent(15);
      var d = e.gui.getComponent(17);

      if (!n || !o || !t || !d) {
        return e.player.message('[§cDebugger§f] §7Nie znaleziono textów!');
      }
      n = n.getText();
      o = o.getText();
      t = t.getText();
      d = d.getText();
      if (n.length >= 120) {
        return e.player.message('[§cCennik§f] §7Nazwa za długa: §e' + n.length);
      }
      if (o.length >= 4096) {
        return e.player.message('[§cCennik§f] §7Opis za długi: §e' + n.length);
      }
      if (n.length >= 512) {
        return e.player.message('[§cCennik§f] §7Tagi za długie: §e' + n.length);
      }
      n = escapeString(n);
      o = escapeString(o);
      t = escapeString(t);
      if (['0', '1', 0, 1].indexOf(d) == -1) {
        return e.player.message(
          '[§cCennik§f] §7Zła wartość dostępności: §e0 / 1'
        );
      }

      var test = addCennik({
        nazwa: n,
        opis: o,
        tagi: t,
        autor: e.player.getName(),
        dostępne: d,
      });
      if (test.error) {
        return e.player.message('[§cDebugger§f] §7Error1: §e' + test.error);
      }
      test = getCennik({
        nazwa: n,
        tagi: t,
        autor: e.player.getName(),
        dostępne: d,
      });
      if (test.error) {
        return e.player.message('[§cDebugger§f] §7Error2: §e' + test.error);
      }
      test = test.result[0];

      var hook = {
        username: 'Cennik hook',
        avatar_url: 'https://i.imgur.com/vOmJQrd.png',
        content: '**' + e.player.getName() + '** Wysłał ticket!',
        embeds: [
          {
            title: 'Autor: ' + e.player.getName(),
            url: 'https://forum.hapel.pl/u/' + e.player.getName(),
            color: 15258703,
            fields: [
              {
                name: 'ID',
                value: '' + test.id,
                inline: true,
              },
              {
                name: 'Dostępne',
                value: d == true ? 'Tak' : 'Nie',
                inline: true,
              },
              {
                name: 'Nazwa',
                value: n.length >= 1024 ? n.substring(0, 1000) + ' ...' : n,
              },
              {
                name: 'Opis',
                value: o.length >= 1024 ? o.substring(0, 1000) + ' ...' : o,
              },
              {
                name: 'Tagi',
                value: t.length >= 1024 ? t.substring(0, 1000) + ' ...' : t,
              },
            ],
          },
        ],
      };

      var x = JSON.parse(ang(JSON.stringify(hook))); //ang( "Gracz **"+e.player.getName()+"** Wysłał ticket:\n\`\`\`Nazwa: "+n+"\nOpis: "+o+"\nTagi: "+t+"\nOgólnodostępne: "+ d + "\`\`\`" );
      HTTP.post(passes.hooks.cennik, x);

      e.player.message('[§cCennik§f] §7Wysłano ticket: §e' + n);
      return gui15(e);
    }
    case 255: {
      //szukaj składnika
      var text = e.gui.getComponent(7).getText();
      var b = e.gui.getComponent(9).getText().split('z:§c ')[1];
      return gui6(e, b, text);
    }
    case 256: {
      var lab = e.gui.getComponent(9).getText();
      var x = false;
      var y = false;
      if (lab.length >= 18) {
        x = true;
      }
      if (lab.indexOf('!!') > -1) {
        y = true;
      }
      var text = e.gui.getComponent(7).getText();
      return gui9(e, x, text, y);
    }
    case 261: {
      var _old = e.player.getStoreddata().get('e_skladnik');
      _old = JSON.parse(_old) || {};
      if (!_old.nazwa) {
        return e.player.message(
          '[§cAdmin§f] §7Zacznij od nowa! Nie znaleziono starych parametrów'
        );
      }
      var _new = {
        nazwa: e.gui.getComponent(11).getText(),
        typ: e.gui.getComponent(19).getText(),
        jednostka: e.gui.getComponent(17).getText(),
        cena: e.gui.getComponent(13).getText(),
        ilosc: e.gui.getComponent(15).getText(),
        dostępny: e.gui.getComponent(21).getText(),
      };
      if (
        !_new.nazwa ||
        !_new.typ ||
        !_new.jednostka ||
        !_new.cena ||
        !_new.ilosc
      ) {
        return e.player.message(
          '[§cAdmin§f] §7Nie znaleziono parametrów! Wszystkie pola muszą być zapełnione!'
        );
      }
      if (
        _new.nazwa.length <= 2 ||
        _new.typ.length <= 2 ||
        _new.jednostka.length < 1 ||
        isNaN(parseFloat(_new.cena)) ||
        _new.ilosc < 1
      ) {
        return e.player.message('[§cAdmin§f] §7Za małe wartości!');
      }
      if (
        ['Bazy wodne', 'Nieorganiczne', 'Zwierzęce', 'Roślinne'].indexOf(
          _new.typ
        ) == -1
      ) {
        return e.player.message('[§cAdmin§f] §7Wpisano nieodpowiedni typ!');
      }

      var test = updateSkladnik(_old.nazwa, _new);
      if (test.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + test.error);
      }

      e.player.message('[§cAdmin§f] §7Zrobiono update składnika:');
      e.player.message('§6Nazwa: §c' + _old.nazwa + ' §9: §a' + _new.nazwa);
      e.player.message('§6Typ: §c' + _old.typ + ' §9: §a' + _new.typ);
      e.player.message('§6Cena: §c' + _old.cena + ' §9: §a' + _new.cena);
      e.player.message('§6Ilość: §c' + _old.ilosc + ' §9: §a' + _new.ilosc);
      e.player.message(
        '§6Jednostka: §c' + _old.jednostka + ' §9: §a' + _new.jednostka
      );
      e.player.message(
        '§6Dostępność: §c' + _old.dostępny + ' §9: §a' + _new.dostępny
      );

      post(
        true,
        e.player.getName() +
          ' Zmienił składnik: \n```Nazwa: ' +
          _old.nazwa +
          ' -> ' +
          _new.nazwa +
          '\nTyp: ' +
          _old.typ +
          ' -> ' +
          _new.typ +
          '\nCena: ' +
          _old.cena +
          ' -> ' +
          _new.cena +
          '\nIlość: ' +
          _old.ilosc +
          ' -> ' +
          _new.ilosc +
          '\nJednostka: ' +
          _old.jednostka +
          ' -> ' +
          _new.jednostka +
          '\nDostępność: ' +
          (_old.dostępny == 1 ? 'tak' : 'nie') +
          ' -> ' +
          (_new.dostępny == 1 ? 'tak' : 'nie') +
          '```'
      );

      e.player.getStoreddata().remove('e_skladnik');
      return gui2(e, false);
    }
    case 262: {
      var _new = {
        nazwa: e.gui.getComponent(11).getText(),
        typ: e.gui.getComponent(19).getText(),
        jednostka: e.gui.getComponent(17).getText(),
        cena: e.gui.getComponent(13).getText(),
        ilosc: e.gui.getComponent(15).getText(),
        dostępny: e.gui.getComponent(21).getText(),
      };
      if (
        !_new.nazwa ||
        !_new.typ ||
        !_new.jednostka ||
        !_new.cena ||
        !_new.ilosc
      ) {
        return e.player.message(
          '[§cAdmin§f] §7Nie znaleziono parametrów! Wszystkie pola muszą być zapełnione!'
        );
      }
      if (
        _new.nazwa.length <= 2 ||
        _new.typ.length <= 2 ||
        _new.jednostka.length < 1 ||
        isNaN(parseFloat(_new.cena)) ||
        _new.ilosc < 1
      ) {
        return e.player.message('[§cAdmin§f] §7Za małe wartości!');
      }
      if (
        ['Bazy wodne', 'Nieorganiczne', 'Zwierzęce', 'Roślinne'].indexOf(
          _new.typ
        ) == -1
      ) {
        return e.player.message('[§cAdmin§f] §7Wpisano nieodpowiedni typ!');
      }

      var test = addSkladnik(
        _new.nazwa,
        _new.typ,
        _new.cena,
        _new.ilosc,
        _new.jednostka,
        _new.dostępny
      );
      if (test.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + test.error);
      }

      e.player.message('[§cAdmin§f] §7Dodano nowy składnik:');
      e.player.message('§6Nazwa: §a' + _new.nazwa);
      e.player.message('§6Typ: §a' + _new.typ);
      e.player.message('§6Cena: §a' + _new.cena);
      e.player.message('§6Ilość: §a' + _new.ilosc);
      e.player.message('§6Jednostka: §a' + _new.jednostka);
      e.player.message('§6Dostępność: §a' + _new.dostępny);

      post(
        true,
        e.player.getName() +
          ' Dodał składnik: \n```Nazwa: ' +
          _new.nazwa +
          '\nTyp: ' +
          _new.typ +
          '\nCena: ' +
          _new.cena +
          '\nIlość: ' +
          _new.ilosc +
          '\nJednostka: ' +
          _new.jednostka +
          '\nDostępność: ' +
          (_new.dostępny == 1 ? 'tak' : 'nie') +
          '```'
      );

      return gui2(e, false);
    }
    case 264:
    case 263: {
      //zapisz eliksir nowy
      var _new = {
        nazwa: e.gui.getComponent(11).getText(),
        kolor: e.gui.getComponent(19).getText() || 'brak',
        hex: e.gui.getComponent(13).getText() || '35c2de',
        zapach: e.gui.getComponent(15).getText() || 'brak',
        smak: e.gui.getComponent(17).getText() || 'brak',
        czas: e.gui.getComponent(21).getText() || '60',
        data: e.gui.getComponent(23).getText() || 14,
        inokreacja: e.gui.getComponent(25).getText(),
        pcena: e.gui.getComponent(31).getText(),
      };

      if (
        !_new.nazwa ||
        !_new.kolor ||
        !_new.zapach ||
        !_new.smak ||
        !_new.czas ||
        !_new.data ||
        !_new.inokreacja
      ) {
        return e.player.message('[§cAdmin§f] §7Nie uzupełniono czegoś!');
      }
      if (_new.hex.indexOf('#') > -1) {
        return e.player.message('[§cAdmin§f] §7Hex Kolor posiada symbol #');
      }

      if (e.buttonId == 263) {
        var old = e.player.getTempdata().get('e_eliksir');
        if (!old) {
          return e.player.message('[§cAdmin§f] §7Wybierz eliksir ponownie!');
        }
        old = JSON.parse(old);

        var test = updateEliksir(old.nazwa, _new);
        if (test.error) {
          return e.player.message('[§cDebugger§f] §7Error: ' + test.error);
        }

        e.player.message('[§cAdmin§f] §7Edytowano Eliksir:');
        e.player.message('§6Nazwa: §c' + old.nazwa + '§7 | §a' + _new.nazwa);
        e.player.message('§6Kolor: §c' + old.kolor + '§7 | §a' + _new.kolor);
        e.player.message('§6Hex: §c' + old.hex + '§7 | §a' + _new.hex);
        e.player.message('§6Zapach: §c' + old.zapach + '§7 | §a' + _new.zapach);
        e.player.message('§6Smak: §c' + old.smak + '§7 | §a' + _new.smak);
        e.player.message('§6Czas: §c' + old.czas + '§7 | §a' + _new.czas);
        e.player.message('§6Data: §c' + old.data + '§7 | §a' + _new.data);
        e.player.message(
          '§6Inokreacja: §c' + old.inokreacja + '§7 | §a' + _new.inokreacja
        );
        e.player.message('§6P.cena: §c' + old.pcena + '§7 | §a' + _new.pcena);

        post(
          true,
          e.player.getName() +
            ' Zmienił eliksir: \n```Nazwa: ' +
            old.nazwa +
            ' -> ' +
            _new.nazwa +
            '\nKolor: ' +
            old.kolor +
            ' -> ' +
            _new.kolor +
            '\nHex: ' +
            old.hex +
            ' -> ' +
            _new.hex +
            '\nZapach: ' +
            old.zapach +
            ' -> ' +
            _new.zapach +
            '\nSmak: ' +
            old.smak +
            ' -> ' +
            _new.smak +
            '\nCzas: ' +
            old.czas +
            ' -> ' +
            _new.czas +
            '\nData: ' +
            old.data +
            ' -> ' +
            _new.data +
            '\nInokreacja: ' +
            old.inokreacja +
            ' -> ' +
            _new.inokreacja +
            '\nP.cena: ' +
            old.pcena +
            ' -> ' +
            _new.pcena +
            '```'
        );

        e.player.getTempdata().remove('e_eliksir');
        return gui2(e, false);
      }

      var exists = getEliksir({
        nazwa: _new.nazwa,
      });
      if (exists.result > 0) {
        return e.player.message(
          '[§cAdmin§f] §7Istnieje eliksir o takiej/podobnej nazwie: ' +
            exists.result[0].nazwa
        );
      }
      var test = addEliksir(
        _new.nazwa,
        _new.kolor,
        _new.hex,
        _new.zapach,
        _new.smak,
        _new.data,
        _new.czas,
        _new.inokreacja,
        _new.pcena
      );
      if (test.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + test.error);
      }

      e.player.message('[§cAdmin§f] §7Dodano nowy Eliksir:');
      e.player.message('§6Nazwa: §a' + _new.nazwa);
      e.player.message('§6Kolor: §a' + _new.kolor);
      e.player.message('§6Hex: §a' + _new.hex);
      e.player.message('§6Zapach: §a' + _new.zapach);
      e.player.message('§6Smak: §a' + _new.smak);
      e.player.message('§6Czas: §a' + _new.czas);
      e.player.message('§6Data: §a' + _new.data);
      e.player.message('§6Inokreacja: §a' + _new.inokreacja);
      e.player.message('§6P.cena: §a' + _new.pcena);

      post(
        true,
        e.player.getName() +
          ' Dodał eliksir: \n```Nazwa: ' +
          _new.nazwa +
          '\nKolor: ' +
          _new.kolor +
          '\nHex: ' +
          _new.hex +
          '\nZapach: ' +
          _new.zapach +
          '\nSmak: ' +
          _new.smak +
          '\nCzas: ' +
          _new.czas +
          '\nData: ' +
          _new.data +
          '\nInokreacja: ' +
          _new.inokreacja +
          '\nP.cena: ' +
          _new.pcena +
          '```'
      );

      return gui2(e, false);
    }
    case 265: {
      //usuń składnik
      var _old = e.player.getStoreddata().get('e_skladnik');
      if (!_old) {
        return e.player.message(
          '[§cAdmin§f] §7Nie znaleziono składnika, wejdź jeszcze raz!'
        );
      }
      _old = JSON.parse(_old);

      var test = getSkladnik({
        nazwa: _old.nazwa,
      });
      if (test.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + test.error);
      } else if (!test.result[0].nazwa || test.result[0].nazwa != _old.nazwa) {
        return e.player.message(
          '[§cAdmin§f] §7Nie ma składnika, lub znaleziono jedynie podobny.'
        );
      }
      var deleted = removeSkladnik(_old.nazwa);
      if (deleted.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + deleted.error);
      }

      e.player.message('[§cAdmin§f] §7Usunięto składnik: §c' + _old.nazwa);
      e.player.getStoreddata().remove('e_skladnik');
      post(true, e.player.getName() + ' Usunął składnik: ' + _old.nazwa);
      return gui2(e, false);
    }
    case 266: {
      //usuń Eliksir
      var _old = e.player.getTempdata().get('e_eliksir');
      if (!_old) {
        return e.player.message(
          '[§cAdmin§f] §7Nie znaleziono Eliksiru, wejdź jeszcze raz!'
        );
      }
      _old = JSON.parse(_old);

      var test = getEliksir({
        nazwa: _old.nazwa,
      });
      if (test.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + test.error);
      }
      if (test.result.length == 0) {
        return e.player.message(
          '[§cAdmin§f] §7Nie ma takiego eliksiru w bazie!'
        );
      }
      var deleted = removeEliksir(_old.nazwa);
      if (deleted.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + deleted.error);
      }

      e.player.message('[§cAdmin§f] §7Usunięto eliksir: §c' + _old.nazwa);
      e.player.getTempdata().remove('e_eliksir');
      post(true, e.player.getName() + ' Usunął Eliksir: ' + _old.nazwa);
      return gui2(e, false);
    }
    case 301:
    case 302:
    case 303:
    case 304: {
      /*wybierz kategorię składnika */
      var text = e.gui.getComponent(e.buttonId).getLabel().split('§7')[1];
      gui6(e, text);
      break;
    }
    case 420: {
      /* przywróc plecak */
      return gui10(e, 'day');
    }
    case 424: {
      var x = e.gui.getComponent(423).getText();
      return gui10(e, 'day', x);
    }
    case 600:
    case 601:
    case 602: {
      var link = e.gui.getComponent(e.buttonId + 104).getText();
      var path = e.gui.getComponent(2).getText();

      var name1 = e.gui.getComponent(e.buttonId + 103).getText();
      var link1 = name1 || link.split('/').pop();
      e.player.message(
        'Pobieranie: ' + link1 + ' czekaj na wiadomość zwrotną. Brak = błąd.'
      );
      if (link1.indexOf('.') == -1) {
        return e.player.message(
          '[§cDebugger§f] §7Nie znaleziono formatu pliku'
        );
      }

      try {
        JavaDownloadFileFromURL(link, path, e.player, link1);
      } catch (er) {
        return e.player.message('[§4Debugger§f] §cError: ' + er);
      }

      var x = ang(
        '**' +
          e.player.getName() +
          '** Pobrał plik na serwer (`Hapel`): \n<' +
          link +
          '>\n`' +
          (path + link1) +
          '`'
      );
      var url = passes.hooks.dev;
      HTTP.post(url, {
        content: x,
        tts: false,
      });

      var opt = e.gui.getComponent(1).getText();
      return gui13(e, opt);
    }
    case 609: {
      /* Listuj pliki  */
      var skript = e.gui.getComponent(1).getText();
      if (!skript) return e.player.message('[§cDebugger§f] §7Brak opcji!');

      return gui13(e, skript, 'list');
    }
    case 620:
    case 621:
    case 622: {
      //usuń plik
      var x = e.gui.getComponent(10).getText();
      if (!x) {
        return e.player.message('[§cDebugger§f] §7Nie Znaleziono ścieżki!');
      }
      try {
        var f = new java.io.File(x);
        if (!f || !f.exists() || !f.isFile()) {
          return e.player.message('[§cDebugger§f] §7Nie znaleziono pliku!');
        }
        f.renameTo(new java.io.File(path));

        var y = ang(
          '**' + e.player.getName() + '** Usunął plik (`Hapel`):\n`' + x + '`'
        );
        var url = passes.hooks.dev;
        HTTP.post(url, {
          content: y,
          tts: false,
        });
      } catch (er) {
        return e.player.message('[§cDebugger§f] §7' + er);
      }
      e.player.message('[§cAdmin§f] §7Usunięto plik §c' + x);

      var opt = e.gui.getComponent(1).getText();
      return gui13(e, opt);
    }
    case 610:
    case 611:
    case 612: {
      //zmień nazwę pliku
      var x = e.gui.getComponent(10).getText();
      var path = x.split('/');
      var oldn = path.pop();
      var newn = e.gui.getComponent(e.buttonId + 95).getText();
      if (!newn) {
        return e.player.message('[§cDebugger§f] §7Nie podano nazwy!');
      }
      try {
        var f = new java.io.File(x);
        if (!f || !f.exists() || !f.isFile()) {
          return e.player.message('[§cDebugger§f] §7Nie znaleziono pliku!');
        }
        path.push(newn);
        path = path.join('/');
        f.renameTo(new java.io.File(path));

        var x = ang(
          '**' +
            e.player.getName() +
            '** zmienił nazwę pliku (`Hapel`):\n`' +
            path +
            '`\n`' +
            oldn +
            '` -> `' +
            newn +
            '`'
        );
        var url = passes.hooks.dev;
        HTTP.post(url, {
          content: x,
          tts: false,
        });
      } catch (er) {
        return e.player.message('[§cDebugger§f] §7' + er);
      }
      e.player.message(
        '[§cAdmin§f] §7Zmieniono nazwę pliku: §c' + oldn + ' §7-> §a' + newn
      );

      var opt = e.gui.getComponent(1).getText();
      return gui13(e, opt);
    }

    case 724: {
      /* Dodaj nadgrupę */
      var wdata = e.player.world.getStoreddata();
      var tempdata = e.player.world.getTempdata();
      var globals = wdata.get('grupy');
      globals = JSON.parse(globals) || {};

      if (Object.keys(globals).length == 0) {
      }

      tempdata.put('globalG', JSON.stringify(Object.keys(globals)));

      return gui16(e, true, 'group');
    }
    case 725: {
      /* Dodaj ścieżkę */
      var wdata = e.player.world.getStoreddata();
      var tempdata = e.player.world.getTempdata();
      var globals = wdata.get('sciezki');
      globals = JSON.parse(globals) || [];

      tempdata.put('globalP', JSON.stringify(globals));

      return gui16(e, true, 'path');
    }

    case 701: {
      /* Gracz tw role */
      return gui16(e, true, 'create');
    }
    case 903: {
      /* Role manadżer */
      return gui16(e, true);
    }
    case 913: {
      /* Nowy skladnik */
      return gui7(e, true);
    }
    case 914: {
      /* Edit skladnik */
      return gui6(e);
    }
    case 915: {
      /* Nowy eliksir  */
      return gui8(e, true);
    }
    case 916: {
      /* Edit eliksir  */
      return gui9(e);
    }
    case 918: {
      /* Weź Eliksir   */
      return gui9(e, true);
    }
    case 919: {
      /* Weź Kupon     */
      return gui9(e, true, '', true);
    }
    case 991: {
      /* powrót */
      gui1(e);
      break;
    }
    case 992: {
      /* powrót */
      gui1(e, true);
      break;
    }
    case 993: {
      /* powrót */
      gui11(e);
      break;
    }
  }
}

function customGuiScroll(e) {
  switch (e.scrollId) {
    case 1:
    case 2:
    case 951:
    case 952: {
      if (!e.doubleClick) {
        return;
      }
      var id = e.selection[0].split('(')[1].replace(')', '').replace(/§./g, '');
      if (!id) {
        return e.player.message('Nie ma id');
      }

      var current = getOczekujace({
        id: id,
      });
      if (current.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + current.error);
      }
      current = current.result[0];
      var x = e.scrollId % 10 == 1 ? 'oczekujace' : 'zweryfikowane';

      current.przepis = JSON.parse(current.przepis);

      e.scrollId > 950
        ? gui4(e, current, id, x, true)
        : gui4(e, current, id, x);
      break;
    }
    case 3: {
      var sel = e.selection[0];
      sel = sel.split(' / ');

      var wdata = e.player.world.getStoreddata();
      var karty = wdata.get('karty');
      karty = JSON.parse(karty) || {};
      if (Object.keys(karty).length == 0) {
        e.player.message('[§cAdmin§f] §7Nie można było załadować kart!');
        return gui12(e);
      }

      var current = karty[sel[0]][sel[1]];
      e.player
        .getTempdata()
        .put(
          'edit',
          JSON.stringify([current.name, current.numer, current.opis])
        );
      e.player.getTempdata().put('remove', JSON.stringify(sel));

      return gui12(e, false, 'remove');
    }
    case 4: {
      var sel = e.selection[0];
      sel = sel.split(' / ');

      var wdata = e.player.world.getStoreddata();
      var karty = wdata.get('karty');
      karty = JSON.parse(karty) || {};
      if (Object.keys(karty).length == 0) {
        e.player.message('[§cAdmin§f] §7Nie można było załadować kart!');
        return gui12(e);
      }

      var current = karty[sel[0]][sel[1]];

      var item = e.player.world.createItem(
        'hapeladdons:kartaczarodziei_' + sel[0],
        0,
        1
      );
      item.setCustomName(
        '§cKarta Czarodziejów §b' + karty[sel[0]][sel[1]].name
      );
      var lore = [
        '§aRzadkość: §d' + sel[0],
        '§aNumer: §f' + karty[sel[0]][sel[1]].numer,
      ];
      for (var i = 0; i < karty[sel[0]][sel[1]].opis.length; i++) {
        lore.push(karty[sel[0]][sel[1]].opis[i]);
      }
      item.setLore(lore);
      var nbt = item.getNbt();
      nbt.setInteger('id', karty[sel[0]][sel[1]].numer);
      nbt.setString('rarity', sel[0]);
      var drop = e.player.dropItem(item);
      drop.setOwner(e.player.getName());

      return gui12(e);
    }
    case 5: {
      var sel = e.selection[0];
      sel = sel.split(' / ');

      var wdata = e.player.world.getStoreddata();
      var karty = wdata.get('karty');
      karty = JSON.parse(karty) || {};
      if (Object.keys(karty).length == 0) {
        e.player.message('[§cAdmin§f] §7Nie można było załadować kart!');
        return gui12(e);
      }

      var current = karty[sel[0]][sel[1]];

      e.player.getTempdata().put(
        'edit',
        JSON.stringify({
          typ: sel[0],
          nazwa: current.name,
          opis: current.opis.join('//'),
        })
      );
      e.player.getTempdata().put('edit_i', JSON.stringify(sel));

      return gui12(e, false, 'edit');
    }
    case 11: {
      if (!e.doubleClick) {
        return;
      }
      var id = e.gui.getComponent(39);
      var hover = id.getHoverText()[0];

      id.setHoverText([hover, e.selection[0]]);
      e.gui.update(e.player);
      return;
    }
    case 21: {
      var id = e.gui.getComponent(9).getText().split(' ')[1];
      var sel = e.selection[0];
      var eliksiry = e.player.world.getStoreddata().get('Eliksiry');
      eliksiry = JSON.parse(eliksiry);
      e.player.getTempdata().put('current', JSON.stringify(eliksiry[sel]));
      gui5(e, id, eliksiry[sel]);
      break;
    }
    case 91: {
      if (!e.doubleClick) {
        return;
      }
      var skladnik = e.selection[0];
      var skladniki = getSkladnik({
        nazwa: skladnik,
      });

      if (skladniki.result && !skladniki.error) {
        e.player
          .getStoreddata()
          .put('e_skladnik', JSON.stringify(skladniki.result[0]));

        return gui7(e, false, skladniki.result[0]);
      } else {
        return e.player.message('[§cAdmin§f] §7Error! ' + skladniki.error);
      }
    }
    case 92: {
      //Wybrany elek edytowanie
      if (!e.doubleClick) {
        return;
      }
      var n = e.selection[0];

      var eliksir = getEliksir({
        nazwa: n,
      });
      if (eliksir.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + eliksir.error);
      }
      if (eliksir.result.length == 0) {
        return e.player.message(
          '[§cDebugger§f] §7Error: Nie znaleziono eliksiru w bazie!'
        );
      } else if (eliksir.result.length > 1) {
        e.player.message(
          '[§cAdmin§f] §7Uwaga! Znaleziono więcej niż 1 eliksir, wybrany został 1: ' +
            eliksir.result[0].nazwa
        );
      }

      e.player
        .getTempdata()
        .put('e_eliksir', JSON.stringify(eliksir.result[0]));

      return gui8(e, false, eliksir.result[0]);
    }
    case 93:
    case 94: {
      //Weź eliksir, kupon
      if (!e.doubleClick) {
        return;
      }
      var n = e.selection[0];

      var current = getEliksir({
        nazwa: n,
      });
      if (current.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + current.error);
      }
      if (current.result.length == 0) {
        return e.player.message(
          '[§cDebugger§f] §7Error: Nie znaleziono eliksiru w bazie!'
        );
      }
      current = current.result[0];

      if (e.scrollId == 93) {
        var data = new Date(Date.now() + current.data * 86400000);
        var y = data.getTime();
        y = y.toString(16).split('').reverse().join('');
        var lore = [
          '§5Kolor: §a' + current.kolor,
          '§5Zapach: §a' + current.zapach,
          '§5Smak: §a' + current.smak,
          '',
          '§cData ważności:§7 ' + y,
        ];

        var item = e.player.world.createItem('minecraft:potion', 0, 1);
        item.setCustomName('§eTajemniczy Eliksir');
        item.setLore(lore);
        var nbt = item.getNbt();
        nbt.setString('Eliksir', current.nazwa);
        nbt.setString('Czas', current.czas);
        nbt.setString('Inokreacja', current.inokreacja);
        nbt.setLong('Data', data.getTime());
        nbt.setLong('CustomPotionColor', parseInt(current.hex, 16) || 3093151);
        nbt.setInteger('HideFlags', 37);
        e.player.dropItem(item).setOwner(e.player.getName());
      } else if (e.scrollId == 94) {
        var item = e.player.world.createItem('variedcommodities:letter', 0, 1);
        item.setCustomName('§cKupon na eliksir: §a' + n);
        item.setLore([
          '§7**Przepustka pozwala odebrać gotowy eliksir',
          '§7Bez potrzeby płacenia za składniki**',
        ]);

        var nbt = item.getNbt();
        nbt.setString('createdBy', e.player.getName());
        e.player.dropItem(item).setOwner(e.player.getName());
      }

      return gui2(e, false);
    }
    case 232:
    case 235:
    case 236: {
      // weryfikacja cennika
      if (!e.doubleClick) {
        return;
      }
      var id = e.selection[0].split('.')[0];

      var cennik = getCennik({
        id: id,
      });
      if (cennik.error) {
        return e.player.message('[§cDebugger§f] §7Error: ' + cennik.error);
      }
      cennik = cennik.result[0];

      var tempdata = e.player.getTempdata();
      tempdata.put('cennikWer', JSON.stringify(cennik));
      if (e.scrollId == 236) return gui15(e, 'Lista ticketów', cennik);

      return e.scrollId == 232
        ? gui14(e, 'Weryfikacja', cennik)
        : gui14(e, 'Edytowanie', cennik);
    }
    case 422: {
      if (!e.doubleClick) return;
      var id = e.selection[0]
        .split('§a')[0]
        .replace(/\s/g, '')
        .replace(/§./g, '');
      var data = e.selection[0].split('§d')[1].replace(/§../g, '');
      var dzien = e.selection[0].split('|')[1].replace(/§./g, '');

      var test = restoreBag(id, data);
      if (test.error)
        return e.player.message('[§cDebugger§f] §7Error: ' + test.error);

      post(
        true,
        e.player.getName() +
          ' Przywrócił plecak: **' +
          id +
          '** z dnia *' +
          dzien +
          '*'
      );

      e.player.message('[§cPlecaki§f] §7Przywrócono kopię plecaka!');
      return gui10(e, 'person', false);
    }
    case 600:
    case 601:
    case 602: {
      if (!e.doubleClick) return;
      var plik = e.selection[0];
      var path = e.gui.getComponent(2).getText();
      var skript = e.gui.getComponent(1).getText();

      if (plik && path) {
        return gui13(e, skript, false, path + plik);
      } else {
        return e.player.message('[§cDebugger§f] §7Coś poszło nie tak!');
      }
    }
  }
}

function customGuiSlot(e) {
  if (e.slotId == 0) {
    var item = e.stack;
    if (!item || item.getName().toLowerCase().indexOf('air') > -1) {
      return e.player.message('[§cDebugger§f] §7Error: brak itemu!');
    }
    var nbt = item.getItemNbt();

    var tempdata = e.player.getTempdata();
    if (!tempdata.has('cennikWer')) {
      return e.player.message(
        '[§cDebugger§f] §7Spróbuj ponownie, nie widzę id weryfikowanego.'
      );
    }
    if (tempdata.has('cennikItem')) {
      e.player.message('[§cCennik§f] §7Nadpisuję item!');
    }

    var wer = JSON.parse(tempdata.get('cennikWer'));
    wer.item = escapeString(nbt.toJsonString());

    tempdata.put('cennikItem', wer.item);

    e.player.message('[§cCennik§f] §7Dodano Item! §e' + item.getDisplayName());
    return gui14(e, 'Weryfikacja', wer);
  }
}

function keyPressed(e) {
  if (e.isAltPressed == true && e.key == 33) {
    var pl = server.getPlayer(e.player.getName());

    if (pl.hasPermission('maxbans.ban')) {
      return gui1(e);
    } else {
      return e.player.message("[§cAdmin§f] §7Thou shan't use this command!");
    }
  }
  if (e.isAltPressed == true && e.key == 34) {
    return gui1(e, true);
  }
}

function copyLore(l) {
  var lr = [];
  for (var i = 0; i < l.length; i++) {
    lr.push(l[i]);
  }
  return lr;
}

function post(bool, txt) {
  var x = txt;
  x = ang(x);
  var url;
  if (bool) {
    url = passes.hooks.elkiLog;
  } else {
    url = passes.hooks.elki;
  }
  HTTP.post(url, {
    content: x,
    tts: false,
  });
}
