import { PlayScene } from '../scenes'
import Player from './Player'

class Missile extends Phaser.GameObjects.Container {
    private missile: Phaser.GameObjects.Sprite
    private fire: Phaser.GameObjects.Sprite
    private air: Phaser.GameObjects.Sprite
    private explosion: Phaser.GameObjects.Sprite
    private smoke: Phaser.GameObjects.Particles.ParticleEmitter
    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y)
        this.missile = scene.add.sprite(0, 0, 'missile')
        this.missile.anims.create({
            key: 'missile',
            frames: this.missile.anims.generateFrameNumbers('missile', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.fire = scene.add.sprite(64, 0, 'missileEffects')
        this.fire.anims.create({
            key: 'missileEffects',
            frames: this.fire.anims.generateFrameNumbers('missileEffects', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.air = scene.add.sprite(0, 0, 'missileEffects')
        this.air.anims.create({
            key: 'missileEffects',
            frames: this.air.anims.generateFrameNumbers('missileEffects', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1,
        })
        this.explosion = scene.add.sprite(0, 0, 'missileExplosion')
        this.explosion.anims.create({
            key: 'explosion',
            frames: this.explosion.anims.generateFrameNumbers('missileExplosion', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
        })
        this.smoke = scene.add.particles(32, 0, 'smoke', {
            speed: 50,
            lifespan: 500,
            gravityY: 2000,
            // blendMode: 'ADD',
            scale: { start: 1, end: 0.5 },
        })
        this.missile.setScale(2)
        this.missile.setOrigin(0.5)
        this.fire.setOrigin(0.5)
        this.fire.setScale(2)
        this.air.setOrigin(0.5)
        this.explosion.setOrigin(0.5)
        this.smoke.setAngle(-90)
        this.missile.anims.play('missile')
        this.fire.anims.play('missileEffects')
        this.air.anims.play('missileEffects')
        this.smoke.start()
        this.explosion.setVisible(false)
        this.add(this.fire)
        this.add(this.explosion)
        this.add(this.smoke)
        this.add(this.missile)
        this.add(this.air)
        this.sendToBack(this.smoke)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        body.setOffset(-30, -20)
        body.setSize(64, 32)
    }

    public explode(): void {
        this.missile.setVisible(false)
        this.fire.setVisible(false)
        this.air.setVisible(false)
        this.explosion.setVisible(true)
        this.smoke.stop()
        this.explosion.anims.play('explosion')
    }

    public reset(): void {
        this.missile.setVisible(true)
        this.fire.setVisible(true)
        this.air.setVisible(true)
        this.explosion.setVisible(false)
        this.explosion.anims.stop()
        this.smoke.start()
    }
}

export default Missile
