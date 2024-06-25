class Jetpack extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        this.anims.create({
            key: 'jetpack-run',
            frames: this.anims.generateFrameNumbers('jetpack', { frames: [0, 1, 2, 3] }),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.create({
            key: 'jetpack-ascend-fire',
            frames: this.anims.generateFrameNumbers('jetpack', { frames: [4, 5, 6, 7] }),
            frameRate: 12,
            repeat: -1,
        })
        this.anims.create({
            key: 'jetpack-ascend',
            frames: this.anims.generateFrameNumbers('jetpack', { frames: [8] }),
            frameRate: 10,
            repeat: 0,
        })
        this.anims.create({
            key: 'jetpack-descend',
            frames: this.anims.generateFrameNumbers('jetpack', { frames: [8, 9, 10, 11] }),
            frameRate: 10,
            repeat: 0,
        })
        this.anims.create({
            key: 'jetpack-touchdown',
            frames: this.anims.generateFrameNumbers('jetpack', { frames: [12, 13, 14, 15] }),
            frameRate: 10,
            repeat: 0,
        })
        // scene.add.existing(this)
    }
}

export default Jetpack