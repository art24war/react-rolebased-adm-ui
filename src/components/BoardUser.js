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

  return (
    <div className="container-lg">
      <header className="header-min">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardUser;