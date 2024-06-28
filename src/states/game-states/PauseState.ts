import { PlayScene } from '../../scenes'
import State from '../../types/State'

class PauseState extends State {
    private scene: PlayScene
    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        return
    }

    exit(): void {
        return
    }

    execute(time: number, delta: number): void {
        if (
            this.scene.input.keyboard?.createCursorKeys().space?.isDown ||
            this.scene.input.activePointer.isDown
        ) {
            this.stateMachine.transition('play')
        }
    }
}

export default PauseState
