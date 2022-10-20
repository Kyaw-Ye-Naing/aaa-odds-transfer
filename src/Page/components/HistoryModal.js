import React from 'react'

function HistoryModal({isEdit,historydata}) {
  console.log("isEdit",isEdit);
  return (
    <div>
        <div className="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <div className="modal-title" id="exampleModalLabel">
        <h5>GB973747347374</h5>
        <span>Bo Paing Gyi</span>
        </div>
       
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="event-details">
        <span className="league">England Premier League</span>
        <span>Man U vs Man City</span>
        <span>9:00 PM</span>
        <span>Result : 1 - 1</span>
        <span>Bet : <span style={{color:'green'}}>Man U</span></span>
        <span>Odds : 1-90</span>
        {
          isEdit == "Edit" ? (
            <div className="amt-edit">
              Amount : 
              <input
            type="text"
            value={5000}
            className="form-control"
          /></div>
          )
          :
          ( <span>Amount : 40000</span>)
        }
       
        <span>Status : <span className="badge rounded-pill bg-success">Win</span></span>
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
        <button type="button" className="btn btn-success">Save changes</button>
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