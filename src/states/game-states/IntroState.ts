import { GAME_SPEED } from '../../constants'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class IntroState extends State {
    private scene: PlayScene
    private target: Phaser.Math.Vector2
    constructor(scene: PlayScene) {
        super()
        this.scene = scene
        this.target = new Phaser.Math.Vector2(500, 576)
    }

    enter(): void {
        this.scene.getPlayer().setVisible(true)
        this.scene.getShadow().setVisible(true)
        this.scene.physics.moveToObject(this.scene.getPlayer(), this.target, GAME_SPEED)
        this.scene.cameras.main.shake(500, 0.01)
        this.scene.titleMap.displayHole()
        this.scene.titleMap.displaySmoke()
    }

    exit(): void {
        this.scene.titleMap.hideSmoke()
    }

    execute(time: number, delta: number): void {
        if (this.scene.getPlayer().x >= this.target.x) {
            const body = this.scene.getPlayer().body as Phaser.Physics.Arcade.Body
            body.setVelocity(0, 0)
            this.stateMachine.transition('play')
            this.scene.getPlayer().setPosition(this.target.x, this.target.y)
        }
        this.scene.getShadow().x = this.scene.getPlayer().x + 30
    }
}

export default IntroState
