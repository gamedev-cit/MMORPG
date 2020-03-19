import GameObject from "./GameObject";
import GameStage from "./GameStage";

export default class Character extends GameObject
{
	type= "unknown"


	onAdded()
	{
		super.onAdded()

		GameStage.instance.characters.push(this)
	}

	onRemoved()
	{
		super.onRemoved()

		let index = GameStage.instance.characters.indexOf(this)
		if (index != -1) {
			GameStage.instance.characters.splice(index, 1)
		}
	}
}