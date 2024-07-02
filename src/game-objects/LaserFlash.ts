class LaserFlash extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'laserPower')
        this.anims.create({
            key: 'laser-on',
            frames: scene.anims.generateFrameNumbers('laserPower', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.create({
            key: 'laser-off',
            frames: scene.anims.generateFrameNumbers('laserPower', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })
        scene.add.existing(this)
    }
}

export default LaserFlash