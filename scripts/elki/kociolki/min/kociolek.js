var npc,pos,API=Java.type("noppes.npcs.api.NpcAPI").Instance(),version="3.1.2021-4";function init(e){try{e.block.setModel("minecraft:cauldron"),e.block.setHardness(1),npc=e.block,pos=npc.getPos();var t,r=e.block.getStoreddata(),a=r.get("elki");(a=JSON.parse(a)||{}).current||(a.current={list:[],wait:0,temp:0,ignis:!1},t=!0),a.side||(a.side={list:[],wait:0,temp:0,ignis:!1},t=!0),a.id||(a.current.id="Główny",t=!0),t&&r.put("elki",JSON.stringify(a)),r.get("update")!=version&&update(e)}catch(e){print("init error: "+e)}}function harvested(e){try{var t=e.block.getStoreddata().get("kociolek")||"Cynowy kociołek rozmiar 2",r=e.block.world.createItem("minecraft:cauldron",0,1);r.setCustomName("§c"+t),e.player.dropItem(r).setOwner(e.player.getName())}catch(e){print("Harvest error: "+e)}}function interact(e){try{return npc&&pos||(npc=e.block,pos=npc.getPos()),gui1(e.player)}catch(e){print("interact error: "+e)}}function baseGui(e){try{var t=API.createCustomGui(1,256,256,!1),r=t.addLabel(56,"§c[P]",265,0,30,30);if(!npc)throw"Brak npc!";var a=npc.getStoreddata(),i=JSON.parse(a.get("elki"));if(e?t.setBackgroundTexture("customnpcs:textures/gui/elki_e.png"):t.setBackgroundTexture("customnpcs:textures/gui/elki.png"),t.addTexturedButton(55,"",256,30,30,30,"customnpcs:textures/gui/ikonki/elki.png").setHoverText(["§7Przełącz kociołek","§7Aktualny kociołek: §a"+(i.id||"Główny"),"§7"+(a.get("kociolek")||"Kociołek cynowy, Rozmiar 2")]),i.side&&i.side.list.length>0&&t.addButton(57,"§a[+]",290,40,20,20).setHoverText(["§7Dodaj drugi kociołek","§7Do aktualnego"]),a.get("przepis")?r.setHoverText([a.get("przepis")]):r.setHoverText(["§7Przepis..."]),i.current&&i.current.wait>0&&i.current.wait>Date.now()){var n=new Date(i.current.wait),s="§c"+n.getHours()+"§f:§a"+n.getMinutes()+"§f;§b"+n.getSeconds()+" §f(§d"+n.getDate()+"§f.§d"+(n.getMonth()+1)+"§f.§d"+n.getFullYear()+"§f)";t.addTexturedRect(954,"customnpcs:textures/gui/ikonki/elki.png",256,70,30,30,64,0).setHoverText(["§aZaczekaj do:",s,"§0.","§cHH§f:§aMM§f;§bSS §f(§dDD§f.§dMM§f.§dRRRR§f)"])}return t}catch(e){print("basegui error: "+e)}}function gui1(e){var t=baseGui();return t.addTexturedButton(1,"§2Dokończ Eliksir",5,115,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTexturedButton(11,"§5Nowy Eliksir",175,115,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTexturedButton(41,"§3Inokreacja",5,230,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTexturedButton(42,"§3Etykieter",175,230,80,15,"customnpcs:textures/gui/pp_button.png"),e.showCustomGui(t),t}function gui2(e){var t=API.createCustomGui(1,256,256,!1);return t.setBackgroundTexture("customnpcs:textures/gui/inve.png"),t.addLabel(9,"§4Wrzuć fiolkę",85,62,55,20).setHoverText("§7Wrzuć fiolkę ze zlanym eliksirem"),t.addItemSlot(100,20),t.addLabel(10,"§4Dodaj Przepis",85,82,55,20).setHoverText("§7Dodaj item z przepisem, pojawi się po prawej stronie!"),t.addItemSlot(100,40),t.addTexturedRect(11,"customnpcs:textures/gui/trader.png",139,84,18,18,31,139),t.addButton(111,"§c✖",160,83,20,20).setHoverText(["§7Usuwa przepis z podglądu"]),t.showPlayerInventory(8,113),t.addButton(31,"§4Menu Główne",90,135,80,20),e.showCustomGui(t),t}function gui3(e,t,r){var a=baseGui();a.addTexturedButton(101,"§1Kociołek",5,115,80,15,"customnpcs:textures/gui/pp_button.png"),a.addTexturedButton(102,"§2Dodaj składnik",90,95,80,15,"customnpcs:textures/gui/pp_button.png"),a.addTexturedButton(103,"§3Lista kroków",175,115,80,15,"customnpcs:textures/gui/pp_button.png"),a.addTexturedButton(104,"§bZapisz Eliksir",5,230,80,15,"customnpcs:textures/gui/pp_button.png"),a.addTexturedButton(105,"§aWyślij do weryfikacji",90,230,80,15,"customnpcs:textures/gui/pp_button.png"),a.addTexturedButton(106,"§cWylej",175,230,80,15,"customnpcs:textures/gui/pp_button.png");var i=npc.getStoreddata().get("elki");return i=JSON.parse(i)||{},t||(i.current&&i.current.list&&i.current.list.length>0?r||e.message("[§cEliksiry§f] §7Kończysz tworzyć eliksir!"):(r||e.message("[§cEliksiry§f] §7Rozpoczęto tworzenie eliksiru!"),i.current={name:"",list:[],wait:0,temp:0,ignis:!1},npc.getStoreddata().put("elki",JSON.stringify(i)))),e.showCustomGui(a),a}function gui6(e){var t=baseGui(!0);t.addLabel(99,"§1Kociołek",115,0,80,20),t.addTexturedButton(201,"§7Wlej wodę",5,20,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTextField(101,90,20,30,15),t.addLabel(151,"§3ml",122,20,15,15),t.addTexturedButton(202,"§7Wlej alkohol",5,40,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTextField(102,90,40,30,15),t.addLabel(152,"§3ml",122,40,15,15),t.addTexturedButton(203,"§7Zwiększ temperaturę",5,60,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTextField(103,90,60,30,15),t.addLabel(153,"§3°C",122,60,15,15),t.addTexturedButton(204,"§7Zmniejsz temperaturę",5,80,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTextField(104,90,80,30,15),t.addLabel(154,"§3°C",122,80,15,15);var r=npc.getStoreddata().get("elki");return r=JSON.parse(r)||{},t.addLabel(156,"§3Aktualna temperatura: §b"+r.current.temp+" §3°C",20,100,100,20),t.addTexturedButton(205,"§cRozpal ogień",150,20,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTexturedButton(206,"§bZgaś ogień",150,40,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTextField(211,150,70,80,15),t.addTexturedButton(212,"§dDodaj akcję wyżej",150,90,80,15,"customnpcs:textures/gui/pp_button.png"),t.addLabel(999,"§1Mieszadło",115,130,80,20),t.addTexturedButton(207,"§7Mieszaj w lewo",5,150,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTextField(107,90,150,30,15),t.addLabel(157,"§3razy",122,150,20,15),t.addTexturedButton(208,"§7Mieszaj w prawo",5,170,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTextField(108,90,170,30,15),t.addLabel(158,"§3razy",122,170,20,15),t.addLabel(998,"§1Czasomierz",115,200,80,20),t.addTexturedButton(209,"§7Odczekaj chwilkę",5,220,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTextField(109,90,220,30,15),t.addLabel(159,"§3Minut",122,220,20,15),t.addTexturedButton(991,"§8Powrót",170,235,80,15,"customnpcs:textures/gui/pp_button.png"),e.showCustomGui(t),t}function gui7(t,r,a){var i=baseGui(!0);if(r){i.addLabel(9,"§1Wybierz Ilość i Składnik",95,0,120,20),i.addLabel(10,"§5"+r,190,20,80,20),i.addLabel(19,"§4§l[UWAGA]",5,5,80,30).setHoverText(["§r§4Wpisz najpierw wartość potem kliknij dwukrotnie na składnik!"]);var n=getSkladnik({typ:r});if(n.error)return e.player.message("[§cDebugger§f] §7Error, napisz do administracji! -"+n.error);n=n.result;for(var s=[],o=0;o<n.length;o++)a&&n[o].nazwa.toLowerCase().indexOf(a.toLowerCase())>-1?1==n[o].dostępny&&s.push(n[o].nazwa+"  ["+n[o].jednostka+"]"):a||1==n[o].dostępny&&s.push(n[o].nazwa+"  ["+n[o].jednostka+"]");i.addLabel(29,"§3ilość:",105,20,60,20),i.addTextField(5,125,22,30,15),i.addScroll(32,8,45,240,180,s),i.addTextField(7,90,235,70,15),i.addTexturedButton(999,"§bSzukaj po nazwie",5,235,80,15,"customnpcs:textures/gui/pp_button.png"),i.addTexturedButton(991,"§8Powrót",170,235,80,15,"customnpcs:textures/gui/pp_button.png")}else i.addLabel(9,"§1Wybierz typ składnika",95,0,80,20),i.addTexturedButton(301,"§7Nieorganiczne",40,80,80,15,"customnpcs:textures/gui/pp_button.png"),i.addTexturedButton(302,"§7Bazy wodne",130,80,80,15,"customnpcs:textures/gui/pp_button.png"),i.addTexturedButton(303,"§7Roślinne",40,110,80,15,"customnpcs:textures/gui/pp_button.png"),i.addTexturedButton(304,"§7Zwierzęce",130,110,80,15,"customnpcs:textures/gui/pp_button.png"),i.addTexturedButton(305,"§7Własny (z eq)",90,140,80,15,"customnpcs:textures/gui/pp_button.png"),i.addTexturedButton(991,"§8Powrót",170,235,80,15,"customnpcs:textures/gui/pp_button.png");return t.showCustomGui(i),i}function gui8(e){var t=baseGui(!0),r=npc.getStoreddata().get("elki"),a=(r=JSON.parse(r)||{}).current.list||[],i=r.current.price||0;return t.addLabel(9,"§1Aktualna lista kroków",85,10,100,20),t.addLabel(10,"§eCena: "+i,5,10,50,20),t.addLabel(11,"§3[I]",230,20,15,15).setHoverText(["§7Informacja o zaznaczonym kroku"]),t.addScroll(43,8,45,240,180,a),t.addTexturedButton(12,"§8Zapisz przepis",5,235,80,15,"customnpcs:textures/gui/pp_button.png").setHoverText(["§7Aby stworzyć przepis z aktualnego","§7Musisz mieć §azeszyt §7na §ctoolbarze"]),t.addTexturedButton(991,"§8Powrót",170,235,80,15,"customnpcs:textures/gui/pp_button.png"),e.showCustomGui(t),t}function gui9(e,t){var r=baseGui(!0);return r.addLabel(9,"§1Modyfikacja składnika: §b"+t.name+" "+t.ile+" "+t.jednostka,40,10,200,20),r.addLabel(19,"§4[LM]",10,10,20,20).setHoverText(t.akcje),"eq"==t.typ&&r.addLabel(29,"§cSkładnik własny",40,30,200,20),r.addTexturedButton(401,"§7Zmiażdż",40,80,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(402,"§7Potnij",40,100,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(403,"§7Natnij",40,120,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(404,"§7Porwij",40,140,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(409,"§7Zetrzyj",40,160,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(412,"§7Połam",40,180,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(405,"§7Pokrusz",130,80,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(406,"§7Obierz",130,100,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(407,"§7Przypal",130,120,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(408,"§7Wysusz",130,140,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(411,"§7Zmiel",130,160,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(410,"§aDodaj składnik",5,235,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(413,"§bZanurz i wyciągnij",90,235,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(991,"§8Powrót",175,235,80,15,"customnpcs:textures/gui/pp_button.png"),e.showCustomGui(r),r}function gui10(e){var t=baseGui(!0);t.addLabel(9,"§1Wybierz Ilość i Składnik",95,0,130,20),t.addLabel(19,"§4§l[UWAGA]",5,5,80,30).setHoverText(["§4Wpisz najpierw wartość potem kliknij dwukrotnie na składnik!"]);for(var r=e.getInventory().getItems(),a=[],i=0;i<r.length;i++){var n=r[i].getLore();n.length>=2&&"§askładnik eliksiru"==n[0].toLowerCase()&&a.push(r[i].getDisplayName()+" §7["+n[1]+"§7]")}return t.addLabel(29,"§3ilość:",105,20,60,20),t.addTextField(5,125,22,30,15),t.addScroll(42,5,45,245,180,a),t.addTexturedButton(991,"§8Powrót",170,235,80,15,"customnpcs:textures/gui/pp_button.png"),e.showCustomGui(t),t}function gui11(t,r){var a=baseGui();a.addLabel(9,"§4Wpisz nazwę eliksiru",90,0,100,20);var i=r?getEliksir({nazwal:r}):getEliksir();if(i.error)return e.player.message("[§cDebugger§f] §7Error, pisz do administracji! "+error);i=i.result;for(var n=[],s=0;s<i.length;s++)n.push(i[s].nazwa);return a.addScroll(52,10,15,240,210,n),a.addTextField(7,90,235,70,15),a.addTexturedButton(998,"§bSzukaj po nazwie",5,235,80,15,"customnpcs:textures/gui/pp_button.png"),a.addTexturedButton(991,"§8Powrót",170,235,80,15,"customnpcs:textures/gui/pp_button.png"),t.showCustomGui(a),a}function gui12(e){var t=baseGui();t.addLabel(9,"§9Wybierz eliksir do inokreacji",70,0,160,20);for(var r=e.getInventory().getItems(),a=[],i=0;i<r.length;i++)if("§eTajemniczy Eliksir"==r[i].getDisplayName()){var n=r[i].getLore();n.length>=3&&a.push(n[0]+" §7§l/§r "+n[1]+" §7§l/§r "+n[2])}return t.addScroll(62,10,15,240,210,a),t.addTexturedButton(31,"§4Menu główne",90,230,80,15,"customnpcs:textures/gui/pp_button.png"),e.showCustomGui(t),t}function gui13(e,t){var r=baseGui(!0);if(t)r.addLabel(9,"§9Wpisz etykietę",95,0,100,20),r.addLabel(10,"§c[I]",5,10,100,20).setHoverText(["§7Aby dodać kolor:","§7wpisz & i opis koloru","§7Np. §a&a §7/ §6&6"]),r.addLabel(11,t,250,0,100,20),r.addTextField(19,70,80,120,20),r.addTexturedButton(20,"§2Dodaj etykietę",90,110,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(32,"§cUsuń etykietę",5,230,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(31,"§4Menu główne",170,230,80,15,"customnpcs:textures/gui/pp_button.png");else{r.addLabel(9,"§9Wybierz eliksir do Etykiety",80,0,100,20);for(var a=e.getInventory().getItems(),i=[],n=0;n<a.length;n++)if("§eTajemniczy Eliksir"==a[n].getDisplayName()){var s=a[n].getLore();s.length>=3&&i.push(n+". "+s[0]+" §7§l/§r "+s[1]+" §7§l/§r "+s[2])}r.addScroll(63,10,15,240,210,i),r.addTexturedButton(31,"§4Menu główne",90,230,80,15,"customnpcs:textures/gui/pp_button.png")}return e.showCustomGui(r),r}function customGuiSlot(e){try{if(!npc)return print("Nie znaleziono egzekującego bloku!");switch(e.slotId){case 0:if(e.stack.getDisplayName().indexOf("Tajemniczy eliksir:")>-1){var t=e.stack.getDisplayName().split(": ")[1],r=getZlane(t);if(r.error||!r.result[0])throw e.player.message("[§cDebugger§f] §7Error, pisz do administracji: "+r.error),r.error;r=r.result[0];var a=(n=npc.getStoreddata()).get("elki");return(a=JSON.parse(a)||{}).current=JSON.parse(r.json),n.put("elki",JSON.stringify(a)),gui3(e.player)}break;case 1:if(e.stack.getName().indexOf("book")>-1){var i=e.stack.getNbt();if(i.has("przepis"))try{var n,s=i.getList("przepis",i.getListType("przepis"));(s=Java.from(s)).unshift("§aPrzepis: "),s=s.join("\n§7◆ "),(n=npc.getStoreddata()).put("przepis",s),e.player.message("[§cDebugger§f] §7Załadowano przepis!")}catch(t){print(t),e.player.message("[§cDebugger§f] §7Nastąpił error: "+t)}}return}}catch(e){print("Slot error: "+e)}}function customGuiButton(e){try{if(!npc)throw"Nie znaleziono egzekującego bloku!";switch(e.buttonId){case 1:gui2(e.player);break;case 11:gui3(e.player);break;case 12:for(var t,r=e.player.getInventory(),a=0;a<9;a++){(c=r.getSlot(a)).getName().indexOf("writable_book")>-1&&(t=a)}if(t){var i=e.gui.getComponent(44);if(!i)return(d=e.gui.addTextField(44,0,260,256,20).setHoverText(["§7Podaj Nazwę przepisu","§7I kliknij przycisk ponownie!"])).setText("Przepis "+e.player.getDisplayName()),e.gui.update(e.player);var n=e.gui.getComponent(43).getList();if(i=(i=i.getText()).replace(/&/g,"§"),(c=r.getSlot(t))&&c.getName().indexOf("writable_book")>-1)c.setStackSize(c.getStackSize()-1),(c=e.player.world.createItem("minecraft:book",0,1)).setCustomName(i),c.setLore(["§7Specjalny przepis","§7Przygotowany przez: §7"+e.player.getDisplayName()]),c.getNbt().setList("przepis",n),(c=e.player.dropItem(c)).setOwner(e.player.getName());return e.player.message("[§cEliksiry§f] §7Zapisano przepis!")}return e.player.message("[§cEliksiry§f] §7Nie znaleziono zeszytu!");case 20:return!(u=e.gui.getComponent(19).getText())||u.length<=2?e.player.message("[§cEliksiry§f] §7Wpisz co najmniej 2 znaki!"):(u=u.replace(/&/g,"§"),(s=e.gui.getComponent(11).getText())?(o=e.player.getInventory().getItems()[s])&&-1!=o.getDisplayName().indexOf("Tajemniczy Eliksir")?o.getNbt().getString("Etykieta")?e.player.message("[§cEliksiry§f] §7Eliksir ma już etykietę!"):((p=Java.from(o.getLore())).push("",u),o.setLore(p),o.getNbt().setString("Etykieta",u),gui1(e.player),pisz(e.player,"Nakleił etykietę z eliksiru: "+u),e.player.message("[§cEliksiry§f] §7Zmieniono etykietę na: "+u)):e.player.message("[§cEliksiry§f] §7Nie znaleziono eliksiru!"):e.player.message("[§cEliksiry§f] §7Nie znaleziono id!"));case 31:gui1(e.player);break;case 32:var s,o,u,p;return(s=e.gui.getComponent(11).getText())?(o=e.player.getInventory().getItems()[s])&&-1!=o.getDisplayName().indexOf("Tajemniczy Eliksir")?(u=o.getNbt().getString("Etykieta"))?(a=(p=Java.from(o.getLore())).indexOf(u)-1)<=-1?e.player.message("[§cEliksiry§f] §7Nie znaleziono etykiety w lore!"):(p.splice(a,2),o.setLore(p),o.getNbt().remove("Etykieta"),pisz(e.player,"Usunął etykietę z eliksiru"),gui13(e.player),e.player.message("[§cEliksiry§f] §7Usunięto etykietę!")):e.player.message("[§cEliksiry§f] §7Eliksir nie ma etykiety!"):e.player.message("[§cEliksiry§f] §7Nie znaleziono eliksiru!"):e.player.message("[§cEliksiry§f] §7Nie znaleziono id!");case 41:gui12(e.player);break;case 42:gui13(e.player);break;case 55:var l=npc.getStoreddata();if((w=JSON.parse(l.get("elki"))).switch&&Date.now()-w.switch<5e3)return e.player.message("[§cEliksiry§f] §7Musisz zaczekać §a5 §7sekund za każdą zmianą!");var d=w.side;return w.side=w.current,w.current=d,w.switch=Date.now(),w.id||(w.id="Główny"),"Główny"==w.id?w.id="Dodatkowy":w.id="Główny",l.put("elki",JSON.stringify(w)),e.player.message("[§cEliksiry§f] §7Zmieniono kociołek na: §a"+w.id),pisz(e.player,"*Zmienił kociołek*");case 57:l=npc.getStoreddata();return(w=JSON.parse(l.get("elki"))||{}).side&&w.side.list.length>0?(w.current.price||(w.current.price=0),w.side.price||(w.side.price=0),w.current.price+=w.side.price,w.current.list.push("Przelej wywar z drugiego kociołka:\n- "+w.side.list.join("\n- ")),w.side={list:[],wait:0,temp:0,ignis:!1},l.put("elki",JSON.stringify(w)),pisz(e.player,"Przelał wywar z jednego kociołka do drugiego")):e.player.message("[§cEliksiry§f] §7w drugim kociołku nic nie ma!");case 101:gui6(e.player);break;case 102:gui7(e.player);break;case 103:gui8(e.player);break;case 104:var c,g=(100*Math.random()).toString(36).slice(0,13);(c=e.player.world.createItem("harvestcraft:blueberryjuiceitem",0,1)).setCustomName("§9Tajemniczy eliksir: "+g),c.setLore(["§7Przedmiot jest tymczasowy","§7Przechowuje on informacje o tworzonym eliksirze.","§7Możesz go wrzucić do kociołka aby dokończyć tworzenie!","§7Aby to zrobić kliknij w opcję: §2Dokończ eliksir","§7I daj item do slotu"]);var k=npc.getStoreddata().get("elki");if(!(k=JSON.parse(k)||{}).current||0==k.current.list.length)return e.player.message("[§cEliksiry§f] §7Nie masz czego zlewać!");var y=addZlane(g,escapeString(JSON.stringify(k.current)));if(y.error)return e.player.message("[§cDebugger§f] §7Error, pisz do administracji: "+y.error);pisz(e.player,"Zlał eliksir do butelki aby dokończyć go później"),k.current={list:[],wait:0,temp:0,ignis:!1},npc.getStoreddata().put("elki",JSON.stringify(k)),npc.getTimers().stop(1),e.player.giveItem(c);break;case 105:if((l=getOczekujace({gracz:e.player.getName(),weryfikowane:3,odebrane:0})).error)return e.player.message("[§cDebugger§f] Error, pisz do administracji: "+l.error);if((l=l.result).length>7)return e.player.message("[§cEliksiry§f] §7Możesz mieć tylko §c§l6§r§7 eliksirów na raz w tworzeniu!");var m=JSON.parse(npc.getStoreddata().get("elki"))||{};return m.current.list&&m.current.list.length<2?e.player.message("[§cEliksiry§f] §7Kociołek jest pusty!"):gui11(e.player);case 106:k=npc.getStoreddata().get("elki");if((k=JSON.parse(k)||{}).current.list&&0==k.current.list.length)return e.player.message("[§cEliksiry§f] §7Kociołek jest pusty!");k.current={name:"",list:[],wait:0,temp:0,ignis:!1},npc.getStoreddata().put("elki",JSON.stringify(k)),pisz(e.player,"Wylewa eliksir z kociołka"),e.player.message("[§cEliksiry§f] §7Wylano eliksir! Możesz zacząć tworzyć od nowa."),npc.getTimers().stop(1);break;case 111:return(l=npc.getStoreddata()).remove("przepis"),void e.player.message("[§cKociołek§f] §7Usunięto przepis!");case 201:case 202:if(!(d=handleAdd(e)))return;pisz(e.player,"Wlał jakiś płyn do kociołka §7["+d.ile+"ml]");break;case 203:if(!(d=handleAdd(e)))return;if(!temp(e,parseInt(parseFloat(d.ile))))return;pisz(e.player,"Zwiększył temperaturę w kociołku o §7"+d.ile+"°C");break;case 204:if(!(d=handleAdd(e)))return;if(!temp(e,-1*parseInt(parseFloat(d.ile))))return;pisz(e.player,"Zmniejszył temperaturę w kociołku o §7"+d.ile+"°C");break;case 205:if(1==(k=JSON.parse(npc.getStoreddata().get("elki"))||{}).current.ignis)return e.player.message("[§cKociołek§f] §7Nie możesz podwójnie rozpalić ogniska ;0");if(npc.getTimers().forceStart(1,90,!0),k.current.ignis=!0,npc.getStoreddata().put("elki",JSON.stringify(k)),!(d=handleAdd(e)))return;pisz(e.player,"Rozpalił palenisko pod kociołkiem");break;case 206:if(0==(k=JSON.parse(npc.getStoreddata().get("elki"))||{}).current.ignis)return e.player.message("[§cKociołek§f] §7Już jest zgaszone palenisko!");if(npc.getTimers().stop(1),temp(e,-1*k.current.temp),k.current.ignis=!1,npc.getStoreddata().put("elki",JSON.stringify(k)),!(d=handleAdd(e)))return;pisz(e.player,"Zgasił palenisko pod kociołkiem");break;case 207:if(!(d=handleAdd(e)))return;pisz(e.player,"Zamieszał w lewo §7"+d.ile+" razy");break;case 208:if(!(d=handleAdd(e)))return;pisz(e.player,"Zamieszał w prawo §7"+d.ile+" razy");break;case 209:if(!(d=handleAdd(e)))return;pisz(e.player,"Odstawił eliksir na §7"+d.ile+" minut "),setWait(d.ile);break;case 212:var z=e.gui.getComponent(211).getText();if(!z)return e.player.message("[§cKociołek§f] §7");addToList("AC: "+z,e.player),pisz(e.player,z);break;case 301:case 302:case 303:case 304:var f=e.gui.getComponent(e.buttonId).getLabel().replace(/§./g,"");gui7(e.player,f);break;case 305:gui10(e.player);break;case 401:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Zmiażdżył składnik");break;case 402:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Pociął składnik");break;case 403:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Naciął składnik");break;case 404:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Porwał składnik");break;case 405:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Pokruszył składnik");break;case 406:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Obrał składnik");break;case 407:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Przypalił składnik");break;case 408:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Wysuszył składnik");break;case 409:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Starł składnik");break;case 411:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Zmielił składnik");break;case 412:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Połamał składnik");break;case 413:if(!(d=handleSkladnik(e)))return;pisz(e.player,"Zanurzył na chwilę składnik i wyciągnął");break;case 410:var b=npc.getStoreddata(),w=b.get("elki");w=JSON.parse(w)||{};var x=e.gui.getComponent(29);if(!w.current.skladnik)return e.player.message("[§cEliksiry§f] §7Coś poszło nie tak!");if(Date.now()-w.current.wait<0)return pisz(e.player,"Niecierpliwy zrobił coś nie tak, a eliksir zaraz wybuchł mu przed nosem!"),w.current={list:[],wait:0,temp:0},npc.getTimers().stop(1),b.put("elki",JSON.stringify(w)),npc.world.playSoundAt(pos,"minecraft:entity.generic.explode",.5,.8),npc.world.spawnParticle("explode",pos.getX()+.5,pos.getY()+1.2,pos.getZ()+.5,.3,.4,.3,.05,40);var S=w.current.skladnik;d="Dodaj: "+S.name+" ["+S.ile+" "+S.jednostka+" "+S.akcje.join(", ")+"]";x||calculatePrice(e.player,S),addToList(d,e.player),pisz(e.player,"Dodał wcześniej przygotowany składnik do kociołka §c"+S.name),(w=JSON.parse(b.get("elki"))).current.skladnik={},b.put("elki",JSON.stringify(w)),npc.world.spawnParticle("splash",pos.getX()+.5,pos.getY()+1.2,pos.getZ()+.5,.2,.4,.2,.01,40),npc.world.playSoundAt(pos,"minecraft:entity.generic.splash",.3,1.5),gui3(e.player,!0,!0);break;case 991:gui3(e.player,!0,!0);break;case 998:f=e.gui.getComponent(7).getText();return gui11(e.player,f);case 999:f=e.gui.getComponent(7).getText();var T=e.gui.getComponent(10).getText().split("§5")[1];return gui7(e.player,T,f)}}catch(e){print("Button error: "+e)}}function timer(e){if(!npc)return print("Nie znaleziono egzekującego bloku!");switch(e.id){case 1:npc.world.spawnParticle("largesmoke",pos.getX()+.5,pos.getY()+2.2,pos.getZ()+.5,.1,.7,.1,.01,3)}}function customGuiScroll(e){try{if(!npc)throw"Nie znaleziono egzekującego bloku!";switch(e.scrollId){case 32:if(!e.doubleClick)return;n=(n=e.selection[0]).split("  [");var t=e.gui.getComponent(10).getText().split("§5")[1];if(!(i=parseFloat(e.gui.getComponent(5).getText()).toFixed(2))||i<=0||isNaN(i))return e.player.message("[§cEliksiry§f] §7Nie wpisano ile jednostki dodajesz! Wpisz ją i dopiero wtedy wybierz produkt.");n[1]=n[1].split("]")[0];var r={name:n[0],ile:i,jednostka:n[1],akcje:[],typ:t},a=(l=npc.getStoreddata()).get("elki");(a=JSON.parse(a)||{}).current&&(a.current.skladnik=r),l.put("elki",JSON.stringify(a)),gui9(e.player,r);break;case 42:var i;if(!(i=parseFloat(e.gui.getComponent(5).getText()))||i<=0||isNaN(i))return e.player.message("[§cEliksiry§f] §7Wpisz ile jednostek chcesz dodać!");var n,s=(n=e.selection[0]).split("[§c")[1].replace("]","");if(i>(n={name:n.split(" §7[")[0],ilosc:parseFloat(s),jednostka:s.split(parseFloat(s))[1]}).ilosc)return e.player.message("[§cEliksiry§f] §7Wpisałeś za dużą jednostkę. Składnik ma tylko: §b"+n.ilosc+n.jednostka);for(var o,u=e.player.getInventory().getItems(),p=0;p<u.length;p++){if(u[p].getDisplayName().indexOf(n.name)>-1)(N=u[p].getLore()).length>=2&&"§askładnik eliksiru"==N[0].toLowerCase()&&parseFloat(N[1].split("§c")[1])>=i&&(o=u[p],p=u.length)}if(!o)return e.player.message("[§cEliksiry§f] §7Nie znaleziono składnika!");if(!(o.getDisplayName().indexOf("§6Składnik Czasu")>-1)){if(i!=n.ilosc)(N=Java.from(o.getLore()))[1]="§c"+(n.ilosc-i)+n.jednostka,o.setLore(N);else i==n.ilosc&&o.setStackSize(o.getStackSize()-1);r={name:o.getDisplayName(),ile:i,jednostka:n.jednostka,akcje:[],typ:"eq"},a=(l=npc.getStoreddata()).get("elki");return(a=JSON.parse(a)||{}).current||(a.current={list:[],wait:0,temp:0}),a.current.skladnik=r,l.put("elki",JSON.stringify(a)),gui9(e.player,r)}var l=npc.getStoreddata();(a=JSON.parse(l.get("elki"))||{}).current.wait=0,l.put("elki",JSON.stringify(a)),e.player.message("[§cEliksiry§f] §7Użyto specjalnego itemu przyśpieszającego czas oczekiwania na eliksir!"),i!=n.ilosc?((N=Java.from(o.getLore()))[1]="§c"+(n.ilosc-i)+n.jednostka,o.setLore(N)):i==n.ilosc&&o.setStackSize(o.getStackSize()-1),gui3(e.player,!0,!0);break;case 43:if(!e.doubleClick)return;var d=e.selection[0];return e.gui.getComponent(11).setHoverText(d.split("\n")),e.gui.update(e.player);case 52:if(!e.doubleClick)return;var c=npc.getStoreddata();a=c.get("elki");a=JSON.parse(a)||{};var g=e.selection[0],k=c.get("kociolek"),y="";try{y=(y=(y=npc.executeCommand("dcdid "+e.player.getName())||"").replace("\n","").replace(/\s/g,""))||null}catch(t){e.player.message("[§cDebugger§f] §7Error przy pobieraniu discorda!")}if(a.current){if(a.current.list&&a.current.list.length>=2){var m=(100*Math.random()).toString(36).slice(0,13),z={gracz:e.player.getName(),uuid:e.player.getUUID(),nazwa:g,eliksir:a.current.list,cena:a.current.price||0};if(y){var f=getOczekujace({discord:y});if(f.error)return e.player.message("[§cDebugger§f] §7Error przy wydawaniu nagrody!");if(0==(f.result||[]).length||(f.result||[]).length%50==0){var b=e.player.world.createItem("variedcommodities:letter",0,3);b.setCustomName("§cPrzepustka do składziku"),b.setLore(["§7**Przepustka pozwala odebrać gotowy dowolny eliksir**"]),b.getNbt().setString("createdBy","Console"),e.player.dropItem(b).setOwner(e.player.getName()),e.player.sendNotification("Eliksiry","Pierwszy Eliksir!",2)}}var w=addOczekujace(m,escapeString(g),e.player.getName(),e.player.getUUID(),y,escapeString(JSON.stringify(a.current.list)),a.current.price,k);if(w.error)return e.player.message("[§cDebugger§f] §7Error, pisz do administracji: "+w.error);var x=z.gracz+" Wysłał eliksir do weryfikacji! kod: `"+m+"`, nazwa: *"+z.nazwa+"*, cena: *"+z.cena+"* knutów\nKociołek: "+(k||"Brak danych");return x=ang(x),HTTP.post("https://discordapp.com/api/webhooks/730401458813665312/hMvfOnZ4jye7K9G8jNegC-r34zydsUa7GKRo-k_odPrE1E136TVEcsfup1rI0MculmUa",{content:x,tts:!1}),a.current={list:[],wait:0,temp:0,ignis:!1},c.put("elki",JSON.stringify(a)),npc.getTimers().stop(1),gui1(e.player),void e.player.message("[§cEliksiry§f] §7Wysłano eliksir do weryfikacji! Pod ALT+G możesz sprawdzić status swoich eliksirów.")}return e.player.message("[§cEliksiry§f] §7Brakuje listy, lub za krótka!")}return e.player.message("[§cEliksiry§f] §7Nie znaleziono obecnego wywaru!");case 62:var S,T=e.selection[0];for(u=e.player.getInventory().getItems(),p=0;p<u.length;p++)if("§eTajemniczy Eliksir"==u[p].getDisplayName()){var N=u[p].getLore();T.indexOf(N[0])>-1&&T.indexOf(N[1])>-1&&T.indexOf(N[2])>-1&&(S=u[p],p=u.length)}if(!S)return e.player.message("[§cEliksiry§f] §7Nie znaleziono eliksiru!"),gui1(e.player);var j=S.getNbt().getString("Inokreacja"),v=S.getNbt().getLong("Data"),h=Date.now();if(h=parseInt((h-v)/864e5),e.player.message("[§cEliksiry§f] §7Wynik Inokreacji: §e**"+j+"**"),h>=0)e.player.message("§e**Nie widać żadnych plamek na pokrywie kociołka**");else{h*=-1;var O=Math.floor(Math.random()*h);h<=0&&e.player.message("§e**Na pokrywie kociołka nie widać żadnych plamek**"),O==h||0==O?e.player.message("§e**Na pokrywie kociołka widać "+h+" duże plamki**"):e.player.message("§e**Na pokrywie kociołka widać "+(h-O)+" duże plamki i "+O+" małe plamki**")}gui1(e.player);break;case 63:var L=e.selection[0].split(".")[0];return gui13(e.player,L)}}catch(e){print("Scroll error: "+e)}}function calculatePrice(e,t){var r=npc.getStoreddata(),a=r.get("elki"),i=getSkladnik({nazwa:t.name});if(i.error)return e.message("[§cDebugger§f] §7Error, napisz do administracji: "+i.error);if(i=i.result[0],!(a=JSON.parse(a)||{}).current)return!1;var n=a.current.price||0,s=Math.ceil(parseFloat(i.cena)/parseFloat(i.ilosc)*t.ile)||9999;return a.current.price=n+s,r.put("elki",JSON.stringify(a)),!0}function temp(e,t){var r=npc.getStoreddata(),a=r.get("elki");return 0==(a=JSON.parse(a)||{}).current.ignis?(e.player.message("[§cKociołek§f] §7Kociołek musi być rozpalony!"),!1):(a.current.temp+=t,r.put("elki",JSON.stringify(a)),e.gui.getComponent(156).setText("§3Aktualna temperatura: §b"+a.current.temp+" §3°C"),e.gui.update(e.player),!0)}function handleAdd(e){var t=npc.getStoreddata(),r=t.get("elki");r=JSON.parse(r)||{};var a=e.gui.getComponent(e.buttonId).getLabel();if(r.current&&(Date.now()-r.current.wait<0&&-1==a.indexOf("pokryw")))return pisz(e.player,"Niecierpliwy zrobił coś nie tak, a eliksir zaraz wybuchł mu przed nosem!"),r.current={list:[],wait:0,temp:0,ignis:!1},t.put("elki",JSON.stringify(r)),npc.getTimers().stop(1),!1;var i,n,s=a.split(a.slice(0,2))[1];return e.gui.getComponent(e.buttonId-50)&&e.gui.getComponent(e.buttonId-100)&&(i=e.gui.getComponent(e.buttonId-50).getText().split("§3")[1],n=parseFloat(e.gui.getComponent(e.buttonId-100).getText()),!s||!i||!n||isNaN(n)||n>999999999||n<=0)?(e.player.message("[§cEliksiry§f] §7Coś poszło nie tak! sprawdź czy wpisałeś dobrą wartość."),!1):s?a.indexOf("temperaturę")>-1&&0==r.current.ignis?i&&n?{ile:n,akcja:s,jednostka:i}:{akcja:s}:i&&n?(addToList(s+" ["+n+" "+i+"]",e.player),{ile:n,akcja:s,jednostka:i}):(addToList(s,e.player),{akcja:s}):e.player.message("[§cEliksiry§f] §7brak guzika!")}function handleSkladnik(e){var t=npc.getStoreddata(),r=t.get("elki");if((r=JSON.parse(r)||{}).current&&r.current.skladnik){var a=e.gui.getComponent(e.buttonId).getLabel().replace(/§./g,"");return!(r.current.skladnik.akcje.indexOf(a)>-1)&&(r.current.skladnik.akcje.push(a),t.put("elki",JSON.stringify(r)),gui9(e.player,r.current.skladnik),a)}return!1}function setWait(e){if(!e||e<=0||isNaN(e))return!1;var t=npc.getStoreddata(),r=t.get("elki");if((r=JSON.parse(r)||{}).current){var a=60*e*1e3,i=Date.now()+a;return r.current.wait=i,t.put("elki",JSON.stringify(r)),!0}return!1}function addToList(e,t){var r=npc.getStoreddata(),a=r.get("elki");return(a=JSON.parse(a)||{}).current.list&&(a.current.list.push(e),checkArray(a.current.list,e)&&(a.current={name:"",list:[],wait:0,ignis:!1},pisz(t,"Potknął się o powietrze i wylał zawartość kociołka"),npc.world.spawnParticle("explode",pos.getX()+.5,pos.getY()+1.2,pos.getZ()+.5,.1,.4,.1,.01,20),npc.world.playSoundAt(pos,"minecraft:entity.generic.explode",.5,.8))),r.put("elki",JSON.stringify(a))}function pisz(e,t){!function(e,t,r){t&&r&&(r.split(" ")[0].indexOf("/")>-1||e.executeCommand(e.getIWorlds()[0],"sudo "+t+" "+r))}(API,e.getName(),"me "+t)}function checkArray(e,t){for(var r=e.slice(e.length-5,e.length+5),a=0,i=0;i<r.length;i++)r[i]==t&&a++;return a>=5}function update(e){for(var t=npc.getTileEntityNBT(),r=t.getList("Scripts",t.getListType("Scripts"))[0],a=[],i=["kociolek.js","postreq.js","sql_main.js","str_mani.js","pass.js"],n=0;n<i.length;n++){var s=e.API.stringToNbt("{}");s.setString("Line",i[n]),a.push(s)}r.setList("ScriptList",a),t.setByte("ScriptEnabled",1),npc.world.getBlock(pos.getX(),pos.getY(),pos.getZ()).setTileEntityNBT(t),data.put("update",version)}