import { Coins, Player } from '../game-objects'
import { PlayScene } from '../scenes'

class LabMap extends Phaser.GameObjects.Container {
    private map: Phaser.Tilemaps.Tilemap
    private backgroundLayer: Phaser.Tilemaps.TilemapLayer | null
    private coins: Coins
    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y)
        this.map = scene.make.tilemap({ key: 'labMap' })
        this.width = this.map.widthInPixels
        const backgroundTitleTileset = this.map.addTilesetImage('lab1FG_1_TVOS', 'lab1')
        const backgroundTitleTileset2 = this.map.addTilesetImage('lab1FG_2_TVOS', 'lab2')

        if (backgroundTitleTileset && backgroundTitleTileset2) {
            this.backgroundLayer = this.map.createLayer('Background', [
                backgroundTitleTileset,
                backgroundTitleTileset2,
            ])
            if (this.backgroundLayer) {
                this.add(this.backgroundLayer)
                this.backgroundLayer.setPosition(0, 0)
            }
        }

        const player = Player.getInstance(scene, 200, 200)
        const laserSpawnPoint = this.map.createFromObjects('Trigger', {
            name: 'laser',
        })
        laserSpawnPoint.forEach((laser) => {
            if (laser) {
                scene.physics.add.existing(laser)
                scene.physics.world.enable(laser)
                const body = laser.body as Phaser.Physics.Arcade.Body
                body.setAllowGravity(false)
            }
            const laserSprite = laser as Phaser.GameObjects.Sprite
            laserSprite.setVisible(false)
        })

        this.scene.physics.add.overlap(laserSpawnPoint, player, (laser: any, player: any) => {
            const lasersContainer = scene.lasers
            if (lasersContainer.state === 'idle') {
                const randomNumber = Phaser.Math.Between(2, 4)
                lasersContainer.activateLasers(randomNumber)
            }
        })
        this.add(laserSpawnPoint)

        this.coins = new Coins(scene, 2000, 500)
        this.add(this.coins)
        scene.add.existing(this)
    }

    update(): void {
        if (this.backgroundLayer) {
            this.backgroundLayer.setPosition(this.x, this.y)
            // this.backgroundLayer.setDepth(10)
        }
    }

    getBackgroundLayer(): Phaser.Tilemaps.TilemapLayer | null {
        return this.backgroundLayer
    }

    reset() {
        this.coins.resetCoin()
    }
}

export default LabMap
