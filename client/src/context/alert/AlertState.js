import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initailState = [];

  const [state, dispatch] = useReducer(alertReducer, initailState);

  //set alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        setAlert,
        alerts: state
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;