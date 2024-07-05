class Button extends Phaser.GameObjects.Container {
    private onClick: () => void
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        text: string,
        onClick: () => void,
        icon = ''
    ) {
        super(scene, x, y)
        const background = scene.add.image(0, 0, 'buttonBacking')
        background.scaleX = 1.5
        background.scaleY = 0.5
        const buttonText = scene.add.bitmapText(0, 0, 'NewAthleticM54White', text, 32)
        Phaser.Display.Align.In.Center(buttonText, background)
        this.add(background)
        this.add(buttonText)
        if (icon) {
            const iconImage = scene.add.image(-100, 0, icon)
            this.add(iconImage)
        }
        this.onClick = onClick
        this.setSize(background.width * background.scaleX, background.height * background.scaleY)
        this.setInteractive()
        this.setScale(1)
        this.on('pointerdown', () => {
            this.scale = 0.9
            console.log('Button clicked')
        })

        this.on('pointerup', () => {
            console.log('Button released')
            this.scale = 1
            this.onClick()
        })
        scene.add.existing(this)
    }
}

export default Button
