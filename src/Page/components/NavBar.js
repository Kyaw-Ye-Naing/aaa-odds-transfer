import React from "react";
import { useHistory } from "react-router-dom";
import color from "../../config/color";

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

  return (
    <div>
      <div className="odds-nav" style={{backgroundColor:color['dark'].main}}>
        <div className="profile">
          <img
            src="https://annedece.sirv.com/Images/user-vector.jpg"
            className="img-thumbnail rounded-circle"
            width={45}
            height={45}
          />
          <span className="info">{username}</span>
        </div>
        <div className="title">
          <i className="fa-solid fa-diamond diamond" style={{ fontSize: 13 }}></i>
          <span className="px-2">Odds Trasfer Site</span>
          <i className="fa-solid fa-diamond diamond" style={{ fontSize: 13 }}></i>
        </div>
        <div className="logout">
          <a
            href="/"
            className="btn logLink"
            style={{backgroundColor:color['dark'].secondary}}
            onClick={() => localStorage.clear()}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>&nbsp;Log Out</span>
          </a>
        </div>
      </div>

      {userRole == 1 ? (
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
            <span className="btn-label">Transfer</span>
          </button>
          <button
            type="button"
            className={`btn ${bettingcolor}`}
            onClick={() => handleButtonLink(2)}
          >
            <span className="btn-label">Betting</span>
          </button>
          <button
            type="button"
            className={`btn ${reportcolor}`}
            onClick={() => handleButtonLink(3)}
          >
            <span className="btn-label">Report</span>
          </button>
          <button
            type="button"
            className={`btn ${calculatecolor}`}
            onClick={() => handleButtonLink(4)}
          >
            <span className="btn-label">Calculate</span>
          </button>
          <button
            type="button"
            className={`btn ${historycolor}`}
            onClick={() => handleButtonLink(5)}
          >
            <span className="btn-label">Outstanding</span>
          </button>
          <button
            type="button"
            className={`btn ${customercolor}`}
            onClick={() => handleButtonLink(6)}
          >
            <span className="btn-label">Customer</span>
          </button>
          <button
            type="button"
            className={`btn ${analysiscolor}`}
            onClick={() => handleButtonLink(7)}
          >
            <span className="btn-label">Analysis</span>
          </button>
        </div>
         <hr />
         </>
      ) : null} 
    </div>
  );
}

export default NavBar;


