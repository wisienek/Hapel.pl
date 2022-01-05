var API = Java.type('noppes.npcs.api.NpcAPI').Instance();

function getPrefix(api, name) {
  if (!name || !api) {
    return 'Too few parameters!';
  }
  var x = API.executeCommand(API.getIWorlds()[0], 'whois ' + name);
  if (x.indexOf('Błąd') > -1) return 'Player offline';
  x = x.split(name)[1].split(':')[1];
  return x;
}

function getDiscord(api, name) {
  var dcid = API.executeCommand(API.getIWorlds()[0], 'dcdid ' + name) || '';
  dcid = dcid.replace('\n', '').replace(/\s/g, '');
  dcid = dcid || '';
  return dcid;
}

function br(api, msg) {
  if (!msg) return 'Too few parameters!';
  return API.executeCommand(API.getIWorlds()[0], 'broadcast ' + msg);
}

function sudo(api, playerName, command) {
  if (!playerName || !command) return 'Too few parameters!';
  if (command.split(' ')[0].indexOf('/') > -1) return 'Slash in command!';
  return API.executeCommand(
    API.getIWorlds()[0],
    'sudo ' + playerName + ' ' + command
  );
}

function sudoOP(api, command) {
  if (!api || !command) return false;
  return API.executeCommand(API.getIWorlds()[0], command);
}
