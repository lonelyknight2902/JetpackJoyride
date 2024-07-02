import { ScoreManager } from "../manager"

class Score extends Phaser.GameObjects.Container {
    private distanceText: Phaser.GameObjects.BitmapText
    private bestDistanceText: Phaser.GameObjects.BitmapText
    private coinText: Phaser.GameObjects.BitmapText
    private scoreManager: ScoreManager
    private coinIcon: Phaser.GameObjects.Image
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scoreManager = ScoreManager.getInstance()
        // this.distanceText = scene.add.text(16, 16, '0000m', {
        //     fontSize: '64px',
        //     color: '#FFF',
        //     fontFamily: 'Arial',
        // })
        this.distanceText = scene.add.bitmapText(16, 16, 'NewAthleticM54Gray', '0000m', 64)
        // this.bestDistanceText = scene.add.text(16, 80, `BEST: ${this.scoreManager.getBestDistance()}`, {
        //     fontSize: '32px',
        //     color: '#FFF',
        //     fontFamily: 'Arial',
        // })
        this.bestDistanceText = scene.add.bitmapText(16, 80, 'NewAthleticM54DarkGray', `BEST: ${this.scoreManager.getBestDistance()}`, 32)
        // this.coinText = scene.add.text(16, 110, '000', {
        //     fontSize: '32px',
        //     color: '#FFF',
        //     fontFamily: 'Arial',
        // })
        this.coinText = scene.add.bitmapText(16, 110, 'NewAthleticM54Gold', '000', 36)
        this.coinText.setLetterSpacing(2.5)
        this.coinIcon = scene.add.image(this.coinText.width + 20, 120, 'coinIcon')
        this.coinIcon.setOrigin(0, 0)
        this.coinIcon.setScale(0.75)
        this.add(this.bestDistanceText)
        this.add(this.distanceText)
        this.add(this.coinText)
        this.add(this.coinIcon)
        scene.add.existing(this)
    }

    update(): void {
        this.distanceText.setText(`${String(Math.floor(this.scoreManager.getDistance())).padStart(4, '0')}m`)
        this.coinText.setText(`${String(Math.floor(this.scoreManager.getCoin())).padStart(3, '0')}`)
        this.bestDistanceText.setText(`BEST: ${this.scoreManager.getBestDistance()}`)
    }
}

export default Score
