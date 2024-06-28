import { StateMachine } from '../states'
import {
    AscendState,
    DescendState,
    DieState,
    RunState,
    TouchDownState,
    ZapState,
} from '../states/player-states'
import BulletFlash from './BulletFlash'
import Jetpack from './Jetpack'
import PlayerBody from './PlayerBody'
import PlayerHead from './PlayerHead'

class Player extends Phaser.GameObjects.Container {
    private _stateMachine: StateMachine
    private _playerBody: PlayerBody
    private _playerHead: PlayerHead
    private _jetpack: Jetpack
    private _bulletFlash: BulletFlash
    private bullet: Phaser.GameObjects.Particles.ParticleEmitter
    private shell: Phaser.GameObjects.Particles.ParticleEmitter
    // private shadow: Phaser.GameObjects.Image
    private _scene: Phaser.Scene
    private static instance: Player
    // private _renderTexture: Phaser.GameObjects.RenderTexture
    // private _container: Phaser.GameObjects.Container
    constructor(scene: Phaser.Scene, x: number, y: number) {
        // texture: string, renderTexture: Phaser.GameObjects.RenderTexture
        super(scene, x, y)
        // this.setSize(16, 32)
        this._scene = scene
        this._playerBody = new PlayerBody(scene, 16, 22, 'player-body')
        this._playerHead = new PlayerHead(scene, 16, 10, 'player-head')
        this._jetpack = new Jetpack(scene, 4, 19, 'jetpack')
        this._bulletFlash = new BulletFlash(scene, 4, 45, 'bullet-flash')
        this._bulletFlash.setScale(0.4)
        // this.shadow.setScale(1)
        const dist = new Phaser.Math.Vector2()
        const force = new Phaser.Math.Vector2()
        // let well = {
        //     x: 512,
        //     y: 384,
        //     active: true,
        //     update: function (p) {
        //         dist.copy(this).subtract(p)

        //         const len = dist.length()
        //         p.accelerationX = force.x
        //         p.accelerationY = force.y
        //     },
        // }
        this.bullet = scene.add.particles(4, 45, 'bullet', {
            speed: 100,
            lifespan: 500,
            gravityY: 3000,
            rotate: 90,
        })
        this.shell = scene.add.particles(4, 25, 'shell', {
            speed: 100,
            lifespan: 1000,
            gravityY: 500,
            scale: 0.2,
        })
        this.shell.setAngle(60)
        // this.bullet.createGravityWell(well)
        this.shell.stop()
        this.bullet.stop()
        this.add(this._playerBody)
        this.add(this._playerHead)
        this.add(this._jetpack)
        this.add(this._bulletFlash)
        this.add(this.bullet)
        this.add(this.shell)
        // this.add(this.shadow)
        this.sendToBack(this.bullet)
        this.sendToBack(this.shell)
        // this.sendToBack(this.shadow)
        this._bulletFlash.setVisible(false)
        // this._container = new Phaser.GameObjects.Container(scene, x, y, [this._playerBody, this._playerHead])
        // let body = this._container.body as Phaser.Physics.Arcade.Body
        // this._container.setSize(32, 64)
        // this._renderTexture = renderTexture
        // scene.physics.add.existing(this._playerBody)
        // scene.physics.add.existing(this._playerHead)
        // scene.physics.world.enable(this)
        // this.body = this._playerBody.body
        this._stateMachine = new StateMachine('player-descend', {
            'player-run': new RunState(this, scene),
            'player-ascend': new AscendState(this, scene),
            'player-descend': new DescendState(this, scene),
            'player-touchdown': new TouchDownState(this, scene),
            'player-zap': new ZapState(this, scene),
            'player-die': new DieState(this, scene),
        })
        scene.add.existing(this)
        // this.setBodySize(16, 32)
        scene.physics.add.existing(this)
        // scene.physics.add.existing(this.bullet)
        const body = this.body as Phaser.Physics.Arcade.Body
        body?.setSize(28, 34)
        body.setCollideWorldBounds(true)
    }

    public static getInstance(scene: Phaser.Scene, x: number, y: number): Player {
        if (!Player.instance) {
            Player.instance = new Player(scene, x, y)
        }
        return Player.instance
    }

    update(time: number, delta: number): void {
        // this._playerHead.y = this.playerBody.y - 12
        // this.y = this.playerBody.parentContainer.y + this.playerBody.y - 12
        // this.updatePlayerTexture()
        // this.x = this._playerBody.x
        // this.y = this._playerBody.y
        this._stateMachine.update(time, delta)
        // this.shadow.setPosition(14, (LOWER_BOUND - this.y) / this.scale)
        // console.log(this.shadow.y)
        // console.log(LOWER_BOUND - this.y)
        // this.x = this._playerHead.x
        // this.y = this._playerHead.y
        // 116 544
    }

    get playerBody(): PlayerBody {
        return this._playerBody
    }

    get playerHead(): PlayerHead {
        return this._playerHead
    }

    get jetpack(): Jetpack {
        return this._jetpack
    }

    get bulletFlash(): BulletFlash {
        return this._bulletFlash
    }

    get stateMachine(): StateMachine {
        return this._stateMachine
    }

    public getBullet(): Phaser.GameObjects.Particles.ParticleEmitter {
        return this.bullet
    }

    public getShell(): Phaser.GameObjects.Particles.ParticleEmitter {
        return this.shell
    }

    public getCurrentState(): string | null {
        return this._stateMachine.getState()
    }

    public isDead(): boolean {
        return (
            this._stateMachine.getState() === 'player-die' &&
            this._playerBody.anims.getProgress() === 1
        )
    }

    // updatePlayerTexture() {
    //     this._renderTexture.clear()
    //     this._renderTexture.draw(this._container, 0, 16)
    //     this._renderTexture.setSize(32, 44)
    // }
}

export default Player
