import { PlayScene } from '../../scenes'
import State from '../../types/State'

class ResultState extends State {
    private scene: PlayScene
    private time: number
    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        this.scene.resultUI.update()
        this.scene.resultUI.setVisible(true)
        this.scene.overlay.setVisible(true)
        this.scene.physics.pause()
        this.scene.game.sound.stopAll()
        this.scene.menuMusic.play()
    }

    exit(): void {
        this.scene.scoreManager.reset()
        this.scene.resultUI.setVisible(false)
        this.scene.overlay.setVisible(false)
        this.scene.resultUI.update()
        this.scene.physics.resume()
        this.scene.menuMusic.stop()
    }

    execute(time: number, delta: number): void {
        // if (
        //     this.scene.input.keyboard?.createCursorKeys().space?.isDown ||
        //     this.scene.input.activePointer.isDown
        // ) {
        //     this.stateMachine.transition('start')
        //     this.scene.getPlayer().stateMachine.transition('player-run')
        // }
    }
}

export default ResultState
