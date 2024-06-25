import { Player } from '../../game-objects'
import State from '../../types/State'

class RunState extends State {
    private _player: Player
    private _scene: Phaser.Scene
    constructor(player: Player, scene: Phaser.Scene) {
        super()
        this._player = player
        this._scene = scene
    }
    enter(): void {
        this._player.playerBody.anims.play('player-run')
        this._player.playerHead.anims.play('player-run')
    }

    exit(): void {
        return
    }

    execute(): void {
        if (this._scene.input.keyboard?.createCursorKeys().space?.isDown) {
            console.log('Player is ascending')
            this.stateMachine.transition('player-ascend')
        }
        this._player.playerHead.y = this._player.playerBody.y - 12
    }
}

export default RunState
