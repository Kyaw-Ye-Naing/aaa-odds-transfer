import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import moment from "moment";
import MyColor from '../config/color';

const TeamData = [
  {
    teamName: "Manchester City",
    teamId: 1,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 2,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 3,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 4,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 5,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 6,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 7,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 8,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 9,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 10,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 11,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 12,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
    teamId: 13,
    isSelected: false,
  },
  {
    teamName: "Manchester City",
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
    isGoalChange: false
  },
  {
    teamName: "Chelsea",
    teamId: 2,
    oldBody: "1+50",
    oldGoal: "2-80",
    newBody: "1+50",
    newGoal: "2-80",
    isBodyChange: false,
    isGoalChange: false
  },
  {
    teamName: "Manchester United",
    teamId: 3,
    oldBody: "1+80",
    oldGoal: "3-70",
    newBody: "1+80",
    newGoal: "3-40",
    isBodyChange: false,
    isGoalChange: true
  },
  {
    teamName: "Everton",
    teamId: 4,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false
  },
  {
    teamName: "Aston Villa",
    teamId: 5,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false
  },
  {
    teamName: "Leeds",
    teamId: 6,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false
  },
  {
    teamName: "Fulham",
    teamId: 7,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false
  },
  {
    teamName: "Southamton",
    teamId: 8,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false
  },
  {
    teamName: "Arsenal",
    teamId: 9,
    oldBody: "1+30",
    oldGoal: "2-70",
    newBody: "1+90",
    newGoal: "2-90",
    isBodyChange: true,
    isGoalChange: true
  },
  {
    teamName: "Spurs",
    teamId: 10,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false
  },
  {
    teamName: "Liverpool",
    teamId: 11,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false
  },
  {
    teamName: "Crystal Palace",
    teamId: 12,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false
  },
  {
    teamName: "Nottenham",
    teamId: 13,
    oldBody: "1+80",
    oldGoal: "2-70",
    newBody: "1+80",
    newGoal: "2-70",
    isBodyChange: false,
    isGoalChange: false
  },
];

const CopyData = [
  {
    teamName: "Manchester City",
    teamId: 1,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 2,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 3,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 4,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 5,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 6,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 7,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 8,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 9,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 10,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 11,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
  {
    teamName: "Manchester City",
    teamId: 12,
    eventTime: "2022-08-18 16:00:00.000",
    Body: "1+80",
    Goal: "1-70",
  },
];

// Example items, to simulate f
function OddsTransfer() {
  const rowsPerPage = 10;
  const [items, setItems] = useState([]);
  const [oddsitem, setOddsItem] = useState([]);
  const [copyitem, setCopyItem] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [oddsPageCount, setOddsPageCount] = useState(0);
  const [copyPageCount, setCopyPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [oddpage, setOddPage] = useState(0);
  const [copypage, setCopyPage] = useState(0);
  const [selectedTeams, setSelectedTeam] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    setItems(TeamData);
    setOddsItem(OddsData);
    setCopyItem(CopyData);
    setPage(Math.ceil(TeamData.length / rowsPerPage))
    setOddPage(Math.ceil(OddsData.length / rowsPerPage))
    setCopyPage(Math.ceil(CopyData.length / rowsPerPage))
  }, [])

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
    const index = items.findIndex(v => {
      return v.teamId == id;
    });

    //console.log("index",index);

    items[index].isSelected = !items[index].isSelected;

    let isTrue = items.filter(e => e.isSelected == true);
    //setItems(items);
    setSelectedTeam(isTrue.length);
    setIsAllSelected(false);
    //console.log("after",items);
  }

  const handleCheckedAll = () => {
    var newarr = [...items];
    newarr.map((data) => {
      data.isSelected = !isAllSelected;
    });
    // console.log("check",isAllSelected)
    // console.log("data",newarr)
    setIsAllSelected(!isAllSelected);
    console.log("check", isAllSelected)
    if (!isAllSelected) {
      console.log("hey")
      setSelectedTeam(newarr.length);
    } else {
      setSelectedTeam(0);
    }

    setItems(newarr);
  }

  const teamsHandleSave = () => {

  }

  const refreshOdds = () => {

  }

  const handleCopy = () => {

  }

  return (
    <div className="main">
      {/* <div className="row"> */}
      <div className="right">
        <div className="table-title">
          <div>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="search ..."
            />
          </div>
          <button
            type="button"
            class="btn btn-success"
          >Add <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="d-flex justify-content-between my-2">
          <span style={{ fontSize: "15px" }}>Selected {selectedTeams} Teams</span>
          <div>
            Check All &nbsp;<input
              class="form-check-input"
              style={{ padding: "8px" }}
              type="checkbox"
              checked={isAllSelected}
              onChange={() => handleCheckedAll()}
              id="flexCheckDefault"
            />
          </div>
        </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr style={{ backgroundColor: MyColor.headerbackground, color: MyColor.color }}>
              <th scope="col">NO</th>
              <th scope="col">Team</th>
              <th scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items
                .slice(pageCount * rowsPerPage, pageCount * rowsPerPage + rowsPerPage)
                .map((item) => {
                  return (
                    <tr key={item.teamId}>
                      <td>{item.teamId}</td>
                      <td>{item.teamName}</td>
                      <td>
                        <input
                          class="form-check-input"
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
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="search ..."
            />
          </div>
          <button
            type="button"
            class="btn btn-success mb-3"
          >Refresh <i class="fa-solid fa-arrows-rotate"></i>
          </button>
        </div>

        <table className="table table-hover table-bordered">
          <thead>
            <tr style={{ backgroundColor: MyColor.headerbackground, color: MyColor.color }}>
              <th scope="col" colSpan={2}>
                Info
              </th>
              <th scope="col" colSpan={2}>
                Old Odds
              </th>
              <th scope="col" colSpan={2}>
                New Odds
              </th>
            </tr>
            <tr style={{ backgroundColor: MyColor.secondarybackground, color: MyColor.color }}>
              <th scope="col">No</th>
              <th scope="col">Team</th>
              <th scope="col">Body</th>
              <th scope="col">Goal</th>
              <th scope="col">Body</th>
              <th scope="col">Goal</th>
            </tr>
          </thead>
          <tbody>
            {oddsitem.length > 0 &&
              oddsitem
                .slice(oddsPageCount * rowsPerPage, oddsPageCount * rowsPerPage + rowsPerPage)
                .map((item) => {
                  return (
                    <tr key={item.teamId}>
                      <td>{item.teamId}</td>
                      <td>{item.teamName}</td>
                      <td>{item.oldBody}</td>
                      <td>{item.oldGoal}</td>
                      <td style={{ backgroundColor: item.isBodyChange ? "yellow" : null }}>{item.newBody}</td>
                      <td style={{ backgroundColor: item.isGoalChange ? "yellow" : null }}>{item.newGoal}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
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
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="search ..."
            />
          </div>
          <button
            type="button"
            class="btn btn-success mb-3"
            style={{ marginBottom: 5 }}
          >
            Copy <i class="fa-solid fa-clipboard"></i>
          </button>
        </div>
        <table class="table table-hover table-bordered">
          <thead>
            <tr style={{ backgroundColor: MyColor.headerbackground, color: MyColor.color }}>
              <th scope="col">No</th>
              <th scope="col">Time</th>
              <th scope="col">Team</th>
              <th scope="col">Body</th>
              <th scope="col">Goal</th>
            </tr>
          </thead>
          <tbody>
            {copyitem.length > 0 &&
              copyitem
                .slice(copyPageCount * rowsPerPage, copyPageCount * rowsPerPage + rowsPerPage)
                .map((item) => {
                  return (
                    <tr key={item.teamId}>
                      <td>{item.teamId}</td>
                      <td>{`${moment(item.eventTime).format("hh:mm:ss a")}/ ${moment(
                        item.eventTime
                      ).format("YYYY-MM-DD")}`}</td>
                      <td>{item.teamName}</td>
                      <td>{item.Body}</td>
                      <td>{item.Goal}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
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
