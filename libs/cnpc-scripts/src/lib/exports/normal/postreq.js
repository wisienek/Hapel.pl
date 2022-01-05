var URL = Java.type("java.net.URL");
var HttpURLConnection = Java.type("java.net.HttpURLConnection");
var BufferedReader = Java.type("java.io.BufferedReader");
var DataOutputStream = Java.type("java.io.DataOutputStream");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var SString = Java.type("java.lang.String");
 
var HTTP = {
    get: function(url, contentType) {
        var obj = new URL(url);
        var con = obj.openConnection();
 
        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
 
        var responseCode = con.getResponseCode();
 
        var input = new BufferedReader(new InputStreamReader(con.getInputStream()));
        var inputLine;
        var response = "";
        while ((inputLine = input.readLine()) != null) {
            response = response + inputLine+"\n";
        }
        input.close();
        print(response);
 
        switch(contentType) {
            case "application/json":
                response = cson_parse(response);
                break;
        }
 
        return {"success": responseCode === 200, "data": response, "reponseCode": responseCode};
    },
    post: function(url, data) {
        var obj = new URL(url);
        var con = obj.openConnection();
        con.setDoInput(true);
        con.setDoOutput(true);
        con.setInstanceFollowRedirects( false );
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json; utf-8");  
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
 
        var os;
        try {
            os = con.getOutputStream();
            var writer = new DataOutputStream(os);
            writer.writeBytes(new SString(JSON.stringify(data)));
            writer.flush();
            writer.close();      
            os.close();
        } catch(exc) {
            //print("problem:" +exc);
        }
        var br;
        var res = null;
        try {
            br = new BufferedReader(
                new InputStreamReader(con.getInputStream(), "UTF-8")
            );
            var response = '';
            var responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response += responseLine.trim();
            }
            res = JSON.parse(response.toString());
        } catch(exc) {
            //print("problem:" +exc);
        }
        con.disconnect();
 
        return res;
    }
}

function ang(txt){
    txt = txt.replace(/ą/g, 'a').replace(/Ą/g, 'A')
    .replace(/ć/g, 'c').replace(/Ć/g, 'C')
    .replace(/ę/g, 'e').replace(/Ę/g, 'E')
    .replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .replace(/ń/g, 'n').replace(/Ń/g, 'N')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ś/g, 's').replace(/Ś/g, 'S')
    .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
    .replace(/ź/g, 'z').replace(/Ź/g, 'Z')
    .replace(/§/g, '&');
    return txt;
}