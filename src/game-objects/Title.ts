class Title extends Phaser.GameObjects.Container {
    private title: Phaser.GameObjects.Image
    private titleGlow: Phaser.GameObjects.Image
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.title = new Phaser.GameObjects.Image(scene, 0, 0, 'title')
        this.titleGlow = new Phaser.GameObjects.Image(scene, 0, 0, 'titleGlow')
        this.title.setOrigin(0.5)
        this.titleGlow.setOrigin(0.5)
        this.titleGlow.setScale(2)
        this.add(this.title)
        this.add(this.titleGlow)
        scene.add.existing(this)
    }
}

export default Title