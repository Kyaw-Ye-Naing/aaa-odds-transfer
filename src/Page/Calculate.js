import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { oddController } from "../controllers/oddsController/oddController";
import { toast } from "react-toastify";
import color from "../config/color";
import Loading from "./components/Loading";

function Calculate() {
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const [events, setEvents] = useState([]);
  const [loadingText, setLoadingText] = useState("Loading .....");
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [isAllFinished, setIsAllFinished] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState();
  const [startDate, setStartDate] = useState(defaultDate);
  const [isShow,setIsShow] = useState(false);
  const [status,setStatus] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");
    //console.log("kokok",userName);
    if (userName == undefined || userRole != 1) {
      history.push("/");
    }
    setUsername(userName);
    setUserRole(userRole);
    getEventResult();
  }, []);

  const getEventResult = () => {
    setLoading(true);
    setLoadingText("Loading .....");
    const userId = localStorage.getItem("userId");
    //console.log("session storage",userId)
    oddController.getEventResult(parseInt(userId), startDate, (data) => {
      console.log("dsta", data)
      setEvents(data.results);
      setIsShow(data.results.length > 0 ? false : true);
      setStatus(data.status);
      setIsAllFinished(data.allFinish);
      setLoading(false);
    });
  };

  const handleCalculate = () => {
    setLoading(true);
    if (isAllFinished == true) {
      setLoadingText("Calculating ......");
      const userId = localStorage.getItem("userId");
      //console.log("session storage",userId)
      oddController.calculateEventResult(parseInt(userId), startDate, (data) => {
        //console.log("dsta", data)
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        getEventResult();
        setLoading(false);

      });
    } else {
      toast.success("Event is not ended!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div>
      <NavBar username={username} calculatecolor={"link-btn-active"} userRole={userRole} />
      <span className="site-header" style={{color:color['dark'].main}}>Voucher Calculation</span>
      {isLoading ? (
        <div style={{ width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
          <Loading />
          <p>{loadingText}</p>
        </div>
      ) : (
        <>
          <div className="text-center">
            {/* <span>Status : {status ? 
            <span className="badge bg-success">Calculated</span> 
            : <span className="badge bg-warning">Pending</span>}</span><br/> */}
            <button
            type="button"
            style={{ marginLeft: '5px',backgroundColor:color['dark'].main,color:'#fff',fontSize:'0.875rem' }}
            disabled={isShow}
            className="btn"
            onClick={() => handleCalculate()}
          >
            <i className="fas fa-file-signature"></i>&nbsp;Calculate Voucher
          </button>
          </div>
          <div className="d-flex" style={{ gap: 5 ,fontSize:'0.8rem'}}>
            <div className="bd-highlight">
              <div className="mb-2">
                <label className="form-label">Start Date</label>
                <input
                  className="form-control"
                  type="date"
                  id="birthday"
                  value={startDate}
                  style={{fontSize:'0.8rem'}}
                  onChange={(e) => setStartDate(e.target.value)}
                  name="goal-calculate"
                />
              </div>
            </div>

            <div className="bd-highlight">
              <button
                type="button"
                className="search-btn btn"
                style={{backgroundColor:color['dark'].main,color:'#fff',fontSize:'0.8rem',marginLeft:5}}
                onClick={() => getEventResult()}
              >
                Search
              </button>
            </div>
          </div>

          <div className="cal-container">
            <div className="table-responsive">
              <table className="table">
                <thead style={{fontSize:'0.875rem',backgroundColor:color['dark'].headerbg}}>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Time</th>
                    <th scope="col">League</th>
                    <th scope="col">Home</th>
                    <th scope="col">Result</th>
                    <th scope="col">Away</th>
                  </tr>
                </thead>
                <tbody style={{fontSize:'0.8rem'}}>
                  {events.length != 0 ?
                    events &&
                    events.map((d, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{`${moment(d.eventTime).format(
                            "hh:mm:ss a"
                          )}`}</td>
                          <td>{d.leagueName}</td>
                          <td>{d.homeName}</td>
                          <td>{d.homeResult} - {d.awayResult}</td>
                          <td>{d.awayName}</td>

                        </tr>
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
        </>
      )}
    </div>
  );
}

export default Calculate;
