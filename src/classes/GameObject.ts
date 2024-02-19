export interface Vector2 {
    x: number
    y: number
}


class GameObject {
    position: Vector2
    size: Vector2
    color: string

    constructor(position: Vector2, size: Vector2, color: string) {
        this.position = position
        this.size = size
        this.color = color
    }

    

    move(vector: Vector2) {            

        let newPosition = { x: this.position.x + vector.x, y: this.position.y + vector.y }
        return new GameObject(newPosition, this.size, this.color)
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)

        ctx.strokeStyle = 'black'; 
        ctx.lineWidth = 2; 
        ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y); 
    }

}

export default GameObject