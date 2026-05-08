import UseContext from '../context/Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import resumefile from '../assets/resume.png'
import '../styles/ResumeFile.css'
import { useTranslation } from '../i18n/LanguageContext'

function ResumeFile() {

  const { 
    themeDragBar,
    ResumeFileExpand, setResumeFileExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,

   } = useContext(UseContext);

  const { t, lang } = useTranslation();
   const [ downloadBox, setDownloadBox ] = useState(false)

   const resumeLinks = {
    es: 'https://drive.google.com/file/d/1XNn23UA2L82P2__Ccuccl3WMdR2rHG57/preview',
    en: 'https://drive.google.com/file/d/1XNn23UA2L82P2__Ccuccl3WMdR2rHG57/preview',
  }

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setResumeFileExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setResumeFileExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setResumeFileExpand(prevState => ({
            ...prevState,
            expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
}

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar-resumefile'}
        grid={[1, 1]}
        scale={1}
        disabled={ResumeFileExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('ResumeFile')}
      >
        <div className='folder_folder-resumefile' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('ResumeFile');
            }}
            style={ ResumeFileExpand.expand ? inlineStyleExpand('ResumeFile') : inlineStyle('ResumeFile')}>
          <div className="folder_dragbar-resumefile"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ResumeFileExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname-resumefile">
              <img src={resumefile} alt="resumefile" />
              <span>Resume</span>
            </div>
            <div className="folder_barbtn-resumefile">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setResumeFileExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('ResumeFile') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setResumeFileExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('ResumeFile')
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-resumefile'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-resumefile ${ResumeFileExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {ResumeFileExpand.expand ? 
                (
                <div className="expand_2-resumefile"></div>
                )
                :
                (null)}
              </div>
              <div>
                <p className='x-resumefile'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('ResumeFile')
                  setDownloadBox(false)
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('ResumeFile')
                  setDownloadBox(false)
              }}
                >×</p>
              </div>
            </div>
          </div>

          <div className="folder_content-resumefile"
            style={ResumeFileExpand.expand ? 
              { height: 'calc(100svh - 72px)'} /// fullscreen btm nav
              : 
              {}
            }

          >
            {ResumeFileExpand.show ? (
              <>
              <div className="resume-lang-bar">
                <button
                  className={`resume-lang-btn${lang === 'es' ? ' active' : ''}`}
                  onClick={() => setDownloadBox(false)}
                >
                  Español
                </button>
                <button
                  className={`resume-lang-btn${lang === 'en' ? ' active' : ''}`}
                  onClick={() => setDownloadBox(false)}
                >
                  English
                </button>
              </div>
              <iframe 
              key={lang}
              onClick={() => setDownloadBox(false)}
              src={resumeLinks[lang] || resumeLinks.en}
              frameBorder='0'
              title="resume"
            >
            </iframe>
            </>
            ) : (
              <div className="resume-lang-bar">
                <button
                  className={`resume-lang-btn${lang === 'es' ? ' active' : ''}`}
                  onClick={() => setDownloadBox(false)}
                >
                  Español
                </button>
                <button
                  className={`resume-lang-btn${lang === 'en' ? ' active' : ''}`}
                  onClick={() => setDownloadBox(false)}
                >
                  English
                </button>
              </div>
            )}
            
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default ResumeFile
