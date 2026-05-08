import { useContext, useState } from 'react'
import Draggable from 'react-draggable'
import { motion } from 'framer-motion'
import UseContext from '../context/Context'
import { imageMapping } from '../utils/AppFunctions'
import '../styles/ResumeFile.css'
import { useTranslation } from '../i18n/LanguageContext'

const RESUME_LINKS = {
  es: '/resume/cv-es.pdf',
  en: '/resume/cv-en.pdf',
}

export default function ResumeViewer() {
  const {
    themeDragBar, ResumeFileExpand, setResumeFileExpand,
    StyleHide, isTouchDevice, handleSetFocusItemTrue,
    inlineStyleExpand, inlineStyle, deleteTap,
  } = useContext(UseContext)
  const { t, lang } = useTranslation()
  const [previewMode, setPreviewMode] = useState(true)

  const title = lang === 'es' ? 'Curriculum' : 'Resume'

  function handleDragStop(e, d) {
    setResumeFileExpand(p => ({ ...p, x: d.x, y: d.y }))
  }
  function handleExpand() {
    setResumeFileExpand(p => ({ ...p, expand: !p.expand }))
  }
  function handleExpandMobile() {
    if (Date.now() - (window._resumeTap || 0) < 300) handleExpand()
    window._resumeTap = Date.now()
  }

  return (
    <Draggable axis="both" handle=".rr-dragbar" grid={[1, 1]} scale={1}
      disabled={ResumeFileExpand.expand} bounds={{ top: 0 }}
      defaultPosition={{ x: 80, y: 90 }}
      onStop={handleDragStop} onStart={() => handleSetFocusItemTrue('ResumeFile')}>
      <div className="folder_folder-resumefile"
        onClick={e => { e.stopPropagation(); handleSetFocusItemTrue('ResumeFile') }}
        style={ResumeFileExpand.expand ? inlineStyleExpand('ResumeFile') : inlineStyle('ResumeFile')}>
        <div className="rr-dragbar folder_dragbar-resumefile"
          onDoubleClick={handleExpand} onTouchStart={handleExpandMobile}
          style={{ background: ResumeFileExpand.focusItem ? themeDragBar : '#757579' }}>
          <div className="folder_barname-resumefile">
            <img src={imageMapping('ResumeFile')} alt="" />
            <span>{title}</span>
          </div>
          <div className="folder_barbtn-resumefile">
            <div onClick={!isTouchDevice ? e => { e.stopPropagation(); setResumeFileExpand(p => ({ ...p, hide: true, focusItem: false })); StyleHide('ResumeFile') } : undefined}
              onTouchEnd={e => { e.stopPropagation(); setResumeFileExpand(p => ({ ...p, hide: true, focusItem: false })); StyleHide('ResumeFile') }}
              onTouchStart={e => e.stopPropagation()}>
              <p className="dash-resumefile"></p>
            </div>
            <div onClick={!isTouchDevice ? handleExpand : undefined} onTouchEnd={handleExpandMobile}>
              <motion.div className={`expand-resumefile ${ResumeFileExpand.expand ? 'full' : ''}`} />
              {ResumeFileExpand.expand && <div className="expand_2-resumefile"></div>}
            </div>
            <div>
              <p className="x-resumefile" onClick={!isTouchDevice ? () => deleteTap('ResumeFile') : undefined}
                onTouchEnd={() => deleteTap('ResumeFile')}>×</p>
            </div>
          </div>
        </div>
        <div className="file_edit_container-resumefile">
          <span>{t('common.file')}<span style={{ left: '-23px' }}>_</span></span>
          <span>{t('common.edit')}<span style={{ left: '-24px' }}>_</span></span>
          <span>{t('common.view')}<span style={{ left: '-32px' }}>_</span></span>
          <span>{t('common.help')}<span style={{ left: '-30px' }}>_</span></span>
        </div>
        <div className="folder_content-resumefile" style={ResumeFileExpand.expand ? { height: 'calc(100svh - 72px)' } : {}}>
          <div className="rr-bar">
            <button className={`rr-btn${previewMode ? ' active' : ''}`} onClick={() => setPreviewMode(true)}>
              {lang === 'es' ? 'Vista previa' : 'Preview'}
            </button>
            <button className={`rr-btn${!previewMode ? ' active' : ''}`} onClick={() => setPreviewMode(false)}>
              {lang === 'es' ? 'Descargar' : 'Download'}
            </button>
          </div>
          {previewMode ? (
            <iframe key={lang} src={RESUME_LINKS[lang]} frameBorder="0" title="resume" className="rr-iframe" />
          ) : (
            <div className="rr-download">
              <p>{lang === 'es' ? 'Haz clic para descargar:' : 'Click to download:'}</p>
              <a className="rr-dl-link" href={RESUME_LINKS[lang]} download={lang === 'es' ? 'Dylan_R_L_CV.pdf' : 'CV_DYLAN_RAMIREZ.pdf'}>
                {title}.pdf
              </a>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  )
}
