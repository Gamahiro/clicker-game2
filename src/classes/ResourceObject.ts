import { canvasHeight } from "../components/resourceCanvas";
import GameObject, { Vector2 } from "./GameObject";
import Resource from "./Resource";

export interface ResourceObjectJson {
    position: Vector2
    size: Vector2
    color: string
    currentDirection: Vector2
    distancePerFrame: number

}


class ResourceObject extends GameObject {

    currentDirection: Vector2    
    distancePerFrame: number
    maxSize: number

    constructor(position: Vector2, size: Vector2, color: string, currentDirection?: Vector2, distancePerFrame?: number) {
        super(position, size, color)
        
        this.currentDirection = currentDirection || this.directions.up
        this.distancePerFrame = distancePerFrame || ((canvasHeight - this.size.y) * 2) / 240
        this.maxSize = 60
    }

    directions = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 }
    }

    increaseSize(amount: number) {
      if (this.size.x + amount > this.maxSize) return
        this.size = { x: this.size.x + amount, y: this.size.y + amount }
        this.move({x:-amount / 2, y: 0})
    }

    setDistancePerFrame(distance: number) {
      this.distancePerFrame = distance
    }
    

    autoMove(resource: Resource) {      
        this.move({x: 0, y: this.currentDirection.y * this.distancePerFrame})

        
            if (this.position.y < 0) {
              this.currentDirection = this.directions.down   
              resource.tick() 
            }
            if (this.position.y > canvasHeight - this.size.y) {
              this.currentDirection = this.directions.up

            }
          
    }

    getJson() {
        return {
            position: this.position,
            size: this.size,
            color: this.color,
            currentDirection: this.currentDirection,
            distancePerFrame: this.distancePerFrame
        }
    }



}

export default ResourceObject