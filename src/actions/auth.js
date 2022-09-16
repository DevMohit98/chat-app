import { auth, db } from "../Firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ActionTypes } from "../Constants/action-types";
export const signup = (data) => {
  return async (dispatch) => {
    dispatch({ type: `${ActionTypes.USER_LOGIN}_REQUEST` });
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        updateProfile(auth.currentUser, {
          displayName: `${data.firstName} ${data.lastName}`,
        })
          .then(async () => {
            await addDoc(collection(db, "users"), {
              firstName: data.firstName,
              lastName: data.lastName,
              uid: user.user.uid,
              createdAt: new Date(),
              isOnline: true,
            });
            const info = {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              uid: user.user.uid,
            };
            alert("registered successfully");
            localStorage.setItem("user", JSON.stringify(info));
            dispatch({
              type: `${ActionTypes.USER_LOGIN}_SUCCESS`,
              payload: { user: info },
            });
          })
          .catch((error) => {
            dispatch({
              type: `${ActionTypes.USER_LOGIN}_FAILURE`,
              payload: { error },
            });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
export const signin = (user) => {
  return async (dispatch) => {
    dispatch({ type: `${ActionTypes.USER_LOGIN}_REQUEST` });
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((data) => {
        const name = data.user.displayName.split("");
        const firstName = name[0];
        const lastName = name[1];
        const info = {
          firstName,
          lastName,
          email: data.user.email,
          uid: data.user.uid,
        };
        localStorage.setItem("user", JSON.stringify(info));
        dispatch({
          type: `${ActionTypes.USER_LOGIN}_SUCCESS`,
          payload: { user: info },
        });
      })
      .catch((error) => {
        dispatch({
          type: `${ActionTypes.USER_LOGIN}_FAILURE`,
          payload: { error },
        });
      });
  };
};

export const loggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (user) {
      dispatch({
        type: `${ActionTypes.USER_LOGIN}_SUCCESS`,
        payload: { user: user },
      });
    } else {
      dispatch({
        type: `${ActionTypes.USER_LOGIN}_FAILURE`,
        payload: { error: "login agin please" },
      });
    }
  };
};
export const logoutUser = (id) => {
  return async (dispatch) => {
    dispatch({
      type: `${ActionTypes.USER_LOGOUT}_REQUEST`,
    });
    signOut(auth)
      .then(() => {
        localStorage.clear();
        dispatch({
          type: `${ActionTypes.USER_LOGOUT}_SUCCESS`,
        });
      })
      .catch((error) => {
        dispatch({
          type: `${ActionTypes.USER_LOGOUT}_FAILURE`,
          payload: { error: error },
        });
      });
    await setDoc(doc(db, "users", id), {
      isOnline: false,
    });
  };
};
