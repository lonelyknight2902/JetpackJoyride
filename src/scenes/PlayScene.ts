import { Pickup, Player } from '../game-objects'

class PlayScene extends Phaser.Scene {
    private _player: Player
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    private _animatedTiles: any[] = []
    private _tileMap: Phaser.Tilemaps.Tilemap | undefined
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
        const titleMap = this.make.tilemap({ key: 'titleMap' })
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
        // const bestScreenTileset = titleMap.addTilesetImage('object', 'bestScreen')
        console.log(titleMap.tilesets)
        if (backgroundTitleTileset && backgroundTitleTileset2) {
            const titleLayer = titleMap.createLayer('Background', [
                backgroundTitleTileset,
                backgroundTitleTileset2,
            ])
            titleLayer?.setPosition(0, 0)
        }
        const layer = titleMap.getObjectLayer('Object Layer 1')
        // layer?.objects.forEach((object) => {
        //     const {gid, id} = object
        //     const objects = titleMap.createFromObjects('Object Layer 1', {gid})
        //     objects.forEach((object) => {
        //         this.add.existing(object)
        //     })
        // })
        this._player = new Player(this, 500, 200)
        this._player.setScale(2)
        const pickup = new Pickup(this, 200, 200)
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
        const platforms = this.physics.add.staticGroup()
        platforms
            .create(1365 / 2, 660, 'ground')
            .setScale(50, 1)
            .refreshBody()
        platforms
            .create(1365 / 2, 100, 'ground')
            .setScale(50, 1)
            .refreshBody()
        platforms.setVisible(false)
        // this.physics.add.collider(this._player, platforms)
        this.physics.add.collider(this._player, platforms)
        this.physics.add.collider(this._player, pickup, (player, pickup) => {
            pickup.destroy()
        })
        // this.cameras.main.startFollow(this._player)
        // this.cameras.
    }

    update() {
        this._player.update()
    }
}

export default PlayScene
