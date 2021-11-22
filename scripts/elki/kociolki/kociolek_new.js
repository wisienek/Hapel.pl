var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var KOCIOLEK;
var pos;
var version = "22.11.2021-1";

var dev = false;

// immutable
function baseKociolek(list=[], wait=0, temp=0, ignis=false, id=null) {
    this.list = list;
    this.wait = wait;
    this.temp = temp;
    this.ignis = ignis;
    this.id = id;

    this.toJson = function() {
        return {
            list: this.list,
            wait: this.wait,
            temp: this.temp,
            ignis: this.ignis
        };
    };

    this.load = function({ list, wait, temp, ignis, id }) {
        this.list = list;
        this.wait = wait;
        this.temp = temp;
        this.ignis = ignis;
        this.id = id;
    };

    this.switchType = function() {
        this.id == "Główny" ? this.id = undefined : this.id = "Główny";
    };
};


/*
    Eliksir: {
        name: nazwa
        list: [...kroki]
        wait: timestamp - do kiedy czekać musi
        temp: temperatura
    }
    KOCIOLEK: {
        current: baseKociolek,
        side: baseKociolek,

    }


    required:
    - sql_main
    - postreq
    - str_mani
    - pass
*/

function init(e){
    try{
        e.block.setModel("minecraft:cauldron");
        e.block.setHardness(1);
        KOCIOLEK = e.block;
        pos = KOCIOLEK.getPos();

        var data = e.block.getStoreddata();
        var elk = data.get("elki");
        elk = JSON.parse(elk) || {};
        var change;

        if( !elk.current ) { 
            elk.current = new baseKociolek(null, null, null, null, "Główny" );
            change = true; 
        }

        if( !elk.side ) { 
            elk.side = new baseKociolek();
            change = true; 
        }

        if( change ) 
            data.put("elki", JSON.stringify(elk)); 
    
        if( data.get('update') != version ) 
            update(e);
    }
    catch(er){
        print("init error: "+er);
    }
}
function harvested(e){
    try{
        var tmp = e.block.getStoreddata();
        var kociolek = tmp.get("kociolek") || "Cynowy kociołek rozmiar 2";

        var item = e.block.world.createItem("minecraft:cauldron", 0, 1);
        item.setCustomName("§c" + kociolek);
        e.player.dropItem(item).setOwner(e.player.getName());
    }
    catch(er){
        print("Harvest error: "+ er);
    }
}

function interact(e) {
    try{
        var mainh = e.player.getMainhandItem();
        if( dev == true && mainh.getDisplayName().indexOf("testera") == -1 )
            return e.player.message("[§cInfo§f] §7Kociołki chwilowo niedostępne (testowanie) :v");

        if( !KOCIOLEK || !pos ){
            KOCIOLEK = e.block;
            pos = KOCIOLEK.getPos();
        }

        var startGui = _GUI['start'];

        return startGui.show(e);
    }
    catch(er){
        print("interact error: "+ er);
    }
}

// gui 1
new Gui("start", function(e){
    var gui = baseGui();
    
    gui.addTexturedButton(id("b-continueBrewing"), "§2Dokończ Eliksir", 5, 115, 80, 15, buttonTexture); // id 1
    gui.addTexturedButton(id("b-newEliksir"), "§5Nowy Eliksir", 175, 115, 80, 15, buttonTexture); // id 11
    gui.addTexturedButton(id("b-inocreation"), "§3Inokreacja", 5, 230, 80, 15, buttonTexture); // id 41
    gui.addTexturedButton(id("b-labelMaker"), "§3Etykieter", 175, 230, 80, 15, buttonTexture); // id 42
    
    e.player.showCustomGui(gui);
}, null, null);

// gui 2
new Gui("continueBrewing", function(e) {
    var gui = API.createCustomGui(1, 256, 256, false);
    gui.setBackgroundTexture("customnpcs:textures/gui/inve.png");

    gui.addLabel(id("l-addItem"), "§4Wrzuć fiolkę", 85, 62, 55, 20).setHoverText("§7Wrzuć fiolkę ze zlanym eliksirem"); // id 9
    gui.addItemSlot(100, 20);
    
    gui.addLabel(id("l-addRecipe"), "§4Dodaj Przepis", 85, 82, 55, 20).setHoverText("§7Dodaj item z przepisem, pojawi się po prawej stronie!");// id 10
    gui.addItemSlot(100, 40);
    gui.addTexturedRect(id("t-trader"), "customnpcs:textures/gui/trader.png", 139, 84, 18, 18, 31, 139); // id 11
    gui.addButton(id("b-removeRecipe"), "§c✖", 160, 83, 20, 20).setHoverText(["§7Usuwa przepis z podglądu"]); // id 111

    gui.showPlayerInventory(8, 113);

    gui.addButton(id("b-goBack"), "§4Menu Główne", 90, 135, 80, 20); // id 31 - can be deleted later on

    e.player.showCustomGui(gui);
}, null, "start");

// gui3
new Gui("eliksirCreatorMenu", function(e) {
    // player, current, show
    var gui = baseGui();

    gui.addTexturedButton(id("b-swtichToCrucible"), "§1Kociołek", 5, 115, 80, 15, buttonTexture); // 101
    gui.addTexturedButton(id("b-addIngredient"), "§2Dodaj składnik", 90, 95, 80, 15, buttonTexture); // 102
    gui.addTexturedButton(id("b-steps"), "§3Lista kroków", 175, 115, 80, 15, buttonTexture); // 103

    gui.addTexturedButton(id("b-saveEliksir"), "§bZapisz Eliksir", 5, 230, 80, 15, buttonTexture); // 104
    gui.addTexturedButton(id("b-submitEliksir"), "§aWyślij do weryfikacji", 90, 230, 80, 15, buttonTexture); // 105
    gui.addTexturedButton(id("b-trash"), "§cWylej", 175, 230, 80, 15, buttonTexture); // 106

    var tmp = KOCIOLEK.getStoreddata().get('elki'); 
    tmp = JSON.parse(tmp) || {};
    if(!current){
        if( tmp.current && tmp.current.list && tmp.current.list.length > 0 ){
            if( !show )
                e.player.message("[§cEliksiry§f] §7Kończysz tworzyć eliksir!");
        }else{
            if( !show )
                e.player.message("[§cEliksiry§f] §7Rozpoczęto tworzenie eliksiru!");
            
            tmp.current = new baseKociolek();
            KOCIOLEK.getStoreddata().put('elki', JSON.stringify(tmp));
        }
    }

    e.player.showCustomGui(gui);
}, null, "start");



var buttonTexture = "customnpcs:textures/gui/pp_button.png";
function baseGui(b){
    try{
        var gui = API.createCustomGui(1, 256, 256, false);

        var x = gui.addLabel(56, "§c[P]", 265, 0, 30, 30);

        if(!KOCIOLEK)
            throw "Brak KOCIOLEK!";

        var sdata = KOCIOLEK.getStoreddata();
        var elki = JSON.parse(sdata.get("elki"));

        b ? gui.setBackgroundTexture("customnpcs:textures/gui/elki_e.png") : gui.setBackgroundTexture("customnpcs:textures/gui/elki.png");
        
        gui.addTexturedButton(55, "", 256, 30, 30, 30, "customnpcs:textures/gui/ikonki/elki.png").setHoverText(["§7Przełącz kociołek", "§7Aktualny kociołek: §a"+ (elki.id || "Główny"), "§7" + (sdata.get("kociolek") || "Kociołek cynowy, Rozmiar 2") ]);
        if ( elki.side && elki.side.list.length > 0 ) { 
            gui.addButton(57, "§a[+]", 290, 40, 20, 20).setHoverText(["§7Dodaj drugi kociołek", "§7Do aktualnego"]); 
        }
    
        if( sdata.get("przepis") ) { 
            // todo: CHANGE HOVER TEXT TO [1], [2], [3], [4], [5]... 20 lines max.
            x.setHoverText([sdata.get("przepis")]);
        } else x.setHoverText(["§7Przepis..."]);


        if( elki.current && elki.current.wait > 0 ){
            if( elki.current.wait > Date.now() ){
                var data = new Date(elki.current.wait);
                var waitTo = "§c"+ data.getHours()+"§f:§a"+data.getMinutes()+"§f;§b"+data.getSeconds()+" §f(§d"+data.getDate()+"§f.§d"+(data.getMonth()+1)+"§f.§d"+data.getFullYear()+"§f)";
                gui.addTexturedRect(954, "customnpcs:textures/gui/ikonki/elki.png", 256, 70, 30, 30, 64, 0).setHoverText(["§aZaczekaj do:", waitTo, "§0.", "§cHH§f:§aMM§f;§bSS §f(§dDD§f.§dMM§f.§dRRRR§f)"]);
            }
        }

        return gui;
    }
    catch(er){
        print("basegui error: "+er);
    }
}

// exported from other file
var _GUI_IDS = {};
var _GUI = {};
function id(name) {
    return _GUI_IDS[name] || ( _GUI_IDS[name] = Object.keys(_GUI_IDS).length + 1 );
}
function guiM(obj) {
    return _GUI[obj.name] || ( _GUI[obj.name] = obj );
}
function Gui(_name, _show, _next, _prev){
    this.name = _name;
    this.show = _show;
    this.next = _next;
    this.prev = _prev;

    this.showNext = _GUI[this.next] ? _GUI[this.next].show : null; 
    this.showPrev = _GUI[this.prev] ? _GUI[this.prev].show : null; 

    return _GUI[this.name] = this;
}