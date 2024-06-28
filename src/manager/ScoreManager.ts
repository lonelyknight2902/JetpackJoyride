class ScoreManager {
    private static instance: ScoreManager
    private distance = 0
    private coin = 0

    private constructor() {
        this.distance = 0
        this.coin = 0
    }

    public static getInstance(): ScoreManager {
        if (!ScoreManager.instance) {
            ScoreManager.instance = new ScoreManager()
        }
        return ScoreManager.instance
    }

    public getDistance(): number {
        return this.distance
    }

    public getCoin(): number {
        return this.coin
    }

    public setDistance(distance: number): void {
        this.distance = distance
    }

    public setCoin(coin: number): void {
        this.coin = coin
    }

    public increaseDistance(distance: number): void {
        this.distance += distance
    }

    public increaseCoin(coin: number): void {
        this.coin += coin
    }

    public resetDistance(): void {
        this.distance = 0
    }

    public resetCoin(): void {
        this.coin = 0
    }

    public reset(): void {
        this.resetDistance()
        this.resetCoin()
    }
}

export default ScoreManager