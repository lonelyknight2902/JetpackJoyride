class PlayerBody extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        this.anims.create({
            key: 'player-run',
            frames: this.anims.generateFrameNumbers('player-body', { frames: [0, 1, 2, 3] }),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.create({
            key: 'player-ascend',
            frames: this.anims.generateFrameNumbers('player-body', { frames: [4, 5, 6, 7] }),
            frameRate: 10,
            repeat: 0,
        })
        this.anims.create({
            key: 'player-descend',
            frames: this.anims.generateFrameNumbers('player-body', { frames: [8, 9, 10, 11] }),
            frameRate: 10,
            repeat: 0,
        })
        this.anims.create({
            key: 'player-touchdown',
            frames: this.anims.generateFrameNumbers('player-body', { frames: [12, 13, 14, 15] }),
            frameRate: 10,
            repeat: 0,
        })
        this.anims.create({
            key: 'player-die',
            frames: this.anims.generateFrameNumbers('player-body', {
                frames: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            }),
            frameRate: 10,
            repeat: 0,
        })
        // scene.add.existing(this)
    }
}

export default PlayerBody