function interact(e){
  if(e.player.isSneaking()) return;

  var dc = getDiscord(e.API, e.player.getName());


  var params = "?id=5&name="+e.player.getName()+"&uuid="+e.player.getUUID()+"&discord="+dc;
  var x = HTTP.post("http://3.23.61.247/api/karty/moje"+params, {});


  e.player.message(params);
  e.player.message(JSON.stringify(x));

}