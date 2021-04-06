import axios from "axios";
import {promiseState} from "../helpers/promiseState"

const API_URL = process.env.REACT_APP_USER_API_URL+"users/";

const register = (user, headers) => {
  return axios.post(API_URL + "register", user, headers);
};

const login = async (login, password) => {
  return await axios
    .post(API_URL + "login", {
      login,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

let currentLoginRefresh = null;
export const refreshAuth = async () => {
  var userData = getCurrentUser();
  if(userData == null)
    return Promise.reject({status: 401, message: "Login failed"});
  if(currentLoginRefresh == null || promiseState(currentLoginRefresh) != "pending")
   currentLoginRefresh = axios.post(API_URL + "login", {
    mode: "refresh",
    refreshToken : getCurrentUser().refreshToken
  }).then(async (response) => {
    if(response.data){
      localStorage.setItem("user", JSON.stringify(response.data));
    };
    return Promise.resolve(response);
  }).catch( async (error) => {
    console.log('unauthorized, logging out ...');  
    console.log(getCurrentUser());     
    logout();
    window.location ="/login?return="+ window.location.pathname;   
    return Promise.reject(error);
  });
  return await currentLoginRefresh;
};

const logout = () => {
  localStorage.removeItem("user");  
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const userHasRole =(role) => { 
  let user= getCurrentUser();
  return user && user.roles? user.roles.includes(role): false;
}

const userIsAdmin =() => { 
 return userHasRole("ROLE_ADMIN");
}

const userIsManager =() => { 
  return userHasRole("ROLE_MANAGER");
}



export default {
  register,
  login,
  logout,
  getCurrentUser,
  userIsAdmin,
  userIsManager
};