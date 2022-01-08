var npc;
function baseGui(e, r) {
  var a = e.API.createCustomGui(1, 256, 256, !1);
  return (
    'add' == r
      ? a.setBackgroundTexture('customnpcs:textures/gui/inve.png')
      : a.setBackgroundTexture('customnpcs:textures/gui/stdbg.png'),
    a.addLabel(9, '§1Dystrybutor przepisów', 90, 30, 130, 20),
    a
  );
}
function init(e) {
  npc = e.npc;
}
function interact(e) {
  return npc || (npc = e.npc), menu(e);
}
function menu(e) {
  var r = baseGui(e);
  if (
    (r.addButton(1, '§2Dodaj przepis', 40, 120, 80, 20),
    r.addButton(2, '§6Przepisy', 140, 120, 80, 20),
    r.addButton(3, 'Wystaw ocenę', 90, 150, 80, 20),
    npc)
  ) {
    var a = npc.getStoreddata(),
      t = JSON.parse(a.get('wyplaty')) || {};
    t[e.player.getName()] &&
      r
        .addButton(303, '§cWypłać kasę', 10, 200, 80, 20)
        .setHoverText([
          '§7Atkualnie możesz otrzymać: ',
          '§e' + t[e.player.getName()],
        ]);
  }
  return e.player.showCustomGui(r), r;
}
function dodajPrzepis(e, r) {
  var a;
  if ('eliksir' == r) {
    a = baseGui(e);
    var t = getEliksir();
    if (t.error)
      return e.player.message(
        '[§cDebugger§f] §7Error, pisz do administracji! ' + error
      );
    t = t.result;
    for (var i = [], s = 0; s < t.length; s++) i.push(t[s].nazwa);
    a.addScroll(52, 10, 55, 230, 160, i);
  } else
    (a = baseGui(e, 'add'))
      .addTextField(11, 90, 62, 40, 20)
      .setHoverText([
        '§7Cena przepisu w knutach',
        '§7Musi być wyrażone w liczbie całkowitej, w przeciwnym razie zostanie zaokrąglone do najbliższej liczby.',
        '§7Przykładowo:',
        '§c25',
      ])
      .setText('0'),
      a.addItemSlot(100, 20).setHoverText(['§7Włóż tutaj item z przepisem']),
      a.showPlayerInventory(8, 113),
      a
        .addButton(201, '§a✍', 200, 62, 20, 20)
        .setHoverText(['§7Zapisz', '§7Po kliknięciu wybierz Eliksir.']),
      a
        .addButton(901, '§c✖', 213, 185, 20, 20)
        .setHoverText(['§7Powrót do menu głównego']);
  return e.player.showCustomGui(a), a;
}
function kupPrzepis(e, r) {
  var a = baseGui(e);
  a
    .addLabel(10, '§2[I]', 240, 30, 20, 20)
    .setHoverText(['§7Kliknij raz na listę aby wyświetlić info.']),
    a
      .addButton(11, '§6Informacje', 185, 230, 70, 20)
      .setHoverText([
        '§7Kliknij aby przełączyć między trybem:',
        '§cInformacje §7i §cKupowanie §7i §cUsuń',
      ]),
    a.addTextField(15, 85, 230, 90, 20),
    a.addButton(16, '§bSzukaj', 5, 230, 70, 20);
  var t = [];
  if (r) t = r;
  else {
    var i = getPrzepis();
    if (i.error) return e.player.message('[§cDebugger§f] §7Error! ' + i.error);
    i = i.result;
    for (var s = ['★', '◯'], n = 0; n < i.length; n++)
      t.push(
        i[n].id +
          '. [' +
          i[n].autor +
          '] ' +
          i[n].eliksir +
          ' §6' +
          i[n].cena +
          ' §e' +
          s[0].repeat(i[n].ocena) +
          s[1].repeat(5 - i[n].ocena)
      );
  }
  return (
    a.addScroll(22, 10, 55, 230, 160, t), e.player.showCustomGui(a), baseGui(e)
  );
}
function wystawOcene(e) {
  var r = baseGui(e, 'add');
  return (
    r
      .addTextField(11, 90, 62, 40, 20)
      .setHoverText([
        '§7Ocena przepisu',
        '§7Musi być wyrażone w liczbie całkowitej.',
        '§7Przedział <1;5>',
        '§c4',
      ])
      .setText('5'),
    r.addItemSlot(100, 20).setHoverText(['§7Włóż tutaj item z przepisem']),
    r.showPlayerInventory(8, 113),
    r
      .addButton(202, '§a✍', 200, 62, 20, 20)
      .setHoverText(['§7Zapisz', '§7Po kliknięciu wybierz Eliksir.']),
    r
      .addButton(901, '§c✖', 213, 185, 20, 20)
      .setHoverText(['§7Powrót do menu głównego']),
    e.player.showCustomGui(r),
    baseGui(e)
  );
}
function customGuiButton(e) {
  switch (e.buttonId) {
    case 1:
      return dodajPrzepis(e);
    case 2:
      return kupPrzepis(e);
    case 3:
      return wystawOcene(e);
    case 901:
      return menu(e);
    case 11:
      var r = e.gui.getComponent(e.buttonId),
        a = r.getLabel().replace(/§./g, ''),
        t = ['Informacje', 'Kupowanie', 'Usuń'];
      1 == e.player.getGamemode() && t.push('Admin');
      var i = t.indexOf(a);
      return -1 == i
        ? e.player.message('[§cDebugger§f] §7Coś poszło nie tak!')
        : (i == t.length - 1 ? (i = 0) : i++,
          (P = t[i]),
          r.setLabel('§6' + P),
          e.gui.update(e.player),
          e.player.message('[§cPrzepisy§f] §7Zmieniono tryb na §e' + P + '!'));
    case 16:
      var s = e.gui.getComponent(15).getText();
      if (!s || 0 == s.length) return kupPrzepis(e);
      s = s.toLowerCase();
      try {
        for (
          var n = e.gui.getComponent(22).getList(),
            o = (n = Java.from(n)).length,
            p = [],
            u = 0;
          u < o;
          u++
        )
          n[u].toLowerCase().indexOf(s) > -1 && p.push(n[u]);
        return kupPrzepis(e, p);
      } catch (r) {
        return e.player.message('[§cDebugger§f] §eError:§7 ' + r);
      }
    case 201:
      var c = e.gui.getComponent(11).getText();
      return (c = parseInt(parseFloat(c))) < 0 || c > 99999 || isNaN(c)
        ? e.player.message('[§cPrzepisy§f] §7Podano niepoprawną cenę. ' + c)
        : (l = e.player.getTempdata()).has('przepis')
        ? (y = JSON.parse(l.get('przepis')) || {}).item
          ? ((y.cena && y.cena == c) || (y.cena = c),
            y.autor || (y.autor = e.player.getName()),
            l.put('przepis', JSON.stringify(y)),
            e.player.message('[§cPrzepisy§f] §7OK, cena: §e' + c),
            dodajPrzepis(e, 'eliksir'))
          : e.player.message(
              '[§cPrzepisy§f] §7Nie znaleziono itemu! Włóż na chwilę przepis do okienka!'
            )
        : e.player.message(
            '[§cPrzepisy§f] §7Dodaj najpierw przepis do okienka. Możesz go zaraz wyciągnać po otrzymaniu informacji.'
          );
    case 202:
      var l,
        y,
        g = e.gui.getComponent(11).getText();
      if ((g = parseInt(parseFloat(g))) < 1 || g > 5 || isNaN(g))
        return e.player.message(
          '[§cPrzepisy§f] §7Podano niepoprawną ocenę: §e' + g
        );
      if (!(l = e.player.getTempdata()).has('przepis'))
        return e.player.message(
          '[§cPrzepisy§f] §7Dodaj najpierw przepis do okienka. Możesz go zaraz wyciągnać po otrzymaniu informacji.'
        );
      if (!(y = JSON.parse(l.get('przepis')) || {}).item)
        return e.player.message(
          '[§cPrzepisy§f] §7Nie znaleziono itemu! Włóż na chwilę przepis do okienka!'
        );
      try {
        var m = getPrzepis({ item: y.item });
        if (!m || m.error)
          return e.player.message('[§cDebugger§f] §7Error: ' + m.error);
        if (0 == m.result.length)
          return e.player.message(
            '[§cDebugger§f] §7Nie ma takiego przepisu u dystrybutora!'
          );
        if ((m = m.result[0]).autor == e.player.getName())
          return e.player.message(
            '[§cDebugger§f] §7Nie możesz dodać oceny do własnego przepisu!'
          );
        m.oceny || (m.oceny = '{}');
        var d = JSON.parse(m.oceny) || {};
        if (d[e.player.getName()])
          return e.player.message(
            '[§cPrzepisy§f] §7Już wystawiłeś ocenę na ten przepis!'
          );
        d[e.player.getName()] = g;
        var z = 0,
          f = Object.keys(d);
        for (u = 0; u < f.length; u++) z += d[f[u]];
        (m.ocena = parseInt(z / f.length)),
          e.API.executeCommand(
            e.player.world,
            'dcdpm ' +
              m.autor +
              ' Dostałeś nową ocęnę na eliksir: `' +
              m.eliksir +
              '`, Ocena: **' +
              g +
              '**. Nowa średnia: **' +
              m.ocena +
              '**'
          ),
          (m.oceny = JSON.stringify(d));
        var w = updatePrzepis(m.id, { ocena: m.ocena, oceny: m.oceny });
        if (w.error)
          return e.player.message('[§cDebugger§f] §eError: §7' + w.error);
      } catch (r) {
        e.player.message('[§cDebugger§f] §eError: §7' + r);
      }
      return e.player.message('[§cPrzepisy§f] §7Dodano ocenę: §e' + g), menu(e);
    case 303:
      if (npc) {
        var k = npc.getStoreddata(),
          b = JSON.parse(k.get('wyplaty')) || {};
        if (b[e.player.getName()]) {
          c = b[e.player.getName()];
          if (1 != (P = payPlayer(e.player.getName(), c)))
            return e.player.message('[§cDebugger§f] §7Error: ' + P);
          delete b[e.player.getName()], k.put('wyplaty', JSON.stringify(b));
          var P =
            '**' +
            e.player.getName() +
            '** odebrał wypłatę za przepisy:  **' +
            c +
            '** knutów!';
          return (
            (P = ang(P)),
            HTTP.post(passes.hooks.przepisy, { content: P, tts: !1 }),
            e.player.message(
              '[§cPrzepisy§f] §7Odebrałeś wypłatę za przepisy: §e' + c
            ),
            menu(e)
          );
        }
        return e.player.message(
          '[§cPrzepisy§f] §7Coś poszło nie tak, może już odebrałeś?'
        );
      }
      return e.player.message('[§cPrzepisy§f] §7Brak zmiennej!');
  }
}
function customGuiScroll(e) {
  switch (e.scrollId) {
    case 22:
      var r = e.gui.getComponent(11).getLabel().replace(/§./g, '');
      if ('Kupowanie' == r || 'Admin' == r || 'Usuń' == r) {
        var a = e.selection[0],
          t = parseInt(a.split('.')[0]),
          i = a.split('[')[1].split(']')[0];
        if ('Usuń' == r) {
          if (
            i == e.player.getName() ||
            Permission.has(e.player.getName(), 'litebans.ban')
          ) {
            var s = removePrzepis(t);
            return s.error
              ? e.player.message('[§cDebugger§f] §7Error: ' + s.error)
              : e.player.message(
                  '[§cPrzepisy§f] §7Usunięto przepis o id: §e' + t
                );
          }
          return e.player.message(
            '[§cPrzepisy§f] §7Nie możesz usunąć tego przepisu!'
          );
        }
        if ((d = getPrzepis({ id: t })).error)
          return e.player.message('[§cDebugger§f] §7Error: ' + d.error);
        if (
          ((d = d.result[0]),
          'Admin' == r || wallet(e.player.getName()) >= d.cena)
        ) {
          if (
            !(c = 'Admin' == r || requestPayment(e.player.getName(), d.cena)) ||
            'boolean' != typeof c
          )
            return e.player.message('[§cPrzepisy§f] §7Coś poszło nie tak!');
          if (
            (npc ||
              e.player.message(
                '[§cDebugger§f] §7Dzwoń po adminów, brak zmiennej!'
              ),
            'Admin' != r)
          ) {
            var n = npc.getStoreddata(),
              o = JSON.parse(n.get('wyplaty')) || {};
            o[d.autor]
              ? (o[d.autor] += parseInt(0.9 * d.cena))
              : (o[d.autor] = parseInt(0.9 * d.cena)),
              n.put('wyplaty', JSON.stringify(o));
            var p = e.player.world.getStoreddata(),
              u = parseFloat(p.get('MMVat')) || 0;
            (u += 0.1 * d.cena), p.put('MMVat', u);
            var c =
              '**' +
              e.player.getName() +
              '** Kupił przepis *' +
              d.id +
              '* !\n```Autor: ' +
              d.autor +
              ' \nEliksir: ' +
              d.eliksir +
              ' \nCena: ' +
              d.cena +
              ' \n```';
            (c = ang(c)),
              HTTP.post(passes.hooks.przepisy, { content: c, tts: !1 }),
              e.API.executeCommand(
                e.player.world,
                'dcdpm ' +
                  d.autor +
                  ' Ktoś kupił twój przepis na: `' +
                  d.eliksir +
                  '` za: **' +
                  d.cena +
                  '**. Możesz odebrać: **' +
                  o[d.autor] +
                  '**'
              );
          }
          var l = e.player.world.createItemFromNbt(e.API.stringToNbt(d.item));
          return (
            (c = e.player.dropItem(l))
              ? c.setOwner(e.player.getName())
              : e.player.message(
                  '[§cPrzepisy§f] §7Nie udało się ustawić ownera na dropitem!'
                ),
            e.player.message(
              '[§cPrzepisy§f] §7Zakupiono przepis na §c' +
                d.eliksir +
                ' §7Gracza §a' +
                d.autor +
                ' §7za §e' +
                d.cena
            )
          );
        }
        return e.player.message(
          '[§cPrzepisy§f] §7Masz za mało kasy: §e' + d.cena
        );
      }
      var y = e.gui.getComponent(10),
        g =
          ((a = e.selection[0]),
          (t = parseInt(a.split('.')[0])),
          (i = a.split('[')[1].split(']')[0]),
          parseInt(a.split('§6')[1].split(' ')[0])),
        m = a.split('§e')[1],
        d = a.split('] ')[1].split(' §6')[0];
      return (
        y.setHoverText([
          '§7Kliknij raz na listę aby wyświetlić info.',
          '§7id: §c' + t,
          '§7Autor: §a' + i,
          '§7Eliksir: §b' + d,
          '§7Cena: §e' + g + ' knutów',
          '§7Ocena: §6' + m,
        ]),
        e.gui.update(e.player)
      );
    case 52:
      if (!e.doubleClick) return;
      d = e.selection[0];
      var z = e.player.getTempdata(),
        f = JSON.parse(z.get('przepis')) || {};
      if (((f.eliksir = d), f.eliksir && f.item && f.autor && f.cena)) {
        if ((c = addPrzepis(f)).error)
          return e.player.message('[§cPrzepisy§f] §7Error! ' + c.error);
        (z = e.player.getTempdata()).remove('przepis');
        c =
          'Nowy przepis!\n```Autor: ' +
          f.autor +
          ' \nEliksir: ' +
          f.eliksir +
          ' \nCena: ' +
          f.cena +
          ' \n```';
        return (
          (c = ang(c)),
          HTTP.post(passes.hooks.przepisy, { content: c, tts: !1 }),
          e.player.message(
            '[§cPrzepisy§f] §7Dodano przepis: { §aAutor§7: §e' +
              f.autor +
              '§7, §aEliksir§7: §e' +
              f.eliksir +
              '§7, §aCena§7: §e' +
              f.cena +
              '§7, §aItem§7: §etak§7 }'
          ),
          menu(e)
        );
      }
      return e.player.message(
        '[§cPrzepisy§f] §7Zabrakło danych, spróbuj ponownie!'
      );
  }
}
function customGuiSlot(e) {
  if (0 == e.slotId) {
    var r = e.stack;
    if (-1 == r.getName().indexOf('minecraft:book'))
      return e.player.message('[§cPrzepisy§f] §7Niepoprawny item');
    if (!r.getNbt().has('przepis'))
      return e.player.message('[§cPrzepisy§f] §7Książka nie ma przepisu!');
    var a = e.player.getTempdata(),
      t = JSON.parse(a.get('przepis')) || {};
    return t.item
      ? e.player.message(
          '[§cPrzepisy§f] §7Jest już dodany item! Dokończ dodawanie lub relognij.'
        )
      : ((t.item = escapeString(r.getItemNbt().toJsonString())),
        t.autor || (t.autor = e.player.getName()),
        a.put('przepis', JSON.stringify(t)),
        e.player.message(
          '[§cPrzepisy§f] §7Dodano Item! Wyciągnij go zanim przejdziesz dalej, bo stracisz przepis.'
        ));
  }
}
