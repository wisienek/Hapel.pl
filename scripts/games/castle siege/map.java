public static ItemStack createMap(World world, BlockPos pos, TradeInfo info) {
  BlockPos biomePos = BiomeLocator.spiralOutwardsLookingForBiome(world, info.biome, pos.getX(), pos.getZ());
  if(biomePos == null)
    return ItemStack.EMPTY;
  
  int id = world.getUniqueDataId("map");
  ItemStack stack = new ItemStack(Items.FILLED_MAP, 1, id);
  stack.setTranslatableName(info.name);
  NBTTagCompound cmp = ItemNBTHelper.getCompound(stack, "display", false);
  cmp.setInteger("MapColor", info.color);
  ItemNBTHelper.setCompound(stack, "display", cmp);
  String s = "map_" + id;
  MapData mapdata = new MapData(s);
  
  world.setData(s, mapdata);
  mapdata.scale = 2;
  mapdata.xCenter = biomePos.getX() + (int) ((Math.random() - 0.5) * 200);
  mapdata.zCenter = biomePos.getZ() + (int) ((Math.random() - 0.5) * 200);
  mapdata.dimension = 0;
  mapdata.trackingPosition = true;
  mapdata.unlimitedTracking = true;
  ItemMap.renderBiomePreviewMap(world, stack);
  MapData.addTargetDecoration(stack, biomePos, "+", Type.TARGET_X);

  return stack;
}