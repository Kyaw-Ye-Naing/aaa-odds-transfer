import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { data } from "./data";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../asset/loader";
import { oddController } from "../controllers/oddsController/oddController";
import { toast } from "react-toastify";
import Spinner from "../asset/spinner";

function Betting() {
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [bettingData, setBettingData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customer, setCustomer] = useState([]);
  const [username, setUsername] = useState("");
  const history = useHistory();
  const [selectedCustomer, setSelectdCustomer] = useState(0);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    //console.log("kokok",userName);
    if (userName == undefined || userName != "Bo Bo") {
      history.push("/");
    }
    setUsername(userName);
    getBettingEvents();
    getCustomer();
  }, []);

  const handleTeamAdd = (type, data) => {
    const newdata = [...bettingData];
    var isHomeBodyOdd = false;
    if (data.homeTeamId == data.overTeamId) {
      isHomeBodyOdd = true;
    }

    if (type == "home") {
      let obj = {
        rapidEventId: data.rapidEventId,
        leagueId: data.leagueId,
        footballTeamId: data.homeTeamId,
        unders: false,
        overs: false,
        bodyOdd: data.bodyOdds,
        goalOdd: data.goalOdds,
        home: true,
        away: false,
        isHome: true,
        oppositeNameId: data.awayTeamId,
        isHomeBodyOdd: isHomeBodyOdd,
        choice: data.homeTeam,
        choiceOdds: data.bodyOdds,
        amount: 0,
      };
      newdata.push(obj);
    } else if (type == "away") {
      let obj = {
        rapidEventId: data.rapidEventId,
        leagueId: data.leagueId,
        footballTeamId: data.awayTeamId,
        unders: false,
        overs: false,
        bodyOdd: data.bodyOdds,
        goalOdd: data.goalOdds,
        home: false,
        away: true,
        isHome: false,
        oppositeNameId: data.homeTeamId,
        isHomeBodyOdd: isHomeBodyOdd,
        choice: data.awayTeam,
        choiceOdds: data.bodyOdds,
        amount: 0,
      };
      newdata.push(obj);
    } else if (type == "over") {
      let obj = {
        rapidEventId: data.rapidEventId,
        leagueId: data.leagueId,
        footballTeamId: data.homeTeamId,
        unders: false,
        overs: true,
        bodyOdd: data.bodyOdds,
        goalOdd: data.goalOdds,
        home: false,
        away: false,
        isHome: false,
        oppositeNameId: data.awayTeamId,
        isHomeBodyOdd: isHomeBodyOdd,
        choice: data.homeTeam + " (GP Over)",
        choiceOdds: data.goalOdds,
        amount: 0,
      };
      newdata.push(obj);
    } else {
      let obj = {
        rapidEventId: data.rapidEventId,
        leagueId: data.leagueId,
        footballTeamId: data.awayTeamId,
        unders: true,
        overs: false,
        bodyOdd: data.bodyOdds,
        goalOdd: data.goalOdds,
        home: false,
        away: false,
        isHome: false,
        oppositeNameId: data.homeTeamId,
        isHomeBodyOdd: isHomeBodyOdd,
        choice: data.homeTeam + " (GA Under)",
        choiceOdds: data.goalOdds,
        amount: 0,
      };
      newdata.push(obj);
    }

    //console.log("final bar", newdata)
    //console.log("final customer", selectedCustomer)

    setBettingData(newdata);
  };

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
    if(selectedCustomer != 0){

      var tempresilt = bettingData.filter(a=>a.amount == 0);
      //console.log("count",tempresilt);
      if(tempresilt.length > 0){
        toast.error("Please enter bet amount!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsSpinner(false);
      }else{
        oddController.saveBettingEvents(parseInt(userId), parseInt(selectedCustomer), bettingData, (data) => {
          //console.log("dsta",data.data)
          toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setBettingData([]);
          setSelectdCustomer(0);
          setTotalAmount(0);
          setIsSpinner(false);
        });
      }

      
    }else{
      toast.error("Please select user!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsSpinner(false);
    }
    
  }

  const getBettingEvents = () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    //console.log("session storage",userId)
    oddController.getBettingEvents(parseInt(userId), (data) => {
      //console.log("dsta", data.events);
      setEventsData(data.events);
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

  const handleTextChange = (index, amount) => {
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
    newBetting[index].amount = amount;

    setBettingData(newBetting);
    calculate(newBetting);
    //console.log("result---", bettingData);
    // console.log("45 result---",result);
  };

  const handleRemove = (id) => {
    const result = bettingData.filter(a => a.rapidEventId != id);

    setBettingData(result);
  }

  return (
    <div>
      <NavBar username={username} bettingcolor={"link-btn-active"} />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
          <p>Loading .....</p>
        </div>
      ) : (
        <div>
          <span className="site-header">User Betting Page</span>
          <div className="row bet-container">
            <div className="col-12 col-lg-8 col-md-8">
              <div className="event mb-1">
                <table className="table">
                  <thead>
                    <tr className="table-secondary">
                      <th scope="col" width="15">
                        No
                      </th>
                      <th scope="col" width="100">
                        Time
                      </th>
                      <th scope="col" width="100">
                        Home
                      </th>
                      <th scope="col" width="30">
                        Over
                      </th>
                      <th scope="col" width="30">
                        Goal
                      </th>
                      <th scope="col" width="30">
                        Under
                      </th>
                      <th scope="col" width="100">
                        Away
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventsData.length == 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          style={{ textAlign: "center", fontWeight: "bold" }}
                        >
                          No Data
                        </td>
                      </tr>
                    ) : (
                      eventsData &&
                      eventsData.map((d, i) => {
                        return (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{`${moment(d.date).format("hh:mm:ss a")}`}</td>
                            <td>
                              {/* <button type="button" class="btn btn-outline-success"> */}
                              <a
                                className="team"
                                onClick={() => handleTeamAdd("home", d)}
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
                                onClick={() => handleTeamAdd("over", d)}
                                className="btn btn-outline-success"
                                style={{ padding: "0.3rem 1rem" }}
                              >
                                <i className="fas fa-arrow-up"></i>
                              </button>
                            </td>
                            <td>{d.goalOdds}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleTeamAdd("under", d)}
                                className="btn btn-outline-success"
                                style={{ padding: "0.3rem 1rem" }}
                              >
                                <i className="fas fa-arrow-down"></i>
                              </button>
                            </td>
                            <td>
                              <a
                                className="team"
                                onClick={() => handleTeamAdd("away", d)}
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
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                  value={selectedCustomer}
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
                  <table className="table">
                    <thead>
                      <tr className="table-secondary">
                        <th scope="col">No</th>
                        <th scope="col" style={{ width: "40%" }}>
                          Choice
                        </th>
                        <th scope="col" style={{ width: "20%" }}>
                          Odds
                        </th>
                        <th scope="col" style={{ width: "30%" }}>
                          Amount
                        </th>
                        <th scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      { bettingData.length != 0 ?
                        bettingData &&
                        bettingData.map((b, i) => {
                          return (
                            <tr key={i}>
                              <td scope="row" className="text-center">{i + 1}</td>
                              <td>{b.choice}</td>
                              <td>{b.choiceOdds}</td>
                              <td>
                                <input
                                  type="email"
                                  className="form-control"
                                  value={b.amount}
                                  onChange={(e) =>
                                    handleTextChange(i, e.target.value)
                                  }
                                />
                              </td>
                              <td className="text-center">
                                <i className="fas fa-trash-alt" style={{ color: "red" }} onClick={() => handleRemove(b.rapidEventId)}></i>
                              </td>
                            </tr>
                          );
                        })
                      :<tr>
                        <td colSpan={4} style={{textAlign:'center'}}>no data</td>
                        </tr>}
                    </tbody>
                  </table>
                </div>

                <div className=" total-txt mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Total
                  </label>
                  <input
                    type="email"
                    value={totalAmount}
                    readOnly={true}
                    className="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>

                <button 
                type="button" 
                className="btn btn-success"
                 onClick={() => handleSave()}
                 disabled={isSpinner}
                 >
                  {isSpinner ?
                    (
                      <>
                        <span>Saving......</span>
                      </>
                    )
                    :
                    <>
                      <i className="fas fa-save"></i>&nbsp;
                      <span>Save</span>
                    </>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Betting;
