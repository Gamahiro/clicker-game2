import GameObject, { Vector2 } from "./GameObject";

class ResourceObject extends GameObject {

    currentDirection: Vector2    
    distancePerFrame: number

    constructor(position: Vector2, size: Vector2, color: string, currentDirection?: Vector2, distancePerFrame?: number) {
        super(position, size, color)
        
        this.currentDirection = currentDirection || this.directions.up
        this.distancePerFrame = distancePerFrame || 0
    }

    directions = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 }
    }

    setDistancePerFrame(distance: number) {
      console.log('setting distance per frame', distance)
      return new ResourceObject(this.position, this.size, this.color, this.currentDirection, distance)
    }

    move(vector: Vector2) {            

      let newPosition = { x: this.position.x + vector.x, y: this.position.y + vector.y }
      return new ResourceObject(newPosition, this.size, this.color, this.currentDirection, this.distancePerFrame)
  }

    autoMove(ctx: CanvasRenderingContext2D) {
      console.log(ctx)
        let moved = this.move({x: 0, y: this.currentDirection.y * this.distancePerFrame})
        console.log(moved)
        if (ctx) {

            if (this.position.y < 0) {
            return new ResourceObject(moved.position, this.size, this.color, this.directions.down, this.distancePerFrame)
    
            }
            if (this.position.y > ctx.canvas.height - this.size.y) {
              return new ResourceObject(moved.position, this.size, this.color, this.directions.up, this.distancePerFrame)

            }
          }
    }



}

export default ResourceObject