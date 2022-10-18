import React, { useState } from "react";
import NavBar from "./NavBar";
import { data } from "./data";
import moment from "moment";
import { useEffect } from "react";
import Loader from "../asset/loader";
import { oddController } from "../controllers/oddsController/oddController";

function Betting() {
  const [slipdata,setSlipData] = useState([]);
  const [eventsData,setEventsData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    //console.log("session storage",userId)
    oddController.getBettingEvents(parseInt(userId), (data) => {
      console.log("dsta",data.events)
      setEventsData(data.events);
      setLoading(false);
    });
  }, []);

const handleTeamAdd = (type,data) => {
if(type == "home"){

}else if(type == "away"){

}else if(type == "over"){

}else{

}
}

  return (
    <div>
      <NavBar username={"Bo Bo"} bettingcolor={'link-btn-active'}/>
      {
        isLoading 
        ? (<div style={{textAlign:'center'}}><Loader /></div>) 
        :
      (<div>
        <span
        className="site-header"
        >
          User Betting Page
        </span>
        <div className="row bet-container">
          <div className="col-12 col-lg-8 col-md-8">
            <div className="event">
              <table class="table">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col" width="15">
                      No
                    </th>
                    <th scope="col" width="100">
                      Time
                    </th>
                    <th scope="col" width="100">
                      Home
                    </th>
                    <th scope="col" width="30">
                      Over
                    </th>
                    <th scope="col" width="30">
                      Goal
                    </th>
                    <th scope="col" width="30">
                      Under
                    </th>
                    <th scope="col" width="100">
                      Away
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eventsData.length == 0 ?
                  <tr>
                    <td colSpan={7} style={{textAlign:'center',fontWeight:'bold'}}>No Data</td>
                  </tr> 
                  : eventsData &&
                    eventsData.map((d, i) => {
                      return (
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>{`${moment(d.date).format(
                            "hh:mm:ss a"
                          )}`}</td>
                          <td>
                            {/* <button type="button" class="btn btn-outline-success"> */}
                            <a className="team" onClick={() => handleTeamAdd("home",d)}>
                              {d.homeTeamId == d.overTeamId ?
                             <span>{d.homeTeam}({d.bodyOdds})</span>  : <span>{d.homeTeam}</span>
                            }
                            </a>
                            {/* </button> */}
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleTeamAdd("over",d)}
                              className="btn btn-outline-success"
                              style={{ padding: "0.3rem 1rem" }}
                            >
                              <i class="fas fa-arrow-up"></i>
                            </button>
                          </td>
                          <td>{d.goalOdds}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleTeamAdd("under",d)}
                              className="btn btn-outline-success"
                              style={{ padding: "0.3rem 1rem" }}
                            >
                              <i class="fas fa-arrow-down"></i>
                            </button>
                          </td>
                          <td>
                          <a className="team" onClick={() => handleTeamAdd("away",d)}>
                              {d.awayTeamId == d.overTeamId ?
                             <span>{d.awayTeam}({d.bodyOdds})</span>  : <span>{d.awayTeam}</span>
                            }
                          </a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 col-lg-4 col-md-4">
            <div className="panel">
             
              <select
                class="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
              >
                <option selected>Select User</option>
                <option value="1">Ko Ko</option>
                <option value="2">Nyi Nyi</option>
                <option value="3">Oo Oo</option>
              </select>

              <div className="panel-details">
                <table class="table">
                  <thead>
                    <tr className="table-secondary">
                      <th scope="col">No</th>
                      <th scope="col">Choice</th>
                      <th scope="col">Odds</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="4000"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="4000"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry the Bird</td>
                      <td>Thornton</td>
                      <td>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="4000"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class=" total-txt mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Total
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                />
              </div>
             
                <button type="button" className="btn btn-primary">
                <i class="fas fa-save"></i>&nbsp;
                <span>Save</span>
              </button>
             
            </div>
          </div>
        </div>
      </div>)
}
    </div>
  );
}

export default Betting;
