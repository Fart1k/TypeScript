class Player {
    private playerState: PlayerState
    constructor(newState: PlayerState) {
        this.changeState = newState
    }
    public changeState(nextState: PlayerState): void {
        console.log(`Player is: ${(<any>nextState).constructor.name}`)
        this.playerState = nextState
        this.state.setPlayer(this)
    }

    public requestPowerUp(): void {
        this.playerState.powerUp()
    }
    public requestKillPlayer(): void {
        this.playerState.killPlayer()
    }
}

abstract class PlayerState {
    protected player: Player = new Player(this)

    public setPlayer()
}