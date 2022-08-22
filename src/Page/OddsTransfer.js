import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment";
import MyColor from "../config/color";
import { toast } from "react-toastify";
import { oddController } from "../controllers/oddsController/oddController";

const TeamData = [
  {
    teamName: "Manchester City",
    teamId: 1,
    isSelected: false,
  },
  {
    teamName: "Chelsea",
    teamId: 2,
    isSelected: false,
  },
  {
    teamName: "Manchester United",
    teamId: 3,
    isSelected: false,
  },
  {
    teamName: "Everton",
    teamId: 4,
    isSelected: false,
  },
  {
    teamName: "Aston",
    teamId: 5,
    isSelected: false,
  },
  {
    teamName: "Leeds",
    teamId: 6,
    isSelected: false,
  },
  {
    teamName: "Fulham",
    teamId: 7,
    isSelected: false,
  },
  {
    teamName: "Southomtam",
    teamId: 8,
    isSelected: false,
  },
  {
    teamName: "Arsenal",
    teamId: 9,
    isSelected: false,
  },
  {
    teamName: "Spurs",
    teamId: 10,
    isSelected: false,
  },
  {
    teamName: "Liverpool",
    teamId: 11,
    isSelected: false,
  },
  {
    teamName: "Crystal Palace",
    teamId: 12,
    isSelected: false,
  },
  {
    teamName: "Nottenham",
    teamId: 13,
    isSelected: false,
  },
  {
    teamName: "Wolves",
    teamId: 14,
    isSelected: false,
  },
];

const OddsData = [
  {
    teamName: "Manchester City",
    teamId: 1,
    oldBody: "1+80",
    oldGoal: "3-70",
    newBody: "1+50",
    newGoal: "3-70",
    isBodyChange: true,
    isGoalChange: false,
  },
  {
    teamName: "Chelsea",
    teamId: 2,
    oldBody: "1+50",
    oldGoal: "2-80",
    newBody: "1+30",
    newGoal: "2-30",
    isBodyChange: true,
    isGoalChange: true,
  },
  {
    teamName: "Manchester United",
    teamId: 3,
    oldBody: "1+80",
    oldGoal: "3-70",
    newBody: "1+80",
    newGoal: "3-40",
    isBodyChange: false,
    isGoalChange: true,
  },
  {
    teamName: "Everton",
    teamId: 4,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+40",
    newGoal: "2-90",
    isBodyChange: true,
    isGoalChange: true,
  },
  {
    teamName: "Aston Villa",
    teamId: 5,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "=-90",
    newGoal: "2-70",
    isBodyChange: true,
    isGoalChange: false,
  },
  {
    teamName: "Leeds",
    teamId: 6,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "3+100",
    isBodyChange: false,
    isGoalChange: true,
  },
  {
    teamName: "Fulham",
    teamId: 7,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+90",
    newGoal: "2-70",
    isBodyChange: true,
    isGoalChange: false,
  },
  {
    teamName: "Southamton",
    teamId: 8,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "3+90",
    isBodyChange: false,
    isGoalChange: true,
  },
  {
    teamName: "Arsenal",
    teamId: 9,
    oldBody: "1+30",
    oldGoal: "2-70",
    newBody: "1+90",
    newGoal: "2-90",
    isBodyChange: true,
    isGoalChange: true,
  },
  {
    teamName: "Spurs",
    teamId: 10,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "2-10",
    newGoal: "3-70",
    isBodyChange: true,
    isGoalChange: true,
  },
  {
    teamName: "Liverpool",
    teamId: 11,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "3+50",
    isBodyChange: false,
    isGoalChange: true,
  },
  {
    teamName: "Crystal Palace",
    teamId: 12,
    oldBody: "=-50",
    oldGoal: "2-70",
    newBody: "=-50",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false,
  },
  {
    teamName: "Nottinham",
    teamId: 13,
    oldBody: "=-70",
    oldGoal: "2-70",
    newBody: "=-70",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false,
  },
  {
    teamName: "Wolves",
    teamId: 14,
    oldBody: "=-30",
    oldGoal: "2-90",
    newBody: "=-30",
    newGoal: "2-90",
    isBodyChange: false,
    isGoalChange: false,
  },
];

const CopyData = [
  {
    teamName: "Manchester City",
    teamId: 1,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "1+50",
    Goal: "3-70",
  },
  {
    teamName: "Chelsea",
    teamId: 2,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "1+30",
    Goal: "2-30",
  },
  {
    teamName: "Manchester United",
    teamId: 3,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "1+80",
    Goal: "3-40",
  },
  {
    teamName: "Everton",
    teamId: 4,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "1+40",
    Goal: "2-90",
  },
  {
    teamName: "Aston Villa",
    teamId: 5,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "=-90",
    Goal: "2-70",
  },
  {
    teamName: "Leeds",
    teamId: 6,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "1+80",
    Goal: "3+100",
  },
  {
    teamName: "Fulham",
    teamId: 7,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "1+90",
    Goal: "2-70",
  },
  {
    teamName: "Southamtom",
    teamId: 8,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "1+80",
    Goal: "3+90",
  },
  {
    teamName: "Arsenal",
    teamId: 9,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "1+90",
    Goal: "2-90",
  },
  {
    teamName: "Spurs",
    teamId: 10,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "2-10",
    Goal: "3-70",
  },
  {
    teamName: "Liverpool",
    teamId: 11,
    eventTime: "2022-08-20 23:00:00.000",
    Body: "1+80",
    Goal: "3+50",
  },
];

// Example items, to simulate f
function OddsTransfer() {
  const rowsPerPage = 10;
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState([]);
  const [searchedTeam, setSearchedTeam] = useState([]);

  const [oddsitem, setOddsItem] = useState([]);
  const [oddsPageCount, setOddsPageCount] = useState(0);
  const [oddpage, setOddPage] = useState(0);
  const [searchOdd, setSearchOdd] = useState([]);
  const [searchedOdd, setSearchedOdd] = useState([]);

  const [copyitem, setCopyItem] = useState([]);
  const [copyPageCount, setCopyPageCount] = useState(0);
  const [copypage, setCopyPage] = useState(0);
  const [newcopyPage,setNewcopyPage] = useState([]);
  const [searchCopy, setSearchCopy] = useState([]);
  const [searchedCopy, setSearchedCopy] = useState([]);

  const [selectedTeams, setSelectedTeam] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    getTeamFunction();
    //setItems(TeamData);
    //setSearchedTeam(TeamData);
    //setOddsItem(OddsData);
    //setSearchedOdd(OddsData);
    //setCopyItem(CopyData);
    //setSearchedCopy(CopyData);
    //setPage(Math.ceil(TeamData.length / rowsPerPage));
    //setOddPage(Math.ceil(OddsData.length / rowsPerPage));
    //setCopyPage(Math.ceil(CopyData.length / rowsPerPage));
  }, []);

  const getTeamFunction = () => {
    oddController.getAllTeams((data) => {
      console.log("dsta",data.data)
      setItems(data.data);
      setSearchedTeam(data.data);
      setPage(Math.ceil(data.data.length / rowsPerPage));
    });
  }

  const handlePageClick = async (data) => {
    // console.log(data.selected);
    setPageCount(data.selected);
  };

  const handleOddsPageClick = async (data) => {
    // console.log(data.selected);
    setOddsPageCount(data.selected);
  };

  const handleCopyPageClick = async (data) => {
    //console.log(data.selected);
    setCopyPageCount(data.selected);
  };

  const handleChecked = (id) => {
    //console.log("id",id);
    //console.log("before",items);
    const index = items.findIndex((v) => {
      return v.teamId == id;
    });

    //console.log("index",index);

    items[index].isSelected = !items[index].isSelected;

    let isTrue = items.filter((e) => e.isSelected == true);
    //setItems(items);
    setSelectedTeam(isTrue.length);
    setIsAllSelected(false);
    //console.log("after",items);
  };

  const handleCheckedAll = () => {
    var newarr = [...items];
    newarr.map((data) => {
      data.isSelected = !isAllSelected;
    });
    // console.log("check",isAllSelected)
    // console.log("data",newarr)
    setIsAllSelected(!isAllSelected);
    console.log("check", isAllSelected);
    if (!isAllSelected) {
      console.log("hey");
      setSelectedTeam(newarr.length);
    } else {
      setSelectedTeam(0);
    }

    setItems(newarr);
  };

  const teamsHandleSave = () => {
    const filterResult = items.filter(function (x) { return x.isSelected == true; });
    const rapidEventList = [];

    filterResult.map(x =>
      rapidEventList.push(x.rapidEventId)
    );

    //console.log("selected data",rapidEventList);

    oddController.saveSelectedTeams(rapidEventList, (data) => {
      setOddsItem(data.data);
      setSearchedOdd(data.data);
      setCopyItem(data.datacc);
      setSearchedCopy(data.datacc);
      setNewcopyPage(data.datacc);
      setOddPage(Math.ceil(data.data.length / rowsPerPage));
      setCopyPage(Math.ceil(data.datacc.length / rowsPerPage));
      toast.success(data.message, {
        position: toast.POSITION.TOP_LEFT,
      });
    });
  };

  const refreshOdds = () => {
    oddController.updateResfreshOdds((data) => {
      setOddsItem(data.data);
      setSearchedOdd(data.data);
      setCopyItem(data.datacc);
      setSearchedCopy(data.datacc);
      setOddPage(Math.ceil(data.data.length / rowsPerPage));
      setCopyPage(Math.ceil(data.datacc.length / rowsPerPage));
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  };

  const handleCopy = () => {
    const filterResult = copyitem.filter(function (x) { return x.rapidEventId; });
    oddController.updateSelectedOdds(filterResult, (data) => {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  };

  const onChangeTeam = (e) => {
    setSearchText(e.target.value);
    //console.log("eeee", e.target.value);
    if (e.target.value.length != 0) {
      const filteredRows = items.filter((row) => {
        return row.teamName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearchedTeam(filteredRows);
      //console.log("hhh",filteredRows);
      setPage(Math.ceil(filteredRows.length / rowsPerPage));
    } else {
      setSearchedTeam([...items]);
    }
  };

  const cancelSearch = () => {
    setSearchText("");
    setSearchedTeam(items);
    setPage(Math.ceil(items.length / rowsPerPage));
  };

  const onChangeOdds = (e) => {
    setSearchOdd(e.target.value);
    const filteredRows = oddsitem.filter((row) => {
      return row.teamName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setSearchedOdd(filteredRows);
    setOddPage(Math.ceil(filteredRows.length / rowsPerPage));
  };

  const cancelOddsSearch = () => {
    setSearchOdd("");
    setSearchedOdd(oddsitem);
    setOddPage(Math.ceil(items.length / rowsPerPage));
  };

  const onChangeCopy = (e) => {
    setSearchCopy(e.target.value);
    const filteredRows = copyitem.filter((row) => {
      return row.teamName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setSearchedCopy(filteredRows);
    setCopyPage(Math.ceil(filteredRows.length / rowsPerPage));
  };

  const cancelCopySearch = () => {
    setSearchCopy("");
    setSearchedCopy(newcopyPage);
    setCopyPage(Math.ceil(newcopyPage.length / rowsPerPage));
  };

  const handleRemoveOdds = (id) => {
    var filterResult = copyitem.filter(a => a.rapidEventId != id);

    setNewcopyPage(filterResult);

    setSearchedCopy(filterResult);
    setCopyPage(Math.ceil(filterResult.length / rowsPerPage));
  }

  return (
    <div className="main">
      {/* <div className="row"> */}
      <div className="right">
        <div className="table-title">
          <div className="input-gp">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="search ..."
              style={{ width: "10rem" }}
              value={searchText}
              onChange={(e) => onChangeTeam(e)}
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={() => cancelSearch()}
            >
              <i className="fa-solid fa-circle-xmark" style={{ fontSize: 15 }}></i>
            </button>
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => teamsHandleSave()}
          >
            Add <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="d-flex justify-content-between my-2">
          <span style={{ fontSize: "15px" }}>
            Selected {selectedTeams} Teams
          </span>
          <div>
            Check All &nbsp;
            <input
              className="form-check-input"
              style={{ padding: "8px" }}
              type="checkbox"
              checked={isAllSelected}
              onChange={() => handleCheckedAll()}
              id="flexCheckDefault"
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr
                style={{
                  backgroundColor: MyColor.headerbackground,
                  color: MyColor.color,
                }}
              >
                <th scope="col">NO</th>
                <th scope="col">Team</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {searchedTeam.length > 0 &&
                searchedTeam
                  .slice(
                    pageCount * rowsPerPage,
                    pageCount * rowsPerPage + rowsPerPage
                  )
                  .map((item) => {
                    return (
                      <tr key={item.teamId}>
                        <td>{item.teamId}</td>
                        <td>{item.teamName}</td>
                        <td>
                          <input
                            className="form-check-input"
                            style={{ padding: "8px" }}
                            type="checkbox"
                            checked={item.isSelected}
                            onChange={() => handleChecked(item.teamId)}
                            id="flexCheckDefault"
                          />
                        </td>
                      </tr>
                    );
                  })}
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
      </div>
      <div className="middle">
        <div className="table-title">
          <div className="mb-3 input-gp">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="search ..."
              value={searchOdd}
              onChange={(e) => onChangeOdds(e)}
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={() => cancelOddsSearch()}
            >
              <i className="fa-solid fa-circle-xmark" style={{ fontSize: 15 }}></i>
            </button>
          </div>
          <button
            type="button"
            className="btn btn-success mb-3"
            onClick={() => refreshOdds()}
          >
            Refresh <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr
                style={{
                  backgroundColor: MyColor.headerbackground,
                  color: MyColor.color,
                }}
              >
                <th scope="col">No</th>
                <th scope="col">Team</th>
                <th scope="col">Old Odds</th>
                <th scope="col">New Odds</th>
              </tr>
              <tr
                style={{
                  backgroundColor: MyColor.secondarybackground,
                  color: MyColor.color,
                }}
              >
              </tr>
            </thead>
            <tbody>
              {searchedOdd.length > 0 &&
                searchedOdd
                  .slice(
                    oddsPageCount * rowsPerPage,
                    oddsPageCount * rowsPerPage + rowsPerPage
                  )
                  .map((item) => {
                    return (
                      <tr key={item.teamId}>
                        <td>{item.teamId}</td>
                        <td>{item.teamName}</td>
                        <td>{item.oldBody} / {item.oldGoal}</td>
                        <td
                          style={{
                            backgroundColor: item.IsOddsChange ? "yellow" : null,
                          }}
                        >
                          {item.newBody} / {item.newGoal}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={oddpage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handleOddsPageClick}
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
      </div>
      <div className="left">
        <div className="table-title">
          <div className="mb-3 input-gp">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="search ..."
              value={searchCopy}
              onChange={(e) => onChangeCopy(e)}
            />
            <button
              type="button"
              className="btn btn-light"
              onClick={() => cancelCopySearch()}
            >
              <i className="fa-solid fa-circle-xmark" style={{ fontSize: 15 }}></i>
            </button>
          </div>
          <button
            type="button"
            className="btn btn-success mb-3"
            style={{ marginBottom: 5 }}
            onClick={() => handleCopy()}
          >
            Copy <i className="fa-solid fa-clipboard"></i>
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
              <tr
                style={{
                  backgroundColor: MyColor.headerbackground,
                  color: MyColor.color,
                }}
              >
                <th scope="col">No</th>
                <th scope="col">Time</th>
                <th scope="col">Team</th>
                <th scope="col">Odds</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {searchedCopy.length > 0 &&
                searchedCopy
                  .slice(
                    copyPageCount * rowsPerPage,
                    copyPageCount * rowsPerPage + rowsPerPage
                  )
                  .map((item,index) => {
                    return (
                      <tr key={item.teamId}>
                        <td>{index + 1}</td>
                        {/* <td>{item.teamId}</td> */}
                        <td>{`${moment(item.eventTime).format("hh:mm:ss a")}`}</td>
                        <td>{item.teamName}</td>
                        <td>{item.body} / {item.goal}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemoveOdds(item.rapidEventId)}
                          >
                            <i className="fa-regular fa-circle-xmark" style={{ fontSize: "15px" }}></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={copypage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handleCopyPageClick}
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
      </div>
      {/* </div> */}
    </div>
  );
}

export default OddsTransfer;
