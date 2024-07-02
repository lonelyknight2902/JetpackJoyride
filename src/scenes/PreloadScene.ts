class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene')
    }
    preload() {
        this.load.bitmapFont('NewAthleticM54', 'assets/fonts/NewAthleticM54.png', 'assets/fonts/NewAthleticM54.xml')
        this.load.bitmapFont('NewAthleticM54Gray', 'assets/fonts/NewAthleticM54Gray.png', 'assets/fonts/NewAthleticM54Gray.xml')
        this.load.bitmapFont('NewAthleticM54DarkGray', 'assets/fonts/NewAthleticM54DarkGray.png', 'assets/fonts/NewAthleticM54DarkGray.xml')
        this.load.bitmapFont('NewAthleticM54GrayInverted', 'assets/fonts/NewAthleticM54GrayInverted.png', 'assets/fonts/NewAthleticM54GrayInverted.xml')
        this.load.bitmapFont('NewAthleticM54Gold', 'assets/fonts/NewAthleticM54Gold.png', 'assets/fonts/NewAthleticM54Gold.xml')
        this.load.bitmapFont('NewAthleticM54Blue', 'assets/fonts/NewAthleticM54Blue.png', 'assets/fonts/NewAthleticM54Blue.xml')
        this.load.image('loadingScreen', 'assets/Splash/loading_screen.png')
    }

    create() {
        this.scene.start('LoadingScene')
    }
}

export default PreloadScene