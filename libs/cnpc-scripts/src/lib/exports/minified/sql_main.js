var conn = Java.type('java.sql.Connection'),
  DriverManager = Java.type('java.sql.DriverManager'),
  slqe = Java.type('java.sql.SQLException'),
  urlp = 'jdbc:mysql://195.78.66.161:3306/em411_cnpc';
function addEliksir(e, a, r, n, t, i, o, s, u, c) {
  return e && a && r && n && t && i && o && s
    ? sqlPut(
        'INSERT INTO Eliksiry (nazwa, kolor, hex, zapach, smak, data, czas, inokreacja' +
          (u ? ', pcena' : '') +
          ' ' +
          (c ? ', "' + c + '"' : '') +
          ') VALUES ("' +
          e +
          '", "' +
          a +
          '", "' +
          r +
          '", "' +
          n +
          '", "' +
          t +
          '", "' +
          i +
          '", "' +
          o +
          '", "' +
          s +
          '" ' +
          (u ? ', "' + u + '"' : '') +
          ' ' +
          (c ? ', "' + c + '"' : '') +
          '); '
      )
    : {
        error:
          'Bad argument! nazwa, args {nazwa: varchar 80, kolor: varchar 45, hex: varchar 10, zapach,smak: varchar 120, czas: varchar 45, inokreacja: varchar 256, pcena: int 10, ile: int10}',
      };
}
function updateEliksir(e, a) {
  if ('object' != typeof a || 0 == Object.keys(a).length)
    return {
      error:
        'Bad argument! nazwa, args {nazwa: varchar 80, kolor: varchar 45, hex: varchar 10, zapach,smak: varchar 120, czas: varchar 45, inokreacja: varchar 256, pcena: int 10, ile: tinyInt (4)}',
    };
  for (
    var r = Object.keys(a), n = 'UPDATE Eliksiry SET ', t = 0;
    t < r.length;
    t++
  )
    (n += r[t] + ' = "' + escapeString(a[r[t]]) + '"'),
      t != r.length - 1 && (n += ', ');
  return sqlPut((n += 'WHERE nazwa="' + escapeString(e) + '";'));
}
function getEliksir(e) {
  var a = 'SELECT * FROM Eliksiry ';
  return (
    e &&
      (e.nazwa
        ? (a += "WHERE nazwa='" + escapeString(e.nazwa) + "' ")
        : e.nazwal &&
          (a += "WHERE nazwa LIKE '%" + escapeString(e.nazwal) + "%' ")),
    sqlGet((a += 'ORDER BY nazwa ASC;'))
  );
}
function removeEliksir(e) {
  return e
    ? sqlPut("DELETE FROM Eliksiry WHERE nazwa='" + escapeString(e) + "'; ")
    : { error: 'No arguments: nazwa (varchar)' };
}
function addSkladnik(e, a, r, n, t, i) {
  return e && a && r && n && t
    ? ((i = i || 1),
      sqlPut(
        'INSERT INTO Składniki (nazwa, typ, cena, ilosc, jednostka, dostępny) VALUES ("' +
          escapeString(e) +
          '", "' +
          a +
          '", "' +
          r +
          '", "' +
          n +
          '", "' +
          t +
          '", "' +
          i +
          '"); '
      ))
    : {
        error:
          'bad argument! nazwa (varchar 80), typ (varchar 45), cena (float), ilosc (int 11), jednostka (varchar 10), dostępny (bool)',
      };
}
function updateSkladnik(e, a) {
  if ('object' != typeof a || 0 == Object.keys(a).length)
    return {
      error:
        'No arguments! {nazwa, typ, jednostka: string | cena: float, ilosc: int, dostępny: boolean}',
    };
  for (
    var r = Object.keys(a), n = 'UPDATE Składniki SET ', t = 0;
    t < r.length;
    t++
  )
    (n += r[t] + ' = "' + escapeString(a[r[t]]) + '" '),
      t != r.length - 1 && (n += ', ');
  return sqlPut((n += 'WHERE nazwa="' + e + '";'));
}
function removeSkladnik(e) {
  return e
    ? sqlPut("DELETE FROM Składniki WHERE nazwa='" + escapeString(e) + "'; ")
    : { error: 'No arguments: nazwa (varchar)' };
}
function getSkladnik(e) {
  var a = 'SELECT * FROM Składniki ';
  return (
    e &&
      (e.typ
        ? (a += 'WHERE typ="' + e.typ + '" ')
        : e.nazwa &&
          (a += "WHERE nazwa LIKE '%" + escapeString(e.nazwa) + "%' ")),
    sqlGet((a += 'ORDER BY nazwa ASC;'))
  );
}
function getOczekujace(e) {
  var a = 'SELECT * FROM Oczekujące ';
  if (e) {
    a += 'WHERE ';
    var r = [];
    e.gracz && r.push('gracz="' + escapeString(e.gracz) + '" '),
      e.discord && r.push('discord="' + e.discord + '" '),
      e.eliksir && r.push("eliksir LIKE '%" + escapeString(e.eliksir) + "%' "),
      e.cena && r.push('cena > ' + e.cena + ' '),
      e.id && r.push('id="' + e.id + '" '),
      (e.weryfikowane || 0 == e.weryfikowane) &&
        r.push('weryfikowane=' + e.weryfikowane + ' '),
      (1 != e.odebrane && 0 != e.odebrane) ||
        r.push('odebrane = ' + e.odebrane + ' '),
      (a += r.join('AND '));
  }
  return sqlGet((a += 'ORDER BY cena ASC;'));
}
function updateOczekujace(e, a) {
  if (!e || !a)
    return {
      error:
        'Arguments; id<varchar>, args{ odebrane (0/1), weryfikowane(3- czeka, 1- ok, 2- odrzucone) }',
    };
  var r = [],
    n = 'UPDATE Oczekujące SET ';
  return (
    (a.odebrane || 0 == a.odebrane) && r.push('odebrane = ' + a.odebrane + ' '),
    a.data_odebrania && r.push('data_odebrania="' + a.data_odebrania + '" '),
    a.weryfikowane && r.push('weryfikowane = ' + a.weryfikowane + ' '),
    a.ile && r.push('pile = ' + a.ile + ' '),
    a.data && r.push('pdata = "' + a.data + '" '),
    (n += r.join(', ')),
    sqlPut((n += 'WHERE id="' + e + '"; '))
  );
}
function addOczekujace(e, a, r, n, t, i, o, s) {
  if (!(e && a && r && n && i)) return { error: 'Złe argumenty!' };
  var u = [
    'id, eliksir, gracz, uuid, przepis',
    '"' + e + '", "' + a + '", "' + r + '", "' + n + '", "' + i + '"',
  ];
  return (
    t && ((u[0] += ', discord'), (u[1] += ', "' + t + '"')),
    o && ((u[0] += ', cena'), (u[1] += ', "' + o + '"')),
    s && ((u[0] += ', kociołek'), (u[1] += ', "' + s + '"')),
    sqlPut('INSERT INTO Oczekujące (' + u[0] + ') VALUES (' + u[1] + '); ')
  );
}
function removeOczekujace(e) {
  return e
    ? sqlPut("DELETE FROM Oczekujące WHERE id='" + e + "'; ")
    : { error: 'No arguments: id (varchar)' };
}
function addZlane(e, a, r) {
  return e && a
    ? sqlPut(
        'INSERT INTO Zlane (id, json, data) VALUES ("' +
          e +
          '", "' +
          a +
          '", "' +
          (r = r || Date.now()) +
          '"); '
      )
    : { error: 'bad argument! (nazwa, json, data)' };
}
function getZlane(e) {
  var a = 'SELECT * FROM Zlane ';
  return e && (a += "WHERE id='" + e + "';"), sqlGet(a);
}
function updatePrzepis(e, a) {
  if (!e || !a || 'object' != typeof a)
    return { error: 'Bad arguments: (id, {...args})' };
  var r = 'UPDATE przepisy SET ',
    n = Object.keys(a);
  if (0 == n.length)
    return {
      error:
        'Not enough arguments! {autor: playerName, eliksir: eliksirName, item: itemNBT, oceny: {ocena: int<1;5>, opis: string}, ocena: avg(oceny.ocena), cena: int }',
    };
  for (var t = [], i = 0; i < n.length; i++)
    t.push(n[i] + " = '" + a[n[i]] + "' ");
  return sqlPut((r += (t = t.join(', ')) + " WHERE id='" + e + "'; "));
}
function addPrzepis(e) {
  if ('object' != typeof e)
    return {
      error:
        'Argument has to be an object! {item: itemNBT, autor: playerName, cena: int, eliksir: potionName }',
    };
  if (!(e.item && e.autor && e.cena && e.eliksir))
    return { error: 'Bad arguments!' };
  for (var a = Object.keys(e), r = '', n = 0; n < a.length; n++)
    0 != n && n != a.length && (r += ', '), (r += ' "' + e[a[n]] + '" ');
  return sqlPut(
    'INSERT INTO przepisy(' + a.join(', ') + ') VALUES (' + r + ');'
  );
}
function removePrzepis(e) {
  return e
    ? sqlPut("DELETE FROM przepisy WHERE id='" + e + "';")
    : { error: 'No id!' };
}
function getPrzepis(e) {
  var a = 'SELECT * FROM przepisy ',
    r = [];
  return (
    e && e.id && r.push("id='" + e.id + "' "),
    e && e.eliksir && r.push("eliksir='" + e.eliksir + "' "),
    e && e.autor && r.push("autor='" + e.autor + "' "),
    e && e.item && r.push("item='" + e.item + "' "),
    e && r.length > 0 && (a += 'WHERE ' + (r = r.join(' AND ')) + ' '),
    sqlGet((a += 'ORDER BY ocena DESC, cena ASC, eliksir ASC;'))
  );
}
function updateCennik(e, a) {
  if (!e || !a || 'object' != typeof a)
    return { error: 'Bad arguments: (id, {...args})' };
  var r = 'UPDATE cennik SET ',
    n = Object.keys(a);
  if (0 == n.length)
    return {
      error:
        'Not enough arguments! {item: itemNBT, nazwa: varchar(120), cena: int >= 0, dostępne: boolean, sale: int <0;100>, monly: boolean, msale: int <0;100> }',
    };
  for (var t = [], i = 0; i < n.length; i++)
    t.push(n[i] + " = '" + a[n[i]] + "' ");
  return sqlPut((r += (t = t.join(', ')) + " WHERE id='" + e + "'; "));
}
function addCennik(e) {
  if ('object' != typeof e)
    return {
      error:
        'Argument has to be an object! {item: itemNBT, nazwa: varchar(120), cena: int >= 0, dostępne: boolean, sale: int <0;100>, monly: boolean, msale: int <0;100> }',
    };
  for (var a = Object.keys(e), r = '', n = 0; n < a.length; n++)
    0 != n && n != a.length && (r += ', '), (r += ' "' + e[a[n]] + '" ');
  return sqlPut('INSERT INTO cennik(' + a.join(', ') + ') VALUES (' + r + ');');
}
function getCennik(e) {
  var a = 'SELECT * FROM cennik ',
    r = [];
  return (
    e.id && r.push("id='" + e.id + "' "),
    e.nazwa && r.push("nazwa='" + e.nazwa + "' "),
    e.cena && r.push('cena ' + e.cena + ' '),
    e.sale && r.push("sale >= '" + e.dostępne + "' "),
    e.msale && r.push("msale >= '" + e.msale + "' "),
    e.tagi && r.push("tagi LIKE '%" + e.tagi + "%' "),
    e.autor && r.push("autor='" + e.autor + "' "),
    (e.monly || 0 == e.monly) && r.push("monly='" + e.monly + "' "),
    (e.dostępne || 0 == e.dostępne) && r.push("dostępne='" + e.dostępne + "' "),
    e && Object.keys(e).indexOf('wer') > -1 && r.push("wer='" + e.wer + "' "),
    e && r.length > 0 && (a += 'WHERE ' + (r = r.join(' AND ')) + ' '),
    sqlGet((a += 'ORDER BY cena ASC, sale DESC, msale DESC, monly ASC;'))
  );
}
function removeCennik(e) {
  return e
    ? sqlPut("DELETE FROM cennik WHERE id='" + e + "';")
    : { error: 'No id!' };
}
function getBag(e) {
  var a = 'SELECT * FROM main';
  e && (a += " WHERE id='" + e + "';");
  var r = sqlGet(a);
  return (r = e ? r.result[0] : r.result);
}
function getTop() {
  var e = sqlGet('SELECT id FROM main ORDER BY id DESC LIMIT 1;');
  return (e = e.result[0].id || 0);
}
function saveBag(e, a, r, n) {
  return (
    n || (n = getTop()),
    sqlPut(
      'INSERT INTO main(id, uuid, nazwa, itemy, aktualizacja) VALUES(' +
        n +
        ", '" +
        e +
        "', '" +
        a +
        "', '" +
        r +
        "', " +
        Date.now() +
        ');'
    )
  );
}
function updateBag(e, a) {
  return a
    ? sqlPut(
        "UPDATE main SET itemy = '" +
          e +
          "', aktualizacja = " +
          Date.now() +
          ' WHERE id = ' +
          a +
          ';'
      )
    : 'No id!';
}
function updateName(e, a, r) {
  return e
    ? sqlPut(
        "UPDATE main SET nazwa = '" +
          a +
          "', uuid = '" +
          r +
          "' WHERE id = " +
          e +
          ';'
      )
    : 'No id!';
}
function saveBagCopy(e) {
  if (e) {
    var a = !0,
      r = null;
    try {
      var n = getBag(e);
      if (!n) return 'Nie ma w bazie!';
      r = DriverManager.getConnection(
        urlp,
        passes.sql_main.login,
        passes.sql_main.pwd
      );
      var t =
          'INSERT INTO kopie (id, uuid, nazwa, itemy, data) VALUES(' +
          e +
          ', "' +
          n.uuid +
          '", "' +
          n.nazwa +
          '", (SELECT itemy FROM main WHERE id="' +
          e +
          '"), ' +
          n.aktualizacja +
          ');',
        i = r.createStatement();
      i.executeUpdate(t);
      i.close();
    } catch (e) {
      print(e), (a = !1);
    } finally {
      if (null != r)
        try {
          r.close();
        } catch (e) {}
    }
    return a;
  }
}
function restoreBag(e, a) {
  return e && a
    ? sqlPut(
        "UPDATE main SET itemy = (SELECT itemy FROM kopie WHERE id='" +
          e +
          "' AND data='" +
          a +
          "'), aktualizacja='" +
          Date.now() +
          "' WHERE serial= (SELECT serial FROM main WHERE id='" +
          e +
          "'); "
      )
    : { error: 'no id or date' };
}
function getCopiedBagIds() {
  var e = null,
    a = [];
  try {
    e = DriverManager.getConnection(
      urlp,
      passes.sql_main.login,
      passes.sql_main.pwd
    );
    for (
      var r = e.createStatement(),
        n = r.executeQuery('SELECT id, data FROM kopie;');
      n.next();

    ) {
      var t = n.getInt('id'),
        i = n.getLong('data');
      a.push({ id: t, data: i });
    }
    r.close();
  } catch (e) {
    print(e);
  } finally {
    if (null != e)
      try {
        e.close();
      } catch (e) {}
  }
  return a;
}
function getBagCopies(e) {
  if (!e) return 'Brak id!';
  var a = null,
    r = [];
  try {
    a = DriverManager.getConnection(
      urlp,
      passes.sql_main.login,
      passes.sql_main.pwd
    );
    for (
      var n = 'SELECT * FROM kopie where id=' + e,
        t = a.createStatement(),
        i = t.executeQuery(n);
      i.next();

    ) {
      e = i.getInt('id');
      var o = i.getString('uuid'),
        s = i.getString('nazwa'),
        u = i.getString('itemy'),
        c = i.getLong('data');
      r.push({ id: e, uuid: o, nazwa: s, itemy: JSON.parse(u), data: c });
    }
    t.close();
  } catch (e) {
    print(e);
  } finally {
    if (null != a)
      try {
        a.close();
      } catch (e) {}
  }
  return r;
}
function sqlGet(e) {
  if (!e) return { error: 'No querry!' };
  var a = null,
    r = {};
  try {
    var n = (a = DriverManager.getConnection(
        urlp,
        passes.sql_main.login,
        passes.sql_main.pwd
      )).createStatement(),
      t = n.executeQuery(e);
    (r.result = rsToJson(t)), n.close();
  } catch (e) {
    r.error = e;
  } finally {
    if (null != a)
      try {
        a.close();
      } catch (e) {}
  }
  return r;
}
function sqlPut(e) {
  if (!e) return { error: 'No querry!' };
  var a = null,
    r = {};
  try {
    var n = (a = DriverManager.getConnection(
      urlp,
      passes.sql_main.login,
      passes.sql_main.pwd
    )).createStatement();
    n.executeUpdate(e);
    (r.result = !0), n.close();
  } catch (e) {
    r.error = e;
  } finally {
    if (null != a)
      try {
        a.close();
      } catch (e) {}
  }
  return r;
}
function rsToJson(e) {
  for (var a = [], r = e.getMetaData(), n = r.getColumnCount(); e.next(); ) {
    for (var t = {}, i = 1; i <= n; i++) {
      var o = r.getColumnName(i),
        s = e.getObject(o);
      t[o] = null == s ? '' : s;
    }
    a.push(t);
  }
  return a;
}
