import axios from "axios";
import { ConfigModel } from "../types/Config";
import authHeader from "./auth-header";

const API_URL = "http://kkbox.xnight.ml/api/configs";


export const getConfigs = () => {
  return axios.get(API_URL + "/", { headers: authHeader() }).then((reponse) => {
    return reponse.data
  });
};

export const postConfigs = (config: ConfigModel) => {
  return axios.post(API_URL + "/",config ,{ headers: authHeader() }).then((reponse) => {
    return reponse.data
  });
};

