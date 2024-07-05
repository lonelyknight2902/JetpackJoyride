import { GAME_SPEED } from '../../constants'
import { HallwayMap, LabMap, TitleMap } from '../../maps'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class GameOverState extends State {
    private scene: PlayScene
    private time: number
    private acceleration = -400
    private speed = GAME_SPEED
    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        // this.scene.zapperSpawnEvent.paused = true
        this.speed = GAME_SPEED
    }

    exit(): void {
        this.scene.resultUI.update()
    }

    execute(time: number, delta: number): void {
        const body = this.scene.getPlayer().body as Phaser.Physics.Arcade.Body
        if (this.scene.getPlayer().isDead()) {
            if (body.velocity.y === 0 && this.speed === 0) {
                this.stateMachine.transition('result')
            }
            // this.scene.getPlayer().stateMachine.transition('player-run')
        }
        this.scene.getPlayer().update(time, delta)
        this.scene
            .getShadow()
            .setScale(1.5 * (1 - (576 - this.scene.getPlayer().y) / (576 - 116)) + 0.1)
        const mapContainer = this.scene.getMap()
        const mapList = this.scene.getMapList()
        if (this.speed > 0 && body.blocked.down) {
            this.speed += (this.acceleration * delta) / 1000
            console.log('Speed: ', this.speed)
            if (this.speed < 0) {
                this.speed = 0
            }
        }
        mapContainer.each((map: Phaser.GameObjects.Container) => {
            if (map.x + map.width < 0) {
                mapContainer.remove(map)
                mapList.shift()
                if (!(map instanceof TitleMap)) {
                    // this.readyMap.push(map)
                    // console.log(this.mapList)
                    map.x =
                        mapList[mapList.length - 1].x + mapList[mapList.length - 1].width - 6 * 32
                    mapList.push(map)
                    mapContainer.add(map)
                    mapContainer.sendToBack(map)
                    if (map instanceof HallwayMap || map instanceof LabMap) {
                        map.reset()
                    }
                }
            }
            map.x -= (this.speed * delta) / 1000
            map.update()
        })
        // this.scene.scoreManager.increaseDistance((500 * delta) / 32)
        // this.scene.scoreUI.update()
    }
}

export default GameOverState
