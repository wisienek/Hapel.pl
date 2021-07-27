// Made with Blockbench 3.6.5
// Exported for Minecraft version 1.12
// Paste this class into your mod and generate all required imports


public class mandrakemob extends ModelBase {
	private final ModelRenderer top;
	private final ModelRenderer cialo;
	private final ModelRenderer bone2;
	private final ModelRenderer bone3;

	public mandrakemob() {
		textureWidth = 64;
		textureHeight = 64;

		top = new ModelRenderer(this);
		top.setRotationPoint(-8.0F, 16.0F, 8.0F);
		top.cubeList.add(new ModelBox(top, 15, 7, 7.0F, -5.25F, -9.0F, 2, 1, 2, 0.0F, false));
		top.cubeList.add(new ModelBox(top, 28, 29, 8.0F, -6.25F, -9.0F, 0, 1, 2, 0.0F, false));
		top.cubeList.add(new ModelBox(top, 29, 28, 8.0F, -8.25F, -9.0F, 0, 2, 1, 0.0F, false));
		top.cubeList.add(new ModelBox(top, 24, 24, 8.0F, -7.25F, -7.0F, 0, 1, 1, 0.0F, false));
		top.cubeList.add(new ModelBox(top, 22, 18, 8.0F, -9.25F, -10.0F, 0, 1, 1, 0.0F, false));
		top.cubeList.add(new ModelBox(top, 23, 22, 8.0F, -9.25F, -8.0F, 0, 1, 1, 0.0F, false));
		top.cubeList.add(new ModelBox(top, 24, 18, 8.0F, -7.25F, -10.0F, 0, 1, 1, 0.0F, false));
		top.cubeList.add(new ModelBox(top, 24, 26, 8.0F, -10.25F, -7.0F, 0, 1, 1, 0.0F, false));

		cialo = new ModelRenderer(this);
		cialo.setRotationPoint(-14.0F, 8.0F, 14.0F);
		cialo.cubeList.add(new ModelBox(cialo, 12, 4, 11.0F, 7.75F, -17.0F, 6, 1, 6, 0.0F, false));
		cialo.cubeList.add(new ModelBox(cialo, 16, 41, 11.0F, 12.75F, -17.0F, 6, 1, 6, 0.0F, false));
		cialo.cubeList.add(new ModelBox(cialo, 8, 52, 10.0F, 8.75F, -18.0F, 8, 4, 8, 0.0F, false));
		cialo.cubeList.add(new ModelBox(cialo, 48, 39, 12.0F, 3.75F, -16.0F, 4, 4, 4, 0.0F, false));

		bone2 = new ModelRenderer(this);
		bone2.setRotationPoint(1.0F, 22.25F, -2.25F);
		setRotationAngle(bone2, -0.3927F, 0.0F, 0.0F);
		bone2.cubeList.add(new ModelBox(bone2, 2, 34, -1.0F, -1.519F, -0.1543F, 1, 3, 1, 0.0F, true));

		bone3 = new ModelRenderer(this);
		bone3.setRotationPoint(1.0F, 22.5F, 1.5F);
		setRotationAngle(bone3, 0.3927F, 0.0F, 0.0F);
		bone3.cubeList.add(new ModelBox(bone3, 1, 45, -1.0F, -1.519F, -0.3457F, 1, 3, 1, 0.0F, true));
	}

	@Override
	public void render(Entity entity, float f, float f1, float f2, float f3, float f4, float f5) {
		top.render(f5);
		cialo.render(f5);
		bone2.render(f5);
		bone3.render(f5);
	}

	public void setRotationAngle(ModelRenderer modelRenderer, float x, float y, float z) {
		modelRenderer.rotateAngleX = x;
		modelRenderer.rotateAngleY = y;
		modelRenderer.rotateAngleZ = z;
	}
}