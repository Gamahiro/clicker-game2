import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Resource from './classes/Resource'
import ResourceComponent from './components/resourceComponent'
import GameObject from './classes/GameObject'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const goldResourceRef = useRef(new Resource('gold'))
  const goldResource = goldResourceRef.current
  const [gold, setGold] = useState(goldResource.amount)

  const woodResourceRef = useRef(new Resource('wood'))
  const woodResource = woodResourceRef.current
  const [wood, setWood] = useState(woodResource.amount)

  const stoneResourceRef = useRef(new Resource('stone'))
  const stoneResource = stoneResourceRef.current
  const [stone, setStone] = useState(stoneResource.amount)


  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    const goldObject = new GameObject({ x: 0, y: 0 }, { x: 50, y: 50 }, 'yellow')
    const woodObject = new GameObject({ x: 60, y: 0 }, { x: 50, y: 50 }, 'brown')
    const stoneObject = new GameObject({ x: 120, y: 0 }, { x: 50, y: 50 }, 'gray')

    if (ctx) {
      goldObject.draw(ctx)
      woodObject.draw(ctx)
      stoneObject.draw(ctx)
    }

    let frame = 0;
    let goldDistanceToMovePerFrame = 0
    let woodDistanceToMovePerFrame = 0
    let stoneDistanceToMovePerFrame = 0

    const gameLoop = () => {
      if (!ctx) return

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        goldObject.draw(ctx)
        woodObject.draw(ctx)
        stoneObject.draw(ctx)
      


      if (frame % goldResource.tickSpeed === 0) {
        goldResource.tick()
        setGold(goldResource.amount)
        goldDistanceToMovePerFrame = (ctx.canvas.height * 2 - goldObject.size.y) / goldResource.tickSpeed;
      }

      goldObject.autoMove(ctx, goldDistanceToMovePerFrame)


      if (frame % woodResource.tickSpeed === 0) {
        woodResource.tick()
        setWood(woodResource.amount)
        woodDistanceToMovePerFrame = (ctx.canvas.height * 2 - woodObject.size.y) / woodResource.tickSpeed;       
      }

      woodObject.autoMove(ctx, woodDistanceToMovePerFrame)

      if (frame % stoneResource.tickSpeed === 0) {
        stoneResource.tick()
        setStone(stoneResource.amount)
        stoneDistanceToMovePerFrame = (ctx.canvas.height * 2 - stoneObject.size.y) / stoneResource.tickSpeed;       
      }

      stoneObject.autoMove(ctx, stoneDistanceToMovePerFrame)


      frame++
      requestAnimationFrame(gameLoop)
    }
    gameLoop()
  }, [])




  return (
    <>
      <canvas style={{ border: '2px solid black' }} ref={canvasRef} />
      <div>Gold: {gold} Wood: {wood} Stone: {stone}</div>
      <div style={{display: 'flex'}}>
      <ResourceComponent resource={goldResource} resourceAmount={gold} setResourceAmount={setGold} />
      <ResourceComponent resource={woodResource} resourceAmount={wood} setResourceAmount={setWood} />
      <ResourceComponent resource={stoneResource} resourceAmount={stone} setResourceAmount={setStone} />
      </div>
    </>
  )
}

export default App
