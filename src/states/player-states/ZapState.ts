import { Player } from "../../game-objects";
import State from "../../types/State";

class ZapState extends State {
    private _player: Player
    private _scene: Phaser.Scene
    constructor(player: Player, scene: Phaser.Scene) {
        super()
        this._player = player
        this._scene = scene
    }
    enter(): void {
        this._player.playerBody.anims.play('player-zap')
        this._player.playerHead.anims.play('player-zap')
        this._player.jetpack.setVisible(false)
        this._player.getBullet().stop()
        this._player.getShell().stop()
        console.log('Player is zapping')
    }

    exit(): void {
        return
    }

    execute(): void {
        if (this._player.playerBody.anims.getProgress() === 1 && this._player.playerHead.anims.getProgress() === 1) {
            console.log('Player is dead')
            this.stateMachine.transition('player-die')
        }
    }
}

export default ZapState