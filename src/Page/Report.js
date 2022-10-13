import React,{useState} from "react";
import NavBar from "./NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function Report() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div>
      <NavBar username={"Bo Bo"} reportcolor={"link-btn-active"} />
      <span className="site-header">User Win / Lose Reports Site</span>

      <div className="container-fluid">
        <div className="report-container">
          <div className="">
          <div className="date-search">
          <input type="date" id="birthday" name="birthday"/>
          <input type="date" id="birthday" name="birthday"/>
          <button type="button" class="btn btn-primary">Primary</button>
          </div>
          </div>
          <div className="">
          <input
              type="email"
              style={{textAlign:'right'}}
              class="search-txt form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>         
        </div>

        <div class="table-responsive">
        <table class="report-table table table-light">
          <thead>
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
