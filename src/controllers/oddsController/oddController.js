import { apiList } from "../_apiHelper/apiList";
import { getApi } from "../_apiHelper/getApi";
import { postApi } from "../_apiHelper/postApi";
import { putApi } from "../_apiHelper/putApi";

//-------------------- Log In ------------------------------------
const checkLogIn = (name,password,setResponse) => {
    postApi(`${apiList.loginApi}`,
    {
        username : name,
        password : password
    },
    (data) =>{
        setResponse(data);
    });
};

//-------------------- Transfer Page ------------------------------
//--get all teams 
const getAllTeams = (userId,setResponse) => {
    postApi(`${apiList.getTeamApi}`,{
        userId : userId
    },
    (data) => {
        setResponse(data);
    });
};

//--save selected events 
const saveSelectedTeams = (userId,rapidEventIdList,setResponse) => {
    postApi(`${apiList.postSelectedTeamApi}`,
    {
        rapidEventId : rapidEventIdList,
        userId : userId
    },
    (data) =>{
        setResponse(data);
    });
};

//--refresh odds
const updateResfreshOdds = (userId,setResponse) => {
    postApi(`${apiList.updateOddsApi}`,
    {
        userId : userId
    },
    (data) => {
        setResponse(data);
    });
};

//--save updated odds
const updateSelectedOdds = (userId,rapidEventIdList,setResponse) => {
    putApi(`${apiList.copyTeamApi}`,
    {
        rapidEventId : rapidEventIdList,
        userId : userId
    },
    (data) => {
        setResponse(data);
    });
};

//--------------------- Betting Page -------------------------------
//--get betting events
const getBettingEvents = (userId,setResponse) => {
    postApi(`${apiList.bettingEventApi}`,
    {
        userId : userId
    },
    (data) =>{
        setResponse(data);
    });
};

//--save betting events
const saveBettingEvents = (userId,customerId,bettingInfo,setResponse) => {
    console.log("customer id",customerId);
    console.log("user id",userId);
    console.log("api data",bettingInfo);
    postApi(`${apiList.saveBettingEventApi}`,
    {
        userId : userId,
        customerId : customerId,
        bettingDetails : bettingInfo
    },
    (data) => {
        setResponse(data);
    });
};

//--get customers
const getCustomer = (userId,setResponse) => {
    postApi(`${apiList.getCustomerApi}`,
    {
        userId : userId
    },
    (data) => {
        setResponse(data);
    });
};

//--------------------- Customer Page -------------------------------
//--update customer's info
const updateCustomer = (customerInfo,setResponse) => {
    console.log("final api",customerInfo)
    postApi(`${apiList.updateCustomerApi}`,
    {
        customerId : customerInfo.customerId,
        customerName : customerInfo.customerName,
        commission : customerInfo.commission,
        active : customerInfo.active
    },
    (data) => {
        setResponse(data);
    });
};

//--insert new customer
const saveCustomer = (userId,customerInfo,setResponse) => {
    postApi(`${apiList.saveCustomerApi}`,
    {
        customerName : customerInfo.customerName,
        commission : customerInfo.commission,
        userId : userId
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
    saveCustomer
}