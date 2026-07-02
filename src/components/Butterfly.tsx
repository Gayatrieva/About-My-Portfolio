import { useEffect, useRef, useState } from 'react'
import type { ButterflyState } from '../hooks/useButterflyGame'

interface ButterflyLayerProps {
  butterflies: ButterflyState[]
  particles: { id: number; x: number; y: number; color: string }[]
  onCatch: (id: number, x: number, y: number, color: string) => void
  onHoverChange: (hovering: boolean) => void
}

/* ─── Butterfly SVG ─── */
function ButterflyShape({ color, id }: { color: string; id: number }) {
  const leftId  = `wl-${id}`
  const rightId = `wr-${id}`
  const dur     = `${0.28 + (id % 3) * 0.06}s`

  return (
    <>
      {/* Per-butterfly keyframes injected inline so each can have its own speed */}
      <style>{`
        @keyframes flapL${id} {
          0%,100% { transform: perspective(120px) rotateY(0deg);   }
          50%      { transform: perspective(120px) rotateY(70deg);  }
        }
        @keyframes flapR${id} {
          0%,100% { transform: perspective(120px) rotateY(0deg);   }
          50%      { transform: perspective(120px) rotateY(-70deg); }
        }
      `}</style>

      <svg
        viewBox="0 0 100 80"
        width="56"
        height="56"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* ── Left wings ── */}
        <g
          id={leftId}
          style={{
            transformOrigin: '50px 40px',
            animation: `flapL${id} ${dur} ease-in-out infinite alternate`,
          }}
        >
          {/* upper-left */}
          <path
            d="M48 38 C32 10, 5 8, 8 30 C10 46, 32 48, 48 40 Z"
            fill={color}
            opacity="0.92"
          />
          {/* lower-left */}
          <path
            d="M48 42 C30 50, 10 60, 14 72 C18 80, 38 72, 48 56 Z"
            fill={color}
            opacity="0.7"
          />
          {/* shine */}
          <path
            d="M30 20 C22 14, 12 16, 12 24 C12 30, 22 32, 30 26 Z"
            fill="white"
            opacity="0.18"
          />
        </g>

        {/* ── Right wings ── */}
        <g
          id={rightId}
          style={{
            transformOrigin: '50px 40px',
            animation: `flapR${id} ${dur} ease-in-out infinite alternate`,
          }}
        >
          {/* upper-right */}
          <path
            d="M52 38 C68 10, 95 8, 92 30 C90 46, 68 48, 52 40 Z"
            fill={color}
            opacity="0.92"
          />
          {/* lower-right */}
          <path
            d="M52 42 C70 50, 90 60, 86 72 C82 80, 62 72, 52 56 Z"
            fill={color}
            opacity="0.7"
          />
          {/* shine */}
          <path
            d="M70 20 C78 14, 88 16, 88 24 C88 30, 78 32, 70 26 Z"
            fill="white"
            opacity="0.18"
          />
        </g>

        {/* ── Body ── */}
        <ellipse cx="50" cy="44" rx="3.5" ry="16" fill={color} opacity="0.95" />
        {/* Head */}
        <circle cx="50" cy="26" r="5" fill={color} />
        {/* Antennae */}
        <line x1="50" y1="22" x2="41" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="50" y1="22" x2="59" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="41" cy="12" r="2.5" fill={color} />
        <circle cx="59" cy="12" r="2.5" fill={color} />
      </svg>
    </>
  )
}

/* ─── Single butterfly that flies around ─── */
function ButterflyItem({
  butterfly,
  onCatch,
  onHoverChange,
}: {
  butterfly: ButterflyState
  onCatch: (id: number, x: number, y: number, color: string) => void
  onHoverChange: (h: boolean) => void
}) {
  const [pos, setPos] = useState({ x: butterfly.x, y: butterfly.y })
  const posRef  = useRef(pos)
  const velRef  = useRef({ vx: butterfly.vx, vy: butterfly.vy })
  const frameRef = useRef<number>(0)

  useEffect(() => {
    posRef.current = { x: butterfly.x, y: butterfly.y }
    velRef.current = { vx: butterfly.vx, vy: butterfly.vy }
  }, [butterfly.x, butterfly.y, butterfly.vx, butterfly.vy])

  useEffect(() => {
    if (butterfly.caught) { cancelAnimationFrame(frameRef.current); return }

    let last = performance.now()

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      let { x, y } = posRef.current
      let { vx, vy } = velRef.current

      // Gentle random direction shifts
      if (Math.random() < 0.006) vx += (Math.random() - 0.5) * 0.8
      if (Math.random() < 0.006) vy += (Math.random() - 0.5) * 0.5

      // ── Content-zone repulsion ──
      // Soft push when butterfly drifts into the center content area
      const cx = 50, cy = 50         // center of viewport
      const halfW = 32, halfH = 30   // half-size of the "keep out" zone
      const inX = Math.abs(x - cx) < halfW
      const inY = Math.abs(y - cy) < halfH
      if (inX && inY) {
        // Push away from center proportional to how deep inside the zone
        const pushX = (x - cx) / halfW
        const pushY = (y - cy) / halfH
        vx += pushX * 0.04
        vy += pushY * 0.04
      }

      // Speed cap
      const speed = Math.sqrt(vx * vx + vy * vy)
      if (speed > 1.3) { vx = (vx / speed) * 1.3; vy = (vy / speed) * 1.3 }

      x += vx * dt * 22
      y += vy * dt * 22

      if (x < 2  || x > 97) { vx = -vx; x = Math.max(2, Math.min(97, x)) }
      if (y < 4  || y > 93) { vy = -vy; y = Math.max(4, Math.min(93, y)) }

      posRef.current = { x, y }
      velRef.current = { vx, vy }
      setPos({ x, y })
      frameRef.current = requestAnimationFrame(step)
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [butterfly.caught])

  if (butterfly.caught) return null

  const floatOffset = Math.sin(Date.now() / 800 + butterfly.id) * 6

  return (
    <div
      className="butterfly-wrapper"
      id={`butterfly-${butterfly.id}`}
      role="button"
      aria-label="Click to catch butterfly"
      tabIndex={0}
      title="Catch me! 🦋"
      style={{
        left:      `${pos.x}vw`,
        top:       `${pos.y}vh`,
        transform: `translate(-50%, calc(-50% + ${floatOffset}px))`,
        filter:    `drop-shadow(0 0 10px ${butterfly.color}) drop-shadow(0 0 20px ${butterfly.color}66)`,
        cursor:    'none',
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={e => {
        onHoverChange(false)
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        onCatch(butterfly.id, rect.left + rect.width / 2, rect.top + rect.height / 2, butterfly.color)
      }}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onHoverChange(false)
          onCatch(butterfly.id, window.innerWidth / 2, window.innerHeight / 2, butterfly.color)
        }
      }}
    >
      <ButterflyShape color={butterfly.color} id={butterfly.id} />
    </div>
  )
}

/* ─── Particle burst on catch ─── */
function ParticleBurst({
  particle,
}: {
  particle: { id: number; x: number; y: number; color: string }
}) {
  const pieces = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360
    const dist  = 35 + (i % 3) * 20
    return {
      dx: Math.cos((angle * Math.PI) / 180) * dist,
      dy: Math.sin((angle * Math.PI) / 180) * dist,
      size: 4 + (i % 3) * 3,
    }
  })

  return (
    <>
      {pieces.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left:      particle.x - p.size / 2,
            top:       particle.y - p.size / 2,
            width:     p.size,
            height:    p.size,
            background: particle.color,
            boxShadow:  `0 0 8px ${particle.color}, 0 0 16px ${particle.color}88`,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
          } as React.CSSProperties}
        />
      ))}
    </>
  )
}

export default function ButterflyLayer({ butterflies, particles, onCatch, onHoverChange }: ButterflyLayerProps) {
  return (
    <>
      {butterflies.map(b => (
        <ButterflyItem key={b.id} butterfly={b} onCatch={onCatch} onHoverChange={onHoverChange} />
      ))}
      {particles.map(p => (
        <ParticleBurst key={p.id} particle={p} />
      ))}
    </>
  )
}
