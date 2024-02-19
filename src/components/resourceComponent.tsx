import { RefObject, SetStateAction, useEffect, useState } from "react"
import Resource from "../classes/Resource"
import { getResourceColor } from "../util/getColor"


interface ResourceComponentProps {
    resource: Resource
    resourceAmount: number
    resourceElementList: any
    resBtnContainer: RefObject<HTMLDivElement>
}

const ResourceComponent: React.FC<ResourceComponentProps> = ({ resource, resourceAmount, resourceElementList, resBtnContainer }) => {

    if (!resBtnContainer.current) return

    const [upgradesVisible, setUpgradesVisible] = useState(false)

    const [clickValue, setClickValue] = useState(1)
    const [clickUpgradePrice, setClickUpgradePrice] = useState(10)

    const [tickAmountUpgradePrice, setTickAmountUpgradePrice] = useState(10)

    const [tickSpeedUpgradePrice, setTickSpeedUpgradePrice] = useState(10)
    const [tickSpeedMaxed, setTickSpeedMaxed] = useState(false)

    const handleResourceClick = () => {
        resourceElementList.updateResource(resource.name, resource.add, [clickValue])        
    }

    const handleClickUpgrade = () => {
        if (resourceAmount >= clickUpgradePrice) {
            resourceElementList.updateResource(resource.name, resource.sub, [clickUpgradePrice])

            setClickUpgradePrice(clickUpgradePrice * 2)
            setClickValue(clickValue + 2)
            
        }
    }

    const handleTickAmountUpgrade = () => {
        console.log(resourceAmount, tickAmountUpgradePrice)
        if (resourceAmount >= tickAmountUpgradePrice) {
            resourceElementList.updateResource(resource.name, resource.sub, [tickAmountUpgradePrice])
            resourceElementList.updateResource(resource.name, resource.upgradeTickAmount)
            setTickAmountUpgradePrice(tickAmountUpgradePrice * 2)
        }
    }

    const handleTickSpeedUpgrade = () => {

        console.log('tickSpeedUpgradePrice', tickSpeedUpgradePrice)

        let nextTickSpeed = resource.tickSpeed - Math.ceil(resource.tickSpeed / 4)

        if (nextTickSpeed <= resource.tickSpeedMax) return console.log('Max speed reached')
        if (resourceAmount >= tickSpeedUpgradePrice) {
            resourceElementList.updateResource(resource.name, resource.sub, [tickSpeedUpgradePrice])
            resourceElementList.updateResource(resource.name, resource.upgradeTickSpeed)
            setTickSpeedUpgradePrice(tickSpeedUpgradePrice * 2)
            nextTickSpeed = resource.tickSpeed - Math.ceil(resource.tickSpeed / 4)
            if (nextTickSpeed <= resource.tickSpeedMax) {
                setTickSpeedMaxed(true)
            }
        }
    }

    const handleVisibleUpgrades = () => {
        setUpgradesVisible(!upgradesVisible)
    }

    const upgradeBtnStyle = {
        margin: '2px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center' as 'center'
    }


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>

                <button style={{ marginLeft: '0px', display: 'flex', justifyContent: 'center', height: '50px', backgroundColor: `${getResourceColor(resource.name)}` }} onClick={handleResourceClick}></button>
                <button onClick={handleVisibleUpgrades}>⏫</button>

                {upgradesVisible &&
                    <>
                        <button style={upgradeBtnStyle} onClick={handleClickUpgrade}>
                            <div>🖱️</div>
                            <div>{clickUpgradePrice}</div>
                        </button>


                        <button style={upgradeBtnStyle} onClick={handleTickAmountUpgrade}>
                            <div>🤏</div>
                            <div> {tickAmountUpgradePrice} </div>
                        </button>


                        <button style={upgradeBtnStyle} onClick={handleTickSpeedUpgrade}>
                            {tickSpeedMaxed
                                ?
                                <>
                                    <div>✅</div>
                                    <div>MAX</div>
                                </>
                                :
                                <>
                                    <div> ⏩</div>
                                    <div>{tickSpeedUpgradePrice}</div>
                                </>
                            }


                        </button>
                    </>
                }


            </div>
        </>
    )
}

export default ResourceComponent