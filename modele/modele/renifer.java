public class refiner extends ModelBase {
	private final ModelRenderer Cialko;
	private final ModelRenderer Cielskooo;
	private final ModelRenderer Leb;
	private final ModelRenderer cube_r1;
	private final ModelRenderer Glowa;
	private final ModelRenderer cube_r2;
	private final ModelRenderer Poroze;
	private final ModelRenderer cube_r3;
	private final ModelRenderer cube_r4;
	private final ModelRenderer cube_r5;
	private final ModelRenderer cube_r6;
	private final ModelRenderer cube_r7;
	private final ModelRenderer buziaiuszyska;
	private final ModelRenderer cube_r8;
	private final ModelRenderer cube_r9;
	private final ModelRenderer cube_r10;
	private final ModelRenderer szyja;
	private final ModelRenderer cube_r11;
	private final ModelRenderer brzuchsrodek;
	private final ModelRenderer Dupsko;
	private final ModelRenderer cube_r12;
	private final ModelRenderer Torba;
	private final ModelRenderer Brzuchpodstawa2;
	private final ModelRenderer cube_r13;
	private final ModelRenderer Ogon;
	private final ModelRenderer cube_r14;
	private final ModelRenderer cube_r15;
	private final ModelRenderer konczyny;
	private final ModelRenderer Nogiprzednie;
	private final ModelRenderer prawaprzednia;
	private final ModelRenderer cube_r16;
	private final ModelRenderer cube_r17;
	private final ModelRenderer cube_r18;
	private final ModelRenderer lewaprzednia;
	private final ModelRenderer cube_r19;
	private final ModelRenderer cube_r20;
	private final ModelRenderer Nogitylne;
	private final ModelRenderer prawatylnia;
	private final ModelRenderer cube_r21;
	private final ModelRenderer cube_r22;
	private final ModelRenderer cube_r23;
	private final ModelRenderer cube_r24;
	private final ModelRenderer lewatylnia;
	private final ModelRenderer cube_r25;
	private final ModelRenderer cube_r26;
	private final ModelRenderer cube_r27;
	private final ModelRenderer cube_r28;

	public refiner() {
		textureWidth = 115;
		textureHeight = 120;

		Cialko = new ModelRenderer(this);
		Cialko.setRotationPoint(0.0F, 8.5F, -3.0F);
		setRotationAngle(Cialko, 1.5708F, 0.0F, 0.0F);
		

		Cielskooo = new ModelRenderer(this);
		Cielskooo.setRotationPoint(0.0F, 2.0F, 1.0F);
		Cialko.addChild(Cielskooo);
		

		Leb = new ModelRenderer(this);
		Leb.setRotationPoint(0.5F, -7.0F, 2.0F);
		Cielskooo.addChild(Leb);
		setRotationAngle(Leb, -1.2654F, 0.0F, 0.0F);
		

		cube_r1 = new ModelRenderer(this);
		cube_r1.setRotationPoint(2.0F, 17.4595F, -8.8113F);
		Leb.addChild(cube_r1);
		setRotationAngle(cube_r1, -0.1309F, 0.0F, 0.0F);
		cube_r1.cubeList.add(new ModelBox(cube_r1, 31, 22, -6.0F, -22.5145F, 4.7279F, 7, 9, 5, 0.0F, false));

		Glowa = new ModelRenderer(this);
		Glowa.setRotationPoint(-0.6F, -6.3198F, 2.8659F);
		Leb.addChild(Glowa);
		

		cube_r2 = new ModelRenderer(this);
		cube_r2.setRotationPoint(0.6F, 24.5792F, -12.6771F);
		Glowa.addChild(cube_r2);
		setRotationAngle(cube_r2, -0.0436F, 0.0F, 0.0F);
		cube_r2.cubeList.add(new ModelBox(cube_r2, 38, 50, -3.0F, -28.0825F, 5.6618F, 5, 6, 8, 0.0F, false));

		Poroze = new ModelRenderer(this);
		Poroze.setRotationPoint(0.6F, 24.5792F, -12.6771F);
		Glowa.addChild(Poroze);
		

		cube_r3 = new ModelRenderer(this);
		cube_r3.setRotationPoint(0.0F, 0.0F, 0.0F);
		Poroze.addChild(cube_r3);
		setRotationAngle(cube_r3, 0.6981F, -1.1781F, 0.0F);
		cube_r3.cubeList.add(new ModelBox(cube_r3, 107, 116, 12.1189F, -16.3397F, 24.4541F, 1, 1, 3, 0.0F, false));
		cube_r3.cubeList.add(new ModelBox(cube_r3, 38, 42, 15.4908F, -16.9774F, 28.2254F, 1, 1, 3, 0.0F, false));

		cube_r4 = new ModelRenderer(this);
		cube_r4.setRotationPoint(0.0F, 0.0F, 0.0F);
		Poroze.addChild(cube_r4);
		setRotationAngle(cube_r4, 0.6981F, -0.6109F, 0.0F);
		cube_r4.cubeList.add(new ModelBox(cube_r4, 95, 110, 6.8354F, -13.3211F, 29.4549F, 1, 1, 9, 0.0F, false));

		cube_r5 = new ModelRenderer(this);
		cube_r5.setRotationPoint(0.0F, 0.0F, 0.0F);
		Poroze.addChild(cube_r5);
		setRotationAngle(cube_r5, 0.6981F, 0.0F, 0.0F);
		cube_r5.cubeList.add(new ModelBox(cube_r5, 95, 110, -3.0F, -12.6176F, 27.1653F, 1, 1, 9, 0.0F, false));
		cube_r5.cubeList.add(new ModelBox(cube_r5, 95, 110, 1.0F, -12.6176F, 27.1653F, 1, 1, 9, 0.0F, false));

		cube_r6 = new ModelRenderer(this);
		cube_r6.setRotationPoint(0.0F, 0.0F, 0.0F);
		Poroze.addChild(cube_r6);
		setRotationAngle(cube_r6, 0.6981F, 0.6545F, 0.0F);
		cube_r6.cubeList.add(new ModelBox(cube_r6, 95, 110, -9.2838F, -13.6425F, 29.0718F, 1, 1, 9, 0.0F, false));

		cube_r7 = new ModelRenderer(this);
		cube_r7.setRotationPoint(0.0F, 0.0F, 0.0F);
		Poroze.addChild(cube_r7);
		setRotationAngle(cube_r7, 0.6981F, 1.5272F, 0.0F);
		cube_r7.cubeList.add(new ModelBox(cube_r7, 38, 42, -18.6709F, -21.3223F, 22.5796F, 1, 1, 3, 0.0F, false));
		cube_r7.cubeList.add(new ModelBox(cube_r7, 107, 116, -15.9076F, -20.3122F, 20.2679F, 1, 1, 3, 0.0F, false));

		buziaiuszyska = new ModelRenderer(this);
		buziaiuszyska.setRotationPoint(0.1F, 1.1026F, -4.7776F);
		Glowa.addChild(buziaiuszyska);
		setRotationAngle(buziaiuszyska, 0.1309F, 0.0F, 0.0F);
		

		cube_r8 = new ModelRenderer(this);
		cube_r8.setRotationPoint(0.5F, 21.2376F, -9.3516F);
		buziaiuszyska.addChild(cube_r8);
		setRotationAngle(cube_r8, -0.0436F, 0.0F, 0.2618F);
		cube_r8.cubeList.add(new ModelBox(cube_r8, 0, 65, -4.4175F, -24.9821F, 12.0967F, 1, 2, 3, 0.0F, false));

		cube_r9 = new ModelRenderer(this);
		cube_r9.setRotationPoint(0.5F, 21.2376F, -9.3516F);
		buziaiuszyska.addChild(cube_r9);
		setRotationAngle(cube_r9, -0.0436F, 0.0F, -0.2182F);
		cube_r9.cubeList.add(new ModelBox(cube_r9, 0, 64, 1.5938F, -25.6971F, 12.0655F, 1, 2, 3, 0.0F, false));

		cube_r10 = new ModelRenderer(this);
		cube_r10.setRotationPoint(0.5F, 21.2376F, -9.3516F);
		buziaiuszyska.addChild(cube_r10);
		setRotationAngle(cube_r10, -0.0436F, 0.0F, 0.0F);
		cube_r10.cubeList.add(new ModelBox(cube_r10, 29, 0, -1.0F, -23.4235F, 4.563F, 1, 1, 1, 0.0F, false));
		cube_r10.cubeList.add(new ModelBox(cube_r10, 0, 11, -3.0F, -23.1931F, 4.7215F, 5, 3, 5, 0.0F, false));

		szyja = new ModelRenderer(this);
		szyja.setRotationPoint(0.0F, -2.7F, -13.8F);
		Cielskooo.addChild(szyja);
		setRotationAngle(szyja, 0.3491F, 0.0F, 0.0F);
		

		cube_r11 = new ModelRenderer(this);
		cube_r11.setRotationPoint(5.0F, 3.244F, -8.63F);
		szyja.addChild(cube_r11);
		setRotationAngle(cube_r11, -0.6981F, 0.0F, 0.0F);
		cube_r11.cubeList.add(new ModelBox(cube_r11, 81, 68, -9.0F, -16.3515F, 12.2077F, 8, 6, 9, 0.0F, false));

		brzuchsrodek = new ModelRenderer(this);
		brzuchsrodek.setRotationPoint(-1.0F, 0.4F, -12.8F);
		Cielskooo.addChild(brzuchsrodek);
		brzuchsrodek.cubeList.add(new ModelBox(brzuchsrodek, 77, 53, -4.0F, -2.3767F, 6.6171F, 10, 5, 9, 0.0F, false));

		Dupsko = new ModelRenderer(this);
		Dupsko.setRotationPoint(0.0F, 5.0F, -14.0F);
		Cielskooo.addChild(Dupsko);
		setRotationAngle(Dupsko, -0.3491F, 0.0F, 0.0F);
		

		cube_r12 = new ModelRenderer(this);
		cube_r12.setRotationPoint(5.0F, 6.1529F, -5.2098F);
		Dupsko.addChild(cube_r12);
		setRotationAngle(cube_r12, 0.5236F, 0.0F, 0.0F);
		cube_r12.cubeList.add(new ModelBox(cube_r12, 77, 0, -10.0F, -3.8571F, 15.6826F, 10, 6, 9, 0.0F, false));

		Torba = new ModelRenderer(this);
		Torba.setRotationPoint(11.0F, 4.7551F, -16.5731F);
		Dupsko.addChild(Torba);
		setRotationAngle(Torba, -1.309F, 0.0F, 0.0F);
		

		Brzuchpodstawa2 = new ModelRenderer(this);
		Brzuchpodstawa2.setRotationPoint(-1.0F, 2.8191F, 1.0261F);
		Dupsko.addChild(Brzuchpodstawa2);
		setRotationAngle(Brzuchpodstawa2, 0.3491F, 0.0F, 0.0F);
		

		cube_r13 = new ModelRenderer(this);
		cube_r13.setRotationPoint(6.0F, 1.0F, -7.0F);
		Brzuchpodstawa2.addChild(cube_r13);
		setRotationAngle(cube_r13, -0.1745F, 0.0F, 0.0F);
		cube_r13.cubeList.add(new ModelBox(cube_r13, 77, 24, -10.0F, -7.0215F, 15.0799F, 10, 4, 9, 0.0F, false));

		Ogon = new ModelRenderer(this);
		Ogon.setRotationPoint(0.0F, 9.8F, 1.4F);
		Cielskooo.addChild(Ogon);
		setRotationAngle(Ogon, -1.8326F, 0.0F, 0.0F);
		

		cube_r14 = new ModelRenderer(this);
		cube_r14.setRotationPoint(0.0F, -0.0717F, -0.2054F);
		Ogon.addChild(cube_r14);
		setRotationAngle(cube_r14, -0.2182F, 0.0F, 0.0F);
		cube_r14.cubeList.add(new ModelBox(cube_r14, 10, 66, -1.0F, -0.6384F, -1.9608F, 2, 1, 4, 0.0F, false));

		cube_r15 = new ModelRenderer(this);
		cube_r15.setRotationPoint(0.0F, -0.0717F, -0.2054F);
		Ogon.addChild(cube_r15);
		setRotationAngle(cube_r15, 0.3927F, 0.0F, 0.0F);
		cube_r15.cubeList.add(new ModelBox(cube_r15, 10, 68, -1.0F, 0.7018F, 1.7177F, 2, 1, 2, 0.0F, false));

		konczyny = new ModelRenderer(this);
		konczyny.setRotationPoint(0.0F, 1.0F, -3.0F);
		Cialko.addChild(konczyny);
		

		Nogiprzednie = new ModelRenderer(this);
		Nogiprzednie.setRotationPoint(0.4F, -6.0F, 2.0F);
		konczyny.addChild(Nogiprzednie);
		setRotationAngle(Nogiprzednie, 0.4363F, 0.0F, 0.0F);
		

		prawaprzednia = new ModelRenderer(this);
		prawaprzednia.setRotationPoint(-4.6F, 0.331F, 0.0165F);
		Nogiprzednie.addChild(prawaprzednia);
		

		cube_r16 = new ModelRenderer(this);
		cube_r16.setRotationPoint(9.2F, -1.8993F, -12.3549F);
		prawaprzednia.addChild(cube_r16);
		setRotationAngle(cube_r16, 0.0F, 0.0436F, 0.0F);
		cube_r16.cubeList.add(new ModelBox(cube_r16, 64, 92, -11.0553F, 0.4829F, 5.2617F, 2, 3, 8, 0.0F, false));

		cube_r17 = new ModelRenderer(this);
		cube_r17.setRotationPoint(10.2F, -0.363F, -18.2395F);
		prawaprzednia.addChild(cube_r17);
		setRotationAngle(cube_r17, -0.5672F, 0.0F, 0.0F);
		cube_r17.cubeList.add(new ModelBox(cube_r17, 17, 40, -11.55F, -7.4784F, 2.0086F, 2, 2, 8, 0.0F, false));

		cube_r18 = new ModelRenderer(this);
		cube_r18.setRotationPoint(-1.0F, 1.9312F, -19.0742F);
		prawaprzednia.addChild(cube_r18);
		setRotationAngle(cube_r18, -0.5236F, 0.0F, 0.0F);
		cube_r18.cubeList.add(new ModelBox(cube_r18, 0, 3, -0.3F, -10.3677F, 1.0451F, 2, 3, 1, 0.0F, false));

		lewaprzednia = new ModelRenderer(this);
		lewaprzednia.setRotationPoint(4.6F, 0.331F, 0.0165F);
		Nogiprzednie.addChild(lewaprzednia);
		lewaprzednia.cubeList.add(new ModelBox(lewaprzednia, 65, 92, -1.0F, -1.4165F, -7.092F, 2, 3, 8, 0.0F, false));

		cube_r19 = new ModelRenderer(this);
		cube_r19.setRotationPoint(1.0F, -0.363F, -18.2395F);
		lewaprzednia.addChild(cube_r19);
		setRotationAngle(cube_r19, -0.5672F, 0.0F, 0.0F);
		cube_r19.cubeList.add(new ModelBox(cube_r19, 18, 39, -2.25F, -7.4784F, 2.0086F, 2, 2, 8, 0.0F, false));

		cube_r20 = new ModelRenderer(this);
		cube_r20.setRotationPoint(-10.2F, 1.9312F, -19.0742F);
		lewaprzednia.addChild(cube_r20);
		setRotationAngle(cube_r20, -0.5236F, 0.0F, 0.0F);
		cube_r20.cubeList.add(new ModelBox(cube_r20, 0, 3, 9.0F, -10.3677F, 1.0451F, 2, 3, 1, 0.0F, false));

		Nogitylne = new ModelRenderer(this);
		Nogitylne.setRotationPoint(-0.4F, 8.0F, 4.3F);
		konczyny.addChild(Nogitylne);
		setRotationAngle(Nogitylne, 0.0F, 0.1309F, 0.0F);
		

		prawatylnia = new ModelRenderer(this);
		prawatylnia.setRotationPoint(-4.2537F, -0.5F, -2.2709F);
		Nogitylne.addChild(prawatylnia);
		

		cube_r21 = new ModelRenderer(this);
		cube_r21.setRotationPoint(-0.1164F, 1.5F, -14.4387F);
		prawatylnia.addChild(cube_r21);
		setRotationAngle(cube_r21, 0.1309F, 0.0F, 0.0F);
		cube_r21.cubeList.add(new ModelBox(cube_r21, 93, 38, -1.0266F, -2.3557F, 9.335F, 4, 6, 7, 0.0F, false));

		cube_r22 = new ModelRenderer(this);
		cube_r22.setRotationPoint(-0.5862F, 1.5F, -14.2677F);
		prawatylnia.addChild(cube_r22);
		setRotationAngle(cube_r22, 0.1309F, -0.0436F, 0.0F);
		cube_r22.cubeList.add(new ModelBox(cube_r22, 51, 93, -0.0527F, -0.0969F, 4.8149F, 3, 3, 7, 0.0F, false));

		cube_r23 = new ModelRenderer(this);
		cube_r23.setRotationPoint(-0.5862F, 1.5F, -14.2677F);
		prawatylnia.addChild(cube_r23);
		setRotationAngle(cube_r23, -0.1745F, -0.0873F, 0.0F);
		cube_r23.cubeList.add(new ModelBox(cube_r23, 45, 78, 0.3565F, -1.2023F, -1.3049F, 3, 2, 8, 0.0F, false));

		cube_r24 = new ModelRenderer(this);
		cube_r24.setRotationPoint(10.6847F, -2.1627F, -17.6019F);
		prawatylnia.addChild(cube_r24);
		setRotationAngle(cube_r24, -0.0873F, 0.0F, 1.5708F);
		cube_r24.cubeList.add(new ModelBox(cube_r24, 0, 0, 1.8242F, 7.612F, 2.7594F, 3, 3, 1, 0.0F, false));

		lewatylnia = new ModelRenderer(this);
		lewatylnia.setRotationPoint(5.1538F, -0.0627F, -0.9779F);
		Nogitylne.addChild(lewatylnia);
		

		cube_r25 = new ModelRenderer(this);
		cube_r25.setRotationPoint(1.2772F, -2.6F, -18.8949F);
		lewatylnia.addChild(cube_r25);
		setRotationAngle(cube_r25, -0.1745F, 0.0F, 1.5708F);
		cube_r25.cubeList.add(new ModelBox(cube_r25, 0, 0, 1.8242F, -2.7654F, 3.2872F, 3, 3, 1, 0.0F, false));

		cube_r26 = new ModelRenderer(this);
		cube_r26.setRotationPoint(-9.9937F, 1.0627F, -15.5607F);
		lewatylnia.addChild(cube_r26);
		setRotationAngle(cube_r26, -0.1745F, -0.1745F, 0.0F);
		cube_r26.cubeList.add(new ModelBox(cube_r26, 52, 85, 10.1986F, -1.3592F, -1.415F, 3, 2, 9, 0.0F, false));

		cube_r27 = new ModelRenderer(this);
		cube_r27.setRotationPoint(-9.5239F, 1.0627F, -15.7317F);
		lewatylnia.addChild(cube_r27);
		setRotationAngle(cube_r27, 0.1309F, -0.2618F, 0.0F);
		cube_r27.cubeList.add(new ModelBox(cube_r27, 0, 29, 10.2181F, -2.6279F, 7.2672F, 4, 6, 7, 0.0F, false));

		cube_r28 = new ModelRenderer(this);
		cube_r28.setRotationPoint(-9.9937F, 1.0627F, -15.5607F);
		lewatylnia.addChild(cube_r28);
		setRotationAngle(cube_r28, 0.1309F, -0.1745F, 0.0F);
		cube_r28.cubeList.add(new ModelBox(cube_r28, 46, 33, 10.2366F, -0.233F, 3.7808F, 3, 3, 7, 0.0F, false));
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