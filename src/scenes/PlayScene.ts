import { Pickup, Player } from '../game-objects'
import PickUp from '../game-objects/Pickup'

class PlayScene extends Phaser.Scene {
    private _player: Player
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    constructor() {
        super('PlayScene')
    }

    preload() {
        this.load.spritesheet('player-body', 'assets/Characters/Barry/defaultBody.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('player-head', 'assets/Characters/Barry/defaultHead.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('jetpack', 'assets/Characters/Jetpacks/jetpackDefault.png', {
            frameWidth: 32,
            frameHeight: 44,
        })
        this.load.spritesheet('pickup', 'assets/Pickup/pickup_TVOS.png', {
            frameWidth: 128,
            frameHeight: 128,
        })
    }

    create() {
        // const renderTexture = this.add.renderTexture(0, 0, 32, 32)
        // renderTexture.saveTexture('player')
        this._player = new Player(this, 200, 0)
        this._player.setScale(3)
        const pickup = new Pickup(this, 200, 200)
        // this.physics.add.existing(this._player)
        // player.play('touchdown')
        this.cursors = this.input.keyboard?.createCursorKeys()
        const platforms = this.physics.add.staticGroup()
        platforms.create(0, 600, 'ground').setScale(20, 1).refreshBody()
        this.physics.add.collider(this._player, platforms)
    }

    update() {
        this._player.update()
    }
}

export default PlayScene
