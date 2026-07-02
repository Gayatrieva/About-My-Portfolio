import { useState, useEffect } from 'react'

interface NavbarProps {
  catchCount: number
}

export default function Navbar({ catchCount }: NavbarProps) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { label: 'Work',    href: '#projects' },
    { label: 'Skills',  href: '#skills'   },
    { label: 'About',   href: '#about'    },
    { label: 'Resume',  href: '#resume'   },
    { label: 'Contact', href: '#contact'  },
  ]

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-logo" aria-label="Gayatri Kashyap logo">
            <span>GK</span>
            <span className="dot">·</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>dev</span>
          </div>

          {/* Desktop links */}
          <ul className="nav-links" role="list">
            {links.map(l => (
              <li key={l.label}>
                <a className="nav-link" href={l.href} id={`nav-${l.label.toLowerCase()}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: catch count + hire me + hamburger */}
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

            {/* Hamburger — mobile only */}
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              id="nav-hamburger"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`mobile-menu-overlay${menuOpen ? ' visible' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
        <ul className="mobile-menu-links" role="list">
          {links.map((l, i) => (
            <li key={l.label} style={{ '--i': i } as React.CSSProperties}>
              <a
                href={l.href}
                className="mobile-menu-link"
                id={`mobile-nav-${l.label.toLowerCase()}`}
                onClick={close}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a className="btn-primary mobile-menu-cta" href="#contact" onClick={close}>
          Hire me ✨
        </a>
      </div>
    </>
  )
}
