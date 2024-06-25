import { Player } from "../../game-objects"

interface PlayerState {
    update(player: Player): void
    enter(player: Player): void
    exit(player: Player): void
}

export default PlayerState