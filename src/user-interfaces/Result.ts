import { ScoreManager } from '../manager'
import { PlayScene } from '../scenes'
import Button from './Button'

class Result extends Phaser.GameObjects.Container {
    private distanceText: Phaser.GameObjects.BitmapText
    private coinText: Phaser.GameObjects.BitmapText
    private scoreManager: ScoreManager
    private nextButton: Button
    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y)
        this.scoreManager = ScoreManager.getInstance()
        // const youFlewText = scene.add.text(0, 0, 'YOU FLEW', {
        //     fontFamily: 'Arial',
        //     fontSize: 32,
        //     color: '#ffffff',
        // })
        const youFlewText = scene.add.bitmapText(0, 0, 'NewAthleticM54GrayInverted', 'YOU FLEW', 32)
        // this.distanceText = scene.add.text(0, 60, `${this.scoreManager.getDistance()}m`, {
        //     fontFamily: 'Arial',
        //     fontSize: 72,
        //     color: '#ffffff',
        // })
        this.distanceText = scene.add.bitmapText(
            0,
            60,
            'NewAthleticM54Gold',
            `${this.scoreManager.getDistance()}m`,
            72
        )
        const andCollectedText = scene.add.bitmapText(0, 140, 'NewAthleticM54GrayInverted', 'AND COLLECTED', 32)
        this.coinText = scene.add.bitmapText(0, 200, 'NewAthleticM54Gold', `${this.scoreManager.getCoin()}`, 32)
        youFlewText.setOrigin(0.5)
        this.distanceText.setOrigin(0.5)
        andCollectedText.setOrigin(0.5)
        this.coinText.setOrigin(0.5)
        this.nextButton = new Button(scene, 0, 300, 'Next', () => {
            console.log('Next')
            // scene.scene.start('play')
            scene.stateMachine.transition('start')
            scene.sound.play('UIBack')
        })
        this.add(youFlewText)
        this.add(this.distanceText)
        this.add(andCollectedText)
        this.add(this.coinText)
        this.add(this.nextButton)
        scene.add.existing(this)
    }

    update(): void {
        this.distanceText.setText(`${Math.floor(this.scoreManager.getDistance())}m`)
        this.coinText.setText(`Coins: ${this.scoreManager.getCoin()}`)
    }
}

export default Result
