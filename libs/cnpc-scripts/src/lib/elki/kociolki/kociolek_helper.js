// Kociołek helper
function id(name) {
  if (typeof name == "string")
      return _GUI_IDS[name] || (_GUI_IDS[name] = Object.keys(_GUI_IDS).length + 1);

  if (typeof name == "number") {
      var keys = Object.keys(_GUI_IDS);
      for (var i = 0; i < keys.length; i++)
          if (_GUI_IDS[keys[i]] == name)
              return keys[i];
  }
}

// immutable
var TEXTURES = {
  buttonTexture: "customnpcs:textures/gui/pp_button.png",
  guiEmpty: "customnpcs:textures/gui/elki_e.png",
  guiFancy: "customnpcs:textures/gui/elki.png",
  guiInv: "customnpcs:textures/gui/inve.png",
  guiTrader: "customnpcs:textures/gui/trader.png",
  elkiIkonki: "customnpcs:textures/gui/ikonki/elki.png"
};

var HANDLE_ADD = [
  "b-addWater",
  "b-addAlcohol",
  "b-increaseTemperature",
  "b-lowerTemperature",
  "b-ignisOn",
  "b-ignisOff",
  "b-turnLeft",
  "b-turnRight",
  "b-timeKeeper"
];

var ACTIONS = {
  "b-crush": "Zmiażdżył składnik",
  "b-cut": "Pociął składnik",
  "b-snip": "Naciął składnik",
  "b-tear": "Porwał składnik",
  "b-crumble": "Pokruszył składnik",
  "b-peel": "Obrał składnik",
  "b-burn": "Przypalił składnik",
  "b-dry": "Wysuszył składnik",
  "b-rub": "Starł składnik",
  "b-grind": "Zmielił składnik",
  "b-break": "Połamał składnik",
  "b-put&pull": "Zanurzył na chwilę składnik i wyciągnął",
  "b-addWater": "Wlał jakiś płyn do kociołka §7[__ml]",
  "b-addAlcohol": "Wlał jakiś płyn do kociołka §7[__ml]",
  "b-increaseTemperature": "Zwiększył temperaturę w kociołku o §7__°C",
  "b-lowerTemperature": "Zmniejszył temperaturę w kociołku o §7__°C",
  "b-ignisOn": "Rozpalił palenisko pod kociołkiem",
  "b-ignisOff": "Zgasił palenisko pod kociołkiem",
  "b-turnLeft": "Zamieszał w lewo §7__ razy",
  "b-turnRight": "Zamieszał w prawo §7__ razy"
};

var _GUI = {};
var _GUI_IDS = {};

function baseKociolek(
  list,
  wait,
  temp,
  ignis,
  id
) {
  this.list = list || [];
  this.wait = wait || 0;
  this.temp = temp || 0;
  this.ignis = ignis || false;
  this.id = id || null;

  this.toJson = function () {
      return {
          list: this.list,
          wait: this.wait,
          temp: this.temp,
          ignis: this.ignis
      };
  };

  this.load = function (
      list,
      wait,
      temp,
      ignis,
      id
  ) {
      this.list = list;
      this.wait = wait;
      this.temp = temp;
      this.ignis = ignis;
      this.id = id;
  };

  this.switchType = function () {
      this.id == "Główny" ? this.id = undefined : this.id = "Główny";
  };
};

function baseGui(withoutBackground) {
  try {
      var gui = API.createCustomGui(id("g-base"), 256, 256, false); // 1

      var x = gui.addLabel(id("l-recipeInfo"), "§c[P]", 265, 0, 12, 12)
          .setHoverText([ "§7Obok będzie wyświetlany przepis.", "§7Po 20 linijek na kartę" ]); // 56

      if (!KOCIOLEK)
          throw "Brak KOCIOLEK!";

      var sdata = KOCIOLEK.getStoreddata();
      var elki = JSON.parse(sdata.get("elki"));

      gui.setBackgroundTexture(withoutBackground ? TEXTURES.guiEmpty : TEXTURES.guiFancy); 

      gui.addTexturedButton(id("b-switchCrucible"), "", 256, 30, 30, 30, TEXTURES.elkiIkonki)
          .setHoverText([
              "§7Przełącz kociołek",
              "§7Aktualny kociołek: §a" + (elki.id || "Główny"), "§7" + (sdata.get("kociolek") || "Kociołek cynowy, Rozmiar 2")
          ]); // 55

      if (elki.side && elki.side.list.length > 0)
          gui.addButton(id("b-mergeCrucibles"), "§a[+]", 290, 40, 12, 12)
              .setHoverText(["§7Dodaj drugi kociołek", "§7Do aktualnego"]); // 57

      if (sdata.has("przepis")) {
          var final = [];
          var przepis = (sdata.get("przepis") || "").split("\n");

          while (przepis.length > 0) 
              final.push( przepis.splice(0, 21) );

          for( var i=0; i < final.length; i++ ) 
              gui.addLabel(id("l-recipepage" + i), "§c["+ i +"]", 265 + ((i+1) * 16), 0, 12, 12)
                  .setHoverText( final[i] );

      } else x.setHoverText(["§7Przepis..."]);

      if (elki.current && elki.current.wait > 0) {
          if (elki.current.wait > Date.now()) {
              var data = new Date(elki.current.wait);
              var waitTo = "§c" + data.getHours() + "§f:§a" + data.getMinutes() + "§f;§b" + data.getSeconds() + " §f(§d" + data.getDate() + "§f.§d" + (data.getMonth() + 1) + "§f.§d" + data.getFullYear() + "§f)";

              gui.addTexturedRect(id("l-waitUntil"), TEXTURES.elkiIkonki, 256, 70, 30, 30, 64, 0)
                  .setHoverText(["§aZaczekaj do:", waitTo, "§0.", "§cHH§f:§aMM§f;§bSS §f(§dDD§f.§dMM§f.§dRRRR§f)"]); // 954
          }
      }

      return gui;
  } catch (er) {
      print("basegui error: " + er);
  }
}

_GUI = {
  "start": new Gui("start", function (e) {
      var gui = baseGui();

      gui.addLabel(id("l-currentGui"), "start", -1024, 512, 80, 30);

      gui.addTexturedButton(id("b-continueBrewing"), "§2Dokończ Eliksir", 5, 115, 80, 15, TEXTURES.buttonTexture); // id 1
      gui.addTexturedButton(id("b-newEliksir"), "§5Nowy Eliksir", 175, 115, 80, 15, TEXTURES.buttonTexture); // id 11
      gui.addTexturedButton(id("b-inocreation"), "§3Inokreacja", 5, 230, 80, 15, TEXTURES.buttonTexture); // id 41
      gui.addTexturedButton(id("b-labelMaker"), "§3Etykieter", 175, 230, 80, 15, TEXTURES.buttonTexture); // id 42

      e.player.showCustomGui(gui);
  }, null, null),
  "continueBrewing": new Gui("continueBrewing", function (e) {
      var gui = API.createCustomGui(1, 256, 256, false);
      gui.addLabel(id("l-currentGui"), "continueBrewing", -1024, 512, 80, 30);

      gui.setBackgroundTexture(TEXTURES.guiInv);

      gui.addLabel(id("l-addItem"), "§4Wrzuć fiolkę", 85, 62, 55, 20).setHoverText("§7Wrzuć fiolkę ze zlanym eliksirem"); // id 9
      gui.addItemSlot(100, 20);

      gui.addLabel(id("l-addRecipe"), "§4Dodaj Przepis", 85, 82, 55, 20).setHoverText("§7Dodaj item z przepisem, pojawi się po prawej stronie!"); // id 10
      gui.addItemSlot(100, 40);
      gui.addTexturedRect(id("t-trader"), TEXTURES.guiTrader, 139, 84, 18, 18, 31, 139); // id 11
      gui.addButton(id("b-removeRecipe"), "§c✖", 160, 83, 20, 20).setHoverText(["§7Usuwa przepis z podglądu"]); // id 111

      gui.showPlayerInventory(8, 113);

      gui.addButton(id("b-goBack"), "§4Menu Główne", 90, 135, 80, 20); // id 31 - can be deleted later on

      e.player.showCustomGui(gui);
  }, null, "start"),
  "eliksirCreatorMenu": new Gui("eliksirCreatorMenu", function (e, current, show) {
      // player, current, show
      var gui = baseGui();

      gui.addLabel(id("l-currentGui"), "eliksirCreatorMenu", -1024, 512, 80, 30);

      gui.addTexturedButton(id("b-swtichToCrucible"), "§1Kociołek", 5, 115, 80, 15, TEXTURES.buttonTexture); // 101
      gui.addTexturedButton(id("b-goAddIngredient"), "§2Dodaj składnik", 90, 95, 80, 15, TEXTURES.buttonTexture); // 102
      gui.addTexturedButton(id("b-steps"), "§3Lista kroków", 175, 115, 80, 15, TEXTURES.buttonTexture); // 103

      gui.addTexturedButton(id("b-saveEliksir"), "§bZapisz Eliksir", 5, 230, 80, 15, TEXTURES.buttonTexture); // 104
      gui.addTexturedButton(id("b-submitEliksir"), "§aWyślij do weryfikacji", 90, 230, 80, 15, TEXTURES.buttonTexture); // 105
      gui.addTexturedButton(id("b-trash"), "§cWylej", 175, 230, 80, 15, TEXTURES.buttonTexture); // 106

      var tmp = KOCIOLEK.getStoreddata().get('elki');
      tmp = JSON.parse(tmp) || {};
      if (!current) {
          if (tmp.current && tmp.current.list && tmp.current.list.length > 0) {
              if (!show)
                  e.player.message("[§cEliksiry§f] §7Kończysz tworzyć eliksir!");
          } else {
              if (!show)
                  e.player.message("[§cEliksiry§f] §7Rozpoczęto tworzenie eliksiru!");

              tmp.current = new baseKociolek();
              KOCIOLEK.getStoreddata().put('elki', JSON.stringify(tmp));
          }
      }

      e.player.showCustomGui(gui);
  }, null, "start"),
  "basicInputs": new Gui("basicInputs", function (e) {
      var gui = baseGui(true);

      gui.addLabel(id("l-currentGui"), "basicInputs", -1024, 512, 80, 30);

      gui.addLabel(id("l-kociolek"), "§1Kociołek", 115, 0, 80, 20); // 99

      gui.addTexturedButton(id("b-addWater"), "§7Wlej wodę", 5, 20, 80, 15, TEXTURES.buttonTexture); // 201
      gui.addTextField(id("in-addWater"), 90, 20, 30, 15); // 101
      gui.addLabel(id("l-addWater"), "§3ml", 122, 20, 15, 15); // 151

      gui.addTexturedButton(id("b-addAlcohol"), "§7Wlej alkohol", 5, 40, 80, 15, TEXTURES.buttonTexture); // 202
      gui.addTextField(id("in-addAlcohol"), 90, 40, 30, 15); // 102
      gui.addLabel(id("l-addAlcohol"), "§3ml", 122, 40, 15, 15); // 152

      gui.addTexturedButton(id("b-increaseTemperature"), "§7Zwiększ temperaturę", 5, 60, 80, 15, TEXTURES.buttonTexture); // 203
      gui.addTextField(id("in-increaseTemperature"), 90, 60, 30, 15); // 104
      gui.addLabel(id("l-increaseTemperature"), "§3°C", 122, 60, 15, 15);

      gui.addTexturedButton(id("b-lowerTemperature"), "§7Zmniejsz temperaturę", 5, 80, 80, 15, TEXTURES.buttonTexture); // 204
      gui.addTextField(id("in-lowerTemperature"), 90, 80, 30, 15);
      gui.addLabel(id("l-lowerTemperature"), "§3°C", 122, 80, 15, 15);

      var ndata = KOCIOLEK.getStoreddata();
      var elki = ndata.get('elki');
      elki = JSON.parse(elki) || {};

      gui.addLabel(id("l-temperature"), "§3Aktualna temperatura: §b" + elki.current.temp + " §3°C", 20, 100, 100, 20);

      // ignis
      // gui.addTexturedButton(925, "", 190, 170, 30, 30, TEXTURES.elkiIkonki).setTextureOffset(35, 0);

      gui.addTexturedButton(id("b-ignisOn"), "§cRozpal ogień", 150, 20, 80, 15, TEXTURES.buttonTexture); // 205
      gui.addTexturedButton(id("b-ignisOff"), "§bZgaś ogień", 150, 40, 80, 15, TEXTURES.buttonTexture); // 206

      gui.addTextField(id("in-customAction"), 150, 70, 80, 15); // 211
      gui.addTexturedButton(id("b-customAction"), "§dDodaj akcję wyżej", 150, 90, 80, 15, TEXTURES.buttonTexture); // 212

      gui.addLabel(id("l-turner"), "§1Mieszadło", 115, 130, 80, 20); // 999

      gui.addTexturedButton(id("b-turnLeft"), "§7Mieszaj w lewo", 5, 150, 80, 15, TEXTURES.buttonTexture); // 207
      gui.addTextField(id("in-turnLeft"), 90, 150, 30, 15); // 107
      gui.addLabel(id("l-turnLeft"), "§3razy", 122, 150, 20, 15); // 157

      gui.addTexturedButton(id("b-turnRight"), "§7Mieszaj w prawo", 5, 170, 80, 15, TEXTURES.buttonTexture); // 208
      gui.addTextField(id("in-turnRight"), 90, 170, 30, 15);
      gui.addLabel(id("l-turnRight"), "§3razy", 122, 170, 20, 15);


      gui.addLabel(id("l-timeKeeper1"), "§1Czasomierz", 115, 200, 80, 20); // 998
      gui.addTexturedButton(id("b-timeKeeper"), "§7Odczekaj chwilkę", 5, 220, 80, 15, TEXTURES.buttonTexture); // 209
      gui.addTextField(id("in-timeKeeper"), 90, 220, 30, 15); // 109
      gui.addLabel(id("l-timeKeeper"), "§3Minut", 122, 220, 20, 15); //159

      gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, TEXTURES.buttonTexture);

      e.player.showCustomGui(gui);
  }, null, "eliksirCreatorMenu"),
  "ingredientSelector": new Gui("ingredientSelector", function (e, type, search) {
      var gui = baseGui(true);

      gui.addLabel(id("l-currentGui"), "ingredientSelector", -1024, 512, 80, 30);

      if (!type) {
          gui.addLabel(id("l-ingredientType"), "§1Wybierz typ składnika", 95, 0, 80, 20);

          // 301-305
          gui.addTexturedButton(id("b-ingredientType1"), "§7Nieorganiczne", 40, 80, 80, 15, TEXTURES.buttonTexture);
          gui.addTexturedButton(id("b-ingredientType2"), "§7Bazy wodne", 130, 80, 80, 15, TEXTURES.buttonTexture);
          gui.addTexturedButton(id("b-ingredientType3"), "§7Roślinne", 40, 110, 80, 15, TEXTURES.buttonTexture);
          gui.addTexturedButton(id("b-ingredientType4"), "§7Zwierzęce", 130, 110, 80, 15, TEXTURES.buttonTexture);
          gui.addTexturedButton(id("b-ingredientType5"), "§7Własny (z eq)", 90, 140, 80, 15, TEXTURES.buttonTexture);

          gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, TEXTURES.buttonTexture);
      } else {
          gui.addLabel(id("l-info"), "§1Wybierz Ilość i Składnik", 95, 0, 120, 20); // 9
          gui.addLabel(id("l-type"), "§5" + type, 190, 20, 80, 20); // 10
          gui.addLabel(id("l-warning"), "§4§l[UWAGA]", 5, 5, 80, 30)
              .setHoverText(["§r§4Wpisz najpierw wartość potem kliknij dwukrotnie na składnik!"]); //19

          var skladniki = getSkladnik({
              typ: type
          });
          if (!skladniki || !skladniki.result || skladniki.error) 
              return e.player.message("[§cDebugger§f] §7Error, napisz do administracji! -" + skladniki.error);

          skladniki = skladniki.result;

          var lista1 = [];
          for (var i = 0; i < skladniki.length; i++) {
              if (search && skladniki[i].nazwa.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                  if (skladniki[i].dostępny == true) {
                      lista1.push(skladniki[i].nazwa + "  [" + skladniki[i].jednostka + "]");
                  }
              } else if (!search) {
                  if (skladniki[i].dostępny == true) {
                      lista1.push(skladniki[i].nazwa + "  [" + skladniki[i].jednostka + "]");
                  }
              }
          }

          gui.addLabel(id("l-quantity"), "§3ilość:", 105, 20, 60, 20); // 29
          gui.addTextField(id("in-quantity"), 125, 22, 30, 15); // 5
          gui.addScroll(id("s-ingredient"), 8, 45, 240, 180, lista1); // 32

          gui.addTextField(id("in-searchByName"), 90, 235, 70, 15); // 7
          gui.addTexturedButton(id("b-searchByName7"), "§bSzukaj po nazwie", 5, 235, 80, 15, TEXTURES.buttonTexture); // 999

          gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, TEXTURES.buttonTexture);
      }

      e.player.showCustomGui(gui);
  }, null, "eliksirCreatorMenu"),
  "stepList": new Gui("stepList", function (e) {
      var gui = baseGui(true);
      gui.addLabel(id("l-currentGui"), "stepList", -1024, 512, 80, 30);

      var tmp = KOCIOLEK.getStoreddata().get('elki');
      tmp = JSON.parse(tmp) || {};
      var lista = tmp.current.list || [];

      var cena = tmp.current.price || 0;

      gui.addLabel(id("l-info"), "§1Aktualna lista kroków", 85, 10, 100, 20); // 9
      gui.addLabel(id("l-price"), "§eCena: " + cena, 5, 10, 50, 20); // 10
      gui.addLabel(id("l-info1"), "§3[I]", 230, 20, 15, 15)
          .setHoverText(["§7Informacja o zaznaczonym kroku"]); // 11
      gui.addScroll(id("s-list"), 8, 45, 240, 180, lista); // 43

      gui.addTexturedButton(id("b-saveRecipe"), "§8Zapisz przepis", 5, 235, 80, 15, TEXTURES.buttonTexture)
          .setHoverText(["§7Aby stworzyć przepis z aktualnego", "§7Musisz mieć §azeszyt §7na §ctoolbarze"]); // 12

      gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, TEXTURES.buttonTexture); // 991

      e.player.showCustomGui(gui);
  }, null, "eliksirCreatorMenu"),
  "modifyIngredient": new Gui("modifyIngredient", function (e, skladnik) {
      var gui = baseGui(true);
      //{name:sel[0], ile: sel[1], jednostka: sel[2], akcje: []}
      gui.addLabel(id("l-currentGui"), "modifyIngredient", -1024, 512, 80, 30);

      gui.addLabel(id("l-info"), "§1Modyfikacja składnika: §b" + skladnik.name + " " + skladnik.ile + " " + skladnik.jednostka, 40, 10, 200, 20); // 9
      gui.addLabel(id("l-lm"), "§4[LM]", 10, 10, 20, 20)
          .setHoverText(skladnik.akcje); // 19

      if (skladnik.typ == "eq")
          gui.addLabel(id("l-info1"), "§cSkładnik własny", 40, 30, 200, 20); // 29


      //1 rząd
      gui.addTexturedButton(id("b-crush"), "§7Zmiażdż", 40, 80, 80, 15, TEXTURES.buttonTexture); // 401
      gui.addTexturedButton(id("b-cut"), "§7Potnij", 40, 100, 80, 15, TEXTURES.buttonTexture); // 402
      gui.addTexturedButton(id("b-snip"), "§7Natnij", 40, 120, 80, 15, TEXTURES.buttonTexture); // 403
      gui.addTexturedButton(id("b-tear"), "§7Porwij", 40, 140, 80, 15, TEXTURES.buttonTexture); // 404
      gui.addTexturedButton(id("b-rub"), "§7Zetrzyj", 40, 160, 80, 15, TEXTURES.buttonTexture); // 409
      gui.addTexturedButton(id("b-break"), "§7Połam", 40, 180, 80, 15, TEXTURES.buttonTexture); // 412
      //2 rząd
      gui.addTexturedButton(id("b-crumble"), "§7Pokrusz", 130, 80, 80, 15, TEXTURES.buttonTexture); // 405
      gui.addTexturedButton(id("b-peel"), "§7Obierz", 130, 100, 80, 15, TEXTURES.buttonTexture); // 406
      gui.addTexturedButton(id("b-burn"), "§7Przypal", 130, 120, 80, 15, TEXTURES.buttonTexture); // 407
      gui.addTexturedButton(id("b-dry"), "§7Wysusz", 130, 140, 80, 15, TEXTURES.buttonTexture); // 408
      gui.addTexturedButton(id("b-grind"), "§7Zmiel", 130, 160, 80, 15, TEXTURES.buttonTexture); // 411

      gui.addTexturedButton(id("b-addIngredient"), "§aDodaj składnik", 5, 235, 80, 15, TEXTURES.buttonTexture); // 410
      gui.addTexturedButton(id("b-put&pull"), "§bZanurz i wyciągnij", 90, 235, 80, 15, TEXTURES.buttonTexture); // 413


      gui.addTexturedButton(id("b-goBack"), "§8Powrót", 175, 235, 80, 15, TEXTURES.buttonTexture);

      e.player.showCustomGui(gui);
  }, null, "ingredientSelector"),
  "eqIngredient": new Gui("eqIngredient", function (e) {
      //dodawanie składniku z eq
      var gui = baseGui(true);
      gui.addLabel(id("l-currentGui"), "eqIngredient", -1024, 512, 80, 30);

      gui.addLabel(id("l-info"), "§1Wybierz Ilość i Składnik", 95, 0, 130, 20); // 9
      gui.addLabel(id("l-warning"), "§4§l[UWAGA]", 5, 5, 80, 30)
          .setHoverText(["§4Wpisz najpierw wartość potem kliknij dwukrotnie na składnik!"]); // 19

      var items = e.player.getInventory().getItems();
      var skladniki = [];
      for (var i = 0; i < items.length; i++) {
          var lore = items[i].getLore();
          if (lore.length >= 2)
              if (lore[0].toLowerCase() == "§askładnik eliksiru")
                  skladniki.push(items[i].getDisplayName() + " §7[" + lore[1] + "§7]");
      }

      gui.addLabel(id("l-quantity"), "§3ilość:", 105, 20, 60, 20); // 29
      gui.addTextField(id("in-quantity1"), 125, 22, 30, 15); // 5
      gui.addScroll(id("s-eqIngredient"), 5, 45, 245, 180, skladniki); // 42

      gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, TEXTURES.buttonTexture);
      e.player.showCustomGui(gui);
  }, null, "eliksirCreatorMenu"),
  "selectEliksirToSend": new Gui("selectEliksirToSend", function (e, searched) {
      var gui = baseGui();
      gui.addLabel(id("l-currentGui"), "selectEliksirToSend", -1024, 512, 80, 30);

      gui.addLabel(id("l-info"), "§4Wpisz nazwę eliksiru", 90, 0, 100, 20); // 9

      var data = searched ? getEliksir({
          nazwal: searched
      }) : getEliksir();
      if (!data || data.error)
          return e.player.message("[§cDebugger§f] §7Error, pisz do administracji! " + error);

      data = data.result;
      var lista = [];

      for (var i = 0; i < data.length; i++)
          lista.push(data[i].nazwa);


      gui.addScroll(id("s-eliksirs"), 10, 15, 240, 210, lista); // 52

      gui.addTextField(id("in-searchByName"), 90, 235, 70, 15); // 7
      gui.addTexturedButton(id("b-searchByName11"), "§bSzukaj po nazwie", 5, 235, 80, 15, TEXTURES.buttonTexture); // 998

      gui.addTexturedButton(id("b-goBack"), "§8Powrót", 170, 235, 80, 15, TEXTURES.buttonTexture);

      e.player.showCustomGui(gui);
  }, null, "eliksirCreatorMenu"),
  "eliksirInocreation": new Gui("eliksirInocreation", function (e) {
      var gui = baseGui();
      gui.addLabel(id("l-currentGui"), "eliksirInocreation", -1024, 512, 80, 30);

      gui.addLabel(id("l-info"), "§9Wybierz eliksir do inokreacji", 70, 0, 160, 20); // 9

      var items = e.player.getInventory().getItems();
      var eliksiry = getMysteriousElixirs(items)

      gui.addScroll(id("s-inocreation"), 10, 15, 240, 210, eliksiry); // 62
      gui.addTexturedButton(id("b-goBack"), "§4Menu główne", 90, 230, 80, 15, TEXTURES.buttonTexture); // 31

      e.player.showCustomGui(gui);
  }, null, "start"),
  "labelMaker": new Gui("labelMaker", function (e, eliksir) {
      var gui = baseGui(true);
      gui.addLabel(id("l-currentGui"), "labelMaker", -1024, 512, 80, 30);

      if (!eliksir) {
          gui.addLabel(id("l-info"), "§9Wybierz eliksir do Etykiety", 80, 0, 100, 20); // 9

          // new function
          var items = e.player.getInventory().getItems();
          var eliksiry = getMysteriousElixirs(items);

          gui.addScroll(id("s-labelSelector"), 10, 15, 240, 210, eliksiry); // 63
          gui.addTexturedButton(id("b-goBack"), "§4Menu główne", 90, 230, 80, 15, TEXTURES.buttonTexture); // 31
      } else {
          gui.addLabel(id("l-info"), "§9Wpisz etykietę", 95, 0, 100, 20); // 9
          gui.addLabel(id("l-info1"), "§c[I]", 5, 10, 100, 20)
              .setHoverText(["§7Aby dodać kolor:", "§7wpisz & i opis koloru", "§7Np. §a&a §7/ §6&6"]); // 10

          gui.addLabel(id("l-eliksir"), eliksir, 250, 0, 100, 20); // 11

          gui.addTextField(id("in-labelText"), 70, 80, 120, 20); // 19
          gui.addTexturedButton(id("b-addLabel"), "§2Dodaj etykietę", 90, 110, 80, 15, TEXTURES.buttonTexture); // 20

          gui.addTexturedButton(id("b-removeLabel"), "§cUsuń etykietę", 5, 230, 80, 15, TEXTURES.buttonTexture); // 32
          gui.addTexturedButton(id("b-goBack"), "§4Menu główne", 170, 230, 80, 15, TEXTURES.buttonTexture); // 31
      }

      e.player.showCustomGui(gui);
  }, null, "start")
};

/**
* Saves calculated price to storreddata current crucible
* @param player player object
* @param skladnik Ingredient object. {name: string, jednostka: string, akcje: string[]}
* @returns boolean - true if calculated successfully
*/
function calculatePrice(player, skladnik) {
  //skladnik : {name: nazwa, ile: 244, jednostka: gramy, akcje: [zanurz, obetnij, natnij]}
  //skladniki: {serial, nazwa, typ, cena, ilosc, jednostka, dostępny}
  var ndata = KOCIOLEK.getStoreddata();
  var elki = ndata.get('elki');

  var skladniki = getSkladnik({
      nazwa: skladnik.name
  });

  if (skladniki.error)
      return player.message("[§cDebugger§f] §7Error, napisz do administracji: " + skladniki.error);

  skladniki = skladniki.result[0];

  elki = JSON.parse(elki) || {};
  if (!elki.current)
      return false;

  var price = elki.current.price || 0;
  var value = Math.ceil((parseFloat(skladniki.cena) / parseFloat(skladniki.ilosc)) * skladnik.ile) || 9999;

  elki.current.price = price + value;
  ndata.put('elki', JSON.stringify(elki));
  return true;
}

/**
* Modifies and saves temperature data for current elixir
* !SAVES ELKI on storeddata
* @param e event object
* @param elki Object containing info about all cauldrons 
* @param {number} ile temperature to change
* @returns modified elki object
*/
function temp(e, elki, ile) {
  if(!elki) return;

  if (elki.current.ignis == false) {
      e.player.message("[§cKociołek§f] §7Kociołek musi być rozpalony!");
      return;
  }

  var ndata = KOCIOLEK.getStoreddata();

  elki.current.temp += ile;
  ndata.put('elki', JSON.stringify(elki));

  e.gui.getComponent(id("l-temperature")).setText("§3Aktualna temperatura: §b" + elki.current.temp + " §3°C");
  e.gui.update(e.player);

  return elki;
}

/**
 * Sets waiting period
 * @param elki Object containing info about all cauldrons 
 * @param {number} ile time to set for waiting
 * @returns {boolean | Eliksir} false if failed, othrewise return modified elki object
 */
function setWait(elki, ile) {
  if (!elki || !ile || ile <= 0 || isNaN(ile))
      return false;

  if (elki.current) {
      var mins = ile * 60 * 1000;
      var timestamp = Date.now() + mins;
      elki.current.wait = timestamp;

      return elki;
  }
  return false;
}

/**
 * Handles change to current steps
 * @param elki Object containing info about all cauldrons 
 * @param txt Text to write to arraylist
 * @param player Player object
 * @returns Modified elki obejct
 */
function addToList(elki, txt, player) {
  if(!elki) return;

  if (elki.current.list) {
      elki.current.list.push(txt);
      //print(elki.current.list);
      if (checkArray(elki.current.list, txt)) {
          elki.current = new baseKociolek().toJson();
          pisz(player, "Potknął się o powietrze i wylał zawartość kociołka");
          KOCIOLEK.world.spawnParticle("explode", pos.getX() + 0.5, pos.getY() + 1.2, pos.getZ() + 0.5, 0.1, 0.4, 0.1, 0.01, 20);
          KOCIOLEK.world.playSoundAt(pos, "minecraft:entity.generic.explode", 0.5, 0.8);
      }
  }
  // print("current temp list: " + elki.current.temp);

  return elki;
}

/**
 * Main function to distribute adding elements.
 * @param e Any event
 * @param {boolean} handleaddOrSkladnik Whether should use handleAdd or hadnleSkladnik
 * @param {string} text Text to be added
 */
function addElement(e, handleaddOrSkladnik, text) {
  if (handleaddOrSkladnik == false) {
      var x = handleSkladnik(e);
      if (!x) return;

      var _t = ACTIONS[text];
      if (x.ile)
          _t = _t.replace(/\_\_/g, x.ile);

      pisz(e.player, _t);

      return x;
  } else {
      var x = handleAdd(e, text);
      if (!x) return;

      var _t = ACTIONS[text];
      if (x.ile)
          _t = _t.replace(/\_\_/g, x.ile);

      pisz(e.player, _t);
  }
}

function handleAdd(e, text) {
  var ndata = KOCIOLEK.getStoreddata();
  var elki = ndata.get('elki');
  elki = JSON.parse(elki) || {};
  var label = e.gui.getComponent(e.buttonId).getLabel(); //button

  if (elki.current) {
      var t = Date.now();
      if (t - elki.current.wait < 0 && label.indexOf("pokryw") == -1) {
          pisz(e.player, "Niecierpliwy zrobił coś nie tak, a eliksir zaraz wybuchł mu przed nosem!");

          elki.current = new baseKociolek().toJson();
          ndata.put('elki', JSON.stringify(elki));
          KOCIOLEK.getTimers().stop(id('t-smoking'));
          return false;
      }
  }

  var akcja = label.replace(/§./g, "");
  if (akcja.indexOf("ogień") > -1) {
      var turnOn = akcja.toLowerCase().indexOf("rozpal") > -1;

      // print("turn: " + turnOn);
      // print("fire: " + elki.current.ignis);
      // print("elki: " + JSON.stringify(elki, null, 2));

      if ((turnOn && elki.current.ignis == true) || (!turnOn && elki.current.ignis == false))
          return e.player.message("[§cKociołek§f] §7ziomek co ty robisz?!");

      if (turnOn) {
          KOCIOLEK.getTimers().forceStart(id('t-smoking'), 90, true);
          elki.current.ignis = true;
      } else {
          KOCIOLEK.getTimers().stop(id('t-smoking'));
          var test = temp(e, elki, -elki.current.temp);
          if (test) 
              elki = test;

          elki.current.ignis = false;
      }

      ndata.put('elki', JSON.stringify(elki));
  }


  var _label = e.gui.getComponent(id(text.replace(/b\-/, "l-"))); //.split("§3")[1]
  var ile = e.gui.getComponent(id(text.replace(/b\-/, "in-")));

  var labelText;
  var ileText;

  if (_label && ile) {
      labelText = _label.getText().replace(/§./g, ""); //label
      ileText = parseFloat(ile.getText()); //textfield

      if (!akcja || !labelText || !ileText || isNaN(ileText) || ile > 999999999 || ileText <= 0) {
          e.player.message("[§cEliksiry§f] §7Coś poszło nie tak! sprawdź czy wpisałeś dobrą wartość.");
          return false;
      }
  }

  if (!akcja)
      return e.player.message("[§cEliksiry§f] §7brak guzika!");


  if ( label.indexOf("temperaturę") > -1 ) {
      var returnObject = (labelText && ileText) ? {
          ile: ileText,
          akcja: akcja,
          jednostka: labelText
      } : {
          akcja: akcja
      };

      var withAction = addToList(elki, akcja + " [" + ileText + " " + labelText + "]", e.player);
      if( withAction ) elki = withAction;

      if (returnObject.ile) {
          var isPositive = akcja.toLowerCase().indexOf("zwiększ") > -1;
          var y = temp(e, elki, parseInt(returnObject.ile) * (isPositive ? 1 : -1) );
          if (y) {
              elki = y;
              ndata.put('elki', JSON.stringify(elki));
          }
      }

      return returnObject;
  }

  if( label.indexOf("Odczekaj") > -1 ) {
      var test = setWait(elki, ileText);
      if(test) elki = test;
  }


  if (labelText && ileText) {
      var withAction = addToList(elki, akcja + " [" + ileText + " " + labelText + "]", e.player);
      if( withAction ) elki = withAction;
      ndata.put('elki', JSON.stringify(elki));

      return {
          ile: ileText,
          akcja: akcja,
          jednostka: labelText
      };
  } else {
      var withAction = addToList(elki, akcja, e.player);
      if( withAction ) elki = withAction;
      ndata.put('elki', JSON.stringify(elki));

      return {
          akcja: akcja
      };
  }
}

function handleSkladnik(e) {
  var ndata = KOCIOLEK.getStoreddata();
  var elki = ndata.get('elki');
  elki = JSON.parse(elki) || {};

  if (elki.current && elki.current.skladnik) {
      var bttnText = e.gui.getComponent(e.buttonId).getLabel().replace(/§./g, "");
      // var buttonIle = e.gui.getComponent(e.buttonId).getLabel();

      if (elki.current.skladnik.akcje.indexOf(bttnText) > -1)
          return false;

      elki.current.skladnik.akcje.push(bttnText);

      ndata.put('elki', JSON.stringify(elki));
      getGui("modifyIngredient").show(e, elki.current.skladnik);
      return bttnText;
  }

  return false;
}

/**
* Executes comand as a player (/me txt)
* @param player player object
* @param {string} txt action 
*/
function pisz(player, txt) {
  function sudo(api, player, command) {
      if (!player || !command) return "Too few parameters!"
      if (command.split(" ")[0].indexOf("/") > -1) return "Slash in command!"
      return api.executeCommand(api.getIWorlds()[0], "sudo " + player + " " + command);
  }

  sudo(API, player.getName(), "me " + txt);
}

/**
* Check array for same occurrences
* @param {string[]} array List of moves
* @param {string} text String to check
* @returns true if there was more than 5 of the same string, false otherwise
*/
function checkArray(array, text) {
  var lastFive = array.slice(array.length - 5, array.length + 5);
  var i = 0;

  for (var x = 0; x < lastFive.length; x++)
      if (lastFive[x] == text)
          i++;

  if (i >= 5)
      return true;

  return false;
}

function getGui(guiName) {
  if (!guiName || !_GUI[guiName]) return;

  return _GUI[guiName];
}

/**
* @param {string} _name - name of the gui
* @param {function} _show - executor function that is called to show current gui
* @param {string} _next - Name of the next gui. Returns `show` function of that gui
* @param {string} _prev - Name of the previous gui. Returns `show` function of that gui
*/
function Gui(_name, _show, _next, _prev) {
  this.name = _name;
  this.show = _show;
  this.next = _next;
  this.prev = _prev;

  this.showNext = getGui(this.next) ? getGui(this.next).show : null;
  this.showPrev = getGui(this.prev) ? getGui(this.prev).show : null;

  return _GUI[this.name] = this;
}

/**
* function for getting saved eliskirs from player's/chest's inventory
* @param items - Items array 
* @returns array of eliksir's parameters
*/
function getMysteriousElixirs(items) {
  var eliksiry = [];

  if (!items || typeof items != "object" || items.length == 0) return eliksiry;

  for (var i = 0; i < items.length; i++) {
      if (items[i].getDisplayName() == "§eTajemniczy Eliksir") {
          var lore = items[i].getLore();
          if (lore.length >= 3)
              eliksiry.push(i + "." + lore[0] + " §7§l/§r " + lore[1] + " §7§l/§r " + lore[2]);
      }
  }

  return eliksiry;
} 