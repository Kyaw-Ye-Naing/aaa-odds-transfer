import React,{useState, useEffect} from "react";
import NavBar from "./components/NavBar";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Loader from "../asset/loader";
import { oddController } from "../controllers/oddsController/oddController";
import { toast } from "react-toastify";

function Calculate() {
  const [events, setEvents] = useState([]);
  const [loadingText,setLoadingText] = useState("Loading .....");
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [isAllFinished,setIsAllFinished] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    //console.log("kokok",userName);
    if (userName == undefined || userName != "Bo Bo") {
      history.push("/");
    }
    setUsername(userName);
    getEventResult();
  }, []);

  const getEventResult = () => {
    setLoading(true);
    setLoadingText("Loading .....");
    const userId = localStorage.getItem("userId");
    //console.log("session storage",userId)
    oddController.getEventResult(parseInt(userId), (data) => {
      //console.log("dsta", data)
      setEvents(data.results);
      setIsAllFinished(data.allFinish);
      setLoading(false);
    });
  };

const handleCalculate=()=>{
  setLoading(true);
  if(isAllFinished == true){
    setLoadingText("Calculating ......");
    const userId = localStorage.getItem("userId");
    //console.log("session storage",userId)
    oddController.calculateEventResult(parseInt(userId), (data) => {
      //console.log("dsta", data)
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      getEventResult();
      setLoading(false);
      
    });
  }else{
    toast.success("Event is not ended!!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  
}

  return (
    <div>
    <NavBar username={username} calculatecolor={"link-btn-active"} />
      <span className="site-header">Voucher Calculation</span>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
          <p>{loadingText}</p>
        </div>
      ) : (
        <>
     <div className="text-center mb-1">
     <button
          type="button"
          className="btn btn-success"
          onClick={()=>handleCalculate()}
        >
          <i className="fas fa-file-signature"></i>&nbsp;Calculate Voucher</button>
      </div> 
     
      <div className="cal-container">
        <div className="table-responsive">
        <table className="table table-light">
          <thead className="table-secondary">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Time</th>
              <th scope="col">League</th>
              <th scope="col">Home</th>
              <th scope="col">Result</th>
              <th scope="col">Away</th>
            </tr>
          </thead>
          <tbody>
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
