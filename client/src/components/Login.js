import React, { useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Fade from "react-reveal/Fade";
import logo from "../assets/blk.png";
import logow from "../assets/wht.png";
const CLIENT_URL = "http://localhost:3000/";

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const clientId =
    "114197945251-63g6kbcqan2mk0b44hkmjb7m8mn43f22.apps.googleusercontent.com";

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const loginGoogle = async () => {
    try {
      window.open("http://localhost:5000/users/google/callback", "_self");
    } catch (err) {
      console.log(err);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const [onLogin, setOnLogin] = useState(false);
  const style = {
    visibility: onLogin ? "visible" : "hidden",
    opacity: onLogin ? 1 : 0,
  };

  return (
    <div>
      <Container fluid className="login-out">
        <Row className="content">
          <Col xs="12" sm="6" className="left">
            <div className="left-up ">
              <img href="#" src={logo} />
            </div>
            <Fade up>
              <div className="left-down ">
                <div className="login ">
                  <h2>Welcome back!</h2>
                  <p>Continue with Google or enter your details.</p>

                  <form onSubmit={loginSubmit}>
                    <input
                      className="input mt-5"
                      type="email"
                      name="email"
                      id="login-email"
                      placeholder="Email"
                      required
                      value={user.email}
                      onChange={onChangeInput}
                    />

                    <input
                      className="input mt-3"
                      type="password"
                      name="password"
                      id="login-password"
                      placeholder="Password"
                      required
                      value={user.password}
                      autoComplete="true"
                      onChange={onChangeInput}
                    />
                    <h3 className="err mt-2">{err}</h3>
                    <button className="btn text-center" type="submit">
                      Log in
                    </button>
                    <p className="log-p">
                      Don't have an account?
                      <span className="bold" onClick={() => setOnLogin(true)}>
                        Sign up
                      </span>
                    </p>
                  </form>
                </div>
                <div className="register" style={style}>
                  <h2>Get Started</h2>{" "}
                  <p>Let's start here create your account.</p>
                  <form onSubmit={registerSubmit}>
                    <input
                      className="input mt-5"
                      type="text"
                      name="name"
                      id="register-name"
                      placeholder="User Name"
                      required
                      value={user.name}
                      onChange={onChangeInput}
                    />

                    <input
                      className="input mt-4"
                      type="email"
                      name="email"
                      id="register-email"
                      placeholder="Email"
                      required
                      value={user.email}
                      onChange={onChangeInput}
                    />

                    <input
                      className="input mt-4"
                      type="password"
                      name="password"
                      id="register-password"
                      placeholder="Password"
                      required
                      value={user.password}
                      autoComplete="true"
                      onChange={onChangeInput}
                    />

                    <button className="btn text-center" type="submit">
                      Sign up
                    </button>
                    <p className="log-p">
                      Don't have an account?
                      <span className="bold" onClick={() => setOnLogin(false)}>
                        {" "}
                        Log in
                      </span>
                    </p>
                    <h3>{err}</h3>
                  </form>
                </div>
              </div>
            </Fade>
          </Col>

          <Col xs="0" sm="6" className="right mx-auto">
            <div class="parallax">
              <div class="img text-center">
                <img src={logow} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
