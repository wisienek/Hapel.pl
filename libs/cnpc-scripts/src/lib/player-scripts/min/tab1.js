var API=Java.type("noppes.npcs.api.NpcAPI").Instance(),miotly=["Kometa250","SpadającaGwiazda","Wiciosztych90","Zamiataczka350","DębowyGrom79","BłękitnaButla","Nimbus2000","Nimbus2001","Nimbus2020","Błyskawica","ŚwietlistaSmuga"];function interact(e){try{var a=e.player.getMainhandItem();if(e.player.isSneaking())if(e.player.getAllRiders().length>0)return e.player.clearRiders();if(1==e.type&&"§7Czekoladowa Żaba"==e.target.getName()){e.target.kill();var t=e.player.world.getStoreddata().get("karty");return t=JSON.parse(t)||{},0==Object.keys(t).length?e.player.message("[§cDebuger§f] §7Nie znaleziono kart!"):(karta(e,t),sudo(e.API,e.player.getName(),"me Łapie żabę wraz z kartą czarodziejów"))}if(!a||a.getName().toLowerCase().indexOf("air")>-1)return;if(a.getName().indexOf("hapeladdons:czapka")>-1||a.getName().indexOf("czaszka")>-1||a.getName().indexOf("dynia")>-1||a.getName().indexOf("tiara")>-1){if(e.player.isSneaking())return;var r=e.player.getArmor(3);return e.player.setArmor(3,a),void e.player.setMainhandItem(r)}if(a.getName().indexOf("kartaczarodziei")>-1){if(!(M=a.getNbt()).has("owner"))if((Y=Java.from(a.getLore()))[1]){var i=parseInt(Y[1].split("§f")[1]);if(!(i="id="+i||null))return;var s="uuid="+e.player.getUUID(),n="name="+e.player.getName(),o="dname="+e.player.getDisplayName().replace(/§./g,""),l=getDiscord(e.API,e.player.getName()),p="?"+i+"&"+s+"&"+n+"&"+o+((l="discord="+l||null)?"&"+l:"");try{(r=HTTP.post("http://hapel-ic.pl/api/karty/moje"+p,{})).wyslane&&M.setString("owner",e.player.getName())}catch(e){print("interact erorr: "+e)}}}else{if("minecraft:spawn_egg"==a.getName()&&"§7Czekoladowa Żaba"==a.getDisplayName()){e.setCanceled(!0);var g=new(Java.type("com.bewitchment.common.entity.living.EntityToad"))(e.player.world.getMCWorld());return g.func_70107_b(e.player.getX(),e.player.getY(),e.player.getZ()),g.func_96094_a("§7Czekoladowa Żaba"),e.player.world.getMCWorld().func_72838_d(g),a.setStackSize(a.getStackSize()-1)}if("§cWalizka"==a.getDisplayName())return e.player.message("[§cAdmin§f] §7Niedługo zostanie zmienione!");if(a.getDisplayName().indexOf("Kamień duszy Sprzedawcy")>-1){e.setCanceled(!0);var c=e.player.getPos();return(x=e.player.world.spawnClone(c.getX(),c.getY(),c.getZ(),9,"Sprzedawca").getStoreddata()).put("owner",e.player.getName()),e.player.message("[§cNPC§f] §7Postawiono sprzedawcę!"),a.setStackSize(a.getStackSize()-1)}if(a.getDisplayName().indexOf("Skrystalizowany sprzedawca")>-1){e.setCanceled(!0);if(!(n=a.getLore()[2]))return e.player.message("[§cNPC§f] §7Nie znaleziono duszy w przedmiocie!");c=e.player.getPos();return e.API.clones.spawn(c.getX(),c.getY(),c.getZ(),7,n,e.player.world),a.setStackSize(a.getStackSize()-1),e.player.message("[§cNPC§f] §7Uwolniono duszę sprzedawcy!")}if(a.getDisplayName().indexOf("Limitowana figurka")>-1){if(!(n=a.getDisplayName().split("figurka §b")[1]))return e.player.message("[§cFigurka§f] §7Niepoprawna nazwa figurki!");if((M=a.getNbt()).getInteger("Żywa")){var y,m;if(!(h=M.getString("figurka")))return e.player.message("[§cFigurka§f] §7Nie znaleziono id figurki!");if(1==e.type&&e.target.getName().indexOf(n)>-1)return(y=e.target.getNbt()).getString("master")==e.player.getUUID()||y.getString("master_name")==e.player.getName()?(e.target.despawn(),M.setInteger("Żywa",0),e.player.message("[§cFigurka§f] §7Figurka powróciła do oryginalnego stanu!")):e.player.message("[§cFigurka§f] §7To nie twoja figurka!");if(!(m=e.player.world.getEntity(h)))return M.setInteger("Żywa",0),e.player.message("[§cFigurka§f] §7Błąd, skasowana figurka, resetowano item.");r=parseInt(m.getX());var d=parseInt(m.getY()),k=parseInt(m.getZ());return 0==r&&0==d&&0==k?(m.despawn(),M.setInteger("Żywa",0),e.player.message("[§cFigurka§f] §7Błąd, npc wywalony w kosmos, resetowano item.")):e.player.message("[§cFigurka§f] §7Twoja figurka znajduje się na: §e"+parseInt(m.getX())+" | "+parseInt(m.getY())+" | "+parseInt(m.getZ()))}return(y=(m=e.API.getClones().get(6,n,e.player.world)).getNbt()).setString("master",e.player.getUUID()),y.setString("master_name",e.player.getName()),m.setPosition(e.player.getX(),e.player.getY(),e.player.getZ()),m.spawn(),M.setInteger("Żywa",1),M.setString("figurka",m.getUUID()),e.player.message("[§cFigurka§f] §7Figurka została ożywiona!")}if(a.getDisplayName().indexOf("Plecak.")>-1){var w=e.player.getTempdata().get("plecakO");if(w&&!Permission.has(e.player.getName(),"litebans.ban")){w=parseInt(w);if(Date.now()-w<15e3)return e.player.message("[§cPlecak§f] §7Możesz otwierać plecak co: §c15§7 sekund!")}var u=e.player.getTempdata().get("plecak");if((Y=a.getLore()).length>=2&&!Permission.has(e.player.getName(),"litebans.ban")&&e.player.getUUID()!=Y[1].replace(/§./g,""))return e.player.message("[§cPlecak§f] §7Tylko dla właściciela!");if(u)return e.player.message("[§cPlecak§f] §7Masz niezapisany plecak, szybko zrób §lRelog!");if(e.player.isSneaking()){var f=e.API.createCustomGui(1,256,256,!1);return f.addLabel(6,"§2Plecak numer: §e"+Y[0].replace(/§./g,""),100,75,90,15),f.addTextField(2,70,90,120,15),f.addLabel(5,"§2§l?",195,90,5,15).setHoverText(["§cPomoc","§7Aby wpisać kolor lub inne specjalne kodowanie","§7Daj znak §l&§r§7 i potem znak kodu np. kolor §55"]),f.addButton(3,"§cNazwij Plecak",90,110,80,20),(x=(M=a.getNbt()).getLong("data"))?(x=parseInt(x),x=(x=new Date(x)).toDateString()):x="Brak kopii!",f.addButton(4,"§aStwórz kopię",90,200,80,20).setHoverText(["§cInfo","§7Raz dziennie możesz zapisać plecak","§7Pozwala to na późniejsze przywrócenie","§7W razie kłopotów","§7Ostatnia kopia: §a"+x]),f.addTextField(11,70,140,120,15).setHoverText(["§cInfo","§7Wpisz tutaj dokładny nick gracza","§7Aby przekazać mu prawa do plecaka."]),f.addButton(10,"§7Zmień prawa",90,160,80,20).setHoverText(["§cInfo","§7Wpisz powyżej dokładny nick gracza","§7Aby przekazać mu prawa do plecaka."]),e.player.showCustomGui(f)}if(e.player.world.getAllPlayers().length>50&&!Permission.has(e.player.getName(),"litebans.ban"))return e.player.message("[§cPlecak§f] §7Nie możesz używać plecaka kiedy jest >50 graczy!");if(0!=e.type)return e.player.message("[§cPlecak§f] §7Aby otworzyć plecak musisz patrzeć w powietrze!");var z,N,S=Java.type("net.minecraft.inventory.InventoryBasic"),v=Java.type("net.minecraft.item.ItemStack"),P=Java.type("net.minecraft.nbt.JsonToNBT"),D=e.player.MCEntity,I=e.player.getStoreddata();if(!z){if(0==Y.length){N=getTop()+1,saveBag(e.player.getUUID(),e.player.getName(),JSON.stringify([]),N);r="**"+e.player.getName()+"** Zainicjował "+a.getDisplayName().split(" ")[0]+" plecak z numerem: **"+N+"**";return r=ang(r),HTTP.post(passes.hooks.mainLog,{content:r,tts:!1}),a.setLore(["§0"+N,"§0"+e.player.getUUID()]),e.player.message("[§cPlecak§f] §7Wpisano plecak do bazy.")}1==Y.length&&(Y=[Y[0],"§0"+e.player.getUUID()],a.setLore(Y),e.player.message("[§cPlecak§f] §7Ustawiono plecak jako własny")),N=Y[0].split("§0")[1],I.put("plecak",N);var h=Y[0].split("§0")[1];if(!(u=getBag(h)))return print(e.player.getName()+" / Nie znaleziono plecaka!"),e.player.message("[§cError§f] §7Nie znaleziono plecaka! Pisz do administracji!");if(!u.nazwa||!u.uuid)updateName(u.id,e.player.getName(),e.player.getUUID())?e.player.message("[§cPleak§f] §7Zapisano w bazie nazwę!"):e.player.message("[§cPleak§f] §7Nie udało się zapisać w bazie nazwy i UID.");if(!(Y[1].indexOf(e.player.getUUID())>-1||Permission.has(e.player.getName(),"litebans.ban")))return e.player.message("[§cPlecak§f] §7Nie możesz otwierać czyjegoś plecaka!");z="§cŚredni"==a.getDisplayName().split(" ")[0]?new S("§4Średni Plecak §e"+a.getLore()[0].split("§0")[1],!0,27):"§cDuży"==a.getDisplayName().split(" ")[0]?new S("§4Duży Plecak §e"+a.getLore()[0].split("§0")[1],!0,36):"§cMagiczny"==a.getDisplayName().split(" ")[0]?new S("§6Magiczny Plecak §e"+a.getLore()[0].split("§0")[1],!0,54):new S("§4Mały Plecak §e"+a.getLore()[0].split("§0")[1],!0,18),u.itemy=JSON.parse(u.itemy);for(r=0;r<u.itemy.length;r++)try{var b=new v(P.func_180713_a(u.itemy[r][1]));z.func_70299_a(u.itemy[r][0],b)}catch(e){print(e)}}try{z&&D.func_71007_a(z)}catch(a){e.player.message("§c"+a)}return void e.player.getTempdata().put("plecakO",Date.now())}if(a.getDisplayName().indexOf("§cWizytówka ")>-1){var T=a.getDisplayName().split("§cWizytówka ")[1];if(!T)return;T=T.replace("[","").replace("]","");var O=e.player.world.getStoreddata().get("wizytówki");if(a.setStackSize(a.getStackSize()-1),e.player.message("[§cWizytówka§f] §e**Wizytówka po zgięciu i nagraniu wiadomości poleciała przed ciebie i po chwili §ezniknęła**"),e.player.message("[§cWizytówka§f] §7Napisz akcję nagrywania wiadomości na chacie lub /s i zapisz SS, ten wyślij §7właścicielowi wizytówki"),O){if((O=JSON.parse(O))[T]&&O[T].length>1){r="**Pojawiła się nowa wizytówka od: **"+e.player.getName()+"**!**";r=ang(r),HTTP.post(O[T][1],{content:r,tts:!1}),O[T][0]+=1}}else(O={})[T]=[1];return e.player.world.getStoreddata().put("wizytówki",JSON.stringify(O))}if(a.getDisplayName().indexOf("§eTajemniczy Eliksir")>-1){var L=(M=a.getNbt()).getString("Eliksir"),j=M.getString("Czas"),x=M.getLong("Data");return sudo(e.API,e.player.getName(),"me Użył eliksiru §c"+L),Date.now()>x?sudo(e.API,e.player.getName(),"do Eliksir był przeterminowany!"):(isNaN(parseFloat(j))?"Trwały"==j&&sudo(e.API,e.player.getName(),"do Eliksir ma trwały efekt"):(sudo(e.API,e.player.getName(),"do Eliksir będzie trwał przez: "+j+" minut"),j=new Date(j).toDateString()),sudoOP(e.API,"dcdpm "+e.player.getName()+" użyto eliksir **"+L+"**. Efekt trwa: **"+j+"** ")),a.setStackSize(a.getStackSize()-1)}if(a.getDisplayName().toLowerCase().indexOf("paczka kart czarodziejów")>-1){var C,U=(M=a.getNbt()).getString("wersja");if(!U)return e.player.message("[§cDebuger§f] §7Nie znaleziono wersji paczki!");switch(U){case"duża":C=8;break;case"średnia":C=5;break;case"mała":C=3;break;default:C=2}t=e.player.world.getStoreddata().get("karty");if(t=JSON.parse(t)||{},0==Object.keys(t).length)return e.player.message("[§cDebuger§f] §7Nie znaleziono kart!");for(var E=0;E<C;E++)karta(e,t);return a.setStackSize(a.getStackSize()-1),"Przesladowca"!=e.player.getName()&&sudo(e.API,e.player.getName(),"me Otwiera: "+U+" paczka kart czarodziejów"),e.player.message("[§cKarty§f] §7Otworzno paczkę kart czarodziejów!")}if(a.getDisplayName().indexOf("kociołek rozmiar ")>-1){if(e.player.isSneaking()){if(e.setCanceled(!0),2==e.type){if("minecraft:cauldron"==e.target.getName()){e.setCanceled(!0);c=e.target.getPos();var M=(E=e.target.setBlock("customnpcs:npcscripted")).getTileEntityNBT();try{var A=e.API.stringToNbt("{}");A.setString("Script",""),A.setList("Console",[]),M.setList("Scripts",[A]);var R=M.getList("Scripts",M.getListType("Scripts"))[0],_=[],J=["kociolek.js","postreq.js","sql_main.js","str_mani.js"];for(E=0;E<J.length;E++){var B=e.API.stringToNbt("{}");B.setString("Line",J[E]),_.push(B)}R.setList("ScriptList",_),M.setByte("ScriptEnabled",1),e.player.world.getBlock(c.getX(),c.getY(),c.getZ()).setTileEntityNBT(M),a.setStackSize(a.getStackSize()-1),e.player.world.getBlock(c.getX(),c.getY(),c.getZ()).getStoreddata().put("kociolek",a.getDisplayName().replace(/§./g,""))}catch(a){e.player.message("§cError: §r"+a)}r="Gracz **"+e.player.getName()+"** Postawił kociołek w: **"+c.getX()+" "+c.getY()+" "+c.getZ()+"**";return r=ang(r),HTTP.post(passes.hooks.mainLog,{content:r,tts:!1}),e.player.message("[§cKociołek§f] §7Konwertowano na używalny kociołek!")}return e.player.message("[§cKociołek§f] §7Kliknij itemkiem na postawiony kociołek!")}return e.player.message("[§cKociołek§f] §7Kliknij itemkiem na postawiony kociołek!")}}else if(miotly.indexOf(a.getDisplayName().split(" ").join("").split("§f")[1])>-1){if("variedcommodities:broken_arrow"==a.getName())return;var H,Y=a.getLore(),W=996,Z=!1,F=[];for(r=0;r<Y.length;r++)if(F.push(Y[r]),(Y[r].toLowerCase().indexOf("oryginalności")>-1||Y[r].toLowerCase().indexOf("oryginalnosci")>-1)&&(Z=!0),Y[r].toLowerCase().indexOf("niezniszczalności")>-1&&(W+=4),Y[r].toLowerCase().indexOf("wytrzymałość: ")>-1&&(H=r),Y[r].indexOf("Przegląd dnia")>-1){var K=Y[r].split("dnia ")[1];K.indexOf("§f")>-1&&(K=K.split("§f")[1].split("."));var G=new Date(K[2],K[1],K[0]),V=new Date(Date.now());(G.getTime()-V.getTime())/864e5<=30?W+=4:W-=15}if(!H&&0!=H){var X=(O=e.player.world.getStoreddata()).get("miotly_wyt");X=JSON.parse(X)||{};var Q=5;return X&&X[a.getName()]&&(Q=X[a.getName()].wytrzymalosc),F.push("§cWytrzymałość: "+Q),a.setLore(F),e.player.message("[§cMiotła§f] §7Ustawiono wytrzymałość!")}if(0==Z&&(W-=200),1e3==W)return;if(Math.floor(1e3*Math.random())>W&&H){if(0==(X=Number(F[H].split(" ")[1]))){print(e.player.getName()+" szansa: "+W);var q=e.player.world.createItem("variedcommodities:broken_arrow",0,1);(F=Java.from(Y)).push("§7**Miotła jest niezdatna do lotu**"),q.setCustomName(a.getDisplayName()),q.setLore(F),a.setStackSize(0),e.player.giveItem(q);r="Gracz **"+e.player.getName()+"** Zniszczył swoją miotłę: **"+a.getDisplayName()+"**, szansa: "+(999-W)/10+"% !";return r=ang(r),HTTP.post(passes.hooks.mainLog,{content:r,tts:!1}),e.player.message("[§cMiotła§f] §7Twoja miotła uległa zniszczeniu! Spotkaj się z pracownikiem DTM aby ją naprawić.")}return X--,F[H]=F[H].split(" ")[0]+" "+X,a.setLore(F),e.player.message("[§cMiotła§f] §7Wytrzymałość twojej miotły spadła!")}}}}catch(e){print("Error interact: "+e)}}function login(e){try{var a=e.player.getStoreddata();if(!a.has("dc")){var t=npc.executeCommand("dcdid "+e.player.getName());if((t=(t=t.replace("\n","").replace(/\s/g,""))||null)&&t.length>0){var r=sqlGet("SELECT * FROM discords WHERE dcdid='"+t+"'; ");if(r.error)throw r.error;var i={id:t,players:{}};if(i.players[e.player.getName()]={uuid:e.player.getUUID(),displayName:e.player.getDisplayName()},r.result.length>0){var s=JSON.parse(r.result[0].data);if(s[e.player.getName()])return;if(s[e.player.getName()]=i[e.player.getName()],(n=sqlPut("UPDATE discords SET data='"+JSON.stringify(s)+"' WHERE serial="+r.result[0].serial)).error)throw n.error}else{var n;if((n=sqlPut("INSERT INTO discords(dcdid, data) VALUES ('"+i.id+"','"+JSON.stringify(i.players)+"');")).error)throw n.error}return a.put("dc",1)}}}catch(e){print("Login error: "+e)}}function logout(e){try{var a="uuid="+e.player.getUUID(),t="name="+e.player.getName(),r="dname="+e.player.getDisplayName().replace(/§./g,""),i=getDiscord(e.API,e.player.getName()),s="?"+a+"&"+t+"&"+r+((i=i.indexOf("help")>-1||!i?null:"discord="+i)?"&"+i:"");HTTP.post("http://hapel-ic.pl/api/users/game"+s,{}),i&&HTTP.post("http://hapel-ic.pl/api/users/sync?"+i+"&"+a,{})}catch(e){print("Logout error: "+e)}}function toss(e){try{var a=e.item,t=a.getDisplayName(),r=e.player.rayTraceEntities(10,!0,!1);if(miotly.indexOf(t.split(" ").join("").split("§f")[1])>-1||t.toLowerCase().indexOf("knut")>-1||t.toLowerCase().indexOf("sykl")>-1||t.toLowerCase().indexOf("galeon")>-1||t.toLowerCase().indexOf("różdżka")>-1)if(!e.player.getTempdata().get("confirmThrow"))return e.player.message("[§cHelper§f] §7Aby wyrzucić item kliknij przycisk ponownie!"),e.player.getTempdata().put("confirmThrow","1"),e.player.getTimers().forceStart(1,100,!1),e.setCanceled(!0),e.player.dropItem(a).setOwner(e.player.getName());if(r.length>0&&1==r[0].getType()){if(e.item.getDisplayName().indexOf("Plecak.")>-1){var i=e.player.getStoreddata().get("plecak");if(i){var s=e.item.getLore();if(s.length>0&&s[0].replace(/§./g,"")==i)return e.setCanceled(!0),e.player.giveItem(e.item),e.player.message("[§cPlecak§f] §7Nie możesz wyrzucić otwartego plecaka!")}}var n=1;e.player.isSneaking()&&(n=e.item.getStackSize()),e.setCanceled(!0);var o=e.player.world.createItemFromNbt(a.getItemNbt()),l=r[0];o.setStackSize(n),l.dropItem(o).setOwner(l.getName()),e.player.message("[§cHelper§f] §7Wyrzucono item ("+o.getDisplayName()+"§7) dla: §b"+l.getName()),a.setStackSize(a.getStackSize()-n)}}catch(e){print("Toss Error: "+e)}}function timer(e){switch(e.id){case 1:return void e.player.getTempdata().remove("confirmThrow")}}function getEmpty(e){var a=e.getRole();if(1==a.getType())for(var t=0;t<=17;t++){if(a.getSold(t).getName().indexOf("air")>-1)return t}return!1}function karta(e,a){try{var t,r=Math.floor(1e3*Math.random());r>=985?t="legendary":r<985&&r>=935?t="rare":r<935&&r>=835?t="ancient":r<835&&r>=500?t="uncommon":r<500&&(t="common");var i=Math.floor(Math.random()*a[t].length),s=e.player.world.createItem("hapeladdons:kartaczarodziei_"+t,0,1);s.setCustomName("§cKarta Czarodziejów §b"+a[t][i].name);var n=["§aRzadkość: §d"+t,"§aNumer: §f"+a[t][i].numer].concat(a[t][i].opis);s.setLore(n);var o=s.getNbt();o.setInteger("id",a[t][i].numer),o.setString("rarity",t);var l="id="+a[t][i].numer,p="uuid="+e.player.getUUID(),g="name="+e.player.getName(),c="dname="+e.player.getDisplayName().replace(/§./g,""),y=getDiscord(e.API,e.player.getName()),m="?"+l+"&"+p+"&"+g+"&"+c+((y=y.indexOf("help")>-1||!y?null:"discord="+y)?"&"+y:"");HTTP.post("http://hapel-ic.pl/api/users/game"+m,{}).wyslane&&o.setString("owner",e.player.getName())}catch(e){print("karta error: "+e)}return e.player.dropItem(s).setOwner(e.player.getName()),!0}function customGuiButton(e){try{switch(e.buttonId){case 3:var a=e.player.getMainhandItem(),t=e.gui.getComponent(2).getText();if(!t)return e.player.message("[§cDebuger§f] §7Za krótka nazwa, bądź pusta!");t=t.replace(/&/g,"§");var r=Java.from(a.getLore());return r[2]=t,a.setLore(r),e.player.closeGui(),e.player.message("[§cPlecaki§f] §7Nazwano plecak: "+t);case 4:if((p=(a=e.player.getMainhandItem()).getLore()).length<1)return e.player.message("[§cDebugger§f] §7Twój plecak nie ma id na pozycji 1!");var i=a.getNbt(),s=i.getLong("data");if(s=s?parseInt(s):Date.now()-904e5,Date.now()-s>864e5){var n=p[0].split("§0")[1];return!0===saveBagCopy(n)?(i.setLong("data",Date.now()),e.player.message("[§cPlecaki§f] §7Poprawnie zapisano plecak!")):e.player.message("[§cDebugger§f] §7Coś poszło nie tak!")}return e.player.message("[§cPlecaki§f] §7Robiłeś już dzisiaj kopię tego plecaka!");case 10:var o=e.gui.getComponent(11).getText()||"";if(!o)return e.player.message("[§cPlecak§f] §7Nie wpisano nicku!");var l=e.player.world.getPlayer(o);if(!l)return e.player.message("[§cPlecak§f] §7Nie znaleziono gracza! Musi być online lub wpisano niepoprawny nick.");var p,g=e.player.getMainhandItem();if(-1==g.getDisplayName().indexOf("Plecak."))return e.player.message("[§cPlecak§f] §7Nie masz plecaka w łapie!");(p=Java.from(g.getLore()))[1]="§0"+l.getUUID(),g.setLore(p),l.message("[§cPlecak§f] §7Otrzymano prawa plecaka: §a"+p[0].replace(/§./g,"")),e.player.message("[§cPlecak§f] §7Przekazano prawa plecaka dla: §a"+l.getName()),e.player.closeGui();var c="**"+e.player.getName()+"** Zmienił prawa plecaka **"+p[0].replace(/§./g,"")+"** dla: "+l.getName();return c=ang(c),HTTP.post(passes.hooks.mainLog,{content:c,tts:!1}),updateName(p[0].replace(/§./g,""),l.getName(),l.getUUID()).error?e.player.message("[§cDebugger§f] §7Wystąpił błąd w zmianie nazwy i uuid w bazie danych!"):void 0}}catch(e){print("Button tab1 error: "+e)}}