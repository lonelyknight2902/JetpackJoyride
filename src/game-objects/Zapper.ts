import Player from './Player'
import SAT from 'sat'

class Zapper extends Phaser.GameObjects.Container {
    private orb1: Phaser.GameObjects.Sprite
    private orb2: Phaser.GameObjects.Sprite
    private glow1: Phaser.GameObjects.Sprite
    private glow2: Phaser.GameObjects.Sprite
    private zapper: Phaser.GameObjects.Sprite
    private polygon: SAT.Polygon
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.orb1 = scene.add.sprite(0, 0, 'orb')
        this.orb2 = scene.add.sprite(0, 200, 'orb')
        this.zapper = scene.add.sprite(0, 0, 'zapper')
        this.glow1 = scene.add.sprite(0, 0, 'orbGlow')
        this.glow2 = scene.add.sprite(0, 200, 'orbGlow')
        this.orb1.flipY = true
        this.orb1.flipX = true
        this.zapper.setScale(200 / this.zapper.width)
        this.orb1.setOrigin(0.5)
        this.orb2.setOrigin(0.5)
        this.zapper.setOrigin(0, 0.5)
        this.glow1.setOrigin(0.5)
        this.glow2.setOrigin(0.5)

        this.zapper.rotation = Math.PI / 2
        this.orb1.anims.create({
            key: 'orb',
            frames: this.orb1.anims.generateFrameNumbers('orb', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.orb2.anims.create({
            key: 'orb',
            frames: this.orb2.anims.generateFrameNumbers('orb', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        })
        this.zapper.anims.create({
            key: 'zapper',
            frames: this.zapper.anims.generateFrameNumbers('zapper', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1,
        })
        this.glow1.anims.create({
            key: 'glow',
            frames: this.zapper.anims.generateFrameNumbers('orbGlow', { start: 0, end: 15 }),
            frameRate: 20,
            repeat: -1,
        })
        this.glow2.anims.create({
            key: 'glow',
            frames: this.zapper.anims.generateFrameNumbers('orbGlow', { start: 0, end: 15 }),
            frameRate: 20,
            repeat: -1,
        })

        this.orb1.play('orb')
        this.orb2.play('orb')
        this.zapper.play('zapper')
        this.glow1.play('glow')
        this.glow2.play('glow')
        this.add(this.zapper)
        this.add(this.glow1)
        this.add(this.glow2)
        this.add(this.orb1)
        this.add(this.orb2)
        this.polygon = new SAT.Box(new SAT.Vector(this.x, this.y), 60, 240).toPolygon()
        this.setRotation((Math.PI / 6) * Phaser.Math.Between(0, 3))
        const angle = this.rotation
        this.polygon.setAngle(angle)
        scene.physics.add.existing(this)
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        // body.setSize(60, 240)
        const bounds = this.getBounds()
        body.setSize(bounds.width, bounds.height)
        // body.setOffset(-40, -20)
        body.setOffset(bounds.x - this.x, bounds.y - this.y)
        scene.add.existing(this)
        const player = Player.getInstance(scene, 500, 200)
        scene.physics.add.overlap(
            this,
            player,
            (zap: any, player: any) => {
                console.log('Zapped')
                if (player.stateMachine.state === 'player-zap') return
                player.stateMachine.transition('player-zap')
            },
            () => {
                const response = new SAT.Response()
                return SAT.testPolygonPolygon(player.polygon, this.polygon, response)
            },
            this
        )
    }

    update(time: number, delta: number): void {
        const matrix = this.getWorldTransformMatrix()
        // this.setRotation(this.rotation + (1 * Math.PI / 180 * delta) / 1000)
        // this.angle += 1 * delta / 1000
        this.rotation += 0.01
        const x = matrix.tx + this.zapper.x * matrix.a + this.zapper.y * matrix.c
        const y = matrix.ty + this.zapper.x * matrix.b + this.zapper.y * matrix.d
        this.polygon.pos = new SAT.Vector(x, y)
        this.polygon.setAngle(this.rotation)
        const bounds = this.getBounds()
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setSize(bounds.width, bounds.height)
        body.setOffset(bounds.x - x, bounds.y - y)
    }
}

export default Zapper
