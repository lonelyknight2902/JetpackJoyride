import { SCREEN_HEIGHT, TRANSITION_DELAY } from '../../constants'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class StartState extends State {
    private scene: PlayScene
    private tween: Phaser.Tweens.Tween
    private elapsedTime: number
    constructor(scene: PlayScene) {
        super()
        this.scene = scene
        this.elapsedTime = 0
    }

    enter(): void {
        console.log('StartState')
        this.scene.setMapList([...this.scene.initialMapList])
        const mapList = this.scene.getMapList()
        console.log(this.scene.initialMapList)
        console.log(mapList)
        mapList[0].setPosition(0, 0)
        mapList[1].setPosition(928, 0)
        mapList[2].setPosition(928 + 4032 - 32 * 6, 0)
        const map = this.scene.getMap()
        map.add(mapList[0])
        map.sendToBack(mapList[1])
        map.sendToBack(mapList[2])
        mapList.forEach((map) => map.update())
        this.scene.title.y = SCREEN_HEIGHT / 2
        this.scene.getPlayer().setPosition(200, 576)
        this.scene.getShadow().x = this.scene.getPlayer().x + 30
        this.scene.getPlayer().setVisible(false)
        this.scene.getShadow().setVisible(false)
        this.scene.scoreUI.setVisible(false)
        this.scene.cameras.main.fadeIn(1000, 0, 0, 0)
        this.scene.menuAmbiance.play()
        this.scene.titleMap.reset()
        this.scene.lasers.getLasers().forEach((laser) => {
            laser.stateMachine.transition('deactivate')
        })
        this.scene.missiles.getMissiles().forEach((missile) => {
            missile.stateMachine.transition('deactivated')
        })
    }

    exit(): void {
        this.tween = this.scene.tweens.add({
            targets: this.scene.title,
            y: -200,
            duration: 500,
            ease: 'Cubic',
        })
        this.elapsedTime = 0
        this.scene.scoreUI.setVisible(true)
        this.scene.titleMap.hideHole()
        this.scene.titleMap.getWallHole().setPosition(32, 690)
        this.scene.scoreUI.update()
        this.scene.menuAmbiance.stop()
    }

    execute(time: number, delta: number): void {
        if (
            (this.scene.input.keyboard?.createCursorKeys().space?.isDown ||
                this.scene.input.activePointer.isDown) &&
            this.elapsedTime >= TRANSITION_DELAY
        ) {
            console.log('StartState -> IntroState')
            this.stateMachine.transition('intro')
        } else {
            this.elapsedTime += delta
        }
    }
}

export default StartState
