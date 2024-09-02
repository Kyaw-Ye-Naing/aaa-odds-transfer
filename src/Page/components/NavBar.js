import React from "react";
import { useHistory } from "react-router-dom";
import color from "../../config/color";
import { useTranslation } from "react-i18next";

function NavBar({
  userRole,
  username,
  homecolor = "link-btn",
  bettingcolor = "link-btn",
  reportcolor = "link-btn",
  calculatecolor = "link-btn",
  historycolor = "link-btn",
  customercolor = "link-btn",
  analysiscolor = "link-btn"
}) {
  const history = useHistory();
  const { t, i18n } = useTranslation("global");

  const handleButtonLink = (type) => {
    if (type === 1) {
      history.push("/odds");
    } else if (type === 2) {
      history.push("/betting");
    } else if (type === 3) {
      history.push("/report");
    } else if (type === 4) {
      history.push("/calculate");
    } else if (type === 5) {
      history.push("/history");
    } else if (type === 6){
      history.push("/customer");
    } 
    else {
      history.push("/analysis");
    }
  };

  const onChangeLanguage = () => {
    console.log("current lan",i18n.language)
    i18n.changeLanguage(i18n.language === "en" ? "mm" : "en");
    localStorage.setItem("language", i18n.language);
  };

  return (
    <div>
      <div className="odds-nav" style={{backgroundColor:color['dark'].main}}>
        <div className="profile" style={{fontSize:'0.87rem'}}>
          <img
            src="https://annedece.sirv.com/Images/user-vector.jpg"
            className="img-thumbnail rounded-circle"
            width={45}
            height={45}
          />
          <span className="info">{username}</span>
        </div>
        <div className="title">
          <i className="fa-solid fa-diamond diamond" style={{ fontSize: 12 }}></i>
          <span className="px-2">Odds Trasfer Site</span>
          <i className="fa-solid fa-diamond diamond" style={{ fontSize: 12 }}></i>
        </div>
        <div className="logout" style={{display:'flex',alignItems:'center',gap:15}}>
        {
          userRole === 1 ?
         <div style={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          color:color['dark'].secondary,
          cursor:'pointer'
          }}>
         <i 
         className="fa-solid fa-globe" 
         onClick={()=>onChangeLanguage()} 
         style={{fontSize:'1.2rem'}}>
         </i>
         <span style={{fontSize:'0.5rem'}}>Language</span>
         </div> : null
}
          <a
            href="/"
            className="btn logLink"
            style={{backgroundColor:color['dark'].secondary,fontSize:'0.87rem'}}
            onClick={() => localStorage.clear()}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>&nbsp;{t('logOut')}</span>
          </a>
        </div>
      </div>

      {userRole <= 2 ? (
        <>
        <div
          className="group-list"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            type="button"
            className={`btn ${homecolor}`}
            onClick={() => handleButtonLink(1)}
          >
            <span className="btn-label">{t('transfer')}</span>
          </button>
          <button
            type="button"
            className={`btn ${bettingcolor}`}
            onClick={() => handleButtonLink(2)}
          >
            <span className="btn-label">{t('betting')}</span>
          </button>
          <button
            type="button"
            className={`btn ${reportcolor}`}
            onClick={() => handleButtonLink(3)}
          >
            <span className="btn-label">{t('report')}</span>
          </button>
          <button
            type="button"
            className={`btn ${calculatecolor}`}
            onClick={() => handleButtonLink(4)}
          >
            <span className="btn-label">{t('calculate')}</span>
          </button>
          <button
            type="button"
            className={`btn ${historycolor}`}
            onClick={() => handleButtonLink(5)}
          >
            <span className="btn-label">{t('outstanding')}</span>
          </button>
          <button
            type="button"
            className={`btn ${customercolor}`}
            onClick={() => handleButtonLink(6)}
          >
            <span className="btn-label">{t('customer')}</span>
          </button>
          <button
            type="button"
            className={`btn ${analysiscolor}`}
            onClick={() => handleButtonLink(7)}
          >
            <span className="btn-label">{t('analysis')}</span>
          </button>
        </div>
         <hr />
         </>
      ) : null} 
    </div>
  );
}

export default NavBar;


