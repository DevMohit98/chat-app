import React, { useEffect } from "react";
import Layout from "../../Components/Layout";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RealtimeUsers } from "../../actions";
const Home = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(RealtimeUsers(auth.uid));
  }, []);
  if (user.user.length > 0) {
    return (
      <>
        <Layout>
          <section className="container">
            <div className="listOfUsers">
              {user.user.length > 0
                ? user.user.map((data, index) => {
                    return (
                      <div className="displayName" key={index}>
                        <div className="displayPic">
                          <img
                            src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
                            alt=""
                          />
                        </div>
                        <div
                          style={{
                            margin: "0 10px",
                            display: "flex",
                            flex: 1,
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{ fontWeight: 500 }}
                          >{`${data.firstName} ${data.lastName}`}</span>
                          <span>{data.isOnline ? "online" : "offline"}</span>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="chatArea">
              <div className="chatHeader"> Rizwan Khan </div>
              <div className="messageSections">
                <div style={{ textAlign: "left" }}>
                  <p className="messageStyle">Hello User</p>
                </div>
              </div>
              <div className="chatControls">
                <textarea />
                <button>Send</button>
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  } else {
    return (
      <Layout>
        <h1>Welcome to chat-app</h1>
      </Layout>
    );
  }
};
export default Home;
