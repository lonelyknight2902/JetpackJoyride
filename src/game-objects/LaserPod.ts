class LaserPod extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'laser')
        this.anims.create({
            key: 'laser-idle',
            frames: scene.anims.generateFrameNumbers('laser', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.create({
            key: 'laser-charge',
            frames: scene.anims.generateFrameNumbers('laser', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: 0,
        })
        this.anims.create({
            key: 'laser-fire',
            frames: scene.anims.generateFrameNumbers('laser', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: 0,
        })
        this.setScale(0.5)
        this.scene.add.existing(this)
    }
}

export default LaserPod