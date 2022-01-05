function interact(e) {
  var sc = e.player.world.getScoreboard();
  var data = e.player.world.getStoreddata();
  var cz = sc.addTeam('Pomidorki');
  var zi = sc.addTeam('Kaktusy');
  var nb = sc.addTeam('Smerfy');
  var zl = sc.addTeam('Galeoniarze');
  cz.setColor('red');
  cz.setFriendlyFire(false);
  data.put('Pomidorki', 0);
  zi.setColor('green');
  zi.setFriendlyFire(false);
  data.put('Kaktusy', 0);
  nb.setColor('blue');
  nb.setFriendlyFire(false);
  data.put('Smerfy', 0);
  zl.setColor('yellow');
  zl.setFriendlyFire(false);
  data.put('Galeoniarze', 0);
}
