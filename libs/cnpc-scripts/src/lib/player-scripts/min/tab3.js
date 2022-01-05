var server = Java.type('org.bukkit.Bukkit').getServer();
function baseGui(e) {
  var a = e.API.createCustomGui(1, 256, 256, !1);
  return a.setBackgroundTexture('customnpcs:textures/gui/elki_e.png'), a;
}
function gui1(e, a) {
  var t = baseGui(e);
  return (
    a
      ? (t.addLabel(9, '§1Panel gracza', 110, 0, 80, 20),
        t.addTexturedButton(
          901,
          '§7Eliksiry',
          90,
          40,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          902,
          '§7Cennik',
          90,
          60,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          903,
          '§7Role',
          90,
          80,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ))
      : (t.addLabel(9, '§1Panel administratora', 100, 0, 80, 20),
        t.addTexturedButton(
          1,
          '§7Eliksiry',
          90,
          40,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          2,
          '§7Placaki',
          90,
          60,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          3,
          '§7Przedmioty',
          90,
          80,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        ('Przesladowca' != e.player.getName() &&
          'TheWookie' != e.player.getName() &&
          'em411' != e.player.getName()) ||
          t.addTexturedButton(
            4,
            '§7Pliki',
            90,
            100,
            80,
            15,
            'customnpcs:textures/gui/pp_button.png'
          ),
        t.addTexturedButton(
          5,
          '§7Karty',
          90,
          120,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          8,
          '§7Cennik',
          90,
          140,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          10,
          '§7Role',
          90,
          160,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        )),
    e.player.showCustomGui(t),
    t
  );
}
function gui2(e, a) {
  var t = baseGui(e);
  return (
    t.addLabel(9, '§1Panel Eliksirów', 110, 0, 80, 20),
    a
      ? (t.addTexturedButton(
          911,
          '§7oczekujace',
          90,
          40,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          912,
          '§7zweryfikowane',
          90,
          60,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          992,
          '§8Powrót',
          175,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ))
      : (t.addTexturedButton(
          101,
          '§7oczekujace',
          90,
          40,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          102,
          '§7zweryfikowane',
          90,
          60,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          913,
          '§aNowy Składnik',
          5,
          100,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          914,
          '§dEdytuj Składnik',
          5,
          120,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          915,
          '§aNowy Eliksir',
          90,
          100,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          916,
          '§dEdytuj Eliksir',
          90,
          120,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          918,
          '§5Weź Eliksir',
          175,
          100,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          919,
          '§5Weź Kupon',
          175,
          120,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        t.addTexturedButton(
          991,
          '§8Powrót',
          175,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        )),
    e.player.showCustomGui(t),
    t
  );
}
function gui3(e, a, t) {
  var r = baseGui(e);
  r.addLabel(9, '§1Eliksiry ' + a, 100, 0, 120, 20);
  var n = 'oczekujace' == a ? 3 : 1,
    i =
      1 == t
        ? getOczekujace({
            gracz: e.player.getName(),
            weryfikowane: n,
            odebrane: 0,
          })
        : getOczekujace({ weryfikowane: n, odebrane: 0 });
  if (i.error) return e.player.message('[§cDebugger§f] §7Error: ' + i.error);
  i = i.result;
  for (var s = [], o = 0; o < i.length; o++)
    s.push(
      '§' + (1 == i[o].odebrane ? 'c' : '6') + i[o].gracz + ' (' + i[o].id + ')'
    );
  var u = 'oczekujace' == a ? (t ? 951 : 1) : t ? 952 : 2;
  return (
    t
      ? r.addTexturedButton(
          992,
          '§8Powrót',
          175,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        )
      : r.addTexturedButton(
          991,
          '§8Powrót',
          175,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
    r.addScroll(u, 30, 15, 200, 210, s),
    e.player.showCustomGui(r),
    r
  );
}
function gui4(e, a, t, r, n) {
  var i = baseGui(e);
  if (
    (i.addLabel(9, '§1Eliksir§b ' + t, 100, 0, 80, 20),
    i.addLabel(19, '§eCena:§c§l ' + a.cena, 5, 0, 80, 20),
    i.addLabel(29, '§2Nazwa:§a ' + a.eliksir, 5, 15, 160, 20),
    i
      .addLabel(39, '§4[?]', 240, 20, 15, 15)
      .setHoverText(['§7Info o zaznaczonym wybrze: ']),
    i.addScroll(11, 10, 40, 240, 190, a.przepis),
    n)
  ) {
    if ('zweryfikowane' == r) {
      for (
        var s = e.player.getInventory().getItems(), o = !1, u = 0;
        u < s.length;
        u++
      )
        s[u] &&
          s[u].getDisplayName() &&
          a.eliksir &&
          ('§cPrzepustka do składziku' == s[u].getDisplayName() ||
            (s[u].getDisplayName().indexOf('Kupon na eliksir:') > -1 &&
              s[u].getDisplayName().indexOf(a.eliksir) > -1)) &&
          (o = !0);
      1 == a.odebrane
        ? i.addTexturedButton(
            107,
            '§cUsuń',
            5,
            235,
            80,
            15,
            'customnpcs:textures/gui/pp_button.png'
          )
        : i.addTexturedButton(
            109,
            '§aZapłać i Odbierz',
            5,
            235,
            80,
            15,
            'customnpcs:textures/gui/pp_button.png'
          ),
        1 == o &&
          i.addTexturedButton(
            110,
            '§cOdbierz i nie płać',
            90,
            235,
            80,
            15,
            'customnpcs:textures/gui/pp_button.png'
          );
    }
    i.addTexturedButton(
      992,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    );
  } else
    'oczekujace' == r
      ? (i.addTexturedButton(
          104,
          '§aAkceptuj',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        i.addTexturedButton(
          105,
          '§cOdrzuć',
          90,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        i.addTexturedButton(
          106,
          '§cUsuń',
          175,
          3,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ))
      : 'zweryfikowane' == r &&
        i.addTexturedButton(
          106,
          '§cUsuń',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
      i.addTexturedButton(
        991,
        '§8Powrót',
        175,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
  return e.player.showCustomGui(i), i;
}
function gui5(e, a, t) {
  var r = baseGui(e);
  if ((r.addLabel(9, '§1Eliksir§b ' + a, 100, 0, 80, 20), !t))
    return e.player.message('[§cAdmin§f] §7Brak eliksiru!!!');
  r.addLabel(29, '§2Konfiguruj opcje', 95, 15, 80, 20);
  var n = getOczekujace({ id: a });
  return (
    n.result[0] && (n = n.result[0]),
    r.addTextField(40, 60, 80, 40, 15).setText(n.pdata || t.data || '14'),
    r.addTexturedButton(
      30,
      '§7Zmień ważność',
      110,
      80,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    r.addTextField(60, 60, 100, 40, 15).setText(n.pile || t.ile || '4'),
    r.addTexturedButton(
      50,
      '§7Zmień Ilość',
      110,
      100,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    r.addTexturedButton(
      210,
      '§aZatwierdź',
      5,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    r.addTexturedButton(
      990,
      '§8Wróc do opisu',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(r),
    r
  );
}
function gui6(e, a, t) {
  var r = baseGui(e);
  if (a) {
    r.addLabel(9, '§1Wyszukaj składnik z:§c ' + a, 85, 0, 160, 20);
    var n = getSkladnik({ typ: a });
    if (n.error) return e.player.message('[§cDebugger§f] §7Error: ' + n.error);
    n = n.result;
    for (var i = [], s = 0; s < n.length; s++)
      t && n[s].nazwa.toLowerCase().indexOf(t.toLowerCase()) > -1
        ? i.push(n[s].nazwa)
        : t || i.push(n[s].nazwa);
    r.addTextField(7, 90, 235, 70, 15),
      r.addTexturedButton(
        255,
        '§bSzukaj po nazwie',
        5,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      ),
      i.sort(),
      r.addScroll(91, 10, 35, 240, 190, i);
  } else
    r.addLabel(9, '§1Wybierz typ', 110, 0, 80, 20),
      r.addTexturedButton(
        301,
        '§7Nieorganiczne',
        40,
        80,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      ),
      r.addTexturedButton(
        302,
        '§7Bazy wodne',
        130,
        80,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      ),
      r.addTexturedButton(
        303,
        '§7Roślinne',
        40,
        110,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      ),
      r.addTexturedButton(
        304,
        '§7Zwierzęce',
        130,
        110,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
  return (
    r.addTexturedButton(
      991,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(r),
    r
  );
}
function gui7(e, a, t) {
  var r = baseGui(e);
  r.addLabel(9, '§1Edytuj składnik', 110, 0, 80, 20),
    r
      .addLabel(10, '§cNazwa', 65, 40, 25, 20)
      .setHoverText([
        '§7Nazwa musi zmieścić się w §l32§r§7 znakach!',
        '§7Niedozwolone są znaki specjalne',
        '§7Można używać spacji',
      ]);
  var n = r.addTextField(11, 90, 40, 120, 20);
  r.addLabel(18, '§cTyp', 75, 70, 20, 20).setHoverText([
    '§7Kategoria składnika:',
    'Nieorganiczne',
    'Bazy wodne',
    'Roślinne',
    'Zwierzęce',
  ]);
  var i = r.addTextField(19, 90, 70, 120, 20);
  r.addLabel(12, '§cCena', 70, 100, 20, 20).setHoverText([
    '§7Cena liczona jest od liczby podanej poniżej.',
    '§7Automatycznie zostaje przeliczana na mniejsze i większe jednostki',
  ]);
  var s = r.addTextField(13, 90, 100, 120, 20);
  r.addLabel(14, '§cIlość', 67, 130, 20, 20).setHoverText([
    '§7Potrzebna jako podstawa do wyliczenia ceny',
    '§7Przykładowo 24knuty za 1000jednostek produktu',
  ]);
  var o = r.addTextField(15, 90, 130, 120, 20);
  r.addLabel(16, '§cJednostka', 47, 160, 40, 20).setHoverText([
    '§7Wartość estetyczna.',
    'Wpisz tutaj najmniejszą jednostkę np. Kg -> g, Litry -> ml, m^2 -> cm^2...',
  ]);
  var u = r.addTextField(17, 90, 160, 120, 20);
  r.addLabel(20, '§cDostępny', 50, 190, 40, 20).setHoverText([
    '§7Czy składnik ma być dostępny dla graczy?',
    '§a1 §7- tak',
    '§c0 §7- nie',
  ]);
  var p = r.addTextField(21, 90, 190, 20, 20);
  return (
    a
      ? r.addTexturedButton(
          262,
          '§bZapisz składnik!',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        )
      : (t &&
          (n.setText(t.nazwa),
          i.setText(t.typ),
          s.setText(t.cena),
          o.setText(t.ilosc),
          u.setText(t.jednostka),
          p.setText(t.dostępny)),
        r.addTexturedButton(
          261,
          '§aUpdate!',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        r.addTexturedButton(
          265,
          '§cUsuń!',
          90,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        )),
    r.addTexturedButton(
      991,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(r),
    r
  );
}
function gui8(e, a, t) {
  var r = baseGui(e);
  r.addLabel(9, '§1Edytuj Eliksir', 110, 0, 80, 20),
    r
      .addLabel(10, '§cNazwa', 20, 40, 25, 20)
      .setHoverText([
        '§7Nazwa Eliksiru!',
        '§7Niedozwolone są znaki specjalne',
        '§7Można używać spacji',
        '§7Aby dodać do nazwy kliknij §a+',
        '§7Aby resetować nazwę kliknij §cR',
      ]);
  var n = r.addTextField(11, 45, 40, 170, 20);
  r.addLabel(18, '§cKolor', 35, 70, 20, 20).setHoverText([
    '§7Kolor eliksiru:',
    '§7Kolor pisemnie np. §aPerłowy',
  ]);
  var i = r.addTextField(19, 55, 70, 65, 20);
  r.addLabel(12, '§cHex c.', 125, 70, 25, 20).setHoverText([
    '§7Kolor w zapisie HexaDecimal (szesnastkowym)',
    "§7Wpisz w google frazę 'hex color' przesuś suwakiem i skopiuj wynik",
    '§7Przykładowy kolor: §afafae7',
    '§4BEZ ZNAKU #',
  ]);
  var s = r.addTextField(13, 150, 70, 65, 20);
  r.addLabel(14, '§cZapach', 30, 100, 25, 20).setHoverText([
    '§7Jak pachnie eliksir?',
    '§7Wpisz zapach eliksiru np. §aKoszona trawa',
  ]);
  var o = r.addTextField(15, 55, 100, 65, 20);
  r.addLabel(16, '§cSmak', 130, 100, 25, 20).setHoverText([
    '§7Jak smakuje eliksir?',
    '§7Jeżeli posmakujemy kropelkę co poczujemy?',
    '§7Przykładowo: §asłodki §7/ §asłony §7/ §akarmelu',
  ]);
  var u = r.addTextField(17, 150, 100, 65, 20);
  r.addLabel(20, '§cCzas', 35, 130, 25, 20).setHoverText([
    '§7Jak długo trwa eliksir?',
    '§7Wpisz ilość minut trwania eliksiru np. §a60 §7/ §aTrwały §7/ §aAntidotum §7etc...',
  ]);
  var p = r.addTextField(21, 55, 130, 65, 20);
  r.addLabel(22, '§cData', 130, 130, 25, 20).setHoverText([
    '§7Jak długo jest ważny eliksir?',
    '§7Wpisz ilość dni ile będzie ważny eliksir zanim się nie zepsuje.',
  ]);
  var d = r.addTextField(23, 150, 130, 65, 20);
  r.addLabel(24, '§cInokreacja', 5, 160, 40, 20).setHoverText([
    '§7Wynik inokreacji',
    '§7Jak wygląda inokreacja?',
    '§7Kliknij Plus aby dodać do tekstu, R żeby restować',
  ]);
  var g = r.addTextField(25, 45, 160, 170, 20);
  r.addLabel(30, '§cP. cena', 10, 190, 35, 20).setHoverText([
    '§7Przewidywana cena',
    '§7Może być cena rynkowa',
    '§7Za ile mogą kupić / sprzedać / zrobić eliksir',
  ]);
  var c = r.addTextField(31, 45, 190, 20, 20);
  return (
    a
      ? r.addTexturedButton(
          264,
          '§bZapisz Eliksir!',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        )
      : (t &&
          (n.setText(t.nazwa),
          i.setText(t.kolor),
          s.setText(t.hex),
          o.setText(t.zapach),
          u.setText(t.smak),
          p.setText(t.czas),
          d.setText(t.data),
          g.setText(t.inokreacja),
          c.setText(t.pcena)),
        r.addTexturedButton(
          263,
          '§aUpdate!',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        r.addTexturedButton(
          266,
          '§cUsuń!',
          90,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        )),
    r.addTexturedButton(
      991,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(r),
    r
  );
}
function gui9(e, a, t, r) {
  var n = baseGui(e);
  a
    ? n.addLabel(9, '§1Wybierz Eliksir!' + (r ? '!' : ''), 110, 0, 80, 20)
    : n.addLabel(9, '§1Wybierz Eliksir', 110, 0, 80, 20);
  var i = getEliksir();
  if (i.error) return e.player.message('[§cDebugger§f] §7Error: ' + i.error);
  i = i.result;
  for (var s = [], o = 0; o < i.length; o++)
    t && i[o].nazwa.toLowerCase().indexOf(t.toLowerCase()) > -1
      ? s.push(i[o].nazwa)
      : t || s.push(i[o].nazwa);
  return (
    n.addTextField(7, 90, 235, 70, 15),
    n.addTexturedButton(
      256,
      '§bSzukaj po nazwie',
      5,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    a
      ? n.addScroll(r ? 94 : 93, 10, 35, 240, 190, s)
      : n.addScroll(92, 10, 35, 240, 190, s),
    n.addTexturedButton(
      991,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(n),
    n
  );
}
function gui10(e, a, t) {
  var r = baseGui(e);
  if (a) {
    r.addLabel(9, '§1Wybierz datę', 110, 0, 80, 20).setHoverText([
      '§7Format:',
      '§cID §a|§bData §a|§fgodzina §a|§d[timestamp]',
    ]);
    for (var n = getCopiedBagIds(), i = [], s = 0; s < n.length; s++) {
      var o = new Date(Number(n[s].data));
      t && JSON.stringify(n[s]).indexOf(t) > -1
        ? i.push(
            '§c' +
              n[s].id +
              ' §a| §b' +
              o.getDate() +
              '.' +
              (o.getMonth() + 1) +
              '.' +
              o.getFullYear() +
              ' §a|§f ' +
              o.getHours() +
              ':' +
              o.getMinutes() +
              ' [§d' +
              n[s].data +
              '§f]'
          )
        : t ||
          i.push(
            '§c' +
              n[s].id +
              ' §a| §b' +
              o.getDate() +
              '.' +
              (o.getMonth() + 1) +
              '.' +
              o.getFullYear() +
              ' §a|§f ' +
              o.getHours() +
              ':' +
              o.getMinutes() +
              ' [§d' +
              n[s].data +
              '§f]'
          );
    }
    i.sort(),
      r.addTextField(423, 90, 235, 70, 15),
      r.addTexturedButton(
        424,
        '§bSzukaj po nazwie',
        5,
        235,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      ),
      r.addScroll(422, 10, 35, 240, 190, i);
  } else
    r.addLabel(9, '§1Plecaki', 120, 0, 80, 20),
      r.addTexturedButton(
        420,
        '§7Przywróć plecak',
        90,
        40,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      ),
      r.addTexturedButton(
        421,
        '§7Zapisz kopie',
        90,
        80,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
  return (
    r.addTexturedButton(
      991,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(r),
    r
  );
}
function gui11(e) {
  var a = baseGui(e);
  return (
    a.addLabel(9, '§1File manager', 120, 0, 80, 20),
    a.addTexturedButton(
      6,
      '§7CNPC',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    a.addTexturedButton(
      7,
      '§7Skript',
      90,
      60,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    a.addTexturedButton(
      9,
      '§7MagicSpells',
      90,
      80,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    a.addTexturedButton(
      991,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(a),
    a
  );
}
function gui12(e, a, t) {
  var r = baseGui(e);
  if ((r.addLabel(9, '§1Menadżer kart', 105, 0, 80, 20), a || t))
    if (a || ('add' != t && 'edit' != t))
      if (a || 'remove' != t) {
        if (a) {
          var n = e.player.world.getStoreddata().get('karty');
          if (((n = JSON.parse(n) || {}), 0 == Object.keys(n).length))
            return (
              e.player.message('[§cAdmin§f] §7Nie można było załadować kart!'),
              gui12(e)
            );
          for (var i, s = [], o = Object.keys(n), u = 0; u < o.length; u++)
            for (var p = n[o[u]], d = 0; d < p.length; d++)
              s.push(o[u] + ' / ' + d + ' / ' + p[d].name);
          (i = 'get' == a ? 4 : 'edit' == a ? 5 : 3),
            r.addScroll(i, 10, 35, 240, 190, s);
        }
      } else {
        var g = r.addLabel(1, '§8Podgląd karty', 100, 70, 50, 15);
        y = e.player.getTempdata().get('edit');
        if (!((y = JSON.parse(y) || []).length > 0))
          return (
            e.player.message('[§cAdmin§f] §7Nie udało się załadować karty!'),
            gui12(e)
          );
        g.setHoverText(y),
          r.addTexturedButton(
            16,
            '§cUsuń kartę',
            90,
            100,
            80,
            15,
            'customnpcs:textures/gui/pp_button.png'
          );
      }
    else {
      r.addLabel(1, '§8Typ:', 45, 40, 15, 15).setHoverText([
        '§cUwaga!',
        '§7Do wyboru są jedynie:',
        'common (50%)',
        'uncommon (33,5%)',
        'rare (5%)',
        'legendary (1,5%)',
        'ancient (10%)',
      ]);
      var c = r.addTextField(11, 62, 40, 60, 15);
      r.addLabel(2, '§8Nazwa:', 35, 70, 35, 15).setHoverText([
        '§cCo to za czarodziej?',
        '§7Napisz imię i nazwisko czarodzieja!',
        '§7np. Harry Bodder',
      ]);
      var l = r.addTextField(12, 62, 70, 80, 15);
      r.addLabel(3, '§8Opis:', 40, 100, 20, 15).setHoverText([
        '§cKrótki opis czarodzieja',
        '§7Nowe linijki oddziel przez dodanie §c//',
      ]);
      var m = r.addTextField(13, 62, 100, 140, 15);
      if ('edit' == t) {
        var y = e.player.getTempdata().get('edit');
        (y = JSON.parse(y) || {}),
          Object.keys(y).length > 0
            ? (c.setText(y.typ), l.setText(y.nazwa), m.setText(y.opis))
            : e.player.message('[§cAdmin§f] §7Nie udało się załadować karty!'),
          r.addTexturedButton(
            15,
            '§2Zmień kartę',
            5,
            235,
            80,
            15,
            'customnpcs:textures/gui/pp_button.png'
          );
      } else
        r.addTexturedButton(
          14,
          '§2Dodaj kartę',
          5,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        );
    }
  else
    r.addTexturedButton(
      11,
      '§2Dodaj nową',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
      r.addTexturedButton(
        12,
        '§cUsuń kartę',
        90,
        60,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      ),
      r.addTexturedButton(
        13,
        '§dEdytuj kartę',
        90,
        80,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      ),
      r.addTexturedButton(
        17,
        '§8Weź kartę',
        90,
        100,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
  return (
    r.addTexturedButton(
      991,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(r),
    r
  );
}
function gui13(e, a, t, r) {
  var n,
    i,
    s = baseGui(e);
  if (
    ('cnpc' == a
      ? ((n = './Hogwart/customnpcs/scripts/ecmascript/'), (i = 600))
      : 'skript' == a
      ? ((n = './plugins/Skript/scripts/'), (i = 601))
      : 'MS' == a && ((n = './plugins/MagicSpells/'), (i = 602)),
    s.addLabel(1, a, 500, 30, 140, 20),
    s.addLabel(2, n, 500, 50, 140, 20),
    t)
  ) {
    for (var o = listFilesInDir(n), u = [], p = 0; p < o.length; p++)
      u.push(o[p].getName());
    u.sort(), s.addScroll(i, 30, 20, 200, 200, u);
  } else
    r
      ? (s.addLabel(10, r, 65, 30, 140, 20),
        s
          .addTextField(i + 105, 90, 60, 80, 15)
          .setHoverText([
            '§7Zmień nazwę',
            'Musi posiadać odpowiednie rozszerzenie!',
          ]),
        s.addTexturedButton(
          i + 10,
          '§aZmień nazwę',
          90,
          80,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        s.addTexturedButton(
          i + 20,
          '§cUsuń',
          90,
          100,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ))
      : (s.addTextField(i + 104, 30, 40, 200, 15),
        s.addTextField(i + 103, 90, 60, 80, 15),
        s
          .addLabel(i + 105, '§7Rename', 60, 60, 30, 15)
          .setHoverText([
            '§4§lUwaga!',
            '§7Musisz wpisać całą nazwę z rozszerzeniem pliku!',
          ]),
        s
          .addTexturedButton(
            i,
            '§aPobierz',
            90,
            80,
            80,
            15,
            'customnpcs:textures/gui/pp_button.png'
          )
          .setHoverText([n]),
        s
          .addLabel(8, '§4§l[i]', 235, 40, 20, 15)
          .setHoverText([
            '§4§lUwaga',
            '§7Link musi być direct!',
            '§7To znaczy, że musi kierować dokładnie do pliku aby go pobrać:',
            '§ahttps://domena.pl/folder/plik.js',
            '§chttps://domena.pl/zdjecie',
            '§7Musi zawierać po kropce rozszerzenie. Format http i samo ip też wystarczy',
          ]),
        s
          .addTexturedButton(
            609,
            '§cLista plików',
            90,
            235,
            80,
            15,
            'customnpcs:textures/gui/pp_button.png'
          )
          .setHoverText([n]));
  return (
    s.addTexturedButton(
      993,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(s),
    s
  );
}
function gui14(e, a, t) {
  var r = baseGui(e);
  if ((r.addLabel(9, '§1Cennik', 120, 0, 80, 20), a)) {
    if ('Item' == a)
      r.setBackgroundTexture('customnpcs:textures/gui/inve.png'),
        r
          .addLabel(11, '§2Item', 90, 62, 40, 20)
          .setHoverText(['§7Włóż tutaj item']),
        r.addItemSlot(100, 20).setHoverText(['§7Włóż tutaj item']),
        r.showPlayerInventory(8, 113);
    else if (t)
      r
        .addLabel(8, '§5[I]', 5, 0, 20, 20)
        .setHoverText([
          '§aid: §b' + t.id,
          '§aAutor: §b' + t.autor,
          '§aItem: §b' + (t.item ? 'Tak' : 'Nie'),
        ]),
        r
          .addButton(236, '§4✘', 225, 5, 20, 20)
          .setHoverText(['§cUsuń §7Ticket']),
        r
          .addLabel(10, '§3Nazwa', 20, 40, 30, 20)
          .setHoverText([
            '§7Nazwa ticketu',
            '§7np. §cPrzedmiot - Kieł wampira',
            '§7Max 120 znaków.',
          ]),
        r
          .addTextField(11, 50, 40, 180, 20)
          .setText(t.nazwa)
          .setHoverText([t.nazwa || 'nazwa...']),
        r
          .addLabel(12, '§3Opis', 20, 65, 30, 20)
          .setHoverText([
            '§7Opis produktu / usługi',
            '§7Napisz co to jest, jeżeli biznes to dokładnie opisz co potrzebujesz do niego.',
            '§7Max 4096 znaków.',
          ]),
        r
          .addTextField(13, 50, 65, 180, 20)
          .setText(t.opis)
          .setHoverText([t.opis || 'opis...']),
        r
          .addLabel(14, '§3Tagi', 20, 90, 30, 20)
          .setHoverText([
            '§7Kilka tagów',
            '§7Po przecinku wymień co się znajduje w opisie',
            '§7np. §cfutro wilkołaka, miecz, magiczny miecz, sadzonka madragory',
            '§7Max 512 znaków.',
          ]),
        r
          .addTextField(15, 50, 90, 180, 20)
          .setText(t.tagi)
          .setHoverText([t.tagi || 'tagi...']),
        r
          .addLabel(16, '§3Dostępny', 15, 115, 35, 20)
          .setHoverText([
            '§7Czy ma być dostępne dla wszystkich?',
            '§a1 §7- dostępne dla wszystkich',
            '§c0 §7- dostępne tylko dla specjalnych osób',
            '§7Z reguły powinny być dostępne przedmioty i podobne, Biznesy i bardziej personalne sprawy możesz dać niedostępne.',
          ]),
        r.addTextField(17, 50, 115, 20, 20).setText(t.dostępne || 1),
        r
          .addLabel(18, '§3Cena', 85, 115, 20, 20)
          .setHoverText(['§7Cena produktu wyrażona w knutach', '§a25']),
        r.addTextField(19, 110, 115, 30, 20).setText(t.cena || 0),
        r
          .addLabel(20, '§3Przecena', 150, 115, 35, 20)
          .setHoverText([
            '§7Ilość przeceny w %',
            '§7np. §e20',
            '§7Nie pisz §l§c%§r§7!',
          ]),
        r.addTextField(21, 185, 115, 20, 20).setText(t.sale),
        r
          .addLabel(22, '§3Sprzedawcy', 8, 140, 40, 20)
          .setHoverText([
            '§7Czy ma być tylko dla specjalnych sprzedawców?',
            '§e1§7 - tak, tylko osoby upoważnione mogą kupić (z odpowiednim itemem)',
            '§c0§7 - nie, nikt oprócz pewnych osób nie widzi',
          ]),
        r.addTextField(23, 50, 140, 20, 20).setText(t.monly || 0),
        r
          .addLabel(24, '§3Przecena Sprzedawcy', 80, 140, 40, 20)
          .setHoverText([
            '§7Ilość przeceny w % dla specjalnych sprzedawców',
            '§7np. §e20',
            '§7Nie pisz §l§c%§r§7!',
          ]),
        r.addTextField(25, 125, 140, 30, 20).setText(t.msale),
        r
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
          ]),
        r.addTexturedButton(
          235,
          '§2Zapisz',
          90,
          235,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        );
    else if (!t) {
      var n = getCennik({ wer: 'Edytowanie' == a ? 1 : 0 });
      if (n.error)
        return e.player.message('[§cDebugger§f] §7Error: ' + n.error);
      n = n.result;
      for (var i = [], s = 0; s < n.length; s++)
        i.push(
          n[s].id +
            '. §e' +
            n[s].nazwa +
            ' ' +
            n[s].autor +
            ' §c[' +
            (n[s].tagi ? n[s].tagi : '') +
            ']'
        );
      r.addScroll('Edytowanie' == a ? 235 : 232, 15, 15, 230, 210, i);
    }
  } else
    r.addTexturedButton(
      230,
      '§7Weryfikacja',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
      r.addTexturedButton(
        231,
        '§7Edytowanie',
        90,
        60,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
  return (
    r.addTexturedButton(
      8,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(r),
    r
  );
}
function gui15(e, a, t) {
  var r = baseGui(e);
  if ((r.addLabel(9, '§1Cennik', 120, 0, 80, 20), a)) {
    if ('Wyślij ticket' == a)
      r
        .addLabel(20, '§4[U]', 20, 0, 20, 20)
        .setHoverText(['§7Najlepiej wkleić już gotowy text']),
        r
          .addLabel(10, '§3Nazwa', 20, 60, 30, 20)
          .setHoverText([
            '§7Nazwa ticketu',
            '§7np. §cPrzedmiot - Kieł wampira',
            '§7Max 120 znaków.',
          ]),
        r.addTextField(11, 50, 60, 180, 20),
        r
          .addLabel(12, '§3Opis', 20, 80, 30, 20)
          .setHoverText([
            '§7Opis produktu / usługi',
            '§7Napisz co to jest, jeżeli biznes to dokładnie opisz co potrzebujesz do niego.',
            '§7Max 4096 znaków.',
          ]),
        r.addTextField(13, 50, 80, 180, 20),
        r
          .addLabel(14, '§3Tagi', 20, 100, 30, 20)
          .setHoverText([
            '§7Kilka tagów',
            '§7Po przecinku wymień co się znajduje w opisie',
            '§7np. §cfutro wilkołaka, miecz, magiczny miecz, sadzonka madragory',
            '§7Max 512 znaków.',
          ]),
        r.addTextField(15, 50, 100, 180, 20),
        r
          .addLabel(16, '§3Dostępny', 15, 120, 35, 20)
          .setHoverText([
            '§7Czy ma być dostępne dla wszystkich?',
            '§a1 §7- dostępne dla wszystkich',
            '§c0 §7- dostępne tylko dla specjalnych osób',
            '§7Z reguły powinny być dostępne przedmioty i podobne, Biznesy i bardziej personalne sprawy możesz dać niedostępne.',
          ]),
        r.addTextField(17, 50, 120, 180, 20).setText('1'),
        r.addTexturedButton(
          237,
          '§2Weryfikuj',
          90,
          160,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        );
    else if ('Lista ticketów' == a)
      if (t) {
        if (
          (r
            .addLabel(20, '§4[i]', 20, 0, 20, 20)
            .setHoverText([
              '§aID: §b' + t.id,
              '§aAutor: §b' + t.autor,
              '§aItem: §b' + (t.item ? 'Tak' : 'Nie'),
              '§aCena: §b' + t.cena,
              '§aDostępne: §b' + (1 == t.dostępne ? 'Tak' : 'Nie'),
              '§aRabat: §b' + (t.sale > 0 ? t.sale + ' %' : 'Brak'),
              '§aTylko sprzedawcy: §b' + (1 == t.monly ? 'Tak' : 'Nie'),
              '§aRabat sprzedawcy: §b' +
                (t.msale > 0 ? t.msale + ' %' : 'Brak'),
            ]),
          r
            .addLabel(21, '§c{Nazwa}', 60, 100, 40, 20)
            .setHoverText(['§cNazwa: §b' + t.nazwa]),
          r
            .addLabel(22, '§c{Opis}', 120, 100, 30, 20)
            .setHoverText(['§cOpis: §b' + t.opis]),
          r
            .addLabel(23, '§c{Tagi}', 180, 100, 30, 20)
            .setHoverText(['§cTagi: §b' + t.tagi]),
          t.item && 1 == t.dostępne)
        ) {
          var n = e.player.world.createItemFromNbt(e.API.stringToNbt(t.item));
          r
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
              n.getDisplayName(),
              Java.from(n.getLore()).join('\n'),
            ]),
            r
              .addTexturedRect(
                25,
                n.getName().slice(0, n.getName().indexOf(':')) +
                  ':textures/items/' +
                  n.getName().split(':')[1] +
                  '.png',
                120,
                130,
                256,
                256
              )
              .setScale(0.0625),
            r.addTexturedButton(
              222,
              '§aZakup',
              5,
              235,
              80,
              15,
              'customnpcs:textures/gui/pp_button.png'
            ),
            r
              .addTextField(26, 90, 235, 40, 15)
              .setText('1')
              .setHoverText([
                '§7Wpisz ile itemów chcesz zakupić',
                '§7Liczba musi być w przedziale §c<1;64>',
              ]);
        }
      } else {
        var i = getCennik({ wer: 1, dostępne: 1 });
        if (i.error)
          return e.player.message('[§cDebugger§f] §7Error: ' + i.error);
        i = i.result;
        var s = getCennik({ wer: 1, dostępne: 0, autor: e.player.getName() });
        if (s.error)
          return e.player.message('[§cDebugger§f] §7Error: ' + s.error);
        i.concat(s.result);
        for (var o = [], u = 0; u < i.length; u++)
          o.push(
            i[u].id +
              '. §e' +
              i[u].nazwa +
              ' §c[' +
              (i[u].tagi ? i[u].tagi : '') +
              ']'
          );
        r.addScroll(236, 15, 15, 230, 210, o);
      }
  } else
    r.addTexturedButton(
      232,
      '§7Wyślij ticket',
      90,
      40,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
      r.addTexturedButton(
        233,
        '§7Lista ticketów',
        90,
        60,
        80,
        15,
        'customnpcs:textures/gui/pp_button.png'
      );
  return (
    r.addTexturedButton(
      902,
      '§8Powrót',
      175,
      235,
      80,
      15,
      'customnpcs:textures/gui/pp_button.png'
    ),
    e.player.showCustomGui(r),
    r
  );
}
function gui16(e, a, t) {
  var r = baseGui(e);
  if ((r.addLabel(9, '§1Menadżer', 115, 0, 80, 20), a))
    if (t)
      switch (t) {
        case 'create':
          r
            .addTextField(720, 55, 40, 140, 20)
            .setHoverText([
              '§cInfo',
              '§7Nazwa grupy §lJednowyrazowa',
              '§7Przykłady (§aDobry §cZły§7):',
              '§aPracownikDTM',
              '§aGazetaHogsmeade',
              "§cdruk'arnia pana zdzisłafkaq231@@@@",
            ]),
            r
              .addTextField(721, 55, 65, 80, 20)
              .setHoverText([
                '§cInfo',
                '§7DisplayName §lSkrócona nazwa',
                '§7Przykłady (§aDobry §cZły§7):',
                '§a[&7Pr&6DTM&f]',
                '§a[GazHogs]',
                '§c{NiewidocznyCzłowiekPna&cP&aA&bP&8i&3E&dŻ&2A}',
              ]),
            r
              .addTextField(722, 155, 65, 40, 20)
              .setHoverText([
                '§cInfo',
                '§7Waga nazwy §lLiczba',
                '§7Prefix roli wyświetla się w zależności od wagi (w przypadku posiadania kilku ról)',
                '§7Waga Może znajdować się w przedziale §a<0 §7; §c70>',
              ]),
            r
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
              ]),
            r
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
              ]),
            r
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
              ]),
            r
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
        case 'path':
          var n = (s = e.player.getTempdata()).get('globalP');
          n = JSON.parse(n) || [];
          var i = s.get('myP');
          (i = i || ''),
            r.addLabel(700, '§dZaładowano: §c' + i, 90, 20, 100, 15),
            r
              .addScroll(720, 40, 40, 180, 170, n)
              .setHoverText([
                '§cInfo',
                '§7Globalne ścieżki, które możesz załadować',
              ]),
            r.addTexturedButton(
              701,
              '§aPowrót do tworzenia',
              90,
              235,
              80,
              15,
              'customnpcs:textures/gui/pp_button.png'
            );
          break;
        case 'group':
          var s,
            o = (s = e.player.getTempdata()).get('globalG');
          o = JSON.parse(o) || [];
          var u = s.get('myG');
          (u = JSON.parse(u) || []),
            r
              .addScroll(730, 20, 40, 90, 150, o)
              .setHoverText([
                '§cInfo',
                '§7Globalne grupy, które możesz załadować',
              ]),
            r.addButton(750, '§c>', 120, 90, 20, 20).setHoverText('§7Załaduj'),
            r.addButton(751, '§c<', 120, 120, 20, 20).setHoverText('§7Wyładuj'),
            r
              .addScroll(731, 150, 40, 90, 150, u)
              .setHoverText([
                '§cInfo',
                '§7Załadowane grupy nadżędne - ładowanie permissi',
              ]),
            r.addTexturedButton(
              701,
              '§aPowrót do tworzenia',
              90,
              235,
              80,
              15,
              'customnpcs:textures/gui/pp_button.png'
            );
      }
    else
      r
        .addTexturedRect(
          10,
          'betterrecords:textures/items/urlrecord.png',
          230,
          10,
          256,
          256
        )
        .setScale(0.0625),
        r
          .addTexturedButton(
            721,
            '',
            230,
            10,
            20,
            20,
            'betterrecords:textures/items/urlrecord.png'
          )
          .setHoverText(['Reload']),
        r.addTexturedButton(
          701,
          '§7Stwórz rolę',
          90,
          40,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        r.addTexturedButton(
          702,
          '§2Aplikuj',
          90,
          60,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        ),
        r.addTexturedButton(
          703,
          '§3Aplikacje',
          90,
          80,
          80,
          15,
          'customnpcs:textures/gui/pp_button.png'
        );
  return e.player.showCustomGui(r), r;
}
function customGuiButton(e) {
  switch (e.buttonId) {
    case 1:
      gui2(e);
      break;
    case 2:
      gui10(e);
      break;
    case 4:
      gui11(e);
      break;
    case 5:
      gui12(e);
      break;
    case 6:
      gui13(e, 'cnpc');
      break;
    case 7:
      gui13(e, 'skript');
      break;
    case 9:
      gui13(e, 'MS');
      break;
    case 8:
      gui14(e);
      break;
    case 11:
      gui12(e, !1, 'add');
      break;
    case 12:
      gui12(e, !0, 'remove');
      break;
    case 13:
      gui12(e, 'edit', 'edit');
      break;
    case 230:
    case 231:
    case 232:
    case 233:
      var a = e.gui.getComponent(e.buttonId).getLabel().replace(/§./g, '');
      return e.buttonId > 231 ? gui15(e, a) : gui14(e, a);
    case 234:
      return gui14(e, 'Item');
    case 902:
      return gui15(e);
    case 14:
      var t = e.gui.getComponent(11).getText(),
        r = e.gui.getComponent(12).getText(),
        n = e.gui.getComponent(13).getText();
      if (!t || !r || !n)
        return e.player.message(
          '[§cAdmin§f] §7Musisz wypełnić wszystkie pola!'
        );
      if (
        -1 == ['ancient', 'common', 'legendary', 'uncommon', 'rare'].indexOf(t)
      )
        return e.player.message(
          '[§cAdmin§f] §7Niepoprawny typ! Najedź na label i przepisz jeden.'
        );
      n = n.split('//') || [n];
      var i = (de = e.player.world.getStoreddata()).get('karty'),
        s = de.get('karty_top');
      if (
        ((s = Number(s)), (i = JSON.parse(i)), 0 == Object.keys(i).length || !s)
      )
        return e.player.message('[§cAdmin§f] §7Błąd podczas ładowania danych!');
      s++,
        i[t].push({ name: r, opis: n, numer: s }),
        de.put('karty', JSON.stringify(i)),
        de.put('karty_top', s),
        e.player.message('[§cAdmin§f] §7Dodano nową kartę!');
      var o = ang(
          'Moderator **' +
            e.player.getName() +
            '** Dodał kartę czarodziejów:\n```Typ: ' +
            t +
            '\nNumer: ' +
            s +
            '\nNazwa: ' +
            r +
            '\nOpis: ' +
            n +
            '```'
        ),
        u = passes.hooks.karty;
      return (
        (ee = sqlPut(
          'INSERT INTO karty(numer, typ, nazwa, opis) VALUES (' +
            s +
            ', "' +
            t +
            '", "' +
            r +
            '", "' +
            n +
            '");'
        )).error &&
          e.player.message(
            '[§cDebugger§f] §7Wystąpił błąd w przepisywaniu do bazy danych, ' +
              ee.error
          ),
        HTTP.post(u, { content: o, tts: !1 }),
        gui1(e)
      );
    case 15:
      (t = e.gui.getComponent(11).getText()),
        (r = e.gui.getComponent(12).getText()),
        (n = e.gui.getComponent(13).getText());
      if (!t || !r || !n)
        return e.player.message(
          '[§cAdmin§f] §7Musisz wypełnić wszystkie pola!'
        );
      if (
        -1 == ['ancient', 'common', 'legendary', 'uncommon', 'rare'].indexOf(t)
      )
        return e.player.message(
          '[§cAdmin§f] §7Niepoprawny typ! Najedź na label i przepisz jeden.'
        );
      n = n.split('//') || [n];
      var p = e.player.getTempdata(),
        d = p.get('edit');
      if (!(re = p.get('edit_i')) || !d)
        return e.player.message(
          '[§cDebugger§f] §7Nie znaleziono wybranej karty!'
        );
      if (
        ((d = JSON.parse(d)),
        (re = JSON.parse(re)),
        d.typ == t && d.nazwa == r && d.opis == n)
      )
        return e.player.message('[§cAdmin§f] §7Karty są identyczne!');
      i = (de = e.player.world.getStoreddata()).get('karty');
      if (((i = JSON.parse(i)), 0 == Object.keys(i).length))
        return e.player.message('[§cAdmin§f] §7Błąd podczas ładowania danych!');
      var g = i[re[0]][re[1]];
      i[re[0]].splice(re[1], 1),
        (g.name = r),
        (g.opis = n),
        i[t].push(g),
        de.put('karty', JSON.stringify(i)),
        p.remove('edit'),
        p.remove('edit_i'),
        e.player.message('[§cAdmin§f] §7Zmieniono kartę!');
      (o = ang(
        'Moderator **' +
          e.player.getName() +
          '** zmienił kartę: \n```Nazwa: ' +
          re[2] +
          ' -> ' +
          g.name +
          ' \nTyp: ' +
          re[0] +
          ' -> ' +
          t +
          ' \nOpis: ' +
          d.opis +
          ' -> ' +
          g.opis +
          '```'
      )),
        (u = passes.hooks.karty);
      return (
        (ee = sqlPut(
          'UPDATE karty SET typ="' +
            t +
            '", nazwa="' +
            r +
            '", opis="' +
            n +
            '" WHERE numer=' +
            s +
            ';'
        )).error &&
          e.player.message(
            '[§cDebugger§f] §7Wystąpił błąd w przepisywaniu do bazy danych, ' +
              ee.error
          ),
        HTTP.post(u, { content: o, tts: !1 }),
        gui1(e)
      );
    case 16:
      var c = e.player.getTempdata(),
        l = c.get('remove');
      if (((l = JSON.parse(l) || []), 0 == c.length || 0 == l.length))
        return (
          e.player.message('[§cAdmin§f] §7Błąd, ponów wybieranie!'), gui12(e)
        );
      i = (de = e.player.world.getStoreddata()).get('karty');
      if (((i = JSON.parse(i) || {}), 0 == Object.keys(i).length))
        return (
          e.player.message('[§cAdmin§f] §7Nie można było załadować kart!'),
          gui12(e)
        );
      g = i[l[0]][l[1]];
      i[l[0]].splice(l[1], 1),
        de.put('karty', JSON.stringify(i)),
        c.remove('remove'),
        c.remove('edit');
      (o = ang(
        'Moderator **' +
          e.player.getName() +
          '** Usunął kartę czarodziejów:\n```Typ: ' +
          l[0] +
          '\nNumer: ' +
          g.numer +
          '\nNazwa: ' +
          g.name +
          '\nOpis: ' +
          g.opis +
          '```'
      )),
        (u = passes.hooks.karty);
      return (
        (ee = sqlPut('DELETE FROM karty WHERE numer=' + s + ';')).error &&
          e.player.message(
            '[§cDebugger§f] §7Wystąpił błąd w przepisywaniu do bazy danych, ' +
              ee.error
          ),
        HTTP.post(u, { content: o, tts: !1 }),
        e.player.message('[§cAdmin§f] §7Usunięto kartę!'),
        gui12(e)
      );
    case 17:
      return gui12(e, 'get');
    case 30:
    case 50:
      var m = parseFloat(e.gui.getComponent(60).getText()),
        y = parseFloat(e.gui.getComponent(40).getText()),
        k = e.gui.getComponent(9).getText().split(' ')[1];
      return !m || !y || isNaN(m) || isNaN(y) || m <= 0 || y <= 0
        ? e.player.message('[§cEliksiry§f] §7Niepoprawny text!')
        : (ee = updateOczekujace(k, { ile: m, data: y })).error
        ? e.player.message('[§cDebugger§f] §7Error: ' + ee.error)
        : (N = getOczekujace({ id: k })).error
        ? e.player.message('[§cDebugger§f] §7Error: ' + N.error)
        : gui5(e, k, N);
    case 901:
      gui2(e, !0);
      break;
    case 101:
    case 102:
    case 103:
      var z = e.gui.getComponent(e.buttonId).getLabel().split('§7')[1];
      gui3(e, z);
      break;
    case 911:
    case 912:
      z = e.gui.getComponent(e.buttonId).getLabel().split('§7')[1];
      gui3(e, z, !0);
      break;
    case 104:
      k = e.gui.getComponent(9).getText().split(' ')[1];
      if ((N = getOczekujace({ id: k })).error)
        return e.player.message('[§cDebugger§f] §7Error: ' + N.error);
      if ((N = getEliksir({ nazwa: N.eliksir })).error)
        return e.player.message('[§cDebugger§f] §7Error: ' + N.error);
      gui5(e, k, N);
      break;
    case 105:
      k = e.gui.getComponent(9).getText().split(' ')[1];
      var w = e.gui.getComponent(99);
      if (!w)
        return (
          e.gui
            .addTextField(99, 0, 260, 256, 20)
            .setHoverText([
              '§7Podaj powód odrzucenia',
              "§7I kliknij '§cOdrzuć§7' ponownie!",
            ]),
          e.gui.update(e.player)
        );
      if (((w = w.getText() || ''), (g = getOczekujace({ id: k })).error))
        return e.player.message('[§cDebugger§f] §7Error: ' + g.error);
      if (((g = g.result[0]), (ee = removeOczekujace(k)).error))
        return e.player.message('[§cDebugger§f] §7Error: ' + ee.error);
      e.API.executeCommand(
        e.player.world,
        'dcdpm ' +
          g.gracz +
          ' Twój eliksir: `' +
          g.eliksir +
          ' (' +
          k +
          ')` został odrzucony!' +
          (w.length > 0 ? '\nWiadomość odrzucenia:\n```' + w + '```' : '')
      ),
        e.player.message(
          '[§cEliksiry§f] §7Odrzucono eliksir gracza §b' +
            g.gracz +
            '§7 (§b' +
            k +
            '§7)!'
        ),
        (o = e.player.world.getPlayer(g.gracz)) &&
          o.message(
            '[§cEliksiry§f] §7Twój eliksir został zweryfikowany przez moderatora. Wynik: §cNegatywny!'
          ),
        post(
          !1,
          'Moderator: **' +
            e.player.getName() +
            '** Odrzucił eliksir `' +
            g.eliksir +
            ' (' +
            k +
            ')` gracza **' +
            g.gracz +
            '** <@' +
            g.discord +
            '>'
        ),
        gui3(e, 'oczekujace');
      break;
    case 106:
    case 107:
      k = e.gui.getComponent(9).getText().split(' ')[1];
      if ((g = getOczekujace({ id: k })).error)
        return e.player.message('[§cDebugger§f] §7Error: ' + g.error);
      if (
        ((g = g.result[0]),
        106 == e.buttonId
          ? (e.API.executeCommand(
              e.player.world,
              'dcdpm ' +
                g.gracz +
                ' Twój eliksir: `' +
                g.eliksir +
                ' (' +
                k +
                ')` został Usunięty!' +
                (1 == g.odebrane ? '\nEliksir był już odebrany' : '')
            ),
            e.player.message(
              '[§cEliksiry§f] §7Usunięto eliksir gracza §b' +
                g.gracz +
                '§7 (§b' +
                k +
                '§7)!'
            ),
            post(
              !1,
              'Moderator: **' +
                e.player.getName() +
                '** Usunął eliksir `' +
                g.eliksir +
                ' (' +
                k +
                ')` gracza **' +
                g.gracz +
                '** <@' +
                g.discord +
                '>!'
            ))
          : (e.player.message(
              '[§cEliksiry§f] §7Usunięto eliksir §b' + k + ' §7!'
            ),
            post(
              !1,
              'Gracz: **' +
                e.player.getName() +
                '** <@' +
                g.discord +
                '> Usunął swój eliksir `' +
                g.eliksir +
                ' (' +
                k +
                ')`!'
            )),
        (ee = removeOczekujace(k)).error)
      )
        return e.player.message('[§cDebugger§f] §7Error: ' + ee.error);
      gui3(e, 'oczekujace', 107 == e.buttonId);
      break;
    case 109:
    case 110:
      k = e.gui.getComponent(9).getText().split(' ')[1];
      if ((g = getOczekujace({ id: k })).error)
        return e.player.message('[§cDebugger§f] §7Error: ' + g.error);
      if (!g.result[0] || 1 == g.result[0].odebrane)
        return e.player.message('[§cEliksiry§f] §7Już odebrałeś eliksir!');
      g = g.result[0];
      var b = !1;
      if (110 == e.buttonId) {
        for (
          var x = e.player.getInventory().getItems(), T = 0;
          T < x.length;
          T++
        )
          x[T] &&
            !b &&
            ('§cPrzepustka do składziku' == x[T].getDisplayName() ||
              (x[T].getDisplayName().indexOf('Kupon na eliksir:') > -1 &&
                x[T].getDisplayName().indexOf(g.eliksir) > -1)) &&
            (x[T].setStackSize(x[T].getStackSize() - 1), (b = !0));
        b &&
          ((g.cena = 0),
          e.player.message(
            '[§cEliksiry§f] §7Przepustka została spalona wzamian za składniki do eliksiru!'
          ));
      }
      if (1 != b && 1 != requestPayment(e.player.getName(), g.cena))
        return e.player.message(
          '[§cEliksiry§f] §7Nie masz wystarczająco pieniążków w portfelu!'
        );
      if ((N = getEliksir({ nazwa: g.eliksir })).error)
        return e.player.message('[§cDebugger§f] §7Error: ' + N.error);
      N = N.result[0];
      var f = e.player.world.createItem('minecraft:potion', 0, 1);
      q = (q = (C = new Date(
        Date.now() + 864e5 * (g.pdata || N.data)
      )).getTime())
        .toString(16)
        .split('')
        .reverse()
        .join('');
      var v = [
        '§5Kolor: §a' + N.kolor,
        '§5Zapach: §a' + N.zapach,
        '§5Smak: §a' + N.smak,
        '',
        '§cData ważności:§7 ' + q,
      ];
      f.setCustomName('§eTajemniczy Eliksir'),
        f.setLore(v),
        (D = f.getNbt()).setString('Eliksir', N.nazwa),
        D.setString('Czas', N.czas),
        D.setString('Inokreacja', N.inokreacja),
        D.setLong('Data', C.getTime()),
        D.setLong('CustomPotionColor', parseInt(N.hex, 16) || 3093151),
        D.setInteger('HideFlags', 37),
        (g.stack = f.getItemNbt().toJsonString());
      var j = e.player.world.createItemFromNbt(e.API.stringToNbt(g.stack));
      for (m = g.pile || N.ile || 4, T = 0; T < m; T++)
        e.player.dropItem(j).setOwner(e.player.getName());
      e.player.message(
        '[§cEliksiry§f] §7Uwaga! Jeżeli nie widzisz wszystkich eliksirów w eq otwórz jakieś inventory np. skrzynkę/piec etc.'
      );
      o =
        'Gracz **' +
        e.player.getName() +
        '** Odebrał eliksir: ' +
        g.eliksir +
        ' (`' +
        k +
        '`), zapłacił za składniki: *' +
        g.cena +
        '* knutów.';
      if (
        (b && (o += '\nUżyto przepuski/kuponu !'),
        post(!1, (o = ang(o))),
        (ee = updateOczekujace(k, { odebrane: 1, data_odebrania: Date.now() }))
          .error)
      )
        return e.player.message('[§cDebugger§f] §7Error: ' + ee.error);
      break;
    case 210:
      var N;
      k = e.gui.getComponent(9).getText().split(' ')[1];
      if ((g = getOczekujace({ id: k })).error)
        return e.player.message('[§cDebugger§f] §7Error: ' + g.error);
      if (((g = g.result[0]), (N = getEliksir({ nazwa: g.eliksir })).error))
        return e.player.message('[§cDebugger§f] §7Error: ' + N.error);
      N = N.result[0];
      var h = updateOczekujace(k, { weryfikowane: 1 });
      if (h.error)
        return e.player.message('[§cDebugger§f] §7Error: ' + h.error);
      var C,
        S = g.pile ? g.pile : N.ile,
        B = g.pdata ? g.pdata : N.data;
      q = (q = (C = new Date(Date.now() + 864e5 * B)).getTime())
        .toString(16)
        .split('')
        .reverse()
        .join('');
      var D;
      v = [
        '§5Kolor: §a' + N.kolor,
        '§5Zapach: §a' + N.zapach,
        '§5Smak: §a' + N.smak,
        '',
        '§cData ważności:§7 ' + q,
      ];
      (j = e.player.world.createItem('minecraft:potion', 0, 1)).setCustomName(
        '§eTajemniczy Eliksir'
      ),
        j.setLore(v),
        (D = j.getNbt()).setString('Eliksir', N.nazwa),
        D.setString('Czas', N.czas),
        D.setString('Inokreacja', N.inokreacja),
        D.setLong('Data', C.getTime()),
        D.setLong('CustomPotionColor', parseInt(N.hex, 16) || 3093151),
        D.setInteger('HideFlags', 37),
        (g.stack = j.getItemNbt().toJsonString()),
        e.player.dropItem(j).setOwner(e.player.getName()),
        e.player.message('[§cEliksiry§f] §7Otrzymano kopię eliksiru'),
        e.API.executeCommand(
          e.player.world,
          'dcdpm ' +
            g.gracz +
            ' Twój eliksir: ' +
            N.nazwa +
            ' (`' +
            k +
            '`)  został zaakceptowany!\nWejdź na serwer i wciśnij `ALT+G` aby go odebrać.'
        );
      o =
        'Moderator **' +
        e.player.getName() +
        '** zweryfikował eliksir gracza **' +
        g.gracz +
        '** <@' +
        g.discord +
        '> (`' +
        k +
        '`)\n```--Eliksir: ' +
        N.nazwa +
        '\n--Data: ' +
        new Date(C).toDateString() +
        '\n--Ilość: ' +
        S +
        '    ```';
      post(!1, (o = ang(o))),
        e.player.getTempdata().remove('current'),
        gui3(e, 'oczekujace');
      break;
    case 222:
      try {
        if (
          !(m = e.gui.getComponent(26).getText() || 1) ||
          isNaN(parseInt(m)) ||
          m < 1 ||
          m > 64
        )
          throw 'Wpisano niepoprawną kwotę: §e' + m;
        var O = e.player.getTempdata(),
          _ = JSON.parse(O.get('cennikWer'));
        if (0 == Object.keys(_).length) throw 'Brak obiektu ticketu!';
        if (!_.item) throw 'Brak itemu w tickecie!';
        var E = (j = e.player.world.createItemFromNbt(
          e.API.stringToNbt(_.item)
        )).getMaxStackSize();
        if (m > E) throw 'Maksymalna ilość itemu w stacku to: §e' + E;
        var P = _.cena * m;
        if (
          (_.sale && (P -= (P * parseInt(_.sale)) / 100),
          (P = Math.ceil(P)),
          !0 !== requestPayment(e.player.getName(), P))
        )
          throw 'Nie udało się pobrać kasy!';
        j.setStackSize(m), e.player.dropItem(j).setOwner(e.player.getName());
        o =
          'Gracz **' +
          e.player.getName() +
          '** Kupił *' +
          m +
          'x ' +
          j.getDisplayName().replace(/§./g, '') +
          '* za **' +
          P +
          '** knutów, ticket (`' +
          _.id +
          '`)';
        return (
          HTTP.post(passes.hooks.cennik, { tts: !1, content: ang(o) }),
          e.player.message(
            '[§cCennik§f] §7Zakupiono: §b' + m + '§7x ' + j.getDisplayName()
          )
        );
      } catch (a) {
        return e.player.message('[§cCennik§f] §7Wystąpił błąd: §c' + a);
      }
      break;
    case 236:
      try {
        (_ = (O = e.player.getTempdata()).has('cennikWer')
          ? JSON.parse(O.get('cennikWer'))
          : 0),
          (j = O.has('cennikItem') ? O.get('cennikItem') : 0);
        if (!_ || 0 == Object.keys(_).length) throw 'Brak id w cenniku!';
        if ((ee = removeCennik(_.id)).error) throw ee.error;
        _.autor &&
          e.API.executeCommand(
            e.player.world,
            'dcdpm ' +
              _.autor +
              ' Twój ticket (`' +
              _.id +
              '`) na **' +
              _.nazwa +
              '** został usunięty!'
          ),
          e.player.message('[§Cenink§f] §7Usunięto ticket o id: §e' + _.id);
        var I = {
          username: 'Cennik hook',
          avatar_url: 'https://i.imgur.com/vOmJQrd.png',
          content: '**' + e.player.getName() + '** Usunął ticket!',
          embeds: [
            {
              title: 'Autor: ' + _.autor,
              url: 'https://forum.hapel.pl/u/' + _.autor,
              color: 15258703,
              fields: [
                { name: 'ID', value: '' + _.id },
                {
                  name: 'Nazwa',
                  value:
                    _.nazwa.length >= 1024
                      ? _.nazwa.substring(0, 1e3) + ' ...'
                      : _.nazwa,
                },
                {
                  name: 'Opis',
                  value:
                    _.opis.length >= 1024
                      ? _.opis.substring(0, 1e3) + ' ...'
                      : _.opis,
                },
                {
                  name: 'Tagi',
                  value:
                    _.tagi.length >= 1024
                      ? _.tagi.substring(0, 1e3) + ' ...'
                      : _.tagi,
                },
              ],
            },
          ],
        };
        return (
          (I = JSON.parse(ang(JSON.stringify(I)))),
          HTTP.post(passes.hooks.cennik, I),
          gui14(e)
        );
      } catch (a) {
        return e.player.message('[§cDebbuger§f] §7Error: §c' + a);
      }
    case 235:
      try {
        (_ = (O = e.player.getTempdata()).has('cennikWer')
          ? JSON.parse(O.get('cennikWer'))
          : 0),
          (j = O.has('cennikItem') ? O.get('cennikItem') : 0);
        var L = O.has('cennikOK') ? 1 : 0;
        if (!_ || 0 == Object.keys(_).length) throw 'Brak id w cenniku!';
        if (!j && !L)
          return (
            O.put('cennikOK', !0),
            e.player.message(
              '[§cCennik§f] §7Nie dodano itemu, kliknij ponownie aby zaakceptować.'
            )
          );
        (r = e.gui.getComponent(11).getText()),
          (n = e.gui.getComponent(13).getText());
        var H = e.gui.getComponent(15).getText(),
          J = e.gui.getComponent(17).getText(),
          A =
            ((P = e.gui.getComponent(19).getText()),
            e.gui.getComponent(21).getText()),
          F = e.gui.getComponent(23).getText(),
          W = e.gui.getComponent(25).getText(),
          G = {
            nazwa: escapeString(r),
            opis: escapeString(n),
            cena: P,
            wer: 1,
            dostępne: J,
          };
        if (
          (j && (G.item = j),
          A && parseInt(A) > 0 && (G.sale = parseInt(A)),
          H && H.length > 0 && (G.tagi = escapeString(H)),
          (1 != F && 0 != F) || (G.monly = F),
          W && parseInt(W) > 0 && (G.msale = parseInt(W)),
          (ee = updateCennik(_.id, G)).error)
        )
          throw ee.error;
        (I = {
          username: 'Cennik hook',
          avatar_url: 'https://i.imgur.com/vOmJQrd.png',
          content: '',
          embeds: [
            {
              title: 'Autor: ' + _.autor,
              url: 'https://forum.hapel.pl/u/' + _.autor,
              color: 15258703,
              fields: [
                { name: 'ID', value: '' + _.id, inline: !0 },
                {
                  name: 'Dostępne',
                  value: 1 == G.dostępne ? 'Tak' : 'Nie',
                  inline: !0,
                },
                {
                  name: 'Tylko sprzedawcy',
                  value: 1 == F ? 'Tak' : 'Nie',
                  inline: !0,
                },
                {
                  name: 'Nazwa',
                  value:
                    G.nazwa.length >= 1024
                      ? G.nazwa.substring(0, 1e3) + ' ...'
                      : G.nazwa,
                },
                {
                  name: 'Opis',
                  value:
                    G.opis.length >= 1024
                      ? G.opis.substring(0, 1e3) + ' ...'
                      : G.opis,
                },
                {
                  name: 'Tagi',
                  value: H.length >= 1024 ? H.substring(0, 1e3) + ' ...' : H,
                },
                { name: 'Cena', value: G.cena + ' knutów', inline: !0 },
                { name: 'Przecena', value: A ? A + '%' : 'Brak', inline: !0 },
                {
                  name: 'Przecena Sprzedawcy',
                  value: W ? W + '%' : 'Brak',
                  inline: !0,
                },
              ],
              footer: {
                text: 'Weryfikowano przez: ' + e.player.getName() + '!',
                icon_url: 'https://i.imgur.com/vkxI2M7.png',
              },
            },
          ],
        }),
          (o = JSON.parse(ang(JSON.stringify(I))));
        return (
          HTTP.post(passes.hooks.cennik, o),
          e.player.message(
            '[§Cennik§f] §7Wyceniono ticket o id §e' + _.id + '§7!'
          ),
          gui14(e, 'Edytowanie')
        );
      } catch (a) {
        return e.player.message('[§cDebbuger§f] §7Error: ' + a);
      }
      return gui14(e, 'Edytowanie');
    case 237:
      var U = e.gui.getComponent(11),
        M = e.gui.getComponent(13),
        Z = e.gui.getComponent(15),
        K = e.gui.getComponent(17);
      if (!(U && M && Z && K))
        return e.player.message('[§cDebugger§f] §7Nie znaleziono textów!');
      if (
        ((U = U.getText()),
        (M = M.getText()),
        (Z = Z.getText()),
        (K = K.getText()),
        U.length >= 120)
      )
        return e.player.message('[§cCennik§f] §7Nazwa za długa: §e' + U.length);
      if (M.length >= 4096)
        return e.player.message('[§cCennik§f] §7Opis za długi: §e' + U.length);
      if (U.length >= 512)
        return e.player.message('[§cCennik§f] §7Tagi za długie: §e' + U.length);
      if (
        ((U = escapeString(U)),
        (M = escapeString(M)),
        (Z = escapeString(Z)),
        -1 == ['0', '1', 0, 1].indexOf(K))
      )
        return e.player.message(
          '[§cCennik§f] §7Zła wartość dostępności: §e0 / 1'
        );
      if (
        (ee = addCennik({
          nazwa: U,
          opis: M,
          tagi: Z,
          autor: e.player.getName(),
          dostępne: K,
        })).error
      )
        return e.player.message('[§cDebugger§f] §7Error1: §e' + ee.error);
      if (
        (ee = getCennik({
          nazwa: U,
          tagi: Z,
          autor: e.player.getName(),
          dostępne: K,
        })).error
      )
        return e.player.message('[§cDebugger§f] §7Error2: §e' + ee.error);
      ee = ee.result[0];
      (I = {
        username: 'Cennik hook',
        avatar_url: 'https://i.imgur.com/vOmJQrd.png',
        content: '**' + e.player.getName() + '** Wysłał ticket!',
        embeds: [
          {
            title: 'Autor: ' + e.player.getName(),
            url: 'https://forum.hapel.pl/u/' + e.player.getName(),
            color: 15258703,
            fields: [
              { name: 'ID', value: '' + ee.id, inline: !0 },
              { name: 'Dostępne', value: 1 == K ? 'Tak' : 'Nie', inline: !0 },
              {
                name: 'Nazwa',
                value: U.length >= 1024 ? U.substring(0, 1e3) + ' ...' : U,
              },
              {
                name: 'Opis',
                value: M.length >= 1024 ? M.substring(0, 1e3) + ' ...' : M,
              },
              {
                name: 'Tagi',
                value: Z.length >= 1024 ? Z.substring(0, 1e3) + ' ...' : Z,
              },
            ],
          },
        ],
      }),
        (o = JSON.parse(ang(JSON.stringify(I))));
      return (
        HTTP.post(passes.hooks.cennik, o),
        e.player.message('[§cCennik§f] §7Wysłano ticket: §e' + U),
        gui15(e)
      );
    case 255:
      a = e.gui.getComponent(7).getText();
      var R = e.gui.getComponent(9).getText().split('z:§c ')[1];
      return gui6(e, R, a);
    case 256:
      var V = e.gui.getComponent(9).getText(),
        q = ((o = !1), !1);
      V.length >= 18 && (o = !0), V.indexOf('!!') > -1 && (q = !0);
      a = e.gui.getComponent(7).getText();
      return gui9(e, o, a, q);
    case 261:
      var Y = e.player.getStoreddata().get('e_skladnik');
      return (Y = JSON.parse(Y) || {}).nazwa
        ? (Q = {
            nazwa: e.gui.getComponent(11).getText(),
            typ: e.gui.getComponent(19).getText(),
            jednostka: e.gui.getComponent(17).getText(),
            cena: e.gui.getComponent(13).getText(),
            ilosc: e.gui.getComponent(15).getText(),
            dostępny: e.gui.getComponent(21).getText(),
          }).nazwa &&
          Q.typ &&
          Q.jednostka &&
          Q.cena &&
          Q.ilosc
          ? Q.nazwa.length <= 2 ||
            Q.typ.length <= 2 ||
            Q.jednostka.length < 1 ||
            isNaN(parseFloat(Q.cena)) ||
            Q.ilosc < 1
            ? e.player.message('[§cAdmin§f] §7Za małe wartości!')
            : -1 ==
              ['Bazy wodne', 'Nieorganiczne', 'Zwierzęce', 'Roślinne'].indexOf(
                Q.typ
              )
            ? e.player.message('[§cAdmin§f] §7Wpisano nieodpowiedni typ!')
            : (ee = updateSkladnik(Y.nazwa, Q)).error
            ? e.player.message('[§cDebugger§f] §7Error: ' + ee.error)
            : (e.player.message('[§cAdmin§f] §7Zrobiono update składnika:'),
              e.player.message('§6Nazwa: §c' + Y.nazwa + ' §9: §a' + Q.nazwa),
              e.player.message('§6Typ: §c' + Y.typ + ' §9: §a' + Q.typ),
              e.player.message('§6Cena: §c' + Y.cena + ' §9: §a' + Q.cena),
              e.player.message('§6Ilość: §c' + Y.ilosc + ' §9: §a' + Q.ilosc),
              e.player.message(
                '§6Jednostka: §c' + Y.jednostka + ' §9: §a' + Q.jednostka
              ),
              e.player.message(
                '§6Dostępność: §c' + Y.dostępny + ' §9: §a' + Q.dostępny
              ),
              post(
                !0,
                e.player.getName() +
                  ' Zmienił składnik: \n```Nazwa: ' +
                  Y.nazwa +
                  ' -> ' +
                  Q.nazwa +
                  '\nTyp: ' +
                  Y.typ +
                  ' -> ' +
                  Q.typ +
                  '\nCena: ' +
                  Y.cena +
                  ' -> ' +
                  Q.cena +
                  '\nIlość: ' +
                  Y.ilosc +
                  ' -> ' +
                  Q.ilosc +
                  '\nJednostka: ' +
                  Y.jednostka +
                  ' -> ' +
                  Q.jednostka +
                  '\nDostępność: ' +
                  (1 == Y.dostępny ? 'tak' : 'nie') +
                  ' -> ' +
                  (1 == Q.dostępny ? 'tak' : 'nie') +
                  '```'
              ),
              e.player.getStoreddata().remove('e_skladnik'),
              gui2(e, !1))
          : e.player.message(
              '[§cAdmin§f] §7Nie znaleziono parametrów! Wszystkie pola muszą być zapełnione!'
            )
        : e.player.message(
            '[§cAdmin§f] §7Zacznij od nowa! Nie znaleziono starych parametrów'
          );
    case 262:
      return (Q = {
        nazwa: e.gui.getComponent(11).getText(),
        typ: e.gui.getComponent(19).getText(),
        jednostka: e.gui.getComponent(17).getText(),
        cena: e.gui.getComponent(13).getText(),
        ilosc: e.gui.getComponent(15).getText(),
        dostępny: e.gui.getComponent(21).getText(),
      }).nazwa &&
        Q.typ &&
        Q.jednostka &&
        Q.cena &&
        Q.ilosc
        ? Q.nazwa.length <= 2 ||
          Q.typ.length <= 2 ||
          Q.jednostka.length < 1 ||
          isNaN(parseFloat(Q.cena)) ||
          Q.ilosc < 1
          ? e.player.message('[§cAdmin§f] §7Za małe wartości!')
          : -1 ==
            ['Bazy wodne', 'Nieorganiczne', 'Zwierzęce', 'Roślinne'].indexOf(
              Q.typ
            )
          ? e.player.message('[§cAdmin§f] §7Wpisano nieodpowiedni typ!')
          : (ee = addSkladnik(
              Q.nazwa,
              Q.typ,
              Q.cena,
              Q.ilosc,
              Q.jednostka,
              Q.dostępny
            )).error
          ? e.player.message('[§cDebugger§f] §7Error: ' + ee.error)
          : (e.player.message('[§cAdmin§f] §7Dodano nowy składnik:'),
            e.player.message('§6Nazwa: §a' + Q.nazwa),
            e.player.message('§6Typ: §a' + Q.typ),
            e.player.message('§6Cena: §a' + Q.cena),
            e.player.message('§6Ilość: §a' + Q.ilosc),
            e.player.message('§6Jednostka: §a' + Q.jednostka),
            e.player.message('§6Dostępność: §a' + Q.dostępny),
            post(
              !0,
              e.player.getName() +
                ' Dodał składnik: \n```Nazwa: ' +
                Q.nazwa +
                '\nTyp: ' +
                Q.typ +
                '\nCena: ' +
                Q.cena +
                '\nIlość: ' +
                Q.ilosc +
                '\nJednostka: ' +
                Q.jednostka +
                '\nDostępność: ' +
                (1 == Q.dostępny ? 'tak' : 'nie') +
                '```'
            ),
            gui2(e, !1))
        : e.player.message(
            '[§cAdmin§f] §7Nie znaleziono parametrów! Wszystkie pola muszą być zapełnione!'
          );
    case 264:
    case 263:
      var Q;
      if (
        !(
          (Q = {
            nazwa: e.gui.getComponent(11).getText(),
            kolor: e.gui.getComponent(19).getText() || 'brak',
            hex: e.gui.getComponent(13).getText() || '35c2de',
            zapach: e.gui.getComponent(15).getText() || 'brak',
            smak: e.gui.getComponent(17).getText() || 'brak',
            czas: e.gui.getComponent(21).getText() || '60',
            data: e.gui.getComponent(23).getText() || 14,
            inokreacja: e.gui.getComponent(25).getText(),
            pcena: e.gui.getComponent(31).getText(),
          }).nazwa &&
          Q.kolor &&
          Q.zapach &&
          Q.smak &&
          Q.czas &&
          Q.data &&
          Q.inokreacja
        )
      )
        return e.player.message('[§cAdmin§f] §7Nie uzupełniono czegoś!');
      if (Q.hex.indexOf('#') > -1)
        return e.player.message('[§cAdmin§f] §7Hex Kolor posiada symbol #');
      if (263 == e.buttonId) {
        var X = e.player.getTempdata().get('e_eliksir');
        return X
          ? ((X = JSON.parse(X)),
            (ee = updateEliksir(X.nazwa, Q)).error
              ? e.player.message('[§cDebugger§f] §7Error: ' + ee.error)
              : (e.player.message('[§cAdmin§f] §7Edytowano Eliksir:'),
                e.player.message('§6Nazwa: §c' + X.nazwa + '§7 | §a' + Q.nazwa),
                e.player.message('§6Kolor: §c' + X.kolor + '§7 | §a' + Q.kolor),
                e.player.message('§6Hex: §c' + X.hex + '§7 | §a' + Q.hex),
                e.player.message(
                  '§6Zapach: §c' + X.zapach + '§7 | §a' + Q.zapach
                ),
                e.player.message('§6Smak: §c' + X.smak + '§7 | §a' + Q.smak),
                e.player.message('§6Czas: §c' + X.czas + '§7 | §a' + Q.czas),
                e.player.message('§6Data: §c' + X.data + '§7 | §a' + Q.data),
                e.player.message(
                  '§6Inokreacja: §c' + X.inokreacja + '§7 | §a' + Q.inokreacja
                ),
                e.player.message(
                  '§6P.cena: §c' + X.pcena + '§7 | §a' + Q.pcena
                ),
                post(
                  !0,
                  e.player.getName() +
                    ' Zmienił eliksir: \n```Nazwa: ' +
                    X.nazwa +
                    ' -> ' +
                    Q.nazwa +
                    '\nKolor: ' +
                    X.kolor +
                    ' -> ' +
                    Q.kolor +
                    '\nHex: ' +
                    X.hex +
                    ' -> ' +
                    Q.hex +
                    '\nZapach: ' +
                    X.zapach +
                    ' -> ' +
                    Q.zapach +
                    '\nSmak: ' +
                    X.smak +
                    ' -> ' +
                    Q.smak +
                    '\nCzas: ' +
                    X.czas +
                    ' -> ' +
                    Q.czas +
                    '\nData: ' +
                    X.data +
                    ' -> ' +
                    Q.data +
                    '\nInokreacja: ' +
                    X.inokreacja +
                    ' -> ' +
                    Q.inokreacja +
                    '\nP.cena: ' +
                    X.pcena +
                    ' -> ' +
                    Q.pcena +
                    '```'
                ),
                e.player.getTempdata().remove('e_eliksir'),
                gui2(e, !1)))
          : e.player.message('[§cAdmin§f] §7Wybierz eliksir ponownie!');
      }
      var $ = getEliksir({ nazwa: Q.nazwa });
      return $.result > 0
        ? e.player.message(
            '[§cAdmin§f] §7Istnieje eliksir o takiej/podobnej nazwie: ' +
              $.result[0].nazwa
          )
        : (ee = addEliksir(
            Q.nazwa,
            Q.kolor,
            Q.hex,
            Q.zapach,
            Q.smak,
            Q.data,
            Q.czas,
            Q.inokreacja,
            Q.pcena
          )).error
        ? e.player.message('[§cDebugger§f] §7Error: ' + ee.error)
        : (e.player.message('[§cAdmin§f] §7Dodano nowy Eliksir:'),
          e.player.message('§6Nazwa: §a' + Q.nazwa),
          e.player.message('§6Kolor: §a' + Q.kolor),
          e.player.message('§6Hex: §a' + Q.hex),
          e.player.message('§6Zapach: §a' + Q.zapach),
          e.player.message('§6Smak: §a' + Q.smak),
          e.player.message('§6Czas: §a' + Q.czas),
          e.player.message('§6Data: §a' + Q.data),
          e.player.message('§6Inokreacja: §a' + Q.inokreacja),
          e.player.message('§6P.cena: §a' + Q.pcena),
          post(
            !0,
            e.player.getName() +
              ' Dodał eliksir: \n```Nazwa: ' +
              Q.nazwa +
              '\nKolor: ' +
              Q.kolor +
              '\nHex: ' +
              Q.hex +
              '\nZapach: ' +
              Q.zapach +
              '\nSmak: ' +
              Q.smak +
              '\nCzas: ' +
              Q.czas +
              '\nData: ' +
              Q.data +
              '\nInokreacja: ' +
              Q.inokreacja +
              '\nP.cena: ' +
              Q.pcena +
              '```'
          ),
          gui2(e, !1));
    case 265:
      return (Y = e.player.getStoreddata().get('e_skladnik'))
        ? ((Y = JSON.parse(Y)),
          (ee = getSkladnik({ nazwa: Y.nazwa })).error
            ? e.player.message('[§cDebugger§f] §7Error: ' + ee.error)
            : ee.result[0].nazwa && ee.result[0].nazwa == Y.nazwa
            ? (ae = removeSkladnik(Y.nazwa)).error
              ? e.player.message('[§cDebugger§f] §7Error: ' + ae.error)
              : (e.player.message(
                  '[§cAdmin§f] §7Usunięto składnik: §c' + Y.nazwa
                ),
                e.player.getStoreddata().remove('e_skladnik'),
                post(!0, e.player.getName() + ' Usunął składnik: ' + Y.nazwa),
                gui2(e, !1))
            : e.player.message(
                '[§cAdmin§f] §7Nie ma składnika, lub znaleziono jedynie podobny.'
              ))
        : e.player.message(
            '[§cAdmin§f] §7Nie znaleziono składnika, wejdź jeszcze raz!'
          );
    case 266:
      var ee, ae;
      return (Y = e.player.getTempdata().get('e_eliksir'))
        ? ((Y = JSON.parse(Y)),
          (ee = getEliksir({ nazwa: Y.nazwa })).error
            ? e.player.message('[§cDebugger§f] §7Error: ' + ee.error)
            : 0 == ee.result.length
            ? e.player.message('[§cAdmin§f] §7Nie ma takiego eliksiru w bazie!')
            : (ae = removeEliksir(Y.nazwa)).error
            ? e.player.message('[§cDebugger§f] §7Error: ' + ae.error)
            : (e.player.message('[§cAdmin§f] §7Usunięto eliksir: §c' + Y.nazwa),
              e.player.getTempdata().remove('e_eliksir'),
              post(!0, e.player.getName() + ' Usunął Eliksir: ' + Y.nazwa),
              gui2(e, !1)))
        : e.player.message(
            '[§cAdmin§f] §7Nie znaleziono Eliksiru, wejdź jeszcze raz!'
          );
    case 301:
    case 302:
    case 303:
    case 304:
      a = e.gui.getComponent(e.buttonId).getLabel().split('§7')[1];
      gui6(e, a);
      break;
    case 420:
      return gui10(e, 'day');
    case 424:
      o = e.gui.getComponent(423).getText();
      return gui10(e, 'day', o);
    case 600:
    case 601:
    case 602:
      var te = e.gui.getComponent(e.buttonId + 104).getText(),
        re = e.gui.getComponent(2).getText(),
        ne =
          e.gui.getComponent(e.buttonId + 103).getText() || te.split('/').pop();
      if (
        (e.player.message(
          'Pobieranie: ' + ne + ' czekaj na wiadomość zwrotną. Brak = błąd.'
        ),
        -1 == ne.indexOf('.'))
      )
        return e.player.message(
          '[§cDebugger§f] §7Nie znaleziono formatu pliku'
        );
      try {
        JavaDownloadFileFromURL(te, re, e.player, ne);
      } catch (a) {
        return e.player.message('[§4Debugger§f] §cError: ' + a);
      }
      (o = ang(
        '**' +
          e.player.getName() +
          '** Pobrał plik na serwer (`Hapel`): \n<' +
          te +
          '>\n`' +
          (re + ne) +
          '`'
      )),
        (u = passes.hooks.dev);
      HTTP.post(u, { content: o, tts: !1 });
      var ie = e.gui.getComponent(1).getText();
      return gui13(e, ie);
    case 609:
      var se = e.gui.getComponent(1).getText();
      return se
        ? gui13(e, se, 'list')
        : e.player.message('[§cDebugger§f] §7Brak opcji!');
    case 620:
    case 621:
    case 622:
      if (!(o = e.gui.getComponent(10).getText()))
        return e.player.message('[§cDebugger§f] §7Nie Znaleziono ścieżki!');
      try {
        if (!(pe = new java.io.File(o)) || !pe.exists() || !pe.isFile())
          return e.player.message('[§cDebugger§f] §7Nie znaleziono pliku!');
        pe.renameTo(new java.io.File(re));
        (q = ang(
          '**' + e.player.getName() + '** Usunął plik (`Hapel`):\n`' + o + '`'
        )),
          (u = passes.hooks.dev);
        HTTP.post(u, { content: q, tts: !1 });
      } catch (a) {
        return e.player.message('[§cDebugger§f] §7' + a);
      }
      e.player.message('[§cAdmin§f] §7Usunięto plik §c' + o);
      ie = e.gui.getComponent(1).getText();
      return gui13(e, ie);
    case 610:
    case 611:
    case 612:
      var oe = (re = (o = e.gui.getComponent(10).getText()).split('/')).pop(),
        ue = e.gui.getComponent(e.buttonId + 95).getText();
      if (!ue) return e.player.message('[§cDebugger§f] §7Nie podano nazwy!');
      try {
        var pe;
        if (!(pe = new java.io.File(o)) || !pe.exists() || !pe.isFile())
          return e.player.message('[§cDebugger§f] §7Nie znaleziono pliku!');
        re.push(ue), (re = re.join('/')), pe.renameTo(new java.io.File(re));
        (o = ang(
          '**' +
            e.player.getName() +
            '** zmienił nazwę pliku (`Hapel`):\n`' +
            re +
            '`\n`' +
            oe +
            '` -> `' +
            ue +
            '`'
        )),
          (u = passes.hooks.dev);
        HTTP.post(u, { content: o, tts: !1 });
      } catch (a) {
        return e.player.message('[§cDebugger§f] §7' + a);
      }
      e.player.message(
        '[§cAdmin§f] §7Zmieniono nazwę pliku: §c' + oe + ' §7-> §a' + ue
      );
      ie = e.gui.getComponent(1).getText();
      return gui13(e, ie);
    case 724:
      var de = e.player.world.getStoreddata(),
        ge = ((O = e.player.world.getTempdata()), de.get('grupy'));
      return (
        (ge = JSON.parse(ge) || {}),
        Object.keys(ge).length,
        O.put('globalG', JSON.stringify(Object.keys(ge))),
        gui16(e, !0, 'group')
      );
    case 725:
      (de = e.player.world.getStoreddata()),
        (O = e.player.world.getTempdata()),
        (ge = de.get('sciezki'));
      return (
        (ge = JSON.parse(ge) || []),
        O.put('globalP', JSON.stringify(ge)),
        gui16(e, !0, 'path')
      );
    case 701:
      return gui16(e, !0, 'create');
    case 903:
      return gui16(e, !0);
    case 913:
      return gui7(e, !0);
    case 914:
      return gui6(e);
    case 915:
      return gui8(e, !0);
    case 916:
      return gui9(e);
    case 918:
      return gui9(e, !0);
    case 919:
      return gui9(e, !0, '', !0);
    case 991:
      gui1(e);
      break;
    case 992:
      gui1(e, !0);
      break;
    case 993:
      gui11(e);
  }
}
function customGuiScroll(e) {
  switch (e.scrollId) {
    case 1:
    case 2:
    case 951:
    case 952:
      if (!e.doubleClick) return;
      if (
        !(o = e.selection[0].split('(')[1].replace(')', '').replace(/§./g, ''))
      )
        return e.player.message('Nie ma id');
      if ((r = getOczekujace({ id: o })).error)
        return e.player.message('[§cDebugger§f] §7Error: ' + r.error);
      r = r.result[0];
      var a = e.scrollId % 10 == 1 ? 'oczekujace' : 'zweryfikowane';
      (r.przepis = JSON.parse(r.przepis)),
        e.scrollId > 950 ? gui4(e, r, o, a, !0) : gui4(e, r, o, a);
      break;
    case 3:
      u = (u = e.selection[0]).split(' / ');
      var t = e.player.world.getStoreddata().get('karty');
      if (((t = JSON.parse(t) || {}), 0 == Object.keys(t).length))
        return (
          e.player.message('[§cAdmin§f] §7Nie można było załadować kart!'),
          gui12(e)
        );
      var r = t[u[0]][u[1]];
      return (
        e.player
          .getTempdata()
          .put('edit', JSON.stringify([r.name, r.numer, r.opis])),
        e.player.getTempdata().put('remove', JSON.stringify(u)),
        gui12(e, !1, 'remove')
      );
    case 4:
      u = (u = e.selection[0]).split(' / ');
      t = e.player.world.getStoreddata().get('karty');
      if (((t = JSON.parse(t) || {}), 0 == Object.keys(t).length))
        return (
          e.player.message('[§cAdmin§f] §7Nie można było załadować kart!'),
          gui12(e)
        );
      r = t[u[0]][u[1]];
      (y = e.player.world.createItem(
        'hapeladdons:kartaczarodziei_' + u[0],
        0,
        1
      )).setCustomName('§cKarta Czarodziejów §b' + t[u[0]][u[1]].name);
      for (
        var n = ['§aRzadkość: §d' + u[0], '§aNumer: §f' + t[u[0]][u[1]].numer],
          i = 0;
        i < t[u[0]][u[1]].opis.length;
        i++
      )
        n.push(t[u[0]][u[1]].opis[i]);
      return (
        y.setLore(n),
        (k = y.getNbt()).setInteger('id', t[u[0]][u[1]].numer),
        k.setString('rarity', u[0]),
        e.player.dropItem(y).setOwner(e.player.getName()),
        gui12(e)
      );
    case 5:
      u = (u = e.selection[0]).split(' / ');
      t = e.player.world.getStoreddata().get('karty');
      if (((t = JSON.parse(t) || {}), 0 == Object.keys(t).length))
        return (
          e.player.message('[§cAdmin§f] §7Nie można było załadować kart!'),
          gui12(e)
        );
      r = t[u[0]][u[1]];
      return (
        e.player
          .getTempdata()
          .put(
            'edit',
            JSON.stringify({
              typ: u[0],
              nazwa: r.name,
              opis: r.opis.join('//'),
            })
          ),
        e.player.getTempdata().put('edit_i', JSON.stringify(u)),
        gui12(e, !1, 'edit')
      );
    case 11:
      if (!e.doubleClick) return;
      var s = (o = e.gui.getComponent(39)).getHoverText()[0];
      return o.setHoverText([s, e.selection[0]]), void e.gui.update(e.player);
    case 21:
      var o = e.gui.getComponent(9).getText().split(' ')[1],
        u = e.selection[0],
        p = e.player.world.getStoreddata().get('Eliksiry');
      (p = JSON.parse(p)),
        e.player.getTempdata().put('current', JSON.stringify(p[u])),
        gui5(e, o, p[u]);
      break;
    case 91:
      if (!e.doubleClick) return;
      var d = e.selection[0],
        g = getSkladnik({ nazwa: d });
      return g.result && !g.error
        ? (e.player
            .getStoreddata()
            .put('e_skladnik', JSON.stringify(g.result[0])),
          gui7(e, !1, g.result[0]))
        : e.player.message('[§cAdmin§f] §7Error! ' + g.error);
    case 92:
      if (!e.doubleClick) return;
      var c = e.selection[0],
        l = getEliksir({ nazwa: c });
      return l.error
        ? e.player.message('[§cDebugger§f] §7Error: ' + l.error)
        : 0 == l.result.length
        ? e.player.message(
            '[§cDebugger§f] §7Error: Nie znaleziono eliksiru w bazie!'
          )
        : (l.result.length > 1 &&
            e.player.message(
              '[§cAdmin§f] §7Uwaga! Znaleziono więcej niż 1 eliksir, wybrany został 1: ' +
                l.result[0].nazwa
            ),
          e.player.getTempdata().put('e_eliksir', JSON.stringify(l.result[0])),
          gui8(e, !1, l.result[0]));
    case 93:
    case 94:
      if (!e.doubleClick) return;
      c = e.selection[0];
      if ((r = getEliksir({ nazwa: c })).error)
        return e.player.message('[§cDebugger§f] §7Error: ' + r.error);
      if (0 == r.result.length)
        return e.player.message(
          '[§cDebugger§f] §7Error: Nie znaleziono eliksiru w bazie!'
        );
      if (((r = r.result[0]), 93 == e.scrollId)) {
        var m = (w = new Date(Date.now() + 864e5 * r.data)).getTime();
        m = m.toString(16).split('').reverse().join('');
        n = [
          '§5Kolor: §a' + r.kolor,
          '§5Zapach: §a' + r.zapach,
          '§5Smak: §a' + r.smak,
          '',
          '§cData ważności:§7 ' + m,
        ];
        (y = e.player.world.createItem('minecraft:potion', 0, 1)).setCustomName(
          '§eTajemniczy Eliksir'
        ),
          y.setLore(n),
          (k = y.getNbt()).setString('Eliksir', r.nazwa),
          k.setString('Czas', r.czas),
          k.setString('Inokreacja', r.inokreacja),
          k.setLong('Data', w.getTime()),
          k.setLong('CustomPotionColor', parseInt(r.hex, 16) || 3093151),
          k.setInteger('HideFlags', 37),
          e.player.dropItem(y).setOwner(e.player.getName());
      } else if (94 == e.scrollId) {
        var y, k;
        (y = e.player.world.createItem(
          'variedcommodities:letter',
          0,
          1
        )).setCustomName('§cKupon na eliksir: §a' + c),
          y.setLore([
            '§7**Przepustka pozwala odebrać gotowy eliksir',
            '§7Bez potrzeby płacenia za składniki**',
          ]),
          (k = y.getNbt()).setString('createdBy', e.player.getName()),
          e.player.dropItem(y).setOwner(e.player.getName());
      }
      return gui2(e, !1);
    case 232:
    case 235:
    case 236:
      if (!e.doubleClick) return;
      o = e.selection[0].split('.')[0];
      var z = getCennik({ id: o });
      return z.error
        ? e.player.message('[§cDebugger§f] §7Error: ' + z.error)
        : ((z = z.result[0]),
          e.player.getTempdata().put('cennikWer', JSON.stringify(z)),
          236 == e.scrollId
            ? gui15(e, 'Lista ticketów', z)
            : 232 == e.scrollId
            ? gui14(e, 'Weryfikacja', z)
            : gui14(e, 'Edytowanie', z));
    case 422:
      if (!e.doubleClick) return;
      o = e.selection[0].split('§a')[0].replace(/\s/g, '').replace(/§./g, '');
      var w = e.selection[0].split('§d')[1].replace(/§../g, ''),
        b = e.selection[0].split('|')[1].replace(/§./g, ''),
        x = restoreBag(o, w);
      return x.error
        ? e.player.message('[§cDebugger§f] §7Error: ' + x.error)
        : (post(
            !0,
            e.player.getName() +
              ' Przywrócił plecak: **' +
              o +
              '** z dnia *' +
              b +
              '*'
          ),
          e.player.message('[§cPlecaki§f] §7Przywrócono kopię plecaka!'),
          gui10(e, 'person', !1));
    case 600:
    case 601:
    case 602:
      if (!e.doubleClick) return;
      var T = e.selection[0],
        f = e.gui.getComponent(2).getText(),
        v = e.gui.getComponent(1).getText();
      return T && f
        ? gui13(e, v, !1, f + T)
        : e.player.message('[§cDebugger§f] §7Coś poszło nie tak!');
  }
}
function customGuiSlot(e) {
  if (0 == e.slotId) {
    var a = e.stack;
    if (!a || a.getName().toLowerCase().indexOf('air') > -1)
      return e.player.message('[§cDebugger§f] §7Error: brak itemu!');
    var t = a.getItemNbt(),
      r = e.player.getTempdata();
    if (!r.has('cennikWer'))
      return e.player.message(
        '[§cDebugger§f] §7Spróbuj ponownie, nie widzę id weryfikowanego.'
      );
    r.has('cennikItem') && e.player.message('[§cCennik§f] §7Nadpisuję item!');
    var n = JSON.parse(r.get('cennikWer'));
    return (
      (n.item = escapeString(t.toJsonString())),
      r.put('cennikItem', n.item),
      e.player.message('[§cCennik§f] §7Dodano Item! §e' + a.getDisplayName()),
      gui14(e, 'Weryfikacja', n)
    );
  }
}
function keyPressed(e) {
  return 1 == e.isAltPressed && 33 == e.key
    ? server.getPlayer(e.player.getName()).hasPermission('maxbans.ban')
      ? gui1(e)
      : e.player.message("[§cAdmin§f] §7Thou shan't use this command!")
    : 1 == e.isAltPressed && 34 == e.key
    ? gui1(e, !0)
    : void 0;
}
function copyLore(e) {
  for (var a = [], t = 0; t < e.length; t++) a.push(e[t]);
  return a;
}
function post(e, a) {
  var t,
    r = a;
  (r = ang(r)),
    (t = e
      ? 'https://discordapp.com/api/webhooks/744260426770022501/yDs_1o0CjdPTWOkeT0vLfintmcJBNuoCxNfWJDHmPKczhrZ8_vWwH7nFdG-PizufyuCx'
      : 'https://discordapp.com/api/webhooks/730401458813665312/hMvfOnZ4jye7K9G8jNegC-r34zydsUa7GKRo-k_odPrE1E136TVEcsfup1rI0MculmUa'),
    HTTP.post(t, { content: r, tts: !1 });
}
