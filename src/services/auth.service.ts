import axios from "axios";

const API_URL = "http://kkbox.xnight.ml/api/admin/";

export const register = (username: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    password
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "auth", {
      Username : username,
      Password : password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.Success) {
        let user = {
          username : username,
          password: password
        }
        localStorage.setItem("user", JSON.stringify(user));
      }
      
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
