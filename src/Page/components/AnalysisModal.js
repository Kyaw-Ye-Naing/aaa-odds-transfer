import React,{Fragment, useEffect} from 'react';
import moment from "moment";
import {oddController} from "../../controllers/oddsController/oddController";
import { useState } from 'react';
import Loader from '../../asset/loader';

function AnalysisModal({rapidEventId}) {
const [voucherDetails,setVoucherDetails] = useState([]);
const [loading,setLoading] = useState(false);

 useEffect(() => {
    setLoading(true);
    oddController.getVoucherDetails(rapidEventId,(data) => {
        //console.log("data in model >>>>",data);
        setVoucherDetails(data.payload);
        //setSearchSingle(data.livedata);
        //setSingleLiveData(data.livedata);
        setLoading(false);
    });
 },[rapidEventId])

    return (
        <div>
            <div className="modal fade" id="analysisModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Voucher Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> 
                        </div>
                        <div className="modal-body">
                        {
                            loading ? <div style={{ textAlign: "center" }}>
                            <Loader />
                            <p>Loading .....</p> </div> : 
                                <Fragment>
                                    <div className='row'>
                                        <div className='col-md-3 p-0' style={{ borderRight: '1px solid black' }}>
                                            <div className='bg-success text-white' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <span>Home</span>
                                                <span>Total - {voucherDetails.homeList && voucherDetails.homeList.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)}</span>
                                            </div>
                                        </div>
                                        <div className='col-md-3 p-0' style={{ borderRight: '1px solid black' }}>
                                            <div className='bg-success text-white' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <span>Away</span>
                                                <span>Total - {voucherDetails.awayList && voucherDetails.awayList.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)}</span>
                                            </div>
                                        </div>
                                        <div className='col-md-3 p-0' style={{ borderRight: '1px solid black' }}>
                                            <div className='bg-success text-white' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <span>Over</span>
                                                <span>Total - {voucherDetails.overList && voucherDetails.overList.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)}</span>
                                            </div>
                                        </div>
                                        <div className='col-md-3 p-0'>
                                            <div className='bg-success text-white' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <span>Under</span>
                                                <span>Total - {voucherDetails.underList && voucherDetails.underList.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-3 p-0' style={{ borderRight: '1px solid black' }}>
                                            <div>
                                                {voucherDetails.homeList && voucherDetails.homeList.map((v, i) =>
                                                    <div className='p-1'>
                                                        <span>{v.userName}</span><br />
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: '#bb7d0c' }}>({v.amount}/{v.odds})</span>
                                                            <span style={{ color: 'blue' }}>{moment(v.bettedTime).format("hh:mm A")}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='col-md-3 p-0' style={{ borderRight: '1px solid black' }}>
                                            <div>
                                                {voucherDetails.awayList && voucherDetails.awayList.map((v, i) =>
                                                    <div className='p-1'>
                                                        <span>{v.userName}</span><br />
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: '#bb7d0c' }}>({v.amount}/{v.odds})</span>
                                                            <span style={{ color: 'blue' }}>{moment(v.bettedTime).format("hh:mm A")}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='col-md-3 p-0' style={{ borderRight: '1px solid black' }}>
                                            <div>
                                                {voucherDetails.overList && voucherDetails.overList.map((v, i) =>
                                                    <div className='p-1'>
                                                        <span>{v.userName}</span><br />
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: '#bb7d0c' }}>({v.amount}/{v.odds})</span>
                                                            <span style={{ color: 'blue' }}>{moment(v.bettedTime).format("hh:mm A")}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='col-md-3 p-0'>
                                            <div>
                                                {voucherDetails.underList && voucherDetails.underList.map((v, i) =>
                                                    <div className='p-1'>
                                                        <span>{v.userName}</span><br />
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: '#bb7d0c' }}>({v.amount}/{v.odds})</span>
                                                            <span style={{ color: 'blue' }}>{moment(v.bettedTime).format("hh:mm A")}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalysisModal