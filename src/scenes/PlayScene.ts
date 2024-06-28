import { LOWER_BOUND, SCREEN_HEIGHT, SCREEN_WIDTH, UPPER_BOUND } from '../constants'
import { Player, Title } from '../game-objects'
import { ScoreManager } from '../manager'
import { HallwayMap, LabMap, TitleMap } from '../maps'
import { StateMachine } from '../states'
import {
    GameOverState,
    PauseState,
    PlayState,
    ResultState,
    StartState,
} from '../states/game-states'

class PlayScene extends Phaser.Scene {
    public stateMachine: StateMachine
    private _player: Player
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    private map: Phaser.GameObjects.Container
    private mapList: Phaser.GameObjects.Container[] = []
    public initialMapList: Phaser.GameObjects.Container[] = []
    private platforms: Phaser.Physics.Arcade.StaticGroup | undefined
    private shadow: Phaser.GameObjects.Image
    public title: Phaser.GameObjects.Container
    public scoreManager: ScoreManager
    public distanceText: Phaser.GameObjects.Text
    public coinText: Phaser.GameObjects.Text
    constructor() {
        super('PlayScene')
    }

    preload() {
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'collect',
            frames: this.anims.generateFrameNumbers('coinCollect', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
        })
    }

    create() {
        // const renderTexture = this.add.renderTexture(0, 0, 32, 32)
        // renderTexture.saveTexture('player')
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.scoreManager = ScoreManager.getInstance()
        this.map = this.add.container(0, 0)
        const labmap = new LabMap(this, 928 + 4032 - 32 * 6, 0)
        const titleMap = new TitleMap(this, 0, 0)
        const hallwayMap = new HallwayMap(this, 928, 0)
        console.log(hallwayMap.width)
        console.log(labmap.width)
        console.log(titleMap.width)
        // this.map.add(titleMap)
        this.map.add(hallwayMap)
        this.map.add(labmap)
        this.map.sendToBack(hallwayMap)
        this.map.sendToBack(labmap)
        this.initialMapList = [titleMap, hallwayMap, labmap]

        this.distanceText = this.add.text(16, 16, '0000m', {
            fontSize: '64px',
            color: '#FFF',
            fontFamily: 'Arial',
        })
        this.coinText = this.add.text(16, 80, '000', {
            fontSize: '32px',
            color: '#FFF',
            fontFamily: 'Arial',
        })

        this.title = new Title(this, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
        this.title.setScale(0.8)
        this._player = Player.getInstance(this, 500, 200)
        this._player.setScale(2)
        this.shadow = this.add.image(this._player.x + 28, 650, 'player-shadow')
        this.shadow.setScale(1.5)
        this.cursors = this.input.keyboard?.createCursorKeys()
        this.platforms = this.physics.add.staticGroup()
        this.platforms
            .create(1365 / 2, LOWER_BOUND, 'ground')
            .setScale(50, 1)
            .refreshBody()
        this.platforms
            .create(1365 / 2, UPPER_BOUND, 'ground')
            .setScale(50, 1)
            .refreshBody()
        this.platforms.setVisible(false)
        this.physics.add.collider(this._player, this.platforms)
        // this.physics.add.collider(this._player.getBullet(), this.platforms)

        this.stateMachine = new StateMachine('start', {
            start: new StartState(this),
            play: new PlayState(this),
            pause: new PauseState(this),
            over: new GameOverState(this),
            result: new ResultState(this),
        })
    }

    update(time: number, delta: number) {
        this.stateMachine.update(time, delta)

        // this._player.getBullet().forEachAlive((bullet) => {
        //     const particleBound = bullet.getBounds()
        //     const platformsBound = this.platforms?.children.entries[0].body?.position.y
        //     console.log(particleBound.bottom + this._player.y)
        //     console.log(platformsBound)
        //     if (platformsBound && particleBound.top + this._player.y > platformsBound) {
        //         bullet.kill()
        //     }
        // }, this)
        // if (this.backgroundLayer) {
        //     this.backgroundLayer.x -= 0.5
        // }
    }

    public getPlayer(): Player {
        return this._player
    }

    public getMap(): Phaser.GameObjects.Container {
        return this.map
    }

    public getMapList(): Phaser.GameObjects.Container[] {
        return this.mapList
    }

    public setMapList(mapList: Phaser.GameObjects.Container[]) {
        this.mapList = mapList
    }

    public getShadow(): Phaser.GameObjects.Image {
        return this.shadow
    }
}

export default PlayScene
