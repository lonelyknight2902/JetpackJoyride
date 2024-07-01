import { BULLET_VELOCITY, LOWER_BOUND } from '../constants'
import { Bullet } from '../game-objects'

class BulletPool {
    private bullets: Phaser.GameObjects.Sprite[] = []
    private scene: Phaser.Scene
    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    initializeWithSize(size: number): void {
        if (this.bullets.length > 0 || size < 0) {
            return
        }
        for (let i = 0; i < size; i++) {
            const bullet = new Bullet(this.scene, 0, 0)
            bullet.setVisible(false)
            bullet.setActive(false)
            this.bullets.push(bullet)
        }
    }

    spawn(x: number, y: number): Phaser.GameObjects.Sprite {
        let bullet: Phaser.GameObjects.Sprite | undefined = this.bullets.find(
            (bullet) => !bullet.active
        )
        if (!bullet) {
            bullet = new Bullet(this.scene, 0, 0)
            this.bullets.push(bullet)
        }
        bullet.setRotation(Math.PI / 2)
        bullet.setPosition(x, y)
        bullet.setVisible(true)
        bullet.setActive(true)
        bullet.state = 'alive'
        bullet.setTexture('bullet')
        bullet.setScale(2)
        const body = bullet.body as Phaser.Physics.Arcade.Body
        body.setVelocityY(BULLET_VELOCITY)
        console.log('bullet spawned')
        console.log(this.bullets.length)
        return bullet
    }

    despawn(bullet: Phaser.GameObjects.Sprite): void {
        bullet.setVisible(false)
        bullet.setActive(false)
    }

    update(): void {
        this.bullets.forEach((bullet) => {
            // const collisionY =
            //     LOWER_BOUND -
            //     50 -
            //     (20 * Math.abs(Math.PI / 2 - bullet.rotation)) / ((Math.PI / 180) * 10)
            const collisionY =
                LOWER_BOUND -
                50 - Phaser.Math.Between(0, 20)
            if (bullet.active && bullet.y >= collisionY && bullet.state === 'alive') {
                bullet.play('bulletSplash', true)
                bullet.state = 'dead'
                bullet.y = collisionY
                const body = bullet.body as Phaser.Physics.Arcade.Body
                body.setVelocity(0)
                bullet.setRotation(0)
                bullet.setScale(1)
            } else if (
                bullet.active &&
                bullet.state === 'dead' &&
                bullet.anims.getProgress() === 1
            ) {
                this.despawn(bullet)
            }
        })
    }
}

export default BulletPool
