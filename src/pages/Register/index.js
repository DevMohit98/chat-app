import React, { useState } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/UI/Card";
import { signup } from "../../actions";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";
const Register = (props) => {
  const [registerdata, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const onHandleRegisterData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterData({
      ...registerdata,
      [name]: value,
    });
  };
  const dispatch = useDispatch();
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(registerdata));
  };
  const auth = useSelector((state) => state.auth);
  if (auth.authenticated) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Layout>
        <div className="registerContainer">
          <Card>
            <form onSubmit={HandleSubmit}>
              <h3>Sign Up</h3>
              <input
                type="text"
                name="firstName"
                value={registerdata.firstName}
                onChange={onHandleRegisterData}
                placeholder="firstname"
              />
              <input
                type="text"
                value={registerdata.lastName}
                onChange={onHandleRegisterData}
                placeholder="lastname"
                name="lastName"
              />
              <input
                type="email"
                name="email"
                value={registerdata.email}
                onChange={onHandleRegisterData}
                placeholder="email"
              />
              <input
                type="password"
                value={registerdata.password}
                onChange={onHandleRegisterData}
                placeholder="password"
                name="password"
              />
              <div>
                <button>sign up</button>
              </div>
            </form>
          </Card>
        </div>
      </Layout>
    </>
  );
};
export default Register;
