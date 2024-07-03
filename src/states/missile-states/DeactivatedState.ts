import { MissileContainer } from '../../game-objects'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class DeactivatedState extends State {
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
        console.log('DeactivatedState')
        this.missileContainer.missileAlert.setVisible(false)
        this.missileContainer.missile.setVisible(false)
        const body = this.missileContainer.missile.body as Phaser.Physics.Arcade.Body
        body.setVelocityX(0)
        this.missileContainer.missile.setPosition(50, 0)
        this.missileContainer.state = 'idle'
        this.missileContainer.missileWarningAudio.stop()
        this.missileContainer.missileExplodeAudio.stop()
        this.missileContainer.missileLaunchAudio.stop()
    }
    exit(): void {
        console.log('DeactivatedState exit')
        this.missileContainer.missile.reset()
    }
    execute(time: number, delta: number): void {
        console.log('DeactivatedState execute')
    }
}

export default DeactivatedState
