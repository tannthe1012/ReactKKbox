import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:3030/api/report";


export const getDataReport = () => {
  return axios.get(API_URL + "/", { headers: authHeader() }).then((reponse) => {
    return reponse.data
  });
};
export const getReport = () => {
  return axios.get(API_URL + "/clients" + "?skip=0&limit=40&stringfilter", { headers: authHeader() }).then((reponse) => {
    return reponse.data.Data
  });
};
