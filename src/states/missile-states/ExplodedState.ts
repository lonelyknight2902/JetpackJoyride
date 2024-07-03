import { MissileContainer } from '../../game-objects'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class ExplodedState extends State {
    private missileContainer: MissileContainer
    private scene: PlayScene
    private elapsedTime = 0
    constructor(missileContainer: MissileContainer, scene: PlayScene) {
        super()
        this.missileContainer = missileContainer
        this.scene = scene
    }
    enter(): void {
        console.log('ExplodedState')
        this.missileContainer.missile.explode()
        const body = this.missileContainer.missile.body as Phaser.Physics.Arcade.Body
        body.setVelocityX(0)
        this.missileContainer.missileExplodeAudio.play()
    }

    exit(): void {
        console.log('ExplodedState exit')
        this.missileContainer.missileExplodeAudio.stop()
    }

    execute(time: number, delta: number): void {
        console.log('ExplodedState execute')
        this.elapsedTime += delta
        if (this.elapsedTime > 1000) {
            this.stateMachine.transition('deactivated')
            this.elapsedTime = 0
        }
    }
}

export default ExplodedState
