var owner = "MrFrancuz";

function init(e){
    e.block.setModel("cfm:desk_cabinet_dark_oak");
}


function interact(e){
    if(e.player.getName()!=owner){return e.player.message("[§cWizytówki§f] §7Prywatny gabinet §b"+owner+"§7!")}

    var data = e.player.world.getStoreddata();
    var wiz = data.get("wizytówki");
    if(!wiz){return e.player.message("[§cWizytówki§f] §7Błąd, nie znaleziono danych!")}
    wiz = JSON.parse(wiz);
    if(!wiz[owner]){return e.player.message("[§cWizytówki§f] §7Błąd, nie masz przypisanych wizytówek!")}
    if(wiz[owner][0]==0){return e.player.message("[§cWizytówki§f] §7Błąd, nie masz żadnych wizytówek do odebrania!")}
    var pos = e.block.getPos();
    var it = lookChestItems(e.player.world, pos.getX(), pos.getY()-1, pos.getZ());
    it = it[0];
    if(it.getName().toLowerCase().indexOf("air")>-1){return e.player.message("[§cWizytówki§f] §7Błąd, W skrzyni pod maszyną musi być 1 wizytówka!")}
    it.setStackSize(wiz[owner][0]);
    e.player.giveItem(it);
    wiz[owner][0]=0;
    data.put("wizytówki",JSON.stringify(wiz));
    return e.player.message("[§cWizytówki§f] §7Odebrano §b"+ it.getStackSize() +"§7 wizytówek!");
}

function lookChestItems(world,x,y,z){
    var block = world.getBlock(x,y,z);
    var container = block.getContainer();
    if(container){
        return container.getItems();
    }else{
        return [];
    }
}