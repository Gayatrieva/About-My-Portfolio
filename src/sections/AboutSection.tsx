export default function AboutSection() {
  const orbitalDots = [
    { color: '#c084fc', dur: '5s', size: 10, r: 70, delay: '0s' },
    { color: '#60a5fa', dur: '8s', size: 8, r: 100, delay: '1s' },
    { color: '#f472b6', dur: '11s', size: 7, r: 130, delay: '2s' },
    { color: '#2dd4bf', dur: '6s', size: 9, r: 85, delay: '0.5s' },
  ]

  return (
    <section id="about" aria-label="About section">
      <div className="container">
        <div className="about-layout">
          {/* Text side */}
          <div className="about-text reveal">
            <p className="section-label" style={{ marginBottom: '0.5rem' }}>About me</p>
            <h2>
              Crafting digital{' '}
              <span className="gradient-text">experiences</span>{' '}
              from the cosmos of code
            </h2>
            <p>
              I'm Gayatri Kashyap, a Frontend Developer with an MCA degree and a passion for creating modern, responsive, and user-friendly web applications. I enjoy turning ideas into engaging digital experiences through clean design and efficient code.
            </p>
            <p>
              With hands-on experience in React.js, Next.js, JavaScript, TypeScript, HTML, CSS, and Tailwind CSS, I build fast, scalable, and visually appealing web interfaces. I focus on delivering seamless user experiences, responsive designs, and high-performance applications.
            </p>
            <p>
              I am always eager to learn new technologies, improve my development skills, and create impactful products that solve real-world problems. When I'm not coding, you'll find me exploring emerging web technologies, working on personal projects, and continuously expanding my knowledge.
            </p>

            <div className="about-stats">
              {[
                { number: '2+', label: 'Projects shipped' },
                { number: '8+', label: 'Technologies' },
                { number: '∞', label: 'Curiosity' },
              ].map(s => (
                <div
                  key={s.label}
                  className="stat glass reveal"
                  id={`stat-${s.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <div className="stat-number gradient-text">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orbital visual */}
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="orbital"
              aria-hidden="true"
              style={{ width: 300, height: 300 }}
            >
              {/* Rings */}
              {orbitalDots.map((d, i) => (
                <div
                  key={`ring-${i}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: d.r * 2,
                    height: d.r * 2,
                    marginTop: -d.r,
                    marginLeft: -d.r,
                    borderRadius: '50%',
                    border: '1px solid rgba(168,85,247,0.18)',
                  }}
                />
              ))}

              {/* Orbiting dots */}
              {orbitalDots.map((d, i) => (
                <div
                  key={`dot-${i}`}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: d.size,
                    height: d.size,
                    marginTop: -d.size / 2,
                    marginLeft: -d.size / 2,
                    borderRadius: '50%',
                    background: d.color,
                    boxShadow: `0 0 10px ${d.color}`,
                    animation: `orbitDot${i} ${d.dur} linear ${d.delay} infinite`,
                  }}
                />
              ))}

              {/* Center */}
              <div className="orbital-center">💻</div>
            </div>

            {/* Inline keyframes for each orbit radius */}
            <style>{`
              ${orbitalDots.map((d, i) => `
                @keyframes orbitDot${i} {
                  from { transform: rotate(0deg) translateX(${d.r}px) rotate(0deg); }
                  to   { transform: rotate(360deg) translateX(${d.r}px) rotate(-360deg); }
                }
              `).join('')}
            `}</style>
          </div>
        </div>
      </div>
    </section>
  )
}
