/*! \file bag.js
*
* \brief Backpack Script
*
* Script made for MC server Hapel.pl
* Polish version
* All data will be saved in: ./world_folder/customnpcs/bags/
* todo: 
* - make backpack unmovable when opened (now you can't throw it, but it can be place inside other container)
*
* \author Wisienek
* \date 2020.02.19
* \version 1.02.11
*/
function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getDisplayName().indexOf("§cPlecak")>-1){
        var lore = mainh.getLore();
        if(lore.length==0){return e.player.message("[§cPlecak§f] §7Niepoprawny plecak!")}
        else if(lore.length==1){
            var data = e.player.world.getStoreddata();
            var p = data.get("plecaki");
            if(!p){p=0;}
            var lore1=[]
            for(var x=0;x<lore.length;x++){
                lore1.push(lore[x]);
            }
            p++;
            lore1.push("§0"+p);
            mainh.setLore(lore1);
            data.put("plecaki",p);
            return e.player.message("[§cPlecak§f] §7Dodano id:§e"+p+"§7  do plecaczka.");
        }

        if(e.player.getStoreddata().get("plecak")==1){return e.player.message("[§cPlecak§f] §7Plecak jest nadal otwierany!")}

        var data = e.player.world.getStoreddata();
        var d = data.get("plecaki1");
        if(d.length>2){d=JSON.parse(d)}else{d=[]}

        if(lore[0].indexOf("Zamknięty")>-1){
            if(e.player.getStoreddata().get("plecak")==2){return e.player.message("[§cPlecak§f] §7Masz już otwarty plecak!")}
            if(d.indexOf(lore[1].split("§0")[1])>-1){return e.player.message("[§cPlecak§f] §7Ten plecak jest już gdzieś otwarty!")}
            d.push(lore[1].split("§0")[1]);
            data.put("plecaki1",JSON.stringify(d));
            e.player.getStoreddata().put("plecak",1);
            saveInventory(e,e.player.getName()+"_copy.json");
            clearInventory(e.player);
            runDelay(1, function(){
                openInventory(e,lore[1].split("§0")[1]);
                e.player.getStoreddata().put("plecak",2);
            });
            var lore1 = [];
            for(var x=0;x<lore.length;x++){
                if(x==0){lore1.push("Otwarty")}else{
                    lore1.push(lore[x]);
                }
            }
            mainh.setLore(lore1);
            return e.player.message("[§cPlecak§f] §7Otworzono plecak.");
        }else if(lore[0].indexOf("Otwarty")>-1){
            if(d.indexOf(lore[1].split("§0")[1])>-1){d.splice(d.incexOf(lore[1].split("§0")[1]),1)}
            data.put("plecaki1",JSON.stringify(d));
            e.player.getStoreddata().put("plecak",1);
            saveInventory(e,lore[1].split("§0")[1]+".json");
            clearInventory(e.player);
            runDelay(1, function(){
                openInventory(e,e.player.getName()+"_copy");
                e.player.getStoreddata().put("plecak",0);
            });
            var lore1 = [];
            for(var x=0;x<lore.length;x++){
                if(x==0){lore1.push("Zamknięty")}else{
                    lore1.push(lore[x]);
                }
            }
            mainh.setLore(lore1);
            return e.player.message("[§cPlecak§f] §7Zamknięto plecak.");
        }else{return e.player.message("[§cPlecak§f] §7Błąd, niepoprawny lore[0]!")}
    }
}
//! Method that clears player's inventory
/*! \param player - IPlayer object */
function clearInventory(player){
    var air = player.world.createItem("minecraft:air",0,1);
    var inv = player.getInventory();
    for(var i=9;i<36;i++){
        inv.setSlot(i,air);
    }
    return print("Wyczyszczono inv: "+player.getName());
}
//! Method that temp saves player's inventory
/*! \param name - string (file name) \param e - event object */
function saveInventory(e,name){
    var JFiles = Java.type("java.nio.file.Files");
    var dir = e.API.getWorldDir().toPath();
    dir = dir.resolve('bags');
    if(JFiles.exists(dir)){
        dir = dir.resolve(name);
        var writer = new java.io.FileWriter(dir);
        var data = [];
        var inv = e.player.getInventory();
        for(var x=9;x<36;x++){
            if(inv.getSlot(x).getName()!="minecraft:air"){
                var item = inv.getSlot(x);
                if(item.getDisplayName()=="§cPlecak" && loopbag==false){
                    var y=0;
                    var exit=false;
                    while(y<9 || exit==false){
                        if(inv.getSlot(y).getName()=="minecraft:air"){
                            exit=true;
                        }else{y++}
                    }
                    e.player.message("[§cPlecak§f] §7Nie możesz trzymać plecaków w plecakach, wyrzucono na ziemię (brak miejsca w toolbarze)!");
                    y!=9?inv.setSlot(y,item):e.player.dropItem(item);
                }else{
                    data.push([x,item.getItemNbt().toJsonString()]);
                }
            }
        }
        writer.write(JSON.stringify(data,null,2));
        writer.close();
        return print("Zapisano do inventory: "+name);
    }else{
        dir = JFiles.createDirectory(dir);
        print("Stworzono bags directory");
        return saveInventory(e,name);
    }
}
function openInventory(e,id){
    var x = openBFile(e,id);
    var inv = e.player.getInventory();
    if(x.length>0){
        for(var i=0;i<x.length;i++){
            var citem = e.player.world.createItemFromNbt(e.API.stringToNbt(x[i][1]));
            inv.setSlot(x[i][0],citem);
        }
    }
    return print("Otworzono inv; "+id);
}
function openBFile(e,id){
    var JFiles = Java.type("java.nio.file.Files");
    var dir = e.API.getWorldDir().toPath();
    dir = dir.resolve('bags');
    if(JFiles.exists(dir)){
        dir = dir.resolve(id+'.json');
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
            print("Stworzono "+id+".json w bags");
            return openBFile(e,id);
        }
    }else{
        dir = JFiles.createDirectory(dir);
        print("Stworzono bags directory");
        return openBFile(e,id);
    }
}
function toss(e){
    if(e.item.getDisplayName()=="§cPlecak"){
        var lore = e.item.getLore();
        if(lore.length>0){
            if(lore[0].indexOf("Otworzony")>-1||lore[0].indexOf("Otwarty")>-1){
                e.setCanceled(true);
                e.player.giveItem(e.item);
                return e.player.message("[§cPlecak§f] §7Nie możesz wyrzucić otwartego plecaka!");
            }
        }
    }
}
var _TIMERS = [];
function runDelay(seconds, callback) {
    _TIMERS.push({
        end: new Date().getTime()+seconds*1000,
        callback: callback
    });
}
function runDelayTick() {
    if(_TIMERS.length > 0) {
        var _newTimers = [];
        var _curTime = new Date().getTime();
 
        var timer;
        for(var i = 0; i < _TIMERS.length; i++) {
            timer = _TIMERS[i];
            if(_curTime >= timer.end) {
                timer.callback();
            } else {
                _newTimers.push(timer);
            }
        }
        _TIMERS = _newTimers;
    }
}