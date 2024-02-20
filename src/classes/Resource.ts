export interface ResourceJson {
    name: string
    amount: number
    tickAmount: number
    tickSpeed: number
    tickSpeedMax: number
}



class Resource {
    name: string
    amount: number
    tickAmount: number
    tickSpeed: number
    tickSpeedMax: number



    constructor(name: string, amount?: number, tickAmount?: number, tickSpeed?: number, tickSpeedMax?: number) {
        this.name = name
        this.amount = amount || 0
        this.tickAmount = tickAmount || 1
        this.tickSpeed = tickSpeed || 240
        this.tickSpeedMax = tickSpeedMax || 5
    }

    add(amount: number) {
        this.amount += amount
    }

    sub(amount: number) {
        if (this.amount < amount) return console.log('Not enough resources')
        this.amount -= amount        
    }

    tick() {
        this.amount += this.tickAmount
    }

    upgradeTickAmount() {
        this.tickAmount += 1
    }

    upgradeTickSpeed() {
        const nextTickSpeed = Math.ceil(this.tickSpeed / 4)

        if(this.tickSpeed - nextTickSpeed < this.tickSpeedMax) return console.log('Max speed reached')
        this.tickSpeed -= nextTickSpeed
    }

    getJson() {
        return {
            name: this.name,
            amount: this.amount,
            tickAmount: this.tickAmount,
            tickSpeed: this.tickSpeed,
            tickSpeedMax: this.tickSpeedMax
        }
    }

}

export default Resource