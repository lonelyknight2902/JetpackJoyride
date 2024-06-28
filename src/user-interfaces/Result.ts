import { ScoreManager } from "../manager"

class Result extends Phaser.GameObjects.Container {
    private distanceText: Phaser.GameObjects.Text
    private coinText: Phaser.GameObjects.Text
    private scoreManager: ScoreManager
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scoreManager = ScoreManager.getInstance()
        const youFlewText = scene.add.text(0, 0, 'YOU FLEW', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
        })
        this.distanceText = scene.add.text(0, 60, `${this.scoreManager.getDistance()}m`, {
            fontFamily: 'Arial',
            fontSize: 72,
            color: '#ffffff',
        })
        this.coinText = scene.add.text(0, 150, 'Coins: 0', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
        })
        youFlewText.setOrigin(0.5)
        this.distanceText.setOrigin(0.5)
        this.coinText.setOrigin(0.5)
        this.add(youFlewText)
        this.add(this.distanceText)
        this.add(this.coinText)
        scene.add.existing(this)
    }

    update(): void {
        this.distanceText.setText(`${Math.floor(this.scoreManager.getDistance())}m`)
        this.coinText.setText(`Coins: ${this.scoreManager.getCoin()}`)
    }
}

export default Result