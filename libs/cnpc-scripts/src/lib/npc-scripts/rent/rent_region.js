var server = Java.type("org.bukkit.Bukkit").getServer();
var npc;

var _GUI_IDS = {};
var _GUI = {};
function id(name) {
    return _GUI_IDS[name] || (_GUI_IDS[name] = Object.keys(_GUI_IDS).length+1);
}
function guiM(obj) {
    return _GUI[obj.name] || (_GUI[obj.name] = obj);
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



new Gui("start", function(e){
        var gui = e.API.createCustomGui(0, 175, 165, true);
        var pl = server.getPlayer(e.player.getName());

        gui.addLabel(id('txtStart'), "Rentowanie", 65, 10, 100, 20);
        gui.addButton(id("goRent"), "Rentuj", 40, 40, 100, 20);

        if( pl.hasPermission("maxbans.ban") )
            gui.addButton(id("goAdmin"), "Admin", 40, 60, 100, 20);

        e.player.showCustomGui(gui);
    }
)

new Gui("admin", function(e){
    var gui = e.API.createCustomGui(0, 175, 165, true);

    var data = npc.getStoreddata();
    var regiony = data.get("regions");
    regiony = JSON.parse(regiony) || {};
    var regKeys = Object.keys(regiony);
    var rented = [];

    for(var i=0; i < regKeys.length; i++)
        regiony[ regKeys[i] ].rented? rented.push("§c" + regKeys[i]): rented.push("§a" + regKeys[i]);

    /*
        {
            "grecja_d1":{
                owner: "",
                members: [],
                rented: timestamp
            }
        }
    */


    gui.addLabel(id('txtAdmin'), "Admin", 80, 0, 100, 20);

    gui.addScroll(id("scrollRented"), 10, 20, 160, 140, rented);
    gui.addButton(id("removeRegion"), "Usuń region", 95, 165, 80, 20).setHoverText(["Zaznacz region do usunięcia i kliknij"]);

    gui.addTextField(id("textRegionPrice"), -15, 165, 20, 20).setHoverText(["Wpisz tutaj cenę regionu"]);
    gui.addTextField(id("textRegionName"), 10, 165, 80, 20).setHoverText(["Wpisz tutaj nazwę regionu"]);
    gui.addButton(id("addRegion"), "Dodaj region", 0, 190, 80, 20);

    e.player.showCustomGui(gui);
},null, "start");



function init(e){
    npc = e.npc;
}
 
function interact(e) {
    var test = _GUI['start'];
    try{
        test.show(e);
    }
    catch(er){
        print("test error: "+er);
    }
    
}
 
function customGuiButton(e) {
    switch(e.buttonId) {
        case id('goAdmin'):
            return _GUI['admin'].show(e);

        case id("addRegion"):
            var t = e.gui.getComponent(id("textRegionName")).getText();
            var c = e.gui.getComponent(id("textRegionPrice")).getText();
            if( !t || t.length == 0 || (!c && c != 0) )
                return e.player.message("[§cRenter§f] §7Nie wpisano nazwy lub ceny regionu!");

            var data = npc.getStoreddata();
            var regiony = data.get("regions");
            regiony = JSON.parse(regiony) || {};

            if( regiony[ t ] )
                return e.player.message("[§cRenter§f] §7Region już jest na liście!");

            






            return;
    }
    e.gui.update(e.player);
}