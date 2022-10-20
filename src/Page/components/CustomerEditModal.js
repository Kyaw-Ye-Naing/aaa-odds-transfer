import React from "react";

function CustomerEditModal({ customerdata, setCustomerData }) {
  const OnChangeText = (text, value) => {
    const newcustomer = { ...customerdata };
    newcustomer[text] = value;
    setCustomerData(newcustomer);
  };

  const EditSave = () => {
    console.log("final data", customerdata);
    // cityController.updateCity(editCity, (data) => {
    //   toast.success(data.message, {
    //     position: toast.POSITION.BOTTOM_RIGHT,
    //   });
      // getAllCity();
   // });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="customerModal"
        data-bs-backdrop="static" data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="customerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title" id="customerModalLabel">
                <h5>Customer Edit</h5>
              </div>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={customerdata.customerName}
                    className="form-control"
                    id="exampleInputEmail1"
                    required
                    aria-describedby="emailHelp"
                    onChange={(value) =>
                      OnChangeText("customerName", value.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Commission
                  </label>
                  <input
                    type="number"
                    value={customerdata.commission}
                    className="form-control"
                    required
                    onChange={(value) =>
                      OnChangeText("commission", value.target.value)
                    }
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    checked={customerdata.active}
                    onChange={(v) => OnChangeText("active", v.target.checked)}
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Active
                  </label>
                </div>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{marginRight:5}}>Close</button>
                <button type="button" className="btn btn-primary" onClick={()=>EditSave()}>
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerEditModal;
