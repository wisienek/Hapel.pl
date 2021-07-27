public class miotla1 extends ModelBase {
	private final ModelRenderer trzonek;
	private final ModelRenderer nogi;
	private final ModelRenderer siedzenie;
	private final ModelRenderer welna;
	private final ModelRenderer zloto;

	public miotla1() {
		textureWidth = 80;
		textureHeight = 80;

		trzonek = new ModelRenderer(this);
		trzonek.setRotationPoint(-8.0F, 16.0F, 8.0F);
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 5.0F, -5.0F, 2, 3, 2, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 5.0F, -7.0F, 2, 2, 2, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 4.0F, -14.0F, 2, 1, 1, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 3.0F, -19.0F, 2, 1, 6, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 2.0F, -16.0F, 2, 1, 3, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 1.0F, -25.0F, 2, 2, 9, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 0.0F, -29.0F, 2, 1, 9, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 1.0F, -29.0F, 2, 1, 4, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 5.0F, -12.0F, 2, 1, 5, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 1.0F, -30.0F, 2, 1, 1, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 7.0F, 5.0F, -13.0F, 1, 1, 1, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 9, 11, 8.0F, 4.0F, -15.0F, 1, 1, 1, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 0, 3, 6.0F, 6.0F, -3.0F, 4, 2, 3, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 0, 3, 7.0F, 8.0F, -2.0F, 2, 1, 2, 0.0F, false));
		trzonek.cubeList.add(new ModelBox(trzonek, 0, 3, 7.0F, 5.0F, -1.0F, 2, 1, 1, 0.0F, false));

		nogi = new ModelRenderer(this);
		nogi.setRotationPoint(-8.0F, 16.0F, 8.0F);
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 9.0F, 7.0F, -4.0F, 4, 1, 1, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 13.0F, 9.0F, 3.0F, 2, 1, 1, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 1.0F, 9.0F, 3.0F, 2, 1, 1, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 17.0F, 9.0F, 3.0F, 2, 1, 1, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, -3.0F, 9.0F, 3.0F, 2, 1, 1, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 18.0F, 9.0F, 1.0F, 1, 1, 2, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, -3.0F, 9.0F, 1.0F, 1, 1, 2, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 14.0F, 9.0F, 4.0F, 4, 1, 1, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, -2.0F, 9.0F, 4.0F, 4, 1, 1, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 3.0F, 7.0F, -4.0F, 4, 1, 1, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 12.0F, 7.0F, -3.0F, 1, 1, 2, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 3.0F, 7.0F, -3.0F, 1, 1, 2, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 13.0F, 8.0F, -1.0F, 1, 1, 5, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 2.0F, 8.0F, -1.0F, 1, 1, 5, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 13.0F, 7.0F, -2.0F, 1, 2, 1, 0.0F, false));
		nogi.cubeList.add(new ModelBox(nogi, 32, 36, 2.0F, 7.0F, -2.0F, 1, 2, 1, 0.0F, false));

		siedzenie = new ModelRenderer(this);
		siedzenie.setRotationPoint(-8.0F, 16.0F, 8.0F);
		siedzenie.cubeList.add(new ModelBox(siedzenie, 64, 66, 9.0F, 5.0F, -9.0F, 1, 1, 4, 0.0F, false));
		siedzenie.cubeList.add(new ModelBox(siedzenie, 64, 66, 6.0F, 5.0F, -9.0F, 1, 1, 4, 0.0F, false));
		siedzenie.cubeList.add(new ModelBox(siedzenie, 64, 66, 9.0F, 4.0F, -13.0F, 1, 1, 4, 0.0F, false));
		siedzenie.cubeList.add(new ModelBox(siedzenie, 64, 66, 7.0F, 3.0F, -13.0F, 2, 2, 4, 0.0F, false));
		siedzenie.cubeList.add(new ModelBox(siedzenie, 64, 66, 7.0F, 4.0F, -9.0F, 2, 1, 4, 0.0F, false));
		siedzenie.cubeList.add(new ModelBox(siedzenie, 64, 66, 6.0F, 4.0F, -13.0F, 1, 1, 4, 0.0F, false));

		welna = new ModelRenderer(this);
		welna.setRotationPoint(-8.0F, 16.0F, 8.0F);
		welna.cubeList.add(new ModelBox(welna, 0, 58, 7.0F, 4.0F, 0.0F, 2, 6, 16, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 7.0F, 3.0F, 2.0F, 2, 1, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 7.0F, 3.0F, 3.0F, 2, 1, 2, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 10.0F, 6.0F, 3.0F, 1, 2, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 5.0F, 6.0F, 3.0F, 1, 2, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 10.0F, 6.0F, 12.0F, 1, 2, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 5.0F, 6.0F, 12.0F, 1, 2, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 6.0F, 5.0F, 14.0F, 1, 4, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 9.0F, 5.0F, 14.0F, 1, 4, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 9.0F, 6.0F, 15.0F, 1, 2, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 6.0F, 6.0F, 15.0F, 1, 2, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 10.0F, 5.0F, 4.0F, 1, 4, 8, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 5.0F, 5.0F, 4.0F, 1, 4, 8, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 7.0F, 3.0F, 13.0F, 2, 1, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 7.0F, 10.0F, 13.0F, 2, 1, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 7.0F, 6.0F, 16.0F, 2, 2, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 7.0F, 2.0F, 7.0F, 2, 1, 5, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 10.0F, 4.0F, 6.0F, 1, 1, 4, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 5.0F, 4.0F, 6.0F, 1, 1, 4, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 10.0F, 9.0F, 6.0F, 1, 1, 4, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 5.0F, 9.0F, 6.0F, 1, 1, 4, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 6.0F, 3.0F, 5.0F, 4, 1, 8, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 7.0F, 10.0F, 2.0F, 2, 1, 1, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 6.0F, 10.0F, 3.0F, 4, 1, 10, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 7.0F, 11.0F, 4.0F, 2, 1, 8, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 6.0F, 6.0F, 0.0F, 1, 2, 2, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 9.0F, 6.0F, 0.0F, 1, 2, 2, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 9.0F, 4.0F, 2.0F, 1, 6, 12, 0.0F, false));
		welna.cubeList.add(new ModelBox(welna, 0, 58, 6.0F, 4.0F, 2.0F, 1, 6, 12, 0.0F, false));

		zloto = new ModelRenderer(this);
		zloto.setRotationPoint(0.0F, 24.0F, 0.0F);
		zloto.cubeList.add(new ModelBox(zloto, 63, 11, -1.0F, -4.0F, 7.0F, 2, 1, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 63, 11, -1.0F, -5.0F, 8.0F, 2, 1, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 71, 13, -1.0F, 2.0F, 8.0F, 2, 1, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 57, 7, -1.0F, 3.0F, 10.0F, 2, 1, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 72, 8, -1.0F, -6.0F, 10.0F, 2, 1, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 63, 11, 1.0F, 2.0F, 10.0F, 1, 1, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 69, 14, 1.0F, -5.0F, 10.0F, 1, 1, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 63, 11, -2.0F, -5.0F, 10.0F, 1, 1, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 63, 11, -2.0F, 2.0F, 10.0F, 1, 1, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 63, 16, 1.0F, -4.0F, 8.0F, 1, 2, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 60, 17, -2.0F, -4.0F, 8.0F, 1, 2, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 63, 11, 2.0F, -2.0F, 8.0F, 1, 2, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 63, 11, -3.0F, -2.0F, 8.0F, 1, 2, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 56, 17, -3.0F, -4.0F, 10.0F, 1, 6, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 70, 19, 2.0F, -4.0F, 10.0F, 1, 6, 1, 0.0F, true));
		zloto.cubeList.add(new ModelBox(zloto, 54, 6, 1.0F, 0.0F, 8.0F, 1, 2, 1, 0.0F, false));
		zloto.cubeList.add(new ModelBox(zloto, 60, 4, -2.0F, 0.0F, 8.0F, 1, 2, 1, 0.0F, false));
	}

	@Override
	public void render(Entity entity, float f, float f1, float f2, float f3, float f4, float f5) {
		trzonek.render(f5);
		nogi.render(f5);
		siedzenie.render(f5);
		welna.render(f5);
		zloto.render(f5);
	}

	public void setRotationAngle(ModelRenderer modelRenderer, float x, float y, float z) {
		modelRenderer.rotateAngleX = x;
		modelRenderer.rotateAngleY = y;
		modelRenderer.rotateAngleZ = z;
	}
}