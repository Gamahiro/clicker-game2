import { useState } from "react";
import useResource from "./useResource";

const resourceStartSize = { x: 10, y: 10 }
export const laneWidth = 60


export const useResourceList = () => {



    const getLaneCenter = (positionNumber: number) => {
        const laneCenter = (laneWidth * positionNumber) - (laneWidth / 2);
        const objectCenter = resourceStartSize.x / 2;
        return laneCenter - objectCenter;
    }

    const water = useResource('water', { x: getLaneCenter(1), y: 0 }, resourceStartSize, 'blue')
    const wood = useResource('wood', { x: getLaneCenter(2), y: 0 }, resourceStartSize, 'brown')
    const stone = useResource('stone', { x: getLaneCenter(3), y: 0 }, resourceStartSize, 'gray')
    const gold = useResource('gold', { x: getLaneCenter(4), y: 0 }, resourceStartSize, 'yellow')

    const [resourceElementsLocked, setResourceElementsLocked] = useState([
        wood,
        stone,
        gold
    ])

    const [resourceElementsUnlocked, setResourceElementsUnlocked] = useState([
        water,
    ])

    const unlockNextElement = () => {
        let resourceElement = resourceElementsUnlocked[resourceElementsUnlocked.length - 1]




        if (resourceElementsLocked.length > 0 && resourceElement.resource.amount >= 100) {
            resourceElement.resource.sub(100)
            resourceElement.resourceState.updateResource(resourceElementsUnlocked[resourceElementsUnlocked.length - 1].resource.getJson())

            let tempResourceElementsLocked = [...resourceElementsLocked]
            let tempResourceElementsUnlocked = [...resourceElementsUnlocked]

            let nextElement = tempResourceElementsLocked.shift()
            if (nextElement) {
                tempResourceElementsUnlocked.push(nextElement)
                setResourceElementsLocked(tempResourceElementsLocked)
                setResourceElementsUnlocked(tempResourceElementsUnlocked)
            }
        }
    }



    return { resourceElementsLocked, resourceElementsUnlocked, unlockNextElement }

}

export default useResourceList;