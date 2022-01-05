if (loreArray.toString().contains('Consumable')) {
  var data = e.player.getStoreddata();
  var cld = data.get('cld_Health Crystal');
  var now = Date.now();
  if (cld && cld > now) {
    return e.player.message(
      '[§cAdmin§f] §7This item is still on cooldown: §c' +
        parseInt((cld - now) / 1000) +
        '§7 seconds'
    );
  }

  var stacksize = item.getStackSize();
  var playerHealth = e.player.getHealth();
  var playerMaxHealth = e.player.getMaxHealth();
  var healAmmount = playerMaxHealth * 0.15;
  var ran = Random(1000000);

  if (playerHealth == playerMaxHealth) {
    executeCommand(
      'tellraw ' + player + ' ["",{"text":"§cYou are already at full health."}]'
    );
  } else if (playerHealth / playerMaxHealth > 0.85) {
    e.player.setHealth(playerMaxHealth);

    item.setStackSize(stacksize - 1);

    executeCommand(
      'tellraw ' + player + ' ["",{"text":"§bYou have been healed."}]',
      player
    );
  } else {
    e.player.setHealth(playerHealth + healAmmount);

    item.setStackSize(stacksize - 1);

    executeCommand(
      'tellraw ' + player + ' ["",{"text":"§bYou have been healed."}]',
      player
    );
  }

  data.put('cld_Health Crystal', now + 1000 * 15);
}
