import { useState, useRef, useEffect, useContext } from 'react'
import Draggable from 'react-draggable'
import { motion } from 'framer-motion'
import UseContext from '../context/Context'
import { imageMapping } from '../utils/AppFunctions'
import '../styles/Terminal.css'

const FILE_SYSTEM = {
  '/': {
    home: { user: { docs: { 'readme.txt': 'Bienvenido al sistema DRL.' }, projects: {} } },
    etc: { 'hosts': '127.0.0.1 localhost', 'os-release': 'DRL System v2.0' },
    tmp: {},
    usr: { bin: {} },
  }
}

const COMMANDS = [
  { cmd: 'help', desc: 'Muestra esta lista de comandos' },
  { cmd: 'whoami', desc: 'Muestra el usuario actual' },
  { cmd: 'ls [ruta]', desc: 'Lista archivos en el directorio actual' },
  { cmd: 'cd <dir>', desc: 'Cambia de directorio' },
  { cmd: 'cat <archivo>', desc: 'Muestra el contenido de un archivo' },
  { cmd: 'clear', desc: 'Limpia la terminal' },
  { cmd: 'neofetch', desc: 'Muestra informacion del sistema' },
  { cmd: 'echo <texto>', desc: 'Repite el texto ingresado' },
  { cmd: 'date', desc: 'Muestra la fecha y hora actual' },
  { cmd: 'uptime', desc: 'Muestra el tiempo desde que inicio el sistema' },
  { cmd: 'open chatbot', desc: 'Abre el chatbot' },
  { cmd: 'open resume', desc: 'Abre el curriculum' },
  { cmd: 'open projects', desc: 'Abre la app de proyectos' },
]

let startTime = Date.now()

export default function Terminal() {
  const {
    themeDragBar, TerminalExpand, setTerminalExpand,
    StyleHide, isTouchDevice, handleSetFocusItemTrue,
    inlineStyleExpand, inlineStyle, deleteTap,
    handleShow,
  } = useContext(UseContext)

  const [lines, setLines] = useState([
    { text: 'DRL Terminal v1.0 — Escribe "help" para comenzar.', cls: 'terminal-hl' },
    { text: '', cls: '' },
  ])
  const [input, setInput] = useState('')
  const [cwd, setCwd] = useState('/home/user')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView()
  }, [lines])

  useEffect(() => {
    inputRef.current?.focus()
  }, [TerminalExpand.show])

  function addLine(text, cls = '') {
    setLines(prev => [...prev, { text, cls }])
  }

  function resolvePath(path) {
    if (!path || path === '.') return cwd
    if (path === '..') {
      const parts = cwd.split('/').filter(Boolean)
      parts.pop()
      return '/' + parts.join('/')
    }
    if (path.startsWith('/')) return path
    return cwd + '/' + path
  }

  function getNode(path) {
    const parts = path.split('/').filter(Boolean)
    let node = FILE_SYSTEM
    for (const p of parts) {
      if (node[p] === undefined) return undefined
      node = node[p]
    }
    return node
  }

  function handleCommand(cmd) {
    const parts = cmd.trim().split(/\s+/)
    const base = parts[0].toLowerCase()

    if (!cmd.trim()) return

    setHistory(prev => [cmd, ...prev])
    setHistIdx(-1)
    addLine(`> ${cmd}`)

    switch (base) {
      case 'help':
        addLine('Comandos disponibles:', 'terminal-hl')
        COMMANDS.forEach(c => addLine(`  ${c.cmd.padEnd(20)} ${c.desc}`))
        break

      case 'whoami':
        addLine('dylanz')
        break

      case 'clear':
        setLines([])
        return

      case 'echo':
        addLine(parts.slice(1).join(' ') || '')
        break

      case 'date':
        addLine(new Date().toString())
        break

      case 'uptime':
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        const h = Math.floor(elapsed / 3600)
        const m = Math.floor((elapsed % 3600) / 60)
        const s = elapsed % 60
        addLine(`up ${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
        break

      case 'neofetch':
        addLine('  DRL System v2.0', 'terminal-hl')
        addLine('  Kernel: React 18 + Vite 5')
        addLine('  Shell: DRL Terminal v1.0')
        addLine('  Resolution: 640x480 (simulated)')
        addLine(`  Uptime: ${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
        addLine('  DE: Windows 95 Retro Portfolio')
        addLine('  CPU: Intel Pentium III @ 933MHz')
        addLine('  RAM: 131072K / 131072K')
        addLine('  Terminal: xterm-256color (simulated)')
        break

      case 'ls': {
        const target = resolvePath(parts[1] || '.')
        const node = getNode(target)
        if (node === undefined) {
          addLine(`ls: cannot access '${parts[1] || '.'}': No such file or directory`)
        } else if (typeof node === 'string') {
          addLine(target)
        } else {
          const entries = Object.keys(node)
          addLine(entries.join('  ') || '(empty)')
        }
        break
      }

      case 'cd': {
        const target = resolvePath(parts[1] || '/')
        const node = getNode(target)
        if (node === undefined || typeof node === 'string') {
          addLine(`cd: ${parts[1] || ''}: No such file or directory`)
        } else {
          setCwd(target)
        }
        break
      }

      case 'cat': {
        if (!parts[1]) { addLine('cat: falta un argumento'); break }
        const target = resolvePath(parts[1])
        const node = getNode(target)
        if (node === undefined) {
          addLine(`cat: ${parts[1]}: No such file or directory`)
        } else if (typeof node !== 'string') {
          addLine(`cat: ${parts[1]}: Is a directory`)
        } else {
          addLine(node)
        }
        break
      }

      case 'open': {
        const target = (parts[1] || '').toLowerCase()
        const map = { chatbot: 'Chatbot', resume: 'ResumeFile', projects: 'Proyectos', mail: 'Mail', settings: 'Settings' }
        const app = map[target]
        if (app) {
          addLine(`Abriendo ${app}...`)
          setTimeout(() => handleShow(app), 200)
        } else {
          addLine(`open: no se conoce la aplicacion '${target}'`)
        }
        break
      }

      default:
        addLine(`comando no encontrado: ${base}. Escribe 'help' para ver los comandos disponibles.`)
    }

    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx <= 0) { setHistIdx(-1); setInput(''); return }
      const next = histIdx - 1
      setHistIdx(next)
      setInput(history[next])
    }
  }

  function handleDragStop(e, d) {
    setTerminalExpand(p => ({ ...p, x: d.x, y: d.y }))
  }
  function handleExpand() {
    setTerminalExpand(p => ({ ...p, expand: !p.expand }))
  }
  function handleExpandMobile() {
    if (Date.now() - (window._termTap || 0) < 300) handleExpand()
    window._termTap = Date.now()
  }

  return (
    <Draggable axis="both" handle=".term-dragbar" grid={[1, 1]} scale={1}
      disabled={TerminalExpand.expand} bounds={{ top: 0 }}
      defaultPosition={{ x: 50, y: 60 }}
      onStop={handleDragStop} onStart={() => handleSetFocusItemTrue('Terminal')}>
      <div className="term-folder"
        onClick={e => { e.stopPropagation(); handleSetFocusItemTrue('Terminal') }}
        style={TerminalExpand.expand ? inlineStyleExpand('Terminal') : inlineStyle('Terminal')}>
        <div className="term-dragbar"
          onDoubleClick={handleExpand} onTouchStart={handleExpandMobile}
          style={{ background: TerminalExpand.focusItem ? themeDragBar : '#757579' }}>
          <div className="term-barname">
            <span className="term-logo">&#95;&#95;</span>
            <span>Terminal</span>
          </div>
          <div className="term-barbtn">
            <div onClick={!isTouchDevice ? e => { e.stopPropagation(); setTerminalExpand(p => ({ ...p, hide: true, focusItem: false })); StyleHide('Terminal') } : undefined}
              onTouchEnd={e => { e.stopPropagation(); setTerminalExpand(p => ({ ...p, hide: true, focusItem: false })); StyleHide('Terminal') }}
              onTouchStart={e => e.stopPropagation()}>
              <p className="term-dash"></p>
            </div>
            <div onClick={!isTouchDevice ? handleExpand : undefined} onTouchEnd={handleExpandMobile}>
              <motion.div className={`term-expand ${TerminalExpand.expand ? 'full' : ''}`} />
              {TerminalExpand.expand && <div className="term-expand2"></div>}
            </div>
            <div>
              <p className="term-x" onClick={!isTouchDevice ? () => deleteTap('Terminal') : undefined}
                onTouchEnd={() => deleteTap('Terminal')}>×</p>
            </div>
          </div>
        </div>
        <div className="term-body" onClick={() => inputRef.current?.focus()}>
          <div className="term-output">
            {lines.map((l, i) => (
              <pre key={i} className={`term-line ${l.cls}`}>{l.text}</pre>
            ))}
            <div className="term-input-line">
              <span className="term-prompt">{cwd}$</span>
              <input ref={inputRef} className="term-input" type="text" value={input}
                onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => inputRef.current?.focus(), 10)} autoFocus />
            </div>
            <div ref={endRef} />
          </div>
        </div>
      </div>
    </Draggable>
  )
}
