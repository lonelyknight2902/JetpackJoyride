import Zapper from './Zapper'
import SAT from 'sat'

class RotatingZapper extends Zapper {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.zapper.rotation = Math.PI / 2
        this.orb1.setTexture('orb')
        this.orb2.setTexture('orb')
        this.zapper.setTexture('zapperRotating')
        this.glow1.setTexture('orbGlowRotating')
        this.glow2.setTexture('orbGlowRotating')
        this.zapper.anims.create({
            key: 'zapperRotating',
            frames: this.zapper.anims.generateFrameNumbers('zapperRotating', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1,
        })
        this.glow1.anims.create({
            key: 'glowRotating',
            frames: this.zapper.anims.generateFrameNumbers('orbGlowRotating', { start: 0, end: 15 }),
            frameRate: 20,
            repeat: -1,
        })
        this.glow2.anims.create({
            key: 'glowRotating',
            frames: this.zapper.anims.generateFrameNumbers('orbGlowRotating', { start: 0, end: 15 }),
            frameRate: 20,
            repeat: -1,
        })

        this.zapper.play('zapperRotating')
        this.glow1.play('glowRotating')
        this.glow2.play('glowRotating')
    }

    update(time: number, delta: number): void {
        const matrix = this.getWorldTransformMatrix()
        // super.update(time, delta)
        // this.setRotation(this.rotation + (1 * Math.PI / 180 * delta) / 1000)
        // this.angle += 1 * delta / 1000
        this.rotation += 0.01
        const x = matrix.tx + this.zapper.x * matrix.a + this.zapper.y * matrix.c
        const y = matrix.ty + this.zapper.x * matrix.b + this.zapper.y * matrix.d
        this.polygon.pos = new SAT.Vector(x, y)
        this.polygon.setAngle(this.rotation)
        const bounds = this.getBounds()
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(bounds.width, bounds.height)
        body.setOffset(bounds.x - x, bounds.y - y)
    }
}

export default RotatingZapper