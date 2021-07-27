
package net.woolf.hplpl.entity;

import net.woolf.hplpl.ElementsHapeladdons;

import net.minecraftforge.fml.relauncher.SideOnly;
import net.minecraftforge.fml.relauncher.Side;
import net.minecraftforge.fml.common.registry.EntityEntryBuilder;
import net.minecraftforge.fml.common.event.FMLPreInitializationEvent;
import net.minecraftforge.fml.client.registry.RenderingRegistry;

import net.minecraft.world.biome.Biome;
import net.minecraft.world.World;
import net.minecraft.util.math.Vec3d;
import net.minecraft.util.math.MathHelper;
import net.minecraft.util.math.BlockPos;
import net.minecraft.util.ResourceLocation;
import net.minecraft.util.EnumHand;
import net.minecraft.util.DamageSource;
import net.minecraft.pathfinding.PathNavigateFlying;
import net.minecraft.item.ItemStack;
import net.minecraft.entity.projectile.EntityPotion;
import net.minecraft.entity.projectile.EntityArrow;
import net.minecraft.entity.player.EntityPlayer;
import net.minecraft.entity.ai.EntityFlyHelper;
import net.minecraft.entity.ai.EntityAIWander;
import net.minecraft.entity.ai.EntityAISwimming;
import net.minecraft.entity.SharedMonsterAttributes;
import net.minecraft.entity.EnumCreatureAttribute;
import net.minecraft.entity.EntityLivingBase;
import net.minecraft.entity.EntityCreature;
import net.minecraft.entity.Entity;
import net.minecraft.client.renderer.entity.RenderLiving;
import net.minecraft.client.model.ModelRenderer;
import net.minecraft.client.model.ModelBox;
import net.minecraft.client.model.ModelBase;
import net.minecraft.block.state.IBlockState;

import net.minecraft.nbt.NBTTagCompound;

import java.util.Random;
import java.util.Iterator;
import java.util.ArrayList;
import java.lang.String;

@ElementsHapeladdons.ModElement.Tag
public class EntitySwietlistasmuga extends ElementsHapeladdons.ModElement {
	public static final int ENTITYID = 7;
	public static final int ENTITYID_RANGED = 8;
	public EntitySwietlistasmuga(ElementsHapeladdons instance) {
		super(instance, ElementsHapeladdons.getNext());
	}

	@Override
	public void initElements() {
		elements.entities
				.add(() -> EntityEntryBuilder.create().entity(EntityCustom.class).id(new ResourceLocation("hapeladdons", "swietlistasmuga"), ENTITYID)
						.name("swietlistasmuga").tracker(80, 3, true).egg(-1, -1).build());
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
			return new RenderLiving(renderManager, new Modelmiotla1(), 0.5f) {
				protected ResourceLocation getEntityTexture(Entity entity) {
					return new ResourceLocation("hapeladdons:textures/miotla1_e.png");
				}
			};
		});
	}
	public static class EntityCustom extends EntityCreature {
		public EntityCustom(World world) {
			super(world);
			setSize(0.6f, 0.2f);
			experienceValue = 0;
			this.isImmuneToFire = true;
			setNoAI(!true);
			enablePersistence();
			this.navigator = new PathNavigateFlying(this, this.world);
			this.moveHelper = new EntityFlyHelper(this);
		}

		public boolean hasOwner(){
			NBTTagCompound nbt = this.getEntityData();
			if(nbt==null || ( nbt != null && nbt.hasKey("owner") == false ) ){
				return false;
			}
			return true;
		}
		
		public String getOwner(){
			NBTTagCompound nbt = this.getEntityData();
			if(this.hasOwner() == false) { return null; } 
			return nbt.getString("owner");
		}
		
		public boolean setOwner(String owner){
			NBTTagCompound nbt = this.getEntityData();
			nbt.setString("owner", owner);
			
			return true;
		}

		@Override
		protected void initEntityAI() {
			super.initEntityAI();
			this.tasks.addTask(1, new EntityAIWander(this, 1.4, 20) {
				@Override
				protected Vec3d getPosition() {
					Random random = EntityCustom.this.getRNG();
					double dir_x = EntityCustom.this.posX + ((random.nextFloat() * 2 - 1) * 16);
					double dir_y = EntityCustom.this.posY + ((random.nextFloat() * 2 - 1) * 16);
					double dir_z = EntityCustom.this.posZ + ((random.nextFloat() * 2 - 1) * 16);
					return new Vec3d(dir_x, dir_y, dir_z);
				}
			});
			this.tasks.addTask(2, new EntityAISwimming(this));
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
		public net.minecraft.util.SoundEvent getAmbientSound() {
			return (net.minecraft.util.SoundEvent) net.minecraft.util.SoundEvent.REGISTRY.getObject(new ResourceLocation(""));
		}

		@Override
		public net.minecraft.util.SoundEvent getHurtSound(DamageSource ds) {
			return (net.minecraft.util.SoundEvent) net.minecraft.util.SoundEvent.REGISTRY.getObject(new ResourceLocation(""));
		}

		@Override
		public net.minecraft.util.SoundEvent getDeathSound() {
			return (net.minecraft.util.SoundEvent) net.minecraft.util.SoundEvent.REGISTRY.getObject(new ResourceLocation(""));
		}

		@Override
		protected float getSoundVolume() {
			return 1.0F;
		}

		@Override
		public void fall(float l, float d) {
		}

		@Override
		public boolean attackEntityFrom(DamageSource source, float amount) {
			if (source.getImmediateSource() instanceof EntityArrow)
				return false;
			if (source.getImmediateSource() instanceof EntityPotion)
				return false;
			if (source == DamageSource.FALL)
				return false;
			if (source == DamageSource.CACTUS)
				return false;
			if (source == DamageSource.DROWN)
				return false;
			if (source == DamageSource.LIGHTNING_BOLT)
				return false;
			return super.attackEntityFrom(source, amount);
		}

		@Override
		public boolean processInteract(EntityPlayer entity, EnumHand hand) {
			super.processInteract(entity, hand);
			entity.startRiding(this);
			int x = (int) this.posX;
			int y = (int) this.posY;
			int z = (int) this.posZ;
			ItemStack itemstack = entity.getHeldItem(hand);

			if(this.hasOwner() == false && this.getCustomNameTag().indexOf("Miotla") == -1 ){
				this.setCustomNameTag("Miotla: "+entity.getDisplayNameString());
				this.setOwner(entity.getDisplayNameString());
				//System.out.println("Ustawiono ownera na: "+this.getOwner());
			}else{
				if(this.hasOwner() == true){
					String owner = this.getOwner();
					if(owner != entity.getDisplayNameString()){
						Entity entityPas = this.getPassengers().isEmpty() ? null : (Entity) this.getPassengers().get(0);

						if(entityPas.getName() == entity.getDisplayNameString()){
							entity.dismountRidingEntity();
						}
					}
				}
			}

			return true;
		}

		@Override
		protected void applyEntityAttributes() {
			super.applyEntityAttributes();
			if (this.getEntityAttribute(SharedMonsterAttributes.ARMOR) != null)
				this.getEntityAttribute(SharedMonsterAttributes.ARMOR).setBaseValue(2D);
			if (this.getEntityAttribute(SharedMonsterAttributes.MOVEMENT_SPEED) != null)
				this.getEntityAttribute(SharedMonsterAttributes.MOVEMENT_SPEED).setBaseValue(0.3D);
			if (this.getEntityAttribute(SharedMonsterAttributes.MAX_HEALTH) != null)
				this.getEntityAttribute(SharedMonsterAttributes.MAX_HEALTH).setBaseValue(400D);
			if (this.getEntityAttribute(SharedMonsterAttributes.ATTACK_DAMAGE) != null)
				this.getEntityAttribute(SharedMonsterAttributes.ATTACK_DAMAGE).setBaseValue(0D);
			this.getAttributeMap().registerAttribute(SharedMonsterAttributes.FLYING_SPEED);
			this.getEntityAttribute(SharedMonsterAttributes.FLYING_SPEED).setBaseValue(0.3);
		}

		@Override
		public boolean canBreatheUnderwater() {
			return true;
		}

		@Override
		public boolean getCanSpawnHere() {
			return true;
		}

		@Override
		public boolean isNotColliding() {
			return this.world.checkNoEntityCollision(this.getEntityBoundingBox(), this);
		}

		@Override
		public boolean isPushedByWater() {
			return false;
		}

		@Override
		public void onUpdate() {
			super.onUpdate();
			this.setNoGravity(true);
		}

		@Override
		public void travel(float ti, float tj, float tk) {
			Entity entity = this.getPassengers().isEmpty() ? null : (Entity) this.getPassengers().get(0);
			if (this.isBeingRidden()) {
				this.rotationYaw = entity.rotationYaw;
				this.prevRotationYaw = this.rotationYaw;
				this.rotationPitch = entity.rotationPitch * 0.5F;
				this.setRotation(this.rotationYaw, this.rotationPitch);
				this.jumpMovementFactor = this.getAIMoveSpeed() * 0.15F;
				this.renderYawOffset = entity.rotationYaw;
				this.rotationYawHead = entity.rotationYaw;
				this.stepHeight = 1.0F;
				if (entity instanceof EntityLivingBase) {
					this.setAIMoveSpeed((float) this.getEntityAttribute(SharedMonsterAttributes.MOVEMENT_SPEED).getAttributeValue());
					float forward = ((EntityLivingBase) entity).moveForward;
					float strafe = ((EntityLivingBase) entity).moveStrafing;
					float vertical = ((EntityLivingBase) entity).rotationPitch;
					if (vertical > 70 || vertical < -70) {
						vertical *= -0.004f;
					} else if (vertical > -10 && vertical < 10) {
						vertical = 0;
					} else {
						vertical *= -0.002f;
					}
					super.travel(strafe, vertical, forward);
				}
				this.prevLimbSwingAmount = this.limbSwingAmount;
				double d1 = this.posX - this.prevPosX;
				double d0 = this.posZ - this.prevPosZ;
				float f1 = MathHelper.sqrt(d1 * d1 + d0 * d0) * 4.0F;
				if (f1 > 1.0F)
					f1 = 1.0F;
				this.limbSwingAmount += (f1 - this.limbSwingAmount) * 0.4F;
				this.limbSwing += this.limbSwingAmount;
				return;
			}
		}

		@Override
		protected void updateFallState(double y, boolean onGroundIn, IBlockState state, BlockPos pos) {
		}

		@Override
		public void setNoGravity(boolean ignored) {
			super.setNoGravity(true);
		}
	}

	public static class Modelmiotla1 extends ModelBase {
		private final ModelRenderer trzonek;
		private final ModelRenderer nogi;
		private final ModelRenderer siedzenie;
		private final ModelRenderer welna;
		private final ModelRenderer zloto;
		public Modelmiotla1() {
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
}
