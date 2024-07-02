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
        console.log('ReadyState')
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
    }

    exit(): void {
        console.log('ReadyState')
    }

    execute(time: number, delta: number): void {
        if (this.elapsedTime >= 1000) {
            this.stateMachine.transition('charging')
        } 
        this.elapsedTime += delta
        console.log('ReadyState')
    }
}

export default ReadyState
