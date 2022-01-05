function init(e) {
  e.npc.getTempData().put('punkty', loaddata(e.npc.getUUID()));
}
function interact(e) {}

function savedata(data) {
  var writer = new java.io.FileWriter('./npcpath.json');
  writer.write(JSON.stringify(data, null, 2));
  writer.close();
}

function loaddata(id) {
  var ips = new java.io.FileInputStream('./npcpath.json');
  var fileReader = new java.io.InputStreamReader(ips, 'UTF-8');
  var data1 = fileReader.read();
  var data;
  var start1 = '';
  while (data1 != -1) {
    data = String.fromCharCode(data1);
    start1 = start1 + data;
    data1 = fileReader.read();
  }
  ips.close();
  if (start1.length == 0) {
    start1 = '[]';
  }
  var data5 = JSON.parse(start1);
  if (data5[id]) {
    return data5[id];
  }
  return;
}
