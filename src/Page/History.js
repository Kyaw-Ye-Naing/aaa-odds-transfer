import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Loader from "../asset/loader";
import moment from "moment";
import MyModal from "./components/HistoryModal";
import DeleteAlertModal from "./components/DeleteAlertModal";

const data = [
  {
    voucher: "GB0988434545",
    username: "bo paing gyi",
    amount: 90000,
    gamblingId: 3,
  },
  {
    voucher: "GB0988434545",
    username: "bo paing gyi",
    amount: 90000,
    gamblingId: 4,
  },
  {
    voucher: "GB0988434545",
    username: "bo paing gyi",
    amount: 90000,
    gamblingId: 6,
  },
];

function History() {
  const [isLoading, setLoading] = useState(false);
  const [isEdit,setIsEdit] = useState("");

  return (
    <div>
      <DeleteAlertModal/>
      <MyModal isEdit={isEdit} historydata={data}/>
      <NavBar username={"Bo Bo"} historycolor={"link-btn-active"} />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader/>
        </div>
      ) : (
        <div>
          <span className="site-header">Member Outstanding</span>
          <div className="wrapper">
            <div className="table-responsive">
              <table className="table table-light">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col">No</th>
                    <th scope="col">Voucher</th>
                    <th scope="col">Betted Date</th>
                    <th scope="col">Username</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((d, i) => {
                      return (
                        <tr key={d.gamblingId}>
                          <th scope="row">{i + 1}</th>
                          <td>{d.voucher}</td>
                          <td>2022-10-19 07:00:00</td>
                          <td>{d.username}</td>
                          <td>{d.amount}</td>
                          <td>
                            <button
                              className="btn btn-outline-success"
                              style={{ marginRight: "5px" }}
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"  
                              onClick={()=>setIsEdit("View")}
                            >
                              <i className="fas fa-eye"></i>&nbsp;View
                            </button>
                            <button
                              className="btn btn-outline-success"
                              data-bs-toggle="modal"
                              style={{ marginRight: "5px" }}
                              data-bs-target="#myModal"
                              onClick={()=>setIsEdit("Edit")}
                            >
                              <i className="fas fa-edit"></i>&nbsp;Edit
                            </button>
                            <button
                              className="btn btn-outline-success"
                              data-bs-toggle="modal"
                              data-bs-target="#deletealertModal"
                              onClick={()=>setIsEdit("Edit")}
                            >
                              <i className="fas fa-trash"></i>&nbsp;Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
