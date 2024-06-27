import State from '../types/State'

class StateMachine {
    private _initialState: string
    private _state: string | null
    private _possibleStates: { [state: string]: State } = {}
    private _stateArgs: any[]

    constructor(
        initialState: string,
        possibleStates: { [state: string]: State },
        stateArgs: any[] = []
    ) {
        this._initialState = initialState
        this._possibleStates = possibleStates
        this._state = null
        this._stateArgs = stateArgs
        for (const state in this._possibleStates) {
            this._possibleStates[state].stateMachine = this
        }
    }

    public update(time: number, delta: number) {
        if (this._state === null) {
            this._state = this._initialState
            this._possibleStates[this._state].enter()
        }
        this._possibleStates[this._state].execute(time, delta)
    }

    public transition(stateKey: string): void {
        if (this._state) {
            this._possibleStates[this._state].exit()
        }
        this._state = stateKey
        this._possibleStates[this._state].enter()
    }

    public getState(): string | null {
        return this._state
    }
}

export default StateMachine
