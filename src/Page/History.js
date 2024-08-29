import React, { useState, useEffect, Fragment } from "react";
import NavBar from "./components/NavBar";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import MyModal from "./components/HistoryModal";
import DeleteAlertModal from "./components/DeleteAlertModal";
import { oddController } from "../controllers/oddsController/oddController";
import ReactiveButton from 'reactive-button';
import { Button } from 'react-bootstrap';
import color from "../config/color";
import Loading from "./components/Loading";

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
  const [customer, setCustomer] = useState([]);
  const [goal,setGoal] = useState(0);
  const [unit,setUnit] = useState(0);
  const [selectedCustomer, setSelectdCustomer] = useState(0);
  const [deleteId, setDeleteId] = useState(0);
  const [userRole,setUserRole] = useState();
  const [tab,setTab] = useState("list");
  const [goalbtnColor,setGoalbtnColor] = useState('btn-normal');
  const [bodybtnColor,setBodybtnColor] = useState('btn-activate');
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
    const userRole = localStorage.getItem("userRole");
    //console.log("kokok",userName);
    if (userName == undefined || userRole != 1) {
      history.push("/");
    }
    setUsername(userName);
    setUserRole(userRole);
    getMemberOutstanding();
    getCustomer();
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
    const tempGoal = goal == 0 ? '=' : goal.toString() ;
    const tempUnit = goal > 0 ? unit == 0 ? '+0' : unit > 0 ? '+' + unit.toString() : unit.toString() : goal == 0 && unit == 0 ? 'D' :unit.toString();
    const oddsUpdated =tempGoal + tempUnit;

    oddController.updateOutstanding(bettingid, amount, oddsUpdated,selectedCustomer,(data) => {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      getMemberOutstanding();
    });
  }

  const handleRemoveVoucher = (bettingid) => {
    // console.log("dfdfdfd",id)
    // console.log("dfdfdfd",amount)
    oddController.removeOutstanding(bettingid, (data) => {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      getMemberOutstanding();
    });
  }

  const handleChangeGoal = (value) => {
    if(value <= 12){
       setGoal(value);
    }
  };

  const handleClickUnit = (type) => {
    if(type == "inc"){
      setUnit(prev => prev + 5)
    }else{
      setUnit(prev => prev - 5)
    }
  }

  const getCustomer = () => {
    const userId = localStorage.getItem("userId");
    oddController.getCustomer(parseInt(userId), (data) => {
      setCustomer(data.customer);
    });
  }

  const handleOnClick = (value) => {
    setTab(value);
    // if (value){
    //    setGoalbtnColor('btn-activate');
    //    setBodybtnColor('btn-normal');
    // }else{
    //    setGoalbtnColor('btn-normal');
    //    setBodybtnColor('btn-activate');
    // }
}

  return (
    <div>
      <DeleteAlertModal handleRemoveVoucher={handleRemoveVoucher} deleteId={deleteId} />
      <MyModal
        isEdit={isEdit}
        historydata={itemview}
        amount={amount}
        setAmount={setAmount}
        customer={customer}
        selectedCustomer={selectedCustomer}
        unit={unit}
        goal={goal}
        handleClickUnit={handleClickUnit}
        handleChangeGoal={handleChangeGoal}
        setSelectdCustomer={setSelectdCustomer}
        handleUpdate={handleUpdate}
      />
      <NavBar username={username} historycolor={"link-btn-active"} userRole={userRole}/>
      <span className="site-header" style={{color:color['dark'].main}}>Member Outstanding</span>
      <div className="d-flex justify-content-center mb-2">
        <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" 
        className="btn-normal"
        style={{backgroundColor:tab === "list" ? color['dark'].secondary : color['dark'].secondary3,fontSize:'0.8rem' }} 
        onClick={() => handleOnClick("list")}
        >
          List Mode
        </button>
        <button type="button" 
        className="btn-normal" 
        style={{backgroundColor:tab === "edit" ? color['dark'].secondary : color['dark'].secondary3,fontSize:'0.8rem' }} 
        onClick={() => handleOnClick("edit")}
        >
          Edit Mode
        </button>
        </div>
      </div> 
      { tab === "edit" ?
      <Edit customer={customer}/> :
      <div>
        {isLoading ? (
          <div style={{ width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
            <Loading />
            <p>Loading .....</p>
          </div>
        ) : (
          <div>
            <div className="wrapper">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr style={{fontSize:'0.875rem',backgroundColor:color['dark'].headerbg}}>
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
                  <tbody style={{fontSize:'0.8rem'}}>
                    {item.length != 0 ?
                      item &&
                      item.map((d, i) => {
                        return (
                          <Fragment key={i}>
                            <tr >
                              <td>
                                <a onClick={() => handleClick(i)} style={{ marginLeft: '5%', cursor: 'pointer' }}>
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
                                setSelectdCustomer={setSelectdCustomer}
                                setGoal={setGoal}
                                setUnit={setUnit}
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
}
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
  setSelectdCustomer,
  setUnit,
  setGoal,
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
    setSelectdCustomer(result.customerId);

    const isExist = result.odds.includes("=");
    let tempGoal = 0;
    let tempUnit = 0;

    if (isExist) {
      const arr = result.odds.split(/[=]/);
      tempGoal = 0;
      tempUnit = arr[1] == 'D' ? 0 : parseInt(arr[1]);
      setGoal(tempGoal);
      setUnit(tempUnit);
    } 
    else {
      const isExist_plus = result.odds.includes("+");

      if(isExist_plus){
        const arr = result.odds.split(/[+]/);
        tempGoal = arr[0];
        tempUnit = parseInt(arr[1]);
        setGoal(tempGoal);
        setUnit(tempUnit);
      }
      else{
        const arr = result.odds.split(/[-]/);
      tempGoal = arr[0];
      tempUnit = -1 * parseInt(arr[1]);
      setGoal(tempGoal);
      setUnit(tempUnit);
      }
      
    }
  }

  return (
    <>
      <tr style={{fontSize:'0.875rem',backgroundColor:color['dark'].headerbg}}>
        <th></th>
        <th scope="col">No</th>
        <th scope="col">Betted Date</th>
        <th scope="col">Amount</th>
        <th scope="col">Choice</th>
        <th scope="col">Odds</th>
        <th scope="col">Action</th>
      </tr>
      {result &&
        result.map((d, i) => {
          return (
            <Fragment key={d.bettingId}>
              <tr className="table-secondary" style={{fontSize:'0.8rem'}}>
                <td></td>
                <th scope="row">{i + 1}</th>
                <td>{`${moment(d.bettedDate).format(
                  "DD-MM-YYYY hh:mm:ss a"
                )}`}</td>
                <td>{d.amount}</td>
                <td><span style={{ color: d.color}}>{d.bet}</span></td>
                <td>{d.odds}</td>
                <td>
                  <div className="d-flex">
                    {/* <button
                      className="btn btn-outline-success"
                      style={{ marginRight: "5px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      onClick={() => handleViewModal("View", d)}
                    >
                      <i className="fas fa-eye"></i>&nbsp;View
                    </button> */}
                    <button
                      className="btn"
                      data-bs-toggle="modal"
                      style={{ marginRight: "5px",fontSize:'0.8rem',backgroundColor:color['dark'].main,color:'#fff' }}
                      data-bs-target="#myModal"
                      onClick={() => handleViewModal("Edit", d)}
                    >
                      <i className="fas fa-edit my-icon"></i>&nbsp;Edit
                    </button>
                    <button
                      className="btn"
                      data-bs-toggle="modal"
                      style={{fontSize:'0.8rem',backgroundColor:color['dark'].main,color:'#fff'}}
                      data-bs-target="#deletealertModal"
                      onClick={() => setDeleteId(d.bettingId)}
                    >
                      <i className="fas fa-trash my-icon"></i>&nbsp;Delete
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

const Edit = (props) => {
const {customer} = props;
const [voucherList,setVoucherList] = useState([]);
const [editableData,setEditableData] = useState([]);
const [valueState, setValueState] = useState('idle');

  useEffect(() => {
    console.log("customer",customer)
  },[])

 const handleVoucherView = (customerId)=>{
  setEditableData([]);
  console.log("customer",customerId)
  oddController.getOverallVoucher(parseInt(customerId), (data) => {
    setVoucherList(data.payload);
  });
 }

 const handleVoucherAdd = (v) => {
  console.log("ddd",editableData)
  const arr = editableData.map(obj => ({ ...obj }));
  arr.push(v);
  //const arr = [...editableData];
  //arr.push(v);
  setEditableData(arr);
 }

 const handleVoucherSave = () => {
  setValueState('loading');
  oddController.updateOverallVoucher(editableData, (data) => {
    setValueState('success');
    setVoucherList([]);
    setEditableData([]);
  });
 }

 const handleTextChange = (index, value, type) => {
 let newData = [...editableData];
  if(type === 'odds'){
    editableData[index].odds = value;
  }
  if(type === 'amount'){
    editableData[index].amount = value;
  }
 setEditableData(newData);
};

const handleVoucherRemove = (value) => {
  let newData = [...editableData];
  newData = newData.filter(item => item.bettingId != value.bettingId);
  setEditableData(newData);
}

  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-12 mb-4">
          <div className="bg-light" style={{height:500,overflowY:'scroll'}}>
            <table class="table">
              <thead style={{position:'sticky',fontSize:'0.875rem',backgroundColor:color['dark'].headerbg}}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody style={{fontSize:'0.8rem'}}>
                {customer && customer.map((v, i) =>
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{v.customerName}</td>
                    <td>
                      <Button style={{backgroundColor:color['dark'].main,borderColor:color['dark'].main}} size="sm" onClick={() => handleVoucherView(v.customerId)}>
                        <i className="fa fa-eye"></i>
                      </Button>
                    </td>
                  </tr>
                )
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-4 col-12 mb-2">
        <div className="bg-light">
          <table class="table">
            <thead style={{fontSize:'0.875rem',backgroundColor:color['dark'].headerbg}}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Choice</th>
                <th scope="col">Odds</th>
                <th scope="col">Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody style={{fontSize:'0.8rem'}}>
              { voucherList.length > 0 ? voucherList.map((v,i) =>
              <tr>
                <th scope="row">{i+1}</th>
                <td>{v.choice}</td>
                <td>{v.odds}</td>
                <td>{v.amount}</td> 
                <td>
                  <Button size="sm" onClick={() => handleVoucherAdd(v)} style={{backgroundColor:color['dark'].main,color:'#fff'}}>
                      <i className="fa fa-plus"></i>
                   </Button>
                </td>
              </tr>
                ) : <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>No Data</td>
                </tr>
}
              {/* <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td><Button variant="success" size="sm">Add</Button></td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>@mdo</td>
                <td><Button variant="success" size="sm">Add</Button></td>
              </tr> */}
            </tbody>
          </table>
          </div>
        </div>
        <div className="col-lg-5 col-12 mb-2">
        <div className="bg-light">
        <table class="table">
            <thead style={{fontSize:'0.875rem',backgroundColor:color['dark'].headerbg}}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Choice</th>
                <th scope="col">Odds</th>
                <th scope="col">Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody style={{fontSize:'0.8rem'}}>
              { editableData.length > 0 ? editableData.map((v,i) =>
              <tr>
                <th scope="row">{i+1}</th>
                <td>{v.choice}</td>
                <td>
                    <input
                      type="text"
                      className="form-control"
                      value={v.odds}
                      onChange={(e) =>
                       handleTextChange(i, e.target.value,'odds', v)
                      }
                    />
                </td>
                <td>
                    <input
                      type="text"
                      className="form-control"
                      value={v.amount}
                      width={'100%'}
                    onChange={(e) =>
                     handleTextChange(i, e.target.value, 'amount', v)
                    }
                    />
                </td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleVoucherRemove(v)}>
                    <i className="fa fa-trash"></i>
                    </Button>
                    </td>
              </tr>
) :
<tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>No Data</td>
                </tr>
}
            </tbody>
          </table>
            <div className="d-flex justify-content-center pb-2">
              <ReactiveButton
                buttonState={valueState}
                idleText="Save"
                style={{backgroundColor:color['dark'].main,color:'#fff'}}
                loadingText="Loading"
                successText="Update Successfully!"
                disabled={editableData.length > 0 ? false : true}
                onClick={()=>handleVoucherSave()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
