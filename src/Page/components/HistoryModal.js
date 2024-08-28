import React from 'react';
import moment from "moment";
import color from '../../config/color';

function HistoryModal({
  isEdit,
  historydata,
  amount,
  setAmount,
  goal,
  unit,
  handleUpdate,
  selectedCustomer,
  setSelectdCustomer,
  handleChangeGoal,
  handleClickUnit,
  customer
}) {

  return (
    <div>
      <div className="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{fontSize:'0.8rem'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title" id="exampleModalLabel">
                <div style={{display:'flex',gap:5}}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{historydata.voucher}</span>
                  <span style={{ fontSize: '0.8rem' }}>{historydata.status == "Pending"
                    ? <span className="badge rounded-pill bg-warning">{historydata.status}</span>
                    : historydata.status == "Win"
                      ? <span className="badge rounded-pill bg-success">{historydata.status}</span>
                      : <span className="badge rounded-pill bg-danger">{historydata.status}</span>}</span>
                </div>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <span className="">Name</span>
                  <select
                  className="form-select form-select"
                  aria-label=".form-select-lg example"
                  style={{fontSize:'0.8rem'}}
                  value={selectedCustomer}
                  onChange={(e) => setSelectdCustomer(e.target.value)}
                >
                  {
                    customer && customer.map((data, i) => {
                      return (
                        <option key={data.customerId} value={data.customerId}>{data.customerName}</option>
                      )
                    })
                  }
                </select>
                </div>
              </div>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="event-details">
                <div style={{ display:'flex',flexDirection:'column',marginBottom:10 }}>
                  <span style={{color: color['dark'].secondary2,fontSize: '0.785rem'}}>{historydata.leagueName}</span>
                  <span style={{fontSize: '1rem'}}>{historydata.event}</span>
                  <span style={{ color: color['dark'].secondary4,fontSize: '0.785rem'}}>{`${moment(historydata.eventTime).format(
                    "DD-MM-YYYY hh:mm:ss a"
                  )}`}</span>
                  <span style={{ fontSize: '1rem',marginTop:10 }}>Result : <span style={{ color: 'crimson' }}>{historydata.result}</span></span>
                  <span style={{  fontSize: '1rem'}}>Bet : <span style={{ color: historydata.color }}>{historydata.bet}</span></span>
                </div>
               
                <div style={{marginBottom:10}}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3, fontSize: '0.875rem' }}>
                    <span>Odds</span>
                    <input type="number"
                      value={goal}
                      onChange={(e) => handleChangeGoal(e.target.value)}
                      className="form-control"
                      style={{ width: 65, fontSize: '0.875rem',marginLeft:20 }}
                      min={0}
                      max={12}
                    />
                    <div style={{ display: 'flex' }}>
                      <button
                        style={{ borderRadius: 5, backgroundColor: "#f7f7f7", borderWidth: 1 }}
                        onClick={() => handleClickUnit("inc")}
                      ><i className="fas fa-arrow-up"></i>
                      </button>
                      <input
                        type="number"
                        value={unit}
                        className="form-control"
                        style={{ width: 70, fontSize: '0.875rem' }}
                        disabled
                      />
                      <button
                        style={{ borderRadius: 5, backgroundColor: "#f7f7f7", borderWidth: 1 }}
                        onClick={() => handleClickUnit("dec")} >
                        <i className="fas fa-arrow-down"></i>
                      </button>
                    </div>
                  </div>
                  {
                    isEdit == "Edit" ? (
                      <div className="amt-edit" style={{ fontSize: '0.875rem' }}>
                        Amount
                        <input
                          type="text"
                          value={amount}
                          style={{ fontSize: '0.875rem',width:'auto' }}
                          className="form-control"
                          onChange={(e) => setAmount(e.target.value)}
                        /></div>
                    )
                      :
                      (<span>Amount{historydata.amount}</span>)
                  }
                </div>
              </div>
            </div>

            {
              isEdit == "Edit"
                ? (<div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    style={{ marginRight: 5 }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    style={{backgroundColor:color['dark'].main,color:'white'}}
                    className="btn"
                    onClick={() => handleUpdate(historydata.bettingId)}
                  >Save
                  </button>
                </div>)
                : null
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryModal