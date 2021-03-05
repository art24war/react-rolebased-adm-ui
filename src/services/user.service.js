import axios from "axios";
import authHeader from "./auth.header";

const API_URL = process.env.REACT_APP_USER_API_URL + "test/";
const urlGetUsers = process.env.REACT_APP_USER_API_URL + 'users/list';

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getManagerBoard = () => {
  return axios.get(API_URL + "man", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getAllUsersList = () => {
  return axios.post(urlGetUsers, {}, { headers: authHeader() });
}

export default {
  getPublicContent,
  getUserBoard,
  getManagerBoard,
  getAdminBoard,
  getAllUsersList
};