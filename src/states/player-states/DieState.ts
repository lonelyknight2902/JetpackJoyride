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
        this._player.bulletFlash.setVisible(false)
        this._player.setAngle(-90)
        const body = this._player.body as Phaser.Physics.Arcade.Body
        body?.setSize(38, 20)
        body.setOffset(-20, -30)
        // this._scene.
    }

    exit(): void {
        this._player.setRotation(0)
        const body = this._player.body as Phaser.Physics.Arcade.Body
        body?.setSize(24, 36)
        body.setOffset(0, 0)
        this._player.jetpack.setVisible(true)
        this._player.getShell().setVisible(true)
    }

    execute(time: number, delta: number): void {
        return
    }
}

export default DieState