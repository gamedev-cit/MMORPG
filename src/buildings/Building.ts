import Character from "../Character";

export default class Building extends Character
{
	owner = "noone"
	class = 'building'

	speed = 0

	fullHealth = 300
	health = 300

	updateWithData(data: any): void
	{
		super.updateWithData(data)

		this.owner = data.owner
	}
}