import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Loader from "../asset/loader";
import moment from "moment";
import MyModal from "./components/MyModal";

const data = [
  {
    voucher: "GB0988434545",
    username: "bo paing gyi",
    amount: 90000,
    status: "Win",
    gamblingId: 3,
  },
  {
    voucher: "GB0988434545",
    username: "bo paing gyi",
    amount: 90000,
    status: "Win",
    gamblingId: 4,
  },
  {
    voucher: "GB0988434545",
    username: "bo paing gyi",
    amount: 90000,
    status: "Win",
    gamblingId: 6,
  },
];

function History() {
  const [isLoading, setLoading] = useState(false);
  const [isEdit,setIsEdit] = useState(false);

  const handleOpenModal = (type) =>{
    if(type == "edit"){
        setIsEdit(true);
    }else{
        setIsEdit(false);
    }
   
  }

  return (
    <div>
      <MyModal />
      <NavBar username={"Bo Bo"} historycolor={"link-btn-active"} />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader isEdit={isEdit}/>
        </div>
      ) : (
        <div>
          <span className="site-header">History Page</span>
          <div className="wrapper">
            <div className="table-responsive">
              <table class="table table-light">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col">No</th>
                    <th scope="col">Voucher</th>
                    <th scope="col">Betted Date</th>
                    <th scope="col">Username</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
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
                          <td>{d.status}</td>
                          <td>
                            <button
                              className="btn btn-outline-success"
                              style={{ marginRight: "5px" }}
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"  
                              onClick={()=>handleOpenModal("view")}
                            >
                              <i class="fas fa-eye"></i>
                            </button>
                            <button
                              className="btn btn-outline-success"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                              onClick={()=>handleOpenModal("edit")}
                            >
                              <i class="fas fa-edit"></i>
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
