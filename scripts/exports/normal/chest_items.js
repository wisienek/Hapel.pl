function lookChestItems(world,x,y,z){
    var block = world.getBlock(x,y,z);
    var container = block.getContainer();
    if(container){
        return container.getItems();
    }else{
        return [];
    }
}