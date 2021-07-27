/*! \file kicki.js
*
* \brief CNCP script for Easter event
*
* Script made for MC server Hapel.pl
* Thanks to @Ronan#5944 for runDelay functions
* PPM on bunny to get a chance for dropping an easter egg
* eggs can be clicked for opening or sold in npc
*
* \author Wisienek
* \date 2020.02.25
* \version 1.01.11
*/

//rabbit npc
var skins = ["toast.png","black.png","brown.png","caerbannog.png","gold.png","salt.png","white.png","white_splotched.png"]
function init(e){
    function ri(){
        var m = Math.floor(Math.random() * skins.length);
        return skins[m];
    }
    e.npc.display.setSkinTexture("minecraft:textures/entity/rabbit/"+ri());
}

function interact(e){
    var data = e.npc.getStoreddata();

    var v = Math.floor(Math.random() * 5);
    if(v==0){
        var displ = e.npc.getDisplay();
        displ.setVisible(1);
        runDelay(4, function(){
            displ.setVisible(0);
        });
    }

    if(data.get("clickable")==1){return}
    var m = Math.floor(Math.random() * 12);
    if(m==0){
        var wdata = e.player.world.getStoreddata();
        var p = wdata.get("jajka");
        if(p){
            p=JSON.parse(p);
            if(p[e.player.getName()]){
                p[e.player.getName()]['zwykle'] += 1;
            }else{
                p[e.player.getName()] = {
                    'zwykle': 1,
                    'zlote':0
                }
            }
            
        }else{
            p={};
            p[e.player.getName()]={
                    'zlote':1,
                    'zwykle':0
            }
        }
        var egg = e.npc.getInventory().getDropItem(0);
        var v=Math.floor(Math.random() * 150);
        e.player.message("[§cZając§f] §7Złapano zająca");//You cought a hare!
        if(v==0){
            p[e.player.getName()]['zlote'] += 1;
            var egg1 = e.npc.getInventory().getDropItem(1);
            e.player.giveItem(egg1);
            e.player.message("[§cZając§f] §7Znaleziono super rzadkie jajo!");//you found a golden egg
            e.player.world.broadcast("[§cZając§f] §b"+e.player.getName()+"§7 znalazł §eZłote Jajko Wielkanocne!");//Player found golden egg!
        }
        wdata.put("jajka",JSON.stringify(p));
        e.player.giveItem(egg);
        return;
    }else{
        e.player.message("[§cZając§f] §7Nie udało się złapać zająca!");// You didn't manage to catch the hare
        data.put("clickable",1);
        runDelay(1, function(){
            data.put("clickable",0);
        });
    }
}

function tick(e){
    runDelayTick();
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
//end npc script

//player's script

function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getDisplayName()=="§aŚwią§bteczne §cJa§djko" || mainh.getDisplayName()=="§eZłote Jajko Wielkanocne"){
        var ch = [48503,80,52794];
        if(mainh.getDisplayName().indexOf("Złote")>-1){
            var chest = e.player.world.getBlock(ch[0],ch[1]-1,ch[2]);
            var items = chest.getContainer().getItems();
            for(var x=0;x<items.length;x++){
                var m = Math.floor(Math.random() * 9);
                if(m>=2){
                    e.player.giveItem(items[x]);
                }
            }
            mainh.setStackSize(mainh.getStackSize()-1);
            return e.player.message("[§cZając§f] §7Otworzyłeś Złote Jajko!");//you opened a golden egg
        }else{
            var chest = e.player.world.getBlock(ch[0],ch[1],ch[2]);
            var items = chest.getContainer().getItems();
            for(var x=0;x<items.length;x++){
                var m = Math.floor(Math.random() * 9);
                if(m==0){
                    e.player.giveItem(items[x]);
                }
            }
            mainh.setStackSize(mainh.getStackSize()-1);
            return e.player.message("[§cZając§f] §7Otworzyłeś Wielkanocne Jajko!");//you opened a golden egg
        }
    }
}

//end player's scirpt