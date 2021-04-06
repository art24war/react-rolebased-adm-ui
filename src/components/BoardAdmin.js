import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserService from "../services/user.service";
import UsersTable from "../components/UsersTable";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [history, setHistory] = useState(useHistory());
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
        setContent(_content);
      }
    );
  }, []);

  function loadData(e, context) {
    setRefresh(!refresh);
  }
  const addNew = (e, context) => {
    history.push("/register")
  }

  return (
    <div className="container-lg">
      <header className="header-min">
        <div>{content}</div>
        <button className="btn btn-default" onClick={ loadData }>reload</button>
        <button className="btn btn-default" onClick={ addNew }>+</button>
      </header>
      <div className="table_content"><UsersTable refresh = {refresh}/></div>      
    </div>
  );
};

export default BoardAdmin;