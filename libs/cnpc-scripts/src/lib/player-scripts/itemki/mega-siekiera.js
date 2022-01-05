function broken(e) {
  //mega siekiera, niszczy drzewo na raz
  if (
    e.block.getName() == 'minecraft:log' &&
    e.player.getMainhandItem().getDisplayName() == '§bMega Siekiera'
  ) {
    var ppos = e.block.getPos();
    while (
      e.player.world
        .getBlock(ppos.getX(), ppos.getY(), ppos.getZ())
        .getName() == 'minecraft:log'
    ) {
      var block1 = e.player.world.getBlock(
        ppos.getX(),
        ppos.getY(),
        ppos.getZ()
      );
      var item = e.player.world.createItem(
        'minecraft:log',
        block1.getMetadata(),
        1
      );
      e.player.dropItem(item);
      block1.setBlock('air');
      ppos = ppos.add(0, 1, 0);
    }
  }
}
