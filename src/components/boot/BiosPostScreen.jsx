import { useState, useEffect, useRef } from 'react'

const BIOS_LINES = [
  { text: '', delay: 300 },
  { text: '  AuroraBIOS (R) Version 2.15.03', delay: 500, sound: true },
  { text: '  Copyright (C) 2026, AuroraBIOS Inc.', delay: 400 },
  { text: '  All Rights Reserved.', delay: 600 },
  { text: '', delay: 300 },
  { text: '  Main Processor : Intel Pentium III @ 933MHz', delay: 500 },
  { text: '', delay: 200 },
  { text: '  Memory Testing :', delay: 400, type: 'memoryStart' },
  { text: '', delay: 300 },
  { text: '  Primary IDE Master  : Virtual Disk Drive 40960MB', delay: 500 },
  { text: '  Primary IDE Slave   : Not Detected', delay: 300 },
  { text: '  Secondary IDE Master: ATAPI CD-ROM Drive', delay: 400 },
  { text: '  Secondary IDE Slave : Not Detected', delay: 300 },
  { text: '', delay: 200 },
  { text: '  Keyboard Controller : Initialized', delay: 400 },
  { text: '  PS/2 Mouse          : Detected', delay: 350 },
  { text: '', delay: 200 },
  { text: '  DMI Pool Data Verification : Passed', delay: 500 },
  { text: '  CMOS Battery                : OK', delay: 300 },
  { text: '  CMOS Checksum               : Verified', delay: 400 },
  { text: '  Plug and Play               : Initialized', delay: 350 },
  { text: '  USB Legacy Support          : Enabled', delay: 300 },
  { text: '', delay: 200 },
  { text: '  Boot Sequence:', delay: 300 },
  { text: '    1. IDE Primary Master', delay: 250 },
  { text: '    2. ATAPI CD-ROM Drive', delay: 250 },
  { text: '    3. Network: PXE Adapter', delay: 250 },
  { text: '', delay: 300 },
  { text: '  Searching for boot device...', delay: 800 },
  { text: '  Boot Sector Found: DRL BOOT LOADER v1.0', delay: 700 },
  { text: '', delay: 400 },
  { text: '  Starting operating system...', delay: 1200 },
]

export default function BiosPostScreen({ onComplete }) {
  const [visible, setVisible] = useState([])
  const [memoryCount, setMemoryCount] = useState(null)
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const beepRef = useRef(null)
  const userInteracted = useRef(false)

  useEffect(() => {
    function onInteraction() {
      if (userInteracted.current) return
      userInteracted.current = true
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        beepRef.current = ctx
      } catch { }
    }
    window.addEventListener('click', onInteraction, { once: true })
    window.addEventListener('keydown', onInteraction, { once: true })
    window.addEventListener('touchstart', onInteraction, { once: true })
    return () => {
      window.removeEventListener('click', onInteraction)
      window.removeEventListener('keydown', onInteraction)
      window.removeEventListener('touchstart', onInteraction)
      if (beepRef.current) beepRef.current.close()
    }
  }, [])

  function playBeep() {
    if (!beepRef.current) return
    try {
      const osc = beepRef.current.createOscillator()
      const gain = beepRef.current.createGain()
      osc.connect(gain)
      gain.connect(beepRef.current.destination)
      osc.frequency.value = 880
      gain.gain.value = 0.07
      osc.start(beepRef.current.currentTime)
      osc.stop(beepRef.current.currentTime + 0.08)
    } catch { }
  }

  useEffect(() => {
    indexRef.current = 0
    setVisible([])
    setMemoryCount(null)
    setDone(false)

    function tick() {
      const idx = indexRef.current
      if (idx >= BIOS_LINES.length) {
        setDone(true)
        return
      }
      const line = BIOS_LINES[idx]
      if (line.type === 'memoryStart') {
        setVisible(prev => [...prev, { text: '', isMemory: true }])
        animateMemory(0)
        indexRef.current++
        setTimeout(tick, 800)
        return
      }
      setVisible(prev => [...prev, { text: line.text }])
      if (line.sound) playBeep()
      indexRef.current++
      setTimeout(tick, line.delay)
    }

    function animateMemory(val) {
      if (val >= 131072) {
        setMemoryCount(131072)
        setVisible(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = { text: `  Memory Testing : ${131072}K OK` }
          return copy
        })
        setTimeout(tick, 600)
        return
      }
      setMemoryCount(val)
      setVisible(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = { text: `  Memory Testing : ${val}K` }
        return copy
      })
      const step = val < 65536 ? 1024 : 2048
      setTimeout(() => animateMemory(Math.min(val + step, 131072)), 18)
    }

    tick()
  }, [])

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 800)
      return () => clearTimeout(t)
    }
  }, [done, onComplete])

  return (
    <div className="boot-bios">
      <div className="boot-bios-content">
        {visible.map((line, i) => (
          <p key={i} className="boot-line">{line.text}</p>
        ))}
      </div>
    </div>
  )
}
