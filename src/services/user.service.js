import axios from "axios";
import authHeader from "./auth.header";
import { refreshAuth } from "./auth.service"

const API_URL_TEST = process.env.REACT_APP_USER_API_URL + "test/";
const urlGetUsers = process.env.REACT_APP_USER_API_URL + 'users/list';

const refreshAuthCallback = async (error, callback, retry) => { 
  if(error.response.status == 401 && retry == undefined){
    return refreshAuth().then(async () => {
      return Promise.resolve(await callback(true));  
    });        
  };
  return Promise.reject(error);
}

const getPublicContent = async () => {
  return await axios.get(API_URL_TEST + "all");
};

const getUserBoard = async (retry) => {
  return await axios.get(API_URL_TEST + "user", { headers: authHeader() })
    .catch((error) => refreshAuthCallback(error, getUserBoard, retry));
};

const getManagerBoard = async (retry) => {
  return await axios.get(API_URL_TEST + "man", { headers: authHeader() })
    .catch((error) => refreshAuthCallback(error, getManagerBoard, retry));
};

const getAdminBoard = async (retry) => {
  return await axios.get(API_URL_TEST + "admin", { headers: authHeader() })
  .catch((error) => refreshAuthCallback(error, getAdminBoard, retry));
};

const getAllUsersList = async (retry) => {
  return await axios.post(urlGetUsers, {}, { headers: authHeader() })
  .catch((error) => refreshAuthCallback(error, getAllUsersList, retry));
}

export default {
  getPublicContent,
  getUserBoard,
  getManagerBoard,
  getAdminBoard,
  getAllUsersList
};