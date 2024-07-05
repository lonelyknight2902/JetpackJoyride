import { GAME_SPEED } from '../constants'
import { Zapper } from '../game-objects'
import { PlayScene } from '../scenes'

class ZapperPool {
    private zappers: Zapper[] = []
    private scene: PlayScene
    constructor(scene: PlayScene) {
        this.scene = scene
    }

    initializeWithSize(size: number): void {
        if (this.zappers.length > 0 || size < 0) {
            return
        }
        for (let i = 0; i < size; i++) {
            const zapper = new Zapper(this.scene, 0, 0)
            zapper.setVisible(false)
            zapper.setActive(false)
            this.zappers.push(zapper)
        }
    }

    spawn(x: number, y: number): Phaser.GameObjects.Container {
        let zapper: Zapper | undefined = this.zappers.find((zapper) => !zapper.active)
        if (!zapper) {
            zapper = new Zapper(this.scene, x, y)
            this.zappers.push(zapper)
        }
        zapper.setPosition(x, y)
        const body = zapper.body as Phaser.Physics.Arcade.Body
        body.setVelocity(-GAME_SPEED, 0)
        zapper.setVisible(true)
        zapper.setActive(true)
        // const rotation = Math.random() * Math.PI / 2
        // zapper.setRotation(rotation)
        console.log('spawn')
        console.log(this.zappers.length)
        return zapper
    }

    despawn(zapper: Phaser.GameObjects.Container): void {
        zapper.setVisible(false)
        zapper.setActive(false)
    }

    update(): void {
        this.zappers.forEach((zapper) => {
            if (zapper.active && zapper.x < -zapper.width - 100) {
                this.despawn(zapper)
                console.log('despawn')
            }
        })
        console.log(this.zappers.length)
    }
}

export default ZapperPool
