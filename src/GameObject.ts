import Main from "./Main"
import GameStage from "./GameStage"

export default class GameObject extends PIXI.Sprite
{
    id = 'undefined'
    class = 'gameobject'
    team = "X"
    
	speedX: number = 0
	speedY: number = 0
    radius: number
    isHittingGround: boolean = false
    
	constructor(radius: number)
	{
		super()

        this.radius = radius
        this.anchor.x = 0.5
        this.anchor.y = 0.5
        
        this.on("added", this.onAdded, this)
		this.on("removed", this.onRemoved, this)
    }

    onAdded()
    {
        Main.instance.app.ticker.add(this.update, this)
        GameStage.instance.gameObjects.push(this)
    }

    onRemoved()
    {
        Main.instance.app.ticker.remove(this.update, this)
        let index = GameStage.instance.gameObjects.indexOf(this)
		if (index != -1) {
			GameStage.instance.gameObjects.splice(index, 1)
		}
    }

    update()
	{
		this.x += this.speedX
		this.y += this.speedY
    }

    didHitGameObject(gameObject: GameObject)
    {
        
    }

    updateWithData(data: any): void
    {
        
    }
}