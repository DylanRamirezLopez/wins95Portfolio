import '../styles/WindowsShutdown.css';
import windowsshut from '../assets/shuttingdownbg.png'
import { useTranslation } from '../i18n/LanguageContext'

function WindowsShutdown() {
  const { t } = useTranslation();

  return (
    <div className='shitdown_bg_container'>
        <img src={windowsshut} alt="windowsShutdown" />
        <h1 className='text_1_shutdown'>{t('windowsShutdown.pleaseWait')}</h1>
        <h1 className='text_2_shutdown'>{t('windowsShutdown.safeToPowerOff')}</h1>
           
    </div>
  )
}

export default WindowsShutdown
