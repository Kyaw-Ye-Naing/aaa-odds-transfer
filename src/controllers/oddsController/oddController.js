import { apiList } from "../_apiHelper/apiList";
import { getApi } from "../_apiHelper/getApi";
import { postApi } from "../_apiHelper/postApi";
import { putApi } from "../_apiHelper/putApi";

const getAllTeams = (setResponse) => {
    getApi(`${apiList.getTeamApi}`,
    (data) => {
        setResponse(data);
    });
};

const saveSelectedTeams = (rapidEventIdList,setResponse) => {
    postApi(`${apiList.postSelectedTeamApi}`,
    {
        rapidEventId : rapidEventIdList
    },
    (data) =>{
        setResponse(data);
    });
};

const updateResfreshOdds = (setResponse) => {
    getApi(`${apiList.updateOddsApi}`,
    (data) => {
        setResponse(data);
    });
};

const updateSelectedOdds = (rapidEventIdList,setResponse) => {
    putApi(`${apiList.copyTeamApi}`,
    {
        rapidEventId : rapidEventIdList
    },
    (data) => {
        setResponse(data);
    });
};

export const oddController = {
    getAllTeams,
    saveSelectedTeams,
    updateResfreshOdds,
    updateSelectedOdds
}