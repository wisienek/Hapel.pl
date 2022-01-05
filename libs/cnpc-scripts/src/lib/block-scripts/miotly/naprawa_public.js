var API = Java.type("noppes.npcs.api.NpcAPI").Instance();

function init(e){
    e.block.setModel("variedcommodities:pedestal");
    e.block.setRotation(0,90,0);
}

function interact(e){
    var mainh = e.player.getMainhandItem();
    var lore = mainh.getLore();
    var data = e.block.getStoreddata();
    var naprawa = data.get("naprawa");
    if(naprawa){
        naprawa = JSON.parse(naprawa);
        if(naprawa[e.player.getName()]){
            var time = new Date(Number(naprawa[e.player.getName()]["czas"]));
            var date = new Date(Date.now());
            var v = (date-time)/3600000;
            if(v<1){return e.player.message("[§cMiotły§f] §7Jeszcze nie minęła godzina naprawy! ("+(1-v).toFixed(2)+")")}
            else{
                var tempm = e.player.world.createItemFromNbt(API.stringToNbt(naprawa[e.player.getName()]["item"]));
                var miotly = JSON.parse(e.player.world.getStoreddata().get("miotly"));
                if(!miotly){return e.player.message("[§cMiotły§f] §7Nie znaleziono spisu mioteł!!! Pisz szybko do Woolfa")}
                var name = tempm.getDisplayName().split(" ").join("").split("§f")[1];
                var item = e.player.world.createItem(miotly[name],0,1);
                item.setCustomName(tempm.getDisplayName());

                lore = Java.from(tempm.getLore())
                lore.pop();
                item.setLore(lore);
                
                delete naprawa[e.player.getName()];
                data.put("naprawa", JSON.stringify(naprawa));

                e.player.giveItem(item);
                var x = "**"+e.player.getName()+"** Naprawił miotłę [automat]: **"+name+"** !";
                x=ang(x);
                HTTP.post(passes.hooks.mainLog,{
                    "content": x,
                    "tts": false,
                });
                return e.player.message("[§cMiotły§f] §7Dostałeś miotłę spowrotem z naprawy!");
            }
        }
    }else{
        naprawa = {};
    }
    if(mainh.getName()=="variedcommodities:broken_arrow"){
        if(wallet(e.player.getName() >= 90)){
            requestPayment(e.player.getName(), 90 )
            e.player.message("[§cMiotły§f] §7Pobrano 90k!");

            naprawa[e.player.getName()] = {
                "czas": Date.now(),
                "item": mainh.getItemNbt().toJsonString()
            }
            data.put("naprawa",JSON.stringify(naprawa));
            mainh.setStackSize(mainh.getStackSize()-1);

            return e.player.message("[§cMiotły§f] §7Przyjęto miotłę! Przyjdź za godzinę aby odebrać naprawioną.");
        }else{
            return e.player.message("[§cPodatnik§f] §7Musisz mieć 90k!")
        }
    }else{
        return e.player.message("[§cMiotły§f] §7Musisz trzymać zniszczoną miotłę!");
    }
}
function clicked(e){
    var mainh = e.player.getMainhandItem();
    var lore = Java.from(mainh.getLore());
    for(var x=0; x < lore.length; x++){
        if(lore[x].toLowerCase().indexOf("wytrzymałość: ")>-1){

            var wdata = e.player.world.getStoreddata();
            var wyt = wdata.get("miotly_wyt");
            wyt = JSON.parse(wyt) || {};
            var value = 5;
            if(wyt && wyt[mainh.getName()]){
                value = wyt[mainh.getName()].wytrzymalosc;
            }

            if(lore[x].split(": ")[1] == value){ return e.player.message("[§cMiotła§f] §7Twoja miotła ma pełną wytrzymałość!")}
            if(wallet(e.player.getName()) >= 30){
                requestPayment(e.player.getName(), 30);
                lore[x] = "§cWytrzymałość: "+value;
                e.player.message("[§cMiotła§f] §7Konserwacja przebiegła poprawnie!");
                print(e.player.getName()+" konserwacja "+mainh.getDisplayName());
                
                mainh.setLore(lore);
            }else{
                e.player.message("[§cPodatnik§f] §7Musisz mieć 30k!");
            }

        }
    }
}