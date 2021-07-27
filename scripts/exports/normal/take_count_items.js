function countItems(inventory,item,tam){
    if(!tam){tam=0;}
    var items = inventory.getItems();
    for(var x=0;x<items.length;x++){
        if(items[x].getDisplayName()==item.getDisplayName() && items[x].getName()==item.getName()){
            tam+=items[x].getStackSize();
        }
    }
    return tam;
}
function takeItems(inventory,item,ammount){
    var items = inventory.getItems();
    for(var x=0;x<items.length;x++){
        if(items[x].getDisplayName()==item.getDisplayName() && items[x].getName()==item.getName()){
            var temp = items[x].getStackSize();
            items[x].setStackSize(temp-ammount);
            ammount-=temp;
        }
    }
    if(ammount<0){
        return true;
    }
    return false;
}
function hasItems(inventory,item,ammount){
    var items = inventory.getItems();
    for(var x=0;x<items.length;x++){
        if(items[x].getDisplayName()==item.getDisplayName() && items[x].getName()==item.getName()){
            ammount-=items[x].getStackSize();
        }
    }
    return ammount<=0;
}