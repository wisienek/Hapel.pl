var db1 = Java.type('org.baito.h2access.H2Access').create(
  './plugins/LuckPerms/luckperms-h2.mv.db',
  'u90213_server',
  'I5p8G2k2'
);

function interact(e) {
  var rs = db1.query('SHOW TABLES;');
  e.player.message(rs);
  //if (rs.size() > 0) {
  while (rs.next()) {
    e.player.message(rs);
    break;
  }
  //}
}
