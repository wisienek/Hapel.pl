function interact(e){
    if(e.player.isSneaking()){return}
    var lore = e.item.getLore();
    var date = lore[0].split(".");
    e.player.message("Rok: "+date[2]+" miesiąc: "+date[1]+" Dzień: "+date[0]);
    date = new Date(date[2],date[1]-1,date[0]);
    var date1 = new Date(Date.now());
    e.player.message("Rok: "+date1.getFullYear()+" miesiąc: "+date1.getMonth()+" Dzień: "+date1.getDate());


    var x = date1.getTime()-date.getTime();
    e.player.message(x);
    x/=1000*60*60*24;
    e.player.message(x+" | "+x.toFixed(0)>60);




    //e.player.message(date1.getFullYear()==date.getFullYear() && date1.getMonth()-date.getMonth()+1<=2);


}