import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation, useHistory } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "./App.css";

import AuthService, { refreshAuth } from "./services/auth.service";

import Login from "./components/LoginForm";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardManager from "./components/BoardManager";
import BoardAdmin from "./components/BoardAdmin";

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

var myEnv = dotenv.config()
dotenvExpand(myEnv)

const App = (props) => {
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [history, setHistory] = useState(useHistory());
  const [location, setLocation] = useState(useLocation());
  const [authFailCount, setAuthFailCount] = useState(0);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowManagerBoard(user.roles? user.roles.includes("ROLE_MANAGER"): false);
      setShowAdminBoard(user.roles? user.roles.includes("ROLE_ADMIN"): false);      
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  
  //we analyZe all of responses here and then autenticate user after checks of identity   
  /*  axios.interceptors.response.use((response) => {
      if(authFailCount > 0)
        setAuthFailCount(0);
      return response;
    }, function (error) {
        if (error.response && error.response.status === 401) {
          
      }
      return Promise.reject(error);
  });
  */

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          TS 2.0
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">Home</Link>
          </li>

          {currentUser && showManagerBoard && (
            <li className="nav-item">
              <Link to={"/man"} className="nav-link">
                Manager Board
              </Link>
            </li>
          )}

          {currentUser && showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.userName}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>            
          </div>
        )}
      </nav>

      <div className="container-lg mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/man" component={BoardManager} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

function NoMatch() {
  let location = useLocation();

  return (
    <div className="container-lg">
      <header className="jumbotron">
        <h2>404</h2>
        <h3>Page <code>{location.pathname}</code> not found!</h3>
      </header>
    </div>    
  );
}

export default App;