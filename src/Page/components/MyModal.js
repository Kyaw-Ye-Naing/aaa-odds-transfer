import React from 'react'

function MyModal({isEdit,historydata}) {
  return (
    <div>
        <div className="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        <span>Bet : Man U</span>
        <span>Odds : 1-90</span>
        <span>Amount : 40000</span>
        <span>Status : Lose</span>
        </div>      
      </div>
      
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default MyModal