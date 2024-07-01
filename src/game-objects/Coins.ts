import { ScoreManager } from '../manager'
import Player from './Player'

class Coins extends Phaser.GameObjects.Container {
    private coinMap: Phaser.Tilemaps.Tilemap
    private coins: Phaser.GameObjects.GameObject[]
    private scoreManager: ScoreManager
    private coinPickupSound: Phaser.Sound.BaseSound[]
    private currentSound = 0
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene = scene
        this.coinMap = this.scene.make.tilemap({ key: 'coinShape' })
        const layer = this.coinMap.createLayer(0, 'coinLayer', 0, 0)
        this.coins = this.coinMap.createFromObjects('Coin', { gid: 1, key: 'coin' })
        scene.anims.play('spin', this.coins)
        this.add(this.coins)
        this.coins.forEach((coin: Phaser.GameObjects.GameObject) => {
            scene.physics.add.existing(coin)
            scene.physics.world.enable(coin)
            const body = coin.body as Phaser.Physics.Arcade.Body
            body.setAllowGravity(false)
            coin.state = 'idle'
        })
        this.scoreManager = ScoreManager.getInstance()

        const player = Player.getInstance(scene, 200, 200)
        scene.physics.add.overlap(player, this.coins, this.collectCoin, undefined, this)
        this.scene.add.existing(this)
        this.coinPickupSound = [
            this.scene.sound.add('coinPickup1'),
            this.scene.sound.add('coinPickup2'),
            this.scene.sound.add('coinPickup3')
        ]
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

    resetCoin(): void {
        console.log('Coin reset')
        this.coins.filter((coin) => coin.state == 'collected').forEach((coin: Phaser.GameObjects.GameObject) => {
            // coin.setVisible(true)
            (coin as Phaser.GameObjects.Sprite).setVisible(true)
            this.scene.anims.play('spin', coin)
            coin.state = 'idle'
        })
    }
}

export default Coins
