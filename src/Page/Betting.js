import React, { useState, useRef } from "react";
import NavBar from "./components/NavBar";
import { data } from "./data";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../asset/loader";
import { oddController } from "../controllers/oddsController/oddController";
import { toast } from "react-toastify";
import Spinner from "../asset/spinner";
import InputAmountModal from "./components/InputAmountModal";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import color from "../config/color";
import Loading from "./components/Loading";
import { useTranslation } from "react-i18next";

function Betting() {
  const {t} = useTranslation("global"); 
  const handle = useFullScreenHandle();
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [bettingData, setBettingData] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [searchTeams, setSearchTeams] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customer, setCustomer] = useState([]);
  const [isConfirm, setIsConfirm] = useState();
  const [bettingConfirm, setBettingConfirm] = useState([]);
  const [username, setUsername] = useState("");
  // const [betamount,setBetAmount] = useState("");
  const history = useHistory();
  const [type, setType] = useState("");
  const [betdata, setBetdata] = useState([]);
  const [selectedCustomer, setSelectdCustomer] = useState(0);
  const [userRole, setUserRole] = useState();
  const [eventType, setEventType] = useState("Upcoming");
  // const [closeModal, setCloseModal]   = useState(false);

  const inputElement = useRef(null);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");

    if (userName == undefined || userRole > 2) {
      history.push("/");
    }
    setUsername(userName);
    setUserRole(userRole);
    getBettingEvents();
    getCustomer();
  }, []);

  const handleTeamAdd = (e) => {

    e.preventDefault();

    const betamount = inputElement.current.value;
    //console.log("use ref value",betamount);
    const newdata = [...bettingData];
    var isHomeBodyOdd = false;
    if (betdata.homeTeamId == betdata.overTeamId) {
      isHomeBodyOdd = true;
    }

    if (type == "home") {
      let obj = {
        rapidEventId: betdata.rapidEventId,
        leagueId: betdata.leagueId,
        footballTeamId: betdata.homeTeamId,
        unders: false,
        overs: false,
        bodyOdd: betdata.bodyOdds,
        goalOdd: betdata.goalOdds,
        home: true,
        away: false,
        isHome: true,
        oppositeNameId: betdata.awayTeamId,
        isHomeBodyOdd: isHomeBodyOdd,
        choice: betdata.homeTeam,
        choiceOdds: betdata.bodyOdds,
        amount: betamount,
      };
      newdata.push(obj);
    } else if (type == "away") {
      let obj = {
        rapidEventId: betdata.rapidEventId,
        leagueId: betdata.leagueId,
        footballTeamId: betdata.awayTeamId,
        unders: false,
        overs: false,
        bodyOdd: betdata.bodyOdds,
        goalOdd: betdata.goalOdds,
        home: false,
        away: true,
        isHome: false,
        oppositeNameId: betdata.homeTeamId,
        isHomeBodyOdd: isHomeBodyOdd,
        choice: betdata.awayTeam,
        choiceOdds: betdata.bodyOdds,
        amount: betamount,
      };
      newdata.push(obj);
    } else if (type == "over") {
      let obj = {
        rapidEventId: betdata.rapidEventId,
        leagueId: betdata.leagueId,
        footballTeamId: betdata.homeTeamId,
        unders: false,
        overs: true,
        bodyOdd: betdata.bodyOdds,
        goalOdd: betdata.goalOdds,
        home: false,
        away: false,
        isHome: false,
        oppositeNameId: betdata.awayTeamId,
        isHomeBodyOdd: isHomeBodyOdd,
        choice: betdata.homeTeam + " (GP Over)",
        choiceOdds: betdata.goalOdds,
        amount: betamount,
      };
      newdata.push(obj);
    } else {
      let obj = {
        rapidEventId: betdata.rapidEventId,
        leagueId: betdata.leagueId,
        footballTeamId: betdata.awayTeamId,
        unders: true,
        overs: false,
        bodyOdd: betdata.bodyOdds,
        goalOdd: betdata.goalOdds,
        home: false,
        away: false,
        isHome: false,
        oppositeNameId: betdata.homeTeamId,
        isHomeBodyOdd: isHomeBodyOdd,
        choice: betdata.homeTeam + " (GA Under)",
        choiceOdds: betdata.goalOdds,
        amount: betamount,
      };
      newdata.push(obj);
    }

    //console.log("final bar", newdata)
    //console.log("final customer", selectedCustomer)

    setBettingData(newdata);
    calculate(newdata);

    //setCloseModal(true);

    document.getElementById("inputamountModal").classList.remove("show");
    document.querySelectorAll(".modal-backdrop")
      .forEach(el => el.classList.remove("modal-backdrop"));

    inputElement.current.value = "";
  };

  const handleOpenModal = (type, data) => {
    setType(type);
    setBetdata(data);
    inputElement.current.focus();
  }

  const handleSave = () => {
    setIsSpinner(true);
    const userId = localStorage.getItem("userId");

    //     const newdata = {...finalSaveData};
    //     newdata["userId"] = parseInt(userId);
    //     newdata["customerId"] = parseInt(selectedCustomer);
    //     newdata["bettingDetails"] = bettingData.map((eventDetail) => {
    //       // delete eventDetail.check;
    //       return eventDetail;
    //     });
    //     setFinalSaveData(newdata);
    //     console.log("kyaw data",newdata);

    if (selectedCustomer != 0) {

      var tempresilt = bettingData.filter(a => a.amount == 0);
      //console.log("count",tempresilt);
      if (tempresilt.length > 0) {
        toast.error("Please enter bet amount!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsSpinner(false);
      } else {
        oddController.saveBettingEvents(parseInt(userId), parseInt(selectedCustomer), bettingData, (data) => {
          //console.log("dsta",data.data)
          toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBettingData([]);
          if (!data.isConfirm) {
            setSelectdCustomer(0);
          }
          setTotalAmount(0);
          setIsConfirm(data.isConfirm);
          setBettingConfirm(data.betConfirmData);
          setIsSpinner(false);
        });
      }
    } else {
      toast.error("Please select user!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsSpinner(false);
    }

  }

  const getBettingEvents = () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    oddController.getBettingEvents(parseInt(userId), (data) => {
      setEventsData(data.events);
      setSearchTeams(data.events.filter(item => moment(item.date).format("yyyy-MM-DD hh:mm:ss a") > moment().format("yyyy-MM-DD hh:mm:ss a")));
      setIsConfirm(data.isConfirm);
      setLoading(false);
    });
  }

  const getCustomer = () => {
    const userId = localStorage.getItem("userId");
    oddController.getCustomer(parseInt(userId), (data) => {
      //console.log("dsta", data.events);
      setCustomer(data.customer);
    });
  }

  const calculate = (list) => {
    let sum = list.map((v) => Number(v.amount)).reduce((p, c) => p + c);
    setTotalAmount(sum);
  };

  const handleTextChange = (index, value, type, data) => {
    //console.log("result---", amount);
    //const newdata = parseInt(totalAmount) + parseInt(amount);
    //setTotalAmount(newdata);

    // const index = bettingData.findIndex(
    //   (a) => a.rapidEventId == data.rapidEventId
    // );
    // bettingData[index] = { ...bettingData[index], amount };
    // //console.log(bettingData)
    // let newBetting = [...bettingData];

    //   const index = bettingData.findIndex(
    //       (a) => a.rapidEventId == data.rapidEventId
    //      );

    //      console.log("original",i);

    //      console.log("finding",index);
    //   let newBetting = [...bettingData];
    //  newBetting[index].amount = amount;

    let newBetting = [...bettingData];
    if(type === 'odds'){
      if(data.overs || data.unders)
      {
        newBetting[index].goalOdd = value;
        newBetting[index].choiceOdds = value;
      }
      if(data.home || data.away)
      {
        newBetting[index].bodyOdd = value;
        newBetting[index].choiceOdds = value;
      }
    }
    if(type === 'amount'){
      newBetting[index].amount = value;
      calculate(newBetting);
    }

    setBettingData(newBetting);

    //console.log("result---", bettingData);
    // console.log("45 result---",result);
  };

  const handleRemove = (index) => {
    console.log("before", bettingData)
    const result = bettingData.filter((_, i) => i !== index);
    console.log("after", result)
    setBettingData(result);
    if (result.length > 0) {
      calculate(result);
    } else {
      setTotalAmount(0);
    }
  }

  const handleCheckbox = (index) => {
    console.log("index", index);
    // const index = bettingConfirm.findIndex((v) => {
    //   return v.rapidEventId == rapidId;
    // });
    const obj = [...bettingConfirm];
    obj[index].select = !obj[index].select;
    console.log("index", obj);
    setBettingConfirm(obj);
  }

  const handleConfrimSave = () => {
    const userId = localStorage.getItem("userId");
    let newbettingConfirm = bettingConfirm.filter((e) => e.select == true);
    console.log("confirm save", newbettingConfirm);

    oddController.saveBettingEventsConfirm(parseInt(userId), parseInt(selectedCustomer), newbettingConfirm, (data) => {
      //console.log("dsta",data.data)
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setBettingData([]);
      setSelectdCustomer(0);
      setTotalAmount(0);
      setIsConfirm(data.isConfirm);
      //setIsSpinner(false);
    });
  }

  const onChangeBetting = (e) => {
    setSearchText();
    if (e.target.value.length != 0) {
      const filteredRows = eventsData.filter((row) => {
        return row.homeTeam
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
          row.awayTeam
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
      });
      setSearchTeams(filteredRows);
      //console.log("hhh",filteredRows);
      // setPage(Math.ceil(filteredRows.length / rowsPerPage));
    } else {
      setSearchTeams([...eventsData]);
    }
  }

  const cancelSearch = () => {
    setSearchText("");
    const temp_data = eventType === "Upcoming" ? eventsData.filter(item => moment(item.date).format("yyyy-MM-DD hh:mm:ss a") > moment().format("yyyy-MM-DD hh:mm:ss a")) : 
    eventType === "Previous" ? eventsData.filter(item => moment(item.date).format("yyyy-MM-DD hh:mm:ss a") < moment().format("yyyy-MM-DD hh:mm:ss a")) : eventsData;
    setSearchTeams(temp_data);
  };

  const handleEventCheckbox = (type) => {
    setEventType(type);
    if (type === 'Upcoming') {
      //var tempData = searchTeams.filter(item => item.data > moment().format("yyyy-MM-DD hh:mm:ss"));
      var tempData = eventsData.filter(item => moment(item.date).format("yyyy-MM-DD hh:mm:ss a") > moment().format("yyyy-MM-DD hh:mm:ss a"));
      setSearchTeams([...tempData]);
    }
    if(type === 'Previous')
    {
      var tempData = eventsData.filter(item => moment(item.date).format("yyyy-MM-DD hh:mm:ss a") < moment().format("yyyy-MM-DD hh:mm:ss a"));
      setSearchTeams([...tempData]);
    }
    if(type === 'All Event')
    {
      setSearchTeams([...eventsData]);
    }
  }

  return (
    <div>
      <NavBar username={username} bettingcolor={"link-btn-active"} userRole={userRole} />
      <button onClick={handle.enter} className='btn btn-light' style={{ float: 'right' }}>
        <i className="fa-solid fa-maximize" style={{ color: 'gray', fontSize: '1rem' }}></i>
      </button>
      <FullScreen handle={handle}>
      {!isConfirm ?
        isLoading ? (
          <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <Loading/>
            <p>Loading .....</p>
          </div>
        ) : (   
          <React.Fragment>
              <InputAmountModal
              t={t}
                //closeModal={closeModal}
                inputElement={inputElement}
                handleTeamAdd={handleTeamAdd}
              />
              <div style={{ background: handle.active ? "#fff" : null, height: handle.active ? '100%' : null }} className={handle.active ? 'container-fluid' : null}>
                <span className="site-header" style={{color:color['dark'].main}}>{t('userBettingPage')}</span>
                {handle.active ?
                  <button onClick={handle.exit} className='btn btn-light' style={{ position: 'absolute', top: 5, right: 5 }}>
                    <i className="fa-solid fa-minimize" style={{ color: 'gray', fontSize: '1rem' }}></i>
                  </button> : null
                }
                <div className="input-gp" style={{ marginBottom: 5 }}>
                  <input
                    type="email"
                    className="custom-input"
                    id="exampleFormControlInput1"
                    placeholder="search ..."
                    style={{ width: "10rem",height:35,fontSize:'0.87rem' }}
                    value={searchText}
                    onChange={(e) => onChangeBetting(e)}
                  />
                  <button
                    type="button"
                    className="btn"
                    style={{backgroundColor:color['dark'].secondary3}}
                    onClick={() => cancelSearch()}
                  >
                    <i
                      className="fa-solid fa-circle-xmark"
                      style={{ fontSize: 15 }}
                    ></i>
                  </button>
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" style={{backgroundColor:'white',color:'#000',borderColor:'gray',marginLeft:5,fontSize:'0.87rem'}}>
                     {eventType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{fontSize:'0.87rem'}}>
                      <Dropdown.Item onClick={() => handleEventCheckbox('Upcoming')}>{t('upcoming')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleEventCheckbox('All Event')}>{t('allEvents')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleEventCheckbox('Previous')}>{t('previousEvent')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="row bet-container">
                  <div className="col-12 col-lg-8 col-md-8">
                    <div className="event mb-1">
                      <table className="table">
                        <thead style={{ position: 'sticky', top: 0,fontSize:'0.87rem' }}>
                          <tr style={{backgroundColor:color['dark'].headerbg}}>
                            <th scope="col" width="15">
                              {t('no')}
                            </th>
                            <th scope="col" width="50">
                              {t('time')}
                            </th>
                            <th scope="col" width="100">
                              {t('home')}
                            </th>
                            <th scope="col" width="30">
                            {t('over')}
                            </th>
                            <th scope="col" width="30">
                              {t('goalOdd')}
                            </th>
                            <th scope="col" width="30">
                            {t('under')}
                            </th>
                            <th scope="col" width="100">
                            {t('away')}
                            </th>
                          </tr>
                        </thead>
                        <tbody style={{fontSize:'0.8rem'}}>
                          {eventsData.length == 0 ? (
                            <tr>
                              <td
                                colSpan={7}
                                style={{ textAlign: "center", fontWeight: "bold" }}
                              >
                               {t('nodata')}
                              </td>
                            </tr>
                          ) : (
                            searchTeams &&
                            searchTeams.map((d, i) => {
                              return (
                                <tr key={i}>
                                  <th scope="row">{i + 1}</th>
                                  <td>{`${moment(d.date).format("hh:mm a")}`}</td>
                                  <td>
                                    {/* <button type="button" class="btn btn-outline-success"> */}
                                    <a
                                      className="team"
                                      data-bs-toggle="modal"
                                      data-bs-target="#inputamountModal"
                                      onClick={() => handleOpenModal("home", d)}
                                    >
                                      {d.homeTeamId == d.overTeamId ? (
                                        <span>
                                          {d.homeTeam}({d.bodyOdds})
                                        </span>
                                      ) : (
                                        <span>{d.homeTeam}</span>
                                      )}
                                    </a>
                                    {/* </button> */}
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#inputamountModal"
                                      onClick={() => handleOpenModal("over", d)}
                                      className="btn btn-outline-success"
                                      style={{ padding: "0.05rem 0.7rem" }}
                                    >
                                      <i className="fas fa-arrow-up"></i>
                                    </button>
                                  </td>
                                  <td>{d.goalOdds}</td>
                                  <td>
                                    <button
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#inputamountModal"
                                      onClick={() => handleOpenModal("under", d)}
                                      className="btn btn-outline-success"
                                      style={{ padding: "0.05rem 0.7rem" }}
                                    >
                                      <i className="fas fa-arrow-down"></i>
                                    </button>
                                  </td>
                                  <td>
                                    <a
                                      className="team"
                                      data-bs-toggle="modal"
                                      data-bs-target="#inputamountModal"
                                      onClick={() => handleOpenModal("away", d)}
                                    >
                                      {d.awayTeamId == d.overTeamId ? (
                                        <span>
                                          {d.awayTeam}({d.bodyOdds})
                                        </span>
                                      ) : (
                                        <span>{d.awayTeam}</span>
                                      )}
                                    </a>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4 col-md-4">
                    <div className="panel">
                      <select
                        className="form-select mb-3 shadow-none"
                        aria-label=".form-select-lg example"
                        value={selectedCustomer}
                        style={{fontSize:'0.87rem'}}
                        onChange={(e) => setSelectdCustomer(e.target.value)}
                      >
                        <option defaultValue={0}>
                          --- Please Select ---
                        </option>
                        {
                          customer && customer.map((data, i) => {
                            return (
                              <option key={data.customerId} value={data.customerId}>{data.customerName}</option>
                            )
                          })
                        }
                      </select>

                      <div className="panel-details">
                        <table className="table table-responsive">
                          <thead style={{fontSize:'0.87rem'}}>
                            <tr style={{backgroundColor:color['dark'].headerbg}}>
                              <th scope="col">
                                {t('no')}
                              </th>
                              <th scope="col">
                                {t('choice')}
                              </th>
                              <th scope="col">
                                {t('odds')}
                              </th>
                              <th scope="col">
                                {t('amount')}
                              </th>
                              <th scope="col">
                                {t('action')}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {bettingData.length != 0 ?
                              bettingData &&
                              bettingData.map((b, i) => {
                                
                                let isExist = b.choiceOdds.includes("=");
                                let tempGoal = 0;
                                let tempUnit = 0;

                                if (isExist) {
                                  const arr = b.choiceOdds.split(/[=]/);
                                  tempGoal = 0;
                                  tempUnit = arr[0] == 'D' ? 0 : parseInt(arr[1]);
                                } else {
                                  const isExist_plus = b.choiceOdds.includes("+");

                                  if (isExist_plus) {
                                    const arr = b.choiceOdds.split(/[+]/);
                                    tempGoal = arr[0];
                                    tempUnit = parseInt(arr[1]);
                                  }
                                  else {
                                    const arr = b.choiceOdds.split(/[-]/);
                                    tempGoal = arr[0];
                                    tempUnit = -1 * parseInt(arr[1]);
                                  }
                                }

                                return (
                                  <tr key={i} style={{fontSize:'0.8rem'}}>
                                    <td scope="row" className="text-center">{i + 1}</td>
                                    <td>{b.choice}</td>
                                    <td>
                                      {/* {b.choiceOdds} */}
                                      <input
                                        type="email"
                                        className="custom-input"
                                        value={b.choiceOdds}
                                        style={{fontSize:'0.8rem',height:20,width:80}}
                                        onChange={(e) =>
                                          handleTextChange(i, e.target.value,'odds',b)
                                        }
                                      />
                                    </td>
                                    <td>
                                      {/* {b.amount} */}
                                      <input
                                        type="email"
                                        className="custom-input"
                                        value={b.amount}
                                        style={{fontSize:'0.8rem',height:20,width:80}}
                                        onChange={(e) =>
                                          handleTextChange(i, e.target.value, 'amount',b)
                                        }
                                      />
                                    </td>
                                    <td className="text-center">
                                      <i className="fas fa-trash-alt"
                                        style={{ color: "red", cursor: 'pointer' }}
                                        onClick={() => handleRemove(i)}></i>
                                    </td>
                                  </tr>
                                );
                              })
                              : <tr>
                                <td colSpan={4} style={{ textAlign: 'center' }}>{t('nodata')}</td>
                              </tr>}
                          </tbody>
                        </table>
                      </div>

                      <div className="d-flex justify-content-between align-items-end mb-3">
                      <button
                        type="button"
                        className="btn"
                        style={{backgroundColor:color['dark'].main,color:'#fff',fontSize:'0.8rem'}}
                        onClick={() => handleSave()}
                        disabled={isSpinner}
                      >
                        {isSpinner ?
                          (
                            <>
                              <span>{t('saving')}......</span>
                            </>
                          )
                          :
                          <>
                            <i className="fas fa-save my-icon" style={{color:'#fff'}}></i>&nbsp;
                            <span style={{fontSize:'0.875rem'}}>{t('save')}</span>
                          </>
                        }
                      </button>
                      <div>
                        <label htmlFor="exampleFormControlInput1" className="form-label" style={{fontSize:'0.8rem',fontWeight:'bold'}}>
                          {t('total')}
                        </label>
                        <input
                          type="email"
                          value={totalAmount}
                          readOnly={true}
                          disabled
                          className="custom-input"
                          id="exampleFormControlInput1"
                          style={{fontSize:'0.875rem',height:35}}
                        />
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </React.Fragment>
        ) :
          <div style={{ background: handle.active ? "#fff" : null, height: handle.active ? '100%' : null }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="card mt-5" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                <div className="card-body">
                  <h4 style={{ textAlign: "center" }}>{t('bettingConfirmBox')}</h4>
                  <table className="table">
                    <thead style={{fontSize:'0.87rem'}}>
                      <tr className="table-secondary">
                        <th scope="col" width="15">
                          {t('no')}
                        </th>
                        <th scope="col" width="300">
                          {t('betType')}
                        </th>
                        <th scope="col" width="100">
                          {t('betAmt')}
                        </th>
                        <th scope="col" width="100">
                        {t('overAmt')}
                        </th>
                        <th scope="col" width="30">
                        {t('confirm')}
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{fontSize:'0.8rem'}}>
                      {bettingConfirm.length == 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            style={{ textAlign: "center", fontWeight: "bold" }}
                          >
                           {t('nodata')}
                          </td>
                        </tr>
                      ) : (
                        bettingConfirm &&
                        bettingConfirm.map((d, i) => {
                          return (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td>{d.choice}</td>
                              <td>
                                {d.amount}
                              </td>
                              <td>
                                {d.extraAmount}
                              </td>
                              <td>
                                <div className="form-check">
                                  <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={() => handleCheckbox(i)} />
                                </div>
                              </td>

                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="button" className="btn" style={{backgroundColor:color['dark'].main,color:'white',fontSize:'0.8rem'}} onClick={() => handleConfrimSave()}>
                      <i className="fa fa-save"></i>&nbsp;{t('save')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
      </FullScreen>
    </div>
  );
}

const data22 = [
  {
    "rapidEventId": 11223344,
    "homeTeamId": 1,
    "awayTeamId": 2,
    "goalOdds": "1+70",
    "bodyOdds": "2-50",
    "overTeamId": 1,
    "underTeamId": 2,
    "date": "2023-04-24 03:00 PM",
    "homeTeam": "Spurs",
    "awayTeam": "Man U"
  },
  {
    "rapidEventId": 343434232,
    "homeTeamId": 3,
    "awayTeamId": 4,
    "goalOdds": "2+70",
    "bodyOdds": "3-50",
    "overTeamId": 4,
    "underTeamId": 3,
    "date": "2023-04-24 03:00 PM",
    "homeTeam": "Chelsea",
    "awayTeam": "Arsenal"
  },
  {
    "rapidEventId": 6575757,
    "homeTeamId": 5,
    "awayTeamId": 6,
    "goalOdds": "1+70",
    "bodyOdds": "2-50",
    "overTeamId": 5,
    "underTeamId": 6,
    "date": "2023-04-24 03:00 PM",
    "homeTeam": "Liverpool",
    "awayTeam": "Newcastle Utd"
  }
]

const data33 = [
  {
    "rapidEventId": 771,
    "leagueId": 45,
    "footballTeamId": 1,
    "unders": true,
    "overs": false,
    "bodyOdd": "1+40",
    "goalOdd": "2+70",
    "home": false,
    "away": false,
    "isHome": false,
    "oppositeNameId": 2,
    "isHomeBodyOdd": true,
    "choice": "Man U" + " (GA Under)",
    "choiceOdds": "1+40",
    "amount": 400,
    "extraAmount": 300,
    "select": false,
  },
  {
    "rapidEventId": 772,
    "leagueId": 45,
    "footballTeamId": 1,
    "unders": true,
    "overs": false,
    "bodyOdd": "1+40",
    "goalOdd": "2+70",
    "home": false,
    "away": false,
    "isHome": false,
    "oppositeNameId": 2,
    "isHomeBodyOdd": true,
    "choice": "Man U" + " (GA Under)",
    "choiceOdds": "1+40",
    "amount": 400,
    "extraAmount": 300,
    "select": false,
  },
  {
    "rapidEventId": 773,
    "leagueId": 45,
    "footballTeamId": 1,
    "unders": true,
    "overs": false,
    "bodyOdd": "1+40",
    "goalOdd": "2+70",
    "home": false,
    "away": false,
    "isHome": false,
    "oppositeNameId": 2,
    "isHomeBodyOdd": true,
    "choice": "Man U" + " (GA Under)",
    "choiceOdds": "1+40",
    "amount": 400,
    "extraAmount": 300,
    "select": false,
  }
]

export default Betting;
