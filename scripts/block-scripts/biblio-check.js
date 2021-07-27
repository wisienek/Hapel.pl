//24,142,256

function init(e){
    e.block.setModel("minecraft:bookshelf");
}
function tick(e){
    var blok = e.block.world.getBlock(25,145,256);
    var ent = e.block.world.getNearbyEntities​(e.block.getPos(),8,1);
    if(ent.length>0){
        if(blok.getName()=="minecraft:glass"||blok.getName()=="minecraft:diamond_block"){
            blok.setBlock("minecraft:netherrack");
        }else{
            return;
        }
    }else{
        if(blok.getName()=="minecraft:netherrack"){
            blok.setBlock("minecraft:diamond_block");
        }else{
            return;
        }
    }
}
