import React from "react";
import {useHistory} from "react-router-dom";

function NavBar({ username }) {
    const history = useHistory();
  const handleButtonLink = (type) => {
    if (type === 1) {
      history.push("/odds");
    } else if (type === 2) {
      history.push("/betting");
    } else if (type === 3) {
      history.push("/report");
    } else {
      history.push("/calculate");
    }
  };

  return (
    <div>
      <div className="odds-nav">
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
          <i className="fa-solid fa-diamond" style={{ fontSize: 13 }}></i>
          <span className="px-2">Odds Trasfer Page</span>
          <i className="fa-solid fa-diamond" style={{ fontSize: 13 }}></i>
        </div>
        <div className="logout">
          <a
            href="/"
            className="btn btn-warning logLink"
            onClick={() => localStorage.clear()}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>&nbsp;Log Out</span>
          </a>
        </div>
      </div>

      <div
        className="group-list"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <button
          type="button"
          className="btn"
          onClick={() => handleButtonLink(1)}
        >
          Home
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => handleButtonLink(2)}
        >
          Body Betting
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => handleButtonLink(3)}
        >
          Win/Lose Report
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => handleButtonLink(4)}
        >
          Calculate Voucher
        </button>
      </div>

      <hr />
    </div>
  );
}

export default NavBar;
