import itemUrl from '../res/health_pack.png'
import Item from "./Item"
import GameObject from '../GameObject'
import GameStage from '../GameStage'
import Weapon from './Weapon'

export default class WeaponItem extends Item
{
	weapon!: Weapon

	constructor()
	{
		super(30)
	}

	didHitGameObject(gameObject: GameObject)
    {
        if (gameObject == GameStage.instance.player) {
			GameStage.instance.player.weapon = this.weapon

			GameStage.instance.world.removeChild(this)

			GameStage.instance.socket.emit("delete_item", {
				"id": this.id
			})
		}
	}

	updateWithData(data: any): void
	{
		super.updateWithData(data)
		
		this.weapon = new Weapon(data.weapon)
		this.texture = PIXI.Texture.from(this.weapon.itemImageUrl)
	}
}