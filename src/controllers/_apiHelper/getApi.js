import logOutFirebase from "../../utils/firebaseLogout";
import { authHeader, baseUrl,handleResponse } from "../_constants";
export const getApi = async (url, setData) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  fetch(`${baseUrl}${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => setData(data))
    .catch((error) => {
      console.log("get_error>>>", error);
      // if(error.status === 401) {
      //   let username = localStorage.getItem("userName");
      //   logOutFirebase(username?.toLowerCase().trim());

      // }
    });
};