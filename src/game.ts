import { GAME_GRAVITY, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants'
import { LoadingScene, PlayScene, PreloadScene, TestScene } from './scenes'

class Game {
    private _game: Phaser.Game
    constructor() {
        console.log('Game created')
        const config = {
            type: Phaser.AUTO,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            backgroundColor: '#ffffff',
            scene: [PreloadScene, LoadingScene, PlayScene, TestScene],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { x: 0, y: GAME_GRAVITY },
                },
            },
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        }

        this._game = new Phaser.Game(config)
    }
}

new Game()
