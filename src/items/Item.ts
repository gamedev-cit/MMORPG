import GameObject from "../GameObject";
import GameStage from "../GameStage";

export default class Item extends GameObject
{
	type = "undefined"
	class = 'item'

	onAdded()
	{
		super.onAdded()

		GameStage.instance.items.push(this)
	}

	onRemoved()
	{
		super.onRemoved()

		let index = GameStage.instance.items.indexOf(this)
		if (index != -1) {
			GameStage.instance.items.splice(index, 1)
		}
	}

	update()
	{
		super.update()
	}

	updateWithData(data: any): void
	{
		this.id = data.id
		this.x = data.position.x
		this.y = data.position.y
	}
}