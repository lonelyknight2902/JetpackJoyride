import { Player } from '../../game-objects'
import State from '../../types/State'

class AscendState extends State {
    private _player: Player
    private _scene: Phaser.Scene
    constructor(player: Player, scene: Phaser.Scene) {
        super()
        this._player = player
        this._scene = scene
    }
    enter(): void {
        this._player.playerBody.anims.play('player-ascend')
        this._player.playerHead.anims.play('player-ascend')
        this._player.playerBody.setVelocityY(-200)
        this._player.playerHead.setVelocityY(-200)
    }

    exit(): void {
        return
    }

    execute(): void {
        if (this._player.playerBody.body && this._player.playerBody.body.velocity.y > 0) {
            console.log('Player is descending')
            this.stateMachine.transition('player-descend')
        }
        if (this._scene.input.keyboard?.createCursorKeys().space?.isDown) {
            // this._player.setVelocityY(-200)
            this._player.playerBody.setVelocityY(-200)
            this._player.playerHead.setVelocityY(-200)
        }
    }
}

export default AscendState
