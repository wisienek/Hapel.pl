function dialogOption(e){
    var name = e.option.getName();
    if(name=="Jasne!"){
        e.player.setPosition(38,76,954);
    }else if(name=="Zaprowadź mnie do Hogsmeade"){
        e.player.setPosition(112,77,1149);
    }
}
