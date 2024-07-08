import { SCREEN_HEIGHT } from "../constants"

class Warehouse extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        const background1 = scene.add.image(0, SCREEN_HEIGHT / 2, 'warehouse', 'warehouseFG_1_TVOS')
        const background3 = scene.add.image(background1.x + background1.width, SCREEN_HEIGHT / 2, 'warehouse', 'warehouseFG_3_TVOS')
        const background4 = scene.add.image(background3.x + background3.width, SCREEN_HEIGHT / 2, 'warehouse', 'warehouseFG_4_TVOS')
        const background5 = scene.add.image(background4.x + background4.width, SCREEN_HEIGHT / 2, 'warehouse', 'warehouseFG_5_TVOS')
        const background2 = scene.add.image(background5.x + background5.width - 8 * 32, SCREEN_HEIGHT / 2, 'warehouse', 'warehouseFG_2_TVOS')
        background1.setOrigin(0, 0.5)
        background2.setOrigin(0, 0.5)
        background3.setOrigin(0, 0.5)
        background4.setOrigin(0, 0.5)
        background5.setOrigin(0, 0.5)
        this.add(background1)
        this.add(background2)
        this.add(background3)
        this.add(background4)
        this.add(background5)
        this.setSize(background1.width + background2.width + background3.width + background4.width + background5.width - 10 * 32, background1.height)
        console.log('Warehouse width: ', this.width)
    }

    reset() : void {
        return
    }
}

export default Warehouse
