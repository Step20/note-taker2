import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/blk.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CLIENT_URL = "http://localhost:3000/";

export default function Nav({ setIsLogin, user }) {
  const [users, setUsers] = useState("");
  const [token, setToken] = useState("");

  const getUsers = async (token) => {
    const res = await axios.get("/users", {
      headers: { Authorization: token },
    });
    console.log(res.data);
    setUsers(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getUsers(token);
    }
  }, []);

  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      <ul className="right">
        <li>
          <p>Hi, {users}</p>
        </li>

        <li onClick={logoutSubmit}>
          <Link to="/">
            <Button className="btn">Log out</Button>
          </Link>
        </li>
      </ul>
    </header>
  );
}
