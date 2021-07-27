[
    [00,01,02,03,04,05,06,07],
    [8,9,10,11,12,13,14,15],
    [16,17,18,19,20,21,22,23],
    [24,25,26,27,28,29,30,31],
    [32,33,34,35,36,37,38,39],
    [40,41,42,43,44,45,46,47],
    [48,49,50,51,52,53,54,55],
    [56,57,58,59,60,61,62,63]
]

var pole = 62;

function init(e){
    var wdata = player.world.getStoreddata();
    if(wdata.get("chess")==true){
        if(pole<16 || pole>47){
            e.block.setModel("minecraft:glowstone");
        }else{
            e.block.setModel("minecraft:coal");
        }
    }
}

function collide(e){
    var player = e.entity;
    //czy jest gra aktywna?
    var wdata = player.world.getStoreddata();
    if(wdata.get("chess")==false){return player.message("[§cSzachy§f] §7Gra nie jest rozpoczęta!")}

    var data = player.getStoreddata();

    if(data.get("chess")==true){
        //nie ma roli
        if(!data.get("chess_role")){return}

        var ppos = data.get("chess_position");
        //pozycja taka sama
        if(ppos==pole){return}
        //nie ma pozycji
        if(!ppos){
            data.put("chess_position",pole);
            var tpos = e.block.getPos();
            data.put("chess_xyz",tpos.getX()+","+(tpos.getY()+1)+","+tpos.getZ());
            return player.message("[§cSzachy§f] §7Ustawiono pozycję na: "+pole);
        }
        




    }else{
        return;
    }
}




function move(player){

    var data = player.getStoreddata();
    if(data.get("chess")==true){
        if(data.get("chess_role")){

            //czy ma drużynę?
            if(!data.get("chess_team")){return player.message("[§cSzachy§f] §7Nie masz wybranej drużyny!")}

            var pxyz = data.get("chess_xyz");
            pxyz = pxyz.split(",");
            switch(data.get("chess_role")){
                case "rook":{

                }
                case "bishop":{
                    
                }
                case "tower":{
                    if( Math.floor(ppos/8) == Math.floor(pole/8) || Math.floor(ppos%8) == Math.floor(pole%8) ){
                        //sprawdź czy ktoś jest na miejscu
                        if(goscjestnamiejcu){
                            if(!tasamadruzyna){
                                zbijgoscia();
                            }
                        }
                        ustawmiejsce();
                        //koniec sprawdzania


                    }else{
                        player.setPosition(pxyz[0],pxyz[1],pxyz[2]);
                        return player.message("[§cSzachy§f] §7Nie możesz zrobić takiego ruchu!")
                    }
                }
                case "queen":{

                }
                case "king":{

                }
                case "knight":{

                }
                case "pawn":{

                }
                default:{
                    return player.message("[§cSzachy§f] §7Nie ustawiłeś swojej pozycji do gry!");
                }
            }




        }else{
            return player.message("[§cSzachy§f] §7Nie masz przypisanej roli!");
        }
    }


}