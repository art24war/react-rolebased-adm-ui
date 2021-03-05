import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [history, setHistory] = useState(useHistory());

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        if(error.status == 401)
        {
          history.push("/login");
        }
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container-lg">
      <header className="header-min">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardUser;