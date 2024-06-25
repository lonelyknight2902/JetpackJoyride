class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene')
    }
    preload() {
        this.load.image('loadingScreen', 'assets/Splash/loading_screen.png')
    }

    create() {
        this.scene.start('LoadingScene')
    }
}

export default PreloadScene