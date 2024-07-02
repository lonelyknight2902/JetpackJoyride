class LaserWarning extends Phaser.GameObjects.Graphics {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene)
        this.x = x
        this.y = y
        scene.add.existing(this)
        
    }
}