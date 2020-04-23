import GameStage from "./GameStage";
import Dryad from "./Dryad";
import Dwarf from "./Dwarf";
import JJmans from "./JJmans";
import Jotun from "./Jotun";
import Knight from "./Knight";
import Necromancer from "./Necromancer";
import Bee from "./Bee";
import HumanSpider from "./HumanSpider";
import GameObject from "./GameObject";
import HealthKit from "./items/HealthKit";
import Weapon from "./items/Weapon";
import WeaponItem from "./items/WeaponItem";

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
			character.updateWithData(objectData)
		}
	}

	addNewObjects(objects: Array<GameObject>, state: any)
	{
		for (let objectData of state) {
			if (this.getObjectWithId(objects, objectData.id) == null) {
				var newObject = this.newObjectWithType(objectData.type)
				newObject.id = objectData.id
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

		return new Knight()
	}
}