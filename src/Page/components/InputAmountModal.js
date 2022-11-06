import React from 'react';

function InputAmountModal({handleTeamAdd,inputElement}) {
//     const inputElement = useRef(null);

//   useEffect(() => {
//     if (inputElement.current) {
//       inputElement.current.focus();
//     }
//   }, []);

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
                                <label htmlFor="exampleFormControlInput1" className="form-label">Bet Amount</label>
                               <form onSubmit={(e)=>handleTeamAdd(e)}>
                               <input type="amount" 
                                className="form-control" 
                               // value={betamount}
                               ref={inputElement}
                                //onChange={(e)=>setBetAmount(e.target.value)}
                                id="exampleFormControlInput1"/>
                                 <div className="d-flex flex-row-reverse bd-highlight mt-2">
                            <button type="submit"
                            onClick={()=>handleTeamAdd()}
                            data-bs-dismiss="modal"
                                className="btn btn-primary">
                                Save changes</button>
                            <button type="button"
                             style={{marginRight:5}}
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">
                                Close</button>
                           
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