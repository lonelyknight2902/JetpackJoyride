import { PlayScene } from '../scenes'
import Laser from './Laser'

class LasersContainer extends Phaser.GameObjects.Container {
    private lasers: Laser[] = []
    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y)
        this.scene.add.existing(this)
        for (let i = 0; i < 6; i++) {
            const laser = new Laser(scene, 0, 100 * i)
            this.add(laser)
            this.lasers.push(laser)
        }
        this.state = 'idle'
    }

    update(time: number, delta: number) {
        this.lasers.forEach((laser) => {
            laser.update(time, delta)
        })
        if (this.state == 'active') {
            const allDeactivated = this.lasers.every((laser) => {
                return laser.stateMachine.getState() === 'deactivate'
            })
            if (allDeactivated) {
                this.state = 'idle'
            }
        }
    }

    getLasers(): Laser[] {
        return this.lasers
    }

    activateLasers(amount: number) {
        if (amount > this.lasers.length) {
            amount = this.lasers.length
        }
        console.log('Amount: ', amount)
        const copiedLasers = [...this.lasers]
        for (let i = 0; i < amount; i++) {
            const index = Phaser.Math.Between(0, copiedLasers.length - 1)
            const laser = copiedLasers[index]
            laser.stateMachine.transition('ready')
            copiedLasers.splice(index, 1)
        }
        this.state = 'active'
    }
}

export default LasersContainer
