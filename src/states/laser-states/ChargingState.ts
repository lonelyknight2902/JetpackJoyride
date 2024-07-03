import { Laser } from '../../game-objects'
import State from '../../types/State'

class ChargingState extends State {
    private laser: Laser
    private scene: Phaser.Scene
    private elapsedTime = 0
    constructor(laser: Laser, scene: Phaser.Scene) {
        super()
        this.laser = laser
        this.scene = scene
    }
    enter(): void {
        console.log('Laser ChargingState')
        this.laser.laserEnergyLeft.setVisible(true)
        this.laser.laserEnergyRight.setVisible(true)
        this.laser.laserWarning.setVisible(true)
        this.laser.laserPodLeft.play('laser-charge')
        this.laser.laserPodRight.play('laser-charge')
        this.laser.laserEnergyLeft.play('laser-ready')
        this.laser.laserEnergyRight.play('laser-ready')
    }

    exit(): void {
        return
    }

    execute(time: number, delta: number): void {
        this.elapsedTime += delta
        if (this.elapsedTime >= 1000) {
            this.stateMachine.transition('firing')
            this.elapsedTime = 0
        }
    }
}

export default ChargingState
