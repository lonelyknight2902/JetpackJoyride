class Pickup extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'pickup')
        this.anims.create({
            key: 'pickup',
            frames: this.anims.generateFrameNumbers('pickup', { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.play('pickup')
        scene.add.existing(this)
    }
}

export default Pickup