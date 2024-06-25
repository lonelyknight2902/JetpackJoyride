import { Player } from "../../game-objects"
import State from "../../types/State"

class DieState extends State {
    private _player: Player
    private _scene: Phaser.Scene
    constructor(player: Player, scene: Phaser.Scene) {
        super()
        this._player = player
        this._scene = scene
    }
    enter(): void {
        this._player.playerBody.anims.play('player-die')
        this._player.playerHead.anims.play('player-die')
        this._player.jetpack.setVisible(false)
    }

    exit(): void {
        return
    }

    execute(): void {
        return
    }
}

export default DieState