import { Laser } from '../../game-objects'
import State from '../../types/State'

class FiringState extends State {
    private laser: Laser
    private scene: Phaser.Scene
    private elapsedTime = 0
    constructor(laser: Laser, scene: Phaser.Scene) {
        super()
        this.laser = laser
        this.scene = scene
    }
    enter(): void {
        console.log('Laser FiringState')
        this.laser.laserPodLeft.play('laser-fire')
        this.laser.laserPodRight.play('laser-fire')
        this.laser.laserEnergyLeft.play('laser-done')
        this.laser.laserEnergyRight.play('laser-done')
        this.laser.laserFlashLeft.setVisible(true)
        this.laser.laserFlashRight.setVisible(true)
        this.laser.laserFlashLeft.play('laser-on')
        this.laser.laserFlashRight.play('laser-on')
        this.laser.laserBeam.setVisible(true)
        this.laser.laserBeam.setActive(true)
        this.laser.laserWarning.setVisible(false)
        this.laser.laserBeam.play('laser-beam-on')
    }

    exit(): void {
        this.laser.laserBeam.setVisible(false)
        this.laser.laserBeam.setActive(false)
    }

    execute(time: number, delta: number): void {
        this.elapsedTime += delta
        if (this.elapsedTime >= 2000) {
            this.stateMachine.transition('stop')
            this.elapsedTime = 0
        }
    }
}

export default FiringState
