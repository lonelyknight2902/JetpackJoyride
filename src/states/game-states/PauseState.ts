import State from '../../types/State'

class PauseState extends State {
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
        return
    }
}

export default PauseState
