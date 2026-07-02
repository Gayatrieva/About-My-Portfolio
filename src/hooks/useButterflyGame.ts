import { useState, useCallback, useRef } from 'react'

export interface ButterflyState {
  id: number
  x: number
  y: number
  color: string
  flapDur: string
  floatDur: string
  vx: number
  vy: number
  caught: boolean
}

const COLORS = [
  { name: 'purple', hex: '#c084fc' },
  { name: 'blue',   hex: '#60a5fa' },
  { name: 'pink',   hex: '#f472b6' },
  { name: 'teal',   hex: '#2dd4bf' },
  { name: 'amber',  hex: '#fbbf24' },
]

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

function spawnEdgePosition(): { x: number; y: number } {
  // 4 edge zones: left, right, top, bottom — keeps butterflies off the center content
  const zone = Math.floor(Math.random() * 4)
  switch (zone) {
    case 0: return { x: randomBetween(2,  16), y: randomBetween(8,  90) }  // left strip
    case 1: return { x: randomBetween(84, 97), y: randomBetween(8,  90) }  // right strip
    case 2: return { x: randomBetween(5,  95), y: randomBetween(5,  14) }  // top strip
    default:return { x: randomBetween(5,  95), y: randomBetween(82, 94) }  // bottom strip
  }
}

function makeButterfly(id: number): ButterflyState {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  const { x, y } = spawnEdgePosition()
  return {
    id,
    x,
    y,
    color: color.hex,
    flapDur: `${randomBetween(0.25, 0.5).toFixed(2)}s`,
    floatDur: `${randomBetween(2.5, 4.5).toFixed(1)}s`,
    vx: randomBetween(-0.7, 0.7),
    vy: randomBetween(-0.5, 0.5),
    caught: false,
  }
}

export function useButterflyGame(count = 8) {
  const [butterflies, setButterflies] = useState<ButterflyState[]>(() =>
    Array.from({ length: count }, (_, i) => makeButterfly(i))
  )
  const [catchCount, setCatchCount] = useState(0)
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([])
  const particleId = useRef(0)

  const catchButterfly = useCallback((id: number, x: number, y: number, color: string) => {
    setButterflies(prev => prev.map(b => (b.id === id ? { ...b, caught: true } : b)))
    setCatchCount(c => c + 1)

    // Spawn burst particles
    const newParticles = Array.from({ length: 10 }, () => ({
      id: particleId.current++,
      x,
      y,
      color,
    }))
    setParticles(p => [...p, ...newParticles])

    // Respawn butterfly after short delay
    setTimeout(() => {
      setButterflies(prev =>
        prev.map(b => (b.id === id ? makeButterfly(id) : b))
      )
    }, 1200)

    // Remove particles
    setTimeout(() => {
      setParticles(p => p.filter(pt => !newParticles.find(np => np.id === pt.id)))
    }, 800)
  }, [])

  return { butterflies, catchCount, particles, catchButterfly }
}
