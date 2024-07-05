import { ANGLE_STEP, ASCEND_ACCELERATION, FIRE_RATE, MIN_ANGLE } from '../../constants'
import { Player } from '../../game-objects'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class AscendState extends State {
    private _player: Player
    private _scene: PlayScene
    private _bulletTimer = 0
    private currentAngle = MIN_ANGLE
    private angleStep = ANGLE_STEP
    constructor(player: Player, scene: PlayScene) {
        super()
        this._player = player
        this._scene = scene
    }
    enter(): void {
        this._player.playerBody.anims.play('player-ascend')
        this._player.playerHead.anims.play('player-ascend')
        this._player.jetpack.anims.play('jetpack-ascend-fire')
        this._player.bulletFlash.setVisible(true)
        this._player.bulletFlash.anims.play('bullet-flash')
        const bullet = this._player.bulletPool.spawn(this._player.x + 4, this._player.y + 45)
        bullet.setRotation(this.currentAngle * (Math.PI / 180))
        const bulletBody = bullet.body as Phaser.Physics.Arcade.Body
        bulletBody.setVelocityX(
            bulletBody.velocity.y / Math.tan(this.currentAngle * (Math.PI / 180))
        )
        this._player.getShell().start()
        this._player.jetpack.fireSound.play()
        const body = this._player.body as Phaser.Physics.Arcade.Body
        // body.setVelocityY(-ASCEND_SPEED)
        body.setVelocityY(0)
        body.setAccelerationY(-ASCEND_ACCELERATION)
        body.setSize(24, 36)
    }

    exit(): void {
        const body = this._player.body as Phaser.Physics.Arcade.Body
        body.setAccelerationY(0)
    }

    execute(time: number, delta: number): void {
        if (this._player.body && this._player.body.velocity.y > 0) {
            console.log('Player is descending')
            this.stateMachine.transition('player-descend')
        } else if (
            this._scene.input.keyboard?.createCursorKeys().space?.isDown ||
            this._scene.input.activePointer.isDown
        ) {
            this._bulletTimer += delta
            if (this._player.jetpack.anims.getName() !== 'jetpack-ascend-fire') {
                this._player.jetpack.anims.play('jetpack-ascend-fire')
                this._player.bulletFlash.setVisible(true)
                this._player.bulletFlash.anims.play('bullet-flash')
                this._bulletTimer = 0
                // this.currentAngle += this.angleStep
                // if (this.currentAngle > MAX_ANGLE) {
                //     this.angleStep = -ANGLE_STEP
                //     this.currentAngle = MAX_ANGLE
                // } else if (this.currentAngle < MIN_ANGLE) {
                //     this.angleStep = ANGLE_STEP
                //     this.currentAngle = MIN_ANGLE
                // }
                this.currentAngle = MIN_ANGLE + Phaser.Math.Between(0, 4) * ANGLE_STEP
                console.log('Firing bullet')
                const bullet = this._player.bulletPool.spawn(this._player.x, this._player.y)
                bullet.setRotation(this.currentAngle * (Math.PI / 180))
                const bulletBody = bullet.body as Phaser.Physics.Arcade.Body
                bulletBody.setVelocityX(
                    bulletBody.velocity.y / Math.tan(this.currentAngle * (Math.PI / 180))
                )
                this._player.getShell().start()
            } else if (this._bulletTimer > FIRE_RATE) {
                // this.currentAngle += this.angleStep
                // if (this.currentAngle > MAX_ANGLE) {
                //     this.angleStep = -ANGLE_STEP
                //     this.currentAngle = MAX_ANGLE
                // } else if (this.currentAngle < MIN_ANGLE) {
                //     this.angleStep = ANGLE_STEP
                //     this.currentAngle = MIN_ANGLE
                // }
                this.currentAngle = MIN_ANGLE + Phaser.Math.Between(0, 4) * ANGLE_STEP
                this._bulletTimer = 0
                const bullet = this._player.bulletPool.spawn(
                    this._player.x + 4,
                    this._player.y + 45
                )
                bullet.setRotation(this.currentAngle * (Math.PI / 180))
                const bulletBody = bullet.body as Phaser.Physics.Arcade.Body
                bulletBody.setVelocityX(
                    bulletBody.velocity.y / Math.tan(this.currentAngle * (Math.PI / 180))
                )
            }
            if (!this._player.jetpack.fireSound.isPlaying && this._scene.stateMachine.getState() !== 'pause') this._player.jetpack.fireSound.play()
            const body = this._player.body as Phaser.Physics.Arcade.Body
            body.setAccelerationY(-ASCEND_ACCELERATION)
        } else {
            this._player.bulletFlash.setVisible(false)
            this._player.jetpack.anims.play('jetpack-ascend')
            this._player.getShell().stop()
            this._player.jetpack.fireSound.stop()
            const body = this._player.body as Phaser.Physics.Arcade.Body
            body.setAccelerationY(0)
        }
    }
}

export default AscendState
