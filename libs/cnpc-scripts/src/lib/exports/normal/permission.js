var bukkit = Java.type("org.bukkit.Bukkit");
var server = bukkit.getServer();

var Permission = {
  has: function(playerName, permission){
      var pl = server.getPlayer(playerName);
      return pl.hasPermission(permission);
  },
  list: function(playerName, permission){
      var pl = server.getPlayer(playerName);
      var permissions = Java.from(pl.getEffectivePermissions().toArray());
      var valid = [];
      for(var i=0; i<permissions.length; i++){
          if( (permission && permissions[i].getPermission().indexOf(permission)>-1) || !permission){
              valid.push(permissions[i].getPermission()); // permission name i.e.: maxbans.ban
          }
      }
      return valid;
  }
}