var conn = Java.type('java.sql.Connection');
var DriverManager = Java.type('java.sql.DriverManager');
var slqe = Java.type('java.sql.SQLException');
var urlp = 'jdbc:mysql://sql.pukawka.pl/803395_plecaki';

function getBag(id) {
  var conn = null;
  var result = [];

  try {
    conn = DriverManager.getConnection(
      urlp,
      passes.sql_dev.login,
      passes.sql_dev.pwd
    );

    var query = 'SELECT * FROM main';
    if (id) {
      query += ' WHERE id=' + id + ';';
    }
    var st = conn.createStatement();
    var rs = st.executeQuery(query);

    while (rs.next()) {
      var id = rs.getInt('id');
      var uuid = rs.getString('uuid');
      var nazwa = rs.getString('nazwa');
      var itemy = rs.getString('itemy');
      var aktualizacja = rs.getLong('aktualizacja');

      result.push({
        id: id,
        uuid: uuid,
        nazwa: nazwa,
        itemy: JSON.parse(itemy),
        aktualizacja: aktualizacja,
      });
    }
    st.close();
  } catch (e) {
    print(e);
  } finally {
    if (conn != null) {
      try {
        conn.close();
      } catch (e) {
        /* ignore close errors */
      }
    }
  }

  return result;
}

function getTop() {
  var conn = null;
  var result;

  try {
    conn = DriverManager.getConnection(
      urlp,
      passes.sql_dev.login,
      passes.sql_dev.pwd
    );

    var query = 'SELECT id FROM main ORDER BY id DESC LIMIT 1;';
    var st = conn.createStatement();
    var rs = st.executeQuery(query);

    while (rs.next()) {
      result = rs.getInt('id');
    }
    st.close();
  } catch (e) {
    print(e);
    result = false;
  } finally {
    if (conn != null) {
      try {
        conn.close();
      } catch (e) {
        /* ignore close errors */
      }
    }
  }

  result = result || 0;

  return result;
}

function saveBag(uuid, nazwa, itemy, id) {
  if (!id) {
    id = getTop();
  }
  var result = true;
  var conn = null;
  var aktualizacja = Date.now();
  try {
    conn = DriverManager.getConnection(
      urlp,
      passes.sql_dev.login,
      passes.sql_dev.pwd
    );
    var query =
      'INSERT INTO main(id, uuid, nazwa, itemy, aktualizacja) VALUES(' +
      id +
      ", '" +
      uuid +
      "', '" +
      nazwa +
      "', '" +
      itemy +
      "', " +
      aktualizacja +
      ');';
    var st = conn.createStatement();
    var rs = st.executeUpdate(query);

    st.close();
  } catch (e) {
    print(e);
    result = false;
  } finally {
    if (conn != null) {
      try {
        conn.close();
      } catch (e) {
        /* ignore close errors */
      }
    }
  }

  return result;
}

function updateBag(itemy, id) {
  if (!id) {
    return 'No id!';
  }
  var result = true;
  var conn = null;
  var aktualizacja = Date.now();
  try {
    conn = DriverManager.getConnection(
      urlp,
      passes.sql_dev.login,
      passes.sql_dev.pwd
    );
    var query =
      "UPDATE main SET itemy = '" +
      itemy +
      "', aktualizacja = " +
      aktualizacja +
      ' WHERE id = ' +
      id +
      ';';
    var st = conn.createStatement();
    var rs = st.executeUpdate(query);

    st.close();
  } catch (e) {
    print(e);
    result = false;
  } finally {
    if (conn != null) {
      try {
        conn.close();
      } catch (e) {
        /* ignore close errors */
      }
    }
  }

  return result;
}

function saveBagCopy(id) {
  if (!id) {
    return 'Brak id!';
  }
  var result = true;
  var conn = null;
  try {
    var current = getBag(id);
    if (!current || current.length == 0) {
      return 'Nie ma w bazie!';
    }
    current = current[0];

    conn = DriverManager.getConnection(
      urlp,
      passes.sql_dev.login,
      passes.sql_dev.pwd
    );
    var query =
      'INSERT INTO kopie (id, uuid, nazwa, itemy, data) VALUES(' +
      id +
      ', "' +
      current.uuid +
      '", "' +
      current.nazwa +
      '", \'' +
      escapeString(
        JSON.stringify(current.itemy).replace(/    /g, '').replace(/\n/g, '')
      ) +
      "', " +
      current.aktualizacja +
      ');';
    var st = conn.createStatement();
    var rs = st.executeUpdate(query);

    st.close();
  } catch (e) {
    print(e);
    result = false;
  } finally {
    if (conn != null) {
      try {
        conn.close();
      } catch (e) {
        /* ignore close errors */
      }
    }
  }

  return result;
}
