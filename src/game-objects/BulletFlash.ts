class BulletFlash extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        this.anims.create({
            key: 'bullet-flash',
            frames: this.anims.generateFrameNumbers('bullet-flash', { frames: [0, 1, 2, 3] }),
            frameRate: 12,
            repeat: -1,
        })
        // scene.add.existing(this)
    }
}

export default BulletFlash