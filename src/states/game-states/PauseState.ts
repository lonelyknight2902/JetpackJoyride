import { TRANSITION_DELAY } from '../../constants'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class PauseState extends State {
    private scene: PlayScene
    private pauseKey: Phaser.Input.Keyboard.Key | undefined
    private elapsedTime = 0
    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        this.scene.getPlayer().pause()
        this.pauseKey = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        this.scene.physics.pause()
        this.scene.zapperSpawnEvent.paused = true
        // this.scene.scene.pause()
    }

    exit(): void {
        this.scene.getPlayer().resume()
        this.scene.physics.resume()
        this.elapsedTime = 0
        // this.scene.scene.resume()
    }

    execute(time: number, delta: number): void {
        if (
            (this.pauseKey && Phaser.Input.Keyboard.JustDown(this.pauseKey) ||
            this.scene.input.activePointer.isDown) && this.elapsedTime >= 500
        ) {
            console.log('PauseState -> PlayState')
            this.stateMachine.transition('play')
        }

        this.elapsedTime += delta
    }
}

export default PauseState
