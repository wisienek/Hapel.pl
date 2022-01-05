function getPrefix(e, r) {
  if (!r || !e) return 'Too few parameters!';
  var t = e.executeCommand(e.getIWorlds()[0], 'whois ' + r);
  return t.indexOf('Błąd') > -1
    ? 'Player offline'
    : (t = t.split(r)[1].split(':')[1]);
}
function getDiscord(e, r) {
  var t = e.executeCommand(e.getIWorlds()[0], 'dcdid ' + r) || '';
  return (t = (t = t.replace('\n', '').replace(/\s/g, '')) || '');
}
function br(e, r) {
  return r
    ? e.executeCommand(e.getIWorlds()[0], 'broadcast ' + r)
    : 'Too few parameters!';
}
function sudo(e, r, t) {
  return r && t
    ? t.split(' ')[0].indexOf('/') > -1
      ? 'Slash in command!'
      : e.executeCommand(e.getIWorlds()[0], 'sudo ' + r + ' ' + t)
    : 'Too few parameters!';
}
function sudoOP(e, r) {
  return !(!e || !r) && e.executeCommand(e.getIWorlds()[0], r);
}
