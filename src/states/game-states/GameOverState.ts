import { HallwayMap, LabMap, TitleMap } from '../../maps'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class GameOverState extends State {
    private scene: PlayScene
    private time: number
    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        // this.scene.zapperSpawnEvent.paused = true
    }

    exit(): void {
        this.scene.resultUI.update()
    }

    execute(time: number, delta: number): void {
        if (this.scene.getPlayer().isDead()) {
            const body = this.scene.getPlayer().body as Phaser.Physics.Arcade.Body
            if (body.blocked.down) {
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
            map.x -= (500 * delta) / 1000
            map.update()
        })
        // this.scene.scoreManager.increaseDistance((500 * delta) / 32)
        // this.scene.scoreUI.update()
    }
}

export default GameOverState
