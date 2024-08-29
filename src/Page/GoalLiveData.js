import React, { Fragment, useEffect, useState } from 'react'
import moment from "moment";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loader from "../asset/loader";
import { oddController } from "../controllers/oddsController/oddController";

const GoalLiveData = ({ }) => {
    const defaultDate = moment(new Date()).format("YYYY-MM-DD");
    const [username, setUsername] = useState("");
    const history = useHistory();
    const [startDate, setStartDate] = useState(defaultDate);
    const rowsPerPage = 5;
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState();
    const [serachdiff, setSearchDiff] = useState();
    const [searchText, setSearchText] = useState([]);
    const [searchSingle, setSearchSingle] = useState([]);
    const [singleLiveData,setSingleLiveData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        console.log("I am useEffect from Goal");
        const userName = localStorage.getItem("userName");
        const userRole = localStorage.getItem("userRole");
        //console.log("kokok",userName);
        if (userName == undefined || userRole > 2) {
            history.push("/");
        }
        setUsername(userName);
        setPage(data.length / rowsPerPage);
        getGetGoalLiveData();
    }, []);

    const getGetGoalLiveData = () => {
        setLoading(true);
        oddController.getSingleLiveData(startDate, false, (data) => {
            //console.log("dsta", data.livedata)
            setSearchSingle(data.livedata);
            setSingleLiveData(data.livedata);
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
                (v) => v.goalAmount >=  e.target.value
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
            <span className="d-flex justify-content-center mt-1">Goal Live Data Report</span>
            <div className="d-flex" style={{ gap: 5 }}>
                <div className="bd-highlight">
                    <div className="mb-2">
                        <label className="form-label">Start Date</label>
                        <input
                            className="form-control"
                            type="date"
                            id="birthday"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            name="birthday"
                        />
                    </div>
                </div>

                <div className="bd-highlight">
                    <button
                        type="button"
                        className="search-btn btn btn-success"
                        onClick={() => getGetGoalLiveData()}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <div className="mb-2">
                    <label>Body Difference</label>
                    <input
                        type="number"
                        style={{ textAlign: "left" }}
                        value={serachdiff}
                        className="search-txt form-control"
                        id="exampleFormControlInput1"
                        placeholder="search ..."
                        onChange={(e) => handleDiffChange(e)}
                    />
                </div>
                <div className="mb-2">
                    <label>Search Team</label>
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
                        <table className="table table-light">
                            <thead>
                                <tr className="table-secondary">
                                    <th scope="col">No</th>
                                    <th scope="col">League Name</th>
                                    <th scope="col">Home Team</th>
                                    <th scope="col">Away Team</th>
                                    <th scope="col">Goal Over</th>
                                    <th scope="col">Goal Under</th>
                                    <th scope="col">Goal Difference</th>
                                </tr>
                            </thead>
                            <tbody>
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
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{d.leagueName}</td>
                                                        <td>{d.homeTeam}</td>
                                                        <td>{d.awayTeam}</td>
                                                        <td style={{color:d.over > d.under ? 'red':'black'}}>{d.over.toLocaleString("en-US")}</td>
                                                        <td style={{color:d.under > d.over ? 'red':'black'}}>{d.under.toLocaleString("en-US")}</td>
                                                        <td style={{color:'orange'}}>{d.goalAmount.toLocaleString("en-US")}</td>
                                                    </tr>
                                                </Fragment>
                                            )
                                        })
                                    : <tr>
                                        <td colSpan={7} style={{ textAlign: 'center' }}>no data</td>
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

export default GoalLiveData