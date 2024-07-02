class LaserBeam extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'laserPower')
        this.anims.create({
            key: 'laser-beam-on',
            frames: scene.anims.generateFrameNumbers('laserPower', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.create({
            key: 'laser-beam-off',
            frames: scene.anims.generateFrameNumbers('laserPower', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })
        scene.add.existing(this)
        scene.physics.add.existing(this)
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        body.setSize(body.width, 16)
    }
}

export default LaserBeam