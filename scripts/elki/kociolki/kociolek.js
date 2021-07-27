var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var npc;
var pos;
var version = "3.1.2021-4";

/*
    Eliksir: {
        name: nazwa
        list: [...kroki]
        wait: timestamp - do kiedy czekać musi
        temp: temperatura
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
        npc = e.block;
        pos = npc.getPos();

        var data = e.block.getStoreddata();
        var elk = data.get("elki");
        elk = JSON.parse(elk) || {};
        var change;
        if(!elk.current){ elk.current = { list:[], wait:0, temp:0, ignis: false }; change = true; }
        if(!elk.side){ elk.side = { list:[], wait:0, temp:0, ignis: false }; change = true; }
        if(!elk.id){ elk.current.id = "Główny"; change = true; }
        if(change){ data.put("elki", JSON.stringify(elk)); }
    
        if(data.get('update') != version){ update(e) }
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
        //var mainh = e.player.getMainhandItem();
        //if(mainh.getDisplayName().indexOf("testera")>-1){
            if( !npc || !pos ){
                npc = e.block;
                pos = npc.getPos();
            }
            return gui1(e.player);
        //}else{
        //    return e.player.message("[§cInfo§f] §7Kociołki chwilowo niedostępne :v");
        //}
    }
    catch(er){
        print("interact error: "+ er);
    }
}


function baseGui(b){
    try{
        var gui = API.createCustomGui(1, 256, 256, false);

        var x = gui.addLabel(56, "§c[P]", 265, 0, 30, 30);

        if(!npc)
            throw "Brak npc!";

        var sdata = npc.getStoreddata();
        var elki = JSON.parse(sdata.get("elki"));
        b?gui.setBackgroundTexture("customnpcs:textures/gui/elki_e.png"):gui.setBackgroundTexture("customnpcs:textures/gui/elki.png");
        gui.addTexturedButton(55, "", 256, 30, 30, 30, "customnpcs:textures/gui/ikonki/elki.png").setHoverText(["§7Przełącz kociołek", "§7Aktualny kociołek: §a"+ (elki.id || "Główny"), "§7" + (sdata.get("kociolek") || "Kociołek cynowy, Rozmiar 2") ]);
        if ( elki.side && elki.side.list.length > 0 ) { 
            gui.addButton(57, "§a[+]", 290, 40, 20, 20).setHoverText(["§7Dodaj drugi kociołek", "§7Do aktualnego"]); 
        }
    
        sdata.get("przepis")? x.setHoverText([sdata.get("przepis")]): x.setHoverText(["§7Przepis..."]);

        if(elki.current && elki.current.wait > 0){
            if(elki.current.wait > Date.now()){
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

function gui1(player){
    //main gui
    var gui = baseGui();
    
    gui.addTexturedButton(1, "§2Dokończ Eliksir", 5, 115, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(11, "§5Nowy Eliksir", 175, 115, 80, 15, "customnpcs:textures/gui/pp_button.png");
    // gui.addTexturedButton(21, "§4Moje Eliksiry", , "customnpcs:textures/gui/pp_button.png"); <- wyrzucić
    gui.addTexturedButton(41, "§3Inokreacja", 5, 230, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(42, "§3Etykieter", 175, 230, 80, 15, "customnpcs:textures/gui/pp_button.png");
    
    player.showCustomGui(gui);
    return gui;
}
function gui2(player){
    //Dokończ eliksir
    var gui = API.createCustomGui(1, 256, 256, false);
    gui.setBackgroundTexture("customnpcs:textures/gui/inve.png");

    gui.addLabel(9, "§4Wrzuć fiolkę", 85, 62, 55, 20).setHoverText("§7Wrzuć fiolkę ze zlanym eliksirem");
    gui.addItemSlot(100, 20);
    
    gui.addLabel(10, "§4Dodaj Przepis", 85, 82, 55, 20).setHoverText("§7Dodaj item z przepisem, pojawi się po prawej stronie!");
    gui.addItemSlot(100, 40);
    gui.addTexturedRect(11, "customnpcs:textures/gui/trader.png", 139, 84, 18, 18, 31, 139);
    gui.addButton(111, "§c✖", 160, 83, 20, 20).setHoverText(["§7Usuwa przepis z podglądu"]);

    gui.showPlayerInventory(8, 113);

    gui.addButton(31, "§4Menu Główne", 90, 135, 80, 20);

    player.showCustomGui(gui);
    return gui;
}
function gui3(player, current, show){
    //twórz elki
    var gui = baseGui();

    gui.addTexturedButton(101, "§1Kociołek", 5, 115, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(102, "§2Dodaj składnik", 90, 95, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(103, "§3Lista kroków", 175, 115, 80, 15, "customnpcs:textures/gui/pp_button.png");

    gui.addTexturedButton(104, "§bZapisz Eliksir", 5, 230, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(105, "§aWyślij do weryfikacji", 90, 230, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(106, "§cWylej", 175, 230, 80, 15, "customnpcs:textures/gui/pp_button.png");

    var tmp = npc.getStoreddata().get('elki'); 
    tmp = JSON.parse(tmp) || {};
    if(!current){
        if(tmp.current && tmp.current.list && tmp.current.list.length>0){
            if(!show){
                player.message("[§cEliksiry§f] §7Kończysz tworzyć eliksir!");
            }
        }else{
            if(!show){
                player.message("[§cEliksiry§f] §7Rozpoczęto tworzenie eliksiru!");
            }
            tmp.current = {name: "", list: [], wait: 0, temp: 0, ignis: false};
            npc.getStoreddata().put('elki', JSON.stringify(tmp));
        }
    }

    player.showCustomGui(gui);
    return gui;
}
function gui6(player){
    //Edytowanie kociołka
    var gui = baseGui(true);

    gui.addLabel(99, "§1Kociołek", 115, 0, 80, 20);

    gui.addTexturedButton(201, "§7Wlej wodę", 5, 20, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTextField(101, 90, 20, 30, 15);
    gui.addLabel(151, "§3ml", 122, 20, 15, 15);
    gui.addTexturedButton(202, "§7Wlej alkohol", 5, 40, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTextField(102, 90, 40, 30, 15);
    gui.addLabel(152, "§3ml", 122, 40, 15, 15);
    gui.addTexturedButton(203, "§7Zwiększ temperaturę", 5, 60, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTextField(103, 90, 60, 30, 15);
    gui.addLabel(153, "§3°C", 122, 60, 15, 15);
    gui.addTexturedButton(204, "§7Zmniejsz temperaturę", 5, 80, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTextField(104, 90, 80, 30, 15);
    gui.addLabel(154, "§3°C", 122, 80, 15, 15);

    var ndata = npc.getStoreddata();
    var elki = ndata.get('elki');
    elki = JSON.parse(elki) || {};

    gui.addLabel(156, "§3Aktualna temperatura: §b"+elki.current.temp+" §3°C", 20, 100, 100, 20);

    // ignis
    // gui.addTexturedButton(925, "", 190, 170, 30, 30, "customnpcs:textures/gui/ikonki/elki.png").setTextureOffset(35, 0);

    gui.addTexturedButton(205, "§cRozpal ogień", 150, 20, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(206, "§bZgaś ogień", 150, 40, 80, 15, "customnpcs:textures/gui/pp_button.png");

    gui.addTextField(211, 150, 70, 80, 15);
    gui.addTexturedButton(212, "§dDodaj akcję wyżej", 150, 90, 80, 15, "customnpcs:textures/gui/pp_button.png");


    gui.addLabel(999, "§1Mieszadło", 115, 130, 80, 20);

    gui.addTexturedButton(207, "§7Mieszaj w lewo", 5, 150, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTextField(107, 90, 150, 30, 15);
    gui.addLabel(157, "§3razy", 122, 150, 20, 15);
    gui.addTexturedButton(208, "§7Mieszaj w prawo", 5, 170, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTextField(108, 90, 170, 30, 15);
    gui.addLabel(158, "§3razy", 122, 170, 20, 15);


    gui.addLabel(998, "§1Czasomierz", 115, 200, 80, 20);
    gui.addTexturedButton(209, "§7Odczekaj chwilkę", 5, 220, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTextField(109, 90, 220, 30, 15);
    gui.addLabel(159, "§3Minut", 122, 220, 20, 15);

    gui.addTexturedButton(991, "§8Powrót", 170, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");

    player.showCustomGui(gui);
    return gui;
}
function gui7(player, b, search){
    //dodawanie składnika
    var gui = baseGui(true);

    if(!b){
        gui.addLabel(9, "§1Wybierz typ składnika", 95, 0, 80, 20);

        gui.addTexturedButton(301, "§7Nieorganiczne", 40, 80, 80, 15, "customnpcs:textures/gui/pp_button.png");
        gui.addTexturedButton(302, "§7Bazy wodne", 130, 80, 80, 15, "customnpcs:textures/gui/pp_button.png");
        gui.addTexturedButton(303, "§7Roślinne", 40, 110, 80, 15, "customnpcs:textures/gui/pp_button.png");
        gui.addTexturedButton(304, "§7Zwierzęce", 130, 110, 80, 15, "customnpcs:textures/gui/pp_button.png");
        gui.addTexturedButton(305, "§7Własny (z eq)", 90, 140, 80, 15, "customnpcs:textures/gui/pp_button.png");

        gui.addTexturedButton(991, "§8Powrót", 170, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");
    }
    else{
        gui.addLabel(9, "§1Wybierz Ilość i Składnik", 95, 0, 120, 20);
        gui.addLabel(10, "§5"+b, 190, 20, 80, 20);
        gui.addLabel(19, "§4§l[UWAGA]", 5, 5, 80, 30).setHoverText(["§r§4Wpisz najpierw wartość potem kliknij dwukrotnie na składnik!"]);

        var skladniki = getSkladnik({typ: b})
        if(skladniki.error){
            return e.player.message("[§cDebugger§f] §7Error, napisz do administracji! -"+skladniki.error);
        }
        skladniki = skladniki.result;

        var lista1=[];
        for(var i=0; i<skladniki.length; i++){
            if(search && skladniki[i].nazwa.toLowerCase().indexOf(search.toLowerCase())>-1){
                if(skladniki[i].dostępny == true){
                    lista1.push(skladniki[i].nazwa+"  ["+skladniki[i].jednostka+"]");
                }
            }else if(!search){
                if(skladniki[i].dostępny == true){
                    lista1.push(skladniki[i].nazwa+"  ["+skladniki[i].jednostka+"]");
                }
            }
        }
        //lista1.sort();

        gui.addLabel(29, "§3ilość:", 105, 20, 60, 20);
        gui.addTextField(5, 125, 22, 30, 15);
        gui.addScroll(32, 8, 45, 240, 180, lista1);

        gui.addTextField(7, 90, 235, 70, 15);
        gui.addTexturedButton(999, "§bSzukaj po nazwie", 5, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");

        gui.addTexturedButton(991, "§8Powrót", 170, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");
    }


    player.showCustomGui(gui);
    return gui;
}
function gui8(player){
    //lista kroków
    var gui = baseGui(true);

    var tmp = npc.getStoreddata().get('elki'); 
    tmp = JSON.parse(tmp) || {};
    var lista = tmp.current.list || [];

    var cena = tmp.current.price || 0;

    gui.addLabel(9, "§1Aktualna lista kroków", 85, 10, 100, 20);
    gui.addLabel(10, "§eCena: "+cena, 5, 10, 50, 20);
    gui.addLabel(11, "§3[I]", 230, 20, 15, 15).setHoverText(["§7Informacja o zaznaczonym kroku"]);
    gui.addScroll(43, 8, 45, 240, 180, lista);

    gui.addTexturedButton(12, "§8Zapisz przepis", 5, 235, 80, 15, "customnpcs:textures/gui/pp_button.png").setHoverText(["§7Aby stworzyć przepis z aktualnego", "§7Musisz mieć §azeszyt §7na §ctoolbarze"]);

    gui.addTexturedButton(991, "§8Powrót", 170, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");

    player.showCustomGui(gui);
    return gui;
}
function gui9(player, skladnik){
    //modyfikacja składniku
    var gui = baseGui(true);
    //{name:sel[0], ile: sel[1], jednostka: sel[2], akcje: []}

    gui.addLabel(9, "§1Modyfikacja składnika: §b"+skladnik.name+" "+skladnik.ile+" "+skladnik.jednostka, 40, 10, 200, 20);
    gui.addLabel(19, "§4[LM]", 10, 10, 20, 20).setHoverText(skladnik.akcje);
    if(skladnik.typ=="eq"){
        gui.addLabel(29, "§cSkładnik własny", 40, 30, 200, 20);
    }

    //1 rząd
    gui.addTexturedButton(401, "§7Zmiażdż", 40, 80, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(402, "§7Potnij", 40, 100, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(403, "§7Natnij", 40, 120, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(404, "§7Porwij", 40, 140, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(409, "§7Zetrzyj", 40, 160, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(412, "§7Połam", 40, 180, 80, 15, "customnpcs:textures/gui/pp_button.png");
    //2 rząd
    gui.addTexturedButton(405, "§7Pokrusz", 130, 80, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(406, "§7Obierz", 130, 100, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(407, "§7Przypal", 130, 120, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(408, "§7Wysusz", 130, 140, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(411, "§7Zmiel", 130, 160, 80, 15, "customnpcs:textures/gui/pp_button.png");

    gui.addTexturedButton(410, "§aDodaj składnik", 5, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(413, "§bZanurz i wyciągnij", 90, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");
    gui.addTexturedButton(991, "§8Powrót", 175, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");

    player.showCustomGui(gui);
    return gui; 
}
function gui10(player){
    //dodawanie składniku z eq
    var gui = baseGui(true);
    gui.addLabel(9, "§1Wybierz Ilość i Składnik", 95, 0, 130, 20);
    gui.addLabel(19, "§4§l[UWAGA]", 5, 5, 80, 30).setHoverText(["§4Wpisz najpierw wartość potem kliknij dwukrotnie na składnik!"]);

    var items = player.getInventory().getItems();
    var skladniki = [];
    for(var i = 0; i < items.length; i++){
        var lore = items[i].getLore();
        if(lore.length>=2)
            if(lore[0].toLowerCase()=="§askładnik eliksiru")
                skladniki.push(items[i].getDisplayName()+" §7["+lore[1]+"§7]");
    }

    gui.addLabel(29, "§3ilość:", 105, 20, 60, 20);
    gui.addTextField(5, 125, 22, 30, 15);
    gui.addScroll(42, 5, 45, 245, 180, skladniki);

    gui.addTexturedButton(991, "§8Powrót", 170, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");
    player.showCustomGui(gui);
    return gui; 
}
function gui11(player, searched){
    //podaj nazwę elku i wyślij
    var gui = baseGui();

    gui.addLabel(9, "§4Wpisz nazwę eliksiru", 90, 0, 100, 20);

    var data = searched? getEliksir({ nazwal: searched }): getEliksir();
    if(data.error)
        return e.player.message("[§cDebugger§f] §7Error, pisz do administracji! "+error);
    
    data = data.result;
    var lista = [];
    for(var i=0; i<data.length; i++)
        lista.push(data[i].nazwa);
    

    gui.addScroll(52, 10, 15, 240, 210, lista);

    gui.addTextField(7, 90, 235, 70, 15);
    gui.addTexturedButton(998, "§bSzukaj po nazwie", 5, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");

    gui.addTexturedButton(991, "§8Powrót", 170, 235, 80, 15, "customnpcs:textures/gui/pp_button.png");

    player.showCustomGui(gui);
    return gui;
}
function gui12(player){
    var gui = baseGui();

    gui.addLabel(9, "§9Wybierz eliksir do inokreacji", 70, 0, 160, 20);

    var items = player.getInventory().getItems();
    var eliksiry = [];
    for(var i = 0; i < items.length; i++){
        if(items[i].getDisplayName()=="§eTajemniczy Eliksir"){
            var lore = items[i].getLore();
            if( lore.length >= 3 )
                eliksiry.push(lore[0]+" §7§l/§r "+ lore[1]+" §7§l/§r "+lore[2]);
        }
    }
    gui.addScroll(62, 10, 15, 240, 210, eliksiry);
    gui.addTexturedButton(31, "§4Menu główne", 90, 230, 80, 15, "customnpcs:textures/gui/pp_button.png");

    player.showCustomGui(gui);
    return gui;
}
function gui13(player, eliksir){
    var gui = baseGui(true);

    if(!eliksir){
        gui.addLabel(9, "§9Wybierz eliksir do Etykiety", 80, 0, 100, 20);

        var items = player.getInventory().getItems();
        var eliksiry = [];
        for(var i = 0; i < items.length; i++){
            if(items[i].getDisplayName()=="§eTajemniczy Eliksir"){
                var lore = items[i].getLore();
                if( lore.length >= 3 )
                    eliksiry.push(i+". "+lore[0]+" §7§l/§r "+ lore[1]+" §7§l/§r "+lore[2]);
            }
        }
        gui.addScroll(63, 10, 15, 240, 210, eliksiry);
        gui.addTexturedButton(31, "§4Menu główne", 90, 230, 80, 15, "customnpcs:textures/gui/pp_button.png");
    }else{
        gui.addLabel(9, "§9Wpisz etykietę", 95, 0, 100, 20);
        gui.addLabel(10, "§c[I]", 5, 10, 100, 20).setHoverText(["§7Aby dodać kolor:","§7wpisz & i opis koloru","§7Np. §a&a §7/ §6&6"])
        gui.addLabel(11, eliksir, 250, 0, 100, 20);

        gui.addTextField(19, 70, 80, 120, 20);
        gui.addTexturedButton(20, "§2Dodaj etykietę", 90, 110, 80, 15, "customnpcs:textures/gui/pp_button.png");

        gui.addTexturedButton(32, "§cUsuń etykietę", 5, 230, 80, 15, "customnpcs:textures/gui/pp_button.png");
        gui.addTexturedButton(31, "§4Menu główne", 170, 230, 80, 15, "customnpcs:textures/gui/pp_button.png");
    }

    player.showCustomGui(gui);
    return gui;
}

//event hadnler
function customGuiSlot(e){
    try{

        if(!npc)
            return print("Nie znaleziono egzekującego bloku!");

        switch ( e.slotId ){
            case 0:{
                if(e.stack.getDisplayName().indexOf("Tajemniczy eliksir:")>-1){
                    var id = e.stack.getDisplayName().split(": ")[1];
                    var zlane = getZlane(id);
                    if(zlane.error || !zlane.result[0]){
                        e.player.message("[§cDebugger§f] §7Error, pisz do administracji: "+zlane.error);
                        throw zlane.error;
                    }
                    zlane = zlane.result[0];
        
                    var data = npc.getStoreddata();
                    var elki = data.get("elki");
                    elki = JSON.parse(elki) || {};
                    elki.current = JSON.parse(zlane.json);
                    
                    data.put("elki",JSON.stringify(elki));
        
                    return gui3(e.player);
                }
                break;
            }
            case 1:{
                if(e.stack.getName().indexOf("book")>-1){
                    var nbt = e.stack.getNbt();
                    if(nbt.has("przepis")){
                        try{
                            var list = nbt.getList("przepis", nbt.getListType("przepis"));
                            list = Java.from(list);
                            list.unshift("§aPrzepis: ");
                            list = list.join("\n§7◆ ");
                            
                            var data = npc.getStoreddata();
                            data.put("przepis", list);
                            e.player.message("[§cDebugger§f] §7Załadowano przepis!");
                        }
                        catch(er){
                            print(er);
                            e.player.message("[§cDebugger§f] §7Nastąpił error: "+er);
                        }
                    }
                }
                return;
            }
        }
    }
    catch(er){
        print("Slot error: "+ er);
    }
}

function customGuiButton(e) {
    try{
        if(!npc)
            throw "Nie znaleziono egzekującego bloku!";

        switch ( e.buttonId ){
            case 1:  {/* kończ eliksir       */ gui2(e.player);break;}
            case 11: {/* nowy eliksir        */ gui3(e.player);break;}
            case 12:{
                //zapisz przepis:
                var inv = e.player.getInventory();
                var has;
                for(var i=0; i<9; i++){
                    var item = inv.getSlot(i);
                    if(item.getName().indexOf("writable_book")>-1)
                        has=i;
                }
                if(has){
                    var name = e.gui.getComponent(44);
                    if(!name){
                        var x = e.gui.addTextField(44, 0, 260, 256, 20).setHoverText(["§7Podaj Nazwę przepisu", "§7I kliknij przycisk ponownie!"]);
                        x.setText("Przepis "+e.player.getDisplayName());
                        return e.gui.update(e.player);
                    }
                    var scroll = e.gui.getComponent(43).getList();
                    name = name.getText();
                    name = name.replace(/&/g, "§");

                    var item = inv.getSlot(has);
                    if(item && item.getName().indexOf("writable_book")>-1){
                        item.setStackSize(item.getStackSize()-1);
                        item = e.player.world.createItem("minecraft:book",0,1);

                        item.setCustomName(name);
                        item.setLore(["§7Specjalny przepis", "§7Przygotowany przez: §7"+e.player.getDisplayName()]);

                        var nbt = item.getNbt();
                        nbt.setList("przepis", scroll);
                        
                        item = e.player.dropItem(item);
                        item.setOwner(e.player.getName());
                    }

                    return e.player.message("[§cEliksiry§f] §7Zapisano przepis!");
                }
                return e.player.message("[§cEliksiry§f] §7Nie znaleziono zeszytu!");
            }
            case 20:{
                //dodawanie etykiety
                var etykieta = e.gui.getComponent(19).getText();
                if(!etykieta || etykieta.length<=2){ return e.player.message("[§cEliksiry§f] §7Wpisz co najmniej 2 znaki!") }
                etykieta = etykieta.replace(/&/g, "§");
                

                var id = e.gui.getComponent(11).getText();
                if(!id){return e.player.message("[§cEliksiry§f] §7Nie znaleziono id!") }

                var items = e.player.getInventory().getItems();
                var eliksir = items[id];
                if(!eliksir || eliksir.getDisplayName().indexOf("Tajemniczy Eliksir")==-1){ return e.player.message("[§cEliksiry§f] §7Nie znaleziono eliksiru!") }
                if(eliksir.getNbt().getString("Etykieta")){ return e.player.message("[§cEliksiry§f] §7Eliksir ma już etykietę!") }

                var lore = Java.from(eliksir.getLore());
                lore.push("", etykieta);
                eliksir.setLore(lore);
                eliksir.getNbt().setString("Etykieta", etykieta);
                gui1(e.player);

                pisz(e.player, "Nakleił etykietę z eliksiru: "+etykieta+"");

                return e.player.message("[§cEliksiry§f] §7Zmieniono etykietę na: "+etykieta);
            }
            case 31: {/* wróć do menu główne */ gui1(e.player);break;}
            case 32:{
                //etykiety usuwanie
                var id = e.gui.getComponent(11).getText();
                if(!id){return e.player.message("[§cEliksiry§f] §7Nie znaleziono id!") }

                var items = e.player.getInventory().getItems();
                var eliksir = items[id];
                if(!eliksir || eliksir.getDisplayName().indexOf("Tajemniczy Eliksir")==-1){ return e.player.message("[§cEliksiry§f] §7Nie znaleziono eliksiru!") }
                
                var etykieta = eliksir.getNbt().getString("Etykieta");
                if(!etykieta){ return e.player.message("[§cEliksiry§f] §7Eliksir nie ma etykiety!") }
                
                var lore = Java.from(eliksir.getLore());
                var i = lore.indexOf(etykieta)-1;
                if(i<=-1){ return e.player.message("[§cEliksiry§f] §7Nie znaleziono etykiety w lore!") }
                lore.splice(i,2);
                eliksir.setLore(lore);
                eliksir.getNbt().remove("Etykieta");

                pisz(e.player, "Usunął etykietę z eliksiru");

                gui13(e.player);
                return e.player.message("[§cEliksiry§f] §7Usunięto etykietę!");
            }
            case 41: {/* inokreacja          */gui12(e.player);break;}
            case 42: {/* etykieter           */gui13(e.player);break;}
            case 55:{
                // zmień na side kociołek
                var data = npc.getStoreddata();
                var elki = JSON.parse(data.get("elki"));

                if(elki.switch && Date.now() - elki.switch < 5000 ){
                    return e.player.message("[§cEliksiry§f] §7Musisz zaczekać §a5 §7sekund za każdą zmianą!");
                }

                var x = elki.side;
                elki.side = elki.current;
                elki.current = x;
                elki.switch = Date.now();

                if(!elki.id){ elki.id = "Główny"; }
                elki.id=="Główny"?elki.id = "Dodatkowy":elki.id = "Główny";

                data.put("elki", JSON.stringify(elki));

                e.player.message("[§cEliksiry§f] §7Zmieniono kociołek na: §a"+elki.id);
                return pisz(e.player, "*Zmienił kociołek*"); 
            }
            case 57:{
                // dodaj eliksir z drugiego kociołka do aktualnego
                var data = npc.getStoreddata();
                var elki = JSON.parse(data.get("elki")) || {};
                if(elki.side && elki.side.list.length > 0){
                    if(!elki.current.price){ elki.current.price = 0; }
                    if(!elki.side.price){ elki.side.price = 0; }

                    elki.current.price += elki.side.price;
                    elki.current.list.push( "Przelej wywar z drugiego kociołka:\n- "+ elki.side.list.join("\n- ") )
                    elki.side = { list:[], wait:0, temp:0, ignis: false};

                    data.put("elki", JSON.stringify(elki));
                    return pisz(e.player, "Przelał wywar z jednego kociołka do drugiego");
                }
                return e.player.message("[§cEliksiry§f] §7w drugim kociołku nic nie ma!");

            }
            case 101:{/* otwórz kociołek    */gui6(e.player);break;}
            case 102:{/* dodaj składnik     */gui7(e.player);break;}
            case 103:{/* pokaż listę kroków */gui8(e.player);break;}
            case 104:{
                //zapisz do itemu
                var r = (Math.random() * 100).toString(36).slice(0,13);
                var item = e.player.world.createItem("harvestcraft:blueberryjuiceitem",0,1);
                item.setCustomName("§9Tajemniczy eliksir: "+r);
                item.setLore(["§7Przedmiot jest tymczasowy","§7Przechowuje on informacje o tworzonym eliksirze.", "§7Możesz go wrzucić do kociołka aby dokończyć tworzenie!","§7Aby to zrobić kliknij w opcję: §2Dokończ eliksir", "§7I daj item do slotu"]);
                
                var tmp = npc.getStoreddata().get('elki');
                tmp = JSON.parse(tmp) || {};
                if(!tmp.current || tmp.current.list.length==0){
                    return e.player.message("[§cEliksiry§f] §7Nie masz czego zlewać!");
                }

                var zlane = addZlane(r, escapeString(JSON.stringify(tmp.current)));
                if(zlane.error)
                    return e.player.message("[§cDebugger§f] §7Error, pisz do administracji: "+zlane.error);
                

                pisz(e.player, "Zlał eliksir do butelki aby dokończyć go później");
                tmp.current = { list:[], wait:0, temp: 0, ignis: false};
                npc.getStoreddata().put('elki', JSON.stringify(tmp));
                npc.getTimers().stop(1);
                e.player.giveItem(item);
                break;
            }
            case 105:{
                /* Wyślij, check name */ 
                var data = getOczekujace({ gracz: e.player.getName(), weryfikowane: 3, odebrane: 0 });
                if(data.error){
                    return e.player.message("[§cDebugger§f] Error, pisz do administracji: "+data.error);
                }
                data = data.result;

                var n = data.length;
                if(n>7){
                    return e.player.message("[§cEliksiry§f] §7Możesz mieć tylko §c§l6§r§7 eliksirów na raz w tworzeniu!")
                }

                var current = JSON.parse(npc.getStoreddata().get("elki")) || {};
                if(current.current.list && current.current.list.length < 2){
                    return e.player.message("[§cEliksiry§f] §7Kociołek jest pusty!");
                }

                return gui11(e.player); 
            }
            case 106:{
                //wylewanie elka
                var tmp = npc.getStoreddata().get('elki');
                tmp = JSON.parse(tmp) || {};
                if(tmp.current.list && tmp.current.list.length==0){
                    return e.player.message("[§cEliksiry§f] §7Kociołek jest pusty!");
                }
                tmp['current'] = {name: "", list: [], wait: 0, temp:0, ignis: false};
                npc.getStoreddata().put('elki', JSON.stringify(tmp));
                pisz(e.player, "Wylewa eliksir z kociołka");
                e.player.message("[§cEliksiry§f] §7Wylano eliksir! Możesz zacząć tworzyć od nowa.");
                npc.getTimers().stop(1);
                break;
            }
            case 111:{
                // usuwanie przepisu
                var data = npc.getStoreddata();
                data.remove("przepis");
                e.player.message("[§cKociołek§f] §7Usunięto przepis!");
                return;
            }
            //handle kociołek
            case 201: case 202:{ var x = handleAdd(e); if(!x){return} pisz(e.player, "Wlał jakiś płyn do kociołka §7["+x.ile+"ml]"); break;}
            case 203:{ var x = handleAdd(e); if(!x){return}  var y = temp(e, parseInt(parseFloat(x.ile))); if(!y){return}  pisz(e.player, "Zwiększył temperaturę w kociołku o §7"+x.ile+"°C");  break; }
            case 204:{ var x = handleAdd(e); if(!x){return}  var y = temp(e, (-1)*(parseInt(parseFloat(x.ile)))); if(!y){return}  pisz(e.player, "Zmniejszył temperaturę w kociołku o §7"+x.ile+"°C");  break; }
            case 205:{  var tmp = JSON.parse(npc.getStoreddata().get('elki')) || {};  if(tmp.current.ignis == true){ return e.player.message("[§cKociołek§f] §7Nie możesz podwójnie rozpalić ogniska ;0") }  npc.getTimers().forceStart(1, 90, true);   tmp.current.ignis = true;  npc.getStoreddata().put('elki', JSON.stringify(tmp));  var x = handleAdd(e); if(!x){return} pisz(e.player, "Rozpalił palenisko pod kociołkiem");  break; }
            case 206:{  var tmp = JSON.parse(npc.getStoreddata().get('elki')) || {};  if(tmp.current.ignis == false){ return e.player.message("[§cKociołek§f] §7Już jest zgaszone palenisko!") }  npc.getTimers().stop(1);   temp(e, (-1)*tmp.current.temp); tmp.current.ignis = false;  npc.getStoreddata().put('elki', JSON.stringify(tmp));             var x = handleAdd(e); if(!x){return} pisz(e.player, "Zgasił palenisko pod kociołkiem");    break; }
            case 207:{ var x = handleAdd(e); if(!x){return} pisz(e.player, "Zamieszał w lewo §7"+x.ile+" razy"); break;}
            case 208:{ var x = handleAdd(e); if(!x){return} pisz(e.player, "Zamieszał w prawo §7"+x.ile+" razy"); break;}
            case 209:{ var x = handleAdd(e); if(!x){return} pisz(e.player, "Odstawił eliksir na §7"+x.ile+" minut "); setWait(x.ile); break;}
            case 212:{ var akcja = e.gui.getComponent(211).getText(); if(!akcja){ return e.player.message("[§cKociołek§f] §7") } addToList("AC: "+akcja, e.player); pisz(e.player, akcja); break; }
            case 301: case 302: case 303: case 304: { /*wybierz kategorię składnika */ var text = e.gui.getComponent(e.buttonId).getLabel().replace(/§./g, ""); gui7(e.player, text); break;}
            case 305:{ /* własny składnik */ gui10(e.player); break;}
            //modyfikacja składników
            case 401:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Zmiażdżył składnik"); break;}
            case 402:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Pociął składnik"); break;}
            case 403:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Naciął składnik"); break;}
            case 404:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Porwał składnik"); break;}
            case 405:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Pokruszył składnik"); break;}
            case 406:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Obrał składnik"); break;}
            case 407:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Przypalił składnik"); break;}
            case 408:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Wysuszył składnik"); break;}
            case 409:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Starł składnik"); break;}
            case 411:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Zmielił składnik"); break;}
            case 412:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Połamał składnik"); break;}
            case 413:{ var x = handleSkladnik(e); if(!x){return} pisz(e.player, "Zanurzył na chwilę składnik i wyciągnął"); break; }
            case 410:{
                //review
                //dodawanie przygotowanego składnika
                var ndata = npc.getStoreddata();
                var elki = ndata.get('elki');
                elki = JSON.parse(elki) || {};
                var eq = e.gui.getComponent(29);
                if(elki.current.skladnik){
                    var t = Date.now();
                    if(t-elki.current.wait < 0){
                        pisz(e.player, "Niecierpliwy zrobił coś nie tak, a eliksir zaraz wybuchł mu przed nosem!");
                        elki.current = { list:[], wait:0, temp:0};
                        npc.getTimers().stop(1);
                        ndata.put('elki', JSON.stringify(elki));
                        npc.world.playSoundAt(pos, "minecraft:entity.generic.explode", 0.5, 0.8);
                        return npc.world.spawnParticle("explode", pos.getX()+0.5, pos.getY()+1.2, pos.getZ()+0.5, 0.3, 0.4, 0.3, 0.05, 40);
                    }
                    var skladnik = elki.current.skladnik;

                    var x = "Dodaj: "+skladnik.name+" ["+skladnik.ile+" "+skladnik.jednostka+" "+skladnik.akcje.join(", ")+"]";
                    if(!eq){ calculatePrice(e.player, skladnik); }
                    addToList(x, e.player);
                    pisz(e.player, "Dodał wcześniej przygotowany składnik do kociołka §c"+skladnik.name);

                    elki = JSON.parse(ndata.get('elki'));
                    elki.current.skladnik = {};
                    ndata.put('elki', JSON.stringify(elki));
                    npc.world.spawnParticle("splash", pos.getX()+0.5, pos.getY()+1.2, pos.getZ()+0.5, 0.2, 0.4, 0.2, 0.01, 40);
                    npc.world.playSoundAt(pos, "minecraft:entity.generic.splash", 0.3, 1.5);
                }else{
                    return e.player.message("[§cEliksiry§f] §7Coś poszło nie tak!");
                }
                //powrót do menu
                gui3(e.player, true, true);
                break;
            }
            case 991:{ /* powrót z dodawania składników */ gui3(e.player, true, true); break;}
            case 998:{ var text = e.gui.getComponent(7).getText(); return gui11(e.player, text) }
            case 999:{
                var text = e.gui.getComponent(7).getText();
                var b = e.gui.getComponent(10).getText().split("§5")[1];
                return gui7(e.player, b, text);
            }
        }
    }
    catch(er){
        print("Button error: "+er);
    }
}

function timer(e){
    if( !npc )
        return print("Nie znaleziono egzekującego bloku!");
        
    switch(e.id){
        case 1:{
            //kociołek ogień
            npc.world.spawnParticle("largesmoke", pos.getX()+0.5, pos.getY()+2.2, pos.getZ()+0.5, 0.1, 0.7, 0.1, 0.01, 3);
            break;
        }
    }
}

function customGuiScroll(e){
    try{
        if(!npc)
            throw "Nie znaleziono egzekującego bloku!";

        switch(e.scrollId){
            case 32:{
                if(!e.doubleClick)
                    return;
                var sel = e.selection[0];
                sel = sel.split("  [");
                //sel[0] = sel[0].split(""); sel[0].pop(); sel[0] = sel[0].join("");
                var typ = e.gui.getComponent(10).getText().split("§5")[1];
                var ile = parseFloat(e.gui.getComponent(5).getText()).toFixed(2);
                if(!ile || ile <= 0 || isNaN(ile))
                    return e.player.message("[§cEliksiry§f] §7Nie wpisano ile jednostki dodajesz! Wpisz ją i dopiero wtedy wybierz produkt.")

                sel[1] = sel[1].split("]")[0];
                var skladnik = {name:sel[0], ile: ile, jednostka: sel[1], akcje: [], typ:typ};
                var ndata = npc.getStoreddata();
                var elki = ndata.get('elki');
                elki = JSON.parse(elki) || {};
                if(elki.current)
                    elki.current.skladnik = skladnik; ndata.put('elki', JSON.stringify(elki));
                    
                //Edytuj składnik:
                gui9(e.player, skladnik);
                break;
            }
            case 42:{
                //dodaj custom składnik
                var ile = parseFloat(e.gui.getComponent(5).getText());
                if(!ile || ile <= 0 || isNaN(ile)){ return e.player.message("[§cEliksiry§f] §7Wpisz ile jednostek chcesz dodać!")}
                var sel = e.selection[0];
                var ilosc = sel.split("[§c")[1].replace("]","");
                sel = { name: sel.split(" §7[")[0], ilosc: parseFloat(ilosc), jednostka: ilosc.split( parseFloat(ilosc) )[1] }
                if(ile > sel.ilosc){ return e.player.message("[§cEliksiry§f] §7Wpisałeś za dużą jednostkę. Składnik ma tylko: §b" + sel.ilosc + sel.jednostka)}

                var items = e.player.getInventory().getItems();
                var item;
                for(var i=0; i<items.length; i++){
                    if(items[i].getDisplayName().indexOf(sel.name)>-1){
                        var lore = items[i].getLore();
                        if(lore.length>=2 && lore[0].toLowerCase() == "§askładnik eliksiru"){
                            if( parseFloat(lore[1].split("§c")[1]) >= ile ){
                                item = items[i];
                                i = items.length;
                            }
                        }
                    }
                }
                if(!item){return e.player.message("[§cEliksiry§f] §7Nie znaleziono składnika!")}

                if(item.getDisplayName().indexOf("§6Składnik Czasu")>-1){
                    var ndata = npc.getStoreddata();
                    var elki = JSON.parse(ndata.get("elki")) || {};
                    elki.current.wait = 0;
                    ndata.put('elki', JSON.stringify(elki));
                    e.player.message("[§cEliksiry§f] §7Użyto specjalnego itemu przyśpieszającego czas oczekiwania na eliksir!");
                    if(ile != sel.ilosc){
                        var lore = Java.from(item.getLore());
                        lore[1] = "§c"+ ( sel.ilosc - ile ) + sel.jednostka;
                        item.setLore(lore);
                    }else if( ile == sel.ilosc ){
                        item.setStackSize(item.getStackSize()-1);
                    }
                    gui3(e.player, true, true);
                }else{
                    if(ile != sel.ilosc){
                        var lore = Java.from(item.getLore());
                        lore[1] = "§c"+ ( sel.ilosc - ile ) + sel.jednostka;
                        item.setLore(lore);
                    }else if( ile == sel.ilosc ){
                        item.setStackSize(item.getStackSize()-1);
                    }

                    var skladnik = {name: item.getDisplayName(), ile: ile, jednostka: sel.jednostka, akcje: [], typ:"eq"};
                    var ndata = npc.getStoreddata();
                    var elki = ndata.get('elki');
                    elki = JSON.parse(elki) || {};
                    if(!elki.current){ 
                        elki.current = { list:[], wait:0, temp:0};
                    }

                    elki.current.skladnik = skladnik; 
                    ndata.put('elki', JSON.stringify(elki)); 

                    return gui9(e.player, skladnik);
                }
                break;
            }
            case 43:{
                // wyświetl info o zaznaczonym kroku na liście
                if(!e.doubleClick)
                    return;

                var select = e.selection[0];
                var label = e.gui.getComponent(11);
                label.setHoverText(select.split("\n"));

                return e.gui.update(e.player);
            }
            case 52:{
                if(!e.doubleClick)
                    return;

                //wyślij do weryfikacji
                var tmp = npc.getStoreddata();
                var elki = tmp.get('elki');
                elki = JSON.parse(elki) || {};
                var ename = e.selection[0];
                var kociolek = tmp.get("kociolek");

                var dcid = "";
                try{
                    dcid = npc.executeCommand("dcdid "+e.player.getName()) || "";
                    dcid = dcid.replace("\n", "").replace(/\s/g, "");
                    dcid = dcid || null;
                }catch(er){
                    e.player.message("[§cDebugger§f] §7Error przy pobieraniu discorda!");
                }

                if( elki.current ){
                    if(elki.current.list && elki.current.list.length >= 2){
                        var r = (Math.random() * 100).toString(36).slice(0,13); //id
                        var ver = {gracz: e.player.getName(), uuid: e.player.getUUID(), nazwa: ename, eliksir: elki.current.list, cena: elki.current.price || 0};
                        
                        if( dcid ) {
                            var firstTime = getOczekujace({ discord: dcid });
                            if( firstTime.error ) return e.player.message("[§cDebugger§f] §7Error przy wydawaniu nagrody!")
                            if( (firstTime.result || []).length == 0 || (firstTime.result || []).length % 50 == 0 ) {
                                var Przep = e.player.world.createItem("variedcommodities:letter", 0, 3);
                                Przep.setCustomName("§cPrzepustka do składziku");
                                Przep.setLore(["§7**Przepustka pozwala odebrać gotowy dowolny eliksir**"]);
                
                                var nbt = Przep.getNbt();
                                nbt.setString("createdBy", "Console");
                                e.player.dropItem(Przep).setOwner(e.player.getName());

                                e.player.sendNotification("Eliksiry", "Pierwszy Eliksir!", 2);
                            }
                        }

                        var test = addOczekujace(r, escapeString(ename), e.player.getName(), e.player.getUUID(), dcid, escapeString(JSON.stringify(elki.current.list)), elki.current.price, kociolek);
                        if(test.error) return e.player.message("[§cDebugger§f] §7Error, pisz do administracji: "+test.error); 

                        var x = ver.gracz+" Wysłał eliksir do weryfikacji! kod: \`"+r+"\`, nazwa: *"+ver.nazwa+"*, cena: *"+ver.cena+"* knutów\nKociołek: "+(kociolek || "Brak danych");
                        x=ang(x);
                        HTTP.post("https://discordapp.com/api/webhooks/730401458813665312/hMvfOnZ4jye7K9G8jNegC-r34zydsUa7GKRo-k_odPrE1E136TVEcsfup1rI0MculmUa",{
                            "content": x,
                            "tts": false,
                        });
                        elki.current = { list:[], wait:0, temp:0, ignis: false};
                        tmp.put('elki', JSON.stringify(elki));
                        npc.getTimers().stop(1);
                        gui1(e.player);
                        e.player.message("[§cEliksiry§f] §7Wysłano eliksir do weryfikacji! Pod ALT+G możesz sprawdzić status swoich eliksirów.");
                        return;
                    }else{
                        return e.player.message("[§cEliksiry§f] §7Brakuje listy, lub za krótka!");
                    }
                }else{
                    return e.player.message("[§cEliksiry§f] §7Nie znaleziono obecnego wywaru!");
                }

            }
            case 62:{
                //inokreacja
                var n = e.selection[0];
                var items = e.player.getInventory().getItems();
                var eliksir;
                for(var i = 0; i < items.length; i++){
                    if(items[i].getDisplayName()=="§eTajemniczy Eliksir"){
                        var lore = items[i].getLore();
                        if( n.indexOf(lore[0]) >- 1 && n.indexOf(lore[1]) >- 1 && n.indexOf(lore[2]) >- 1 ){
                            eliksir = items[i];
                            i=items.length;
                        }
                    }
                }
                if(!eliksir){ e.player.message("[§cEliksiry§f] §7Nie znaleziono eliksiru!"); return gui1(e.player); }
                var inokreacja = eliksir.getNbt().getString('Inokreacja');
                var data = eliksir.getNbt().getLong('Data');
                var date = Date.now();
                date = parseInt((date-data) / 86400000);

                e.player.message("[§cEliksiry§f] §7Wynik Inokreacji: §e**"+inokreacja+"**");

                if(date >= 0){
                    e.player.message("§e**Nie widać żadnych plamek na pokrywie kociołka**");
                }
                else{
                    date *= -1;
                    var plamki = Math.floor( Math.random() * date);
                    if(date<=0){
                        e.player.message("§e**Na pokrywie kociołka nie widać żadnych plamek**");
                    }
                    if(plamki==date || plamki==0){
                        e.player.message("§e**Na pokrywie kociołka widać "+date+" duże plamki**");
                    }else{
                        e.player.message("§e**Na pokrywie kociołka widać "+(date - plamki)+" duże plamki i "+plamki+" małe plamki**");
                    }
                }
                gui1(e.player);
                break;
            }
            case 63:{
                var id = e.selection[0].split(".")[0];
                return gui13(e.player, id);
            }
        }
    }
    catch(er){
        print("Scroll error: "+er);
    }

}

//funkcje globalne
function calculatePrice(player, skladnik){
    //skladnik : {name: nazwa, ile: 244, jednostka: gramy, akcje: [zanurz, obetnij, natnij]}
    //skladniki: {serial, nazwa, typ, cena, ilosc, jednostka, dostępny}
    var ndata = npc.getStoreddata();
    var elki = ndata.get('elki');
    
    var skladniki = getSkladnik({nazwa: skladnik.name});
    if(skladniki.error)
        return player.message("[§cDebugger§f] §7Error, napisz do administracji: "+ skladniki.error);
    
    skladniki = skladniki.result[0];
    
    elki = JSON.parse(elki) || {};
    if(!elki.current)
        return false;

    var price = elki.current.price || 0;
    var value = Math.ceil((parseFloat(skladniki.cena) / parseFloat(skladniki.ilosc)) * skladnik.ile) || 9999;
    
    elki.current.price = price + value;
    ndata.put('elki', JSON.stringify(elki));
    return true;
}

function temp(e, ile){
    var ndata = npc.getStoreddata();
    var elki = ndata.get('elki');
    elki = JSON.parse(elki) || {};

    if(elki.current.ignis == false){
        e.player.message("[§cKociołek§f] §7Kociołek musi być rozpalony!");
        return false;
    }

    elki.current.temp += ile;
    ndata.put('elki',JSON.stringify(elki));

    e.gui.getComponent(156).setText("§3Aktualna temperatura: §b"+ elki.current.temp +" §3°C");
    e.gui.update(e.player);

    return true;
}

function handleAdd(e){
    var ndata = npc.getStoreddata();
    var elki = ndata.get('elki');
    elki = JSON.parse(elki) || {};
    var label = e.gui.getComponent(e.buttonId).getLabel(); //button

    if(elki.current){
        var t = Date.now();
        if( t - elki.current.wait < 0 && label.indexOf("pokryw") == -1 ){
            pisz(e.player, "Niecierpliwy zrobił coś nie tak, a eliksir zaraz wybuchł mu przed nosem!");

            elki.current = { list:[], wait:0, temp:0, ignis: false};
            ndata.put('elki', JSON.stringify(elki));
            npc.getTimers().stop(1);
            return false;
        }
    }

    var co = label.split(label.slice(0,2))[1];
    var co1;
    var ile;

    if(e.gui.getComponent(e.buttonId - 50) && e.gui.getComponent(e.buttonId - 100)){
        co1 = e.gui.getComponent(e.buttonId-50).getText().split("§3")[1];   //label
        ile = parseFloat(e.gui.getComponent(e.buttonId-100).getText());     //textfield
        if(!co || !co1 || !ile || isNaN(ile) || ile>999999999 || ile <= 0){
            e.player.message("[§cEliksiry§f] §7Coś poszło nie tak! sprawdź czy wpisałeś dobrą wartość.");
            return false;
        }
    }

    if(!co) 
        return e.player.message("[§cEliksiry§f] §7brak guzika!");
    
    if(label.indexOf("temperaturę") > -1 && elki.current.ignis == false)
        return (co1 && ile)? {ile: ile, akcja: co, jednostka: co1}: {akcja: co}; 
 
    
    if(co1 && ile){
        addToList(co + " ["+ile+" "+co1+"]", e.player);
        return {ile: ile, akcja: co, jednostka: co1};
    }else{
        addToList(co, e.player);
        return {akcja: co};
    }
}

function handleSkladnik(e){
    var ndata = npc.getStoreddata();
    var elki = ndata.get('elki');
    elki = JSON.parse(elki) || {};

    if(elki.current && elki.current.skladnik){
        var bttnText = e.gui.getComponent(e.buttonId).getLabel().replace(/§./g,"");

        if(elki.current.skladnik.akcje.indexOf(bttnText)>-1)
            return false;

        elki.current.skladnik.akcje.push(bttnText);

        ndata.put('elki', JSON.stringify(elki));
        gui9(e.player, elki.current.skladnik);
        return bttnText;
    }
    return false;
}

function setWait(ile){
    if(!ile || ile<=0 || isNaN(ile))
        return false;

    var ndata = npc.getStoreddata();
    var elki = ndata.get('elki');
    elki = JSON.parse(elki) || {};

    if(elki.current){
        var mins = ile * 60 * 1000;
        var timestamp = Date.now() + mins;
        elki.current.wait = timestamp;

        ndata.put('elki', JSON.stringify(elki));
        return true;
    }
    return false;
}

function addToList(txt, player){
    var ndata = npc.getStoreddata();
    var elki = ndata.get('elki');
    elki = JSON.parse(elki) || {};
    if(elki.current.list){
        elki.current.list.push(txt);
        //print(elki.current.list);
        if(checkArray(elki.current.list, txt)){
            elki.current = {name: "", list:[], wait:0, ignis: false};
            pisz(player, "Potknął się o powietrze i wylał zawartość kociołka");
            npc.world.spawnParticle("explode", pos.getX()+0.5, pos.getY()+1.2, pos.getZ()+0.5, 0.1, 0.4, 0.1, 0.01, 20);
            npc.world.playSoundAt(pos, "minecraft:entity.generic.explode", 0.5, 0.8);
        }
    }
    return ndata.put('elki', JSON.stringify(elki));
}

function pisz(player, txt){
    function sudo(api, player, command){
        if(!player || !command) return "Too few parameters!"
        if(command.split(" ")[0].indexOf("/")>-1) return "Slash in command!"
        return api.executeCommand(api.getIWorlds()[0], "sudo "+player+" "+command);
    }
    
    sudo(API, player.getName(), "me "+txt);
}

function checkArray(ar,t){
    var sar = ar.slice(ar.length-5, ar.length+5);
    var i = 0;

    for(var x=0; x<sar.length; x++)
        if(sar[x]==t)
            i++;

    if(i >= 5)
        return true;

    return false;
}

function update(e){
    var nbt = npc.getTileEntityNBT();

    var scripts = nbt.getList("Scripts", nbt.getListType("Scripts"))[0];
    var sl = [];
    var requiredScripts = [ 'kociolek.js', 'postreq.js', 'sql_main.js', 'str_mani.js', 'pass.js' ];

    for(var i=0; i < requiredScripts.length; i++){
        var test = e.API.stringToNbt('{}');
        test.setString('Line', requiredScripts[i]);
        sl.push(test);
    }

    scripts.setList("ScriptList", sl);
    nbt.setByte("ScriptEnabled", 1);

    npc.world.getBlock(pos.getX(), pos.getY(), pos.getZ()).setTileEntityNBT(nbt);
    data.put("update", version);
}