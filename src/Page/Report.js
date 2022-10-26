import React, { useState,Fragment,useEffect } from "react";
import NavBar from "./components/NavBar";
import moment from "moment";
import Loader from "../asset/loader";
import MyModal from "./components/HistoryModal";
import { oddController } from "../controllers/oddsController/oddController";

function Report() {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);
  const [item, setItem] = useState([]);
  const [itemdetails,setItemdetails] = useState([]);
  const [isEdit, setIsEdit] = useState("");
  const [itemview,setItemview] = useState({
    "voucher" : "",
    "amount" : 0,
    "status" : "",
    "event" : "",
    "color" : "",
    "bettingId" : 0,
    "eventTime" : "",
    "leagueName" : "",
    "result" : "",
    "odds" : "",
    "customerId" : 0,
    "customerName" : "",
    "bet" : "",
    "bettedDate" : ""
  })

  useEffect(() => {
    getWinLoseReport();
  }, []);

  const getWinLoseReport = () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    //console.log("session storage",userId)
    console.log("start date",startDate)
    console.log("end date",endDate)
    oddController.getwinloseReport(parseInt(userId),startDate,endDate,(data) => {
      console.log("dsta",data)
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

  return (
    <div>
      <MyModal isEdit={isEdit} historydata={itemview} />
      <NavBar username={"Bo Bo"} reportcolor={"link-btn-active"} />

      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : (
        <div>
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
                value={startDate}
                onChange={(e)=>setStartDate(e.target.value)}
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
                value={endDate}
                onChange={(e)=>setEndDate(e.target.value)}
                name="birthday"
              />
            </div>
          </div>
          <div className="p-2 bd-highlight">
            <button 
            type="button" 
            className="search-btn btn btn-success"
            onClick={()=>getWinLoseReport()}
            >
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
              <th scope="col"></th>
              <th scope="col">No</th>
              <th scope="col"></th>
              <th scope="col">Username</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
              <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            {item.length != 0 ?
            item &&
                    item.map((d, i) => {
                      return (
                        <Fragment key={i}>
                          <tr > 
                            <td>
                              <a onClick={() => handleClick(i)} style={{marginLeft:'5%'}}>
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
                            <ReportExpandRow 
                            setItemview={setItemview} 
                            itemview={itemview}
                            customerId={d.customerId} 
                            itemdetails={itemdetails} 
                            setIsEdit={setIsEdit} />
                          ) : null}
                        </Fragment>
                      );
                    })
            :<tr>
              <td colSpan={7} style={{textAlign:'center'}}>no data</td>
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

export default Report;

export function ReportExpandRow({ itemdetails,customerId,setIsEdit,setItemview,itemview}) {
  //const result = data.filter(a=>a.CustomerId == customerId);
  
  var result = itemdetails.filter((el)=>
  {
    return el.customerId == customerId
  }
  );
  
  console.log("expand data",result);
  console.log("expand data id",customerId);
  console.log("expand data data",itemdetails);
  
  const handleViewModal = (result) =>{
    const newdata = {...itemview};
  
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
    setIsEdit("Edit")
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
                <td>{d.bettedDate}</td>
                <td>{d.amount}</td>
                <td>
                  <div className="d-flex">
                    {/* <button
                      className="btn btn-outline-success"
                      style={{ marginRight: "5px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      onClick={() => handleViewModal("View",d)}
                    >
                      <i className="fas fa-eye"></i>&nbsp;View
                    </button> */}
                    <button
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={()=>handleViewModal(d)}
                  >
                   <i className="fas fa-eye"></i>&nbsp;View
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
  