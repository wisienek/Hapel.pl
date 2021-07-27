function interact(e){
    var mainh = e.player.getMainhandItem();
    if(mainh.getDisplayName()=="§cKociołek Magiczny"){
        e.setCanceled(true);
        if(e.type==2){
            if(e.target.getName().indexOf("cauldron")>-1){
                var pos = e.target.getPos();
                var i = e.target.setBlock("customnpcs:npcscripted");
                var nbt = i.getTileEntityNBT();

                var s1 = e.API.stringToNbt('{}');
                s1.setString("Script", "");
                s1.setList("Console",[]);
                nbt.setList("Scripts", [s1]);
                
                var type = nbt.getListType("Scripts");
                var scripts = nbt.getList("Scripts",type)[0];

                var test = e.API.stringToNbt('{}');
                test.setString('Line','kociolek.js');
                scripts.setList("ScriptList", [test]);
                nbt.setByte("ScriptEnabled", 1);

                e.player.message("[§cKociołek§f] §7Konwertowano na używalny kociołek!");
                e.player.world.getBlock(pos.getX(), pos.getY(), pos.getZ()).setTileEntityNBT(nbt);
                mainh.setStackSize(mainh.getStackSize()-1);
            }
        }
    }
}