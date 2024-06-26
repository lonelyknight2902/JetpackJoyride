import { SCREEN_WIDTH } from '../constants'

class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene')
    }
    preload() {
        const background = this.add.image(0, 0, 'loadingScreen').setOrigin(0)
        const progressBox = this.add.graphics()
        const progressBar = this.add.graphics()

        progressBox.fillStyle(0x222222, 0.8)
        progressBox.fillRect(SCREEN_WIDTH / 2 - 1000 / 2, 600, 1000, 20)
        const width = this.cameras.main.width
        const height = this.cameras.main.height
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
            },
        })
        loadingText.setOrigin(0.5, 0.5)

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 25,
            text: '0%',
            style: {
                font: '18px monospace',
            },
        })

        percentText.setOrigin(0.5, 0.5)

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 100,
            text: '',
            style: {
                font: '18px monospace',
            },
        })

        assetText.setOrigin(0.5, 0.5)

        this.load.on('progress', function (value: number) {
            progressBar.clear()
            progressBar.fillStyle(0xffffff, 1)
            progressBar.fillRect(SCREEN_WIDTH / 2 - 1000 / 2 + 5, 605, 990 * value, 10)
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
            // background.destroy()
        })

        this.load.image('titleBackground1', 'assets/Levels/Title/titleFG_1_TVOS.png')
        this.load.image('titleBackground2', 'assets/Levels/Title/titleFG_2_TVOS.png')
        this.load.image('titleWallHole', 'assets/Levels/Title/titleWallHole.png')
        this.load.image('hallway1', 'assets/Levels/Hallway1/hallway1FG_1_TVOS.png')
        this.load.image('hallway2', 'assets/Levels/Hallway1/hallway1FG_2_TVOS.png')

        this.load.spritesheet('coin', 'assets/Entities/coin1_TVOS.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('coinCollect', 'assets/Entities/coinCollect1_TVOS.png', {
            frameWidth: 64,
            frameHeight: 64,
        })
        this.load.tilemapTiledJSON('arrowCoinMap', 'assets/arrow-coin.json')
        this.load.tilemapTiledJSON('coinShape', 'assets/coinShape1.json')

        this.load.image('alarmLight', 'assets/Levels/Title/alarmLight_TVOS.png')
        this.load.image('bestScreen', 'assets/Levels/Title/bestScreen_TVOS.png')
        this.load.image('doNotTouchSign', 'assets/Levels/Title/doNotTouchSign_TVOS.png')
        // this.load.image('gramophone', 'assets/Levels/Title/gramophone_TVOS.png')
        this.load.image('lightEffect', 'assets/Levels/Title/lightEffect.png')
        this.load.image('lightEffect2', 'assets/Levels/Title/lightEffect2.png')
        this.load.image('table', 'assets/Levels/Title/table.png')
        this.load.image('titleLight', 'assets/Levels/Title/title_light_TVOS.png')
        this.load.image('jetpackStand', 'assets/Levels/Title/Objects/JetpackStand.png')
        this.load.tilemapTiledJSON('titleMap', 'assets/titleMapBG.json')

        this.load.image('sectorNumbers', 'assets/Levels/Hallway1/sectorNumbers_TVOS.png')
        this.load.image('sectorLight', 'assets/Levels/Hallway1/sectorLight.png')
        this.load.image('hallwayAssets', 'assets/atlas/hallway_assets.png')
        this.load.tilemapTiledJSON('hallwayMap', 'assets/hallway.json')

        this.load.image('lab1', 'assets/Levels/lab1/lab1FG_1_TVOS.png')
        this.load.image('lab2', 'assets/Levels/lab1/lab1FG_2_TVOS.png')
        this.load.tilemapTiledJSON('labMap', 'assets/lab.json')

        this.load.atlas(
            'hallway',
            'assets/atlas/hallway_assets.png',
            'assets/atlas/hallway_assets.json'
        )

        this.load.image('bullet', 'assets/Characters/Effects/effect_smgbullet.png')
        this.load.image('shell', 'assets/Characters/Effects/effect_rocketmgshell_TVOS.png')
        this.load.image('dust', 'assets/particles/dust.png')
        this.load.image('smoke', 'assets/particles/smoke.png')

        this.load.spritesheet('bullet-flash', 'assets/Characters/Effects/bulletFlash_TVOS.png', {
            frameWidth: 64,
            frameHeight: 64,
        })

        this.load.spritesheet('bulletSplash', 'assets/Characters/Effects/bulletSplash_TVOS.png', {
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

        this.load.image('player-shadow', 'assets/Characters/effect_shadow.png')
        this.load.spritesheet('pickup', 'assets/Pickup/pickup_TVOS.png', {
            frameWidth: 128,
            frameHeight: 128,
        })

        this.load.spritesheet('gramophone', 'assets/Levels/Title/gramophone_TVOS.png', {
            frameWidth: 64,
            frameHeight: 128,
        })

        this.load.image('title', 'assets/Levels/Title/Objects/title_small.png')
        this.load.image('titleGlow', 'assets/Levels/Title/Objects/titleGlow_small.png')

        this.load.spritesheet('orb', 'assets/Obstacles/Zapper/orbAnim.png', {
            frameWidth: 62,
            frameHeight: 42,
        })
        this.load.spritesheet('orbGlow', 'assets/Obstacles/Zapper/RegularZappers/glow.png', {
            frameWidth: 128,
            frameHeight: 128,
        })
        this.load.spritesheet('zapper', 'assets/Obstacles/Zapper/RegularZappers/zapEffects.png', {
            frameWidth: 256,
            frameHeight: 117,
        })

        this.load.spritesheet('missile', 'assets/Obstacles/Missile/missile.png', {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.spritesheet('missileEffects', 'assets/Obstacles/Missile/missileEffects.png', {
            frameWidth: 64,
            frameHeight: 64,
        })

        this.load.spritesheet('explosion', 'assets/Obstacles/Missile/missileExplosion.png', {
            frameWidth: 64,
            frameHeight: 64,
        })

        this.load.audio('musicLevel', 'assets/BGM/Music_Level.mp3')
        this.load.audio('menuAmbiance', 'assets/BGM/menu_amb_lp.mp3')
        this.load.audio('menuMusic', 'assets/BGM/Music_Menu.mp3')
        this.load.audio('windowSmash', 'assets/SFX/Environtment/window_smash.mp3')
        this.load.audio('coinPickup1', 'assets/SFX/Obstacle/Coin/coin_pickup_1.mp3')
        this.load.audio('coinPickup2', 'assets/SFX/Obstacle/Coin/coin_pickup_2.mp3')
        this.load.audio('coinPickup3', 'assets/SFX/Obstacle/Coin/coin_pickup_3.mp3')
        this.load.audio('playerBones', 'assets/SFX/Barry/Player_bones.mp3')

        this.load.audio('jetpackFire', 'assets/SFX/Jetpack/jetpack_fireLP.mp3')
    }

    create() {
        this.scene.start('PlayScene')
    }
}

export default LoadingScene
