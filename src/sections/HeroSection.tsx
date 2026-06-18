import { useMemo, useRef, useEffect } from 'react'
import type { ButterflyState } from '../hooks/useButterflyGame'

interface HeroProps {
  catchCount: number
  butterflies: ButterflyState[]
  particles: { id: number; x: number; y: number; color: string }[]
  onCatch: (id: number, x: number, y: number, color: string) => void
}

/* ---------- Star field ---------- */
function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 0.4,
        dur: (Math.random() * 4 + 2).toFixed(1),
        delay: (Math.random() * 5).toFixed(1),
      })),
    []
  )

  return (
    <div className="hero-canvas" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Nebula blobs */}
      <div className="nebula" style={{ width: 600, height: 400, left: '-10%', top: '10%', background: 'radial-gradient(ellipse, #7c3aed, transparent 70%)', '--ndur': '22s', '--ndelay': '0s' } as React.CSSProperties} />
      <div className="nebula" style={{ width: 500, height: 350, right: '-5%', top: '30%', background: 'radial-gradient(ellipse, #2563eb, transparent 70%)', '--ndur': '18s', '--ndelay': '3s' } as React.CSSProperties} />
      <div className="nebula" style={{ width: 400, height: 300, left: '30%', bottom: '5%', background: 'radial-gradient(ellipse, #db2777, transparent 70%)', '--ndur': '25s', '--ndelay': '6s' } as React.CSSProperties} />
      <div className="nebula" style={{ width: 350, height: 250, left: '55%', top: '5%', background: 'radial-gradient(ellipse, #0d9488, transparent 70%)', '--ndur': '20s', '--ndelay': '9s' } as React.CSSProperties} />
    </div>
  )
}

export default function Hero({ catchCount }: HeroProps) {
  const countRef = useRef<HTMLSpanElement>(null)
  const prevCount = useRef(catchCount)

  useEffect(() => {
    if (catchCount !== prevCount.current && countRef.current) {
      countRef.current.classList.remove('pop')
      void countRef.current.offsetWidth // reflow
      countRef.current.classList.add('pop')
      prevCount.current = catchCount
    }
  }, [catchCount])

  return (
    <section className="hero" id="hero" aria-label="Hero section">
      <StarField />

      <div className="container hero-content">
        <div className="hero-badge">
          <span className="pulse" aria-hidden="true" />
          Open to opportunities
        </div>

        <h1 className="hero-name">
          <span className="gradient-text">Gayatri Kashyap</span>
        </h1>

        <p className="hero-tagline">
          Frontend Developer · React Enthusiast
        </p>

        <p className="hero-email">
          ✉ <a href="mailto:kashyapgayatri151@gmail.com">kashyapgayatri151@gmail.com</a>
        </p>

        <div className="hero-ctas">
          <a className="btn-primary" href="#projects" id="hero-view-work">
            View my work ↓
          </a>
          <a className="btn-ghost" href="#contact" id="hero-contact">
            Let's connect
          </a>
        </div>

        <div className="butterfly-counter" aria-live="polite" aria-label="Butterfly catch counter">
          <span aria-hidden="true">🦋</span>
          <span>
            Butterflies caught:{' '}
            <span ref={countRef} className="count">
              {catchCount}
            </span>
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            — click them!
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint" aria-hidden="true">
        <div className="mouse">
          <div className="wheel" />
        </div>
        <span>scroll</span>
      </div>
    </section>
  )
}
