import { LOWER_BOUND, UPPER_BOUND } from '../constants'
import { Coins, Player, Zapper } from '../game-objects'
import { ScoreManager } from '../manager'

class HallwayMap extends Phaser.GameObjects.Container {
    private map: Phaser.Tilemaps.Tilemap
    private backgroundLayer: Phaser.Tilemaps.TilemapLayer | null
    private coins: Phaser.GameObjects.GameObject[]
    private scoreManager: ScoreManager
    private coinPickupSound: Phaser.Sound.BaseSound[]
    private currentSound = 0
    constructor(scene: Phaser.Scene, x: number, y: number) {
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
        const coinLayer = this.map.createLayer(0, 'coinLayer', 0, 0)
        const zapperLayer = this.map.createLayer(1, 'zapperLayer', 0, 0)
        const zapperSpawnPoint = this.map.filterObjects('Zapper', (obj) =>
            obj.name.includes('Zapper')
        )
        zapperSpawnPoint?.forEach((zapper) => {
            console.log(zapper)
            if (zapper) {
                const x = zapper.x ? zapper.x : 0
                const y = zapper.y ? zapper.y : 0
                const zapperObject = new Zapper(scene, x, y)
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
        const player = Player.getInstance(scene, 200, 200)
        scene.physics.add.overlap(player, this.coins, this.collectCoin, undefined, this)
        scene.add.existing(this)
        this.coinPickupSound = [
            this.scene.sound.add('coinPickup1'),
            this.scene.sound.add('coinPickup2'),
            this.scene.sound.add('coinPickup3'),
        ]
    }

    update(): void {
        if (this.backgroundLayer) {
            this.backgroundLayer.setPosition(this.x, this.y)
        }
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
