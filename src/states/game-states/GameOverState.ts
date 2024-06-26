import State from '../../types/State'

class GameOverState extends State {
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

export default GameOverState
