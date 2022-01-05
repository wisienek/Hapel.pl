var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var npc;

function init(e){
    npc = e.npc;
}

function interact(e) {
    gui1(e.player);
}


function baseGui(){
    var gui = API.createCustomGui(1, 256,256, false);
    gui.setScriptHandler(npc);
    gui.setBackgroundTexture("customnpcs:textures/gui/king_of_the_hill.png");
    return gui;
}

function gui1(player){
    var gui = baseGui();
    
    gui.addButton(1, "§aDołącz do gry", 5, 170, 80, 15);
    gui.addButton(21, "§eSprawdź kto gra", 90, 170, 80, 15);
    gui.addButton(11, "§cWyjdź z gry", 175, 170, 80, 15)
    gui.addButton(41, "§dI", 235, 60, 15, 15);
    
    player.showCustomGui(gui);
    return gui;
}
function gui2(player){
    var gui = baseGui();

    gui.addButton(31, "§cMenu Główne", 90, 170, 80, 15);

    var ents = player.world.getStoreddata().get('hillplayers');
    var king = player.world.getStoreddata().get('king');
    if(!ents) { ents = [] } else { ents = JSON.parse(ents) }

    for( var i=0; i<ents.length; i++){
        king==ents[i]? ents[i] = "§e"+ents[i]+" ♔": ents[i] = "§b"+ents[i];
    }

    gui.addScroll(2, 30, 60, 200, 100, ents);

    player.showCustomGui(gui);
    return gui;
}
function gui3(player){
    var gui = baseGui();

    var zasady = "1. W grze może brać udział nieograniczona ilość graczy.||2. Każda runda trwa 5 min.||3. Grę wygrywa osoba, która jako ostatnia posiada tytuł króla.||4. Aby zdobyć Koronę należy dojść do tronu i przejąć ją z niego.||5. Król może stracić koronę przez wyjście z tronu.||6. Nagrodą za ukończenie gry jako król jest korona.";
    zasady = zasady.split("||");
    
    gui.addScroll(12, 3, 60, 250, 100, zasady);

    gui.addButton(51, "§eInfo o grze", 50, 170, 80, 15);
    gui.addButton(31, "§cMenu główne", 135, 170, 80, 15);

    player.showCustomGui(gui);
    return gui;
}
function gui4(player){
    var gui = baseGui();

    var wdata = player.world.getStoreddata();
    var king = wdata.get('king') || "Nikt";
    var crown = wdata.get('crown') || "Brak";
    var state = wdata.get('hill') || "Stop";

    var list = ["§aKról: §e"+king, "§aKorona: §e"+crown, "§aStatus gry: §e"+state];

    gui.addScroll(22, 30, 60, 200, 100, list);

    gui.addButton(61, "§eZasady", 50, 170, 80, 15);
    gui.addButton(31, "§cMenu główne", 135, 170, 80, 15);

    player.showCustomGui(gui);
    return gui;
}

function customGuiButton(e) {
    switch ( e.buttonId ){
        case 1: {
            var wdata = e.player.world.getStoreddata();
            var players = wdata.get('hillplayers');
            var state = wdata.get('hill');
            if(state=="start"){ return e.player.message("[§cGame§f] §7Gra jest już aktywna!") }
            if(!players) { players = [] } else { players = JSON.parse(players) }
            if(players.indexOf(e.player.getName())>-1){
                e.player.message("[§cGame§f] §7Jesteś już w grze!");
                return gui2(e.player);
            }
            players.push(e.player.getName());
            wdata.put('hillplayers', JSON.stringify(players));

            e.player.message("[§cGame§f] §7Dołączono do gry King of the Hill!");
            gui2(e.player);
            break;
        }
        case 11: {
            var wdata = e.player.world.getStoreddata();
            var players = wdata.get('hillplayers');
            var state = wdata.get('hill');
            if(state=="start"){ return e.player.message("[§cGame§f] §7Gra jest aktywna!") }
            if(!players) { players = [] } else { players = JSON.parse(players) }
            if(players.indexOf(e.player.getName())==-1){
                e.player.message("[§cGame§f] §7Nie ma cię w grze!");
                return gui2(e.player);
            }
            players.splice(players.indexOf(e.player.getName()),1);
            wdata.put('hillplayers', JSON.stringify(players));

            e.player.message("[§cGame§f] §7Usunięto z gry King of the Hill!");
            gui2(e.player);
            break;
        }
        case 21: {
            gui2(e.player);
            break;
        }
        case 31: {
            gui1(e.player);
            break;
        }
        case 41: case 61: {
            gui3(e.player);
            break;
        }
        case 51: {
            gui4(e.player);
            break;
        }
    }
}