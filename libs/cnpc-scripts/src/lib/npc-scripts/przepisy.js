/*
    requires:
    - moneyv
    - postreq
    - sql_main
    - str_mani
*/
var npc;

function baseGui(e, x){
    var gui = e.API.createCustomGui(1, 256, 256, false);
    if(x=="add"){
        gui.setBackgroundTexture("customnpcs:textures/gui/inve.png");
    }else{
        gui.setBackgroundTexture("customnpcs:textures/gui/stdbg.png");
    }
    gui.addLabel(9, "§1Dystrybutor przepisów", 90, 30, 130, 20);
    return gui;
}

function init(e){
    npc = e.npc;
}

function interact(e){
    if(!npc){
        npc = e.npc;
    }
    return menu(e);
    //if(e.player.getName()=="Przesladowca" || e.player.getName()=="Woolf"){ return menu(e); }
    //return e.player.message("Chwilowo nieczynne!");
}

function menu(e){
    var gui = baseGui(e);

    gui.addButton(1, "§2Dodaj przepis", 40, 120, 80, 20);
    gui.addButton(2, "§6Przepisy", 140, 120, 80, 20);

    gui.addButton(3, "Wystaw ocenę", 90, 150, 80, 20);
    //gui.addButton(4, "§3Sprzedaj przepis", 140, 150, 80, 20);

    if(npc){
        var data = npc.getStoreddata();
        var wyplaty = JSON.parse(data.get("wyplaty")) || {};
        if(wyplaty[ e.player.getName() ]){
            gui.addButton(303, "§cWypłać kasę", 10, 200, 80, 20).setHoverText(["§7Atkualnie możesz otrzymać: ", "§e"+wyplaty[ e.player.getName() ]])
        }
    }

    e.player.showCustomGui(gui);
    return gui;
}
function dodajPrzepis(e, opcja){
    var gui;

    if(opcja=="eliksir"){
        gui = baseGui(e);

        var data = getEliksir();
        if(data.error){
            return e.player.message("[§cDebugger§f] §7Error, pisz do administracji! "+error);
        }
        data = data.result;
        var lista = [];
        for(var i=0; i<data.length; i++){
            lista.push(data[i].nazwa);
        }

        gui.addScroll(52, 10, 55, 230, 160, lista);
    }else{
        gui = baseGui(e, "add");

        gui.addTextField(11, 90, 62, 40, 20).setHoverText(["§7Cena przepisu w knutach", "§7Musi być wyrażone w liczbie całkowitej, w przeciwnym razie zostanie zaokrąglone do najbliższej liczby.", "§7Przykładowo:", "§c25"]).setText("0");
        gui.addItemSlot(100, 20).setHoverText(["§7Włóż tutaj item z przepisem"]);
        gui.showPlayerInventory(8, 113);

        gui.addButton(201, "§a✍", 200, 62, 20, 20 ).setHoverText(["§7Zapisz", "§7Po kliknięciu wybierz Eliksir."]);
        gui.addButton(901, "§c✖", 213, 185, 20, 20 ).setHoverText(["§7Powrót do menu głównego"]);
    }

    e.player.showCustomGui(gui);
    return gui;
}

function kupPrzepis(e, search){
    var gui = baseGui(e);

    gui.addLabel(10, "§2[I]", 240, 30, 20, 20).setHoverText(["§7Kliknij raz na listę aby wyświetlić info."]);
    gui.addButton(11, "§6Informacje", 185, 230, 70, 20).setHoverText(["§7Kliknij aby przełączyć między trybem:", "§cInformacje §7i §cKupowanie §7i §cUsuń"]);

    gui.addTextField(15, 85, 230, 90, 20);
    gui.addButton(16, "§bSzukaj", 5, 230, 70, 20);

    var lista = [];
    if(!search){
        var przepisy = getPrzepis();
        if(przepisy.error){
            return e.player.message("[§cDebugger§f] §7Error! "+przepisy.error);
        }
        przepisy = przepisy.result;
        var stars = [ "★", "◯"];
    
        for(var i=0; i<przepisy.length; i++){
            lista.push( przepisy[i].id + '. [' + przepisy[i].autor + '] ' + przepisy[i].eliksir + " §6" + przepisy[i].cena + " §e" + ( stars[0].repeat( przepisy[i].ocena ) ) + ( stars[1].repeat( 5 - przepisy[i].ocena ) ) );
        }
    }else{
        lista = search;
    }

    gui.addScroll(22, 10, 55, 230, 160, lista);

    e.player.showCustomGui(gui);
    return gui = baseGui(e);
}

function wystawOcene(e){
    var gui = baseGui(e, "add");

    gui.addTextField(11, 90, 62, 40, 20).setHoverText(["§7Ocena przepisu", "§7Musi być wyrażone w liczbie całkowitej.", "§7Przedział <1;5>", "§c4"]).setText("5");
    gui.addItemSlot(100, 20).setHoverText(["§7Włóż tutaj item z przepisem"]);
    gui.showPlayerInventory(8, 113);

    gui.addButton(202, "§a✍", 200, 62, 20, 20 ).setHoverText(["§7Zapisz", "§7Po kliknięciu wybierz Eliksir."]);
    gui.addButton(901, "§c✖", 213, 185, 20, 20 ).setHoverText(["§7Powrót do menu głównego"]);

    e.player.showCustomGui(gui);
    return gui = baseGui(e);
}

function customGuiButton(e) {
    switch ( e.buttonId ){
        // menu
        case 1:  { return dodajPrzepis(e); }
        case 2:  { return kupPrzepis(e);   }
        case 3:  { return wystawOcene(e);  }
        case 901:{ return menu(e);         }



        // akcyjne
        case 11:{
            var button = e.gui.getComponent(e.buttonId);
            var btxt = button.getLabel().replace(/§./g, "");
            var x;
            var list = ["Informacje", "Kupowanie", "Usuń"];
            if(e.player.getGamemode()==1){ list.push("Admin") }

            var index = list.indexOf(btxt);
            if(index == -1){ return e.player.message("[§cDebugger§f] §7Coś poszło nie tak!") }
            index == list.length-1? index = 0: index++;
            x = list[ index ];
            button.setLabel("§6"+x);

            e.gui.update(e.player);

            return e.player.message("[§cPrzepisy§f] §7Zmieniono tryb na §e"+x+"!");
        }
        case 16:{
            // kup -> szukaj po nazwie
            var text = e.gui.getComponent(15).getText();
            if(!text || text.length==0){ return kupPrzepis(e); }
            text = text.toLowerCase();
            try{
                var lista = e.gui.getComponent(22).getList();
                lista = Java.from(lista);
                var len = lista.length;

                var lista1 = [];
                for(var i=0; i<len; i++)
                    if( lista[i].toLowerCase().indexOf(text)>-1 )
                        lista1.push( lista[i] )
                

                return kupPrzepis(e, lista1);
            }
            catch(er){
                return e.player.message("[§cDebugger§f] §eError:§7 "+er);
            }
        }


        case 201:{
            // dodaj przepis: zapisz cenę i item
            var cena = e.gui.getComponent(11).getText();
            cena = parseInt(parseFloat(cena));
            if( cena < 0 || cena > 99999 || isNaN(cena)){ return e.player.message("[§cPrzepisy§f] §7Podano niepoprawną cenę. "+cena); }

            var tempdata = e.player.getTempdata();
            if(!tempdata.has("przepis")){ 
                return e.player.message("[§cPrzepisy§f] §7Dodaj najpierw przepis do okienka. Możesz go zaraz wyciągnać po otrzymaniu informacji.");
            }else{
                var przepis = JSON.parse(tempdata.get("przepis")) || {};
                if(!przepis.item){ return e.player.message("[§cPrzepisy§f] §7Nie znaleziono itemu! Włóż na chwilę przepis do okienka!"); }
                if(!przepis.cena || przepis.cena != cena){ przepis.cena = cena; }
                if(!przepis.autor){ przepis.autor = e.player.getName(); }
                tempdata.put("przepis", JSON.stringify(przepis));
            }
            e.player.message("[§cPrzepisy§f] §7OK, cena: §e"+cena);
            return dodajPrzepis(e, "eliksir");
        }
        case 202:{
            // dodaj Ocenę przepisu
            var ocena = e.gui.getComponent(11).getText();
            ocena = parseInt(parseFloat(ocena));
            if( ocena < 1 || ocena > 5 || isNaN(ocena)){ return e.player.message("[§cPrzepisy§f] §7Podano niepoprawną ocenę: §e"+ocena); }
            
            var tempdata = e.player.getTempdata();
            if(!tempdata.has("przepis")){ 
                return e.player.message("[§cPrzepisy§f] §7Dodaj najpierw przepis do okienka. Możesz go zaraz wyciągnać po otrzymaniu informacji.");
            }else{
                var przepis = JSON.parse(tempdata.get("przepis")) || {};
                if(!przepis.item){ return e.player.message("[§cPrzepisy§f] §7Nie znaleziono itemu! Włóż na chwilę przepis do okienka!"); }

                try{
                    var p = getPrzepis({ item: przepis.item });
                    if(!p || p.error){
                        return e.player.message("[§cDebugger§f] §7Error: "+p.error);
                    }
                    if(p.result.length == 0){
                        return e.player.message("[§cDebugger§f] §7Nie ma takiego przepisu u dystrybutora!");
                    }
                    p = p.result[0];
                    if(p.autor == e.player.getName()){ return  e.player.message("[§cDebugger§f] §7Nie możesz dodać oceny do własnego przepisu!") }
                    if(!p.oceny) { p.oceny = "{}" }


                    var ppl = JSON.parse(p.oceny) || {};
                    if(ppl[ e.player.getName() ]){ return e.player.message("[§cPrzepisy§f] §7Już wystawiłeś ocenę na ten przepis!"); }
                    ppl[ e.player.getName() ] = ocena;

                    var sr = 0;
                    var keys = Object.keys(ppl);
                    for(var i=0; i<keys.length; i++){
                        sr += ppl[ keys[i] ];
                    }
                    p.ocena = parseInt(sr/keys.length);

                    e.API.executeCommand( e.player.world, "dcdpm "+p.autor+" Dostałeś nową ocęnę na eliksir: `"+p.eliksir+"`, Ocena: **"+ocena+"**. Nowa średnia: **"+p.ocena+"**" );

                    p.oceny = JSON.stringify(ppl);

                    var test = updatePrzepis(p.id, { ocena: p.ocena, oceny: p.oceny });
                    if(test.error){
                        return e.player.message("[§cDebugger§f] §eError: §7"+test.error);
                    } 
                }
                catch(er){
                    e.player.message("[§cDebugger§f] §eError: §7"+er);
                }
            }
            e.player.message("[§cPrzepisy§f] §7Dodano ocenę: §e"+ocena);
            return menu(e);
        }
        case 303:{
            // wypłać kasę
            if(npc){
                var data = npc.getStoreddata();
                var wyplaty = JSON.parse(data.get("wyplaty")) || {};
                if(wyplaty[ e.player.getName() ]){
                    var cena = wyplaty[ e.player.getName()];
                    var x = payPlayer(e.player.getName(), cena);
                    if(x != true){ return e.player.message("[§cDebugger§f] §7Error: "+x) }

                    delete wyplaty[ e.player.getName() ];
                    data.put("wyplaty", JSON.stringify(wyplaty));

                    var x =  "**"+e.player.getName()+"** odebrał wypłatę za przepisy:  **"+cena+"** knutów!";
                    x = ang(x);
                    HTTP.post(passes.hooks.przepisy, {
                        "content": x,
                        "tts": false,
                    });

                    e.player.message("[§cPrzepisy§f] §7Odebrałeś wypłatę za przepisy: §e"+cena);
                    return menu(e);
                }else{
                    return e.player.message("[§cPrzepisy§f] §7Coś poszło nie tak, może już odebrałeś?");
                }
            }else{
                return e.player.message("[§cPrzepisy§f] §7Brak zmiennej!");
            }
        }
    }
}

function customGuiScroll(e){
    switch(e.scrollId){
        case 22:{
            var inf = e.gui.getComponent(11).getLabel().replace(/§./g, "");
            if(inf == "Kupowanie" || inf == "Admin" || inf == "Usuń"){
                var opt = e.selection[0];
                var id = parseInt(opt.split(".")[0]);
                var autor = opt.split("[")[1].split("]")[0];

                if(inf == "Usuń"){
                    if(autor == e.player.getName() || Permission.has(e.player.getName(), "maxbans.ban")){
                        var test = removePrzepis(id);
                        if(test.error){ return e.player.message("[§cDebugger§f] §7Error: "+test.error) }
                        return e.player.message("[§cPrzepisy§f] §7Usunięto przepis o id: §e"+id);
                    }else{
                        return e.player.message("[§cPrzepisy§f] §7Nie możesz usunąć tego przepisu!");
                    }
                }

                var eliksir = getPrzepis({ id:id });
                if(eliksir.error){ return e.player.message("[§cDebugger§f] §7Error: "+eliksir.error) }
                eliksir = eliksir.result[0];

                if(inf == "Admin" || wallet(e.player.getName()) >= eliksir.cena){
                    var x = inf=="Admin"? true: requestPayment(e.player.getName(), eliksir.cena);
                    if( !x || typeof x != "boolean" ) return e.player.message("[§cPrzepisy§f] §7Coś poszło nie tak!");

                    if(!npc){ e.player.message("[§cDebugger§f] §7Dzwoń po adminów, brak zmiennej!") }
                    if(inf!="Admin"){
                        var data = npc.getStoreddata();
                        var wyplaty = JSON.parse(data.get("wyplaty")) || {};
                        wyplaty[ eliksir.autor ]? wyplaty[ eliksir.autor ] += parseInt(0.9 * eliksir.cena) :  wyplaty[ eliksir.autor ] = parseInt(0.9 * eliksir.cena);
                        data.put('wyplaty', JSON.stringify(wyplaty));
    
                        var wdata = e.player.world.getStoreddata();
                        var kasa = parseFloat(wdata.get("MMVat")) || 0;
                        kasa += 0.1 * eliksir.cena;
                        wdata.put("MMVat", kasa);
    
                        var x =  "**"+e.player.getName()+"** Kupił przepis *"+eliksir.id+"* !\n\`\`\`Autor: "+eliksir.autor+" \nEliksir: "+eliksir.eliksir+" \nCena: "+eliksir.cena+" \n\`\`\`";
                        x = ang(x);
                        HTTP.post(passes.hooks.przepisy, {
                            "content": x,
                            "tts": false,
                        });
                        e.API.executeCommand( e.player.world, "dcdpm "+eliksir.autor+" Ktoś kupił twój przepis na: `"+eliksir.eliksir+"` za: **"+eliksir.cena+"**. Możesz odebrać: **"+wyplaty[ eliksir.autor ]+"**" );
                    }

                    var item = e.player.world.createItemFromNbt(e.API.stringToNbt(eliksir.item));
                    var x = e.player.dropItem(item);
                    if(x){ x.setOwner(e.player.getName()) }
                    else { e.player.message("[§cPrzepisy§f] §7Nie udało się ustawić ownera na dropitem!") }

                    return e.player.message("[§cPrzepisy§f] §7Zakupiono przepis na §c"+eliksir.eliksir+" §7Gracza §a"+eliksir.autor+" §7za §e"+eliksir.cena);
                }else{
                    return e.player.message("[§cPrzepisy§f] §7Masz za mało kasy: §e"+eliksir.cena);
                }
            }
            else{
                var lab = e.gui.getComponent(10);
                var opt = e.selection[0];

                var id = parseInt(opt.split(".")[0]);
                var autor = opt.split("[")[1].split("]")[0];
                var cena = parseInt( opt.split("§6")[1].split(" ")[0] );
                var ocena = opt.split("§e")[1];
                var eliksir = opt.split("] ")[1].split(" §6")[0];

                lab.setHoverText(["§7Kliknij raz na listę aby wyświetlić info.",  "§7id: §c"+id,  "§7Autor: §a"+autor,  "§7Eliksir: §b"+eliksir ,  "§7Cena: §e"+cena+" knutów",  "§7Ocena: §6"+ocena]);

                return e.gui.update(e.player);
            }
        }
        case 52:{
            if(!e.doubleClick){return}
            var eliksir = e.selection[0];
            var tempdata = e.player.getTempdata();
            var przepis = JSON.parse(tempdata.get("przepis")) || {};
            przepis.eliksir = eliksir;
            if(przepis.eliksir && przepis.item && przepis.autor && przepis.cena){
                var x = addPrzepis(przepis);
                if(x.error){
                    return e.player.message("[§cPrzepisy§f] §7Error! "+x.error);
                }
                var tempdata = e.player.getTempdata();
                tempdata.remove("przepis");

                var x =  "Nowy przepis!\n\`\`\`Autor: "+przepis.autor+" \nEliksir: "+przepis.eliksir+" \nCena: "+przepis.cena+" \n\`\`\`";
                x = ang(x);
                HTTP.post(passes.hooks.przepisy, {
                    "content": x,
                    "tts": false,
                });

                e.player.message("[§cPrzepisy§f] §7Dodano przepis: { §aAutor§7: §e"+przepis.autor+"§7, §aEliksir§7: §e"+przepis.eliksir+"§7, §aCena§7: §e"+przepis.cena+"§7, §aItem§7: §etak§7 }");
                return menu(e);
            }else{
                return e.player.message("[§cPrzepisy§f] §7Zabrakło danych, spróbuj ponownie!");
            }
        }
    }
}

function customGuiSlot(e){
    if(e.slotId == 0){
        var item = e.stack;
        if(item.getName().indexOf("minecraft:book")==-1){ return e.player.message("[§cPrzepisy§f] §7Niepoprawny item") }
        var nbt = item.getNbt();
        if(!nbt.has("przepis")){ return e.player.message("[§cPrzepisy§f] §7Książka nie ma przepisu!") }

        var tempdata = e.player.getTempdata();
        var przepis = JSON.parse(tempdata.get("przepis")) || {};
        if(przepis.item){
            return e.player.message("[§cPrzepisy§f] §7Jest już dodany item! Dokończ dodawanie lub relognij.");
        }

        przepis.item = escapeString(item.getItemNbt().toJsonString());

        if(!przepis.autor){ przepis.autor = e.player.getName(); }
        tempdata.put("przepis", JSON.stringify(przepis));
        return e.player.message("[§cPrzepisy§f] §7Dodano Item! Wyciągnij go zanim przejdziesz dalej, bo stracisz przepis.");
    }
}

