import React, { useState, useEffect, Fragment } from "react";
import NavBar from "./components/NavBar";
import Loader from "../asset/loader";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import MyModal from "./components/HistoryModal";
import DeleteAlertModal from "./components/DeleteAlertModal";
import { oddController } from "../controllers/oddsController/oddController";

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
  const [item, setItem] = useState([]);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [itemdetails, setItemdetails] = useState([]);
  const [isEdit, setIsEdit] = useState("");
  const [amount, setAmount] = useState(0);
  const [deleteId,setDeleteId] = useState(0);
  const [itemview, setItemview] = useState({
    "voucher": "",
    "amount": 0,
    "status": "",
    "event": "",
    "color": "",
    "bettingId": 0,
    "eventTime": "",
    "leagueName": "",
    "result": "",
    "odds": "",
    "customerId": 0,
    "customerName": "",
    "bet": "",
    "bettedDate": "",
  })

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    //console.log("kokok",userName);
    if (userName == undefined || userName != "Bo Bo") {
      history.push("/");
    }
    setUsername(userName);
    getMemberOutstanding();
  }, []);

  const getMemberOutstanding = () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    //console.log("session storage",userId)
    oddController.getOutstanding(parseInt(userId), (data) => {
      //console.log("dsta", data)
      setItem(data.historydata);
      setItemdetails(data.historydetails);
      setLoading(false);
    });
  };

  const handleClick = (index) => {
    let newitem = [...item];
    newitem[index].isExpand = !newitem[index].isExpand;

    setItem(newitem);
  };

  const handleUpdate = (bettingid) => {
    // console.log("dfdfdfd",id)
    // console.log("dfdfdfd",amount)
    oddController.updateOutstanding(bettingid, amount, (data) => {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      getMemberOutstanding();
    });
  }

  const handleRemoveVoucher = (bettingid) => {
    // console.log("dfdfdfd",id)
    // console.log("dfdfdfd",amount)
    oddController.removeOutstanding(bettingid, amount, (data) => {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      getMemberOutstanding();
    });
  }

  return (
    <div>
      <DeleteAlertModal handleRemoveVoucher={handleRemoveVoucher} deleteId={deleteId}/>
      <MyModal
        isEdit={isEdit}
        historydata={itemview}
        amount={amount}
        setAmount={setAmount}
        handleUpdate={handleUpdate}
      />
     <NavBar username={username} historycolor={"link-btn-active"} />
      
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
          <p>Loading .....</p>
        </div>
      ) : (
        <div>
          <span className="site-header">Member Outstanding</span>
          <div className="wrapper">
            <div className="table-responsive">
              <table className="table table-light">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col"></th>
                    <th scope="col">No</th>
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
                  {item.length != 0 ?
                    item &&
                    item.map((d, i) => {
                      return (
                        <Fragment key={i}>
                          <tr >
                            <td>
                              <a onClick={() => handleClick(i)} style={{ marginLeft: '5%',cursor:'pointer' }}>
                                {d.isExpand ? (
                                  <i className="fas fa-chevron-up"></i>
                                ) : <i className="fas fa-chevron-down"></i>}
                              </a>
                            </td>
                            <th scope="row">{i + 1}</th>
                            <td></td>
                            <td>{d.customerName}</td>
                            <td>{d.totalAmount}</td>
                            <td></td>
                            <td></td>

                          </tr>
                          {d.isExpand ? (
                            <ExpandRow
                              setItemview={setItemview}
                              customerId={d.customerId}
                              itemview={itemview}
                              itemdetails={itemdetails}
                              setAmount={setAmount}
                              setDeleteId={setDeleteId}
                              setIsEdit={setIsEdit} />
                          ) : null}
                        </Fragment>
                      );
                    })
                    :
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center' }}>no data</td>
                    </tr>
                  }
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

export function ExpandRow({
   itemdetails, 
   customerId,
    setIsEdit, 
    setItemview,
    itemview,
     setAmount,
     setDeleteId }) {
  //const result = data.filter(a=>a.CustomerId == customerId);

  var result = itemdetails.filter((el) => {
    return el.customerId == customerId
  }
  );

  //console.log("expand data", result);
  //console.log("expand data id", customerId);
  //console.log("expand data data", itemdetails);

  const handleViewModal = (type, result) => {
    const newdata = { ...itemview };

    newdata["voucher"] = result.voucher;
    newdata["amount"] = result.amount;
    newdata["status"] = result.status;
    newdata["event"] = result.event;
    newdata["color"] = result.color;
    newdata["bettingId"] = result.bettingId;
    newdata["eventTime"] = result.eventTime;
    newdata["leagueName"] = result.leagueName;
    newdata["result"] = result.result;
    newdata["odds"] = result.odds;
    newdata["customerId"] = result.customerId;
    newdata["customerName"] = result.customerName;
    newdata["bet"] = result.bet;
    newdata["bettedDate"] = result.bettedDate;
    setItemview(newdata);

    if (type == "View") {
      setIsEdit("View");
    } else {
      setIsEdit("Edit")
    }

    setAmount(result.amount);
  }

  return (
    <>
      <tr className="table-secondary">
        <th></th>
        <th scope="col">No</th>
        <th scope="col">Voucher</th>
        <th scope="col">Betted Date</th>
        <th scope="col">Amount</th>
        <th scope="col">Action</th>
      </tr>
      {result &&
        result.map((d, i) => {
          return (
            <Fragment key={d.bettingId}>
              <tr className="table-secondary">
                <td></td>
                <th scope="row">{i + 1}</th>
                <td>{d.voucher}</td>
                <td>{`${moment(d.bettedDate).format(
                            "DD-MM-YYYY hh:mm:ss a"
                             )}`}</td>
                <td>{d.amount}</td>
                <td>
                  <div className="d-flex">
                    <button
                      className="btn btn-outline-success"
                      style={{ marginRight: "5px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      onClick={() => handleViewModal("View", d)}
                    >
                      <i className="fas fa-eye"></i>&nbsp;View
                    </button>
                    <button
                      className="btn btn-outline-success"
                      data-bs-toggle="modal"
                      style={{ marginRight: "5px" }}
                      data-bs-target="#myModal"
                      onClick={() => handleViewModal("Edit", d)}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </button>
                    <button
                      className="btn btn-outline-success"
                      data-bs-toggle="modal"
                      data-bs-target="#deletealertModal"
                      onClick={() => setDeleteId(d.bettingId)}
                    >
                      <i className="fas fa-trash"></i>&nbsp;Delete
                    </button>
                  </div>
                </td>
              </tr>
            </Fragment>
          );
        })}
    </>
  );
}
