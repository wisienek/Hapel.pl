function createItemFromHand(e,hand){
    if(hand.getName().indexOf("air")>-1){
        return e.player.world.createItem("minecraft:air",0,1);
    }else{
        return e.player.world.createItemFromNbt(hand.getItemNbt());
    }
}