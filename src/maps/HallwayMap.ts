import { Coins } from "../game-objects"

class HallwayMap extends Phaser.GameObjects.Container {
    private map: Phaser.Tilemaps.Tilemap
    private backgroundLayer: Phaser.Tilemaps.TilemapLayer | null
    private coins: Coins
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
        this.coins = new Coins(scene, 2000, 500)
        this.add(this.coins)
        scene.add.existing(this)
    }

    update(): void {
        if (this.backgroundLayer) {
            this.backgroundLayer.setPosition(this.x, this.y)
        }
    }

    getBackgroundLayer(): Phaser.Tilemaps.TilemapLayer | null {
        return this.backgroundLayer
    }

    reset() {
        this.coins.resetCoin()
    }
}

export default HallwayMap
