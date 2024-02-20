import { useEffect, useRef } from "react"
import { laneWidth } from "../hooks/useResourceList"
import { canvasStyle } from "../styles/canvasStyles"
import { ResourceElementsArray } from "../App"

type ResourceCanvasProps = {
    resourceElementsUnlocked: ResourceElementsArray
    }

export const canvasHeight = 200


const ResourceCanvas: React.FC<ResourceCanvasProps> = ({resourceElementsUnlocked}) => {

  const canvasRef = useRef<HTMLCanvasElement>(null)


    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
          canvas.width = resourceElementsUnlocked.length * laneWidth
          canvas.height = canvasHeight
        }
    
        const ctx = canvas?.getContext('2d')
    
        let frame = 0;
        let animationFrameID: number;
        const gameLoop = () => {
          if (!ctx) return
    
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    
          resourceElementsUnlocked.forEach((resourceElement) => {
            let resourceObject = resourceElement.resourceObject
            let resource = resourceElement.resource
            let resourceState = resourceElement.resourceState
            resourceObject.draw(ctx)
            if (frame % resource.tickSpeed === 0) {            
              
    
            }
            resourceObject.autoMove(resource)
            resourceState.updateState(resource.getJson(), resourceObject.getJson())
          })
    
    
    
    
          frame++
          animationFrameID = requestAnimationFrame(gameLoop)
        }
        gameLoop()
    
        return () => {
          cancelAnimationFrame(animationFrameID)
        }
    
      }, [resourceElementsUnlocked])

      return (
        <canvas style={{ ...canvasStyle, borderRight: '0' }} ref={canvasRef} />
      )
}

export default ResourceCanvas