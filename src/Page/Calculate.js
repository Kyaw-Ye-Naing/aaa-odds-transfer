import React from "react";
import NavBar from "./components/NavBar";

function Calculate() {
  return (
    <div>
      <NavBar username={"Bo Bo"} calculatecolor={"link-btn-active"} />
      <span className="site-header">Voucher Calculation Page</span>
      <div className="cal-container">
        <table class="table table-light">
          <thead className="table-secondary">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Time</th>
              <th scope="col">League</th>
              <th scope="col">Home</th>
              <th scope="col">Result</th>
              <th scope="col">Away</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>2022-10-13 10:00 PM</td>
              <td>Premier League</td>
              <td>Man U</td>
              <td>1 - 2</td>
              <td>Chelsea</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>2022-10-13 10:00 PM</td>
              <td>Premier League</td>
              <td>Everton</td>
              <td>4 - 2</td>
              <td>Wolves</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>2022-10-13 10:00 PM</td>
              <td>Premier League</td>
              <td>Arsenal</td>
              <td>1 - 2</td>
              <td>Spurs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calculate;
