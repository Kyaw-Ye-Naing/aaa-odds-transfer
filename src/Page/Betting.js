import React, { useState } from "react";
import NavBar from "./NavBar";
import { data } from "./data";

function Betting() {
  const [slipdata,setSlipData]=useState([]);

  return (
    <div>
      <NavBar username={"Bo Bo"} bettingcolor={'link-btn-active'}/>
      <div>
        <span
        className="site-header"
        >
          User Betting Site
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
                  {data &&
                    data.map((d, i) => {
                      return (
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>{d.time}</td>
                          <td>
                            {/* <button type="button" class="btn btn-outline-success"> */}
                            <a className="team">
                              {d.homeTeam}({d.bodyOdds})
                            </a>
                            {/* </button> */}
                          </td>
                          <td>
                            <button
                              type="button"
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
                              className="btn btn-outline-success"
                              style={{ padding: "0.3rem 1rem" }}
                            >
                              <i class="fas fa-arrow-down"></i>
                            </button>
                          </td>
                          <td>
                            {/* <button type="button" class="btn btn-outline-success"> */}
                            <a className="team"> {d.awayTeam}</a>
                            {/* </button> */}
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
      </div>
    </div>
  );
}

export default Betting;
