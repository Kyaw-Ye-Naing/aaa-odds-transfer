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
    userId: 1,
  },
  {
    voucher: "GB0988434545",
    username: "bo paing gyi",
    amount: 90000,
    gamblingId: 4,
    userId: 1,
  },
  {
    voucher: "GB0988434545",
    username: "bo paing gyi",
    amount: 90000,
    gamblingId: 6,
    userId: 2,
  },
];

const data1 = [
  {
    userId: 1,
    userName: "Bo Paing Gyi",
    amount: 5000,
    isExpand: false,
  },
  {
    userId: 2,
    userName: "Bo Paing Gyi 2",
    amount: 50000,
    isExpand: false,
  },
];

function History() {
  const [isLoading, setLoading] = useState(false);
  const [item, setItem] = useState(data1);
  const [isEdit, setIsEdit] = useState("");

  const handleClick = (index) => {
    let newitem = [...item];
    newitem[index].isExpand = !newitem[index].isExpand;

    setItem(newitem);
  };
  return (
    <div>
      <DeleteAlertModal />
      <MyModal isEdit={isEdit} historydata={data} />
      <NavBar username={"Bo Bo"} historycolor={"link-btn-active"} />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
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
                    <th scope="col"></th>
                    <th scope="col">Username</th>
                    <th scope="col">Amount</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                {/* <tbody>
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
                </tbody> */}
                <tbody>
                  {item &&
                    item.map((d, i) => {
                      return (
                        <>
                          <tr key={d.gamblingId}>
                            <th scope="row">{i + 1}</th>
                            <td>
                              <a onClick={() => handleClick(i)}>
                              {d.isExpand ? (
                             <i class="fas fa-chevron-up"></i>
                              ) : <i class="fas fa-chevron-down"></i>}   
                              </a>
                            </td>
                            <td></td>
                            <td>{d.userName}</td>
                            <td>{d.amount}</td>
                            <td></td>
                            <td></td>
                          </tr>
                          {d.isExpand ? (
                            <ExpandRow userId={d.userId} data={data} setIsEdit={setIsEdit} />
                          ) : null}
                        </>
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

export function ExpandRow({ data,userId, setIsEdit }) {
const result = data.filter(a=>a.userId == userId);

  return (
    <>
      <tr className="table-secondary">
        <th></th>
        <th scope="col">No</th>
        <th scope="col">Voucher</th>
        <th scope="col">Betted Date</th>
        <th scope="col">Username</th>
        <th scope="col">Amount</th>
        <th scope="col">Action</th>
      </tr>
      {result &&
        result.map((d, i) => {
          return (
            <tr key={d.gamblingId} className="table-secondary">
              <td></td>
              <th scope="row">{i + 1}</th>
              <td>{d.voucher}</td>
              <td>2022-10-19 07:00:00</td>
              <td>{d.username}</td>
              <td>{d.amount}</td>
              <td>
                <div className="d-flex">
                  <button
                    className="btn btn-outline-success"
                    style={{ marginRight: "5px" }}
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => setIsEdit("View")}
                  >
                    <i className="fas fa-eye"></i>&nbsp;View
                  </button>
                  <button
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    style={{ marginRight: "5px" }}
                    data-bs-target="#myModal"
                    onClick={() => setIsEdit("Edit")}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </button>
                  <button
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#deletealertModal"
                    onClick={() => setIsEdit("Edit")}
                  >
                    <i className="fas fa-trash"></i>&nbsp;Delete
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
    </>
  );
}
