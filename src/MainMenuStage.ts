import Stage from "./Stage";
import mainMenuStageImageURL from './res/new_game.png'

import playerClassDryadImageUrl from './res/player_class_dryad.png'
import playerClassDwarfImageUrl from './res/player_class_dwarf.png'
import playerClassJJManImageUrl from './res/player_class_jjman.png'
import playerClassJotunImageUrl from './res/player_class_jotun.png'
import playerClassKnightImageUrl from './res/player_class_knight.png'
import playerClassNecromancerImageUrl from './res/player_class_necromancer.png'
import playerClassShmelImageUrl from './res/player_class_shmel.png'
import playerClassSpiderImageUrl from './res/player_class_spider.png'

import Main from "./Main";
import GameStage from "./GameStage";
import TextInput from "./TextInput";

export default class MainMenuStage extends Stage
{
    nameTextField = new TextInput( { input: {
		fontSize: '25pt',
		padding: '14px',
		width: '400px'
	}, box: {
		fill: 0xE8E9F3
    }})
    
    constructor()
    {
        super()

        var texture = PIXI.Texture.fromImage(mainMenuStageImageURL)
        var background = new PIXI.Sprite(texture)
        this.addChild(background)

        this.addButton(100, 200, playerClassDryadImageUrl, "dryad")
		this.addButton(250, 200, playerClassDwarfImageUrl, "dwarf")
		this.addButton(400, 200, playerClassJJManImageUrl, "jjman")
		this.addButton(550, 200, playerClassJotunImageUrl, "jotun")
		this.addButton(100, 350, playerClassKnightImageUrl, "knight")
		this.addButton(250, 350, playerClassNecromancerImageUrl, "necromancer")
		this.addButton(400, 350, playerClassShmelImageUrl, "shmel")
        this.addButton(550, 350, playerClassSpiderImageUrl, "spider")
        
        this.addTextField()
    }

    addTextField()
    {
        this.nameTextField.x = 100
		this.nameTextField.y = 50
		var savedName = window.localStorage["playerName"]
		this.nameTextField.text = savedName
		this.addChild(this.nameTextField)
    }

    addButton(x: number, y: number, imageUrl: string, type: string)
    {
        var buttonTexture = PIXI.Texture.fromImage(imageUrl)
        var button = new PIXI.Sprite(buttonTexture)
        button.x = x
        button.y = y
        this.addChild(button)

        button.interactive = true
		button.on("mouseup", (event: PIXI.interaction.InteractionEvent) => {
            Main.instance.showStage(new GameStage(type))
            
            window.localStorage["playerName"] = this.nameTextField.text
        });
    }
}