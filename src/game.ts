import { GAME_GRAVITY } from './constants'
import { LoadingScene, PlayScene, PreloadScene, TestScene } from './scenes'

class Game {
    private _game: Phaser.Game
    constructor() {
        console.log('Game created')
        const config = {
            type: Phaser.AUTO,
            width: 1365,
            height: 768,
            backgroundColor: '#ffffff',
            scene: [PreloadScene, LoadingScene, PlayScene, TestScene],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { x: 0, y: GAME_GRAVITY },
                },
            },
        }

        this._game = new Phaser.Game(config)
    }
}

new Game()
