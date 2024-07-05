import { PlayScene } from "../scenes"
import Button from "./Button"

class Pause extends Phaser.GameObjects.Container {
    private pauseText: Phaser.GameObjects.BitmapText
    private continueButton: Button
    private homeButton: Button
    // private screen: Phaser.GameObjects.Sprite
    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y)
        this.pauseText = scene.add.bitmapText(0, -200, 'NewAthleticM54White', 'PAUSE', 64)
        this.pauseText.setOrigin(0.5, 0)
        this.continueButton = new Button(scene, 0, 0, 'Continue', () => {
            console.log('Continue')
            scene.stateMachine.transition('play')
            scene.sound.play('UISelect')
        })
        this.homeButton = new Button(scene, 0, 100, 'Home', () => {
            console.log('Home')
            scene.stateMachine.transition('start')
            scene.sound.play('UIBack')
        })

        this.add(this.pauseText)
        this.add(this.continueButton)
        this.add(this.homeButton)
        scene.add.existing(this)
    }
}

export default Pause