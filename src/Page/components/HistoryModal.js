import React,{useState,useEffect} from 'react';
import moment from "moment";

function HistoryModal({isEdit,historydata,amount,setAmount,handleUpdate}) {
  return (
    <div>
        <div className="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <div className="modal-title" id="exampleModalLabel">
        <h5>{historydata.voucher}</h5>
        <span>{historydata.customerName}</span>
        </div>
       
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="event-details">
        <span className="league">{historydata.leagueName}</span>
        <span>{historydata.event}</span>
        <span>{`${moment(historydata.eventTime).format(
                            "DD-MM-YYYY hh:mm:ss a"
                             )}`}</span>
        <span>Result : {historydata.result}</span>
        <span>Bet : <span style={{color:historydata.color}}>{historydata.bet}</span></span>
        <span>Odds : {historydata.odds}</span>
        {
          isEdit == "Edit" ? (
            <div className="amt-edit">
              Amount : 
              <input
              type="text"
              value={amount}
              className="form-control"
              onChange={(e)=>setAmount(e.target.value)}
          /></div>
          )
          :
          ( <span>Amount : {historydata.amount}</span>)
        }
       
        <span>Status : {historydata.status == "Pending" 
        ?<span className="badge rounded-pill bg-warning">{historydata.status}</span>
        :historydata.status == "Win"
        ?<span className="badge rounded-pill bg-success">{historydata.status}</span>
        :<span className="badge rounded-pill bg-danger">{historydata.status}</span>
          }</span>
        </div>      
      </div>
      
      {
        isEdit == "Edit"
        ? ( <div className="modal-footer">
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
         className="btn btn-success"
         onClick={()=>handleUpdate(historydata.bettingId)}
         >Save changes
         </button>
      </div>)
        :null
      }
     
    </div>
  </div>
</div>
    </div>
  )
}

export default HistoryModal