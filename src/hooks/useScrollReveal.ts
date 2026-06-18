import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const refs = useRef<Element[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach(el => {
      observer.observe(el)
      refs.current.push(el)
    })

    return () => observer.disconnect()
  }, [])
}
