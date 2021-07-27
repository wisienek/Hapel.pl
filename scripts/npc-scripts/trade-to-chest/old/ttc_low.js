/*! \file mmvat.js
*
* \brief CNCP script for Player's trader (vat only)
*
* Script made for MC server Hapel.pl
* Trader will get vat from products and store it in world data
*
* \author Wisienek
* \date 2019.12.23
* \version 1.02.24
*/
var owner = "Przesladowca";
function role(e) { 
    if(e.npc.getRole().getType() == 1) {
        if(e.sold.getStackSize()>0) { 
            if(e.receiving === undefined){
                var curr="";
                if(e.currency1){
                    curr+=e.currency1.getStackSize()+"x " + e.currency1.getDisplayName();
                    getCurr(e,e.currency1);
                }
                if(e.currency2){
                    if(curr.length>0){curr+=" "}
                      curr+=e.currency2.getStackSize()+"x " + e.currency2.getDisplayName();
                    getCurr(e,e.currency2);
                }
                executeCommand("traderlog " + e.player.getDisplayName() + " kupil " + e.sold.getStackSize() + "x " + e.sold.getDisplayName() + " za " + curr);
                /* 
                try{
                    var buy = e.sold.getStackSize()+"x "+e.sold.getDisplayName();
                    var x = e.player.getName()+" Kupił "+ buy +" Za "+curr;
                    x=ang(x);
                    HTTP.post(passes.hooks.mainLog,{
                        "content": x,
                        "tts": false,
                    });
                }
                catch(er){
                    print(er);
                }*/
            }else{
                return;
            }
        }
    }
}

//!Function that checks if item bought is currency
function getCurr(e,cur){
    var val;
    var name = cur.getDisplayName();
    if(name.indexOf("Knut")>-1){val=1}else
    if(name.indexOf("Sykl")){val=21}else
    if(name.indexOf("Galeon")){val=365}
    else{val=0}
    if(val>0){
        var data = e.npc.world.getStoreddata();
        var vatp = e.npc.world.getStoreddata().get("VatVal");
        var kasa = data.get("MMVat");
        kasa += val*cur.getStackSize()*vatp;
        data.put("MMVat", kasa);
        var p = e.npc.world.getPlayer("Przesladowca");
        if(p){
            p.message("[§cPodatnik§f] §7Pobrano vat z: §e"+val*cur.getStackSize()+"§7k ("+cur.getStackSize()*vatp+"), aktualny stan: §e"+kasa.toFixed(2)+"§7k");
        }
    }
    return;
}
function executeCommand(cmd) {
    var API = Java.type('noppes.npcs.api.NpcAPI').Instance();
    return API.createNPC(API.getIWorld(0).getMCWorld()).executeCommand(cmd);
}


var URL = Java.type("java.net.URL");
var HttpURLConnection = Java.type("java.net.HttpURLConnection");
var BufferedReader = Java.type("java.io.BufferedReader");
var DataOutputStream = Java.type("java.io.DataOutputStream");
var InputStreamReader = Java.type("java.io.InputStreamReader");
var String = Java.type("java.lang.String");
 
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
            writer.writeBytes(new String(JSON.stringify(data)));
            writer.flush();
            writer.close();      
            os.close();
        } catch(exc) {
            print("problem:" +exc);
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
            print("problem:" +exc);
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