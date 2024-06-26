import {
    LOWER_BOUND,
    MAX_INTERVAL,
    MIN_INTERVAL,
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    UPPER_BOUND,
} from '../constants'
import { Missile, Player, Title } from '../game-objects'
import { ScoreManager } from '../manager'
import { HallwayMap, LabMap, TitleMap } from '../maps'
import { ZapperPool } from '../object-pools'
import { StateMachine } from '../states'
import {
    GameOverState,
    IntroState,
    PauseState,
    PlayState,
    ResultState,
    StartState,
} from '../states/game-states'
import { Result, Score } from '../user-interfaces'

class PlayScene extends Phaser.Scene {
    public stateMachine: StateMachine
    private _player: Player
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    private map: Phaser.GameObjects.Container
    private mapList: Phaser.GameObjects.Container[] = []
    public initialMapList: Phaser.GameObjects.Container[] = []
    public platforms: Phaser.Physics.Arcade.StaticGroup | undefined
    private shadow: Phaser.GameObjects.Image
    public title: Phaser.GameObjects.Container
    public scoreManager: ScoreManager
    public distanceText: Phaser.GameObjects.Text
    public coinText: Phaser.GameObjects.Text
    public resultUI: Phaser.GameObjects.Container
    public scoreUI: Phaser.GameObjects.Container
    public overlay: Phaser.GameObjects.Graphics
    public titleMap: TitleMap
    public missile: Missile
    public zapperPool: ZapperPool
    public zapperSpawnEvent: Phaser.Time.TimerEvent
    public levelMusic: Phaser.Sound.BaseSound
    public menuMusic: Phaser.Sound.BaseSound
    public menuAmbiance: Phaser.Sound.BaseSound
    public windowSmash: Phaser.Sound.BaseSound
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
        this.scoreManager = ScoreManager.getInstance()
        this.map = this.add.container(0, 0)
        const labmap = new LabMap(this, 928 + 4032 - 32 * 6, 0)
        this.titleMap = new TitleMap(this, 0, 0)
        const hallwayMap = new HallwayMap(this, 928, 0)
        console.log(hallwayMap.width)
        console.log(labmap.width)
        console.log(this.titleMap.width)
        // this.map.add(titleMap)
        this.map.add(hallwayMap)
        this.map.add(labmap)
        this.map.sendToBack(hallwayMap)
        this.map.sendToBack(labmap)
        this.initialMapList = [this.titleMap, hallwayMap, labmap]
        this.scoreUI = new Score(this, 0, 0)

        this.title = new Title(this, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)
        this.title.setScale(0.8)
        this._player = Player.getInstance(this, 200, 200)
        this._player.setScale(2)
        this.shadow = this.add.image(this._player.x + 30, 650, 'player-shadow')
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
        // this.missile = new Missile(this, 200, 200)
        this.zapperPool = new ZapperPool(this)
        this.zapperPool.initializeWithSize(10)
        this.zapperSpawnEvent = this.time.addEvent({
            delay: Phaser.Math.Between(MIN_INTERVAL, MAX_INTERVAL),
            callback: () => {
                this.zapperPool.spawn(
                    SCREEN_WIDTH + 200,
                    Phaser.Math.Between(LOWER_BOUND, UPPER_BOUND)
                )
            },
            loop: true,
            paused: true,
        })
        this.overlay = this.add.graphics()
        this.overlay.fillStyle(0x000000, 0.7)
        this.overlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
        this.overlay.setVisible(false)
        this.resultUI = new Result(this, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 200)
        this.resultUI.setVisible(false)
        this.levelMusic = this.sound.add('musicLevel', { loop: true })
        this.menuAmbiance = this.sound.add('menuAmbiance', { loop: true })
        this.windowSmash = this.sound.add('windowSmash')
        this.menuMusic = this.sound.add('menuMusic', { loop: true })
        this.stateMachine = new StateMachine('start', {
            start: new StartState(this),
            intro: new IntroState(this),
            play: new PlayState(this),
            pause: new PauseState(this),
            over: new GameOverState(this),
            result: new ResultState(this),
        })
    }

    update(time: number, delta: number) {
        this.stateMachine.update(time, delta)
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
