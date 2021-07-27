// Made with Blockbench 3.7.4
// Exported for Minecraft version 1.12
// Paste this class into your mod and generate all required imports


public class niffler extends ModelBase {
	private final ModelRenderer Cialko;
	private final ModelRenderer Tors;
	private final ModelRenderer Glowa;
	private final ModelRenderer pysk;
	private final ModelRenderer bone;
	private final ModelRenderer szyja;
	private final ModelRenderer brzuchsrodek;
	private final ModelRenderer brzuchpodstawa;
	private final ModelRenderer Torba;
	private final ModelRenderer Brzuchpodstawa2;
	private final ModelRenderer cube_r1;
	private final ModelRenderer DUPA;
	private final ModelRenderer ogonek2;
	private final ModelRenderer ogonek1;
	private final ModelRenderer konczyny;
	private final ModelRenderer Gora;
	private final ModelRenderer PrawaLapaGora;
	private final ModelRenderer Ramie2;
	private final ModelRenderer Przedramie2;
	private final ModelRenderer Lapa;
	private final ModelRenderer LewaLapaGora;
	private final ModelRenderer Ramie;
	private final ModelRenderer Przedramie;
	private final ModelRenderer Lapa2;
	private final ModelRenderer Dol;
	private final ModelRenderer PrawaLapaDol;
	private final ModelRenderer Udo2;
	private final ModelRenderer Lydka2;
	private final ModelRenderer Stopa2;
	private final ModelRenderer LewaLapaDol;
	private final ModelRenderer Udo;
	private final ModelRenderer Lydka;
	private final ModelRenderer Stopa;

	public niffler() {
		textureWidth = 64;
		textureHeight = 64;

		Cialko = new ModelRenderer(this);
		Cialko.setRotationPoint(0.0F, 14.0F, 3.0F);
		setRotationAngle(Cialko, 1.5708F, 3.1416F, 0.0F);
		

		Tors = new ModelRenderer(this);
		Tors.setRotationPoint(0.0F, 2.0F, -3.0F);
		Cialko.addChild(Tors);
		

		Glowa = new ModelRenderer(this);
		Glowa.setRotationPoint(-0.5F, -7.0F, -1.0F);
		Tors.addChild(Glowa);
		setRotationAngle(Glowa, -1.2654F, 0.0F, 0.0F);
		Glowa.cubeList.add(new ModelBox(Glowa, 31, 22, -3.0F, -1.8F, -4.0F, 7, 4, 7, 0.0F, false));

		pysk = new ModelRenderer(this);
		pysk.setRotationPoint(1.0F, 2.0F, -5.0F);
		Glowa.addChild(pysk);
		pysk.cubeList.add(new ModelBox(pysk, 38, 42, -3.0F, -1.8F, -3.0F, 5, 2, 4, 0.0F, false));

		bone = new ModelRenderer(this);
		bone.setRotationPoint(0.0F, -0.2F, 1.4F);
		pysk.addChild(bone);
		setRotationAngle(bone, 0.1309F, 0.0F, 0.0F);
		bone.cubeList.add(new ModelBox(bone, 29, 0, -3.0F, -2.1606F, -4.1535F, 5, 1, 5, 0.0F, false));

		szyja = new ModelRenderer(this);
		szyja.setRotationPoint(0.0F, -2.7F, -0.8F);
		Tors.addChild(szyja);
		setRotationAngle(szyja, 0.3491F, 0.0F, 0.0F);
		szyja.cubeList.add(new ModelBox(szyja, 0, 29, -4.0F, -3.7412F, -3.9087F, 8, 6, 8, 0.0F, false));

		brzuchsrodek = new ModelRenderer(this);
		brzuchsrodek.setRotationPoint(-1.0F, 0.4F, 0.2F);
		Tors.addChild(brzuchsrodek);
		brzuchsrodek.cubeList.add(new ModelBox(brzuchsrodek, 0, 15, -4.0F, -2.3767F, -5.3829F, 10, 5, 9, 0.0F, false));

		brzuchpodstawa = new ModelRenderer(this);
		brzuchpodstawa.setRotationPoint(0.0F, 5.0F, -1.0F);
		Tors.addChild(brzuchpodstawa);
		setRotationAngle(brzuchpodstawa, -0.3491F, 0.0F, 0.0F);
		brzuchpodstawa.cubeList.add(new ModelBox(brzuchpodstawa, 0, 0, -5.0F, -3.5051F, -5.1495F, 10, 6, 9, 0.0F, false));

		Torba = new ModelRenderer(this);
		Torba.setRotationPoint(11.0F, 4.7551F, -16.5731F);
		brzuchpodstawa.addChild(Torba);
		setRotationAngle(Torba, -1.309F, 0.0F, 0.0F);
		Torba.cubeList.add(new ModelBox(Torba, 29, 18, -14.5F, -12.6517F, -2.4242F, 7, 1, 3, 0.0F, false));

		Brzuchpodstawa2 = new ModelRenderer(this);
		Brzuchpodstawa2.setRotationPoint(-1.0F, 2.8191F, 1.0261F);
		brzuchpodstawa.addChild(Brzuchpodstawa2);
		setRotationAngle(Brzuchpodstawa2, 0.3491F, 0.0F, 0.0F);
		

		cube_r1 = new ModelRenderer(this);
		cube_r1.setRotationPoint(6.0F, 1.0F, -7.0F);
		Brzuchpodstawa2.addChild(cube_r1);
		setRotationAngle(cube_r1, -0.1745F, 0.0F, 0.0F);
		cube_r1.cubeList.add(new ModelBox(cube_r1, 30, 7, -9.0F, -3.4168F, 1.3078F, 8, 3, 8, 0.0F, false));

		DUPA = new ModelRenderer(this);
		DUPA.setRotationPoint(-1.0F, 11.6F, -1.0F);
		Tors.addChild(DUPA);
		setRotationAngle(DUPA, -1.8326F, 0.0F, 0.0F);
		

		ogonek2 = new ModelRenderer(this);
		ogonek2.setRotationPoint(-1.0F, 1.0F, -12.0F);
		DUPA.addChild(ogonek2);
		setRotationAngle(ogonek2, -0.2182F, 0.0F, 0.0F);
		ogonek2.cubeList.add(new ModelBox(ogonek2, 26, 42, 0.0F, -4.2229F, 8.428F, 3, 1, 6, 0.0F, false));

		ogonek1 = new ModelRenderer(this);
		ogonek1.setRotationPoint(1.0F, 3.0F, -7.0F);
		DUPA.addChild(ogonek1);
		ogonek1.cubeList.add(new ModelBox(ogonek1, 32, 33, -2.0F, -3.0F, 4.0F, 3, 1, 8, 0.0F, false));

		konczyny = new ModelRenderer(this);
		konczyny.setRotationPoint(0.0F, 4.0F, -4.0F);
		Cialko.addChild(konczyny);
		

		Gora = new ModelRenderer(this);
		Gora.setRotationPoint(0.0F, -5.0F, 0.0F);
		konczyny.addChild(Gora);
		setRotationAngle(Gora, -0.3491F, 0.0F, 0.0F);
		

		PrawaLapaGora = new ModelRenderer(this);
		PrawaLapaGora.setRotationPoint(-5.0F, 0.0F, 0.0F);
		Gora.addChild(PrawaLapaGora);
		setRotationAngle(PrawaLapaGora, 0.7854F, 0.0F, 0.0F);
		

		Ramie2 = new ModelRenderer(this);
		Ramie2.setRotationPoint(1.0F, 0.0F, -4.2426F);
		PrawaLapaGora.addChild(Ramie2);
		Ramie2.cubeList.add(new ModelBox(Ramie2, 40, 48, -2.0F, -1.8787F, 2.1213F, 2, 4, 4, 0.0F, false));

		Przedramie2 = new ModelRenderer(this);
		Przedramie2.setRotationPoint(0.0F, 1.4142F, -1.4142F);
		Ramie2.addChild(Przedramie2);
		setRotationAngle(Przedramie2, -0.5236F, 0.0F, 0.0F);
		Przedramie2.cubeList.add(new ModelBox(Przedramie2, 16, 44, -1.75F, -4.1554F, -1.5846F, 2, 3, 5, 0.0F, false));

		Lapa = new ModelRenderer(this);
		Lapa.setRotationPoint(-0.2F, 3.8184F, -5.2326F);
		PrawaLapaGora.addChild(Lapa);
		setRotationAngle(Lapa, -0.5236F, 0.0F, 0.0F);
		Lapa.cubeList.add(new ModelBox(Lapa, 0, 3, -0.6F, -6.6487F, -3.5716F, 2, 3, 1, 0.0F, false));

		LewaLapaGora = new ModelRenderer(this);
		LewaLapaGora.setRotationPoint(5.0F, 0.0F, 0.0F);
		Gora.addChild(LewaLapaGora);
		setRotationAngle(LewaLapaGora, 0.7854F, 0.0F, 0.0F);
		

		Ramie = new ModelRenderer(this);
		Ramie.setRotationPoint(1.0F, 0.0F, -4.2426F);
		LewaLapaGora.addChild(Ramie);
		Ramie.cubeList.add(new ModelBox(Ramie, 40, 48, -2.0F, -1.8787F, 2.1213F, 2, 4, 4, 0.0F, false));

		Przedramie = new ModelRenderer(this);
		Przedramie.setRotationPoint(0.0F, 1.4142F, -1.4142F);
		Ramie.addChild(Przedramie);
		setRotationAngle(Przedramie, -0.5236F, 0.0F, 0.0F);
		Przedramie.cubeList.add(new ModelBox(Przedramie, 16, 44, -2.25F, -4.1554F, -1.5846F, 2, 3, 5, 0.0F, false));
		Przedramie.cubeList.add(new ModelBox(Przedramie, 0, 3, -2.2F, -4.6263F, -2.2539F, 2, 3, 1, 0.0F, false));

		Lapa2 = new ModelRenderer(this);
		Lapa2.setRotationPoint(-20.8F, 1.5076F, 4.8056F);
		Przedramie.addChild(Lapa2);
		

		Dol = new ModelRenderer(this);
		Dol.setRotationPoint(0.0F, 4.0F, 0.0F);
		konczyny.addChild(Dol);
		

		PrawaLapaDol = new ModelRenderer(this);
		PrawaLapaDol.setRotationPoint(-5.0F, 1.0F, 1.3F);
		Dol.addChild(PrawaLapaDol);
		setRotationAngle(PrawaLapaDol, 0.0F, 0.1309F, 0.0F);
		

		Udo2 = new ModelRenderer(this);
		Udo2.setRotationPoint(-0.3109F, -1.0F, -0.657F);
		PrawaLapaDol.addChild(Udo2);
		Udo2.cubeList.add(new ModelBox(Udo2, 0, 43, -0.5251F, -1.3386F, -2.8562F, 4, 4, 4, 0.0F, false));

		Lydka2 = new ModelRenderer(this);
		Lydka2.setRotationPoint(1.527F, 0.0F, -3.9028F);
		PrawaLapaDol.addChild(Lydka2);
		Lydka2.cubeList.add(new ModelBox(Lydka2, 46, 33, -1.859F, -1.3386F, -2.9426F, 3, 3, 4, 0.0F, false));

		Stopa2 = new ModelRenderer(this);
		Stopa2.setRotationPoint(1.4628F, 0.8071F, -6.7678F);
		PrawaLapaDol.addChild(Stopa2);
		setRotationAngle(Stopa2, 0.0F, 0.0F, 1.5708F);
		Stopa2.cubeList.add(new ModelBox(Stopa2, 0, 0, -2.6457F, -0.7691F, -0.8723F, 3, 2, 1, 0.0F, false));

		LewaLapaDol = new ModelRenderer(this);
		LewaLapaDol.setRotationPoint(4.4F, 1.0F, 1.1F);
		Dol.addChild(LewaLapaDol);
		setRotationAngle(LewaLapaDol, 0.0F, -0.1309F, 0.0F);
		

		Udo = new ModelRenderer(this);
		Udo.setRotationPoint(0.0027F, -1.0F, -0.736F);
		LewaLapaDol.addChild(Udo);
		Udo.cubeList.add(new ModelBox(Udo, 0, 43, -2.5169F, -1.3386F, -3.0255F, 4, 4, 4, 0.0F, false));

		Lydka = new ModelRenderer(this);
		Lydka.setRotationPoint(-0.5535F, 1.0F, -3.7261F);
		LewaLapaDol.addChild(Lydka);
		Lydka.cubeList.add(new ModelBox(Lydka, 46, 33, -1.5169F, -2.3386F, -3.0255F, 3, 3, 4, 0.0F, false));

		Stopa = new ModelRenderer(this);
		Stopa.setRotationPoint(-0.24F, 0.8071F, -6.6146F);
		LewaLapaDol.addChild(Stopa);
		setRotationAngle(Stopa, 0.0F, 0.0F, 1.5708F);
		Stopa.cubeList.add(new ModelBox(Stopa, 0, 0, -2.6239F, -0.6114F, -0.9492F, 3, 2, 1, 0.0F, false));
	}

	@Override
	public void render(Entity entity, float f, float f1, float f2, float f3, float f4, float f5) {
		Cialko.render(f5);
	}

	public void setRotationAngle(ModelRenderer modelRenderer, float x, float y, float z) {
		modelRenderer.rotateAngleX = x;
		modelRenderer.rotateAngleY = y;
		modelRenderer.rotateAngleZ = z;
	}
}