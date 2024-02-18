export interface Vector2 {
    x: number
    y: number
}


class GameObject {
    position: Vector2
    size: Vector2
    color: string
    currentDirection: Vector2

    constructor(position: Vector2, size: Vector2, color: string) {
        this.position = position
        this.size = size
        this.color = color
        this.currentDirection = this.directions.up
    }

    directions = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 }
    }

    move(vector: Vector2) {
        this.position.x += vector.x
        this.position.y += vector.y
    }

    autoMove(ctx: CanvasRenderingContext2D, distanceToMovePerFrame: number) {
        
        this.move({x: 0, y: this.currentDirection.y * distanceToMovePerFrame})

        if (ctx) {
            if (this.position.y < 0) {
              this.currentDirection = this.directions.down
    
            }
            if (this.position.y > ctx.canvas.height - this.size.y) {
              this.currentDirection = this.directions.up
            }
          }
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