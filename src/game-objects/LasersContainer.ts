import Laser from './Laser'

class LasersContainer extends Phaser.GameObjects.Container {
    private lasers: Laser[] = []
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene.add.existing(this)
        for (let i = 0; i < 6; i++) {
            const laser = new Laser(scene, 0, 100 * i)
            this.add(laser)
            this.lasers.push(laser)
        }
    }

    update(time: number, delta: number) {
        this.lasers.forEach((laser) => {
            laser.update(time, delta)
        })
    }

    getLasers() : Laser[] {
        return this.lasers
    }
}

export default LasersContainer
