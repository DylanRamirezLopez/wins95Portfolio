import { useEffect, useState } from 'react'

export default function BootGlitchTransition({ onComplete }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 80)
    const t2 = setTimeout(() => setPhase(2), 200)
    const t3 = setTimeout(() => setPhase(3), 350)
    const t4 = setTimeout(() => setPhase(4), 500)
    const t5 = setTimeout(() => setPhase(5), 650)
    const t6 = setTimeout(() => {
      setPhase(6)
      onComplete()
    }, 800)
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6)
    }
  }, [onComplete])

  return (
    <div className={`boot-glitch phase-${phase}`}>
      <div className="glitch-overlay" />
      <div className="glitch-scanlines" />
    </div>
  )
}
