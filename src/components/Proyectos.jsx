import { useContext, useState } from 'react'
import Draggable from 'react-draggable'
import { motion } from 'framer-motion'
import UseContext from '../context/Context'
import { imageMapping } from '../utils/AppFunctions'
import '../styles/Proyectos.css'
import { useTranslation } from '../i18n/LanguageContext'

const PROJECTS = [
  {
    id: 1, name: 'Sistema CCTV Inteligente',
    desc: 'Sistema de vigilancia con detección de movimiento, grabación 24/7 y alertas en tiempo real vía Telegram. Desplegado en 12 clientes comerciales.',
    stack: 'Python, OpenCV, Flask, SQLite, FFmpeg',
    status: 'Produccion',
    icon: '📹',
  },
  {
    id: 2, name: 'Escáner de Placas Vehiculares (ANPR)',
    desc: 'Reconocimiento automático de placas con cámara IP. Procesamiento en tiempo real con OCR y base de datos de vehículos autorizados.',
    stack: 'Python, YOLO, Tesseract, OpenCV, PostgreSQL',
    status: 'Produccion',
    icon: '🚗',
  },
  {
    id: 3, name: 'Puerta Automática con Reconocimiento Facial',
    desc: 'Control de acceso biométrico con cámara local. Reconoce rostros autorizados y envía logs al administrador.',
    stack: 'Python, FaceNet, Flask, ESP32, MySQL',
    status: 'Produccion',
    icon: '🔐',
  },
  {
    id: 4, name: 'Generador de Páginas MVP',
    desc: 'Plataforma para crear landing pages funcionales en minutos. Más de 200 sitios generados para emprendedores y pequeñas empresas.',
    stack: 'React, Node.js, Tailwind, MongoDB, Vite',
    status: 'Produccion',
    icon: '🌐',
    link: 'https://github.com/tomatitomkk',
  },
  {
    id: 5, name: 'Automatización de Reportes Diarios',
    desc: 'Script que extrae datos de múltiples fuentes (SQL, APIs, CSV) y genera un PDF con gráficos cada mañana.',
    stack: 'Python, Pandas, Matplotlib, ReportLab, cron',
    status: 'Produccion',
    icon: '📊',
  },
  {
    id: 6, name: 'Portal de Tickets Técnicos',
    desc: 'Sistema interno de tickets con asignación automática, prioridades y dashboard en tiempo real.',
    stack: 'React, Express, MySQL, Socket.io',
    status: 'Desarrollo',
    icon: '🎫',
  },
  {
    id: 7, name: 'Chatbot para Atención al Cliente',
    desc: 'Bot conversacional conectado a base de datos de productos. Responde dudas frecuentes y deriva a humano si es necesario.',
    stack: 'Python, DeepSeek API, FastAPI, Redis',
    status: 'Produccion',
    icon: '🤖',
  },
  {
    id: 8, name: 'Panel de Monitoreo IoT',
    desc: 'Dashboard en tiempo real para sensores industriales. Temperatura, humedad, vibración y alertas por WhatsApp.',
    stack: 'Node.js, MQTT, InfluxDB, Grafana, React',
    status: 'Desarrollo',
    icon: '📡',
  },
]

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className={`proj-card${expanded ? ' expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
      <div className="proj-card-header">
        <span className="proj-icon">{project.icon}</span>
        <span className="proj-name">{project.name}</span>
        <span className={`proj-status proj-${project.status === 'Produccion' ? 'prod' : 'dev'}`}>
          {project.status}
        </span>
      </div>
      {expanded && (
        <motion.div className="proj-card-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.2 }}>
          <p className="proj-desc">{project.desc}</p>
          <p className="proj-stack"><strong>Stack:</strong> {project.stack}</p>
          {project.link && (
            <a className="proj-link" href={project.link} target="_blank" rel="noopener noreferrer">
              Ver proyecto →
            </a>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default function Proyectos() {
  const {
    themeDragBar, ProyectosExpand, setProyectosExpand,
    StyleHide, isTouchDevice, handleSetFocusItemTrue,
    inlineStyleExpand, inlineStyle, deleteTap,
  } = useContext(UseContext)
  const { t, lang } = useTranslation()
  const [filter, setFilter] = useState('todas')

  const title = lang === 'es' ? 'Proyectos' : 'Projects'

  function handleDragStop(e, d) {
    setProyectosExpand(p => ({ ...p, x: d.x, y: d.y }))
  }
  function handleExpand() {
    setProyectosExpand(p => ({ ...p, expand: !p.expand }))
  }
  function handleExpandMobile() {
    if (Date.now() - (window._projTap || 0) < 300) handleExpand()
    window._projTap = Date.now()
  }

  const filtered = filter === 'todas' ? PROJECTS : PROJECTS.filter(p => p.status === (filter === 'prod' ? 'Produccion' : 'Desarrollo'))

  return (
    <Draggable axis="both" handle=".proj-dragbar" grid={[1, 1]} scale={1}
      disabled={ProyectosExpand.expand} bounds={{ top: 0 }}
      defaultPosition={{ x: 60, y: 50 }}
      onStop={handleDragStop} onStart={() => handleSetFocusItemTrue('Proyectos')}>
      <div className="proj-folder"
        onClick={e => { e.stopPropagation(); handleSetFocusItemTrue('Proyectos') }}
        style={ProyectosExpand.expand ? inlineStyleExpand('Proyectos') : inlineStyle('Proyectos')}>
        <div className="proj-dragbar"
          onDoubleClick={handleExpand} onTouchStart={handleExpandMobile}
          style={{ background: ProyectosExpand.focusItem ? themeDragBar : '#757579' }}>
          <div className="proj-barname">
            <span className="proj-logo">[P]</span>
            <span>{title}</span>
          </div>
          <div className="proj-barbtn">
            <div onClick={!isTouchDevice ? e => { e.stopPropagation(); setProyectosExpand(p => ({ ...p, hide: true, focusItem: false })); StyleHide('Proyectos') } : undefined}
              onTouchEnd={e => { e.stopPropagation(); setProyectosExpand(p => ({ ...p, hide: true, focusItem: false })); StyleHide('Proyectos') }}
              onTouchStart={e => e.stopPropagation()}>
              <p className="proj-dash"></p>
            </div>
            <div onClick={!isTouchDevice ? handleExpand : undefined} onTouchEnd={handleExpandMobile}>
              <motion.div className={`proj-expand ${ProyectosExpand.expand ? 'full' : ''}`} />
              {ProyectosExpand.expand && <div className="proj-expand2"></div>}
            </div>
            <div>
              <p className="proj-x" onClick={!isTouchDevice ? () => deleteTap('Proyectos') : undefined}
                onTouchEnd={() => deleteTap('Proyectos')}>×</p>
            </div>
          </div>
        </div>
        <div className="proj-toolbar">
          <button className={`proj-filter-btn${filter === 'todas' ? ' active' : ''}`} onClick={() => setFilter('todas')}>
            {lang === 'es' ? 'Todas' : 'All'}
          </button>
          <button className={`proj-filter-btn${filter === 'prod' ? ' active' : ''}`} onClick={() => setFilter('prod')}>
            {lang === 'es' ? 'Produccion' : 'Production'}
          </button>
          <button className={`proj-filter-btn${filter === 'dev' ? ' active' : ''}`} onClick={() => setFilter('dev')}>
            {lang === 'es' ? 'Desarrollo' : 'Development'}
          </button>
        </div>
        <div className="proj-content">
          {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
        <div className="proj-footer">
          <span>{filtered.length} {lang === 'es' ? 'proyecto(s)' : 'project(s)'}</span>
        </div>
      </div>
    </Draggable>
  )
}
