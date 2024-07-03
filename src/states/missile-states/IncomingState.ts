import { MissileContainer } from '../../game-objects'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class IncomingState extends State {
    private missileContainer: MissileContainer
    private scene: PlayScene
    private elapsedTime: number
    constructor(missileContainer: MissileContainer, scene: PlayScene) {
        super()
        this.elapsedTime = 0
        this.missileContainer = missileContainer
        this.scene = scene
    }

    enter(): void {
        console.log('IncomingState')
        this.missileContainer.missileAlert.play('missileIncoming')
    }

    exit(): void {
        console.log('IncomingState exit')
        this.missileContainer.missileAlert.setVisible(false)
    }

    execute(time: number, delta: number): void {
        console.log('IncomingState execute')
        this.elapsedTime += delta
        if (this.elapsedTime > 1000) {
            this.stateMachine.transition('launch')
            this.elapsedTime = 0
        }
    }
}

export default IncomingState
