import React from "react";
import { oddController } from "../../controllers/oddsController/oddController";
import { toast } from "react-toastify";
import color from "../../config/color";

function CustomerCreateModal({
  newcustomerData,
  setNewCustomerData,
  getCustomer,
  t
}) {

  const OnChangeText = (text, value) => {
    //console.log("text box",value);
    const newcustomer = { ...newcustomerData };
    newcustomer[text] = value;
    setNewCustomerData(newcustomer);
  };

  const Save = () => {
   // console.log("final data", newcustomerData);
    const userId = localStorage.getItem("userId");
    oddController.saveCustomer(parseInt(userId), newcustomerData, (data) => {
      //console.log("dsta", data.events);
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      getCustomer();
    });
  };

const Cancel = () => {
  const newcustomer = { ...newcustomerData };
  newcustomer["customerName"] = "";
  newcustomer["commission"] = 0;
  newcustomer["betLimit"] = 0;
  newcustomer["active"] =true;

  setNewCustomerData(newcustomer);
}

  return (
    <div>
      <div
        className="modal fade"
        id="customeraddModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="customeraddModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title" id="customeraddModalLabel">
                <h5>{t('customer')} {t('create')}</h5>
              </div>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{fontSize:'0.8rem'}}>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                   {t('name')}
                  </label>
                  <input
                    type="text"
                    value={newcustomerData.customerName}
                    className="custom-input"
                    id="exampleInputEmail1"
                    style={{fontSize:'0.8rem',height:35}}
                    required
                    aria-describedby="emailHelp"
                    onChange={(value) =>
                      OnChangeText("customerName", value.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    {t('commission')}
                  </label>
                  <input
                    type="number"
                    value={newcustomerData.commission}
                    className="custom-input"
                    style={{fontSize:'0.8rem',height:35}}
                    step="any"
                    required
                    onChange={(value) =>
                      OnChangeText("commission", value.target.value)
                    }
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                  {t('betLimit')}
                  </label>
                  <input
                    type="number"
                    value={newcustomerData.betLimit}
                    className="custom-input"
                    step="any"
                    style={{fontSize:'0.8rem',height:35}}
                    required
                    onChange={(value) =>
                      OnChangeText("betLimit", value.target.value)
                    }
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    style={{fontSize:'0.8rem'}}
                    checked={newcustomerData.active}
                    onChange={(v) => OnChangeText("active", v.target.checked)}
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Active
                  </label>
                </div>
                <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  style={{ fontSize:'0.8rem' }}
                  onClick={() => Cancel()}
                >
                  {t('close')}
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => Save()}
                  style={{ marginLeft: 5,fontSize:'0.8rem',backgroundColor:color['dark'].main,color:'#fff' }}
                >
                  {t('save')}
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCreateModal;
