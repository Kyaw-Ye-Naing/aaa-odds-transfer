import React from 'react'

function DeleteAlertModal() {
  return (
    <div>
<div className="modal fade" id="deletealertModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      {/* <div className="modal-header">
      <h5 className="modal-title" id="deletealertModalLabel">Modal title</h5>
        
       
      </div> */}
      <div class="modal-body">
      <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
      <div className="delete-body">
            <span> <i class="fas fa-trash-alt"></i>Are you sure you want to delete?</span>
            <div className="delete-btn-gp"> 
            <button type="button" className="btn btn-secondary" style={{marginRight:5}} data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger">Delete</button>
            </div>
           
        </div>
       
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default DeleteAlertModal