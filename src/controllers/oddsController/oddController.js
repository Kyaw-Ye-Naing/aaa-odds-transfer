import { apiList } from "../_apiHelper/apiList";
import { getApi } from "../_apiHelper/getApi";
import { postApi } from "../_apiHelper/postApi";
import { putApi } from "../_apiHelper/putApi";

//-------------------- Log In ------------------------------------
const checkLogIn = (name, password, setResponse) => {
    postApi(`${apiList.loginApi}`,
        {
            username: name,
            password: password
        },
        (data) => {
            setResponse(data);
        });
};

//-------------------- Transfer Page ------------------------------
//--get all teams 
const getAllTeams = (userId, setResponse) => {
    postApi(`${apiList.getTeamApi}`, {
        userId: userId
    },
        (data) => {
            setResponse(data);
        });
};

//--save selected events 
const saveSelectedTeams = (userId, rapidEventIdList, setResponse) => {
    postApi(`${apiList.postSelectedTeamApi}`,
        {
            rapidEventId: rapidEventIdList,
            userId: userId
        },
        (data) => {
            setResponse(data);
        });
};

//--refresh odds
const updateResfreshOdds = (userId, setResponse) => {
    postApi(`${apiList.updateOddsApi}`,
        {
            userId: userId
        },
        (data) => {
            setResponse(data);
        });
};

//--save updated odds
const updateSelectedOdds = (userId, rapidEventIdList, setResponse) => {
    putApi(`${apiList.copyTeamApi}`,
        {
            rapidEventId: rapidEventIdList,
            userId: userId
        },
        (data) => {
            setResponse(data);
        });
};

//--------------------- Betting Page -------------------------------
//--get betting events
const getBettingEvents = (userId, setResponse) => {
    postApi(`${apiList.bettingEventApi}`,
        {
            userId: userId
        },
        (data) => {
            setResponse(data);
        });
};

//--save betting events
const saveBettingEvents = (userId, customerId, bettingInfo, setResponse) => {
    //console.log("customer id", customerId);
    //console.log("user id", userId);
    //console.log("api data", bettingInfo);
    postApi(`${apiList.saveBettingEventApi}`,
        {
            userId: userId,
            customerId: customerId,
            bettingDetails: bettingInfo
        },
        (data) => {
            setResponse(data);
        });
};

//--save betting events Confirm
const saveBettingEventsConfirm = (userId, customerId, bettingInfo, setResponse) => {
    //console.log("customer id", customerId);
    //console.log("user id", userId);
    console.log("api data", bettingInfo);
    postApi(`${apiList.confirmSaveBettingEventApi}`,
        {
            userId: userId,
            customerId: customerId,
            betConfirmDetails: bettingInfo
        },
        (data) => {
            setResponse(data);
        });
};

//--get customers
const getCustomer = (userId, setResponse) => {
    postApi(`${apiList.getCustomerApi}`,
        {
            userId: userId
        },
        (data) => {
            setResponse(data);
        });
};

//--------------------- Customer Page -------------------------------
//--update customer's info
const updateCustomer = (customerInfo, setResponse) => {
    console.log("final api", customerInfo)
    postApi(`${apiList.updateCustomerApi}`,
        {
            customerId: customerInfo.customerId,
            customerName: customerInfo.customerName,
            commission: Number(customerInfo.commission),
            active: customerInfo.active,
            betLimit : Number(customerInfo.betLimit)
        },
        (data) => {
            setResponse(data);
        });
};

//--insert new customer
const saveCustomer = (userId, customerInfo, setResponse) => {
    postApi(`${apiList.saveCustomerApi}`,
        {
            customerName: customerInfo.customerName,
            commission: Number(customerInfo.commission),
            userId: userId,
            betLimit : Number(customerInfo.betLimit)
        },
        (data) => {
            setResponse(data);
        });
};

//--------------------- Member Outstanding Page -------------------------------
//--get member outstanding data
const getOutstanding = (userId, setResponse) => {
    postApi(`${apiList.getMemberOutstandingApi}`,
        {
            userId: userId
        },
        (data) => {
            setResponse(data);
        });
};

//--update member outstanding voucher(only amount) data
const updateOutstanding = (bettingId, amount, odds, userId, setResponse) => {
    postApi(`${apiList.updateMemberVoucherApi}`,
        {
            bettingId: bettingId,
            amount: parseInt(amount),
            userId: parseInt(userId),
            odds: odds
        },
        (data) => {
            setResponse(data);
        });
};

//--delete member outstanding voucher data
const removeOutstanding = (bettingId, setResponse) => {
    postApi(`${apiList.removeMemberVoucherApi}`,
        {
            bettingId: bettingId
        },
        (data) => {
            setResponse(data);
        });
};

//--------------------- Member Win Lose Report Page -------------------------------
//--get member win lose report
const getwinloseReport = (userId, startDate, endDate, setResponse) => {
    postApi(`${apiList.getWinLoseReportApi}`,
        {
            userId: userId,
            startDate: startDate,
            endDate: endDate
        },
        (data) => {
            setResponse(data);
        });
};

//--------------------- Event Calculation Page -------------------------------
//--get event results
const getEventResult = (userId,startDate, setResponse) => {
    postApi(`${apiList.getEventResult}`,
        {
            userId: userId,
            selectedDate : startDate
        },
        (data) => {
            setResponse(data);
        });
};

//--calculate event result
const calculateEventResult = (userId,startDate, setResponse) => {
    postApi(`${apiList.calculateVoucherApi}`,
        {
            userId: userId,
            selectedDate : startDate
        },
        (data) => {
            setResponse(data);
        });
};

//------------------------ Analysis Page ---------------------------------------------
//--calculate event result
const getSingleLiveData = (startDate,isBody, setResponse) => {
    postApi(`${apiList.getSingleLiveData}`,
        {
            searchDate : startDate,
            isBody : isBody
        },
        (data) => {
            setResponse(data);
        });
};

//---get voucher details
const getVoucherDetails = (rapidEventId, setResponse) => {
    getApi(`${apiList.getVoucherDetails}/${parseInt(rapidEventId)}`,
        (data) => {
            setResponse(data);
        });
};

//---get overall voucher with user id
const getOverallVoucher = (customerId, setResponse) => {
    getApi(`${apiList.getOverallVoucher}/${parseInt(customerId)}`,
        (data) => {
            setResponse(data);
        });
};

//---get overall voucher with user id
const updateOverallVoucher = (voucherList, setResponse) => {
    console.log("data>>>",voucherList);
    postApi(`${apiList.updateVoucherLists}`, {
        voucherList: voucherList
    },
        (data) => {
            setResponse(data);
        });
};


export const oddController = {
    getAllTeams,
    saveSelectedTeams,
    updateResfreshOdds,
    updateSelectedOdds,
    checkLogIn,
    getBettingEvents,
    saveBettingEvents,
    getCustomer,
    updateCustomer,
    saveCustomer,
    updateOutstanding,
    removeOutstanding,
    getOutstanding,
    getwinloseReport,
    getEventResult,
    calculateEventResult,
    getSingleLiveData,
    saveBettingEventsConfirm,
    getVoucherDetails,
    getOverallVoucher,
    updateOverallVoucher
}