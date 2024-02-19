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
        this.tickSpeedMax = tickSpeedMax || 10
    }

    add(amount: number) {
        console.log('adding')
        return new Resource(this.name, this.amount + amount, this.tickAmount, this.tickSpeed, this.tickSpeedMax)
    }

    sub(amount: number) {
        console.log('subtracting')
        if (this.amount < amount) return console.log('Not enough resources')
        return new Resource(this.name, this.amount - amount, this.tickAmount, this.tickSpeed, this.tickSpeedMax)
    }

    tick() {
        console.log('tick', this.name)
        return new Resource(this.name, this.amount + this.tickAmount, this.tickAmount, this.tickSpeed, this.tickSpeedMax)
    }

    upgradeTickAmount() {
        return new Resource(this.name, this.amount, this.tickAmount + 1, this.tickSpeed, this.tickSpeedMax)
    }

    upgradeTickSpeed() {
        if(this.tickSpeed - Math.ceil(this.tickSpeed / 4) <= this.tickSpeedMax) return console.log('Max speed reached')
        return new Resource(this.name, this.amount, this.tickAmount, this.tickSpeed - Math.ceil(this.tickSpeed / 4), this.tickSpeedMax)

    }

}

export default Resource