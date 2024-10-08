import React, { useState,Fragment,useEffect } from "react";
import NavBar from "./components/NavBar";
import moment from "moment";
import Loader from "../asset/loader";
import MyModal from "./components/HistoryModal";
import { useHistory } from "react-router-dom";
import { oddController } from "../controllers/oddsController/oddController";

function Report() {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);
  const [item, setItem] = useState([]);
  const [username, setUsername] = useState("");
  const [itemdetails,setItemdetails] = useState([]);
  const [isEdit, setIsEdit] = useState("");
  const history = useHistory();
  const [userRole,setUserRole] = useState();
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
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");
    //console.log("kokok",userName);
    if (userName == undefined || userRole != 1) {
      history.push("/");
    }
    setUsername(userName);
    setUserRole(userRole);
    getWinLoseReport();
  }, []);

  const getWinLoseReport = () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    //console.log("session storage",userId)
    //console.log("start date",startDate)
    //console.log("end date",endDate)
    oddController.getwinloseReport(parseInt(userId),startDate,endDate,(data) => {
      //console.log("dsta",data)
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
     
      <NavBar username={username} reportcolor={"link-btn-active"} userRole={userRole}/>
       
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

        {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
          <p>Loading .....</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="report-table table table-light">
            <thead className="table-secondary">
              <tr>
              <th scope="col"></th>
              <th scope="col">No</th>
              <th scope="col">Username</th>
              <th scope="col">TurnOver</th>
              <th scope="col">ValidAmount</th>
              <th scope="col" style={{textAlign:'right'}}>W/L Amount</th>
              <th scope="col" style={{textAlign:'right'}}>Commission</th>
              <th scope="col" style={{textAlign:'right'}}>Total Amount</th>
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
                              <a onClick={() => handleClick(i)} style={{marginLeft:'5%',cursor:'pointer'}}>
                              {d.isExpand ? (
                             <i className="fas fa-chevron-up"></i>
                              ) : <i className="fas fa-chevron-down"></i>}   
                              </a>
                            </td>
                            <th scope="row">{i + 1}</th>
                            <td>{d.customerName}</td>
                            <td>{d.turnOver}</td>
                            <td>{d.validAmount}</td>
                            <td style={{textAlign:'right'}}>{d.winLoseAmount}</td>
                            <td style={{textAlign:'right'}}>{d.commission}</td>
                            <td style={{textAlign:'right'}}>{d.totalAmount >= 0 
                            ?<span>{d.totalAmount}</span>
                            :<span style={{color:'red'}}>{d.totalAmount}</span>
                          }</td>
                            
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
              <td colSpan={8} style={{textAlign:'center'}}>no data</td>
            </tr>
                  }
            </tbody>
          </table>
        </div>
        )}
      </div>
       
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
  
  //console.log("expand data",result);
  //console.log("expand data id",customerId);
  //console.log("expand data data",itemdetails);
  
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
    setIsEdit("View")
  }

    return (
      <>
        <tr className="table-secondary">
          
          <th scope="col">No</th>
          <th scope="col">Betted Date</th>
          <th scope="col">Choice</th>
          <th scope="col">Odds</th>
          <th scope="col">Bet Amount</th>
          <th scope="col" style={{textAlign:'right'}}>W/L Amount</th>
          <th scope="col" style={{textAlign:'right'}}>Commission</th>
          <th scope="col" style={{textAlign:'right'}}>Total Amount</th>
        </tr>
        {result &&
          result.map((d, i) => {
            return (
              <Fragment key={i}>
              <tr className="table-secondary">
                
                <th scope="row">{i + 1}</th>
                <td>{`${moment(d.bettedDate).format(
                            "DD-MM-YYYY hh:mm:ss a"
                             )}`}</td>
                <td><span style={{color:d.color}}>{d.bet}</span></td>
                <td>{d.odds}</td>
                <td>{d.amount}</td>
                <td style={{textAlign:'right'}}>{d.status == "Win" 
                            ?<span>{d.winLoseAmount}</span>
                            :<span style={{color:'red'}}>{d.winLoseAmount}</span>
                          }</td>
                <td style={{textAlign:'right'}}> 
                  {
                   d.commission
                  }
                 
                </td>
                <td style={{textAlign:'right'}}>
                  {/* <div className="d-flex">
                    <button
                    className="btn btn-outline-success"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={()=>handleViewModal(d)}
                  >
                   <i className="fas fa-eye"></i>&nbsp;View
                  </button>
                  </div> */}
                  {}
                  {d.winLoseAmount +  d.commission > 0 
                            ?<span>{d.winLoseAmount +  d.commission}</span>
                            :<span style={{color:'red'}}>{d.winLoseAmount +  d.commission}</span>
                          }
                </td>
              </tr>
              </Fragment>
            );
          })}
      </>
    );
  }
  