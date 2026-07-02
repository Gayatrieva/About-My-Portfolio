import { useState, useEffect, useRef } from 'react'
import resumePdf from '../assets/Gayatri__Kashyap_Resume_.pdf'

const RESUME_URL = resumePdf
const RESUME_FILENAME = 'Gayatri_Kashyap_Resume.pdf'

export default function ResumeSection() {
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef<NodeJS.Timeout | null>(null)

  const handleDownload = () => {
    if (downloading || downloaded) return
    setDownloading(true)
    setProgress(0)

    let p = 0
    progressRef.current = setInterval(() => {
      p += Math.random() * 18 + 8
      if (p >= 100) {
        p = 100
        clearInterval(progressRef.current!)
        setProgress(100)
        setTimeout(() => {
          setDownloading(false)
          setDownloaded(true)
          // Trigger actual download
          const link = document.createElement('a')
          link.href = RESUME_URL
          link.download = RESUME_FILENAME
          link.click()
          // Reset after 3s
          setTimeout(() => setDownloaded(false), 3000)
        }, 400)
      } else {
        setProgress(p)
      }
    }, 120)
  }

  useEffect(() => () => { if (progressRef.current) clearInterval(progressRef.current) }, [])

  return (
    <section id="resume" className="resume-section" aria-label="Resume download">
      <div className="container">
        {/* Section header */}
        <div className="section-header reveal">
          <p className="section-label">Resume</p>
          <h2>Download My Résumé</h2>
          <p className="resume-section-sub">
            A concise, one-page snapshot of my experience, skills, and projects — ready in seconds.
          </p>
        </div>

        <div className="resume-main reveal">
          {/* ── Left: animated document preview ── */}
          <div className="resume-preview-col" aria-hidden="true">
            <div className="resume-doc-wrap">
              {/* Floating accent orbs */}
              <div className="rdoc-orb rdoc-orb-1" />
              <div className="rdoc-orb rdoc-orb-2" />

              <div className="resume-doc">
                {/* Header row */}
                <div className="resume-doc-header">
                  <div className="resume-doc-avatar" />
                  <div className="resume-doc-lines">
                    <div className="rdl rdl-name" />
                    <div className="rdl rdl-sub" />
                    <div className="rdl rdl-sub" style={{ width: '40%', marginTop: 2 }} />
                  </div>
                </div>

                {/* Divider */}
                <div className="rdoc-divider" />

                {/* Section: Experience */}
                <div className="resume-doc-section">
                  <div className="rdl rdl-tag" />
                  <div className="rdl rdl-body" />
                  <div className="rdl rdl-body rdl-mid" />
                  <div className="rdl rdl-body rdl-short" />
                </div>

                {/* Section: Projects */}
                <div className="resume-doc-section">
                  <div className="rdl rdl-tag" />
                  <div className="rdl rdl-body" />
                  <div className="rdl rdl-body rdl-mid" />
                  <div className="rdl rdl-body rdl-short" />
                </div>

                {/* Section: Skills pills */}
                <div className="resume-doc-section">
                  <div className="rdl rdl-tag" />
                  <div className="resume-doc-pills">
                    {['React', 'Node', 'TypeScript', 'SQL', 'Docker'].map(t => (
                      <span key={t} className="resume-doc-pill">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Scan line effect */}
                <div className="rdoc-scan" />
              </div>

              {/* Floating badge */}
              <div className="rdoc-badge">
                <span className="rdoc-badge-dot" />
                PDF · 1 Page
              </div>
            </div>
          </div>

          {/* ── Right: info + download CTA ── */}
          <div className="resume-info-col">
            <h3 className="resume-info-title">Gayatri Kashyap</h3>
            <p className="resume-info-role gradient-text">Full-Stack Developer · MCA Student</p>

            <p className="resume-info-desc">
              My résumé covers full-stack projects, technical skills, academic background,
              and hands-on experience — all in a clean, ATS-friendly one-pager.
            </p>

            {/* ── Download button ── */}
            <div className="resume-cta-wrap">
              <button
                className={`resume-dl-btn${downloading ? ' loading' : ''}${downloaded ? ' done' : ''}`}
                onClick={handleDownload}
                disabled={downloading}
                id="resume-download-btn"
                aria-label="Download resume PDF"
              >
                {/* Progress bar fill */}
                {downloading && (
                  <span
                    className="rdl-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <span className="rdl-btn-content">
                  {downloaded ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Downloaded!
                    </>
                  ) : downloading ? (
                    <>
                      <span className="rdl-spinner" />
                      Preparing… {Math.round(progress)}%
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download PDF
                    </>
                  )}
                </span>
              </button>


            </div>

            {/* Meta note */}
            <p className="resume-meta">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              PDF format · Updated June 2025 · ATS-friendly layout
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
