export default function ContactSection() {
  const contactItems = [
    {
      id: 'contact-email',
      label: '✉ kashyapgayatri151@gmail.com',
      href: 'mailto:kashyapgayatri151@gmail.com',
      primary: true,
    },
    {
      id: 'contact-linkedin',
      label: '💼 LinkedIn',
      href: 'https://www.linkedin.com/in/gayatri02b/',
    },
    {
      id: 'contact-github',
      label: '🐙 GitHub',
      href: 'https://github.com/Gayatrieva',
    },
  ]

  return (
    <section id="contact" aria-label="Contact section">
      <div className="container">
        <div className="contact-card glass reveal" id="contact-card">
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>Contact</p>
          <h2>
            Let's build something{' '}
            <span className="gradient-text">stellar</span>
          </h2>
          <p>
            I'm actively looking for opportunities to work on exciting products.
            Whether you have a role, a project, or just want to say hi — my inbox
            is always open. 🚀
          </p>

          <div className="contact-links">
            {contactItems.map(item => (
              <a
                key={item.id}
                id={item.id}
                href={item.href}
                className={`contact-link${item.primary ? ' primary' : ''}`}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={item.label}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
