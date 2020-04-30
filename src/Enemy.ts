import GameObject from "./GameObject";
import Character from "./Character";

export default class Enemy extends Character
{
	owner = "noone"

	updateWithData(data: any): void
	{
		super.updateWithData(data)

		this.owner = data.owner
	}

	ai()
	{
		this.speedX = 1
	}
}