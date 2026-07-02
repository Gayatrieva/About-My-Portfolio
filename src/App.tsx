import { useState } from 'react'
import Navbar from './components/Navbar'
import ButterflyLayer from './components/Butterfly'
import NetCursor from './components/NetCursor'
import HeroSection from './sections/HeroSection'
import ProjectsSection from './sections/ProjectsSection'
import SkillsSection from './sections/SkillsSection'
import AboutSection from './sections/AboutSection'
import ResumeSection from './sections/ResumeSection'
import ContactSection from './sections/ContactSection'
import { useButterflyGame } from './hooks/useButterflyGame'
import { useScrollReveal } from './hooks/useScrollReveal'

// Use fewer butterflies on mobile to avoid clutter over content
const isMobile = window.matchMedia('(max-width: 480px)').matches
const isTouchDevice = window.matchMedia('(hover: none)').matches

export default function App() {
  const { butterflies, catchCount, particles, catchButterfly } = useButterflyGame(isMobile ? 4 : 8)
  const [hoveringButterfly, setHoveringButterfly] = useState(false)

  useScrollReveal()

  return (
    <>
      {/* 🦋 Net cursor — only on devices that support hover (not phones) */}
      {!isTouchDevice && <NetCursor active={hoveringButterfly} />}

      {/* Fixed butterfly layer across entire page */}
      <ButterflyLayer
        butterflies={butterflies}
        particles={particles}
        onCatch={catchButterfly}
        onHoverChange={setHoveringButterfly}
      />

      <Navbar catchCount={catchCount} />

      <main id="main-content">
        <HeroSection
          catchCount={catchCount}
          butterflies={butterflies}
          particles={particles}
          onCatch={catchButterfly}
        />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <footer>
        <div className="container">
          <p>
            Crafted with <span>♥</span> by <span>Gayatri Kashyap</span> · {new Date().getFullYear()}
            {' '}· Built with React + TypeScript + Vite
          </p>
        </div>
      </footer>
    </>
  )
}
