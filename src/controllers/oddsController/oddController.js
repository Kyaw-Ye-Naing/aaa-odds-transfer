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
const saveBettingEvents = (bettingInfo,setResponse) => {
    console.log("api data",bettingInfo);
    postApi(`${apiList.saveBettingEventApi}`,
    {
        userId : bettingInfo.userId,
        customerId : bettingInfo.customerId,
        bettingDetails : bettingInfo.bettingDetails
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

export const oddController = {
    getAllTeams,
    saveSelectedTeams,
    updateResfreshOdds,
    updateSelectedOdds,
    checkLogIn,
    getBettingEvents,
    saveBettingEvents,
    getCustomer
}