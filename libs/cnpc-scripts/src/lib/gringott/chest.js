var JIb = Java.type('net.minecraft.inventory.InventoryBasic');
var JItemS = Java.type('net.minecraft.item.ItemStack');
var JSToNbt = Java.type('net.minecraft.nbt.JsonToNBT');
var inventory;
var oid;
function init(e) {
  e.block.setModel('minecraft:chest');
  var tile = e.block.getTileEntityNBT();
  tile.setString('ScriptBlockModelBlock', 'minecraft:air');
  e.block.setTileEntityNBT(tile);
}

function interact(e) {
  var pMC = e.player.MCEntity;
  var pdata = e.player.getTempdata();
  var pos = e.block.getPos();
  var w = pos.getX() + pos.getY() + pos.getZ();

  if (!oid) {
    var data = e.block.getStoreddata();
    var x = data.get('oid');
    if (x) {
      oid = x;
    }
  }

  if (!oid) {
    e.player.message(
      '[§cSejf§f] §7Sejf jest niezabezpieczony. Kliknij na niego §cPPM§7 trzymając klucz!'
    );
  }
  var mainh = e.player.getMainhandItem();
  if (mainh.getDisplayName().indexOf('Kluczyk do sejfu') > -1) {
    var lore = mainh.getLore();
    if (lore.length == 0) {
      if (!oid) {
        lore = ['§0' + e.player.getUUID(), '§0' + w];
        mainh.setLore(lore);
        oid = lore[0];

        var data = e.block.getStoreddata();
        data.put('oid', oid);

        mainh.setStackSize(6);
        e.player.message('[§cSejf§f] §7Zabezpieczono sejf!');
        return;
      } else {
        return e.player.message('[§cSejf§f] §7Sejf ma już przypisany kluczyk!');
      }
    } else {
      if (!oid) {
        return;
      }
      if (lore[0] == oid && lore[1] == '§0' + w) {
        pos = [pos.getX(), pos.getY(), pos.getZ()];
        pdata.put('sejf', pos);
        if (!inventory) {
          inventory = new JIb('\u00A74Średnia Skrytka \u00A7e' + w, true, 18);
          var data = e.block.getStoreddata().get('itemy');
          if (data) {
            data = JSON.parse(data);
            for (var x = 0; x < data.length; x++) {
              var item = new JItemS(JSToNbt.func_180713_a(data[x][1]));
              inventory.func_70299_a(data[x][0], item); //slot, item
            }
          }
        }
        try {
          pMC.func_71007_a(inventory);
        } catch (err) {
          e.player.message('\u00A7c' + err);
        }
      } else {
        return e.player.message('[§cSejf§f] §7Kluczyk nie pasuje do sejfu!');
      }
    }
  }
}
