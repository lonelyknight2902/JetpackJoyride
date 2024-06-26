import { Player } from '../game-objects'
import { HallwayMap, LabMap, TitleMap } from '../maps'
import { StateMachine } from '../states'
import { GameOverState, PauseState, PlayState, StartState } from '../states/game-states'

class PlayScene extends Phaser.Scene {
    private stateMachine: StateMachine
    private _player: Player
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    private _animatedTiles: any[] = []
    private _tileMap: Phaser.Tilemaps.Tilemap | undefined
    private backgroundLayer: Phaser.Tilemaps.TilemapLayer | null
    private map: Phaser.GameObjects.Container
    private mapList: Phaser.GameObjects.Container[] = []
    private readyMap: Phaser.GameObjects.Container[] = []
    private platforms: Phaser.Physics.Arcade.StaticGroup | undefined
    constructor() {
        super('PlayScene')
    }

    preload() {
        this.load.scenePlugin(
            'AnimatedTiles',
            'https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js',
            'animatedTiles',
            'animatedTiles'
        )
    }

    create() {
        // const renderTexture = this.add.renderTexture(0, 0, 32, 32)
        // renderTexture.saveTexture('player')
        // const hallway1 = this.add.image(920, 768 / 2, 'hallway1')
        // hallway1.setOrigin(0, 0.5)
        // const background = this.add.image(-100, 768 / 2, 'titleBackground1')
        // background.setOrigin(0, 0.5)
        // const background2 = this.add.image(1024 - 228, 768 / 2, 'titleBackground2')
        // background2.setOrigin(0, 0.5)
        // this.loadTileMap()
        this.map = this.add.container(0, 0)
        const labmap = new LabMap(this, 928 + 4032 - 32*6, 0)
        const titleMap = new TitleMap(this, 0, 0)
        const hallwayMap = new HallwayMap(this, 928, 0)
        console.log(hallwayMap.width)
        console.log(labmap.width)
        console.log(titleMap.width)
        // hallwayMap2.getBackgroundLayer()?.setDepth(0)
        // hallwayMap.getBackgroundLayer()?.setDepth(1)
        // titleMap.getBackgroundLayer()?.setDepth(10)
        this.map.add(titleMap)
        this.map.add(hallwayMap)
        this.map.add(labmap)
        this.map.sendToBack(hallwayMap)
        this.map.sendToBack(labmap)
        this.mapList = [titleMap, hallwayMap, labmap]

        this._player = new Player(this, 500, 200)
        this._player.setScale(2)
        // const pickup = new Pickup(this, 200, 200)
        const coinMap = this.make.tilemap({ key: 'arrowCoinMap' })
        const coinTileset = coinMap.addTilesetImage('coin1_TVOS', 'coin')
        this._tileMap = coinMap
        if (coinTileset != null) {
            const coinLayer = coinMap.createLayer('Tile Layer 1', coinTileset)
            coinLayer?.setPosition(500, 0)
        }
        coinMap.getObjectLayer('Tile Layer 1')?.objects
        // this.physics.add.existing(this._player)
        // player.play('touchdown')
        this.cursors = this.input.keyboard?.createCursorKeys()
        this.platforms = this.physics.add.staticGroup()
        this.platforms
            .create(1365 / 2, 660, 'ground')
            .setScale(50, 1)
            .refreshBody()
        this.platforms
            .create(1365 / 2, 100, 'ground')
            .setScale(50, 1)
            .refreshBody()
        this.platforms.setVisible(false)
        // this.physics.add.collider(this._player, platforms)
        this.physics.add.collider(this._player, this.platforms)
        // this.physics.add.collider(this._player, pickup, (player, pickup) => {
        //     pickup.destroy()
        // })
        // this.physics.add.collider(this._player.getBullet(), this.platforms)
        // const gramophone = new Gramophone(this, 100, 100)
        // this.cameras.main.startFollow(this._player)
        // this.cameras.
        // this.add.image(100, 100, 'hallway', 'sectorText_TVOS').setOrigin(0, 0)

        this.stateMachine = new StateMachine('start', {
            'start': new StartState(this),
            'play': new PlayState(this),
            'pause': new PauseState(this),
            'over': new GameOverState(this),
        })
    }

    update(time: number, delta: number) {
        this._player.update()
        this.map.each((map: Phaser.GameObjects.Container) => {
            if (map.x + map.width < 0) {
                this.map.remove(map)
                this.mapList.shift()
                if (!(map instanceof TitleMap)) {
                    // this.readyMap.push(map)
                    console.log(this.mapList)
                    map.x =
                        this.mapList[this.mapList.length - 1].x +
                        this.mapList[this.mapList.length - 1].width -
                        6 * 32
                    this.mapList.push(map)
                    this.map.add(map)
                    this.map.sendToBack(map)
                }
            }
            map.x -= (500 * delta) / 1000
            map.update()
        })

        // this._player.getBullet().forEachAlive((bullet) => {
        //     const particleBound = bullet.getBounds()
        //     const platformsBound = this.platforms?.children.entries[0].body?.position.y
        //     console.log(particleBound.bottom + this._player.y)
        //     console.log(platformsBound)
        //     if (platformsBound && particleBound.top + this._player.y > platformsBound) {
        //         bullet.kill()
        //     }
        // }, this)
        if (this.backgroundLayer) {
            this.backgroundLayer.x -= 0.5
        }
    }

    loadTileMap() {
        const titleMap = this.make.tilemap({ key: 'titleMap' })
        const hallway1Map = this.make.tilemap({ key: 'hallway1Map' })
        const backgroundTitleTileset = titleMap.addTilesetImage(
            'titleFG_1_TVOS',
            'titleBackground1'
        )
        const backgroundTitleTileset2 = titleMap.addTilesetImage(
            'titleFG_2_TVOS',
            'titleBackground2'
        )
        const alarmLightTileset = titleMap.addTilesetImage(
            'jetpack-joyride-assets/jetpack-joyride-assets/Levels/Title/alarmLight_TVOS.png',
            'alarmLight'
        )
        titleMap.addTilesetImage(
            'jetpack-joyride-assets/jetpack-joyride-assets/Levels/Title/doNotTouchSign_TVOS.png',
            'doNotTouchSign'
        )
        titleMap.addTilesetImage(
            'jetpack-joyride-assets/jetpack-joyride-assets/Levels/Title/Objects/JetpackStand.png',
            'jetpackStand'
        )
        titleMap.addTilesetImage(
            'jetpack-joyride-assets/jetpack-joyride-assets/Levels/Title/gramophone_TVOS.png',
            'gramophone'
        )
        titleMap.addTilesetImage(
            'jetpack-joyride-assets/jetpack-joyride-assets/Levels/Title/lightEffect.png',
            'lightEffect'
        )
        titleMap.addTilesetImage(
            'jetpack-joyride-assets/jetpack-joyride-assets/Levels/Title/lightEffect2.png',
            'lightEffect2'
        )
        titleMap.addTilesetImage(
            'jetpack-joyride-assets/jetpack-joyride-assets/Levels/Title/table.png',
            'table'
        )
        titleMap.addTilesetImage(
            'jetpack-joyride-assets/jetpack-joyride-assets/Levels/Title/title_light_TVOS.png',
            'titleLight'
        )
        titleMap.addTilesetImage(
            'jetpack-joyride-assets/jetpack-joyride-assets/Levels/Title/bestScreen_TVOS.png',
            'bestScreen'
        )

        console.log(alarmLightTileset)
        console.log(titleMap.tilesets)
        console.log(titleMap.layer)

        const hallway1 = hallway1Map.addTilesetImage('hallway1FG_1_TVOS', 'hallway1')
        const hallway2 = hallway1Map.addTilesetImage('hallway1FG_2_TVOS', 'hallway2')
        const sectorNumbers = hallway1Map.addTilesetImage('sectorNumbers_TVOS', 'sectorNumbers')
        const sectorLight = hallway1Map.addTilesetImage('sectorLight', 'sectorLight')
        const hallwayAssets = hallway1Map.addTilesetImage('hallway_assets', 'hallwayAssets')
        if (hallway1 && hallway2 && sectorNumbers && sectorLight && hallwayAssets) {
            const hallwayLayer = hallway1Map.createLayer('Tile Layer 1', [hallway1])
            const hallwayLayer2 = hallway1Map.createLayer('Tile Layer 2', [hallway2, sectorNumbers])
            const hallwayLayer3 = hallway1Map.createLayer('Tile Layer 3', [
                sectorLight,
                hallwayAssets,
            ])
            hallwayLayer?.setPosition(960, 0)
            hallwayLayer2?.setPosition(1300, 0)
            hallwayLayer3?.setPosition(1300, 0)
        }

        if (backgroundTitleTileset && backgroundTitleTileset2) {
            this.backgroundLayer = titleMap.createLayer('Background', [
                backgroundTitleTileset,
                backgroundTitleTileset2,
            ])
            this.backgroundLayer?.setPosition(0, 0)
        }

        // if (alarmLightTileset) {
        //     titleMap.createLayer('Object Layer 1', [alarmLightTileset])
        // }
        // const object = titleMap.createFromObjects('Object Layer 1', { gid: 2092 })
        // this.add.existing(object[0])
        // console.log(object)
        const layer = titleMap.getObjectLayer('Object')
        console.log(layer)
        layer?.objects.forEach((object) => {
            if (!object) return
            console.log(object)
            console.log(
                titleMap.tilesets.find((tileset) => tileset.firstgid === object.gid)?.image?.key
            )
            const key = titleMap.tilesets.find((tileset) => tileset.firstgid === object.gid)?.image
                ?.key
            const x = object.x ? object.x : 0
            const y = object.y ? object.y : 0
            if (key) {
                const sprite = this.add.sprite(x, y, key)
                sprite.setOrigin(0, 1)
            }
        })
    }
}

export default PlayScene
