import { SCREEN_WIDTH } from "../constants"
import { PlayScene } from "../scenes"
import { StateMachine } from "../states"
import { AlertState, DeactivatedState, ExplodedState, IncomingState, LaunchState } from "../states/missile-states"
import Missile from "./Missile"
import MissileAlert from "./MissileAlert"
import Player from "./Player"

class MissileContainer extends Phaser.GameObjects.Container {
    public missileAlert: MissileAlert
    public missile: Missile
    public duration = 2000
    public stateMachine: StateMachine
    public missileWarningAudio: Phaser.Sound.BaseSound
    public missileLaunchAudio: Phaser.Sound.BaseSound
    public missileExplodeAudio: Phaser.Sound.BaseSound
    constructor(scene: PlayScene, x: number, y: number) {
        super(scene, x, y)
        this.scene.add.existing(this)
        this.missile = new Missile(scene, 50, 0)
        this.missileAlert = new MissileAlert(scene, 0, 0)
        this.missileAlert.setOrigin(1, 0.5)
        this.add(this.missile)
        this.add(this.missileAlert)
        this.missile.setVisible(false)
        this.missileAlert.setVisible(false)
        const player = Player.getInstance(scene, 200, 200)
        this.missileWarningAudio = scene.sound.add('missileWarning', { loop: true })
        this.missileLaunchAudio = scene.sound.add('missileLaunch')
        this.missileExplodeAudio = scene.sound.add('missileExplode')
        this.scene.physics.add.overlap(this.missile, player, (missile: any, player: any) => {
            const scenePlayer = player as Player
            console.log('Boooooooooom')
            if (scenePlayer.getCurrentState() !== 'player-die') {
                scenePlayer.stateMachine.transition('player-die')
                this.stateMachine.transition('exploded')
            }
        })
        this.stateMachine = new StateMachine('deactivated', {
            alert: new AlertState(this, scene),
            incoming: new IncomingState(this, scene),
            launch: new LaunchState(this, scene),
            deactivated: new DeactivatedState(this, scene),
            exploded: new ExplodedState(this, scene)
        })
    }

    update(time: number, delta: number) {
        this.stateMachine.update(time, delta)
    }
}

export default MissileContainer