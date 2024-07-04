import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants"

class Pause extends Phaser.GameObjects.Container {
    private pauseText: Phaser.GameObjects.BitmapText
    // private screen: Phaser.GameObjects.Sprite
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.pauseText = scene.add.bitmapText(0, -200, 'NewAthleticM54White', 'PAUSE', 64)
        this.pauseText.setOrigin(0.5, 0)
        this.add(this.pauseText)
        scene.add.existing(this)
    }
}

export default Pause