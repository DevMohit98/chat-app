import React, { useState } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/auth";
import { Navigate } from "react-router-dom";
import "./style.css";
const Login = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const onHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const userLogin = (event) => {
    event.preventDefault();
    if (data.email === "" || data.password === "") {
      alert("all fields required");
    }
    dispatch(signin(data));
  };
  const auth = useSelector((state) => state.auth);
  if (auth.authenticated) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Layout>
        <div className="loginContainer">
          <Card>
            <form onSubmit={userLogin}>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={onHandleChange}
                placeholder="email"
              />
              <input
                type="password"
                value={data.password}
                onChange={onHandleChange}
                placeholder="password"
                name="password"
              />
              <div>
                <button>login</button>
              </div>
            </form>
          </Card>
        </div>
      </Layout>
    </>
  );
};
export default Login;
