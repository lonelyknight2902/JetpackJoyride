class JetpackStand extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'jetpackStand')
        this.setFrame(0)
        // scene.add.existing(this)
    }
}

export default JetpackStand
