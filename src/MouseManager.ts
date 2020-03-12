import * as PIXI from 'pixi.js'

export default class MouseManager
{
    mouseX: number = 0
    mouseY: number = 0
    mouseDown: Boolean = false

    constructor(container: PIXI.Container)
    {
		container.interactive = true
		container.hitArea = new PIXI.Rectangle(0, 0, 10000, 10000)

        container.on("mousemove", (event: PIXI.interaction.InteractionEvent) => this.onMouseMove(event));
        container.on("mousedown", (event: PIXI.interaction.InteractionEvent) => this.onMouseDown(event));
        container.on("mouseup", (event: PIXI.interaction.InteractionEvent) => this.onMouseUp(event));

        container.on("touchmove", (event: PIXI.interaction.InteractionEvent) => this.onMouseMove(event));
        container.on("touchstart", (event: PIXI.interaction.InteractionEvent) => this.onMouseDown(event));
        container.on("touchend", (event: PIXI.interaction.InteractionEvent) => this.onMouseUp(event));
    }

    onMouseMove(event: PIXI.interaction.InteractionEvent)
    {
        this.mouseX = event.data.global.x
        this.mouseY = event.data.global.y
    }

    onMouseDown(event: PIXI.interaction.InteractionEvent)
    {
        this.mouseDown = true
    }

    onMouseUp(event: PIXI.interaction.InteractionEvent)
    {
        this.mouseDown = false
    }

}