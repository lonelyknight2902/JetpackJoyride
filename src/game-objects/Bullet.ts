class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bullet')
        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.anims.create({
            key: 'bulletSplash',
            frames: this.anims.generateFrameNumbers('bulletSplash', { start: 0, end: 3 }),
            frameRate: 30,
            repeat: 0,
        })
        this.setRotation(Math.PI / 2)
        this.setScale(2)
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(this.height, this.width)
        body.setAllowGravity(false)
    }
}

export default Bullet
