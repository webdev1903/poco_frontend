import {
  LOGIN,
  LOGINERROR,
  LOGOUT,
  ERROR,
  ADDTASK,
  GETTASKS,
  REFRESHTOKEN,
  DELETETASK,
} from "./user.types";
import axios from "axios";

const api = "https://poco.onrender.com";

export const login = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/login`, data);
    return dispatch({ type: LOGIN, payload: res.data });
  } catch (error) {
    return dispatch({ type: LOGINERROR, payload: error });
  }
};

export const logout = () => {
  return { type: LOGOUT };
};

export const addTask = (data, config) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}`, data, config);
    return dispatch({ type: ADDTASK, payload: res.data });
  } catch (error) {
    return dispatch({ type: ERROR, payload: error });
  }
};

export const getTasks = (config) => async (dispatch) => {
  try {
    const res = await axios.get(`${api}`, config);
    return dispatch({ type: GETTASKS, payload: res.data });
  } catch (error) {
    return dispatch({ type: ERROR, payload: error });
  }
};

export const refreshToken = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${api}/refreshToken`, data);
    return dispatch({ type: REFRESHTOKEN, payload: res.data });
  } catch (error) {
    return dispatch({ type: ERROR, payload: error });
  }
};

export const deleteTask = (id, config) => async (dispatch) => {
  try {
    const res = await axios.delete(`${api}/${id}`, config);
    return dispatch({ type: DELETETASK, payload: id });
  } catch (error) {
    return dispatch({ type: ERROR, payload: error });
  }
};
