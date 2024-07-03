import { MISSILE_SPEED } from '../../constants'
import { MissileContainer } from '../../game-objects'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class LaunchState extends State {
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
        console.log('LaunchState')
        this.missileContainer.missile.setVisible(true)
        this.missileContainer.missileAlert.setVisible(false)
        const body = this.missileContainer.missile.body as Phaser.Physics.Arcade.Body
        body.setVelocityX(-MISSILE_SPEED)
    }
    exit(): void {
        console.log('LaunchState exit')
    }
    execute(time: number, delta: number): void {
        console.log('LaunchState execute')
        if (this.missileContainer.missile.x < -this.missileContainer.x - 1000) {
            this.stateMachine.transition('deactivated')
        }
    }
}

export default LaunchState
