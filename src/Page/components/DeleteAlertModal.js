import React from 'react'

function DeleteAlertModal({ handleRemoveVoucher, deleteId, t }) {


  return (
    <div>
      <div className="modal fade" id="deletealertModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
              <div className="delete-body">
                <span style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}> 
                <i className="fa-solid fa-triangle-exclamation"></i>{t('deleteConfirm')}</span>
                <div className="delete-btn-gp">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ marginRight: 5, fontSize: '0.8rem' }}
                    data-bs-dismiss="modal">
                    {t('cancel')}
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    style={{ fontSize: '0.8rem' }}
                    onClick={() => handleRemoveVoucher(deleteId)}
                    className="btn btn-danger">
                    {t('delete')}
                  </button>
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