function baseGui(e){var a=e.API.createCustomGui(1,256,256,!1);return a.setBackgroundTexture("customnpcs:textures/gui/elki_e.png"),a}function interact(e){var a=e.player.getMainhandItem(),t=a.getLore();if(t.length>0&&t[0].indexOf("Składnik Eliksiru")>-1){var r=e.player.getTempdata(),i=r.get("wymiana");i=JSON.parse(i)||{};var n=a.getDisplayName().replace(/§./g,""),s=parseInt(parseFloat(t[1].split("§c")[1])),o=t[1].split(s)[1];return i[n]?i[n].ile+=s:i[n]={ile:s,war:o,itemName:a.getName()},r.put("wymiana",JSON.stringify(i)),a.setStackSize(a.getStackSize()-1),e.player.message("[§cZielarz§f] §7Dodano do wymiany: §c"+s+" "+n)}return menu(e)}function menu(e){var a=baseGui(e);return a.addLabel(9,"§1Sprzedawca składników",90,0,130,20),a.addTexturedButton(1,"§aKup składnik",90,80,80,15,"customnpcs:textures/gui/pp_button.png"),a.addTexturedButton(2,"§6Sprzedaj składnik",45,120,80,15,"customnpcs:textures/gui/pp_button.png"),a.addTexturedButton(5,"§6Wymień składnik",130,120,80,15,"customnpcs:textures/gui/pp_button.png"),a.addTexturedButton(3,"§dKoszyk",90,160,80,15,"customnpcs:textures/gui/pp_button.png"),e.player.showCustomGui(a),a}function sprzedaj(e,a){var t=baseGui(e);return t.addLabel(9,"§1Wybierz składnik",95,0,120,20),t.addScroll(3,8,25,240,200,a),e.player.showCustomGui(t),t}function confsprzedaj(e,a){var t=baseGui(e);t.addLabel(9,"§1Konfiguruj składnik",95,0,120,20);var r=getSkladnik({nazwa:a.nazwa});if(!r||r.error||0==r.result.length)return e.player.message(r.error?"[§cDebugger§f] §7Napotkałeś błąd: "+r.error:"[§cZielarz§f] §7Nie znaleziono składnika na liście!");var i=(r=r.result[0]).cena/r.ilosc*a.ilosc*.85;return t.addLabel(12,"§cSkładnik: §9"+a.nazwa,86,50,140,20),t.addLabel(13,"§cWartość za jednostkę: §9§l"+(r.cena/r.ilosc*.85).toFixed(2)+" §r§9knutów",40,70,160,20),t.addLabel(14,"§cCena składnika: §9§l"+i+" §r§9knutów",65,90,120,20),t.addTexturedButton(15,"§bZmień ilość",27,123,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTextField(16,120,120,60,20).setText(a.ilosc),t.addTexturedButton(21,"§aSprzedaj",5,235,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTexturedButton(2,"§dWybierz inny składnik",170,235,80,15,"customnpcs:textures/gui/pp_button.png"),e.player.showCustomGui(t),t}function wymien(e,a){for(var t=baseGui(e),r=[],i=Object.keys(a),n=0;n<i.length;n++)r.push("§a["+i[n]+"] §c"+a[i[n]].ile+" "+a[i[n]].war);return t.addLabel(9,"§1Wybierz składnik do wymiany",75,0,120,20),t.addScroll(5,8,25,240,200,r),e.player.showCustomGui(t),t}function kup(e,a){var t=baseGui(e);if(a){t.addLabel(9,"§1Wybierz składnik i wpisz ilość",85,0,120,20),t.addLabel(11,"§b"+a,10,17,120,20);var r=getSkladnik({typ:a});if(!r||r.error||0==r.result.length)return e.player.message("[§cDebugger§f] §7Napotkałeś błąd: "+r.error);r=r.result;for(var i=[],n=0;n<r.length;n++)0!=r[n].dostępny&&i.push("§e"+r[n].nazwa+" §7(§c"+r[n].cena+"k §7/ §c"+r[n].ilosc+r[n].jednostka+"§7)");i.sort(),t.addTextField(5,90,20,80,15),t.addScroll(1,8,45,240,200,i)}else t.addLabel(9,"§1Wybierz typ składnika",95,0,80,20),t.addTexturedButton(301,"§7Nieorganiczne",40,80,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTexturedButton(302,"§7Bazy wodne",130,80,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTexturedButton(303,"§7Roślinne",40,110,80,15,"customnpcs:textures/gui/pp_button.png"),t.addTexturedButton(304,"§7Zwierzęce",130,110,80,15,"customnpcs:textures/gui/pp_button.png");return e.player.showCustomGui(t),t}function guikoszyk(e,a,t){var r=baseGui(e);if(!a)return e.player.message("[§cZielarz§f] §7Nie znaleziono koszyka!"),menu(e);if(r.addLabel(9,"§1Twój koszyk",105,0,80,20),t)a[t]&&(r.addLabel(12,"§aProdukt: §9"+t,86,50,140,20),r.addLabel(13,"§aWartość za jednostkę: §9§l"+(a[t].cena/a[t].ilosc).toFixed(2)+" §r§9knutów",40,70,160,20),r.addLabel(14,"§aCena składnika: §9§l"+a[t].cena.toFixed(2)+" §r§9knutów",65,90,120,20),r.addTexturedButton(10,"§bZmień ilość",27,123,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTextField(11,120,120,60,20).setText(a[t].ilosc),r.addTexturedButton(20,"§cUsuń z koszyka",5,235,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(3,"§dKoszyk",170,235,80,15,"customnpcs:textures/gui/pp_button.png"));else{for(var i=0,n=Object.keys(a),s=0;s<n.length;s++)i+=a[n[s]].cena;r.addLabel(8,"§eCena: §c§l"+Math.ceil(i),8,10,80,20),r.addScroll(2,8,30,240,200,n),r.addTexturedButton(19,"§7Menu główne",5,235,80,15,"customnpcs:textures/gui/pp_button.png"),r.addTexturedButton(4,"§dZakup",170,235,80,15,"customnpcs:textures/gui/pp_button.png")}return e.player.showCustomGui(r),r}function customGuiButton(e){switch(e.buttonId){case 1:return kup(e);case 2:for(var a=[],t=e.player.getInventory().getItems(),r=0;r<9;r++){if(t[r].getLore().length>0&&"§askładnik eliksiru"==t[r].getLore()[0].toLowerCase())(z=t[r].getDisplayName().split("")).splice(0,2),z=z.join(""),a.push("§e"+z+" §7("+t[r].getLore()[1]+"§7)")}return sprzedaj(e,a);case 3:var i=(c=e.player.getTempdata()).get("koszyk");return guikoszyk(e,i=JSON.parse(i)||{});case 4:i=(c=e.player.getTempdata()).get("koszyk");i=JSON.parse(i)||{};var n=e.gui.getComponent(8).getText().split("§c§l")[1];if(n<=wallet(e.player.getName())){if(!requestPayment(e.player.getName(),n))return e.player.message("[§cZielarz§f] §7Coś poszło nie tak!");var s=Object.keys(i);if(0==s.length)return e.player.message("[§cZielarz§f] Brak przedmiotów w koszyku!");for(r=0;r<s.length;r++){(g=e.player.world.createItem(i[s[r]].item,0,1)).setCustomName("§c"+s[r]),g.setLore(["§aSkładnik Eliksiru","§c"+i[s[r]].ilosc+i[s[r]].jednostka]),g.getNbt().setInteger("HideFlags",37),e.player.giveItem(g);var o=e.player.getName()+" kupił: "+s[r]+" ("+i[s[r]].ilosc+i[s[r]].jednostka+") za **"+Math.ceil(i[s[r]].cena)+"** knutów";Math.ceil(i[s[r]].cena)>=1e4&&(o+="\n@everyone"),o=ang(o),HTTP.post(passes.hooks.zielarz,{content:o,tts:!1})}return e.player.updatePlayerInventory(),c.remove("koszyk"),e.player.message("[§cZielarz§f] §7Pomyślnie zakupiono składniki!"),menu(e)}return e.player.message("[§cZielarz§f] §7Nie masz wystarczająco pieniążków aby zakupić produkty!");case 5:a=e.player.getTempdata().get("wymiana");return wymien(e,a=JSON.parse(a)||{});case 10:var d=e.gui.getComponent(12).getText().split("§9")[1];if(!(p=parseInt(parseFloat(e.gui.getComponent(11).getText()))))return e.player.message("[§cZielarz§f] §7Podałeś nieodpowiednią liczbę!");if(p<=0||p>5e3)return e.player.message("[§cZielarz§f] §7Liczba powinna miścić się w przedziale (0;5000> !");i=(c=e.player.getTempdata()).get("koszyk");var l=(i=JSON.parse(i)||{})[d].cena/i[d].ilosc;return i[d].ilosc=p,i[d].cena=l*p,c.put("koszyk",JSON.stringify(i)),guikoszyk(e,i,d);case 15:var p;if(!(p=parseInt(parseFloat(e.gui.getComponent(16).getText())))||p<=0)return e.player.message("[§cZielarz§f] §7Niepoprawna ilość!");var u=(c=e.player.getTempdata()).get("sprzedaje");return(u=JSON.parse(u)||{}).ilosc=p,c.put("sprzedaje",JSON.stringify(u)),confsprzedaj(e,u);case 19:return menu(e);case 20:d=e.gui.getComponent(12).getText().split("§9")[1],i=(c=e.player.getTempdata()).get("koszyk");return delete(i=JSON.parse(i)||{})[d],c.put("koszyk",JSON.stringify(i)),guikoszyk(e,i);case 21:var c;u=(c=e.player.getTempdata()).get("sprzedaje");u=JSON.parse(u)||{};var g;for(t=e.player.getInventory().getItems(),r=0;r<9;r++){if(t[r].getDisplayName().indexOf(u.nazwa)>-1)if((y=t[r].getLore()).length>=2&&y[0].indexOf("Składnik Eliksiru")>-1){var k=parseInt(parseFloat(y[1].split("§c")[1]))*t[r].getStackSize(),m=y[1].split(k)[1];k>=u.ilosc&&(g=t[r])}}if(!g)return c.remove("sprzedaje"),e.player.message("[§cZielarz§f] §7Nie znaleziono przedmiotu sprzedawanego w ekwipunku!"),menu(e);k=parseInt(parseFloat(g.getLore()[1].split("§c")[1]));var f=g.getStackSize()*k;m=g.getLore()[1].split(k)[1];if(k-u.ilosc>0){var y=["§aSkładnik Eliksiru","§c"+(k-u.ilosc)+m];if(g.getStackSize()>1){var z=g.getDisplayName(),x=e.player.world.createItem(g.getName(),0,1);g.setStackSize(g.getStackSize()-1),x.setCustomName(z),x.setLore(y),(o=e.player.dropItem(x)).setOwner(e.player.getName()),g.setStackSize(g.getStackSize()-1)}else g.setLore(y)}else{if(k-u.ilosc==0)1==g.getStackSize()?g.setStackSize(0):g.setStackSize(g.getStackSize()-1);else if(1==k)w=f-u.ilosc,g.setStackSize(w);else{var w=(f-u.ilosc)/k,O=k-(Math.ceil(w)-w)*k;w=Math.floor(w);var b=e.player.world.createItem(g.getName(),0,1);b.setCustomName(g.getDisplayName()),b.setLore(["§aSkładnik Eliksiru","§c"+O+m]),(o=e.player.dropItem(b)).setOwner(e.player.getName()),g.setStackSize(w)}}var h=parseFloat(e.gui.getComponent(13).getText().split("§9§l")[1].split(" ")[0]);if(!h)return e.player.message("[§cZielarz§f] §7Niepoprawna jednostka wartościowa!");o=e.player.getName()+" Sprzedał "+u.nazwa+" ("+u.ilosc+m+") za **"+Math.floor(h*u.ilosc)+"** knutów";return Math.floor(h*u.ilosc)>=1e4&&(o+="\n@everyone"),o=ang(o),HTTP.post(passes.hooks.zielarz,{content:o,tts:!1}),payPlayer(e.player.getName(),Math.floor(h*u.ilosc)),menu(e);case 301:case 302:case 303:case 304:var v=e.gui.getComponent(e.buttonId).getLabel().split("§7")[1];return kup(e,v)}}function customGuiScroll(e){if(e.doubleClick)switch(e.scrollId){case 1:var a=parseInt(parseFloat(e.gui.getComponent(5).getText())),t=e.gui.getComponent(11).getText().split("§b")[1];if(!a||isNaN(a))return e.player.message("[§cZielarz§f] §7Nie podałeś ilości!");if(a>5e3||a<=0)return e.player.message("[§cZielarz§f] §7Ilość musi być z przedziału (0;5000>!");if(!(c=getItemName(t,e.selection[0].toLowerCase())))return e.player.message("[§cZielarz§f] Nie udało się pobrać itemu składnika!");var r=e.selection[0].split("§e")[1].split(" §7")[0],i=getSkladnik({nazwa:r});if(!i||i.error||0==i.result.length)return e.player.message("[§cDebugger§f] §7Coś poszło nie tak: "+i.error);var n=(i=i.result[0]).cena/i.ilosc*a,s=(d=e.player.getTempdata()).get("koszyk");return(s=JSON.parse(s)||{})[r]={ilosc:a,cena:n,item:c,jednostka:i.jednostka},d.put("koszyk",JSON.stringify(s)),e.player.message("[§cZielarz§f] §7Dodano do koszyka  §b"+r+" §c"+a+i.jednostka),guikoszyk(e,s);case 2:r=e.selection[0],s=(d=e.player.getTempdata()).get("koszyk");return guikoszyk(e,s=JSON.parse(s)||{},r);case 3:r=e.selection[0].split("§e")[1].split(" §7")[0];var o=e.selection[0].split("§e")[1].split(" §7(§c")[1];if(o=o.replace("§7)",""),!(a=parseInt(parseFloat(o))))return e.player.message("[§cZielarz§f] §7Coś poszło nie tak!");var d,l=o.split(a)[1],p=(d=e.player.getTempdata()).get("sprzedaje");return(p=JSON.parse(p)||{}).nazwa=r,p.ilosc=a,p.jednostka=l,d.put("sprzedaje",JSON.stringify(p)),confsprzedaj(e,p);case 5:var u=e.selection[0].match(/\[.*.\]/gi)||[];if(!u||0==u.length)return e.player.message("[§cDebugger§f] §7Nie znaleziono wyboru!");u=u[0].replace("[","").replace("]","");var c,g=e.player.getTempdata(),k=g.get("wymiana");return(k=JSON.parse(k)||{})[u]?((c=e.player.world.createItem(k[u].itemName,0,1)).setCustomName("§c"+u),c.setLore(["§aSkładnik Eliksiru","§c"+k[u].ile+k[u].war]),e.player.dropItem(c).setOwner(e.player.getName()),delete k[u],g.put("wymiana",JSON.stringify(k)),e.player.message("[§cZielarz§f] §7Wymieniono Składnik!")):e.player.message("[§cDebugger§f] §7Nie znaleziono składnika na liście!")}}function getItemName(a,t){var r;if("Zwierzęce"==a)t.indexOf("krew")>-1&&(r="harvestcraft:cherryjuiceitem"),t.indexOf("ośmiornica")>-1&&(r="harvestcraft:calamariraw"),t.indexOf("nietoperz")>-1&&(r="minecraft:flint"),t.indexOf("bezoar")>-1&&(r="minecraft:golden_apple"),t.indexOf("płetwa")>-1&&(r="harvestcraft:musselrawitem"),t.indexOf("róg")>-1&&(r="bewitchment:hellhound_horn"),t.indexOf("ucho")>-1&&(r="variedcommodities:severed_ear"),t.indexOf("serc")>-1&&(r="bewitchment:heart"),(t.indexOf("kręgosłup")>-1||t.indexOf("kość")>-1)&&(r="variedcommodities:skull"),(t.indexOf("miód")>-1||t.indexOf("mocz")>-1)&&(r="harvestcraft:applejuiceitem"),(t.indexOf("noga")>-1||t.indexOf("odnoże")>-1)&&(r="bewitchment:lizard_leg"),(t.indexOf("oko")>-1||t.indexOf("oczy")>-1)&&(r="minecraft:spider_eye"),(t.indexOf("język")>-1||t.indexOf("jęzor")>-1)&&(r="bewitchment:tongue_of_dog"),(t.indexOf("pióro")>-1||t.indexOf("skrzydło")>-1)&&(r="minecraft:feather"),(t.indexOf("sproszkowan")>-1||t.indexOf("suszon")>-1)&&(r="minecraft:firework_charge"),(t.indexOf("igła")>-1||t.indexOf("dziób")>-1||t.indexOf("kieł")>-1||t.indexOf("kolec")>-1||t.indexOf("żądło")>-1)&&(r="harvestcraft:shrimpcookeditem"),(t.indexOf("jad")>-1||t.indexOf("łza")>-1||t.indexOf("śluz")>-1)&&(r="harvestcraft:blueberryjuiceitem"),(t.indexOf("jajko")>-1||t.indexOf("jajo")>-1||t.indexOf("jajeczko")>-1)&&(r="minecraft:egg"),(t.indexOf("pancerz")>-1||t.indexOf("skorupa")>-1||t.indexOf("łuska")>-1)&&(r="minecraft:shulker_shell"),(t.indexOf("włos")>-1||t.indexOf("futro")>-1||t.indexOf("skóra")>-1)&&(r="minecraft:rabbit_hide"),r||(r="minecraft:rotten_flesh");else if("Roślinne"==a)t.indexOf("korzeń")>-1&&(r="harvestcraft:ediblerootitem"),(t.indexOf("kwiat")>-1||t.indexOf("płatek")>-1)&&(r="minecraft:red_flower"),(t.indexOf("kora")>-1||t.indexOf("kory")>-1)&&(r="harvestcraft:vanillaitem"),(t.indexOf("liść")>-1||t.indexOf("listki")>-1||t.indexOf("liście")>-1)&&(r="harvestcraft:tealeafitem"),(t.indexOf("ropa")>-1||t.indexOf("sok")>-1||t.indexOf("oliwa")>-1||t.indexOf("olej")>-1||t.indexOf("wywar")>-1||t.indexOf("wyciąg")>-1)&&(r="harvestcraft:papayajuiceitem"),(t.indexOf("nasiona")>-1||t.indexOf("pestki")>-1||t.indexOf("słonecznik")>-1||t.indexOf("ziarna")>-1)&&(r="minecraft:wheat_seeds"),(t.indexOf("sproszkowan")>-1||t.indexOf("suszon")>-1||t.indexOf("cukier")>-1)&&(r="harvestcraft:flouritem"),r||(r="minecraft:tallgrass");else if("Nieorganiczne"==a)t.indexOf("srebro")>-1&&(r="bewitchment:silver_ingot"),t.indexOf("złoto")>-1&&(r="minecraft:gold_ingot"),t.indexOf("rtęć")>-1&&(r="bewitchment:heaven_extract"),t.indexOf("sztuczny składnik")>-1&&(r="minecraft:end_crystal"),t.indexOf("kryształ")>-1&&(r="variedcommodities:crystal"),t.indexOf("saargo")>-1&&(r="variedcommodities:coin_stone"),(t.indexOf("sól")>-1||t.indexOf("skruszon")>-1)&&(r="harvestcraft:saltitem"),r||(r="minecraft:magma_cream");else{if("Bazy wodne"!=a)return e.player.message("[§cZielarz§f] §7Niepoprawna kategoria"),null;r||(r="minecraft:potion")}return r}