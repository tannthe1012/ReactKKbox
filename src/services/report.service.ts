import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:3030/api/report";


export const getDataReport = () => {
  return axios.get(API_URL + "/", { headers: authHeader() }).then((reponse) => {
    return reponse.data
  });
};

export const getReport = (skip:number, limit:number) => {
  return axios.get(API_URL + "/clients" + `?skip=${skip}&limit=${limit}&stringfilter`, { headers: authHeader() }).then((reponse) => {
    return reponse.data.Data
  });
};
export const getAllReport = () => {
  return axios.get(API_URL + "/all", { headers: authHeader() }).then((reponse) => {
    return reponse.data.Data
  });
};
