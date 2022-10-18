import { apiList } from "../_apiHelper/apiList";
import { getApi } from "../_apiHelper/getApi";
import { postApi } from "../_apiHelper/postApi";
import { putApi } from "../_apiHelper/putApi";

const getAllTeams = (userId,setResponse) => {
    postApi(`${apiList.getTeamApi}`,{
        userId : userId
    },
    (data) => {
        setResponse(data);
    });
};

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

const updateResfreshOdds = (userId,setResponse) => {
    postApi(`${apiList.updateOddsApi}`,
    {
        userId : userId
    },
    (data) => {
        setResponse(data);
    });
};

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

const getBettingEvents = (userId,setResponse) => {
    postApi(`${apiList.bettingEvent}`,
    {
        userId : userId
    },
    (data) =>{
        setResponse(data);
    });
};

export const oddController = {
    getAllTeams,
    saveSelectedTeams,
    updateResfreshOdds,
    updateSelectedOdds,
    checkLogIn,
    getBettingEvents
}