import { PlayScene } from '../scenes'

class PauseButton extends Phaser.GameObjects.Image {
    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y, 'pauseButton')
        this.setInteractive()
        this.setScale(1)
        scene.add.existing(this)
        this.on('pointerdown', () => {
            this.setScale(0.8)
            // scene.stateMachine.transition('pause')
        })
        this.on('pointerup', () => {
            if (scene.stateMachine.getState() === 'pause') return
            this.setScale(1)
            scene.stateMachine.transition('pause')
            scene.sound.play('UISelect')
        })
    }
}

export default PauseButton
