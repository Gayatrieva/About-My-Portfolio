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

function makeButterfly(id: number): ButterflyState {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  return {
    id,
    x: randomBetween(5, 90),
    y: randomBetween(10, 80),
    color: color.hex,
    flapDur: `${randomBetween(0.25, 0.5).toFixed(2)}s`,
    floatDur: `${randomBetween(2.5, 4.5).toFixed(1)}s`,
    vx: randomBetween(-0.6, 0.6),
    vy: randomBetween(-0.4, 0.4),
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
