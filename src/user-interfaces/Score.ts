import { ScoreManager } from "../manager"

class Score extends Phaser.GameObjects.Container {
    private distanceText: Phaser.GameObjects.Text
    private bestDistanceText: Phaser.GameObjects.Text
    private coinText: Phaser.GameObjects.Text
    private scoreManager: ScoreManager
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scoreManager = ScoreManager.getInstance()
        this.distanceText = scene.add.text(16, 16, '0000m', {
            fontSize: '64px',
            color: '#FFF',
            fontFamily: 'Arial',
        })
        this.bestDistanceText = scene.add.text(16, 80, `BEST: ${this.scoreManager.getBestDistance()}`, {
            fontSize: '32px',
            color: '#FFF',
            fontFamily: 'Arial',
        })
        this.coinText = scene.add.text(16, 110, '000', {
            fontSize: '32px',
            color: '#FFF',
            fontFamily: 'Arial',
        })
        this.add(this.bestDistanceText)
        this.add(this.distanceText)
        this.add(this.coinText)
        scene.add.existing(this)
    }

    update(): void {
        this.distanceText.setText(`${String(Math.floor(this.scoreManager.getDistance())).padStart(4, '0')}m`)
        this.coinText.setText(`${String(Math.floor(this.scoreManager.getCoin())).padStart(3, '0')}`)
        this.bestDistanceText.setText(`BEST: ${this.scoreManager.getBestDistance()}`)
    }
}

export default Score
