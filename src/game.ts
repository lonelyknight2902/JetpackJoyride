import { PlayScene, TestScene } from './scenes'

class Game {
    private _game: Phaser.Game
    constructor() {
        console.log('Game created')
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            backgroundColor: '#ffffff',
            scene: [PlayScene, TestScene],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { x: 0, y: 200 },
                },
            },
        }

        this._game = new Phaser.Game(config)
    }
}

new Game()
