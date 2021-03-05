import React from "react";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";


const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
    {currentUser != undefined ? (
    <div className="container-lg">
      
      <header className="header-min">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
        {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
      
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>UserType:</strong> {currentUser.userType}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>  
    ) : (
    <div className="container">
    
      <header className="header-min">
        <h3>
          <strong>User is not Authorized. Use  <Link to={"/login"} className="nav-link">Login</Link> window</strong> to see the Profile
        </h3>
      </header>
    </div>
    )}
    </div>
  );
};

export default Profile;