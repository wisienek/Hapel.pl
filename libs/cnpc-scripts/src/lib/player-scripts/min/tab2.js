function pickUp(e) {}
function checkBags(e) {
  if (1 != e.player.getGamemode()) {
    var t = [];
    if (
      !(
        e.item &&
        e.item.getDisplayName().indexOf('Plecak.') > -1 &&
        e.item.getLore().length > 0 &&
        t.length > 0
      )
    ) {
      for (var a = e.player.getInventory().getItems(), r = 0; r < a.length; r++)
        a[r] &&
          a[r].getName() &&
          a[r].getDisplayName().indexOf('Plecak.') > -1 &&
          a[r].getLore().length > 0 &&
          t.push(a[r]);
      if (t.length > 1) {
        e.player.message(t.length);
        for (r = 1; r < t.length; r++)
          e.player.dropItem(
            e.player.world.createItemFromNbt(t[r].getItemNbt())
          ),
            t[r].setStackSize(0);
        e.player.message(
          '[§cPlecak§f] §7Nie możesz mieć więcej niż jeden plecak w eq!'
        );
      }
      return t.length;
    }
    e.setCanceled(!0);
  }
}
function containerClosed(e) {
  if (e.container) {
    var t = e.player.getStoreddata(),
      a = t.get('sejf'),
      r = t.get('plecak');
    if (e.container.getSize() - 37 != 9) {
      if (a) {
        for (
          var i = e.player.world.getBlock(a[0], a[1], a[2]).getStoreddata(),
            n = e.container.getSize() - 37,
            g = [],
            o = 0;
          o <= n;
          o++
        ) {
          -1 == (l = e.container.getSlot(o)).getName().indexOf('air') &&
            g.push([o, l.getItemNbt().toJsonString()]);
        }
        return i.put('itemy', JSON.stringify(g)), void t.remove('sejf');
      }
      if (r) {
        for (n = e.container.getSize() - 37, g = [], o = 0; o <= n; o++) {
          var l;
          if (-1 == (l = e.container.getSlot(o)).getName().indexOf('air')) {
            if ('hapeladdons:binder' == l.getName()) {
              e.player.giveItem(l),
                e.player.message(
                  '[§cPlecak§f] §7Nie możesz przechowywać klasera w plecaku!'
                );
              continue;
            }
            if (l.getDisplayName().indexOf('Plecak.') > -1) {
              var p = l.getLore();
              if (p.length > 0 && p[0].replace(/§./g, '') == r) {
                e.player.giveItem(l),
                  e.player.message(
                    '[§cPlecak§f] §7Nie możesz przechowywać plecaka w samym sobie!'
                  );
                continue;
              }
            }
            var c = l
              .getItemNbt()
              .toJsonString()
              .replace(/\s{2,}/g, '')
              .replace(/\n/g, '');
            g.push([o, c]);
          }
        }
        return (
          updateBag(escapeString(JSON.stringify(g)), r), void t.remove('plecak')
        );
      }
    }
  }
}
function logout(e) {
  var t = e.player.getStoreddata(),
    a = t.get('sejf'),
    r = t.get('plecak');
  if (a) {
    for (
      var i = e.player.world.getBlock(a[0], a[1], a[2]).getStoreddata(),
        n = e.player.getOpenContainer().getSize() - 37,
        g = [],
        o = 0;
      o <= n;
      o++
    ) {
      -1 ==
        (l = e.player.getOpenContainer().getSlot(o)).getName().indexOf('air') &&
        g.push([o, l.getItemNbt().toJsonString()]);
    }
    return i.put('itemy', JSON.stringify(g)), void t.remove('sejf');
  }
  if (r) {
    for (
      n = e.player.getOpenContainer().getSize() - 37, g = [], o = 0;
      o <= n;
      o++
    ) {
      var l;
      if (
        -1 ==
        (l = e.player.getOpenContainer().getSlot(o)).getName().indexOf('air')
      ) {
        if ('hapeladdons:binder' == l.getName()) {
          e.player.giveItem(l),
            e.player.message(
              '[§cPlecak§f] §7Nie możesz przechowywać klasera w plecaku!'
            );
          continue;
        }
        if (l.getDisplayName().indexOf('Plecak.') > -1) {
          var p = l.getLore();
          if (p.length > 0 && p[0].replace(/§./g, '') == r) {
            e.player.giveItem(l),
              e.player.message(
                '[§cPlecak§f] §7Nie możesz przechowywać plecaka w samym sobie!'
              );
            continue;
          }
        }
        var c = l
          .getItemNbt()
          .toJsonString()
          .replace(/\s{2,}/g, '')
          .replace(/\n/g, '');
        g.push([o, c]);
      }
    }
    return (
      updateBag(escapeString(JSON.stringify(g)), r), void t.remove('plecak')
    );
  }
}
