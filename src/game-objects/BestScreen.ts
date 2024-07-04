import { ScoreManager } from "../manager"

class BestScreen extends Phaser.GameObjects.Container {
    private bestText: Phaser.GameObjects.BitmapText
    private bestDistanceText: Phaser.GameObjects.BitmapText
    private screen: Phaser.GameObjects.Sprite
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        const bestDistance = ScoreManager.getInstance().getBestDistance()
        this.screen = scene.add.sprite(0, 0, 'bestScreen')
        this.screen.anims.create({
            key: 'bestScreen',
            frames: scene.anims.generateFrameNumbers('bestScreen', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.screen.setOrigin(0.5, 0)
        this.screen.play('bestScreen')
        this.bestText = scene.add.bitmapText(0, 18, 'NewAthleticM54Blue', 'BEST', 24)
        this.bestDistanceText = scene.add.bitmapText(0, 42, 'NewAthleticM54Blue', `${bestDistance}m`, 24)
        this.bestText.setOrigin(0.5, 0)
        this.bestDistanceText.setOrigin(0.5, 0)
        this.add(this.screen)
        this.add(this.bestText)
        this.add(this.bestDistanceText)
    }

    update(...args: any[]): void {
        const best = ScoreManager.getInstance().getBestDistance()
        this.bestDistanceText.setText(`${best}m`)
    }
}

export default BestScreen