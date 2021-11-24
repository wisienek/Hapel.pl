var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var KOCIOLEK;
var pos;
var version = "22.11.2021-1";

var dev = false;

// immutable
function baseKociolek({ list, wait, temp, ignis, id }) {
    this.list = list || [];
    this.wait = wait || 0;
    this.temp = temp || 0;
    this.ignis = ignis || false;
    this.id = id || null;

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
            elk.current = new baseKociolek({ id: "Główny" });
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
new Gui("eliksirCreatorMenu", function(e, current, show) {
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
    if( !current ){
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

// gui 6
new Gui("basicInputs", function(e) {
    var gui = baseGui(true);

    gui.addLabel(id("l-kociolek"), "§1Kociołek", 115, 0, 80, 20); // 99

    gui.addTexturedButton(id("b-addWater"), "§7Wlej wodę", 5, 20, 80, 15, buttonTexture); // 201
    gui.addTextField(id("in-addWater"), 90, 20, 30, 15); // 101
    gui.addLabel(id("l-addWater"), "§3ml", 122, 20, 15, 15); // 151

    gui.addTexturedButton(id("b-addAlcohol"), "§7Wlej alkohol", 5, 40, 80, 15, buttonTexture); // 202
    gui.addTextField(id("in-addAlcohol"), 90, 40, 30, 15); // 102
    gui.addLabel(id("l-addAlcohol"), "§3ml", 122, 40, 15, 15); // 152

    gui.addTexturedButton(id("b-increaseTemperature"), "§7Zwiększ temperaturę", 5, 60, 80, 15, buttonTexture); // 203
    gui.addTextField(id("in-increaseTemperature"), 90, 60, 30, 15); // 104
    gui.addLabel(id("l-increaseTemperature"), "§3°C", 122, 60, 15, 15);
    
    gui.addTexturedButton(id("b-lowerTemperature"), "§7Zmniejsz temperaturę", 5, 80, 80, 15, buttonTexture); // 204
    gui.addTextField(d("in-lowerTemperature"), 90, 80, 30, 15);
    gui.addLabel(id("l-lowerTemperature"), "§3°C", 122, 80, 15, 15);

    var ndata = KOCIOLEK.getStoreddata();
    var elki = ndata.get('elki');
    elki = JSON.parse(elki) || {};

    gui.addLabel(id("l-temperature"), "§3Aktualna temperatura: §b"+ elki.current.temp +" §3°C", 20, 100, 100, 20);

    // ignis
    // gui.addTexturedButton(925, "", 190, 170, 30, 30, "customnpcs:textures/gui/ikonki/elki.png").setTextureOffset(35, 0);

    gui.addTexturedButton(id("b-ignisOn"), "§cRozpal ogień", 150, 20, 80, 15, buttonTexture); // 205
    gui.addTexturedButton(id("b-ignisOff"), "§bZgaś ogień", 150, 40, 80, 15, buttonTexture); // 206

    gui.addTextField(id("in-customAction"), 150, 70, 80, 15); // 211
    gui.addTexturedButton(id("b-customAction"), "§dDodaj akcję wyżej", 150, 90, 80, 15, buttonTexture); // 212

    gui.addLabel(id("l-turner"), "§1Mieszadło", 115, 130, 80, 20); // 999

    gui.addTexturedButton(id("b-turnLeft"), "§7Mieszaj w lewo", 5, 150, 80, 15, buttonTexture);// 207
    gui.addTextField(id("in-turnLeft"), 90, 150, 30, 15); // 107
    gui.addLabel(id("l-turnLeft"), "§3razy", 122, 150, 20, 15); // 157

    gui.addTexturedButton(id("b-turnRight"), "§7Mieszaj w prawo", 5, 170, 80, 15, buttonTexture);
    gui.addTextField(id("in-turnRight"), 90, 170, 30, 15);
    gui.addLabel(id("l-turnRight"), "§3razy", 122, 170, 20, 15);


    gui.addLabel(id("l-timeKeeper"), "§1Czasomierz", 115, 200, 80, 20); // 998
    gui.addTexturedButton(id("b-timeKeeper"), "§7Odczekaj chwilkę", 5, 220, 80, 15, buttonTexture); // 209
    gui.addTextField(id("in-timeKeeper"), 90, 220, 30, 15); // 109
    gui.addLabel(id("l-timeKeeper"), "§3Minut", 122, 220, 20, 15); //159

    gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, buttonTexture);

    e.player.showCustomGui(gui);
}, null, "eliksirCreatorMenu");

// gui7
new Gui("ingredientSelector", function(e, b, search) {
    var gui = baseGui(true);

    if( !b ) {
        gui.addLabel(id("l-ingredientType"), "§1Wybierz typ składnika", 95, 0, 80, 20);

        // 301-305
        gui.addTexturedButton(id("b-ingredientType1"), "§7Nieorganiczne", 40, 80, 80, 15, buttonTexture);
        gui.addTexturedButton(id("b-ingredientType2"), "§7Bazy wodne", 130, 80, 80, 15, buttonTexture);
        gui.addTexturedButton(id("b-ingredientType3"), "§7Roślinne", 40, 110, 80, 15, buttonTexture);
        gui.addTexturedButton(id("b-ingredientType4"), "§7Zwierzęce", 130, 110, 80, 15, buttonTexture);
        gui.addTexturedButton(id("b-ingredientType5"), "§7Własny (z eq)", 90, 140, 80, 15, buttonTexture);

        gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, buttonTexture);
    }
    else {
        gui.addLabel(id("l-info"), "§1Wybierz Ilość i Składnik", 95, 0, 120, 20); // 9
        gui.addLabel(id("l-type"), "§5" + b, 190, 20, 80, 20); // 10
        gui.addLabel(id("l-warning"), "§4§l[UWAGA]", 5, 5, 80, 30)
            .setHoverText(["§r§4Wpisz najpierw wartość potem kliknij dwukrotnie na składnik!"]); //19

        var skladniki = getSkladnik({ typ: b });
        if( !skladnik || !skladnik.result || skladniki.error ){
            return e.player.message("[§cDebugger§f] §7Error, napisz do administracji! -" + skladniki.error);
        }
        skladniki = skladniki.result;

        var lista1=[];
        for( var i=0; i < skladniki.length; i++ ) {
            if( search && skladniki[i].nazwa.toLowerCase().indexOf(search.toLowerCase()) > -1 ){
                if( skladniki[i].dostępny == true ){
                    lista1.push(skladniki[i].nazwa+"  ["+skladniki[i].jednostka+"]");
                }
            }else if( !search ){
                if( skladniki[i].dostępny == true ){
                    lista1.push(skladniki[i].nazwa+"  ["+skladniki[i].jednostka+"]");
                }
            }
        }

        gui.addLabel(id("l-quantity"), "§3ilość:", 105, 20, 60, 20); // 29
        gui.addTextField(id("in-quantity"), 125, 22, 30, 15); // 5
        gui.addScroll(id("s-ingredient"), 8, 45, 240, 180, lista1); // 32

        gui.addTextField(id("in-name"), 90, 235, 70, 15); // 7
        gui.addTexturedButton(id("b-searchByName"), "§bSzukaj po nazwie", 5, 235, 80, 15, buttonTexture); // 999

        gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, buttonTexture);
    }

    e.player.showCustomGui(gui);
}, null, "eliksirCreatorMenu");

// gui 8
new Gui("stepList", function(e) {
    var gui = baseGui(true);

    var tmp = KOCIOLEK.getStoreddata().get('elki'); 
    tmp = JSON.parse(tmp) || {};
    var lista = tmp.current.list || [];

    var cena = tmp.current.price || 0;

    gui.addLabel(id("l-info"), "§1Aktualna lista kroków", 85, 10, 100, 20); // 9
    gui.addLabel(id("l-price"), "§eCena: " + cena, 5, 10, 50, 20); // 10
    gui.addLabel(id("l-info1"), "§3[I]", 230, 20, 15, 15)
        .setHoverText(["§7Informacja o zaznaczonym kroku"]); // 11
    gui.addScroll(id("s-list"), 8, 45, 240, 180, lista); // 43

    gui.addTexturedButton(id("b-saveRecipe"), "§8Zapisz przepis", 5, 235, 80, 15, buttonTexture)
        .setHoverText(["§7Aby stworzyć przepis z aktualnego", "§7Musisz mieć §azeszyt §7na §ctoolbarze"]); // 12

    gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, buttonTexture); // 991

    e.player.showCustomGui(gui);
}, null, "eliksirCreatorMenu");

// gui 9
new Gui("modifyIngredient", function(e, skladnik) {
    var gui = baseGui(true);
    //{name:sel[0], ile: sel[1], jednostka: sel[2], akcje: []}

    gui.addLabel(id("l-info"), "§1Modyfikacja składnika: §b"+ skladnik.name +" "+ skladnik.ile +" "+ skladnik.jednostka, 40, 10, 200, 20); // 9
    gui.addLabel(id("l-lm"), "§4[LM]", 10, 10, 20, 20)
        .setHoverText(skladnik.akcje); // 19

    if( skladnik.typ == "eq" )
        gui.addLabel(id("l-info1"), "§cSkładnik własny", 40, 30, 200, 20); // 29
    

    //1 rząd
    gui.addTexturedButton(id("b-crush"), "§7Zmiażdż", 40, 80, 80, 15, buttonTexture); // 401
    gui.addTexturedButton(id("b-cut"), "§7Potnij", 40, 100, 80, 15, buttonTexture); // 402
    gui.addTexturedButton(id("b-snip"), "§7Natnij", 40, 120, 80, 15, buttonTexture); // 403
    gui.addTexturedButton(id("b-tear"), "§7Porwij", 40, 140, 80, 15, buttonTexture); // 404
    gui.addTexturedButton(id("b-rub"), "§7Zetrzyj", 40, 160, 80, 15, buttonTexture); // 409
    gui.addTexturedButton(id("b-break"), "§7Połam", 40, 180, 80, 15, buttonTexture); // 412
    //2 rząd
    gui.addTexturedButton(id("b-crumble"), "§7Pokrusz", 130, 80, 80, 15, buttonTexture); // 405
    gui.addTexturedButton(id("b-peel"), "§7Obierz", 130, 100, 80, 15, buttonTexture); // 406
    gui.addTexturedButton(id("b-burn"), "§7Przypal", 130, 120, 80, 15, buttonTexture); // 407
    gui.addTexturedButton(id("b-dry"), "§7Wysusz", 130, 140, 80, 15, buttonTexture); // 408
    gui.addTexturedButton(id("b-grind"), "§7Zmiel", 130, 160, 80, 15, buttonTexture); // 411

    gui.addTexturedButton(id("b-addIngredient"), "§aDodaj składnik", 5, 235, 80, 15, buttonTexture); // 410
    gui.addTexturedButton(id("b-put&pull"), "§bZanurz i wyciągnij", 90, 235, 80, 15, buttonTexture); // 413


    gui.addTexturedButton(id("b-goBack"), "§8Powrót", 175, 235, 80, 15, buttonTexture);

    e.player.showCustomGui(gui);
}, null, "ingredientSelector");

// gui 10
new Gui("eqIngredient", function(e) {
    //dodawanie składniku z eq
    var gui = baseGui(true);
    gui.addLabel(id("l-info"), "§1Wybierz Ilość i Składnik", 95, 0, 130, 20); // 9
    gui.addLabel(id("l-warning"), "§4§l[UWAGA]", 5, 5, 80, 30)
        .setHoverText(["§4Wpisz najpierw wartość potem kliknij dwukrotnie na składnik!"]); // 19

    var items = e.player.getInventory().getItems();
    var skladniki = [];
    for( var i = 0; i < items.length; i++ ) {
        var lore = items[i].getLore();
        if( lore.length >= 2 )
            if( lore[0].toLowerCase() == "§askładnik eliksiru" )
                skladniki.push(items[i].getDisplayName()+" §7["+ lore[1] +"§7]");
    }

    gui.addLabel(id("l-quantity"), "§3ilość:", 105, 20, 60, 20); // 29
    gui.addTextField(id("in-quantity1"), 125, 22, 30, 15); // 5
    gui.addScroll(id("s-eqIngredient"), 5, 45, 245, 180, skladniki); // 42

    gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, buttonTexture);
    e.player.showCustomGui(gui);
}, null, "eliksirCreatorMenu");

// gui 11
new Gui("selectEliksirToSend", function(e, searched) {
    var gui = baseGui();

    gui.addLabel(id("l-info"), "§4Wpisz nazwę eliksiru", 90, 0, 100, 20); // 9

    var data = searched ? getEliksir({ nazwal: searched }) : getEliksir();
    if( !data || data.error )
        return e.player.message("[§cDebugger§f] §7Error, pisz do administracji! "+ error);
    
    data = data.result;
    var lista = [];

    for( var i=0; i < data.length; i++ )
        lista.push(data[i].nazwa);
    

    gui.addScroll(id("s-eliksirs"), 10, 15, 240, 210, lista); // 52

    gui.addTextField(id("in-searchByName"), 90, 235, 70, 15); // 7
    gui.addTexturedButton(id("b-searchByName"), "§bSzukaj po nazwie", 5, 235, 80, 15, buttonTexture); // 998

    gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, buttonTexture);

    e.player.showCustomGui(gui);
}, null, "eliksirCreatorMenu");

// gui 12
new Gui("eliksirInocreation", function(e) {
    var gui = baseGui();

    gui.addLabel(id("l-info"), "§9Wybierz eliksir do inokreacji", 70, 0, 160, 20); // 9

    var items = e.player.getInventory().getItems();
    var eliksiry = getMysteriousElixirs( items )

    gui.addScroll(id("s-inocreation"), 10, 15, 240, 210, eliksiry); // 62
    gui.addTexturedButton(id("b-goBack"), "§4Menu główne", 90, 230, 80, 15, buttonTexture); // 31

    e.player.showCustomGui(gui);
}, null, "start");

// gui 13
new Gui("labelMaker", function(e, eliksir) {
    var gui = baseGui(true);

    if(!eliksir){
        gui.addLabel(id("l-info"), "§9Wybierz eliksir do Etykiety", 80, 0, 100, 20); // 9

        // new function
        var items = player.getInventory().getItems();
        var eliksiry = getMysteriousElixirs( items );
        
        gui.addScroll(id("s-labelSelector"), 10, 15, 240, 210, eliksiry); // 63
        gui.addTexturedButton(id("b-goBack"), "§4Menu główne", 90, 230, 80, 15, buttonTexture); // 31
    }else{
        gui.addLabel(id("l-info"), "§9Wpisz etykietę", 95, 0, 100, 20); // 9
        gui.addLabel(id("l-info1"), "§c[I]", 5, 10, 100, 20)
            .setHoverText(["§7Aby dodać kolor:","§7wpisz & i opis koloru","§7Np. §a&a §7/ §6&6"]); // 10

        gui.addLabel(id("l-eliksir"), eliksir, 250, 0, 100, 20); // 11

        gui.addTextField(id("in-labelText"), 70, 80, 120, 20); // 19
        gui.addTexturedButton(id("b-addLabel"), "§2Dodaj etykietę", 90, 110, 80, 15, buttonTexture); // 20

        gui.addTexturedButton(id("b-removeLabel"), "§cUsuń etykietę", 5, 230, 80, 15, buttonTexture); // 32
        gui.addTexturedButton(id("b-goBack"), "§4Menu główne", 170, 230, 80, 15, buttonTexture); // 31
    }

    e.player.showCustomGui(gui);
}, null, "start");



// handlers:
function customGuiScroll(e){
    try{
        if(!KOCIOLEK)
            throw "Nie znaleziono egzekującego bloku!";

    }
    catch(er){
        print("Scroll error: "+er);
    }
}




// exported from other file
var buttonTexture = "customnpcs:textures/gui/pp_button.png";
function baseGui(b){
    try{
        var gui = API.createCustomGui(id("g-base"), 256, 256, false); // 1

        var x = gui.addLabel(id("l-recipeInfo"), "§c[P]", 265, 0, 30, 30); // 56

        if(!KOCIOLEK)
            throw "Brak KOCIOLEK!";

        var sdata = KOCIOLEK.getStoreddata();
        var elki = JSON.parse( sdata.get("elki") );

        b ? gui.setBackgroundTexture("customnpcs:textures/gui/elki_e.png") : gui.setBackgroundTexture("customnpcs:textures/gui/elki.png");
        
        gui.addTexturedButton(id("b-switchCrucible"), "", 256, 30, 30, 30, "customnpcs:textures/gui/ikonki/elki.png")
            .setHoverText(["§7Przełącz kociołek", "§7Aktualny kociołek: §a"+ (elki.id || "Główny"), "§7" + (sdata.get("kociolek") || "Kociołek cynowy, Rozmiar 2") ]); // 55
        
        if ( elki.side && elki.side.list.length > 0 ) 
            gui.addButton(id("b-mergeCrucibles"), "§a[+]", 290, 40, 20, 20)
                .setHoverText(["§7Dodaj drugi kociołek", "§7Do aktualnego"]); // 57
        
    
        if( sdata.get("przepis") ) { 

            // todo: CHANGE HOVER TEXT TO [1], [2], [3], [4], [5]... 20 lines max.
            x.setHoverText([sdata.get("przepis")]);
        } else x.setHoverText(["§7Przepis..."]);


        if( elki.current && elki.current.wait > 0 ){
            if( elki.current.wait > Date.now() ){
                var data = new Date( elki.current.wait );
                var waitTo = "§c"+ data.getHours() +"§f:§a"+ data.getMinutes() +"§f;§b"+ data.getSeconds() +" §f(§d"+ data.getDate() +"§f.§d"+ (data.getMonth()+1) +"§f.§d"+ data.getFullYear() +"§f)";
                
                gui.addTexturedRect(id("l-waitUntil"), "customnpcs:textures/gui/ikonki/elki.png", 256, 70, 30, 30, 64, 0)
                    .setHoverText(["§aZaczekaj do:", waitTo, "§0.", "§cHH§f:§aMM§f;§bSS §f(§dDD§f.§dMM§f.§dRRRR§f)"]); // 954
            }
        }

        return gui;
    }
    catch(er){
        print("basegui error: "+er);
    }
}

var _GUI_IDS = {};
var _GUI = {};
function id(name) {
    return _GUI_IDS[name] || ( _GUI_IDS[name] = Object.keys(_GUI_IDS).length + 1 );
}
function getGui( guiName ) {
    if( !guiName || !_GUI[guiName] ) return { name: "", show: function() {}, next: null, prev: null };

    return _GUI[guiName]
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

function getMysteriousElixirs( items ) {
    var eliksiry = [];

    if( !items || typeof items != "object" || items.length == 0 ) return eliksiry;

    for( var i = 0; i < items.length; i++ ){
        if( items[i].getDisplayName() == "§eTajemniczy Eliksir" ){
            var lore = items[i].getLore();
            if( lore.length >= 3 )
                eliksiry.push(lore[0]+" §7§l/§r "+ lore[1]+" §7§l/§r "+lore[2]);
        }
    }

    return eliksiry;
}