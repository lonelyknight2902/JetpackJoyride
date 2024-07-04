import { LOWER_BOUND, UPPER_BOUND } from '../constants'
import { Coins, Player, RotatingZapper, Zapper } from '../game-objects'
import { ScoreManager } from '../manager'
import { PlayScene } from '../scenes'

class HallwayMap extends Phaser.GameObjects.Container {
    private map: Phaser.Tilemaps.Tilemap
    private backgroundLayer: Phaser.Tilemaps.TilemapLayer | null
    private coins: Phaser.GameObjects.GameObject[]
    private scoreManager: ScoreManager
    private coinPickupSound: Phaser.Sound.BaseSound[]
    private currentSound = 0
    private zappers: Zapper[] = []
    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y)
        this.map = scene.make.tilemap({ key: 'hallwayMap' })
        this.width = this.map.widthInPixels
        const backgroundHallwayTileset = this.map.addTilesetImage('hallway1FG_1_TVOS', 'hallway1')
        const backgroundHallwayTileset2 = this.map.addTilesetImage('hallway1FG_2_TVOS', 'hallway2')
        if (backgroundHallwayTileset && backgroundHallwayTileset2) {
            this.backgroundLayer = this.map.createLayer('Background', [
                backgroundHallwayTileset,
                backgroundHallwayTileset2,
            ])
            if (this.backgroundLayer) {
                this.add(this.backgroundLayer)
                this.backgroundLayer.setPosition(this.x, this.y)
            }
        }
        const player = Player.getInstance(scene, 200, 200)
        const coinLayer = this.map.createLayer(0, 'coinLayer', 0, 0)
        const zapperLayer = this.map.createLayer(1, 'zapperLayer', 0, 0)
        const zapperSpawnPoint = this.map.filterObjects('Zapper', (obj) =>
            obj.name.includes('Zapper')
        )
        const missileSpawnPoint = this.map.createFromObjects('Trigger', {
            id: 75,
        })
        missileSpawnPoint.forEach((missile) => {
            if (missile) {
                scene.physics.add.existing(missile)
                scene.physics.world.enable(missile)
                const body = missile.body as Phaser.Physics.Arcade.Body
                body.setAllowGravity(false)
            }
            const missileSprite = missile as Phaser.GameObjects.Sprite
            missileSprite.setVisible(false)
        })
        this.add(missileSpawnPoint)
        scene.physics.add.overlap(
            missileSpawnPoint,
            player,
            (missile: any, player: any) => {
                const missilesContainer = scene.missiles
                console.log('Missile Attack')
                console.log('Missile state: ', missilesContainer.state)
                if (missilesContainer.state == 'idle') {
                    const randomNumber = Phaser.Math.Between(3, 6)
                    missilesContainer.launch(randomNumber)
                    console.log('Missile is Attacking')
                }
            },
            undefined,
            this
        )
        zapperSpawnPoint?.forEach((zapper) => {
            console.log(zapper)
            if (zapper) {
                const x = zapper.x ? zapper.x : 0
                const y = zapper.y ? zapper.y : 0
                const type = Phaser.Math.Between(0, 1)
                let zapperObject: Zapper
                if (type == 0) {
                    zapperObject = new Zapper(scene, x, y)
                } else {
                    zapperObject = new RotatingZapper(scene, x, y)
                }
                this.zappers.push(zapperObject)
                this.add(zapperObject)
            }
        })
        // const coinX = Math.random() * (this.width - 200)
        // const coinY = Math.random() * (LOWER_BOUND - UPPER_BOUND - 100) + UPPER_BOUND
        // this.coins = new Coins(scene, coinX, coinY)
        this.coins = this.map.createFromObjects('Coin', { gid: 9525, key: 'coin' })
        this.scoreManager = ScoreManager.getInstance()
        scene.anims.play('spin', this.coins)
        this.coins.forEach((coin: Phaser.GameObjects.GameObject) => {
            scene.physics.add.existing(coin)
            scene.physics.world.enable(coin)
            const body = coin.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            coin.state = 'idle'
        })

        this.add(this.coins)
        scene.physics.add.overlap(player, this.coins, this.collectCoin, undefined, this)
        scene.add.existing(this)
        this.coinPickupSound = [
            this.scene.sound.add('coinPickup1'),
            this.scene.sound.add('coinPickup2'),
            this.scene.sound.add('coinPickup3'),
        ]
    }

    update(time: number, delta: number): void {
        if (this.backgroundLayer) {
            this.backgroundLayer.setPosition(this.x, this.y)
        }
        this.zappers.forEach((zapper) => {
            zapper.update(time, delta)
        })
    }

    getBackgroundLayer(): Phaser.Tilemaps.TilemapLayer | null {
        return this.backgroundLayer
    }

    collectCoin(player: any, coin: any): void {
        if (coin.state == 'collected') return
        console.log('Coin collected')
        coin.state = 'collected'
        this.scene.anims.play('collect', coin)
        this.scoreManager.increaseCoin(1)
        this.coinPickupSound[this.currentSound].play()
        this.currentSound = (this.currentSound + 1) % this.coinPickupSound.length
    }

    reset() {
        // this.coins.resetCoin()
        this.coins
            .filter((coin) => coin.state == 'collected')
            .forEach((coin: Phaser.GameObjects.GameObject) => {
                // coin.setVisible(true)
                ;(coin as Phaser.GameObjects.Sprite).setVisible(true)
                this.scene.anims.play('spin', coin)
                coin.state = 'idle'
            })
        // const coinX = Math.random() * (this.width - 200)
        // const coinY = Math.random() * (LOWER_BOUND - UPPER_BOUND - 100) + UPPER_BOUND
        // this.coins.setPosition(coinX, coinY)
    }
}

export default HallwayMap
