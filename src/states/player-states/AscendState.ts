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
        this._player.jetpack.anims.play('jetpack-ascend-fire')
        // this._player.setVelocityY(-200)
        // this._player.playerBody.setVelocityY(-200)
        // this._player.playerHead.setVelocityY(-200)
        const body = this._player.body as Phaser.Physics.Arcade.Body
        body.setVelocityY(-200)
        body.setSize(24, 36)
    }

    exit(): void {
        return
    }

    execute(): void {
        if (this._player.body && this._player.body.velocity.y > 0) {
            console.log('Player is descending')
            this.stateMachine.transition('player-descend')
        } else if (this._scene.input.keyboard?.createCursorKeys().space?.isDown) {
            // this._player.setVelocityY(-200)
            // this._player.playerBody.setVelocityY(-200)
            // this._player.playerHead.setVelocityY(-200)
            if (this._player.jetpack.anims.getName() !== 'jetpack-ascend-fire') {
                this._player.jetpack.anims.play('jetpack-ascend-fire')
            }
            const body = this._player.body as Phaser.Physics.Arcade.Body
            body.setVelocityY(-200)
        } else {
            this._player.jetpack.anims.play('jetpack-ascend')
        }
    }
}

export default AscendState
