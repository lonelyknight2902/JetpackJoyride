import State from '../../types/State'

class StartState extends State {
    private scene: Phaser.Scene
    constructor(scene: Phaser.Scene) {
        super()
        this.scene = scene
    }
    
    enter(): void {
        return
    }

    exit(): void {
        return
    }

    execute(): void {
        if (this.scene.input.keyboard?.createCursorKeys().space?.isDown) {
            this.stateMachine.transition('play')
        }
    }
}

export default StartState
