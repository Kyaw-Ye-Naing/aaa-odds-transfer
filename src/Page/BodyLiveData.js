import React, { Fragment, useEffect, useState } from 'react'
import moment from "moment";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loader from "../asset/loader";
import { oddController } from "../controllers/oddsController/oddController";
import AnalysisModal from './components/AnalysisModal';
import color from '../config/color';

const BodyLiveData = () => {
    const defaultDate = moment(new Date()).format("YYYY-MM-DD");
    const [username, setUsername] = useState("");
    const history = useHistory();
    const [startDate, setStartDate] = useState(defaultDate);
    const rowsPerPage = 10;
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState();
    const [serachdiff, setSearchDiff] = useState();
    const [searchText, setSearchText] = useState([]);
    const [searchSingle, setSearchSingle] = useState([]);
    const [singleLiveData,setSingleLiveData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [rapidEventId,setRapidEventId] = useState(0);

    useEffect(() => {
        const userName = localStorage.getItem("userName");
        if (userName == undefined || userName != "Bo Bo") {
            history.push("/");
        }
        setUsername(userName);
        getGetBodyLiveData();
    }, []);

    const getGetBodyLiveData = () => {
        setLoading(true);
        oddController.getSingleLiveData(startDate, true, (data) => {
            console.log("dsta",data)
            setSearchSingle(data.livedata);
            setSingleLiveData(data.livedata);
            setPage(data.livedata.length / rowsPerPage);
            setLoading(false);
        });
    }

    const handlePageClick = async (data) => {
        // console.log(data.selected);
        setPageCount(data.selected);
    };

    const cancelSearch = () => {
        setSearchText("");
        setSearchSingle(data);
        setPage(searchSingle.length / rowsPerPage);
    };

    const handleDiffChange = (e) => {
        setSearchDiff(e.target.value);
        //console.log("value", e.target.value);
        if (e.target.value.length != 0) {
            var temp = searchSingle.filter(
                (v) => v.bodyAmount >=  e.target.value
              );
            
            //console.log("value final",filteredRows);
            setSearchSingle(temp);
            setPage(temp.length / rowsPerPage);
        }
        else {
            setSearchSingle(singleLiveData);
            setPage(singleLiveData.length / rowsPerPage);
        }
    }

    const handleTeamChange = (e) => {
        setSearchText(e.target.value);
        if (e.target.value.length != 0) {
            const filteredRows = searchSingle.filter((row) => {
                return (
                    row.homeTeam.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    row.awayTeam.toLowerCase().includes(e.target.value.toLowerCase())
                );
            });
            setSearchSingle(filteredRows);
            setPage(filteredRows.length / rowsPerPage);
        }
        else {
            setSearchSingle(singleLiveData);
            setPage(singleLiveData.length / rowsPerPage);
        }
    }
     
    return (
        <div>
             <AnalysisModal rapidEventId={rapidEventId}/>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex" style={{ gap: 5 }}>
                    <div className="bd-highlight mb-2">
                        <input
                            className="form-control"
                            type="date"
                            id="birthday"
                            style={{fontSize:'0.8rem'}}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            name="birthday"
                        />
                    </div>

                    <div className="bd-highlight mb-2">
                        <button
                            type="button"
                            className="btn"
                            style={{backgroundColor:color['dark'].main,color:'#fff',fontSize:'0.8rem'}}
                            onClick={() => getGetBodyLiveData()}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div className="mb-2">
                    <input
                        type="text"
                        value={searchText}
                        style={{ textAlign: "left" }}
                        onChange={(e) => handleTeamChange(e)}
                        className="search-txt form-control"
                        id="exampleFormControlInput1"
                        placeholder="search ..."
                    />
                </div>
            </div>
            {isLoading ? (
                <div style={{ textAlign: "center" }}>
                    <Loader />
                    <p>Loading .....</p>
                </div>
            ) : (
                <Fragment>
                    <div className="table-responsive">
                        <table className="table">
                            <thead style={{fontSize:'0.875rem',backgroundColor:color['dark'].headerbg}}>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">EventTime</th>
                                    <th scope="col">Team</th>
                                    <th scope="col">Home Amt</th>
                                    <th scope="col">Away Amt</th>
                                    <th scope="col">Over Amt</th>
                                    <th scope="col">Under Amt</th>
                                    <th scope="col">Body Diff</th>
                                    <th scope="col">Goal Diff</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody style={{fontSize:'0.8rem'}}>
                                {searchSingle.length != 0 ?
                                    searchSingle &&
                                    searchSingle
                                        .slice(
                                            pageCount * rowsPerPage,
                                            pageCount * rowsPerPage + rowsPerPage
                                        )
                                        .map((d, i) => {
                                            return (
                                                <Fragment key={i}>
                                                    <tr >
                                                        <th scope="row">{pageCount * rowsPerPage + i + 1}</th>
                                                        <td>{moment(d.eventTime).format("hh:mm A")}</td>
                                                        <td><span style={{color: d.overTeamId === d.homeTeamId ? 'red' : null,marginRight : 5}}>{d.homeTeam}</span>
                                                        Vs<span style={{color: d.overTeamId === d.awayTeamId ? 'red' : null,marginLeft : 5}}>{d.awayTeam}</span> <br/> ({d.bodyOdds})/({d.goalOdds})</td>
                                                        <td style={{color:d.homeAmount > d.awayAmount ? 'red' : 'black'}}>{d.homeAmount.toLocaleString("en-US")}</td>
                                                        <td style={{color:d.awayAmount > d.homeAmount ? 'red' : 'black'}}>{d.awayAmount.toLocaleString("en-US")}</td>
                                                        <td style={{color:d.over > d.under ? 'red' : 'black'}}>{d.over.toLocaleString("en-US")}</td>
                                                        <td style={{color:d.under > d.over ? 'red' : 'black'}}>{d.under.toLocaleString("en-US")}</td>
                                                        <td style={{color:'orange'}}>{d.maxBody}<br/>{d.bodyAmount.toLocaleString("en-US")}</td>
                                                        <td style={{color:'orange'}}>{d.maxGoal}<br/>{d.goalAmount.toLocaleString("en-US")}</td>
                                                        <td><button data-bs-toggle="modal" data-bs-target="#analysisModal" style={{backgroundColor:color['dark'].main,color:'#fff'}} className='btn btn-sm mt-2' onClick={()=>setRapidEventId(d.rapidId)}>View</button></td>
                                                    </tr>
                                                </Fragment>
                                            )
                                        })
                                    : <tr>
                                        <td colSpan={9} style={{ textAlign: 'center' }}>no data</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={page}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </Fragment>
            )}
        </div>
    )
}

const data = [
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": "87878787",
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Elche",
        "awayTeam": "Cadiz",
        "homeAmount": 30000,
        "awayAmount": 20000,
        "bodyAmount": 10000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": "56565656565",
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 30000,
        "awayAmount": 20000,
        "bodyAmount": 10000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": "777777777",
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": "22222222222",
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 1111111111,
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 2323232323,
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 343434343,
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 999999999,
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 676767676,
        "eventTime": "2023-03-31 12:00:000"
    },
    {
        "leagueName": "Spain Premier Liga",
        "homeTeam": "Barcelona",
        "awayTeam": "Real Betis",
        "homeAmount": 50000,
        "awayAmount": 3000,
        "bodyAmount": 47000,
        "over": 40000,
        "under": 30000,
        "goalAmount": 10000,
        "rapidId": 343434343,
        "eventTime": "2023-03-31 12:00:000"
    },
]
export default BodyLiveData;


