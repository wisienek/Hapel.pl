
package net.woolf.hplpl.entity;

import net.woolf.hplpl.ElementsHapeladdons;
// import net.woolf.hplpl.klasy.IFarmable;

import net.minecraftforge.fml.relauncher.SideOnly;
import net.minecraftforge.fml.relauncher.Side;
import net.minecraftforge.fml.common.registry.EntityEntryBuilder;
import net.minecraftforge.fml.common.event.FMLPreInitializationEvent;
import net.minecraftforge.fml.client.registry.RenderingRegistry;

import net.minecraft.world.biome.Biome;
import net.minecraft.world.World;
import net.minecraft.util.math.MathHelper;
import net.minecraft.util.ResourceLocation;
import net.minecraft.util.EnumHand;
import net.minecraft.util.DamageSource;
import net.minecraft.item.ItemStack;
import net.minecraft.item.Item;
import net.minecraft.init.Items;
import net.minecraft.entity.projectile.EntityPotion;
import net.minecraft.entity.player.EntityPlayer;
import net.minecraft.entity.ai.EntityAIWander;
import net.minecraft.entity.ai.EntityAITempt;
import net.minecraft.entity.ai.EntityAISwimming;
import net.minecraft.entity.ai.EntityAIPanic;
import net.minecraft.entity.ai.EntityAILookIdle;
import net.minecraft.entity.ai.EntityAIFollow;
import net.minecraft.entity.ai.EntityAIEatGrass;
import net.minecraft.entity.SharedMonsterAttributes;
import net.minecraft.entity.EnumCreatureAttribute;
import net.minecraft.entity.EntityCreature;
import net.minecraft.entity.Entity;
import net.minecraft.client.renderer.entity.RenderLiving;
import net.minecraft.client.model.ModelRenderer;
import net.minecraft.client.model.ModelBox;
import net.minecraft.client.model.ModelBase;

import java.util.Iterator;
import java.util.ArrayList;

@ElementsHapeladdons.ModElement.Tag
public class EntityPufekpink extends ElementsHapeladdons.ModElement {
	public static final int ENTITYID = 15;
	public static final int ENTITYID_RANGED = 16;
	public EntityPufekpink(ElementsHapeladdons instance) {
		super(instance, ElementsHapeladdons.getNext());
	}

	@Override
	public void initElements() {
		elements.entities.add(() -> EntityEntryBuilder.create().entity(EntityCustom.class)
				.id(new ResourceLocation("hapeladdons", "pufekpink"), ENTITYID).name("pufekpink").tracker(32, 3, true).egg(-1, -1).build());
	}

	private Biome[] allbiomes(net.minecraft.util.registry.RegistryNamespaced<ResourceLocation, Biome> in) {
		Iterator<Biome> itr = in.iterator();
		ArrayList<Biome> ls = new ArrayList<Biome>();
		while (itr.hasNext())
			ls.add(itr.next());
		return ls.toArray(new Biome[ls.size()]);
	}

	@SideOnly(Side.CLIENT)
	@Override
	public void preInit(FMLPreInitializationEvent event) {
		RenderingRegistry.registerEntityRenderingHandler(EntityCustom.class, renderManager -> {
			return new RenderLiving(renderManager, new Modelpufek(), 0.3f) {
				protected ResourceLocation getEntityTexture(Entity entity) {
					return new ResourceLocation("hapeladdons:textures/pufek_pink.png");
				}
			};
		});
	}
	public static class EntityCustom extends EntityCreature {
		public EntityCustom(World world) {
			super(world);
			setSize(0.3f, 0.3f);
			experienceValue = 2;
			this.isImmuneToFire = false;
			setNoAI(!true);
			enablePersistence();
		}

		@Override
		protected void initEntityAI() {
			super.initEntityAI();
			this.tasks.addTask(1, new EntityAIWander(this, 0.7));
			this.tasks.addTask(2, new EntityAILookIdle(this));
			this.tasks.addTask(3, new EntityAISwimming(this));
			this.tasks.addTask(4, new EntityAIPanic(this, 1));
			this.tasks.addTask(5, new EntityAIEatGrass(this));
			this.tasks.addTask(6, new EntityAIFollow(this, (float) 0.8, 15, 8));
			this.tasks.addTask(7, new EntityAITempt(this, 0.9, new ItemStack(Items.WHEAT_SEEDS, (int) (1)).getItem(), false));
		}

		@Override
		public EnumCreatureAttribute getCreatureAttribute() {
			return EnumCreatureAttribute.UNDEFINED;
		}

		@Override
		protected boolean canDespawn() {
			return false;
		}

		@Override
		protected Item getDropItem() {
			return new ItemStack(Items.FEATHER, (int) (1)).getItem();
		}

		@Override
		public net.minecraft.util.SoundEvent getAmbientSound() {
			return (net.minecraft.util.SoundEvent) net.minecraft.util.SoundEvent.REGISTRY.getObject(new ResourceLocation(""));
		}

		@Override
		public net.minecraft.util.SoundEvent getHurtSound(DamageSource ds) {
			return (net.minecraft.util.SoundEvent) net.minecraft.util.SoundEvent.REGISTRY.getObject(new ResourceLocation("entity.generic.hurt"));
		}

		@Override
		public net.minecraft.util.SoundEvent getDeathSound() {
			return (net.minecraft.util.SoundEvent) net.minecraft.util.SoundEvent.REGISTRY.getObject(new ResourceLocation("entity.generic.death"));
		}

		@Override
		protected float getSoundVolume() {
			return 1.0F;
		}

		@Override
		public boolean attackEntityFrom(DamageSource source, float amount) {
			if (source.getImmediateSource() instanceof EntityPotion)
				return false;
			if (source == DamageSource.FALL)
				return false;
			if (source == DamageSource.CACTUS)
				return false;
			if (source == DamageSource.DROWN)
				return false;
			return super.attackEntityFrom(source, amount);
		}

		@Override
		protected void applyEntityAttributes() {
			super.applyEntityAttributes();
			if (this.getEntityAttribute(SharedMonsterAttributes.ARMOR) != null)
				this.getEntityAttribute(SharedMonsterAttributes.ARMOR).setBaseValue(0D);
			if (this.getEntityAttribute(SharedMonsterAttributes.MOVEMENT_SPEED) != null)
				this.getEntityAttribute(SharedMonsterAttributes.MOVEMENT_SPEED).setBaseValue(0.2D);
			if (this.getEntityAttribute(SharedMonsterAttributes.MAX_HEALTH) != null)
				this.getEntityAttribute(SharedMonsterAttributes.MAX_HEALTH).setBaseValue(5D);
			if (this.getEntityAttribute(SharedMonsterAttributes.ATTACK_DAMAGE) != null)
				this.getEntityAttribute(SharedMonsterAttributes.ATTACK_DAMAGE).setBaseValue(3D);
		}
	}

	public static class Modelpufek extends ModelBase {
		private final ModelRenderer bone;
		private final ModelRenderer BR;
		private final ModelRenderer FL;
		private final ModelRenderer BL;
		private final ModelRenderer FR;
		private final ModelRenderer bone2;
		private final ModelRenderer cube_r1;
		private final ModelRenderer jezyk;
		private final ModelRenderer Pyszczek;
		public Modelpufek() {
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

		public void setRotationAngles(float f, float f1, float f2, float f3, float f4, float f5, Entity e) {
			super.setRotationAngles(f, f1, f2, f3, f4, f5, e);
			this.BR.rotateAngleX = MathHelper.cos(f * 1.0F) * -1.0F * f1;
			this.FL.rotateAngleX = MathHelper.cos(f * 1.0F) * -1.0F * f1;
			this.BL.rotateAngleX = MathHelper.cos(f * 1.0F) * 1.0F * f1;
			this.FR.rotateAngleX = MathHelper.cos(f * 1.0F) * 1.0F * f1;
		}
	}
}
