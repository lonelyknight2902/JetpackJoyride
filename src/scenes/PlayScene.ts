import { Player } from "../game-objects"

class PlayScene extends Phaser.Scene {
    private _player: Player
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    constructor() {
        super('PlayScene')
    }

    preload() {
        this.load.spritesheet('player-body', 'assets/Characters/Barry/defaultBody.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('player-head', 'assets/Characters/Barry/defaultHead.png', { frameWidth: 32, frameHeight: 32 })
    }

    create() {
        this._player = new Player(this, 48, 0)
        this._player.setScale(3)
        // this.physics.add.existing(this._player)
        // player.play('touchdown')
        this.cursors = this.input.keyboard?.createCursorKeys()
        const platforms = this.physics.add.staticGroup() 
        platforms.create(0, 568, 'ground').setScale(10, 1).refreshBody()
        this.physics.add.collider(this._player.playerBody, platforms, () => {
            this._player.playerHead.y = this._player.playerBody.y - 12
        })
        
    }

    update() {
        this._player.update()
    }
}

export default PlayScene