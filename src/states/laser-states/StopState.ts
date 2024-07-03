import { Laser } from '../../game-objects'
import State from '../../types/State'

class StopState extends State {
    private laser: Laser
    private scene: Phaser.Scene
    private elapsedTime = 0
    constructor(laser: Laser, scene: Phaser.Scene) {
        super()
        this.laser = laser
        this.scene = scene
    }
    enter(): void {
        console.log('Laser StopState')
        this.laser.laserPodLeft.play('laser-idle')
        this.laser.laserPodRight.play('laser-idle')
        this.laser.laserBeam.play('laser-beam-off')
        this.laser.laserFlashLeft.play('laser-off')
        this.laser.laserFlashRight.play('laser-off')
        this.laser.laserBeam.setActive(false)
    }

    exit(): void {
        return
    }

    execute(time: number, delta: number): void {
        if (this.elapsedTime >= 1000) {
            this.stateMachine.transition('exit')
            this.elapsedTime = 0
        }
        this.elapsedTime += delta
    }
}

export default StopState
