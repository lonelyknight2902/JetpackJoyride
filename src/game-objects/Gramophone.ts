class Gramophone extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'gramophone')
        this.anims.create({
            key: 'gramophone',
            frames: this.anims.generateFrameNumbers('gramophone', { frames: [0, 1] }),
            frameRate: 12,
            repeat: -1,
        })
        this.play('gramophone')
        scene.add.existing(this)
    }
}

export default Gramophone