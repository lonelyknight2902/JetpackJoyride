import { SCREEN_WIDTH } from '../../constants'
import { Laser } from '../../game-objects'
import State from '../../types/State'

class ExitState extends State {
    private laser: Laser
    private scene: Phaser.Scene
    private elapsedTime = 0
    constructor(laser: Laser, scene: Phaser.Scene) {
        super()
        this.laser = laser
        this.scene = scene
    }
    enter(): void {
        console.log('Laser ExitState')
        this.scene.tweens.add({
            targets: this.laser.laserPodLeft,
            x: -100,
            duration: 1000,
        })
        this.scene.tweens.add({
            targets: this.laser.laserPodRight,
            x: SCREEN_WIDTH + 100,
            duration: 1000,
        })
    }

    exit(): void {
        this.elapsedTime = 0
    }

    execute(time: number, delta: number): void {
        if (this.elapsedTime >= 1000) {
            this.stateMachine.transition('deactivate')
        }
        this.elapsedTime += delta
    }
}

export default ExitState
