var vname = "Cezar";
function dialogOption(e){
    var data = e.player.world.getStoreddata();
    var opt = e.option.getSlot();
        if(opt==0) {
            return e.player.message("[§cPodatnik§f] §7Aktualny stan zebranych podatków vat: §e"+parseInt(data.get("MMVat")));
        }else
        if(opt==1){
            var kasa = parseInt(data.get("MMVat"));
            if(e.player.getName()!=vname){return e.player.message("[§cPodatnik§f] §7Nie jesteś: "+vname);}
            if(kasa==0){return e.player.message("[§cPodatnik§f] §7Nie ma żadnych knutów do wypłacenia!")}
            data.put("MMVat",0);
            exchangeMoney(kasa,"knut","galeon",true, e.player);
            e.player.message("[§cPodatnik§f] §7Otrzymano: §e"+kasa+"§7 knutów!");
            var data = openBFile(e,"podatki.json");
            var x = new Date();
            data.push({"nazwa":e.player.getDisplayName(),"ilosc":kasa,"data":x.getTime() });
            return savePlik(e,"podatki.json",data);
        }else 
        if(opt==2){
            var x = data.get("VatVal");
            return e.npc.say("Aktualne opodatkowanie wynosi: §e"+x*100+"%");
        }else
        if(opt==3){
            var data = openBFile(e,"podatki.json");
            for(var i=1;i<4;i++){
                var data1 = data[data.length-i];
                if(!data1){return}
                var z = new Date(data1['data']);
                var x = z.toDateString()+" | "+z.toTimeString().split(" ")[0];
                e.player.message("[§cPodatnik§f] §7Ostatni ("+i+") podatek w ilości: §e"+data1["ilosc"]+"k§7 zebrał : §b"+data1["nazwa"]+"§7 o §a"+x);
            }
            return; 
        }
    return e.npc.say("Niepowodzenie ;/");
}



function savePlik(e,name,data){
    var JFiles = Java.type("java.nio.file.Files");
    var dir = e.API.getWorldDir().toPath();
    dir = dir.resolve('script_logs');
    if(JFiles.exists(dir)){
        dir = dir.resolve(name);
        var writer = new java.io.FileWriter(dir);
        writer.write(JSON.stringify(data,null,2));
        writer.close();
        return print("Zapisano plik: "+name);
    }else{
        dir = JFiles.createDirectory(dir);
        print("Stworzono directory");
        return savePlik(e,name);
    }
}
function openBFile(e,id){
    var JFiles = Java.type("java.nio.file.Files");
    var dir = e.API.getWorldDir().toPath();
    dir = dir.resolve('script_logs');
    if(JFiles.exists(dir)){
        dir = dir.resolve(id);
        if(JFiles.exists(dir)){
            var ips = new java.io.FileInputStream(dir);
            var fileReader = new java.io.InputStreamReader(ips,"Cp1250");
            var data1=fileReader.read();
            var data;
            var start1="";
            while(data1!=-1) {    
                data =  String.fromCharCode(data1);   
                start1 = start1+data;
                data1 = fileReader.read();
            }
            ips.close();
            if(start1.length==0){
                start1="[]";
            }
            var data5 = JSON.parse(start1);
            return data5;
        }else{
            var writer = new java.io.FileWriter(dir);
            writer.write(JSON.stringify([],null,2));
            writer.close();
            print("Stworzono "+id+"");
            return openBFile(e,id);
        }
    }else{
        dir = JFiles.createDirectory(dir);
        print("Stworzono script_logs directory");
        return openBFile(e,id);
    }
}

function exchangeMoney(ammount, from, into, bezP, player){
    from = from.toLowerCase();
    into = into.toLowerCase();
    var knut = player.world.createItem("minecraft:diamond",0,1);
        knut.setCustomName("§fKnut");
    var sykl = player.world.createItem("minecraft:iron_ingot",0,1);
        sykl.setCustomName("§fSykl");
    var galeon = player.world.createItem("minecraft:coal",1,1);
        galeon.setCustomName("§fGaleon");
    var temp = convertMoney(ammount,from,into);

    var x;
    switch(into){
        case "knut": x=knut;break;
        case "sykl": x=sykl;break;
        case "galeon": x=galeon;break;
        default: x=knut;
    }

    if(bezP==true){
        while(temp[0]>64){
            x.setStackSize(64);
            player.giveItem(x);
            temp[0]-=64;
        }
        x.setStackSize(temp[0]);
        player.giveItem(x);
        
        x=knut;
        while(temp[1]>64){
            x.setStackSize(64);
            player.giveItem(x);
            temp[1]-=64;
        }
        x.setStackSize(temp[1]);
        player.giveItem(x);

        return true;
    }else{
        var inv = player.getInventory();

        if(countItems(inv, x, ammount-temp[1])){
            if(takeItems(inv, x, ammount-temp[1])){
                x.setStackSize(temp[0]);
                player.giveItem(x);
                player.message("[§cInfo§f] §7Wymieniono "+from+" ("+ammount+") na "+into+" ("+temp[0]+")");
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}

function convertMoney(ammount, from, into){
    if(into == "knut"){
        if(from == "knut"){
            return [ammount,0];
        }
        else if(from == "sykl"){
            return [ammount*21, 0];
        }
        else if(from == "galeon"){
            return [ammount*357, 0];
        }
        else{
            return;
        }
    }
    else if(into == "sykl"){
        if(from == "knut"){
            return [ammount/21, ammount%21];
        }
        else if(from == "sykl"){
            return [ammount,0];
        }
        else if(from == "galeon"){
            return [ammount*17,0];
        }
        else{
            return;
        }
    }
    else if(into == "galeon"){
        if(from == "knut"){
            return [ammount/357, ammount%357];
        }
        else if(from == "sykl"){
            return [ammount/17,ammount%17];
        }
        else if(from == "galeon"){
            return [ammount,0];
        }
        else{
            return;
        } 
    }
    else{
        return;
    }
}