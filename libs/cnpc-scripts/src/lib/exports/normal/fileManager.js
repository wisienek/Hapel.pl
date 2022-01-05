function saveJsonFile(path, data) {
  if (!path) {
    return;
  }
  if (!data) {
    return false;
  }
  resolveDir(path);
  var writer = new java.io.FileWriter(path);
  writer.write(JSON.stringify(data, null, 2));
  writer.close();
  return true;
}

function deleteFiles(fileName) {
  var file = new java.io.File(fileName);
  if (!file.exists()) {
    return true;
  }
  if (file.isDirectory()) {
    if (file.list().length == 0) {
      file.delete();
      return true;
    } else {
      var files = file.list();
      for (var i = 0; i < files.length; i++) {
        var tempFile = files[i];
        var fileDelete = new java.io.File(file, tempFile);
        fileDelete.delete();
      }
      if (file.list().length == 0) {
        file.delete();
        return true;
      }
      return false;
    }
  } else {
    file.delete();
    return true;
  }
}

function copyFileTo(file, to) {
  var Files = Java.type('java.nio.file.Files');
  var f = new java.io.File(file);
  if (!f.exists()) {
    return false;
  }
  if (f.isDirectory()) {
    return false;
  }
  var t = new java.io.File(to);

  Files.copy(f.toPath(), t.toPath());

  return true;
}

function loadTextFile(path) {
  if (!path) {
    return;
  }
  var f = new java.io.File(path);
  if (!f.exists() || !f.isFile()) {
    return false;
  }
  var ips = new java.io.FileInputStream(path);
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
  return start1;
}

function loadJsonFile(path) {
  if (!path) {
    return;
  }
  var f = new java.io.File(path);
  if (!f.exists() || !f.isFile()) {
    return {};
  }
  var ips = new java.io.FileInputStream(path);
  var fileReader = new java.io.InputStreamReader(ips, 'UTF-8');

  var data1 = fileReader.read();
  var data;
  var start1 = '';
  while (data1 != -1) {
    data = String.fromCharCode(data1);
    start1 += data;
    data1 = fileReader.read();
  }
  ips.close();
  if (start1.length == 0) {
    return {};
  }
  return JSON.parse(start1);
}

function resolveDir(path) {
  path = path.split('/');
  path.pop();
  path = path.join('/');
  return dirCreator(path);
}

function listFilesInDir(path) {
  if (!path) {
    return;
  }
  var f = new java.io.File(path);
  if (f.exists() && f.isDirectory()) {
    var x = f.listFiles();
    return x;
  }
}

function listFoldersInDir(path) {
  if (!path) {
    return 'No path!';
  }
  var f = new java.io.File(path);
  if (f.exists() && f.isDirectory()) {
    var x = f.listFiles();
    var y = [];
    for (var i = 0; i < x.length; i++) {
      if (x[i].isDirectory()) {
        y.push(x[i]);
      }
    }
    return y;
  }
}

function fileExtension(fileName) {
  if (!fileName) {
    return 'No filename';
  }
  var v = fileName.split('.');
  return typeof v == 'string' ? '' : v[v.length - 1];
}

function dirCreator(path) {
  if (!path) {
    return;
  }
  var f = new java.io.File(path);
  if (!f.exists()) {
    f.mkdirs();
    print('Created Dir path: ' + path);
    return true;
  }
  return false;
}
