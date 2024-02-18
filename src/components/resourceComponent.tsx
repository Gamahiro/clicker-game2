import { SetStateAction, useState } from "react"
import Resource from "../classes/Resource"


interface ResourceComponentProps {
    resource: Resource
    resourceAmount: number
    setResourceAmount: any
}

const ResourceComponent: React.FC<ResourceComponentProps> = ({ resource, resourceAmount, setResourceAmount }) => {


    const [clickValue, setClickValue] = useState(1)
    const [clickUpgradePrice, setClickUpgradePrice] = useState(10)
    const [tickAmountUpgradePrice, setTickAmountUpgradePrice] = useState(10)
    const [tickSpeedUpgradePrice, setTickSpeedUpgradePrice] = useState(10)


    const handleResourceClick = () => {
        resource.add(clickValue)
        setResourceAmount(resource.amount)
    }

    const handleClickUpgrade = () => {
        if (resourceAmount >= clickUpgradePrice) {
            resource.sub(clickUpgradePrice)
            setClickUpgradePrice(clickUpgradePrice * 2)
            setClickValue(clickValue + 2)
            setResourceAmount(resource.amount)
        }
    }

    const handleTickAmountUpgrade = () => {
        if (resourceAmount >= tickAmountUpgradePrice) {
            resource.sub(tickAmountUpgradePrice)
            setTickAmountUpgradePrice(tickAmountUpgradePrice * 2)
            resource.upgradeTickAmount()
            setResourceAmount(resource.amount)
        }
    }

    const handleTickSpeedUpgrade = () => {
        if (resourceAmount >= tickSpeedUpgradePrice) {
            resource.sub(tickSpeedUpgradePrice)
            setTickSpeedUpgradePrice(tickSpeedUpgradePrice * 2)
            resource.upgradeTickSpeed()
            setResourceAmount(resource.amount)
        }
    }



    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button onClick={handleResourceClick}>Add {resource.name}</button>

                <div style={{ border: '2px solid black' }}>
                    <div>Upgrade click {clickValue} {`=>`} {clickValue + 2}</div>
                    <button onClick={handleClickUpgrade}>Upgrade {clickUpgradePrice}</button>
                </div>
                <div style={{ border: '2px solid black' }}>
                    <div>Upgrade Tick Amount {resource.tickAmount} {'=>'} {resource.tickAmount + 2}</div>
                    <button onClick={handleTickAmountUpgrade}>Upgrade {tickAmountUpgradePrice}</button>
                </div>
                <div style={{ border: '2px solid black' }}>
                    <div>Upgrade Tick Speed {resource.tickSpeed} {'=>'} {resource.tickSpeed - Math.ceil(resource.tickSpeed / 4)}</div>
                    <button onClick={handleTickSpeedUpgrade}>Upgrade {tickSpeedUpgradePrice}</button>
                </div>
            </div>
        </>
    )
}

export default ResourceComponent