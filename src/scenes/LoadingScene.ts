class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene')
    }
    preload() {
        const background = this.add.image(0, 0, 'loadingScreen').setOrigin(0)
        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()
        progressBox.fillStyle(0x222222, 0.8)
        progressBox.fillRect(240, 270, 320, 50)
        const width = this.cameras.main.width
        const height = this.cameras.main.height
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
            }
        })
        loadingText.setOrigin(0.5, 0.5)

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 25,
            text: '0%',
            style: {
                font: '18px monospace',
            }
        })

        percentText.setOrigin(0.5, 0.5)

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 100,
            text: '',
            style: {
                font: '18px monospace',
            }
        })

        assetText.setOrigin(0.5, 0.5)

        this.load.on('progress', function (value: number) {
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(250, 280, 300 * value, 30)
            percentText.setText(parseInt(String(value * 100)) + '%')
        })

        this.load.on('fileprogress', function (file: any) {
            assetText.setText('Loading asset: ' + file.key)
        })

        this.load.on('complete', function () {
            progressBar.destroy()
            progressBox.destroy()
            loadingText.destroy()
            percentText.destroy()
            assetText.destroy()
            background.destroy()
        })

        this.load.image('titleBackground1', 'assets/Levels/Title/titleFG_1_TVOS.png')
        this.load.image('titleBackground2', 'assets/Levels/Title/titleFG_2_TVOS.png')
        this.load.image('hallway1', 'assets/Levels/Hallway1/hallway1FG_1_TVOS.png')
        this.load.image('hallway2', 'assets/Levels/Hallway1/hallway1FG_2_TVOS.png')

        this.load.spritesheet('bullet-flash', 'assets/Characters/Effects/bulletFlash_TVOS.png', {
            frameWidth: 64,
            frameHeight: 64,
        })

        this.load.spritesheet('player-body', 'assets/Characters/Barry/defaultBody.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('player-head', 'assets/Characters/Barry/defaultHead.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('jetpack', 'assets/Characters/Jetpacks/jetpackDefault.png', {
            frameWidth: 32,
            frameHeight: 44,
        })
        this.load.spritesheet('pickup', 'assets/Pickup/pickup_TVOS.png', {
            frameWidth: 128,
            frameHeight: 128,
        })
    }

    create() {
        this.scene.start('PlayScene')
    }
}

export default LoadingScene