import UseContext from '../context/Context'
import emailjs from '@emailjs/browser';
import { useContext, useRef, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import Mail from '../assets/mail.png'
import '../styles/MailFolder.css'
import { useTranslation } from '../i18n/LanguageContext';

const TO_EMAIL = 'dramirezlop07@gmail.com'

const DEFAULT_MESSAGE = `Hola Dylan,

Te escribo desde tu portfolio retro. Me gustaría contactarte para:

[Escribe aquí tu mensaje]

Saludos,
[Nombre]`

function MailFolder() {

  const focusName = useRef();
  const [msgValue, setMsgValue] = useState(DEFAULT_MESSAGE)

  const { 
    themeDragBar,
    MailExpand, setMailExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    clippyThanksYouFunction,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    iconFocusIcon,
   } = useContext(UseContext);

  const { t } = useTranslation();

// ---------------------- EMAIL JS ---------------------------------------

const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_3jp9sce', 'template_mwqeuol', form.current, {
        publicKey: 'VEMHa6EGtulAzDYSH',
      })
      .then(
        () => {
          clippyThanksYouFunction()
          alert(t('mail.thankYou'))
          form.current.reset();
          setMsgValue(DEFAULT_MESSAGE)
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

// ------------------------------------------------------------------------------

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMailExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }

   function handleExpandStateToggle() {
    setMailExpand(prevState => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setMailExpand(prevState => ({
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
        handle={'.folder_dragbar-mail'}
        grid={[1, 1]}
        scale={1}
        disabled={MailExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 20 : 50,
          y: window.innerWidth <= 500 ? 40 : 120,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('Mail')}
      >
        <div className='folder_folder-mail' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('Mail');
            }}
            style={ MailExpand.expand ? inlineStyleExpand('Mail') : inlineStyle('Mail')}>
          <div className="folder_dragbar-mail"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: MailExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname-mail">
              <img src={Mail} alt="Mail" />
              <span>{t('mail.title')}</span>
            </div>
            <div className="folder_barbtn-mail">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setMailExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('Mail') 
              } : undefined
            }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setMailExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('Mail')
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-mail'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-mail ${MailExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {MailExpand.expand ? 
                (
                <div className="expand_2-mail"></div>
                )
                :
                (null)}
              </div>
              <div><p className='x-mail'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('Mail')}
                  : undefined
                }
                onTouchEnd={() => deleteTap('Mail')}
              >×</p></div>
            </div>
          </div>

          <div className="file_edit_container-mail">
              <p>{t('mail.file')}<span style={{left: '-23px'}}>_</span></p>
              <p>{t('mail.edit')}<span style={{left: '-24px'}}>_</span></p>
              <p>{t('mail.view')}<span style={{left: '-32px'}}>_</span></p>
              <p>{t('mail.help')}<span style={{left: '-30px'}}>_</span></p>
          </div>
          <div className="folder_content-mail"
            onClick={() => iconFocusIcon('')}
            style={MailExpand.expand ? 
              { height: 'calc(100svh - 100px)'} 
              : 
              {}
            }>

            {/* ------------------ EMAIL JS -------------------------- */}

            <form ref={form} onSubmit={sendEmail}>

              <div className="form_container">
                <div className="to_container">
                <div className="sendmail_icon">
                  <input className="sendmail_img_container" type="submit" value={t('mail.send')}></input>
                </div>
                  <span className="mail-fixed-to">Para: {TO_EMAIL}</span>
                  <input type="hidden" name="to_email" value={TO_EMAIL} />
                </div>
                <div className="to_container">
                  <div className="to_icon">
                    <p>Asunto</p>
                  </div>
                  <input className="myemail_container" type="text" name="subject" 
                    placeholder="Asunto del mensaje" style={{background: 'white'}} />
                </div>
                <div className="to_container" 
                  onClick={() => focusName.current.focus()}
                >
                  <div className="to_icon">
                    <p>{t('mail.name')}</p>
                  </div>
                  <input className="myemail_container" type="text" name="from_name" required ref={focusName} style={{background: 'white'}} />
                </div>
              </div>
              <textarea name="message" required 
                value={msgValue}
                onChange={e => setMsgValue(e.target.value)}
                placeholder={t('mail.messagePlaceholder')}/>
            </form>
          </div>
        </div>
      </Draggable>
    </>
  )
}          

export default MailFolder