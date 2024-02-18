class Resource {
    name: string
    amount: number
    tickAmount: number
    tickSpeed: number



    constructor(name: string) {
        this.name = name
        this.amount = 0
        this.tickAmount = 1
        this.tickSpeed = 120
    }

    add(amount: number) {
        console.log('adding')
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
        this.tickSpeed -= Math.ceil(this.tickSpeed / 4)
    }

}

export default Resource