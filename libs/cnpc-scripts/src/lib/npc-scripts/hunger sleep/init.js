//player script:

function interact(e) {
  var mainh = e.player.getMainhandItem();
  if (mainh.getName() == 'minecraft:stick') {
    var data = e.player.getTempdata();
    if (data.get('teach') == 1) {
      if (e.type != 2) {
        return e.player.message('Not a block!');
      }
      if (e.target.getName().indexOf('chest') == -1) {
        return e.player.message('Not a chest!');
      }
      var pet = data.get('pet');
      pet = e.player.world.getEntity(pet) || 0;
      if (pet) {
        var block = e.target.getPos();
        var nbt = pet.getEntityNbt();
        nbt.setString(
          'food_chest',
          block.getX() + ' ' + block.getY() + ' ' + block.getZ()
        );

        var timers = pet.getTimers();
        if (!timers.has(1)) {
          timers.forceStart(1, 20 * 3600, true); //every 1 hr
        }

        return e.player.message('Setting up food storage complete!');
      } else {
        e.player.message("There's no pet!");
      }
    }
  }
}

//npc script

function init(e) {
  var nbt = e.npc.getEntityNbt();
  if (!nbt.getInteger('starving') && nbt.getInteger('starving') !== 0) {
    nbt.setInteger('starving', 0);
  }
  var timers = e.npc.getTimers();
  timers.forceStart(2, 20 * 60 * 5, true); //every 5 mins check for night
  if (!nbt.getInteger('hunger') && nbt.getInteger('hunger') !== 0) {
    nbt.setInteger('hunger', 100);
  }
  timers.forceStart(1, 1, 20 * 3600, true);
}

function interact(e) {
  var mainh = e.player.getMainhandItem();
  if (mainh.getName() == 'minecraft:stick') {
    //setup food storage
    var data = e.player.getTempdata();
    e.npc.say('Teach me where the food is!');
    data.put('teach', 1);
    data.put('pet', e.npc.getUUID());
    return;
  } else if (mainh.getFoodLevel()) {
    var ammount = mainh.getFoodLevel();
    var nbt = e.npc.getEntityNbt();
    var hunger = nbt.getInteger('hunger');
    if (hunger == 100) {
      return e.npc.say('Not hungry!');
    }
    if (hunger + ammount > 100) {
      ammount = 100;
    } else {
      ammount += hunger;
    }
    nbt.setInteger('hunger', ammount);
    e.npc.say('hmmm yum!');
    return mainh.setStackSize(mainh.getStackSize() - 1);
  }
}

function timer(e) {
  switch (e.id) {
    case 1: {
      //bring food level down
      var nbt = e.npc.getEntityNbt();
      var hunger = nbt.getInteger('hunger');
      if (!hunger && hunger !== 0) {
        return e.npc.getTimers().stop(e.id);
      }
      if (hunger == 0) {
        e.npc.say('*scratches everything and growls*');
        var hp = nbt.getInteger('starving');
        if (hp > 6) {
          return; //kill npc or do something other
        }
        if (hp) {
          hp++;
        }
        nbt.setInteger(hp);
      } else if (hunger <= 20) {
        e.npc.say('*growls*');
        if (!e.npc.getRole().isFollowing() && nbt.getString('food_chest')) {
          //not following and chest is set
          var chest = nbt.getString('food_chest').split(' ');
          var chestB = e.npc.world.getBlock(chest[0], chest[1], chest[2]);
          //navigation
          var dist = e.npc.getPos().distanceTo(chestB.getPos());
          if (dist > 15) {
            e.npc.setPosition(chest[0], parseFloat(chest[1]) + 1, chest[2]);
          } else {
            e.npc.navigateTo(chest[0], parseFloat(chest[1]) + 1, chest[2]);
          }
          e.npc.setHome(chest[0], parseFloat(chest[1]) + 1, chest[2]);

          var items = chestB.getContainer().getItems();
          for (var i = 0; i < items.length; i++) {
            if (items[i].getFoodLevel()) {
              var ammount = items[i].getFoodLevel();
              items[i].setStackSize(items[i].getStackSize() - 1);
              hunger += ammount;
            }
          }
        }
      }
      nbt.setInteger('hunger', hunger - 10);
      return;
    }
    case 2: {
      if (!e.npc.world.isDay()) {
        if (!e.npc.getRole().isFollowing()) {
          //navigate home
          var home = [e.npc.getHomeX(), e.npc.getHomeY(), e.npc.getHomeZ()];
          var block = e.npc.world.getBlock(home[0], home[1], home[2]);
          var dist = e.npc.getPos().distanceTo(block.getPos());
          if (dist > 15) {
            e.npc.setPosition(home[0], home[1], home[2]);
          } else {
            e.npc.navigateTo(home[0], home[1], home[2]);
          }
          //do some other thing
        }
      }
    }
  }
}
