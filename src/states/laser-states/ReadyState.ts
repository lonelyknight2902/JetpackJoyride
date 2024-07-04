import { SCREEN_WIDTH } from '../../constants'
import { Laser } from '../../game-objects'
import State from '../../types/State'

class ReadyState extends State {
    private laser: Laser
    private scene: Phaser.Scene
    private elapsedTime = 0
    constructor(laser: Laser, scene: Phaser.Scene) {
        super()
        this.laser = laser
        this.scene = scene
    }
    enter(): void {
        console.log('Laser ReadyState')
        this.laser.laserPodLeft.play('laser-idle')
        this.laser.laserPodRight.play('laser-idle')
        this.scene.tweens.add({
            targets: this.laser.laserPodLeft,
            x: 0,
            duration: 1000,
        })
        this.scene.tweens.add({
            targets: this.laser.laserPodRight,
            x: SCREEN_WIDTH,
            duration: 1000,
        })
        this.laser.laserWarning.setVisible(false)
        this.laser.laserPodLeft.x = -100
        this.laser.laserPodRight.x = SCREEN_WIDTH + 100
        this.laser.laserBeam.setVisible(false)
        this.laser.laserBeam.setActive(false)
    }

    exit(): void {
        this.elapsedTime = 0
    }

    execute(time: number, delta: number): void {
        this.elapsedTime += delta
        if (this.elapsedTime >= 1000) {
            this.stateMachine.transition('charging')
        }
    }
}

export default ReadyState
