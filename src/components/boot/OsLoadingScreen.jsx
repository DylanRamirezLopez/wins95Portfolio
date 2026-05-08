import { useState, useEffect } from 'react'

const LOADING_STEPS = [
  'Loading kernel modules...',
  'Initializing memory manager...',
  'Mounting root file system...',
  'Loading device drivers...',
  'Mounting user workspace...',
  'Starting system services...',
  'Initializing network stack...',
  'Initializing desktop shell...',
  'Starting portfolio services...',
  'Ready.',
]

export default function OsLoadingScreen({ osName, onComplete }) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (step >= LOADING_STEPS.length) {
      const t = setTimeout(onComplete, 600)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setStep(s => s + 1)
      setProgress(p => Math.min(p + 10, 100))
    }, 300 + Math.random() * 400)
    return () => clearTimeout(t)
  }, [step, onComplete])

  return (
    <div className="boot-os">
      <div className="boot-os-content">
        <pre className="boot-os-logo">{`
  ██████╗ ██████╗ ██╗
  ██╔══██╗██╔══██╗██║
  ██║  ██║██████╔╝██║
  ██║  ██║██╔══██╗██║
  ██████╔╝██║  ██║███████╗
  ╚═════╝ ╚═╝  ╚═╝╚══════╝
        `}</pre>
        <p className="boot-os-name">{osName}</p>
        <div className="boot-os-bar-track">
          <div className="boot-os-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="boot-os-status">
          {step < LOADING_STEPS.length ? LOADING_STEPS[step] : ''}
        </p>
      </div>
    </div>
  )
}
