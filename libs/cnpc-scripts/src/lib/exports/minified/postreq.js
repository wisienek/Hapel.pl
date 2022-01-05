var URL = Java.type('java.net.URL'),
  HttpURLConnection = Java.type('java.net.HttpURLConnection'),
  BufferedReader = Java.type('java.io.BufferedReader'),
  DataOutputStream = Java.type('java.io.DataOutputStream'),
  InputStreamReader = Java.type('java.io.InputStreamReader'),
  SString = Java.type('java.lang.String'),
  HTTP = {
    get: function (e, t) {
      var a = new URL(e).openConnection();
      a.setRequestMethod('GET'),
        a.setRequestProperty('User-Agent', 'Mozilla/5.0');
      for (
        var r,
          n = a.getResponseCode(),
          p = new BufferedReader(new InputStreamReader(a.getInputStream())),
          o = '';
        null != (r = p.readLine());

      )
        o = o + r + '\n';
      switch ((p.close(), print(o), t)) {
        case 'application/json':
          o = cson_parse(o);
      }
      return { success: 200 === n, data: o, reponseCode: n };
    },
    post: function (e, t) {
      var a,
        r,
        n = new URL(e).openConnection();
      n.setDoInput(!0),
        n.setDoOutput(!0),
        n.setInstanceFollowRedirects(!1),
        n.setRequestMethod('POST'),
        n.setRequestProperty('Content-Type', 'application/json; utf-8'),
        n.setRequestProperty('User-Agent', 'Mozilla/5.0');
      try {
        a = n.getOutputStream();
        var p = new DataOutputStream(a);
        p.writeBytes(new SString(JSON.stringify(t))),
          p.flush(),
          p.close(),
          a.close();
      } catch (e) {}
      var o = null;
      try {
        r = new BufferedReader(
          new InputStreamReader(n.getInputStream(), 'UTF-8')
        );
        for (var c = '', l = null; null != (l = r.readLine()); ) c += l.trim();
        o = JSON.parse(c.toString());
      } catch (e) {}
      return n.disconnect(), o;
    },
  };
function ang(e) {
  return (e = e
    .replace(/ą/g, 'a')
    .replace(/Ą/g, 'A')
    .replace(/ć/g, 'c')
    .replace(/Ć/g, 'C')
    .replace(/ę/g, 'e')
    .replace(/Ę/g, 'E')
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'L')
    .replace(/ń/g, 'n')
    .replace(/Ń/g, 'N')
    .replace(/ó/g, 'o')
    .replace(/Ó/g, 'O')
    .replace(/ś/g, 's')
    .replace(/Ś/g, 'S')
    .replace(/ż/g, 'z')
    .replace(/Ż/g, 'Z')
    .replace(/ź/g, 'z')
    .replace(/Ź/g, 'Z')
    .replace(/§/g, '&'));
}
