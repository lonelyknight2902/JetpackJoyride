import { StateMachine } from '../states'
import {
    AscendState,
    DescendState,
    DieState,
    RunState,
    TouchDownState,
} from '../states/player-states'
import PlayerBody from './PlayerBody'
import PlayerHead from './PlayerHead'

class Player extends Phaser.GameObjects.Container {
    private _stateMachine: StateMachine
    private _playerBody: PlayerBody
    private _playerHead: PlayerHead
    private _scene: Phaser.Scene
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this._scene = scene
        this.setSize(32, 44)
        this._playerBody = new PlayerBody(scene, 0, 12, 'player-body')
        this._playerHead = new PlayerHead(scene, 0, 0, 'player-head')
        this.add(this._playerBody)
        this.add(this._playerHead)
        scene.physics.add.existing(this._playerBody)
        scene.physics.add.existing(this._playerHead)
        // scene.physics.world.enable(this)
        // scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY)
        this._stateMachine = new StateMachine('player-run', {
            'player-run': new RunState(this, scene),
            'player-ascend': new AscendState(this, scene),
            'player-descend': new DescendState(this, scene),
            'player-touchdown': new TouchDownState(this, scene),
            'player-die': new DieState(this, scene),
        })
        scene.add.existing(this)
        // scene.physics.add.existing(this)
    }

    update(): void {
        this._playerHead.y = this.playerBody.y - 12
        this._playerHead.x = this.playerBody.x
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

    // updatePlayerTextture
}

export default Player
