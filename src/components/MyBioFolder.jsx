import UseContext from '../context/Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import About from '../assets/ipng.png'
import '../styles/MyBioFolder.css'
import { useTranslation } from '../i18n/LanguageContext';

function MyBioFolder() {

  const { 
    themeDragBar,
    MybioExpand, setMybioExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

  const { t } = useTranslation();

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMybioExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={MybioExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 35 : 70,
          y: window.innerWidth <= 500 ? 35 : 40,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('About')}
      >
        <motion.div className='bio_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('About');
            }}
            style={ MybioExpand.expand ? inlineStyleExpand('About') : inlineStyle('About')}>
          <div className="folder_dragbar"
             style={{ background: MybioExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="bio_barname">
              <img src={About} alt="About" />
              <span>{t('myBio.title')}</span>
            </div>
            <div className="bio_barbtn">
              <div onClick={ !isTouchDevice ? (e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('About')
              } : undefined
              }   
                onTouchEnd={(e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('About')
              }}
              onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>

                <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => {
                    deleteTap('About')
                  }: undefined}
                  onTouchEnd={() => {
                    deleteTap('About')
                  }}
                >×
                </p>
              </div>
            </div>
          </div>
          <div className="folder_content_bio">
            <div className="sub_window">
              <div className="sub_window_bar">
                <span>Creditos</span>
              </div>
              <div className="sub_window_content">
                <p>Hecho por Dylan Ramirez Lopez el 7 de mayo de 2026.</p>
              </div>
            </div>
            <div className="sub_window sub_window_creator">
              <div className="sub_window_bar">
                <span>Creador</span>
              </div>
              <div className="sub_window_content sub_window_content_scroll">
                <p>
                  Soy un desarrollador en formación apasionado por la tecnología, especializado en crear soluciones que automatizan tareas, optimizan procesos y convierten ideas en sistemas reales que aportan valor medible. Combino programación, inteligencia artificial y buenas prácticas de ingeniería de software para entregar resultados claros, ordenados y fáciles de mantener.
                </p>
                <p>
                  Me destaco por mi capacidad para aprender rápido y adaptarme a nuevas herramientas, frameworks y entornos de trabajo. Disfruto analizar problemas complejos, entender la verdadera necesidad del usuario y proponer soluciones simples, bien estructuradas y con enfoque en la calidad del código. Mantengo una mentalidad de mejora continua: reviso, pruebo y refino lo que hago hasta lograr un resultado estable y confiable.
                </p>
                <p>
                  En cuanto a habilidades blandas, cuento con una comunicación clara y respetuosa, tanto con personas técnicas como no técnicas. Me siento cómodo trabajando en equipo, pidiendo feedback y ofreciendo ayuda cuando alguien lo necesita. Soy responsable con los plazos, organizado con mis tareas y tengo una fuerte ética de trabajo: cumplo compromisos, documento lo necesario y me preocupo porque los proyectos avancen de forma ordenada.
                </p>
                <p>
                  Tengo experiencia académica y práctica en desarrollo web, análisis de datos, bases de datos y automatización de procesos con scripts e inteligencia artificial. He participado en proyectos donde he tenido que investigar, diseñar, implementar y ajustar soluciones de principio a fin, siempre buscando que el resultado final sea útil, escalable y fácil de usar.
                </p>
                <p>
                  Desde los 6 años el mundo de la informática me llamó la atención: empecé desarmando y armando computadoras, cables y dispositivos para entender cómo funcionaban por dentro, incluso antes de saber programar. A prueba y error, quemando algún componente y corrigiendo otros, aprendí a no tenerle miedo a la tecnología, sino a verla como algo que se puede explorar, romper y mejorar.
                </p>
                <p>
                  Con el tiempo ese mismo instinto curioso se transformó en una forma de trabajar: analizar, experimentar, equivocarme rápido y ajustar hasta que todo funcione de manera estable. Esa experiencia temprana me enseñó a ser paciente, detallista y perseverante, cualidades que hoy aplico al desarrollar software, automatizar procesos y dar soporte técnico.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default MyBioFolder
