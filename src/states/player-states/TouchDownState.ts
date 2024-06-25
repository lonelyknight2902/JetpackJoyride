import { Player } from '../../game-objects'
import State from '../../types/State'

class TouchDownState extends State {
    private _player: Player
    private _scene: Phaser.Scene
    constructor(player: Player, scene: Phaser.Scene) {
        super()
        this._player = player
        this._scene = scene
    }
    enter(): void {
        this._player.playerBody.anims.play('player-touchdown')
        this._player.playerHead.anims.play('player-touchdown')
        this._player.jetpack.anims.play('jetpack-touchdown')
        const body = this._player.body as Phaser.Physics.Arcade.Body
        body?.setSize(28, 34)
    }

    exit(): void {
        return
    }

    execute(): void {
        if (this._player.playerBody.anims.getProgress() === 1) {
            console.log('Player is running')
            this.stateMachine.transition('player-run')
        }
        return
    }
}

export default TouchDownState
