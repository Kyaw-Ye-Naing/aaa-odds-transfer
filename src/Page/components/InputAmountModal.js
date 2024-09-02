import React from 'react';
import color from '../../config/color';

function InputAmountModal({handleTeamAdd,inputElement,t}) {

    return (
        <div>
            <div className="modal"
                id="inputamountModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="inputamountModalLabel"
                aria-hidden="true"
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="d-flex justify-content-end">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label" style={{fontSize:'0.87rem'}}>{t('betAmount')}</label>
                               <form onSubmit={(e)=>handleTeamAdd(e)}>
                               <input type="amount" 
                                className="custom-input" 
                               // value={betamount}
                               ref={inputElement}
                               style={{fontSize:'0.8rem',height:38}}
                                //onChange={(e)=>setBetAmount(e.target.value)}
                                id="exampleFormControlInput1"/>
                                    <div className="d-flex flex-row-reverse bd-highlight mt-2">
                                        <button type="submit"
                                            onClick={() => handleTeamAdd()}
                                            data-bs-dismiss="modal"
                                            className="btn"
                                            style={{ backgroundColor: color['dark'].main, color: 'white',fontSize:'0.8rem' }}
                                        >
                                            {t('save')}
                                            </button>
                                        <button type="button"
                                            style={{ marginRight: 5,fontSize:'0.8rem' }}
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal">
                                            {t('close')}
                                            </button>

                                    </div>
                               </form>   
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
             
        </div>
    )
}

export default InputAmountModal