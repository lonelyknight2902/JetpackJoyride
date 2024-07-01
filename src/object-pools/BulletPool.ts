class BulletPool extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene) {
        super(scene)
        this.createMultiple({
            frameQuantity: 10,
            key: 'bullet',
            active: false,
            visible: false
        })
    }

    spawn(x: number, y: number, key: string): Phaser.GameObjects.Sprite {
        const bullet: Phaser.GameObjects.Sprite = this.get(x, y, key)
        bullet.setVisible(true)
        bullet.setActive(true)
        return bullet
    }

    despawn(bullet: Phaser.GameObjects.Sprite): void {
        this.killAndHide(bullet)
    }
}