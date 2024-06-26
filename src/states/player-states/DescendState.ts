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
        this._player.jetpack.anims.play('jetpack-descend')
        // this._player.body?.velocity.x = 0
    }

    exit(): void {
        return
    }

    execute(time: number, delta: number): void {
        if (this._scene.input.keyboard?.createCursorKeys().space?.isDown || this._scene.input.activePointer.isDown) {
            console.log('Player is ascending')
            this.stateMachine.transition('player-ascend')
        }
        const body = this._player.body as Phaser.Physics.Arcade.Body
        if (body?.blocked.down) {
            console.log('Player is touching down')
            this.stateMachine.transition('player-touchdown')
        }
    }
}

export default DescendState
