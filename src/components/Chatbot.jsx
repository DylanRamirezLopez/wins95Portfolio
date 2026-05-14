import { useState, useRef, useEffect, useContext } from 'react'
import Draggable from 'react-draggable'
import { motion } from 'framer-motion'
import UseContext from '../context/Context'
import { imageMapping } from '../utils/AppFunctions'
import '../styles/Chatbot.css'
import { useTranslation } from '../i18n/LanguageContext'

// ⚠️ VITE_ env vars se inlinan en el bundle cliente.
// La API key de DeepSeek es visible en DevTools.
// Para produccion, usa un proxy backend o configurala en Vercel.
const SYSTEM_PROMPT = 'Eres un asistente util, breve y directo. Responde de forma clara y concisa. No te extiendas innecesariamente. Si no sabes algo, dilo sin inventar. Prioriza la precision sobre la cantidad de texto. Responde en el mismo idioma en que te pregunten.'
const API_URL = 'https://api.deepseek.com/chat/completions'
const MODEL = 'deepseek-chat'

function getApiKey() {
  try {
    const key = import.meta.env.VITE_DEEPSEEK_API_KEY
    if (key && key !== 'tu-api-key-aqui') return key
  } catch {}
  return null
}

const API_KEY = getApiKey()

export default function Chatbot() {
  const {
    themeDragBar, ChatbotExpand, setChatbotExpand,
    StyleHide, isTouchDevice, handleSetFocusItemTrue,
    inlineStyleExpand, inlineStyle, deleteTap,
  } = useContext(UseContext)

  const { t } = useTranslation()
  const messagesEndRef = useRef(null)

  const [messages, setMessages] = useState([
    { role: 'assistant', content: API_KEY ? '¡Hola! Soy tu chatbot retro. Pregúntame lo que quieras.' : 'Chatbot no configurado. El administrador debe definir VITE_DEEPSEEK_API_KEY en el archivo .env.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    const msg = input.trim()
    if (!msg || loading || !API_KEY) return
    setInput('')
    const newMessages = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30000)
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages.map(m => ({ role: m.role, content: m.content }))
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
        signal: controller.signal
      })
      clearTimeout(timeout)

      if (res.status === 401) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Error: API key inválida. Revisa VITE_DEEPSEEK_API_KEY en el archivo .env.' }])
        setLoading(false)
        return
      }
      if (!res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error ${res.status}` }])
        setLoading(false)
        return
      }
      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || 'Sin respuesta.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      if (e.name === 'AbortError') {
        setMessages(prev => [...prev, { role: 'assistant', content: 'La conexión tardó demasiado. Intenta de nuevo.' }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión' }])
      }
    }
    setLoading(false)
  }

  function handleDragStop(event, data) {
    setChatbotExpand(prev => ({ ...prev, x: data.x, y: data.y }))
  }
  function handleExpand() {
    setChatbotExpand(prev => ({ ...prev, expand: !prev.expand }))
  }
  function handleExpandMobile() {
    if (Date.now() - (window._chatbotLastTap || 0) < 300) handleExpand()
    window._chatbotLastTap = Date.now()
  }

  return (
    <Draggable axis="both" handle=".chatbot-dragbar" grid={[1, 1]} scale={1}
      disabled={ChatbotExpand.expand} bounds={{ top: 0 }}
      defaultPosition={{ x: 90, y: 80 }}
      onStop={handleDragStop} onStart={() => handleSetFocusItemTrue('Chatbot')}>
      <div className="chatbot-folder"
        onClick={e => { e.stopPropagation(); handleSetFocusItemTrue('Chatbot') }}
        style={ChatbotExpand.expand ? inlineStyleExpand('Chatbot') : inlineStyle('Chatbot')}>
        <div className="chatbot-dragbar"
          style={{ background: ChatbotExpand.focusItem ? themeDragBar : '#757579' }}>
          <div className="chatbot-barname">
            <div className="chatbot-logo">{'>'}_</div>
            <span>Chatbot</span>
          </div>
          <div className="chatbot-barbtn">
            <div onClick={!isTouchDevice ? (e) => { e.stopPropagation(); setChatbotExpand(prev => ({ ...prev, hide: true, focusItem: false })); StyleHide('Chatbot') } : undefined}
              onTouchEnd={e => { e.stopPropagation(); setChatbotExpand(prev => ({ ...prev, hide: true, focusItem: false })); StyleHide('Chatbot') }}
              onTouchStart={e => e.stopPropagation()}>
              <p className="chatbot-dash"></p>
            </div>
            <div onClick={!isTouchDevice ? handleExpand : undefined} onTouchEnd={handleExpandMobile}>
              <motion.div className={`chatbot-expand ${ChatbotExpand.expand ? 'full' : ''}`} />
              {ChatbotExpand.expand && <div className="chatbot-expand-2"></div>}
            </div>
            <div>
              <p className="chatbot-x" onClick={!isTouchDevice ? () => deleteTap('Chatbot') : undefined}
                onTouchEnd={() => deleteTap('Chatbot')}>×</p>
            </div>
          </div>
        </div>
        <div className="chatbot-body">
          <div className="chatbot-msgs">
            {messages.map((m, i) => (
              <div key={i} className={`chatbot-msg ${m.role}`}>
                <span className="chatbot-msg-tag">{m.role === 'user' ? 'Tú' : 'Bot'}:</span>
                <span className="chatbot-msg-text">{m.content}</span>
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg assistant">
                <span className="chatbot-msg-tag">Bot:</span>
                <span className="chatbot-cursor">|</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-status">
            {!API_KEY && <span className="chatbot-nokey">&gt; API no configurada</span>}
            {API_KEY && loading && <span className="chatbot-typing">&gt; Escribiendo<span className="chatbot-cursor-dot">.</span><span className="chatbot-cursor-dot">.</span><span className="chatbot-cursor-dot">.</span></span>}
            {API_KEY && !loading && <span className="chatbot-ready">&gt; Listo</span>}
          </div>
          <div className="chatbot-input-row">
            <input className="chatbot-input" type="text" maxLength={200}
              placeholder={API_KEY ? 'Escribe tu mensaje...' : 'API no disponible'}
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              disabled={loading || !API_KEY} />
            <button className="chatbot-send" onClick={handleSend}
              disabled={loading || !input.trim() || !API_KEY}>Enviar</button>
          </div>
        </div>
      </div>
    </Draggable>
  )
}
