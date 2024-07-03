import { MissileContainer, Player } from '../../game-objects'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class AlertState extends State {
    private missileContainer: MissileContainer
    private scene: PlayScene
    private player: Player
    private elapsedTime: number
    constructor(missileContainer: MissileContainer, scene: PlayScene) {
        super()
        this.elapsedTime = 0
        this.missileContainer = missileContainer
        this.scene = scene
        this.player = this.scene.getPlayer()
    }

    enter(): void {
        console.log('AlertState')
        this.missileContainer.missileAlert.setVisible(true)
        this.missileContainer.missile.setPosition(50, 0)
        this.missileContainer.missileAlert.play('missileAlert')
        this.missileContainer.state = 'play'
        this.missileContainer.missileWarningAudio.play({
            rate: 1.0
        })
    }

    exit(): void {
        console.log('AlertState exit')
    }

    execute(time: number, delta: number): void {
        this.elapsedTime += delta
        if (this.elapsedTime > this.missileContainer.duration) {
            this.stateMachine.transition('incoming')
            this.elapsedTime = 0
        }
        this.missileContainer.y = this.player.y - 50
        console.log('AlertState execute')
    }
}

export default AlertState
