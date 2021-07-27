// Made with Blockbench 3.7.4
// Exported for Minecraft version 1.12
// Paste this class into your mod and generate all required imports


public class yeti extends ModelBase {
	private final ModelRenderer yeti;
	private final ModelRenderer head;
	private final ModelRenderer cube_r1;
	private final ModelRenderer cube_r2;
	private final ModelRenderer cube_r3;
	private final ModelRenderer cube_r4;
	private final ModelRenderer body;
	private final ModelRenderer cube_r5;
	private final ModelRenderer cube_r6;
	private final ModelRenderer cube_r7;
	private final ModelRenderer left_arm;
	private final ModelRenderer cube_r8;
	private final ModelRenderer cube_r9;
	private final ModelRenderer cube_r10;
	private final ModelRenderer cube_r11;
	private final ModelRenderer cube_r12;
	private final ModelRenderer right_arm;
	private final ModelRenderer cube_r13;
	private final ModelRenderer cube_r14;
	private final ModelRenderer cube_r15;
	private final ModelRenderer cube_r16;
	private final ModelRenderer cube_r17;
	private final ModelRenderer left_leg;
	private final ModelRenderer cube_r18;
	private final ModelRenderer cube_r19;
	private final ModelRenderer cube_r20;
	private final ModelRenderer right_leg;
	private final ModelRenderer cube_r21;
	private final ModelRenderer cube_r22;
	private final ModelRenderer cube_r23;

	public yeti() {
		textureWidth = 64;
		textureHeight = 64;

		yeti = new ModelRenderer(this);
		yeti.setRotationPoint(0.6F, 10.0F, 0.0F);
		

		head = new ModelRenderer(this);
		head.setRotationPoint(-0.1F, -3.75F, -0.75F);
		yeti.addChild(head);
		head.cubeList.add(new ModelBox(head, 0, 27, -2.0F, 0.0F, -2.025F, 4, 3, 5, 0.0F, false));

		cube_r1 = new ModelRenderer(this);
		cube_r1.setRotationPoint(-0.5F, 5.5F, -1.0F);
		head.addChild(cube_r1);
		setRotationAngle(cube_r1, 0.3927F, 0.0F, 0.0F);
		cube_r1.cubeList.add(new ModelBox(cube_r1, 29, 0, -2.0F, -5.0F, -1.0F, 5, 3, 3, 0.0F, false));

		cube_r2 = new ModelRenderer(this);
		cube_r2.setRotationPoint(2.0F, -4.0F, 2.975F);
		head.addChild(cube_r2);
		setRotationAngle(cube_r2, 0.0F, 0.0F, 1.2654F);
		cube_r2.cubeList.add(new ModelBox(cube_r2, 0, 58, 1.0F, 0.0F, -3.0F, 1, 1, 1, 0.0F, false));

		cube_r3 = new ModelRenderer(this);
		cube_r3.setRotationPoint(-3.0F, 0.0F, 2.975F);
		head.addChild(cube_r3);
		setRotationAngle(cube_r3, 0.0F, 0.0F, -1.3526F);
		cube_r3.cubeList.add(new ModelBox(cube_r3, 0, 61, 2.0F, 0.0F, -3.0F, 1, 1, 1, 0.0F, false));

		cube_r4 = new ModelRenderer(this);
		cube_r4.setRotationPoint(-1.0F, -0.5F, -1.025F);
		head.addChild(cube_r4);
		setRotationAngle(cube_r4, -0.0873F, 0.0F, 0.0F);
		cube_r4.cubeList.add(new ModelBox(cube_r4, 32, 11, -1.0F, -2.0F, -2.0F, 4, 3, 5, 0.0F, false));

		body = new ModelRenderer(this);
		body.setRotationPoint(-0.1F, 1.0F, 3.0F);
		yeti.addChild(body);
		

		cube_r5 = new ModelRenderer(this);
		cube_r5.setRotationPoint(-1.0F, 6.75F, -2.5F);
		body.addChild(cube_r5);
		setRotationAngle(cube_r5, -0.1309F, 0.0F, 0.0F);
		cube_r5.cubeList.add(new ModelBox(cube_r5, 0, 16, -2.0F, -5.0F, -1.0F, 6, 4, 6, 0.0F, false));

		cube_r6 = new ModelRenderer(this);
		cube_r6.setRotationPoint(-1.0F, -0.25F, 0.5F);
		body.addChild(cube_r6);
		setRotationAngle(cube_r6, 0.1309F, 0.0F, 0.0F);
		cube_r6.cubeList.add(new ModelBox(cube_r6, 21, 23, -2.0F, -1.0F, -1.0F, 6, 6, 4, 0.0F, false));

		cube_r7 = new ModelRenderer(this);
		cube_r7.setRotationPoint(-1.0F, 0.75F, -2.0F);
		body.addChild(cube_r7);
		setRotationAngle(cube_r7, 0.6981F, 0.0F, 0.0F);
		cube_r7.cubeList.add(new ModelBox(cube_r7, 0, 0, -4.0F, -4.0F, -2.0F, 10, 7, 8, 0.0F, false));

		left_arm = new ModelRenderer(this);
		left_arm.setRotationPoint(5.3F, -1.0F, 1.5F);
		yeti.addChild(left_arm);
		

		cube_r8 = new ModelRenderer(this);
		cube_r8.setRotationPoint(1.075F, 8.0939F, -1.9679F);
		left_arm.addChild(cube_r8);
		setRotationAngle(cube_r8, -2.0508F, -0.3054F, -0.1745F);
		cube_r8.cubeList.add(new ModelBox(cube_r8, 51, 44, -1.0F, 0.0F, -1.0F, 4, 0, 2, 0.0F, false));

		cube_r9 = new ModelRenderer(this);
		cube_r9.setRotationPoint(1.075F, 7.0939F, -2.9679F);
		left_arm.addChild(cube_r9);
		setRotationAngle(cube_r9, -1.1781F, -0.3054F, -0.1745F);
		cube_r9.cubeList.add(new ModelBox(cube_r9, 46, 11, -1.0F, -2.0F, -1.0F, 4, 2, 2, 0.0F, false));

		cube_r10 = new ModelRenderer(this);
		cube_r10.setRotationPoint(-0.125F, 6.165F, -0.9515F);
		left_arm.addChild(cube_r10);
		setRotationAngle(cube_r10, -0.4363F, -0.1745F, 0.0F);
		cube_r10.cubeList.add(new ModelBox(cube_r10, 39, 44, 0.0F, -2.0F, -1.0F, 3, 3, 3, 0.0F, false));

		cube_r11 = new ModelRenderer(this);
		cube_r11.setRotationPoint(-0.125F, 3.775F, -0.2F);
		left_arm.addChild(cube_r11);
		setRotationAngle(cube_r11, 0.0F, -0.2618F, 0.0F);
		cube_r11.cubeList.add(new ModelBox(cube_r11, 49, 49, 0.0F, -2.0F, -1.0F, 3, 3, 3, 0.0F, false));

		cube_r12 = new ModelRenderer(this);
		cube_r12.setRotationPoint(-0.825F, 0.775F, -0.75F);
		left_arm.addChild(cube_r12);
		setRotationAngle(cube_r12, 0.2182F, -0.3054F, 0.0F);
		cube_r12.cubeList.add(new ModelBox(cube_r12, 32, 35, 0.0F, -2.0F, -1.0F, 4, 4, 4, 0.0F, false));

		right_arm = new ModelRenderer(this);
		right_arm.setRotationPoint(-5.525F, -1.0F, 1.5F);
		yeti.addChild(right_arm);
		

		cube_r13 = new ModelRenderer(this);
		cube_r13.setRotationPoint(-0.875F, 7.0939F, -1.9679F);
		right_arm.addChild(cube_r13);
		setRotationAngle(cube_r13, -2.0071F, 0.3054F, 0.1745F);
		cube_r13.cubeList.add(new ModelBox(cube_r13, 50, 38, -3.0F, 0.0F, 0.0F, 4, 0, 2, 0.0F, false));

		cube_r14 = new ModelRenderer(this);
		cube_r14.setRotationPoint(-0.875F, 7.0939F, -2.9679F);
		right_arm.addChild(cube_r14);
		setRotationAngle(cube_r14, -1.2217F, 0.3054F, 0.1745F);
		cube_r14.cubeList.add(new ModelBox(cube_r14, 45, 33, -3.0F, -2.0F, -1.0F, 4, 2, 2, 0.0F, false));

		cube_r15 = new ModelRenderer(this);
		cube_r15.setRotationPoint(0.325F, 6.165F, -0.9515F);
		right_arm.addChild(cube_r15);
		setRotationAngle(cube_r15, -0.4363F, 0.3054F, 0.0F);
		cube_r15.cubeList.add(new ModelBox(cube_r15, 43, 4, -3.0F, -2.0F, -1.0F, 3, 3, 3, 0.0F, false));

		cube_r16 = new ModelRenderer(this);
		cube_r16.setRotationPoint(0.325F, 3.775F, -0.2F);
		right_arm.addChild(cube_r16);
		setRotationAngle(cube_r16, 0.0F, 0.2618F, 0.0F);
		cube_r16.cubeList.add(new ModelBox(cube_r16, 26, 44, -3.0F, -2.0F, -1.0F, 3, 3, 3, 0.0F, false));

		cube_r17 = new ModelRenderer(this);
		cube_r17.setRotationPoint(1.025F, 0.775F, -0.75F);
		right_arm.addChild(cube_r17);
		setRotationAngle(cube_r17, 0.2618F, 0.2182F, 0.0F);
		cube_r17.cubeList.add(new ModelBox(cube_r17, 15, 35, -4.0F, -2.0F, -1.0F, 4, 4, 4, 0.0F, false));

		left_leg = new ModelRenderer(this);
		left_leg.setRotationPoint(2.05F, 6.5F, 2.0F);
		yeti.addChild(left_leg);
		setRotationAngle(left_leg, 0.0F, 0.1047F, 0.0F);
		

		cube_r18 = new ModelRenderer(this);
		cube_r18.setRotationPoint(-0.6778F, 6.0104F, -1.3841F);
		left_leg.addChild(cube_r18);
		setRotationAngle(cube_r18, 0.3054F, 0.0F, 0.0F);
		cube_r18.cubeList.add(new ModelBox(cube_r18, 13, 44, 0.0F, -3.0F, 0.0F, 3, 4, 3, 0.0F, false));

		cube_r19 = new ModelRenderer(this);
		cube_r19.setRotationPoint(0.3222F, 9.25F, -1.5399F);
		left_leg.addChild(cube_r19);
		setRotationAngle(cube_r19, 0.0F, -0.1745F, 0.0F);
		cube_r19.cubeList.add(new ModelBox(cube_r19, 42, 28, -1.0F, -3.0F, -1.0F, 4, 1, 3, 0.0F, false));

		cube_r20 = new ModelRenderer(this);
		cube_r20.setRotationPoint(-0.4278F, 5.45F, -1.9399F);
		left_leg.addChild(cube_r20);
		setRotationAngle(cube_r20, -0.2182F, -0.1745F, 0.0F);
		cube_r20.cubeList.add(new ModelBox(cube_r20, 42, 20, -1.0F, -6.0F, -1.0F, 4, 4, 3, 0.0F, false));

		right_leg = new ModelRenderer(this);
		right_leg.setRotationPoint(-2.15F, 6.5F, 2.0F);
		yeti.addChild(right_leg);
		setRotationAngle(right_leg, 0.0F, -0.0873F, 0.0F);
		

		cube_r21 = new ModelRenderer(this);
		cube_r21.setRotationPoint(0.8F, 6.0104F, -1.3442F);
		right_leg.addChild(cube_r21);
		setRotationAngle(cube_r21, 0.3054F, 0.0F, 0.0F);
		cube_r21.cubeList.add(new ModelBox(cube_r21, 0, 44, -3.0F, -3.0F, 0.0F, 3, 4, 3, 0.0F, false));

		cube_r22 = new ModelRenderer(this);
		cube_r22.setRotationPoint(-0.2F, 9.25F, -1.5F);
		right_leg.addChild(cube_r22);
		setRotationAngle(cube_r22, 0.0F, 0.1745F, 0.0F);
		cube_r22.cubeList.add(new ModelBox(cube_r22, 19, 17, -3.0F, -3.0F, -1.0F, 4, 1, 3, 0.0F, false));

		cube_r23 = new ModelRenderer(this);
		cube_r23.setRotationPoint(0.55F, 5.45F, -1.9F);
		right_leg.addChild(cube_r23);
		setRotationAngle(cube_r23, -0.2182F, 0.2182F, 0.0F);
		cube_r23.cubeList.add(new ModelBox(cube_r23, 0, 36, -3.0F, -6.0F, -1.0F, 4, 4, 3, 0.0F, false));
	}

	@Override
	public void render(Entity entity, float f, float f1, float f2, float f3, float f4, float f5) {
		yeti.render(f5);
	}

	public void setRotationAngle(ModelRenderer modelRenderer, float x, float y, float z) {
		modelRenderer.rotateAngleX = x;
		modelRenderer.rotateAngleY = y;
		modelRenderer.rotateAngleZ = z;
	}
}