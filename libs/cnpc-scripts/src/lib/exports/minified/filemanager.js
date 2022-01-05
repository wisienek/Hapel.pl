function saveJsonFile(e, i) {
  if (e) {
    if (!i) return !1;
    resolveDir(e);
    var r = new java.io.FileWriter(e);
    return r.write(JSON.stringify(i, null, 2)), r.close(), !0;
  }
}
function deleteFiles(e) {
  var i = new java.io.File(e);
  if (!i.exists()) return !0;
  if (i.isDirectory()) {
    if (0 == i.list().length) return i.delete(), !0;
    for (var r = i.list(), t = 0; t < r.length; t++) {
      var a = r[t];
      new java.io.File(i, a).delete();
    }
    return 0 == i.list().length && (i.delete(), !0);
  }
  return i.delete(), !0;
}
function copyFileTo(e, i) {
  var r = Java.type('java.nio.file.Files'),
    t = new java.io.File(e);
  if (!t.exists()) return !1;
  if (t.isDirectory()) return !1;
  var a = new java.io.File(i);
  return r.copy(t.toPath(), a.toPath()), !0;
}
function loadTextFile(e) {
  if (e) {
    var i = new java.io.File(e);
    if (!i.exists() || !i.isFile()) return !1;
    for (
      var r = new java.io.FileInputStream(e),
        t = new java.io.InputStreamReader(r, 'UTF-8'),
        a = t.read(),
        n = '';
      -1 != a;

    )
      (n += String.fromCharCode(a)), (a = t.read());
    return r.close(), n;
  }
}
function loadJsonFile(e) {
  if (e) {
    var i = new java.io.File(e);
    if (!i.exists() || !i.isFile()) return {};
    for (
      var r = new java.io.FileInputStream(e),
        t = new java.io.InputStreamReader(r, 'UTF-8'),
        a = t.read(),
        n = '';
      -1 != a;

    )
      (n += String.fromCharCode(a)), (a = t.read());
    return r.close(), 0 == n.length ? {} : JSON.parse(n);
  }
}
function resolveDir(e) {
  return (e = e.split('/')).pop(), dirCreator((e = e.join('/')));
}
function listFilesInDir(e) {
  if (e) {
    var i = new java.io.File(e);
    if (i.exists() && i.isDirectory()) return i.listFiles();
  }
}
function listFoldersInDir(e) {
  if (!e) return player.message('No path!');
  var i = new java.io.File(e);
  if (i.exists() && i.isDirectory()) {
    for (var r = i.listFiles(), t = [], a = 0; a < r.length; a++)
      r[a].isDirectory() && t.push(r[a]);
    return t;
  }
}
function dirCreator(e) {
  if (e) {
    var i = new java.io.File(e);
    return !i.exists() && (i.mkdirs(), print('Created Dir path: ' + e), !0);
  }
}
