import { TitleMap } from '../../maps'
import { PlayScene } from '../../scenes'
import State from '../../types/State'

class PlayState extends State {
    private scene: PlayScene
    constructor(scene: PlayScene) {
        super()
        this.scene = scene
    }

    enter(): void {
        return
    }

    exit(): void {
        return
    }

    execute(time: number, delta: number): void {
        // if (this.scene.input.keyboard?.checkDown(, 250)) {
        //     this.scene.getPlayer().jump()
        // }
        this.scene.getPlayer().update(time, delta)
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
                        mapList[mapList.length - 1].x +
                        mapList[mapList.length - 1].width -
                        6 * 32
                    mapList.push(map)
                    mapContainer.add(map)
                    mapContainer.sendToBack(map)
                }
            }
            map.x -= (500 * delta) / 1000
            map.update()
        })
    }
}

export default PlayState