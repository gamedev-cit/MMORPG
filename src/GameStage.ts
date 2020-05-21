import * as PIXI from 'pixi.js';
import * as io from 'socket.io-client';
import Stage from './Stage';
import GameObject from './GameObject';
import Character from './Character';
import Player from './players/Player';
import Enemy from './Enemy';
import PlayerController from './PlayerController';
import Main from './Main';
import map1Url from './res/map_1.jpg'
import GameObjectManager from './GameObjectManager';
import Item from './items/Item'
import Hospital from './buildings/Hospital';
import Forge from './buildings/Forge';
import EnemySlime from './EnemySlime';
import Mine from './buildings/Mine';
import Building from './buildings/Building';
import Tower from './buildings/Tower';
import MainBuilding from './buildings/MainBuilding';

export default class GameStage extends Stage
{
	static instance: GameStage

	socket: SocketIOClient.Socket

	world = new PIXI.Container()
	gameObjects = new Array<GameObject>()
	characters = new Array<Character>()
	items = new Array<Item>()
	timeSinceLastEnemyKilled = 0

	player!: Player
	playerController!: PlayerController
	gameObjectManager = new GameObjectManager()

	coinsLabel = new PIXI.Text()

	playerType: string

	constructor(playerType: string)
	{
		super()


		GameStage.instance = this

		this.playerType = playerType

		this.socket = io.connect('wss://game-socket-server-1.herokuapp.com')

		this.socket.on("state", (state: any) => this.onGameState(state))

		var background = new PIXI.Sprite(PIXI.Texture.fromImage(map1Url))
		this.world.addChild(background)

		this.addChild(this.world)

		this.respawn()

		this.loadMap()

		this.coinsLabel.style.fill = 0x000000
		this.coinsLabel.style.fontSize = 12
		this.addChild(this.coinsLabel)
	}

	loadMap()
	{
		if (this.player.team == "A") {
			var centerX = 2300
			var centerY = 3600

			var hospital = new Hospital()
			hospital.x = centerX + 200
			hospital.y = centerY + 200
			hospital.team = this.player.team
			hospital.id = "hospital" + this.player.team
			this.socket.emit("character", hospital.data())

			var forge = new Forge()
			forge.x = centerX - 400
			forge.y = centerY
			forge.team = this.player.team
			forge.id = "forge" + this.player.team
			this.socket.emit("character", forge.data())

			var mainBuilding = new MainBuilding()
			mainBuilding.x = centerX - 100
			mainBuilding.y = centerY + 100
			mainBuilding.team = this.player.team
			mainBuilding.id = "main" + this.player.team
			this.socket.emit("character", mainBuilding.data())

			var tower = new Tower()
			tower.x = centerX + 200
			tower.y = centerY - 200
			tower.team = this.player.team
			tower.id = "tower" + this.player.team
			this.socket.emit("character", tower.data())
		}

		if (this.player.team == "B") {
			var centerX = 3600
			var centerY = 2300

			var hospital = new Hospital()
			hospital.x = centerX - 200
			hospital.y = centerY - 200
			hospital.team = this.player.team
			hospital.id = "hospital" + this.player.team
			this.socket.emit("character", hospital.data())

			var forge = new Forge()
			forge.x = centerX + 400
			forge.y = centerY
			forge.team = this.player.team
			forge.id = "forge" + this.player.team
			this.socket.emit("character", forge.data())

			var mainBuilding = new MainBuilding()
			mainBuilding.x = centerX + 100
			mainBuilding.y = centerY - 100
			mainBuilding.team = this.player.team
			mainBuilding.id = "main" + this.player.team
			this.socket.emit("character", mainBuilding.data())

			var tower = new Tower()
			tower.x = centerX - 200
			tower.y = centerY + 200
			tower.team = this.player.team
			tower.id = "tower" + this.player.team
			this.socket.emit("character", tower.data())
		}
		
		var mine = new Mine()
		mine.x = 4000
		mine.y = 4000
		this.world.addChild(mine)		
	}

	respawn()
	{
		this.world.removeChild(this.player)

		this.player = this.gameObjectManager.newObjectWithType(this.playerType) as Player
		this.player.team = window.localStorage["team"]
		this.player.name = window.localStorage["playerName"]

		if (this.player.team == "A") {
			this.player.x = 2400 + (Math.random()*500 - 250)
			this.player.y = 3500 + (Math.random()*500 - 250)
		}
		if (this.player.team == "B") {
			this.player.x = 3700 + (Math.random()*500 - 250)
			this.player.y = 2400 + (Math.random()*500 - 250)
		}

		this.playerController = new PlayerController(this.player)
		this.world.addChild(this.player)
	}

	onGameState(state: any)
	{
		this.player.id = this.socket.id;
		
		this.gameObjectManager.updateObjectsWithGameState(this.characters, state.characters)
		this.gameObjectManager.updateObjectsWithGameState(this.items, state.items)
		this.timeSinceLastEnemyKilled = state.timeSinceLastEnemyKilled

		this.createEnemiesIfNeeded()

		this.networkUpdate()
	}

	collideGameObjectsWithGameObjects()
    {
		for (let gameObjectA of this.gameObjects) {
            for (let gameObjectB of this.gameObjects) {
                if (gameObjectA === gameObjectB) {
                    continue
                }
                let deltaX = gameObjectA.x - gameObjectB.x
                let deltaY = gameObjectA.y - gameObjectB.y
                let distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY)
                if (distance < gameObjectA.radius + gameObjectB.radius) {
					gameObjectA.didHitGameObject(gameObjectB)
                }
            }
        }
	}

	update()
	{
		this.collideGameObjectsWithGameObjects()
		this.checkPlayerHealth()
	
		this.moveCamera()

		this.coinsLabel.text = "Coins: " + this.player.coins
	}

	networkUpdate()
	{
		this.controlEnemies()
		this.controlBuildings()

		this.socket.emit("character", this.player.data())
	}

	checkPlayerHealth()
	{
		if (this.player.health <= 0) {
			this.dropCoins()
			this.respawn()
		}
	}

	dropCoins()
	{
		for (var i=0; i<this.player.coins/2; i++) {
			var angle = Math.random() * Math.PI*2
			
			GameStage.instance.socket.emit("item", {
				"id": "item_" + Math.random(),
				"type": "coin",
				"position": {
					"x": this.player.x + (30 + Math.random() * 110) * Math.cos(angle),
					"y": this.player.y + (30 + Math.random() * 110) * Math.sin(angle)
				}
			})
		}
	}

	moveCamera()
	{
		this.world.x = -this.player.x + Main.instance.app.renderer.width*0.5
		this.world.y = -this.player.y + Main.instance.app.renderer.height*0.5
	}

	getPlayers(): Array<Player>
	{
		var players = new Array<Player>()
		for (var character of this.characters) {
			if (character.class == "player") {
				players.push(character as Player)
			}
		}
		return players
	}

	getEnemies(): Array<Enemy>
	{
		var enemies = new Array<Enemy>()
		for (var character of this.characters) {
			if (character.class == "enemy") {
				enemies.push(character as Enemy)
			}
		}
		return enemies
	}

	getBuildings(): Array<Building>
	{
		var buildings = new Array<Building>()
		for (var character of this.characters) {
			if (character.class == "building") {
				buildings.push(character as Building)
			}
		}
		return buildings
	}

	createEnemiesIfNeeded()
	{
		var enemies = this.getEnemies()
		var shouldCreateEnemies = (enemies.length < 100)
		if (this.timeSinceLastEnemyKilled < 20 * 1000 ||
			this.timeSinceLastEnemyKilled > 40 * 1000) {
			shouldCreateEnemies = false
		}
		if (this.timeSinceLastEnemyKilled > 40 * 1000 && enemies.length == 0) {
			shouldCreateEnemies = true
		}
		
		if (shouldCreateEnemies) {
			var newEnemy = new EnemySlime()
			newEnemy.x = 3000 + Math.random() * 2400
			newEnemy.y = 3000 + Math.random() * 2400
			this.socket.emit("request_character", newEnemy.data())
		}
	}

	controlEnemies()
	{
		var enemies = this.getEnemies()
		for (var enemy of enemies) {
			if (enemy.owner == this.player.id) {
				enemy.ai()
				this.socket.emit("character", enemy.data())

				if (enemy.health <= 0) {
					this.socket.emit("delete_character", enemy.data())
				}
			}
		}
	}

	controlBuildings()
	{
		var buildings = this.getBuildings()
		for (var building of buildings) {
			if (building.owner == this.player.id) {
				building.ai()
				this.socket.emit("character", building.data())

				if (building.health <= 0) {
					this.socket.emit("delete_character", building.data())
				}
			}
		}
	}
}