import Stage from "./Stage";
import mainMenuStageImageURL from './res/new_game.png'
import Main from "./Main";
import GameStage from "./GameStage";

export default class MainMenuStage extends Stage
{
    constructor()
    {
        super()

        var texture = PIXI.Texture.fromImage(mainMenuStageImageURL)
        var background = new PIXI.Sprite(texture)
        this.addChild(background)

        background.interactive = true
		background.on("mouseup", (event: PIXI.interaction.InteractionEvent) => {
			Main.instance.showStage(new GameStage())
		});
    }
}