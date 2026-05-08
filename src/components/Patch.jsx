import UseContext from '../context/Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import bulb from '../assets/bulb.png'
import '../styles/Patch.css'
import patchNotes from '../data/patchNotes';
import { useTranslation } from '../i18n/LanguageContext';



function Patch() {

  const { 
    themeDragBar,
    PatchExpand, setPatchExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    imageMapping,

   } = useContext(UseContext);

  const { t } = useTranslation();

    function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setPatchExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))
    }


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar-resumefile'}
        grid={[1, 1]}
        scale={1}
        disabled={PatchExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 40 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Patch')}
      >
        <div
            className='folder_folder-resumefile'
            onClick={(e) => {
                e.stopPropagation();
                handleSetFocusItemTrue('Patch');
            }}
            style={{
                height: window.innerHeight <= 700 ? '80%' : '',
                width: '200px',
                resize: 'none',
                ...(PatchExpand.expand ? inlineStyleExpand('Patch') : inlineStyle('Patch'))
            }}
            >
          <div className="folder_dragbar-resumefile"
             style={{ background: PatchExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname-resumefile">
                <img src={imageMapping('Patch')} alt="Patch" />
                <span>{t('patch.title')}</span>
            </div>
            <div className="folder_barbtn-resumefile">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setPatchExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Patch') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setPatchExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Patch')
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-resumefile'></p>
              </div>
              <div>
                <motion.div className={`expand-resumefile ${PatchExpand.expand ? 'full' : ''}`}
                    style={{borderColor: 'grey'}} 
                >
                </motion.div>
                {PatchExpand.expand ? 
                (
                <div className="expand_2-resumefile"></div>
                )
                :
                (null)}
              </div>
              <div>
                <p className='x-resumefile'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Patch')
                 }: undefined
                }
                onTouchEnd={() => {
                  deleteTap('Patch')
              }}
                >×</p>
              </div>
            </div>
          </div>

          <div className="content_container">
            <div className="patch_note">
                <div className="patch_head">
                    <img src={bulb} alt="bulb" />  
                    <h1>{t('patch.patchUpdates')}</h1> 
            </div>
            <div className="patch_log">
                {patchNotes.map((note, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                    <p><strong>{note.head}</strong> — {note.date}</p>
                    {note.notes.map((line, i) => (
                        <p key={i}>- {line}</p>
                    ))}
                    </div>
                ))}
            </div>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default Patch
