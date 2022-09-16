import { ActionTypes } from "../Constants/action-types";
import { db } from "../Firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
export const RealtimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${ActionTypes.REAL_TIME_USER}_REQUEST` });
    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });
      dispatch({
        type: `${ActionTypes.REAL_TIME_USER}_SUCCESS`,
        payload: { users },
      });
    });
  };
};
