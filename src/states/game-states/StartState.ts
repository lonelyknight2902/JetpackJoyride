import { SCREEN_HEIGHT } from '../../constants'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class StartState extends State {
    private scene: PlayScene
    private tween: Phaser.Tweens.Tween
    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }
    
    enter(): void {
        console.log('StartState')
        this.scene.setMapList([...this.scene.initialMapList])
        const mapList = this.scene.getMapList()
        console.log(this.scene.initialMapList)
        console.log(mapList)
        mapList[0].setPosition(0, 0)
        mapList[1].setPosition(928, 0)
        mapList[2].setPosition(928 + 4032 - 32*6, 0)
        const map = this.scene.getMap()
        map.add(mapList[0])
        map.sendToBack(mapList[1])
        map.sendToBack(mapList[2])
        this.scene.title.y = SCREEN_HEIGHT / 2
    }

    exit(): void {
        this.tween = this.scene.tweens.add({
            targets: this.scene.title,
            y: -200,
            duration: 500,
            ease: 'Cubic',
        })
    }

    execute(): void {
        if (this.scene.input.keyboard?.createCursorKeys().space?.isDown || this.scene.input.activePointer.isDown) {
            console.log('StartState -> PlayState')
            this.stateMachine.transition('play')
        }
    }
}

export default StartState
