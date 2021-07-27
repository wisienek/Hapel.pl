public class pufek extends ModelBase {
	private final ModelRenderer bone;
	private final ModelRenderer BR;
	private final ModelRenderer FL;
	private final ModelRenderer BL;
	private final ModelRenderer FR;
	private final ModelRenderer bone2;
	private final ModelRenderer cube_r1;
	private final ModelRenderer jezyk;
	private final ModelRenderer Pyszczek;

	public pufek() {
		textureWidth = 32;
		textureHeight = 32;

		bone = new ModelRenderer(this);
		bone.setRotationPoint(0.0F, 24.0F, 0.0F);
		bone.cubeList.add(new ModelBox(bone, 0, 8, 0.8F, -2.55F, -2.85F, 1, 1, 1, 0.0F, false));
		bone.cubeList.add(new ModelBox(bone, 0, 2, -1.8F, -2.55F, -2.85F, 1, 1, 1, 0.0F, false));
		bone.cubeList.add(new ModelBox(bone, 0, 0, -2.5F, -4.3F, -2.6F, 5, 4, 4, 0.0F, false));
		bone.cubeList.add(new ModelBox(bone, 0, 26, 0.0F, -5.3F, -2.6F, 0, 1, 4, 0.0F, false));
		bone.cubeList.add(new ModelBox(bone, 12, 12, -2.5F, -5.3F, -0.6F, 5, 1, 0, 0.0F, false));
		bone.cubeList.add(new ModelBox(bone, 6, 10, -2.7F, -3.3F, -2.6F, 1, 2, 4, 0.0F, false));
		bone.cubeList.add(new ModelBox(bone, 0, 8, 1.7F, -3.3F, -2.6F, 1, 2, 4, 0.0F, false));
		bone.cubeList.add(new ModelBox(bone, 12, 8, -2.5F, -3.3F, 0.525F, 5, 2, 1, 0.0F, false));

		BR = new ModelRenderer(this);
		BR.setRotationPoint(-1.5F, -1.8F, 0.55F);
		bone.addChild(BR);
		BR.cubeList.add(new ModelBox(BR, 0, 14, -0.5F, 0.8F, 0.5F, 1, 1, 1, 0.0F, false));

		FL = new ModelRenderer(this);
		FL.setRotationPoint(1.5F, -1.8F, -3.5F);
		bone.addChild(FL);
		FL.cubeList.add(new ModelBox(FL, 0, 10, -0.5F, 0.8F, 0.4F, 1, 1, 1, 0.0F, false));

		BL = new ModelRenderer(this);
		BL.setRotationPoint(1.5F, -1.8F, 0.55F);
		bone.addChild(BL);
		BL.cubeList.add(new ModelBox(BL, 6, 8, -0.5F, 0.8F, 0.5F, 1, 1, 1, 0.0F, false));

		FR = new ModelRenderer(this);
		FR.setRotationPoint(-1.5F, -1.8F, -3.4F);
		bone.addChild(FR);
		FR.cubeList.add(new ModelBox(FR, 6, 10, -0.5F, 0.8F, 0.3F, 1, 1, 1, 0.0F, false));

		bone2 = new ModelRenderer(this);
		bone2.setRotationPoint(1.5F, -1.0F, 0.5F);
		bone.addChild(bone2);
		

		cube_r1 = new ModelRenderer(this);
		cube_r1.setRotationPoint(0.0F, -1.775F, -3.35F);
		bone2.addChild(cube_r1);
		setRotationAngle(cube_r1, -0.5672F, 0.0F, 0.0F);
		cube_r1.cubeList.add(new ModelBox(cube_r1, 12, 11, -4.0F, -0.5F, 0.0F, 5, 1, 0, 0.0F, false));

		jezyk = new ModelRenderer(this);
		jezyk.setRotationPoint(0.0F, 24.0F, 0.0F);
		jezyk.cubeList.add(new ModelBox(jezyk, 19, 18, -0.475F, -0.925F, -3.05F, 1, 0, 4, 0.0F, false));

		Pyszczek = new ModelRenderer(this);
		Pyszczek.setRotationPoint(0.0F, 24.0F, 0.0F);
		Pyszczek.cubeList.add(new ModelBox(Pyszczek, 6, 17, -0.96F, -2.1F, -3.1F, 2, 1, 1, 0.0F, false));
	}

	@Override
	public void render(Entity entity, float f, float f1, float f2, float f3, float f4, float f5) {
		bone.render(f5);
		jezyk.render(f5);
		Pyszczek.render(f5);
	}

	public void setRotationAngle(ModelRenderer modelRenderer, float x, float y, float z) {
		modelRenderer.rotateAngleX = x;
		modelRenderer.rotateAngleY = y;
		modelRenderer.rotateAngleZ = z;
	}
}