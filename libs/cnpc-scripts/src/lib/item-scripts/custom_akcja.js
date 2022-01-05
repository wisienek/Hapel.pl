var lista = [["§e**W kąciku ust Harry'ego zebrała się spora ilość śliny, która po chwili popłynęła mu po podbródku, §eaż na koszulkę,",
"§ezostawiając na niej mokrą plamę.**"],
["§e**Harrym wstrząsnęła delikatna drgawka, powodując kilkusekundowy paraliż mięśni.**"],
["§e*Podłubał w nosie, nie zważając na to czy w okolicy ktoś jest, czy nie.*"],
["§e*Wydaje dziwny dźwięk, jakby chciał coś powiedzieć, ale się zaciął. Można zrozumieć coś w stylu §e'Gd-Gd-Gk'.*"],
["§e*Pociągnął mocno nosem, czemu towarzyszył ohydny warkot.*"],
["§e**Z twarzy Harry'ego można było wyczytać głębokie zamyślenie, jednak po kilku sekundach twarz §erozpromieniła się i pojawił się",
"§ena niej ogromny uśmiech.**"]];

function init(e){
    e.item.setTexture(99, "variedcommodities:coin_wood");
    e.item.setDurabilityValue(99);
}

function interact(e){
    if(e.player.isSneaking()){return}
    var sdata = e.item.getStoreddata();
    var data = sdata.get("akcja");
    if(data){
        var d1 = new Date(data);
        var d2 = new Date();
        if((d2-d1)/60000 < 5){
            return e.player.message("[§cAkcje§f] §7Możesz wysyłać akcje co 5min. (zostało "+(5-(d2-d1)/60000).toFixed(2)+")");
        }else{
            var players = e.player.world.getNearbyEntities(e.player.getPos(), 15,1);
            for(var x=0;x<players.length;x++){
                players[x].message("[L] §6[HarryJerk]§f"+e.player.getName()+": "+lista[Math.floor(Math.random()*lista.length)]);
            }
        }
    }
    sdata.put("akcja",Date.now());
}