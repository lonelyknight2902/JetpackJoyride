import { HallwayMap, LabMap } from '../../maps'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class GameOverState extends State {
    private scene: PlayScene
    private time: number
    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        return
    }

    exit(): void {
        this.scene.initialMapList.forEach((map) => {
            if (map instanceof LabMap || map instanceof HallwayMap) {
                map.reset()
            }
        })
    }

    execute(): void {
        if (
            this.scene.input.keyboard?.createCursorKeys().space?.isDown ||
            this.scene.input.activePointer.isDown
        ) {
            this.stateMachine.transition('start')
            this.scene.getPlayer().stateMachine.transition('player-run')
        }
    }
}

export default GameOverState
