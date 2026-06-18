import { useState, useEffect } from 'react'

interface NavbarProps {
  catchCount: number
}

export default function Navbar({ catchCount }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Work',     href: '#projects' },
    { label: 'Skills',   href: '#skills'   },
    { label: 'About',    href: '#about'    },
    { label: 'Contact',  href: '#contact'  },
  ]

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="nav-logo" aria-label="Gayatri Kashyap logo">
          <span>GK</span>
          <span className="dot">·</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>dev</span>
        </div>

        <ul className="nav-links" role="list">
          {links.map(l => (
            <li key={l.label}>
              <a className="nav-link" href={l.href} id={`nav-${l.label.toLowerCase()}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {catchCount > 0 && (
            <span
              style={{
                fontSize: '0.78rem',
                color: 'var(--purple-400)',
                fontFamily: 'var(--font-mono)',
                opacity: 0.85,
              }}
            >
              🦋 {catchCount}
            </span>
          )}
          <a className="nav-cta" href="#contact" id="nav-cta-hire" role="button">
            Hire me
          </a>
        </div>
      </div>
    </nav>
  )
}
