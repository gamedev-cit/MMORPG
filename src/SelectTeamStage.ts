import Stage from "./Stage";
import mainMenuStageImageURL from './res/new_game.png'
import teamAImageURL from './res/team-a-button.png'
import teamBImageURL from './res/team-b-button.png'

import Main from "./Main";
import GameStage from "./GameStage";
import MainMenuStage from "./MainMenuStage";

export default class SelectTeamStage extends Stage
{   
    constructor()
    {
        super()

        var texture = PIXI.Texture.fromImage(mainMenuStageImageURL)
        var background = new PIXI.Sprite(texture)
        this.addChild(background)

        {
            var buttonTexture = PIXI.Texture.fromImage(teamAImageURL)
            var button = new PIXI.Sprite(buttonTexture)
            button.x = 100
            button.y = 100
            this.addChild(button)

            button.interactive = true
            button.on("mouseup", (event: PIXI.interaction.InteractionEvent) => {
                window.localStorage["team"] = "A"
                Main.instance.showStage(new MainMenuStage())
            });
        }

        {
            var buttonTexture = PIXI.Texture.fromImage(teamBImageURL)
            var button = new PIXI.Sprite(buttonTexture)
            button.x = 300
            button.y = 100
            this.addChild(button)

            button.interactive = true
            button.on("mouseup", (event: PIXI.interaction.InteractionEvent) => {
                window.localStorage["team"] = "B"

                Main.instance.showStage(new MainMenuStage())
            });
        }
    }
}