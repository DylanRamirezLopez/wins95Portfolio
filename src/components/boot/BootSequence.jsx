import { useState, useCallback, useEffect } from 'react'
import BiosPostScreen from './BiosPostScreen'
import OsLoadingScreen from './OsLoadingScreen'
import BootGlitchTransition from './BootGlitchTransition'

export default function BootSequence({ onComplete }) {
  const [phase, setPhase] = useState('bios')

  const skip = useCallback(() => {
    setPhase('done')
    onComplete()
  }, [onComplete])

  const handleBiosDone = useCallback(() => setPhase('loading'), [])
  const handleLoadingDone = useCallback(() => setPhase('glitch'), [])
  const handleGlitchDone = useCallback(() => {
    setPhase('done')
    onComplete()
  }, [onComplete])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'x' || e.key === 'X') skip()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [skip])

  return (
    <div className="boot-container">
      {phase === 'bios' && <BiosPostScreen onComplete={handleBiosDone} />}
      {phase === 'loading' && (
        <OsLoadingScreen osName="DRL System v2.0" onComplete={handleLoadingDone} />
      )}
      {phase === 'glitch' && <BootGlitchTransition onComplete={handleGlitchDone} />}
      <button className="boot-skip-btn" onClick={skip} title="Presiona X para saltar">
        <span className="boot-skip-key">X</span> Saltar animaci&oacute;n
      </button>
    </div>
  )
}
