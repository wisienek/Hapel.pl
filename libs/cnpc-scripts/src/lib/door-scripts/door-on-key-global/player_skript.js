function interact(e){
    //sprawdź czy jest skrzynia, drzwi z mc
    if(e.type==0 && e.target.getName().indexOf("minecraft") && (e.target.getName().indexOf("door") || e.target.getName().indexOf("chest"))){
        var mainh = e.player.getMainhandItem();
        
        if(mainh.getDisplayName().toLowerCase()=="admin-key" && mainh.getLore()[0].toLowerCase()=="§c§l**admin key "+e.player.getDisplayName().toLowerCase()+"**"){
            e.player.message("Otworzono Kluczem-admina");
        }
        var pos = e.target.getPos();
        var kordy = pos.getX()+" "+pos.getY()+" "+pos.getZ();
        var zamek = loadzamek(kordy);

        if(mainh.getDisplayName().toLowerCase()=="§akluczyk"){
            if(zamek && zamek['claim']=='claimed'){
                if(mainh.getLore()[0].toLowerCase().indexOf("oryginalny kluczyk")==-1 && mainh.getLore()[0].toLowerCase().indexOf("podrabiany kluczyk")==-1){
                    return e.setCanceled(true);
                }else if(mainh.getLore()[1]!=kordy){
                    return e.setCanceled(true);
                }
            }
        }else if(mainh.getDisplayName().toLowerCase()=="§awytrych"){
            if(mainh.getLore()[0].indexOf("Dobrej jakości")==-1 && mainh.getLore()[0].indexOf("Słabej jakości")==-1 && mainh.getLore()[0].indexOf("Magiczny")==-1){
                e.setCanceled(true);
                return e.player.message("§f§l[§cWytrych§f] Twój wytrych wygląda jakoś dziwnie");
            }
            if(zamek && zamek['claim']=='claimed'){
                if(zamek["lvl"]){
                    if((mainh.getLore()[0].indexOf("Słabej jakości")>-1 && zamek['lvl']>3) || (mainh.getLore()[0].indexOf("Dobrej jakości")>-1 && zamek['lvl']>7)){return e.setCanceled(true)}
                    if(wytrych(zamek['lvl'])==false){
                        e.setCanceled(true);

                        if(Number(mainh.getLore()[1])==1){mainh.setStackSize(mainh.getStackSize()-1);
                        }else{mainh.setLore([mainh.getLore()[0],Number(mainh.getLore()[1])-1]);}

                        return e.player.message("§f§l[§cWytrych§f] Nie udało się włamać");
                    }
                }
            }
        }else if(mainh.getDisplayName().toLowerCase()=="§akłudka"){
            e.setCanceled(true);
            //dokończyć
            if(zamek && zamek['lvl']){
                if(zamek['lvl']>Number(mainh.getLore()[0].split(":"))){
                    return e.player.message("§f§l[§cKłudka§f] Nie można dać mniejszej kłudki na większą");
                }
            }

        }else if(mainh.getDisplayName().toLowerCase()=="§alock-break"){

        }

        if(zamek['claim']=="unclaimable" && zamek['lock']=="locked"){
            e.setCanceled(true);
            return e.player.message("§cDrzwi nie da się zabezpieczyć, ani otworzyć");
        }







        
    }


}



function savez(player, kordy, data5, claim, hardness){
    var writer = new java.io.FileWriter("./door.json");
    data5[kordy] = [player.getUUID(), claim, hardness];
    writer.write(JSON.stringify(data5,null,2));
    writer.close();
}

function loadzamek(kordy){
    var ips = new java.io.FileInputStream("./door.json");
    var fileReader = new java.io.InputStreamReader(ips,"UTF-8");
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
        start1="{}";
    }
    var data5 = JSON.parse(start1);
    if(data5[kordy]){
        return data5[kordy];
    }
    return;
}
function wytrych(lvl){
    return Math.random() * 1000<lvl*30;
}