import { SCREEN_WIDTH } from '../constants'
import { PlayScene } from '../scenes'
import MissileContainer from './MissileContainer'

class MissilesContainer extends Phaser.GameObjects.Container {
    private missileContainers: MissileContainer[] = []

    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y)
        this.scene.add.existing(this)
        for (let i = 0; i < 6; i++) {
            const missileContainer = new MissileContainer(scene, SCREEN_WIDTH, 100 * i)
            missileContainer.duration = i * 1000 + 1000
            this.add(missileContainer)
            this.missileContainers.push(missileContainer)
        }
        this.state = 'idle'
    }

    launch(amount: number) {
        if (amount > this.missileContainers.length) {
            amount = this.missileContainers.length
        }
        for (let i = 0; i < amount; i++) {
            const missileContainer: MissileContainer = this.missileContainers[i]
            missileContainer.stateMachine.transition('alert')
            missileContainer.duration = i * 1000 + 1000
        }
        this.state = 'launching'
    }

    update(time: number, delta: number) {
        this.missileContainers.forEach((missileContainer) => {
            missileContainer.update(time, delta)
        })
        if (this.state === 'launching') {
            const allDeactivated = this.missileContainers.every((missileContainer) => {
                return missileContainer.stateMachine.getState() === 'deactivated'
            })
            if (allDeactivated) {
                this.state = 'idle'
            }
        }
    }

    getMissiles() : MissileContainer[] {
        return this.missileContainers
    }
}

export default MissilesContainer
