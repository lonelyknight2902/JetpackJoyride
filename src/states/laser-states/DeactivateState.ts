import { SCREEN_WIDTH } from '../../constants'
import { Laser } from '../../game-objects'
import State from '../../types/State'

class DeactivateState extends State {
    private laser: Laser
    private scene: Phaser.Scene
    private elapsedTime = 0
    constructor(laser: Laser, scene: Phaser.Scene) {
        super()
        this.laser = laser
        this.scene = scene
    }
    enter(): void {
        this.laser.laserPodLeft.x = -100
        this.laser.laserPodRight.x = SCREEN_WIDTH + 100
        this.laser.laserBeam.setVisible(false)
        this.laser.laserBeam.setActive(false)
        this.laser.laserEnergyLeft.setVisible(false)
        this.laser.laserFlashLeft.setVisible(false)
        this.laser.laserEnergyRight.setVisible(false)
        this.laser.laserFlashRight.setVisible(false)
    }

    exit(): void {
        return
    }

    execute(time: number, delta: number): void {
        // this.elapsedTime += delta
        console.log('DeactivateState')
    }
}

export default DeactivateState
