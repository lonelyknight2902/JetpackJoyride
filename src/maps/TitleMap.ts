import { BestScreen, Coins, JetpackStand } from "../game-objects"

class TitleMap extends Phaser.GameObjects.Container {
    private map: Phaser.Tilemaps.Tilemap
    private backgroundLayer: Phaser.Tilemaps.TilemapLayer | null
    private coins: Coins
    private wallHole: Phaser.GameObjects.Image
    private dust: Phaser.GameObjects.Particles.ParticleEmitter
    private smoke: Phaser.GameObjects.Particles.ParticleEmitter
    private bestScreen: BestScreen
    private jetpackStand: JetpackStand
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.map = scene.make.tilemap({ key: 'titleMap' })
        this.width = this.map.widthInPixels
        const backgroundTitleTileset = this.map.addTilesetImage(
            'titleFG_1_TVOS',
            'titleBackground1'
        )
        const backgroundTitleTileset2 = this.map.addTilesetImage(
            'titleFG_2_TVOS',
            'titleBackground2'
        )
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

        this.wallHole = scene.add.image(32, 690, 'titleWallHole')
        this.wallHole.setOrigin(0.25, 1)
        this.wallHole.setScale(2)
        this.wallHole.setVisible(false)
        this.add(this.wallHole)
        this.dust = scene.add.particles(32, 690, 'dust', {
            speed: { min: 500, max: 900 },
            lifespan: 2000,
            gravityY: 150,
            blendMode: 'ADD',
            scale: { start: 1.5, end: 0 },
            emitting: false
        })
        // this.smoke = scene.add.particles(32, 690, 'smoke', {
        //     speed: 200,
        //     lifespan: 2000,
        //     gravityY: 2000,
        //     blendMode: 'ADD',
        //     scale: 1,
        // })
        this.dust.setAngle(-90)
        // this.smoke.setAngle(-90)
        this.dust.stop()
        this.bestScreen = new BestScreen(scene, 695, 490)
        this.jetpackStand = new JetpackStand(scene, 200, 680)
        this.jetpackStand.setOrigin(0, 1)
        this.jetpackStand.setScale(2)
        // this.smoke.stop()
        // this.dust.stop()
        this.add(this.bestScreen)
        this.add(this.jetpackStand)
        this.add(this.dust)
        // this.add(this.smoke)
        scene.add.existing(this)
    }

    update(): void {
        if (this.backgroundLayer) {
            this.backgroundLayer.setPosition(this.x, this.y)
            // this.backgroundLayer.setDepth(10)
        }
    }

    start(): void {
        this.jetpackStand.setFrame(1)
    }

    reset(): void {
        this.jetpackStand.setFrame(0)
        this.bestScreen.update()
    }

    getBackgroundLayer(): Phaser.Tilemaps.TilemapLayer | null {
        return this.backgroundLayer
    }

    getWallHole(): Phaser.GameObjects.Image {
        return this.wallHole
    }

    displayHole(): void {
        this.wallHole.setVisible(true)
    }

    hideHole(): void {
        this.wallHole.setVisible(false)
    }

    explode(): void {
        this.dust.explode(90)
        // this.smoke.explode(10, this.wallHole.x, this.wallHole.y)
    }

    displaySmoke(): void {
        this.dust.start()
        // this.smoke.start()
    }

    hideSmoke(): void {
        this.dust.stop()
        // this.smoke.stop()
    }
}

export default TitleMap
