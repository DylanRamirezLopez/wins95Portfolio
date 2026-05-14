<div align="center">
  <img src="src/assets/markdown.png" alt="Windows 95 Portfolio" width="600">

  # 🖥️ Windows 95 Portfolio

  **Un portafolio interactivo con la estética y funcionalidad de Windows 95**

  [![Vercel](https://img.shields.io/badge/deploy-vercel-000?logo=vercel)](https://wins95portfolio.vercel.app)
  [![React](https://img.shields.io/badge/react-18-61DAFB?logo=react)](https://react.dev)
  [![Vite](https://img.shields.io/badge/vite-5-646CFF?logo=vite)](https://vitejs.dev)
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
  [![Autor](https://img.shields.io/badge/by-Dylan%20Ramirez%20Lopez-blue)](https://github.com/tomatitomkk)

</div>

---

## 📖 ¿Qué resuelve?

Este portfolio transforma la experiencia tradicional de mostrar proyectos técnicos en algo **interactivo y memorable**. En lugar de una página estática, el usuario **navega un escritorio Windows 95 funcional**: abre aplicaciones, juega al Buscaminas, chatea en vivo, escucha música en Winamp y explora proyectos — todo desde el navegador.

> **Problema**: Los portfolios tradicionales son pasivos y no reflejan la personalidad del desarrollador.  
> **Solución**: Una experiencia inmersiva que demuestra habilidades técnicas mientras muestra el trabajo.

---

## 🚀 Demo en vivo

| Plataforma | URL |
|------------|-----|
| **Vercel** | [https://wins95portfolio.vercel.app](https://wins95portfolio.vercel.app) |

---

## 🧱 Stack tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| **Frontend** | React 18, Vite 5, Framer Motion, CSS puro |
| **Drag & Drop** | react-draggable, @dnd-kit |
| **Gráficos** | recharts (BTC chart) |
| **Chat** | WebSocket, axios, bad-words |
| **Widgets** | react-calendar, react-color, Webamp, react-icons |
| **Email** | EmailJS |
| **Deploy** | Vercel, GitHub Actions (Pages) |

---

## ✨ Funcionalidades

- Secuencia de arranque (BIOS → OS loading → Glitch)
- Inicio de sesión con Mario corriendo
- Escritorio con iconos drag & drop + click derecho
- Ventanas redimensionables, minimizables
- Menú Inicio con subcarpetas
- **MSN Messenger** — Chat en vivo vía WebSocket
- **Buscaminas** — Juego clásico completo
- **Winamp** — Reproductor con Webamp
- **Paint** — Dibujo integrado
- **Terminal** — Símbolo del sistema funcional
- **Internet Explorer** — Navegador embebido
- **Noticias + Clima** — En tiempo real con geolocalización
- **Bitcoin Tracker** — Precio y gráfico en vivo
- **Store** — Tienda para instalar/desinstalar apps
- **Tile Screen** — Pantalla inicio estilo Windows 10
- **Task Manager** — Monitoreo de procesos
- **Clippy** — Asistente contextual bilingüe (ES/EN)
- **Configuración** — Fondos, efectos, color picker

---

## 🔧 Instalación

```bash
git clone https://github.com/tomatitomkk/wins95Portfolio.git
cd wins95Portfolio
npm install
cp .env.example .env   # Configurar VITE_DEEPSEEK_API_KEY
npm run dev            # http://localhost:5173
```

### Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualizar build |
| `npm run lint` | ESLint |

---

## 🌐 Despliegue

El proyecto está preconfigurado para **Vercel**. Conectá tu repo, Vercel detecta `vercel.json` automáticamente.

Variables de entorno requeridas en Vercel:
- `VITE_DEEPSEEK_API_KEY` — API key de DeepSeek

---

## 👨‍💻 Autor

**Dylan Ramirez Lopez**  
[GitHub](https://github.com/tomatitomkk)

---

## 📄 Licencia

MIT © Dylan Ramirez Lopez.  
Si hacés fork, por favor **dá crédito** al autor original.

---

## ©️ Créditos

- Inspiración visual: Windows 95™ — Microsoft
- Iconos: [Old Windows Icons](https://oldwindowsicons.tumblr.com/tagged/windows%2095)
- Paint: [jspaint](https://github.com/1j01/jspaint)
- Winamp: [Webamp](https://webamp.org/)
