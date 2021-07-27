var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var miotly = ["Kometa250", "SpadającaGwiazda", "Wiciosztych90", "Zamiataczka350", "DębowyGrom79", "BłękitnaButla", "Nimbus2000", "Nimbus2001", "Nimbus2020", "Błyskawica", "ŚwietlistaSmuga"];

/*
    required scripts:
    - commandutils
    - postreq
    - sql main
    - str mani
*/

function interact(e) {
    try {
        var mainh = e.player.getMainhandItem();
        if (e.player.isSneaking()) {
            var riders = e.player.getAllRiders();
            if (riders.length > 0)
                return e.player.clearRiders();
        }
        if (e.type == 1 && e.target.getName() == "§7Czekoladowa Żaba") {
            var frog = e.target;
            frog.kill();

            var karty = e.player.world.getStoreddata().get("karty");
            karty = JSON.parse(karty) || {};
            if (Object.keys(karty).length == 0) {
                return e.player.message("[§cDebuger§f] §7Nie znaleziono kart!")
            }

            karta(e, karty);
            return sudo(e.API, e.player.getName(), "me Łapie żabę wraz z kartą czarodziejów");
        }

        if (!mainh || mainh.getName().toLowerCase().indexOf("air") > -1)
            return;

        if (mainh.getName().indexOf("hapeladdons:czapka") > -1 || mainh.getName().indexOf("czaszka") > -1 || mainh.getName().indexOf("dynia") > -1 || mainh.getName().indexOf("tiara") > -1) {
            if (e.player.isSneaking())
                return

            var x = e.player.getArmor(3);
            e.player.setArmor(3, mainh);
            e.player.setMainhandItem(x);

            return;
        } else if (mainh.getName().indexOf("kartaczarodziei") > -1) {
            var nbt = mainh.getNbt();
            if (!nbt.has("owner")) {
                var lore = Java.from(mainh.getLore());
                if (lore[1]) {
                    var numer = parseInt(lore[1].split("§f")[1]);
                    numer = "id=" + numer || null;
                    if (!numer) return;
                    var uuid = "uuid=" + e.player.getUUID();
                    var name = "name=" + e.player.getName();
                    var dname = "dname=" + e.player.getDisplayName().replace(/§./g, "");
                    var dc = getDiscord(e.API, e.player.getName());
                    dc = "discord=" + dc || null;

                    var query = "?" + numer + "&" + uuid + "&" + name + "&" + dname + (dc ? "&" + dc : "");
                    try {
                        var x = HTTP.post("http://hapel-ic.pl/api/karty/moje" + query, {});
                        if (x.wyslane) {
                            // e.player.message("Wysłane ok!");
                            nbt.setString("owner", e.player.getName());
                        }
                    } catch (er) {
                        print("interact erorr: " + er);
                    }

                }
            }
        } else if (mainh.getName() == "minecraft:spawn_egg" && mainh.getDisplayName() == "§7Czekoladowa Żaba") {
            e.setCanceled(true);
            var toad = Java.type("com.bewitchment.common.entity.living.EntityToad");
            var mob = new toad(e.player.world.getMCWorld());
            mob.func_70107_b(e.player.getX(), e.player.getY(), e.player.getZ());
            mob.func_96094_a("§7Czekoladowa Żaba");
            e.player.world.getMCWorld().func_72838_d(mob);
            return mainh.setStackSize(mainh.getStackSize() - 1);
        } else if (mainh.getDisplayName() == "§cWalizka") {
            //zmienić
            return e.player.message("[§cAdmin§f] §7Niedługo zostanie zmienione!")
        } else if (mainh.getDisplayName().indexOf("Kamień duszy Sprzedawcy") > -1) {
            e.setCanceled(true);
            var pos = e.player.getPos();
            var seller = e.player.world.spawnClone(pos.getX(), pos.getY(), pos.getZ(), 9, "Sprzedawca");
            var data = seller.getStoreddata();
            data.put("owner", e.player.getName());
            e.player.message("[§cNPC§f] §7Postawiono sprzedawcę!");
            return mainh.setStackSize(mainh.getStackSize() - 1);
        } else if (mainh.getDisplayName().indexOf("Skrystalizowany sprzedawca") > -1) {
            e.setCanceled(true);

            var tab = 7;
            var name = mainh.getLore()[2];
            if (!name)
                return e.player.message("[§cNPC§f] §7Nie znaleziono duszy w przedmiocie!");

            var pos = e.player.getPos();
            e.API.clones.spawn(pos.getX(), pos.getY(), pos.getZ(), tab, name, e.player.world);
            mainh.setStackSize(mainh.getStackSize() - 1);

            return e.player.message("[§cNPC§f] §7Uwolniono duszę sprzedawcy!");
        } else if (mainh.getDisplayName().indexOf("Limitowana figurka") > -1) {
            //return e.player.message("[§cInfo§f] §7Niedługo będzie poprawione działanie!");
            var name = mainh.getDisplayName().split("figurka §b")[1];

            if (!name)
                return e.player.message("[§cFigurka§f] §7Niepoprawna nazwa figurki!");

            var nbt = mainh.getNbt();
            if (!nbt.getInteger("Żywa")) {
                var clones = e.API.getClones();
                var fig = clones.get(6, name, e.player.world);
                var cnbt = fig.getNbt();
                cnbt.setString("master", e.player.getUUID());
                cnbt.setString("master_name", e.player.getName());

                fig.setPosition(e.player.getX(), e.player.getY(), e.player.getZ());
                fig.spawn();

                nbt.setInteger("Żywa", 1);
                nbt.setString("figurka", fig.getUUID());
                return e.player.message("[§cFigurka§f] §7Figurka została ożywiona!");
            } else {
                var id = nbt.getString("figurka");
                if (!id)
                    return e.player.message("[§cFigurka§f] §7Nie znaleziono id figurki!");

                if (e.type == 1 && e.target.getName().indexOf(name) > -1) {
                    var cnbt = e.target.getNbt();
                    if (cnbt.getString("master") == e.player.getUUID() || cnbt.getString("master_name") == e.player.getName()) {
                        e.target.despawn();
                        nbt.setInteger("Żywa", 0);
                        return e.player.message("[§cFigurka§f] §7Figurka powróciła do oryginalnego stanu!");
                    }

                    return e.player.message("[§cFigurka§f] §7To nie twoja figurka!");
                }

                var fig = e.player.world.getEntity(id);
                if (!fig) {
                    nbt.setInteger("Żywa", 0);
                    return e.player.message("[§cFigurka§f] §7Błąd, skasowana figurka, resetowano item.");
                }
                var x = parseInt(fig.getX());
                var y = parseInt(fig.getY());
                var z = parseInt(fig.getZ());
                if (x == 0 && y == 0 && z == 0) {
                    fig.despawn();
                    nbt.setInteger("Żywa", 0);
                    return e.player.message("[§cFigurka§f] §7Błąd, npc wywalony w kosmos, resetowano item.");
                }
                return e.player.message("[§cFigurka§f] §7Twoja figurka znajduje się na: §e" + parseInt(fig.getX()) + " | " + parseInt(fig.getY()) + " | " + parseInt(fig.getZ()));
            }
        } else if (mainh.getDisplayName().indexOf("Plecak.") > -1) {

            var lastO = e.player.getTempdata().get("plecakO");
            if ( lastO && !Permission.has(e.player.getName(), "maxbans.ban") ) {
                lastO = parseInt(lastO);
                var cld = 15;
                
                if (Date.now() - lastO < cld * 1000) 
                    return e.player.message("[§cPlecak§f] §7Możesz otwierać plecak co: §c" + cld + "§7 sekund!");
            }
            var tempdata = e.player.getTempdata();
            var plecak = tempdata.get("plecak");
            var lore = mainh.getLore();

            if ( lore.length >= 2 )
                if (!Permission.has(e.player.getName(), "maxbans.ban") && e.player.getUUID() != lore[1].replace(/§./g, ""))
                    return e.player.message("[§cPlecak§f] §7Tylko dla właściciela!")

            if ( plecak ) 
                return e.player.message("[§cPlecak§f] §7Masz niezapisany plecak, szybko zrób §lRelog!")
            

            if ( e.player.isSneaking() ) {
                var gui = e.API.createCustomGui(1, 256, 256, false);

                gui.addLabel(6, "§2Plecak numer: §e" + lore[0].replace(/§./g, ""), 100, 75, 90, 15)
                gui.addTextField(2, 70, 90, 120, 15);
                gui.addLabel(5, "§2§l?", 195, 90, 5, 15).setHoverText(["§cPomoc", "§7Aby wpisać kolor lub inne specjalne kodowanie", "§7Daj znak §l&§r§7 i potem znak kodu np. kolor §55"]);
                gui.addButton(3, "§cNazwij Plecak", 90, 110, 80, 20);

                var nbt = mainh.getNbt();
                var data = nbt.getLong("data");
                if (data) {
                    data = parseInt(data);
                    data = new Date(data);
                    data = data.toDateString();
                } else {
                    data = "Brak kopii!";
                }

                gui.addButton(4, "§aStwórz kopię", 90, 200, 80, 20).setHoverText(["§cInfo", "§7Raz dziennie możesz zapisać plecak", "§7Pozwala to na późniejsze przywrócenie", "§7W razie kłopotów", "§7Ostatnia kopia: §a" + data]);

                gui.addTextField(11, 70, 140, 120, 15).setHoverText(["§cInfo", "§7Wpisz tutaj dokładny nick gracza", "§7Aby przekazać mu prawa do plecaka."]);
                gui.addButton(10, "§7Zmień prawa", 90, 160, 80, 20).setHoverText(["§cInfo", "§7Wpisz powyżej dokładny nick gracza", "§7Aby przekazać mu prawa do plecaka."]);

                return e.player.showCustomGui(gui);
            }

            if ( e.player.world.getAllPlayers().length > 50 && !Permission.has(e.player.getName(), "maxbans.ban") ) 
                return e.player.message("[§cPlecak§f] §7Nie możesz używać plecaka kiedy jest >50 graczy!")

            if ( e.type != 0 )
                return e.player.message("[§cPlecak§f] §7Aby otworzyć plecak musisz patrzeć w powietrze!");

            var JIb = Java.type('net.minecraft.inventory.InventoryBasic');
            var JItemS = Java.type('net.minecraft.item.ItemStack');
            var JSToNbt = Java.type('net.minecraft.nbt.JsonToNBT');
            var inventory;
            var pMC = e.player.MCEntity;
            var pdata = e.player.getStoreddata();

            var nrp;
            if ( !inventory ) {
                var plecak;
                if (lore.length == 0) {
                    nrp = getTop() + 1;

                    saveBag(e.player.getUUID(), e.player.getName(), JSON.stringify([]), nrp);

                    var x = "**" + e.player.getName() + "** Zainicjował " + mainh.getDisplayName().split(" ")[0] + " plecak z numerem: **" + nrp + "**";
                    x = ang(x);
                    HTTP.post(passes.hooks.mainLog, {
                        "content": x,
                        "tts": false,
                    });
                    mainh.setLore(["§0" + nrp, "§0" + e.player.getUUID()]);
                    return e.player.message("[§cPlecak§f] §7Wpisano plecak do bazy.");
                } else if (lore.length == 1) {
                    lore = [lore[0], "§0" + e.player.getUUID()];
                    mainh.setLore(lore);
                    e.player.message("[§cPlecak§f] §7Ustawiono plecak jako własny");
                }

                nrp = lore[0].split("§0")[1];

                pdata.put("plecak", nrp);

                var id = lore[0].split("§0")[1];
                plecak = getBag(id);
                if (!plecak) {
                    print(e.player.getName() + " / Nie znaleziono plecaka!");
                    return e.player.message("[§cError§f] §7Nie znaleziono plecaka! Pisz do administracji!");
                }
                if (!plecak.nazwa || !plecak.uuid) {
                    var t = updateName(plecak.id, e.player.getName(), e.player.getUUID());
                    if (!t) {
                        e.player.message("[§cPleak§f] §7Nie udało się zapisać w bazie nazwy i UID.")
                    } else {
                        e.player.message("[§cPleak§f] §7Zapisano w bazie nazwę!")
                    }
                }

                if (lore[1].indexOf(e.player.getUUID()) > -1 || Permission.has(e.player.getName(), "maxbans.ban")) {
                    if (mainh.getDisplayName().split(" ")[0] == "§cŚredni") {
                        inventory = new JIb("\u00A74Średni Plecak \u00A7e" + mainh.getLore()[0].split("§0")[1], true, 27);
                    } else if (mainh.getDisplayName().split(" ")[0] == "§cDuży") {
                        inventory = new JIb("\u00A74Duży Plecak \u00A7e" + mainh.getLore()[0].split("§0")[1], true, 36);
                    } else if (mainh.getDisplayName().split(" ")[0] == "§cMagiczny") {
                        inventory = new JIb("\u00A76Magiczny Plecak \u00A7e" + mainh.getLore()[0].split("§0")[1], true, 54);
                    } else {
                        inventory = new JIb("\u00A74Mały Plecak \u00A7e" + mainh.getLore()[0].split("§0")[1], true, 18);
                    }
                    plecak.itemy = JSON.parse(plecak.itemy);
                    for (var x = 0; x < plecak.itemy.length; x++) {
                        try {
                            var item = new JItemS(JSToNbt.func_180713_a(plecak.itemy[x][1]));
                            inventory.func_70299_a(plecak.itemy[x][0], item); //slot, item
                        } catch (er) {
                            print(er);
                        }
                    }
                } else {
                    return e.player.message("[§cPlecak§f] §7Nie możesz otwierać czyjegoś plecaka!");
                }
            }

            try {
                if (inventory) {
                    pMC.func_71007_a(inventory);
                }
            } catch (err) {
                e.player.message('\u00A7c' + err);
            }

            e.player.getTempdata().put("plecakO", Date.now());
            return;


        } else if (mainh.getDisplayName().indexOf("§cWizytówka ") > -1) {
            var gosc = mainh.getDisplayName().split("§cWizytówka ")[1];
            if (!gosc) {
                return
            }
            gosc = gosc.replace("[", "").replace("]", "");
            var wdata = e.player.world.getStoreddata().get("wizytówki");
            mainh.setStackSize(mainh.getStackSize() - 1);
            e.player.message("[§cWizytówka§f] §e**Wizytówka po zgięciu i nagraniu wiadomości poleciała przed ciebie i po chwili §ezniknęła**");
            e.player.message("[§cWizytówka§f] §7Napisz akcję nagrywania wiadomości na chacie lub /s i zapisz SS, ten wyślij §7właścicielowi wizytówki");
            if (wdata) {
                wdata = JSON.parse(wdata);
                if (wdata[gosc] && wdata[gosc].length > 1) {
                    var x = "\*\*Pojawiła się nowa wizytówka od: **" + e.player.getName() + "**!\*\*";
                    x = ang(x);
                    HTTP.post(wdata[gosc][1], {
                        "content": x,
                        "tts": false,
                    });
                    wdata[gosc][0] += 1;
                }

            } else {
                wdata = {};
                wdata[gosc] = [1];
            }
            return e.player.world.getStoreddata().put("wizytówki", JSON.stringify(wdata));
        } else if (mainh.getDisplayName().indexOf("§eTajemniczy Eliksir") > -1) {
            var nbt = mainh.getNbt();
            var nazwa = nbt.getString('Eliksir');
            var czas = nbt.getString('Czas');
            var data = nbt.getLong('Data');

            sudo(e.API, e.player.getName(), "me Użył eliksiru §c" + nazwa);

            if (Date.now() > data) {
                sudo(e.API, e.player.getName(), "do Eliksir był przeterminowany!");
            } else {
                if (!isNaN(parseFloat(czas))) {
                    sudo(e.API, e.player.getName(), "do Eliksir będzie trwał przez: " + czas + " minut");
                    czas = new Date(czas).toDateString();
                } else if (czas == "Trwały") {
                    sudo(e.API, e.player.getName(), "do Eliksir ma trwały efekt");
                }
                sudoOP(e.API, "dcdpm " + e.player.getName() + " użyto eliksir **" + nazwa + "**. Efekt trwa: **" + czas + "** ");
            }

            return mainh.setStackSize(mainh.getStackSize() - 1);
        } else if (mainh.getDisplayName().toLowerCase().indexOf("paczka kart czarodziejów") > -1) {
            var nbt = mainh.getNbt();
            var wersja = nbt.getString("wersja");
            if (!wersja)
                return e.player.message("[§cDebuger§f] §7Nie znaleziono wersji paczki!");

            var ammount;
            switch (wersja) {
                case "duża": {
                    ammount = 8;
                    break;
                }
                case "średnia": {
                    ammount = 5;
                    break;
                }
                case "mała": {
                    ammount = 3;
                    break;
                }
                default: {
                    ammount = 2;
                }
            }

            var karty = e.player.world.getStoreddata().get("karty");
            karty = JSON.parse(karty) || {};
            if (Object.keys(karty).length == 0)
                return e.player.message("[§cDebuger§f] §7Nie znaleziono kart!");

            for (var i = 0; i < ammount; i++)
                karta(e, karty);


            mainh.setStackSize(mainh.getStackSize() - 1);
            if (e.player.getName() != "Przesladowca")
                sudo(e.API, e.player.getName(), "me Otwiera: " + wersja + " paczka kart czarodziejów");

            return e.player.message("[§cKarty§f] §7Otworzno paczkę kart czarodziejów!");
        } else if (mainh.getDisplayName().indexOf("kociołek rozmiar ") > -1) {
            if (e.player.isSneaking()) {
                e.setCanceled(true);
                if (e.type == 2) {
                    if (e.target.getName() == "minecraft:cauldron") {
                        e.setCanceled(true);
                        var pos = e.target.getPos();
                        var i = e.target.setBlock("customnpcs:npcscripted");
                        var nbt = i.getTileEntityNBT();

                        try {
                            var s1 = e.API.stringToNbt('{}');
                            s1.setString("Script", "");
                            s1.setList("Console", []);
                            nbt.setList("Scripts", [s1]);

                            var scripts = nbt.getList("Scripts", nbt.getListType("Scripts"))[0];
                            var sl = [];
                            var requiredScripts = ['kociolek.js', 'postreq.js', 'sql_main.js', 'str_mani.js'];

                            for (var i = 0; i < requiredScripts.length; i++) {
                                var test = e.API.stringToNbt('{}');
                                test.setString('Line', requiredScripts[i]);
                                sl.push(test);
                            }

                            scripts.setList("ScriptList", sl);
                            nbt.setByte("ScriptEnabled", 1);

                            e.player.world.getBlock(pos.getX(), pos.getY(), pos.getZ()).setTileEntityNBT(nbt);


                            mainh.setStackSize(mainh.getStackSize() - 1);

                            //rozmiar kociołka
                            var sdata = e.player.world.getBlock(pos.getX(), pos.getY(), pos.getZ()).getStoreddata();
                            sdata.put("kociolek", mainh.getDisplayName().replace(/§./g, ""));
                        } catch (er) {
                            e.player.message("§cError: §r" + er);
                        }

                        var x = "Gracz **" + e.player.getName() + "** Postawił kociołek w: **" + pos.getX() + " " + pos.getY() + " " + pos.getZ() + "**";
                        x = ang(x);
                        HTTP.post(passes.hooks.mainLog, {
                            "content": x,
                            "tts": false,
                        });

                        return e.player.message("[§cKociołek§f] §7Konwertowano na używalny kociołek!");
                    } else {
                        return e.player.message("[§cKociołek§f] §7Kliknij itemkiem na postawiony kociołek!")
                    }
                } else {
                    return e.player.message("[§cKociołek§f] §7Kliknij itemkiem na postawiony kociołek!")
                }
            }
        } else {
            if (miotly.indexOf(mainh.getDisplayName().split(" ").join("").split("§f")[1]) > -1) {
                if (mainh.getName() == "variedcommodities:broken_arrow") {
                    return
                }
                var lore = mainh.getLore();
                var w = 996;
                var znaczek = false;
                var wytrzymalosc;
                var lore1 = [];
                for (var x = 0; x < lore.length; x++) {
                    lore1.push(lore[x]);
                    if (lore[x].toLowerCase().indexOf("oryginalności") > -1 || lore[x].toLowerCase().indexOf("oryginalnosci") > -1) {
                        znaczek = true;
                    }
                    if (lore[x].toLowerCase().indexOf("niezniszczalności") > -1) {
                        w += 4;
                    }
                    if (lore[x].toLowerCase().indexOf("wytrzymałość: ") > -1) {
                        wytrzymalosc = x;
                    }
                    if (lore[x].indexOf("Przegląd dnia") > -1) {
                        var dzien = lore[x].split("dnia ")[1];
                        if (dzien.indexOf("§f") > -1) {
                            dzien = dzien.split("§f")[1].split(".")
                        }
                        var date1 = new Date(dzien[2], dzien[1], dzien[0]);
                        var date = new Date(Date.now());
                        var v = (date1.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
                        v <= 30 ? w += 4 : w -= 15;
                    }
                }
                if ( !wytrzymalosc && wytrzymalosc != 0 ) {
                    var wdata = e.player.world.getStoreddata();
                    var wyt = wdata.get("miotly_wyt");
                    wyt = JSON.parse(wyt) || {};
                    var value = 5;
                    if (wyt && wyt[mainh.getName()]) {
                        value = wyt[mainh.getName()].wytrzymalosc;
                    }
                    lore1.push("§cWytrzymałość: " + value);
                    mainh.setLore(lore1);
                    return e.player.message("[§cMiotła§f] §7Ustawiono wytrzymałość!");
                }

                if (znaczek == false)
                    w -= 200;

                if (w == 1000)
                    return;

                if ( Math.floor(Math.random() * 1000) > w ) {
                    if (wytrzymalosc) {
                        var wyt = Number(lore1[wytrzymalosc].split(" ")[1]);
                        if (wyt == 0) {
                            print(e.player.getName() + " szansa: " + w);
                            var pmiotla = e.player.world.createItem("variedcommodities:broken_arrow", 0, 1);
                            var lore1 = Java.from(lore);

                            lore1.push("§7**Miotła jest niezdatna do lotu**");
                            pmiotla.setCustomName(mainh.getDisplayName());
                            pmiotla.setLore(lore1);
                            mainh.setStackSize(0);
                            e.player.giveItem(pmiotla);
                            var x = "Gracz **" + e.player.getName() + "** Zniszczył swoją miotłę: **" + mainh.getDisplayName() + "**, szansa: " + ((999 - w) / 10) + "% !";
                            x = ang(x);
                            HTTP.post(passes.hooks.mainLog, {
                                "content": x,
                                "tts": false,
                            });
                            return e.player.message("[§cMiotła§f] §7Twoja miotła uległa zniszczeniu! Spotkaj się z pracownikiem DTM aby ją naprawić.");
                        } else {
                            wyt--;
                            lore1[wytrzymalosc] = lore1[wytrzymalosc].split(" ")[0] + " " + wyt;
                            mainh.setLore(lore1);
                            return e.player.message("[§cMiotła§f] §7Wytrzymałość twojej miotły spadła!");
                        }
                    }
                }
            }
        }

    } catch (error) {
        print("Error interact: " + error);
    }
}

function login(e) {
    try {
        var pdata = e.player.getStoreddata();
        if (!pdata.has("dc")) {
            var dcid = npc.executeCommand("dcdid " + e.player.getName());
            dcid = dcid.replace("\n", "").replace(/\s/g, "");
            dcid = dcid || null;
            if (dcid && dcid.length > 0) {
                var test = sqlGet("SELECT * FROM discords WHERE dcdid='" + dcid + "'; ");
                if (test.error) throw test.error;

                var data = {
                    id: dcid,
                    players: {}
                };

                data.players[e.player.getName()] = {
                    uuid: e.player.getUUID(),
                    displayName: e.player.getDisplayName()
                };

                if (test.result.length > 0) {
                    var data1 = JSON.parse(test.result[0].data);
                    if (data1[e.player.getName()])
                        return;

                    data1[e.player.getName()] = data[e.player.getName()];
                    var test1 = sqlPut("UPDATE discords SET data='" + JSON.stringify(data1) + "' WHERE serial=" + test.result[0].serial);
                    if (test1.error)
                        throw test1.error;
                } else {
                    var test1 = sqlPut("INSERT INTO discords(dcdid, data) VALUES ('" + data.id + "','" + JSON.stringify(data.players) + "');");
                    if (test1.error)
                        throw test1.error;
                }

                return pdata.put("dc", 1);
            }
        }
    } catch (er) {
        print("Login error: " + er);
    }
}

function logout(e) {
    try {
        var uuid = "uuid=" + e.player.getUUID();
        var name = "name=" + e.player.getName();
        var dname = "dname=" + e.player.getDisplayName().replace(/§./g, "");
        var dc = getDiscord(e.API, e.player.getName());
        (dc.indexOf("help") > -1 || !dc) ? dc = null: dc = "discord=" + dc;

        var query = "?" + uuid + "&" + name + "&" + dname + (dc ? "&" + dc : "");

        HTTP.post("http://hapel-ic.pl/api/users/game" + query, {});

        if (dc) {
            HTTP.post("http://hapel-ic.pl/api/users/sync?" + dc + "&" + uuid, {});
        }

    } catch (er) {
        print("Logout error: " + er);
    }
}

function toss(e) {
    try {
        var mainh = e.item;
        var dname = mainh.getDisplayName()
        var ents = e.player.rayTraceEntities(10, true, false);

        if( miotly.indexOf( dname.split(" ").join("").split("§f")[1]) > -1 || dname.toLowerCase().indexOf("knut")>-1 || dname.toLowerCase().indexOf("sykl")>-1 || dname.toLowerCase().indexOf("galeon")>-1 || dname.toLowerCase().indexOf("różdżka") >-1 ){
            var sure = e.player.getTempdata().get("confirmThrow");
            if( !sure ){
                e.player.message("[§cHelper§f] §7Aby wyrzucić item kliknij przycisk ponownie!");
                e.player.getTempdata().put("confirmThrow", "1");
                e.player.getTimers().forceStart(1, 100, false);
                e.setCanceled(true);
                return e.player.dropItem(mainh).setOwner(e.player.getName());
            }
        }


        if ( ents.length > 0 ) {
            if ( ents[0].getType() == 1 ) {
                if ( e.item.getDisplayName().indexOf("Plecak.") > -1 ) {
                    var pdata = e.player.getStoreddata();
                    var plecak = pdata.get("plecak");
                    if (plecak) {
                        var lore = e.item.getLore();
                        if (lore.length > 0) {
                            if (lore[0].replace(/§./g, "") == plecak) {
                                e.setCanceled(true);
                                e.player.giveItem(e.item);
                                return e.player.message("[§cPlecak§f] §7Nie możesz wyrzucić otwartego plecaka!");
                            }
                        }
                    }
                }

                var stacks = 1;
                if ( e.player.isSneaking() )
                    stacks = e.item.getStackSize();
                
                e.setCanceled(true);

                var item = e.player.world.createItemFromNbt(mainh.getItemNbt());

                var transferto = ents[0];

                item.setStackSize(stacks);
                transferto.dropItem(item).setOwner(transferto.getName());

                e.player.message("[§cHelper§f] §7Wyrzucono item (" + item.getDisplayName() + "§7) dla: §b" + transferto.getName());

                mainh.setStackSize(mainh.getStackSize() - stacks);
            }
        }
    } catch (er) {
        print("Toss Error: " + er);
    }
}

function timer(e){
    switch (e.id){
        case 1:{
            e.player.getTempdata().remove("confirmThrow");
            return;
        }
    }
}

function getEmpty(npc) {
    var role = npc.getRole();
    if (role.getType() == 1) {
        for (var x = 0; x <= 17; x++) {
            var slot = role.getSold(x);
            if (slot.getName().indexOf("air") > -1)
                return x;
        }
    }
    return false;
}

function karta(e, karty) {
    try {
        var chance = Math.floor(Math.random() * 1000);
        var rarity;
        if (chance >= 985) {
            rarity = "legendary"
        } else
        if (chance < 985 && chance >= 935) {
            rarity = "rare"
        } else
        if (chance < 935 && chance >= 835) {
            rarity = "ancient"
        } else
        if (chance < 835 && chance >= 500) {
            rarity = "uncommon"
        } else
        if (chance < 500) {
            rarity = "common"
        }

        var id = Math.floor(Math.random() * karty[rarity].length);
        var item = e.player.world.createItem("hapeladdons:kartaczarodziei_" + rarity, 0, 1);
        item.setCustomName("§cKarta Czarodziejów §b" + karty[rarity][id].name);

        var lore = ["§aRzadkość: §d" + rarity, "§aNumer: §f" + karty[rarity][id].numer].concat(karty[rarity][id].opis);
        item.setLore(lore);

        var nbt = item.getNbt();
        nbt.setInteger("id", karty[rarity][id].numer);
        nbt.setString("rarity", rarity);

        var numer = "id=" + karty[rarity][id].numer;
        var uuid = "uuid=" + e.player.getUUID();
        var name = "name=" + e.player.getName();
        var dname = "dname=" + e.player.getDisplayName().replace(/§./g, "");
        var dc = getDiscord(e.API, e.player.getName());
        (dc.indexOf("help") > -1 || !dc) ? dc = null: dc = "discord=" + dc;

        var query = "?" + numer + "&" + uuid + "&" + name + "&" + dname + (dc ? "&" + dc : "");

        var x = HTTP.post("http://hapel-ic.pl/api/users/game" + query, {});

        if (x.wyslane)
            nbt.setString("owner", e.player.getName());
    } catch (er) {
        print("karta error: " + er);
    }

    var drop = e.player.dropItem(item);
    drop.setOwner(e.player.getName());
    return true;
}

function customGuiButton(e) {
    try {
        switch (e.buttonId) {
            case 3: {
                //plecak zmień nazwę
                var mainh = e.player.getMainhandItem();
                var nazwa = e.gui.getComponent(2).getText();
                if (!nazwa)
                    return e.player.message("[§cDebuger§f] §7Za krótka nazwa, bądź pusta!");

                nazwa = nazwa.replace(/&/g, "§");

                var lore1 = Java.from(mainh.getLore());

                lore1[2] = nazwa;
                mainh.setLore(lore1);
                e.player.closeGui();
                return e.player.message("[§cPlecaki§f] §7Nazwano plecak: " + nazwa);
            }
            case 4: {
                //plecak zapisz kopię
                var mainh = e.player.getMainhandItem();
                var lore = mainh.getLore();
                if (lore.length < 1) {
                    return e.player.message("[§cDebugger§f] §7Twój plecak nie ma id na pozycji 1!")
                }
                var nbt = mainh.getNbt();
                var data = nbt.getLong("data");
                data ? data = parseInt(data) : data = Date.now() - 90400000;

                if (Date.now() - data > 86400000) {
                    var id = lore[0].split("§0")[1];
                    var r = saveBagCopy(id);
                    if (r === true) {
                        nbt.setLong("data", Date.now());
                        return e.player.message("[§cPlecaki§f] §7Poprawnie zapisano plecak!");
                    }

                    return e.player.message("[§cDebugger§f] §7Coś poszło nie tak!");
                }

                return e.player.message("[§cPlecaki§f] §7Robiłeś już dzisiaj kopię tego plecaka!");
            }
            case 10: {
                var nick = e.gui.getComponent(11).getText() || "";
                if (!nick)
                    return e.player.message("[§cPlecak§f] §7Nie wpisano nicku!");

                var player = e.player.world.getPlayer(nick);
                if (!player)
                    return e.player.message("[§cPlecak§f] §7Nie znaleziono gracza! Musi być online lub wpisano niepoprawny nick.");

                var item = e.player.getMainhandItem();
                if (item.getDisplayName().indexOf("Plecak.") == -1)
                    return e.player.message("[§cPlecak§f] §7Nie masz plecaka w łapie!");

                var lore = Java.from(item.getLore());
                lore[1] = "§0" + player.getUUID();
                item.setLore(lore);

                player.message("[§cPlecak§f] §7Otrzymano prawa plecaka: §a" + lore[0].replace(/§./g, ""));
                e.player.message("[§cPlecak§f] §7Przekazano prawa plecaka dla: §a" + player.getName());
                e.player.closeGui();

                var x = "**" + e.player.getName() + "** Zmienił prawa plecaka **" + lore[0].replace(/§./g, "") + "** dla: " + player.getName();
                x = ang(x);
                HTTP.post(passes.hooks.mainLog, {
                    "content": x,
                    "tts": false,
                });

                var test = updateName(lore[0].replace(/§./g, ""), player.getName(), player.getUUID());
                if (test.error) return e.player.message("[§cDebugger§f] §7Wystąpił błąd w zmianie nazwy i uuid w bazie danych!");
                return;
            }
        }

    } catch (er) {
        print("Button tab1 error: " + er);
    }
}

