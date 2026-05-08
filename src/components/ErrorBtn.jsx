import UseContext from '../context/Context'
import { useContext, useState, useEffect } from 'react'
import Error from '../assets/error.png'
import '../styles/ErrorBtn.css'
import { useTranslation } from '../i18n/LanguageContext'

function ErrorBtn({themeDragBar, stateVal, text, setStateVal, runOpenFuction}) {
    const [YesNo, setYesNo] = useState(false)
    const [Content, setContent] = useState('')
    const [deleteMode, setDeleteMode] = useState(false)
    const [deleteIconName, setDeleteIconName] = useState('')

    const { 
        deletepermanently,
        iconBeingRightClicked,
        setUserCreatedFolder,
        handleSetFocusItemTrue, setRunCatVideo 

    } = useContext(UseContext);
    const { t } = useTranslation();
    const textResetStroage = t('errorBtn.resetWarning')
    const textGithub = t('errorBtn.redirectWarning')
    const textCat = t('errorBtn.catWarning')
    const textDelete = t('errorBtn.deleteConfirm', { name: iconBeingRightClicked.name })

    useEffect(() => {
        handleBtn(stateVal)
    }, [stateVal]); 

    function handleBtn(name) {

        if (iconBeingRightClicked.name === name) { // for delete confirmation
            setYesNo(true);
            setContent(textDelete);
            setDeleteMode(true);
            setDeleteIconName(name);
            return;
        }   
                
        switch (name.toLowerCase()) {

            case "resetstorage":
                setYesNo(true);
                setContent(textResetStroage);
                break;

            case "github":
                setYesNo(true);
                setContent(textGithub);
                break;

            case "webresume":
                setYesNo(true);
                setContent(textGithub);
                break;

            case "cat":
                setYesNo(true);
                setContent(textCat);
                break;

            default:
                setYesNo(false);
                setContent(text);
                break;
        }
    }
    

    function handleFunction(name) {

        if (deleteIconName && deleteMode) { // for delete confirmation
            deletepermanently(deleteIconName);
            setDeleteMode(false);
            setDeleteIconName('');
            return;
        }   

        switch (name.toLowerCase()) {
            case "resetstorage":
                return removeLocalStorage();

            case "github": 
                return window.open('https://github.com/tomatitomkk', '_blank');

            case "webresume": 
                
            return window.open('https://tomatitomkk.github.io', '_blank');
            
            case "cat": 
                setRunCatVideo(true)
                return;

            default:
                return runOpenFuction();
        }
    }


    
    function removeLocalStorage() {
        setUserCreatedFolder([])
        localStorage.clear();
        location.reload();
    }

  return (
    <div className="error_container"
    onClick={(e) => {
        e.stopPropagation();
        handleSetFocusItemTrue('');
      }}
    >
        <div className="bar_tap"
            style={{ background: themeDragBar }}
        >
            <p>{stateVal}</p>
            <div 
                onClick={() => {
                    setStateVal(false)
                    runOpenFuction()
                    setDeleteMode(false);
                    setDeleteIconName('');
                }}
            >
                <p>×</p>
            </div>
        </div>
        <div className="error_message_container">
            <img src={Error} alt="error" />
            <p>{Content}</p>
        </div>
        <div className={`confirm_container${YesNo ? '' : 'none'}`}>
            <div className="error_ok_btn"
                onClick={() => {
                    setStateVal(false)
                    handleFunction(stateVal)
                }}
                
            >
                <p>{YesNo ? t('errorBtn.yes') : t('common.ok')}</p>
            </div>
            {YesNo && (
             <div className="error_ok_btn"
                onClick={() => {
                    setStateVal(false)
                    setDeleteMode(false);
                    setDeleteIconName('');
                }}
                
            >
                <p>{t('errorBtn.no')}</p>
            </div>   
            )}
            
        </div>
    </div>
  )
}

export default ErrorBtn
