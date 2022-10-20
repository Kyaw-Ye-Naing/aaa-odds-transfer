import React, { useState } from "react";
import NavBar from "./components/NavBar";
import moment from "moment";
import MyModal from "./components/HistoryModal";

function Report() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <MyModal isEdit={"isEdit"}/>
      <NavBar username={"Bo Bo"} reportcolor={"link-btn-active"} />
      <span className="site-header">User Win / Lose Reports</span>

      <div className="container-fluid">
        <div className="d-flex flex-wrap bd-highlight mb-3">
          <div className="p-2 bd-highlight">
            <div className="mb-2">
              <label className="form-label">Start Date</label>
              <input
                className="form-control"
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
                className="form-control"
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
                className="search-txt form-control"
                id="exampleFormControlInput1"
                placeholder="search ..."
              />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="report-table table table-light">
            <thead className="table-secondary">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Betted Date</th>
                <th scope="col">Username</th>
                <th scope="col">Voucher</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>2022-10-19</td>
                <td>Mark</td>
                <td>GB098858538447</td>
                <td>60000</td>
                <td>
                  <span className="badge rounded-pill bg-success">Win</span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                  >
                   <i className="fas fa-eye"></i>&nbsp;View
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>2022-10-19</td>
                <td>Jacob</td>
                <td>GB098858538447</td>
                <td>60000</td>
                <td>
                  <span className="badge rounded-pill bg-danger">Lose</span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                  >
                    <i className="fas fa-eye"></i>&nbsp;View
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>2022-10-19</td>
                <td>Larry</td>
                <td>GB098858538447</td>
                <td>60000</td>
                <td>
                  <span className="badge rounded-pill bg-success">Win</span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                  >
                    <i className="fas fa-eye"></i>&nbsp;View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;
