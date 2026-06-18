import { useEffect, useRef } from 'react'

interface NetCursorProps {
  active: boolean   // true when hovering a butterfly
}

/**
 * Renders a butterfly-net SVG that follows the real mouse cursor.
 * When `active` is true the net swoops in; when false it hides.
 * The real system cursor is hidden via CSS on .butterfly-wrapper.
 */
export default function NetCursor({ active }: NetCursorProps) {
  const netRef = useRef<HTMLDivElement>(null)
  const pos    = useRef({ x: -200, y: -200 })
  const raf    = useRef<number>(0)

  /* ── Track raw mouse position ── */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  /* ── rAF loop: move net element to mouse ── */
  useEffect(() => {
    const tick = () => {
      if (netRef.current) {
        netRef.current.style.left = `${pos.current.x}px`
        netRef.current.style.top  = `${pos.current.y}px`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  return (
    <div
      ref={netRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        pointerEvents: 'none',
        zIndex:        9999,
        /* offset so net-head is right at cursor tip */
        transform:     'translate(-18px, -18px)',
        opacity:       active ? 1 : 0,
        /* swooping scale + rotate when entering/leaving */
        scale:         active ? '1' : '0.4',
        rotate:        active ? '-20deg' : '20deg',
        transition:    'opacity 0.18s ease, scale 0.22s cubic-bezier(0.34,1.56,0.64,1), rotate 0.22s ease',
        filter:        'drop-shadow(0 0 6px rgba(192,132,252,0.7)) drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
      }}
    >
      <NetSVG />
    </div>
  )
}

/* ── Butterfly-net SVG ──
   Handle going bottom-right, circular net head top-left.
   Matches the reference photo: oval hoop + diagonal grid + long stick.
*/
function NetSVG() {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Handle / stick ── */}
      <line
        x1="44" y1="46"
        x2="88" y2="88"
        stroke="url(#stick-grad)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* ── Hoop (oval ring) ── */}
      <ellipse
        cx="28" cy="28"
        rx="26" ry="24"
        stroke="url(#hoop-grad)"
        strokeWidth="3"
        fill="none"
      />

      {/* ── Net mesh — horizontal lines ── */}
      {[14, 20, 26, 32, 38, 44].map((y, i) => {
        // clip each line to the ellipse boundary
        const hw = 26 * Math.sqrt(Math.max(0, 1 - ((y - 28) / 24) ** 2))
        return (
          <line
            key={`h${i}`}
            x1={28 - hw} y1={y}
            x2={28 + hw} y2={y}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1"
          />
        )
      })}

      {/* ── Net mesh — vertical lines ── */}
      {[6, 13, 20, 27, 34, 41, 48].map((x, i) => {
        const vh = 24 * Math.sqrt(Math.max(0, 1 - ((x - 28) / 26) ** 2))
        return (
          <line
            key={`v${i}`}
            x1={x} y1={28 - vh}
            x2={x} y2={28 + vh}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1"
          />
        )
      })}

      {/* ── Diagonal mesh lines (top-left to bottom-right) ── */}
      {[-24, -12, 0, 12, 24].map((offset, i) => (
        <line
          key={`d1${i}`}
          x1={Math.max(2, 28 - 26 + offset)} y1={28 - 24}
          x2={Math.min(54, 28 + 26 + offset)} y2={28 + 24}
          stroke="rgba(200,160,255,0.3)"
          strokeWidth="0.8"
        />
      ))}

      {/* ── Sheen highlight ── */}
      <ellipse
        cx="20" cy="18"
        rx="8" ry="6"
        fill="rgba(255,255,255,0.12)"
        transform="rotate(-20 20 18)"
      />

      <defs>
        <linearGradient id="stick-grad" x1="44" y1="46" x2="88" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#d8b4fe" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="hoop-grad" x1="2" y1="4" x2="54" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="60%"  stopColor="#c084fc" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.7"  />
        </linearGradient>
      </defs>
    </svg>
  )
}
