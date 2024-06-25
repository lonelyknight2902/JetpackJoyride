import { StateMachine } from '../states'
import {
    AscendState,
    DescendState,
    DieState,
    RunState,
    TouchDownState,
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
    private _bulletFlash:  BulletFlash
    private _scene: Phaser.Scene
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
        this.add(this._playerBody)
        this.add(this._playerHead)
        this.add(this._jetpack)
        this.add(this._bulletFlash)
        this._bulletFlash.setVisible(false)
        // this._container = new Phaser.GameObjects.Container(scene, x, y, [this._playerBody, this._playerHead])
        // let body = this._container.body as Phaser.Physics.Arcade.Body
        // this._container.setSize(32, 64)
        // this._renderTexture = renderTexture
        // scene.physics.add.existing(this._playerBody)
        // scene.physics.add.existing(this._playerHead)
        // scene.physics.world.enable(this)
        // this.body = this._playerBody.body
        this._stateMachine = new StateMachine('player-run', {
            'player-run': new RunState(this, scene),
            'player-ascend': new AscendState(this, scene),
            'player-descend': new DescendState(this, scene),
            'player-touchdown': new TouchDownState(this, scene),
            'player-die': new DieState(this, scene),
        })
        scene.add.existing(this)
        // this.setBodySize(16, 32)
        scene.physics.add.existing(this)
        const body = this.body as Phaser.Physics.Arcade.Body
        body?.setSize(28, 34)
        body.setCollideWorldBounds(true)
    }

    update(): void {
        // this._playerHead.y = this.playerBody.y - 12
        // this.y = this.playerBody.parentContainer.y + this.playerBody.y - 12
        console.log(this.playerBody.y)
        // this.updatePlayerTexture()
        // this.x = this._playerBody.x
        // this.y = this._playerBody.y
        this._stateMachine.update()
        // this.x = this._playerHead.x
        // this.y = this._playerHead.y
    }

    get playerBody(): PlayerBody{
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

    // updatePlayerTexture() {
    //     this._renderTexture.clear()
    //     this._renderTexture.draw(this._container, 0, 16)
    //     this._renderTexture.setSize(32, 44)
    // }
}

export default Player
