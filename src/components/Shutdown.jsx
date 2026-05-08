import { useState, useContext, useEffect } from 'react';
import UseContext from '../context/Context';
import pcshutdown from '../assets/shutdown.png';
import '../styles/Shutdown.css';
import { useTranslation } from '../i18n/LanguageContext';

function Shutdown() {
    const [selectedOption, setSelectedOption] = useState(null);

    const { shutdownWindow, setShutdownWindow, 
            setLogin, setWindowsShutDownAnimation,
            themeDragBar,
        } = useContext(UseContext);
    const { t } = useTranslation();

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const style = {
        shutdown: {
            border: selectedOption === "option1" ? '1px dotted black' : ''
        },
        restart: {
            border: selectedOption === "option2" ? '1px dotted black' : ''
        },
        logoff: {
            border: selectedOption === "option3" ? '1px dotted black' : ''
        }
    };

    function handleYesShutdown() {
        if (selectedOption === "option1") {
            setWindowsShutDownAnimation(true)
            const bodyBG = document.getElementsByTagName('body')[0];
            bodyBG.style.background = '#040404'; 
        }

        if (selectedOption === "option2") {
            window.location.reload();
        }

        if (selectedOption === "option3") {
            setLogin(true)
            setShutdownWindow(false)
        }
    }

    function handleNoShutdown() {
        setShutdownWindow(false)
        setSelectedOption(null)
    }

    // useEffect(() => { // change body bg darker tone, when shutdown is toggled
    //     const bodyElement = document.body;
    
    //     if (shutdownWindow) {
    //         bodyElement.style.background = '#09807e';
    //     } else {
    //         bodyElement.style.background = '';
    //     }
    
    // }, [shutdownWindow]);
    

    return (
        shutdownWindow ? (
            <div className='shutdown_bg'>
                <div className="shutdown_container">
                    <div className="nav_shutdown" style={{backgroundColor: themeDragBar}}>
                        <p>{t('shutdown.title')}</p>
                        <div className='x_shutdown_container'
                            onClick={handleNoShutdown}
                        >
                            <p>×</p>
                        </div>
                    </div>
                    <div className="shutdown_main_container">
                        <img src={pcshutdown} alt="pcshutdown" />
                        <div className="shutdown_text_container">
                            <p>{t('shutdown.confirm')}</p>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="option1"
                                    checked={selectedOption === "option1"}
                                    onChange={(e) => handleOptionChange(e)}
                                />
                                <span style={style.shutdown}>{t('shutdown.shutDown')}</span>
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="option2"
                                    checked={selectedOption === "option2"}
                                    onChange={(e) => handleOptionChange(e)}
                                />
                                <span style={style.restart}>{t('shutdown.restart')}</span>
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="option3"
                                    checked={selectedOption === "option3"}
                                    onChange={(e) => handleOptionChange(e)}
                                />
                                <span style={style.logoff}>{t('shutdown.logOff')}</span>
                            </label>
                        </div>
                        <div className="shutdown_btn_container">
                            <div className="yes" onClick={handleYesShutdown}>{t('shutdown.yes')}</div>
                            <div className="no" onClick={handleNoShutdown}>{t('shutdown.no')}</div>
                            <div className="no">{t('shutdown.help')}</div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default Shutdown;
