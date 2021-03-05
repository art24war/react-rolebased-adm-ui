import axios from "axios";

const API_URL = process.env.REACT_APP_USER_API_URL+"users/";

const register = (user, headers) => {
  return axios.post(API_URL + "register", user, headers);
};

const login = (login, password) => {
  return axios
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
  userIsAdmin
};