import GameStage from "./GameStage";
import Dryad from "./players/Dryad";
import Dwarf from "./players/Dwarf";
import JJmans from "./players/JJmans";
import Jotun from "./players/Jotun";
import Knight from "./players/Knight";
import Necromancer from "./players/Necromancer";
import Bee from "./players/Bee";
import HumanSpider from "./players/HumanSpider";
import GameObject from "./GameObject";
import HealthKit from "./items/HealthKit";
import Weapon from "./items/Weapon";
import WeaponItem from "./items/WeaponItem";
import EnemySlime from "./EnemySlime";
import Coin from "./items/Coin";
import Forge from "./buildings/Forge";
import Hospital from "./buildings/Hospital";
import Tower from "./buildings/Tower";
import Enemy from "./Enemy";
import MainBuilding from "./buildings/MainBuilding";

export default class GameObjectManager
{
	updateObjectsWithGameState(objects: Array<GameObject>, state: any)
	{
		this.addNewObjects(objects, state)
		this.removeOldObjects(objects, state)

		for (let objectData of state) {
			if (objectData.id == GameStage.instance.player.id) {
				continue;
			}

			var character = this.getObjectWithId(objects, objectData.id)!

			if (objectData.owner == GameStage.instance.player.id) {
				if (character.class == "enemy" || character.class == "building") {
					(character as Enemy).owner = objectData.owner
				}
			} else {
				character.updateWithData(objectData)
			}
		}
	}

	addNewObjects(objects: Array<GameObject>, state: any)
	{
		for (let objectData of state) {
			if (this.getObjectWithId(objects, objectData.id) == null) {
				var newObject = this.newObjectWithType(objectData.type)
				newObject.id = objectData.id
				newObject.updateWithData(objectData)
				GameStage.instance.world.addChild(newObject)
			}
		}
	}

	removeOldObjects(objects: Array<GameObject>, state: any)
	{
		for (let object of objects) {
			var exists = false
			for (let objectData of state) {
				if (objectData.id == object.id) {
					exists = true
				}
			}

			if (!exists && object != GameStage.instance.player) {
				GameStage.instance.world.removeChild(object)
			}
		}
	}

	getObjectWithId(objects: Array<GameObject>, id: String): GameObject | null
	{
		for (let object of objects) {
			if (object.id == id) {
				return object
			}
		}

		return null
	}

	newObjectWithType(type: string): GameObject
	{
		if (type == "dryad") {
			return new Dryad()
		}
		if (type == "dwarf") {
			return new Dwarf()
		}
		if (type == "jjman") {
			return new JJmans()
		}
		if (type == "jotun") {
			return new Jotun()
		}
		if (type == "knight") {
			return new Knight()
		}
		if (type == "necromancer") {
			return new Necromancer()
		}
		if (type == "shmel") {
			return new Bee()
		}
		if (type == "spider") {
			return new HumanSpider()
		}


		if (type == "healkit") {
			return new HealthKit()
		}

		if (type == "weapon") {
			return new WeaponItem()
		}

		if (type == "coin") {
			return new Coin()
		}


		if (type == "slime") {
			return new EnemySlime()
		}


		if (type == "forge") {
			return new Forge()
		}

		if (type == "hospital") {
			return new Hospital()
		}

		if (type == "tower") {
			return new Tower()
		}

		if (type == "main") {
			return new MainBuilding()
		}

		return new Knight()
	}
}