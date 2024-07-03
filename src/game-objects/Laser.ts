import { SCREEN_WIDTH } from '../constants'
import { StateMachine } from '../states'
import LaserBeam from './LaserBeam'
import LaserEnergy from './LaserEnergy'
import LaserPod from './LaserPod'
import LaserFlash from './LaserFlash'
import {
    ChargingState,
    DeactivateState,
    ExitState,
    FiringState,
    ReadyState,
    StopState,
} from '../states/laser-states'
import Player from './Player'

class Laser extends Phaser.GameObjects.Container {
    public laserPodLeft: Phaser.GameObjects.Sprite
    public laserPodRight: Phaser.GameObjects.Sprite
    public laserBeam: Phaser.GameObjects.Sprite
    public laserEnergyLeft: Phaser.GameObjects.Sprite
    public laserFlashLeft: Phaser.GameObjects.Sprite
    public laserBeamRight: Phaser.GameObjects.Sprite
    public laserEnergyRight: Phaser.GameObjects.Sprite
    public laserFlashRight: Phaser.GameObjects.Sprite
    public laserWarning: Phaser.GameObjects.Image
    public stateMachine: StateMachine
    public laserWarningAudio: Phaser.Sound.BaseSound
    public laserStartAudio: Phaser.Sound.BaseSound
    public laserFireAudio: Phaser.Sound.BaseSound
    public laserStopAudio: Phaser.Sound.BaseSound
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.scene.add.existing(this)
        this.laserPodLeft = new LaserPod(scene, -100, 0)
        this.laserPodRight = new LaserPod(scene, SCREEN_WIDTH + 100, 0)
        this.laserPodRight.flipX = true
        this.laserBeam = new LaserBeam(scene, SCREEN_WIDTH / 2, 0)
        this.laserEnergyLeft = new LaserEnergy(scene, 30, this.laserPodLeft.height / 2 - 30)
        this.laserEnergyRight = new LaserEnergy(
            scene,
            SCREEN_WIDTH - 30,
            this.laserPodRight.height / 2 - 30
        )
        this.laserEnergyRight.flipX = true
        this.laserFlashLeft = new LaserFlash(scene, 30, 0)
        this.laserFlashRight = new LaserFlash(scene, SCREEN_WIDTH - 30, 0)
        this.laserFlashRight.flipX = true
        this.laserPodLeft.setOrigin(0, 0)
        this.laserPodRight.setOrigin(1, 0)
        this.laserBeam.setOrigin(0.5, 0)
        this.laserBeam.setScale(20, 1)
        this.laserEnergyLeft.setOrigin(0.5, 0.5)
        this.laserEnergyRight.setOrigin(0.5, 0.5)
        this.laserFlashLeft.setOrigin(0, 0)
        this.laserFlashRight.setOrigin(1, 0)
        this.laserWarning = scene.add.image(
            SCREEN_WIDTH / 2,
            this.laserPodLeft.height / 2 - 30,
            'laserWarning'
        )
        this.laserWarning.setOrigin(0.5, 0.5)
        this.laserWarning.setScale(5, 0.1)
        this.add(this.laserWarning)
        this.add(this.laserBeam)
        this.add(this.laserPodLeft)
        this.add(this.laserPodRight)
        this.add(this.laserEnergyLeft)
        this.add(this.laserFlashLeft)
        this.add(this.laserEnergyRight)
        this.add(this.laserFlashRight)
        this.laserWarningAudio = scene.sound.add('laserWarning')
        this.laserStartAudio = scene.sound.add('laserStart')
        this.laserFireAudio = scene.sound.add('laserFire', { loop: true })
        this.laserStopAudio = scene.sound.add('laserStop')
        this.laserWarning.setVisible(false)
        this.laserBeam.setVisible(false)
        this.laserEnergyLeft.setVisible(false)
        this.laserFlashLeft.setVisible(false)
        this.laserEnergyRight.setVisible(false)
        this.laserFlashRight.setVisible(false)
        const player = Player.getInstance(scene, 200, 200)
        this.stateMachine = new StateMachine('deactivate', {
            ready: new ReadyState(this, scene),
            charging: new ChargingState(this, scene),
            firing: new FiringState(this, scene),
            stop: new StopState(this, scene),
            exit: new ExitState(this, scene),
            deactivate: new DeactivateState(this, scene),
        })
        this.scene.physics.add.overlap(this.laserBeam, player, (laserBeam: any, player: any) => {
            const p = player as Player
            if (p.getCurrentState() !== 'player-die' && this.stateMachine.getState() === 'firing') {
                p.stateMachine.transition('player-burn')
            }
        })
    }

    update(time: number, delta: number) {
        this.stateMachine.update(time, delta)
    }
}

export default Laser
