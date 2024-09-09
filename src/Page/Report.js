import React, { useState, Fragment, useEffect } from "react";
import NavBar from "./components/NavBar";
import moment from "moment";
import MyModal from "./components/HistoryModal";
import { useHistory } from "react-router-dom";
import { oddController } from "../controllers/oddsController/oddController";
import color from "../config/color";
import Loading from "./components/Loading";
import { useTranslation } from "react-i18next";

function Report() {
  const { t, i18n } = useTranslation("global");
  const defaultDate = moment(new Date()).format("YYYY-MM-DD");
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);
  const [item, setItem] = useState([]);
  const [showData, setShowData] = useState([]);
  const [searchText,setSearchText] = useState([]);
  const [username, setUsername] = useState("");
  const [itemdetails, setItemdetails] = useState([]);
  const [isEdit, setIsEdit] = useState("");
  const history = useHistory();
  const [userRole, setUserRole] = useState();
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
    "bettedDate": ""
  })

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");
    //console.log("kokok",userName);
    if (userName == undefined || userRole > 2) {
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
    oddController.getwinloseReport(parseInt(userId), startDate, endDate, (data) => {
      //console.log("dsta",data)
      setItem(data.historydata);
      setShowData(data.historydata);
      setItemdetails(data.historydetails);
      setLoading(false);
    });
  };

  const handleClick = (index) => {
    let newitem = [...item];
    newitem[index].isExpand = !newitem[index].isExpand;

    setItem(newitem);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const filteredRows = item.filter((row) => {
      return row.customerName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setShowData(filteredRows);
  }

  return (
    <div>
      <MyModal isEdit={isEdit} historydata={itemview} t={t} i18n={i18n} />

      <NavBar username={username} reportcolor={"link-btn-active"} userRole={userRole} />

      <span className="site-header" style={{ color: color['dark'].main }}>{t('reportTitle')}</span>

      <div style={{ marginLeft: 3, marginRight: 3 }}>
        <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginBottom: 5 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div className="mb-2" style={{ flex: '1 0 5rem' }}>
              <label className="form-label">Start Date</label>
              <input
                className="form-control"
                type="date"
                id="birthday"
                value={startDate}
                style={{ fontSize: '0.8rem' }}
                onChange={(e) => setStartDate(e.target.value)}
                name="birthday"
              />
            </div>
            <div className="mb-2" style={{ flex: '1 0 5rem' }}>
              <label className="form-label">End Date</label>
              <input
                className="form-control"
                type="date"
                id="birthday"
                value={endDate}
                style={{ fontSize: '0.8rem' }}
                onChange={(e) => setEndDate(e.target.value)}
                name="birthday"
              />
            </div>
            <div style={{ flex: '1 0 0rem' }}>
              <button
                type="button"
                className="search-btn2 btn"
                style={{ backgroundColor: color['dark'].main, color: '#fff', fontSize: '0.8rem',minWidth:60 }}
                onClick={() => getWinLoseReport()}
              >
                {t('search')}
              </button>
            </div>
          </div>
          <div className="">
            <label className="form-label"></label>
            <input
              type="text"
              className="search-txt custom-input"
              id="exampleFormControlInput1"
              style={{ height: 35 }}
              value={searchText}
              onChange={(e) => handleSearch(e)}
              placeholder="search ..."
            />
          </div>
        </div>

        {isLoading ? (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Loading />
            <p>Loading .....</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="report-table table">
              <thead style={{ backgroundColor: color['dark'].headerbg, fontSize: '0.87rem' }}>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">{t('no')}</th>
                  <th scope="col">{t('username')}</th>
                  <th scope="col">{t('turnOver')}</th>
                  <th scope="col">{t('validAmount')}</th>
                  <th scope="col" style={{ textAlign: 'right' }}>{t('wlAmount')}</th>
                  <th scope="col" style={{ textAlign: 'right' }}>{t('commission')}</th>
                  <th scope="col" style={{ textAlign: 'right' }}>{t('totalAmount')}</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.8rem' }}>
                {showData.length != 0 ?
                  showData &&
                  showData.map((d, i) => {
                    return (
                      <Fragment key={i}>
                        <tr>
                          <td>
                            <a onClick={() => handleClick(i)} style={{ marginLeft: '5%', cursor: 'pointer' }}>
                              {d.isExpand ? (
                                <i className="fas fa-chevron-up"></i>
                              ) : <i className="fas fa-chevron-down"></i>}
                            </a>
                          </td>
                          <th scope="row">{i + 1}</th>
                          <td>{d.customerName}</td>
                          <td>{d.turnOver}</td>
                          <td>{d.validAmount}</td>
                          <td style={{ textAlign: 'right' }}>{d.winLoseAmount}</td>
                          <td style={{ textAlign: 'right' }}>{d.commission}</td>
                          <td style={{ textAlign: 'right' }}>{d.totalAmount >= 0
                            ? <span>{d.totalAmount}</span>
                            : <span style={{ color: 'red' }}>{d.totalAmount}</span>
                          }</td>

                        </tr>
                        {d.isExpand ? (
                          <ReportExpandRow
                            setItemview={setItemview}
                            itemview={itemview}
                            customerId={d.customerId}
                            itemdetails={itemdetails}
                            setIsEdit={setIsEdit}
                            i18n={i18n}
                            t={t}
                          />
                        ) : null}
                      </Fragment>
                    );
                  })
                  : <tr>
                    <td colSpan={8} style={{ textAlign: 'center' }}>{t('nodata')}</td>
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

export function ReportExpandRow({ itemdetails, customerId, setIsEdit, setItemview, itemview, i18n, t }) {
  //const result = data.filter(a=>a.CustomerId == customerId);

  var result = itemdetails.filter((el) => {
    return el.customerId == customerId
  }
  );

  //console.log("expand data",result);
  //console.log("expand data id",customerId);
  //console.log("expand data data",itemdetails);

  const handleViewModal = (result) => {
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
    setIsEdit("View")
  }

  return (
    <>
      <tr className="table-secondary" style={{ fontSize: '0.87rem' }}>

        <th scope="col">{t('no')}</th>
        <th scope="col">{t('bettedDate')}</th>
        <th scope="col">{t('choice')}</th>
        <th scope="col">{t('odds')}</th>
        <th scope="col">{t('betAmount')}</th>
        <th scope="col" style={{ textAlign: 'right' }}>{t('wlAmount')}</th>
        <th scope="col" style={{ textAlign: 'right' }}>{t('commission')}</th>
        <th scope="col" style={{ textAlign: 'right' }}>{t('totalAmount')}</th>
      </tr>
      {result &&
        result.map((d, i) => {
          return (
            <Fragment key={i}>
              <tr className="table-secondary" style={{ fontSize: '0.8rem' }}>

                <th scope="row">{i + 1}</th>
                <td>{`${moment(d.bettedDate).format(
                  "DD-MM-YYYY hh:mm:ss a"
                )}`}</td>
                <td><span style={{ color: d.color }}>{i18n.language === "mm" ? d.betMyan : d.bet}</span></td>
                <td>{d.odds}</td>
                <td>{d.amount}</td>
                <td style={{ textAlign: 'right' }}>{d.status == "Win"
                  ? <span>{d.winLoseAmount}</span>
                  : <span style={{ color: 'red' }}>{d.winLoseAmount}</span>
                }</td>
                <td style={{ textAlign: 'right' }}>
                  {
                    d.commission
                  }

                </td>
                <td style={{ textAlign: 'right' }}>
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
                  { }
                  {d.winLoseAmount + d.commission > 0
                    ? <span>{d.winLoseAmount + d.commission}</span>
                    : <span style={{ color: 'red' }}>{d.winLoseAmount + d.commission}</span>
                  }
                </td>
              </tr>
            </Fragment>
          );
        })}
    </>
  );
}
