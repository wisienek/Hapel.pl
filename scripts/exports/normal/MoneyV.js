var API = Java.type("noppes.npcs.api.NpcAPI").Instance();
var world = API.getIWorlds()[0];

function payPlayer(name, ammount){
    if(!name) return "No name!";
    if(isNaN(parseFloat(ammount)))
        return "Wrong ammount";
    var x = API.executeCommand(world, "eco give "+name+" "+ammount);
    if( x && x.indexOf("dodane do") > -1 ){ return true}
    return "Error!";
}

function requestPayment(name, ammount){
    if(!name) return "No name!";
    if(isNaN(parseFloat(ammount)))
        return "Wrong ammount";
    if(ammount==0)
        return true;
    var x = API.executeCommand(world, "balance "+name);
    x = x.split("§c  ")[1];
    if(isNaN(x)) 
        return "NAN";
    if( x < ammount ) 
        return "Player's broke!"
    var y = API.executeCommand(world, "eco take "+name+" "+ammount);
    if( y && y.indexOf("taken from") > -1 ) 
        return true;
    return "Error!";
}

function wallet(name){
    if(!name) return "No name!";
    var x = API.executeCommand(world, "balance "+name);
    x = x.split("§c  ")[1];
    if(isNaN(x)) 
        return 0;
    return parseFloat(x)
}