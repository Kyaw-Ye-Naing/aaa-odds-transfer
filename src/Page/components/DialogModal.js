import React from 'react'

const DialogModal = () => {
  return (
      <div className="modal fade" id="alertModal" tabIndex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
          <div className="modal-dialog" style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
              <div className="modal-content iphone-modal">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      This is testing text , warning text
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default DialogModal