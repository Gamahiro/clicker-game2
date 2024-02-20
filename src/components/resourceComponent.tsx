import { RefObject, SetStateAction, useEffect, useState } from "react"
import Resource, { ResourceJson } from "../classes/Resource"
import { getResourceColor } from "../util/getColor"
import { ResourceState } from "../hooks/useResourceElement"
import ResourceObject from "../classes/ResourceObject"
import { canvasHeight } from "./resourceCanvas"


interface ResourceComponentProps {
    resourceElement: {
        resource: Resource,
        resourceObject: ResourceObject,
        resourceState: ResourceState
    }
    resBtnContainer: RefObject<HTMLDivElement>
}

const ResourceComponent: React.FC<ResourceComponentProps> = ({ resourceElement, resBtnContainer }) => {

    const { resource, resourceObject, resourceState } = resourceElement

    if (!resBtnContainer.current) return

    const [upgradesVisible, setUpgradesVisible] = useState(false)

    const [clickValue, setClickValue] = useState(1)
    const [clickUpgradePrice, setClickUpgradePrice] = useState(10)

    const [tickAmountUpgradePrice, setTickAmountUpgradePrice] = useState(10)
    const [tickAmountMaxed, setTickAmountMaxed] = useState(false)

    const [tickSpeedUpgradePrice, setTickSpeedUpgradePrice] = useState(10)
    const [tickSpeedMaxed, setTickSpeedMaxed] = useState(false)

    const [mainButtonClicked, setMainButtonClicked] = useState(false)

    const upgradePriceModifier = 1.5

    const handleMainButtonClicked = () => {
        setMainButtonClicked(true)
        setTimeout(() => setMainButtonClicked(false), 50)
    }

    const handleResourceClick = () => {
        handleMainButtonClicked()
        resource.add(clickValue)
        resourceState.updateResource(resource.getJson())
    }

    const handleClickUpgrade = () => {
        if (resource.amount >= clickUpgradePrice) {
            resource.sub(clickUpgradePrice)
            resourceState.updateResource(resource.getJson())

            setClickUpgradePrice(Math.floor(clickUpgradePrice * upgradePriceModifier))
            setClickValue(clickValue + 2)
        }
    }

    const handleTickAmountUpgrade = () => {
        let increaseSizeAmount = 2
        if (tickAmountMaxed) return console.log('Maxed')


        if (resource.amount >= tickAmountUpgradePrice) {
            resource.sub(tickAmountUpgradePrice)
            resource.upgradeTickAmount()
            resourceObject.increaseSize(increaseSizeAmount)
            resourceState.updateState(resource.getJson(), resourceObject.getJson())
            setTickAmountUpgradePrice(Math.floor(tickAmountUpgradePrice * upgradePriceModifier))

            if (resourceObject.size.x + increaseSizeAmount > resourceObject.maxSize) {
                setTickAmountMaxed(true)
            }
        }
    }

    const handleTickSpeedUpgrade = () => {

        console.log('tickSpeedUpgradePrice', tickSpeedUpgradePrice)

        let nextTickSpeed = resource.tickSpeed - Math.ceil(resource.tickSpeed / 4)

        if (nextTickSpeed <= resource.tickSpeedMax) return console.log('Max speed reached')
        if (resource.amount >= tickSpeedUpgradePrice) {

            resource.sub(tickSpeedUpgradePrice)
            resource.upgradeTickSpeed()
            let distancePerFrame= ((canvasHeight - resourceObject.size.y) * 2) / resource.tickSpeed
            resourceObject.setDistancePerFrame(distancePerFrame)
            resourceState.updateState(resource.getJson(), resourceObject.getJson())

            setTickSpeedUpgradePrice(Math.floor(tickSpeedUpgradePrice * upgradePriceModifier))
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
        marginLeft: '0px',
        marginBottom: '0px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center' as 'center',
        width: '58px'
    }

    const mainButtonStyle = {
        marginLeft: '0px', 
        display: 'flex', 
        justifyContent: 'center', 
        height: '50px', 
        width: '100%', 
        backgroundColor: `${getResourceColor(resource.name)}`,
        border: '2px solid black'
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0px' }}>

                <button className={mainButtonClicked ? 'buttonClicked' : ''} style={mainButtonStyle} onClick={handleResourceClick}>{clickValue}</button>
                <button style={upgradeBtnStyle} onClick={handleVisibleUpgrades}>⏫</button>
                <div style={{ position: 'relative' }}>
                    {upgradesVisible &&
                        <div style={{ position: 'absolute', top: '0px' }}>
                            <button style={upgradeBtnStyle} onClick={handleClickUpgrade}>
                                <div>🖱️</div>
                                <div>{clickUpgradePrice}</div>
                            </button>


                            <button style={upgradeBtnStyle} onClick={handleTickAmountUpgrade}>
                                {tickAmountMaxed
                                    ?
                                    <>
                                        <div>✅</div>
                                        <div>MAX</div>
                                    </>
                                    :
                                    <>
                                        <div>🤏</div>
                                        <div> {tickAmountUpgradePrice} </div>
                                    </>
                                }

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
                        </div>
                    }
                </div>


            </div>
        </>
    )
}

export default ResourceComponent