import magicBallsItemUrl from '../res/weapon_item_1.png'
import magicBallsBulletUrl from '../res/bullet_1.png'

import swordItemUrl from '../res/item_sword.png'
import swordBulletUrl from '../res/weapon_bullet_sword_trail.png'

export default class Weapon
{
	fireRate: number
	bulletSpeed: number
	damage: number
	bulletLifetime: number
	bulletRadius: number
	bulletImageUrl = ""
	itemImageUrl = ""

	constructor(data: any) {
		this.fireRate = data.fireRate
		this.bulletSpeed = data.bulletSpeed
		this.bulletLifetime = data.bulletLifetime
		this.damage = data.damage
		this.bulletRadius = data.bulletRadius
		this.bulletImageUrl = data.bulletImageUrl
		this.itemImageUrl = data.itemImageUrl
	}

	data(): any {
		return {
			"fireRate": this.fireRate,
			"bulletSpeed": this.bulletSpeed,
			"bulletLifetime": this.bulletLifetime,
			"damage": this.damage,
			"bulletRadius": this.bulletRadius,
			"bulletImageUrl": this.bulletImageUrl,
			"itemImageUrl": this.itemImageUrl
		}
	}

	//--------------------------------------------

	static magicBalls = new Weapon({
		fireRate: 100,
		bulletSpeed: 8,
		bulletLifetime: 500,
		damage: 7,
		bulletRadius: 10,
		bulletImageUrl: magicBallsBulletUrl,
		itemImageUrl: magicBallsItemUrl
	})

	static sword = new Weapon({
		fireRate: 500,
		bulletSpeed: 0,
		bulletLifetime: 100,
		damage: 30,
		bulletRadius: 40,
		bulletImageUrl: swordBulletUrl,
		itemImageUrl: swordItemUrl
	})

	static towerMagicBalls = new Weapon({
		fireRate: 800,
		bulletSpeed: 6,
		bulletLifetime: 500,
		damage: 15,
		bulletRadius: 10,
		bulletImageUrl: magicBallsBulletUrl,
		itemImageUrl: magicBallsItemUrl
	})
}