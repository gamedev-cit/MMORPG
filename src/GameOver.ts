import Stage from "./Stage";
import imageURL from './res/game_over.png'
import Main from "./Main";
import SelectTeamStage from "./SelectTeamStage";

export default class GameOverStage extends Stage
{
    constructor()
    {
        super()

        var texture = PIXI.Texture.fromImage(imageURL)
        var background = new PIXI.Sprite(texture)
        this.addChild(background)

		background.interactive = true
		background.on("mousedown", (event: PIXI.interaction.InteractionEvent) => {
			Main.instance.showStage(new SelectTeamStage())
		});
	}
}
