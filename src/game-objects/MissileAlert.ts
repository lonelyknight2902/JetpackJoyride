class MissileAlert extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'missileAlert')
        this.scene.add.existing(this)
        this.anims.create({
            key: 'missileAlert',
            frames: this.anims.generateFrameNumbers('missileAlert', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.create({
            key: 'missileIncoming',
            frames: this.anims.generateFrameNumbers('missileAlert', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1,
        })
        this.setScale(2)
    }
}

export default MissileAlert