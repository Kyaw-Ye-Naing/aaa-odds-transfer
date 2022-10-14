import React, { useState } from "react";
import NavBar from "./NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import moment from "moment";

function Report() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div>
      <NavBar username={"Bo Bo"} reportcolor={"link-btn-active"} />
      <span className="site-header">User Win / Lose Reports Page</span>

      <div className="container-fluid">
        <div className="d-flex flex-wrap bd-highlight mb-3">
          <div className="p-2 bd-highlight">
            <div className="mb-2">
              <label className="form-label">Start Date</label>
              <input
                class="form-control"
                type="date"
                id="birthday"
                name="birthday"
              />
            </div>
          </div>
          <div className="p-2 bd-highlight">
            <div className="mb-2">
              <label className="form-label">End Date</label>
              <input
                class="form-control"
                type="date"
                id="birthday"
                name="birthday"
              />
            </div>
          </div>
          <div className="p-2 bd-highlight">
            <button type="button" className="search-btn btn btn-success">
              Search
            </button>
          </div>
          <div className="ms-auto p-2 bd-highlight">
          <div className="mb-2">
              <label className="form-label"></label>
              <input
              type="email"
              style={{ textAlign: "left" }}
              class="search-txt form-control"
              id="exampleFormControlInput1"
              placeholder="search ..."
            />
            </div>
           
          </div>
        </div>

        <div class="table-responsive">
          <table class="report-table table table-light">
            <thead className="table-secondary">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Username</th>
                <th scope="col">Voucher</th>
                <th scope="col">Event</th>
                <th scope="col">Choice</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Win/Lose Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>GB098858538447</td>
                <td>Man U vs Chelsea</td>
                <td>Chelsea</td>
                <td>60000</td>
                <td>
                  <span className="badge rounded-pill bg-success">Win</span>
                </td>
                <td>1200000</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>GB098858538447</td>
                <td>Everton vs Wolves</td>
                <td>Over</td>
                <td>60000</td>
                <td>
                  <span className="badge rounded-pill bg-danger">Lose</span>
                </td>
                <td>0</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>GB098858538447</td>
                <td>Arsenal vs Spurs</td>
                <td>Chelsea</td>
                <td>60000</td>
                <td>
                  <span className="badge rounded-pill bg-success">Win</span>
                </td>
                <td>70000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;
