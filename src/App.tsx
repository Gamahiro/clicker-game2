import { useEffect, useRef, useState } from 'react'
import './App.css'
import Resource from './classes/Resource'
import ResourceComponent from './components/resourceComponent'
import { canvasStyle, resBtnContainer } from './styles/canvasStyles'
import { getResourceColor } from './util/getColor'
import ResourceObject from './classes/ResourceObject'
import { ResourceState } from './hooks/useResourceElement'
import useResource from './hooks/useResource'
import useResourceList from './hooks/useResourceList'
import ResourceCanvas from './components/resourceCanvas'

export type ResourceElementsArray = { resource: Resource, resourceObject: ResourceObject, resourceState: ResourceState }[]

function App() {


  const resBtnContainerRef = useRef<HTMLDivElement>(null)

  
  const { resourceElementsLocked, resourceElementsUnlocked, unlockNextElement } = useResourceList()

  



  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>

      <div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${resourceElementsUnlocked.length}, 60px)` }}>
          {
            resourceElementsUnlocked.map((resourceElement, index) => {
              return <div style={{fontSize: '12px'}} key={index}>{`${resourceElement.resource.amount}(+${resourceElement.resource.tickAmount})`}</div>
            })
          }
        </div>

        <div style={{ display: 'flex' }}>
          <ResourceCanvas resourceElementsUnlocked={resourceElementsUnlocked}/>
          { resourceElementsLocked.length > 0 &&
          <UnlockButton resourceElementsLocked={resourceElementsLocked} resourceElementsUnlocked={resourceElementsUnlocked} unlockNextElement={unlockNextElement} />
          }

        </div>
        <div style={{ ...resBtnContainer, display: 'grid', gridTemplateColumns: `repeat(${resourceElementsUnlocked.length}, 60px)` }} ref={resBtnContainerRef}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${resourceElementsLocked.length ? resourceElementsUnlocked.length + 1 : resourceElementsUnlocked.length}, 60px)`, }}>

        {
          resourceElementsUnlocked.map((resourceElement, index) => {
            return <ResourceComponent key={index} resourceElement={resourceElement} resBtnContainer={resBtnContainerRef} />
          })
        }
      </div>

    </div>
  )
}

interface UnlockButtonProps {
  resourceElementsLocked: ResourceElementsArray
  resourceElementsUnlocked: ResourceElementsArray
  unlockNextElement: () => void
}

const UnlockButton: React.FC<UnlockButtonProps> = ({ resourceElementsLocked, resourceElementsUnlocked, unlockNextElement }) => {

  return (
    <div style={{ backgroundColor: 'silver', border: '2px solid black', width: '70px', borderLeft: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {
        resourceElementsLocked.length > 0 &&
        <button
          style={{ backgroundColor: `${getResourceColor(resourceElementsLocked[0].resource.name)}`, height: '50px', width: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '0px', border: '1px solid black' }}
          onClick={unlockNextElement}
        >
          <div>🔒</div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', border: '1px solid black', backgroundColor: `${getResourceColor(resourceElementsUnlocked[resourceElementsUnlocked.length - 1].resource.name)}` }}></div>
            <div>100</div>
          </div>
        </button>
      }
    </div>
  )
}

export default App
