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

    execute(): void {
        return
    }
}

export default PauseState
