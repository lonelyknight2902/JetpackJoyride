import { StateMachine } from '../states'

class State {
    public stateMachine: StateMachine
    enter(): void {}
    exit(): void {}
    execute(): void {}
}

export default State
