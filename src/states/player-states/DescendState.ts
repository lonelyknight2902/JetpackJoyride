import { Player } from '../../game-objects'
import State from '../../types/State'

class DescendState extends State {
    private _player: Player
    private _scene: Phaser.Scene
    constructor(player: Player, scene: Phaser.Scene) {
        super()
        this._player = player
        this._scene = scene
    }
    enter(): void {
        this._player.playerBody.anims.play('player-descend')
        this._player.playerHead.anims.play('player-descend')
        // this._player.body?.velocity.x = 0
    }

    exit(): void {
        return
    }

    execute(): void {
        if (this._scene.input.keyboard?.createCursorKeys().space?.isDown) {
            console.log('Player is ascending')
            this.stateMachine.transition('player-ascend')
        }
        if (this._player.playerBody.body?.touching.down) {
            console.log('Player is touching down')
            this.stateMachine.transition('player-touchdown')
        }
    }
}

export default DescendState
