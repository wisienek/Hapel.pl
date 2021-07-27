package net.woolf.hplpl.classes;

import net.minecraft.entity.player.EntityPlayer;
import net.minecraft.entity.EntityCreature;
import net.minecraft.entity.Entity;
import net.minecraft.item.ItemStack;
import net.minecraft.item.Item;
import net.minecraft.util.EnumHand;
import net.minecraft.world.World;

import net.minecraft.nbt.NBTTagCompound;

import java.util.Set;
import java.util.Random;

public class IFarmable extends EntityCreature {

	private String owner;
	short hunger = 100;
	short thirst = 100;
	short maxOffspring = 12;
	short maxoffspringOnce = 3;
	short noChildren = 0;
	
	private Set<String> family;

	private long tick = 0;

	boolean readyToReproduce;
	long lastReproduced;
	private static final int reproduceCld = 10200000;
	

    public IFarmable(World worldIn)
    {
        super(worldIn);

		/*
		System.out.println("evaluation: "+ this.getEntityData().getKeySet().size() );
		if(this.getEntityData().hasKey("hunger") == true){
			load();
			if(this.owner.length()>0){
				this.setCustomNameTag(this.getName()+" | "+this.owner);
			}else{
				this.setCustomNameTag("�5"+this.getName());
			}
		}else{
			forceReload();
		}
		*/
    }

	//Funkcje wewnetrzne

	public void load(){
		NBTTagCompound nbtTag = this.getEntityData();
		this.hunger = nbtTag.getShort("hunger");
		this.thirst = nbtTag.getShort("thirst");
		this.noChildren = nbtTag.getShort("noChildren");
		this.maxOffspring = nbtTag.getShort("maxOffspring");
		this.maxoffspringOnce = nbtTag.getShort("maxOffspringOnce");
		this.lastReproduced = nbtTag.getLong("lastReproduced");
		this.tick = nbtTag.getLong("tick");
		//System.out.println("Zaladowano dane! H:"+ this.hunger +", T:"+this.thirst+", Chld:"+ this.noChildren+", maxO:"+this.maxOffspring+", MAXOF:"+this.maxoffspringOnce);
	}
	public void forceReload(){
		NBTTagCompound nbtTag = this.getEntityData();
		nbtTag.setShort("hunger", this.hunger);
		nbtTag.setShort("thirst", this.thirst);
		nbtTag.setShort("noChildren", this.noChildren);
		nbtTag.setShort("maxOffspring", this.maxOffspring);
		nbtTag.setShort("maxOffspringOnce", this.maxoffspringOnce);
		nbtTag.setLong("tick", this.tick);
		nbtTag.setLong("lastReproduced", this.lastReproduced);
		System.out.println("ForceReload");

		this.readEntityFromNBT(nbtTag);
		load();
	}

	//reprodukcja
    public boolean canReproduceWith(Entity pet){
    	return family.contains(pet.getUniqueID());
    }
    
    public boolean canReproduce(){
    	return !this.isChild() && this.readyToReproduce;
    }
	/*
    public void reproduce(IFarmable partner){
    	Random r = new Random();
    	int offspring = r.nextInt(this.maxoffspringOnce-1)+1;

    	for(int i=0; i < offspring; i++){
    		
    	}
    }*/

	//rodzina
	public boolean addToFamily(String Fmember){
		if(Fmember.length()==0 || family.contains(Fmember)) 
			return false;
		else
			family.add(Fmember); 
		return true;
	}
	public boolean setFamily(Set<String> _newFamily){
		family = _newFamily;
		return true;
	}
	public Set<String> getFamily(){
		return family;
	}
	
	

    //eventy

	/*
	@Override
	public void onEntityUpdate() {
		super.onEntityUpdate();

		this.tick++;
		if(this.tick == new Long("9223372036800000000") ){
			this.tick = 100;
		}
		if(this.tick % 720 == 0){ // 00
			this.hunger -= 5;
			this.thirst -= 15;
			forceReload();
		}
	}
	*/
	
	@Override
	public boolean processInteract(EntityPlayer entity, EnumHand hand) {
		super.processInteract(entity, hand);
		int x = (int) this.posX;
		int y = (int) this.posY;
		int z = (int) this.posZ;
		ItemStack itemstack = entity.getHeldItem(hand);

		NBTTagCompound nbtTag = this.getEntityData();
		System.out.println( nbtTag.toString() );

		//if( itemstack.getDisplayName().toLowerCase().indexOf("apple")>-1){
		//	if( this.ticksExisted - (reproduceCld + lastReproduced) > reproduceCld){
		//		this.readyToReproduce = true;
		//	}
		//}
		
		return true;
	}

	//@Override
	//public IEntityLivingData onInitialSpawn(DifficultyInstance difficulty, IEntityLivingData livingdata) {
	//	IEntityLivingData retval = super.onInitialSpawn(difficulty, livingdata);
	//	int x = (int) this.posX;
	//	int y = (int) this.posY;
	//	int z = (int) this.posZ;
	//	Entity entity = this;
	//
	//
	//	return retval;
	//}



}
