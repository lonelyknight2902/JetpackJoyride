import { Pickup, Player } from '../game-objects'

class PlayScene extends Phaser.Scene {
    private _player: Player
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
    constructor() {
        super('PlayScene')
    }

    create() {
        // const renderTexture = this.add.renderTexture(0, 0, 32, 32)
        // renderTexture.saveTexture('player')
        const hallway1 = this.add.image(920, 768 / 2, 'hallway1')
        hallway1.setOrigin(0, 0.5)
        const background = this.add.image(-100, 768 / 2, 'titleBackground1')
        background.setOrigin(0, 0.5)
        const background2 = this.add.image(1024 - 228, 768 / 2, 'titleBackground2')
        background2.setOrigin(0, 0.5)
        this._player = new Player(this, 500, 200)
        this._player.setScale(2)
        const pickup = new Pickup(this, 200, 200)
        // this.physics.add.existing(this._player)
        // player.play('touchdown')
        this.cursors = this.input.keyboard?.createCursorKeys()
        const platforms = this.physics.add.staticGroup()
        platforms.create(1365 / 2, 660, 'ground').setScale(50, 1).refreshBody()
        platforms.create(1365 / 2, 100, 'ground').setScale(50, 1).refreshBody()
        platforms.setVisible(false)
        // this.physics.add.collider(this._player, platforms)
        this.physics.add.collider(this._player, platforms)
        this.physics.add.collider(this._player, pickup, (player, pickup) => {
            pickup.destroy()
        })
        // this.cameras.main.startFollow(this._player)
        // this.cameras.
    }

    update() {
        this._player.update()
    }
}

export default PlayScene
