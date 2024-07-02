class LaserEnergy extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'laserEnergy')
        scene.add.existing(this)
        this.anims.create({
            key: 'laser-ready',
            frames: scene.anims.generateFrameNumbers('laserEnergy', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0,
        })
        this.anims.create({
            key: 'laser-done',
            frames: scene.anims.generateFrameNumbers('laserEnergy', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })
        this.setScale(0.5)
    }
}

export default LaserEnergy
