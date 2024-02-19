import { useEffect, useReducer, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Resource from './classes/Resource'
import ResourceComponent from './components/resourceComponent'
import GameObject from './classes/GameObject'
import { canvasStyle, resBtnContainer } from './styles/canvasStyles'
import { getResourceColor } from './util/getColor'
import ResourceObject from './classes/ResourceObject'
import useResourceElements from './hooks/useResourceElement'

function App() {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resBtnContainerRef = useRef<HTMLDivElement>(null)


  const goldResource = new Resource('gold')
  const goldObject = new ResourceObject({ x: 10, y: 0 }, { x: 50, y: 50 }, 'yellow')


  const woodResource = new Resource('wood')
  const woodObject = new ResourceObject({ x: 70, y: 0 }, { x: 50, y: 50 }, 'brown')


  const stoneResource = new Resource('stone')
  const stoneObject = new ResourceObject({ x: 130, y: 0 }, { x: 50, y: 50 }, 'gray')


  const createResourceElement = (resource: Resource, resourceObject: ResourceObject) => {
    return {
      resource: resource,
      resourceObject: resourceObject
    }
  }


  const resourceElementsList = useResourceElements({
    resourceElementsLocked: [
      createResourceElement(woodResource, woodObject),
      createResourceElement(stoneResource, stoneObject),
    ],
    resourceElementsUnlocked: [
      createResourceElement(goldResource, goldObject),
    ]
  }) 

  const { resourceElementsLocked, resourceElementsUnlocked } = resourceElementsList.resourceElements



  const unlockNextElement = () => {
    if (resourceElementsLocked.length > 0) {
      resourceElementsList.unlockNextElement()
    }
  }


  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = 3 * 60 + 10
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

        resourceObject.draw(ctx)
        if (frame % resourceElement.resource.tickSpeed === 0) {
          resourceElementsList.updateResource(resource.name, 'tick')          
          console.log('ticked', resource.name, resource.tick)

          resourceElementsList.updateResource(resource.name, 'add', 1)
          console.log('added', resource.name)
          
          let distancePerFrame = (ctx.canvas.height / 2 - resourceObject.size.y) / resource.tickSpeed
          resourceElementsList.updateGameObject(resource.name, 'setDistancePerFrame', distancePerFrame)
          console.log('setdist', resource.name)

        }
        resourceElementsList.updateGameObject(resource.name, 'autoMove', ctx)
        console.log('automove', resource.name)
      })




      frame++
      animationFrameID = requestAnimationFrame(gameLoop)
    }
    gameLoop()

    return () => {
      cancelAnimationFrame(animationFrameID)
    }

  }, [])



  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      <div style={canvasRef.current ? { width: `${canvasRef.current.width + 2}px` } : undefined}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${3}, 60px)` }}>
          {            
            resourceElementsUnlocked.map((resourceElement, index) => {
              return <div key={index} style={{ marginLeft: '10px' }}>{resourceElement.resource.amount}</div>
          })
        }        
        </div>

        <canvas style={{ ...canvasStyle }} ref={canvasRef} />
        <div style={{ ...resBtnContainer, display: 'grid', gridTemplateColumns: `repeat(${3}, 60px)` }} ref={resBtnContainerRef}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${resourceElementsLocked.length ? resourceElementsUnlocked.length + 1 : resourceElementsUnlocked.length}, 60px)` }}>

        {
          resourceElementsUnlocked.map((resourceElement, index) => {
            return <ResourceComponent key={index} resource={resourceElement.resource} resourceAmount={resourceElement.amount} resourceElementList={resourceElementsList} resBtnContainer={resBtnContainerRef} />
          })
        }
        <UnlockButton resourceElementsLocked={resourceElementsLocked} resourceElementsUnlocked={resourceElementsUnlocked} unlockNextElement={unlockNextElement} />
      </div>

    </div>
  )
}

interface UnlockButtonProps {
  resourceElementsLocked: { resource: Resource, resourceAmount: number, setResourceAmount: (amount: number) => void }[]
  resourceElementsUnlocked: { resource: Resource, resourceAmount: number, setResourceAmount: (amount: number) => void }[]
  unlockNextElement: () => void
}

const UnlockButton: React.FC<UnlockButtonProps> = ({ resourceElementsLocked, resourceElementsUnlocked, unlockNextElement }) => {

  return (
    <>
      {
        resourceElementsLocked.length > 0 &&
        <button
          style={{ backgroundColor: `${getResourceColor(resourceElementsLocked[0].resource.name)}`, height: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          onClick={unlockNextElement}
        >
          <div>🔒</div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', border: '1px solid black', backgroundColor: `${getResourceColor(resourceElementsUnlocked[resourceElementsUnlocked.length - 1].resource.name)}` }}></div>
            <div>100</div>
          </div>
        </button>
      }
    </>
  )
}

export default App
