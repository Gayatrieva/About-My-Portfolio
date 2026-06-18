import { skillCategories } from '../data/portfolio'

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-bg" aria-label="Skills section">
      <div className="container">
        <header className="section-header reveal">
          <p className="section-label">Skills</p>
          <h2>
            My{' '}
            <span className="gradient-text">toolkit</span>
          </h2>
        </header>

        <div className="skills-grid">
          {skillCategories.map(cat => (
            <div
              key={cat.id}
              id={`skills-${cat.id}`}
              className="skill-category glass reveal"
              aria-label={`${cat.title} skills`}
            >
              <div className="skill-cat-icon" aria-hidden="true">
                {cat.icon}
              </div>
              <div className="skill-cat-title">{cat.title}</div>
              <div className="skill-pills" role="list">
                {cat.skills.map(skill => (
                  <span
                    key={skill}
                    role="listitem"
                    className="skill-pill"
                    style={{
                      borderColor: `rgba(var(--${cat.accentVar.replace('--', '').replace('-400', '')}-rgb, 168,85,247), 0.15)`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
