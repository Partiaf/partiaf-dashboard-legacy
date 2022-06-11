import Axios from "axios";

import {
  ADMIN_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_SIGNIN_FAIL,
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNOUT,
  LIST_STORE_REQUEST,
  LIST_STORE_SUCCESS,
  LIST_STORE_FAIL,
  STORE_SIGNIN_REQUEST,
  STORE_SIGNIN_SUCCESS,
  STORE_SIGNIN_FAIL,
  STORE_COVER_REQUEST,
  STORE_COVER_SUCCESS,
  STORE_COVER_FAIL,
  LIST_COVER_REQUEST,
  LIST_COVER_SUCCESS,
  LIST_COVER_FAIL,
  DELETE_COVER_SUCCESS,
  DELETE_COVER_REQUEST,
  DELETE_COVER_FAIL,
  UPDATE_COVER_REQUEST,
  UPDATE_COVER_SUCCESS,
  UPDATE_COVER_FAIL,
  STORE_SIGNOUT,
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_FAIL,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_FAIL,
} from "../constants/adminConstants";

// const URL = "http://localhost:5000/api/v2";
const URL = "https://partiaf-api-recache.herokuapp.com/api/v2";

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(`${URL}/signin`, {
      email,
      password,
    });

    dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signup =
  (
    firstname,
    lastname,
    identificationType,
    identification,
    email,
    phone,
    age,
    address,
    password,
    photo,
    gender,
    date_of_birth

  ) =>
  async (dispatch) => {
    dispatch({
      type: ADMIN_REGISTER_REQUEST,
      payload: {
        firstname,
        lastname,
        identificationType,
        identification,
        email,
        phone,
        age,
        address,
        password,
        photo,
        gender,
        date_of_birth
      },
    });
    try {
      const { data } = await Axios.post(`${URL}/signup`, {
        firstname,
        lastname,
        identificationType,
        identification,
        email,
        phone,
        age,
        address,
        password,
        photo,
        gender,
        date_of_birth
      });

      dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });
      dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("adminInfo", JSON.stringify(data));
      document.location.href = "/verification";
    } catch (error) {
      dispatch({
        type: ADMIN_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const resetPassword =
  (
    email,

  ) =>
  async (dispatch) => {
    dispatch({
      type: "ADMIN_RESET_PASSWORD_REQUEST",
      payload: {
        email,
      },
    });
    try {
      const { data } = await Axios.post(`${URL}/reset-password`, {
        email,
      });

      dispatch({ type: 'ADMIN_RESET_PASSWORD_SUCCESS', payload: data });
      dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("adminInfo", JSON.stringify(data));
      document.location.href = "/verification-reset";
    } catch (error) {
      dispatch({
        type: 'ADMIN_RESET_PASSWORD_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const changePassword =
  (
    email,
    password

  ) =>
  async (dispatch) => {
    dispatch({
      type: "ADMIN_CHANGE_PASSWORD_REQUEST",
      payload: {
        email,
        password
      },
    });
    try {
      const { data } = await Axios.post(`${URL}/change-password`, {
        email,
        password
      });

      dispatch({ type: 'ADMIN_CHANGE_PASSWORD_SUCCESS', payload: data });
      document.location.href = "/";
    } catch (error) {
      dispatch({
        type: 'ADMIN_CHANGE_PASSWORD_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };



export const activeEmail = (code) => async (dispatch)  => {
  dispatch({ type: "ADMIN_ACTIVE_EMAIL_REQUEST", payload: { code } });
  try {
    const { data } = await Axios.post(`${URL}/activate-email`, { code });
    dispatch({ type: "ADMIN_ACTIVE_EMAIL_SUCCESS", payload: data });
    console.log("NEW DATA", data)
    localStorage.setItem("adminInfo", JSON.stringify(data));
    
  } catch (error) {
    dispatch({
      type: "ADMIN_ACTIVE_EMAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem("adminInfo");
  localStorage.removeItem("storeInfo");
  dispatch({ type: ADMIN_SIGNOUT });
  document.location.href = "/";
};

export const createStore = (store) => async (dispatch) => {
  dispatch({ type: CREATE_STORE_REQUEST, payload: store });
  try {
    const { data } = await Axios.post(`${URL}/stores/`, store);

    dispatch({ type: CREATE_STORE_SUCCESS, payload: data });
    dispatch({ type: STORE_SIGNIN_SUCCESS, payload: data });
    console.log(data);
    localStorage.setItem("storeInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CREATE_STORE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStore = (store) => async (dispatch) => {
  dispatch({ type: UPDATE_STORE_REQUEST, payload: store });
  try {
    const { data } = await Axios.put(
      `${URL}/stores/updateStore/${store.id}`,
      store
    );

    dispatch({ type: UPDATE_STORE_SUCCESS, payload: data });
    dispatch({ type: STORE_SIGNIN_SUCCESS, payload: data });
    console.log(data);
    localStorage.setItem("storeInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UPDATE_STORE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listStores = (email) => async (dispatch, getState) => {
  dispatch({ type: LIST_STORE_REQUEST });
  try {
    const { data } = await Axios.get(`${URL}/stores/list?email=${email}`);
    console.log(data.stores);
    dispatch({ type: LIST_STORE_SUCCESS, payload: data.stores });
  } catch (error) {
    dispatch({
      type: LIST_STORE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCovers = (email, storeId) => async (dispatch, getState) => {
  dispatch({ type: LIST_COVER_REQUEST });
  try {
    const { data } = await Axios.get(
      `${URL}/stores/covers?email=${email}&storeId=${storeId}`
    );
    dispatch({ type: LIST_COVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_COVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signinStore = (id, password) => async (dispatch) => {
  dispatch({
    type: STORE_SIGNIN_REQUEST,
    payload: { id, password },
  });
  try {
    const { data } = await Axios.post(`${URL}/signin-store`, {
      id,
      password,
    });

    dispatch({ type: STORE_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("storeInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STORE_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteStore = (email, storeId, password) => async (dispatch) => {
  dispatch({ type: DELETE_STORE_REQUEST });
  try {
    const { data } = await Axios.delete(
      `${URL}/stores?email=${email}&storeId=${storeId}&password=${password}`
    );
    localStorage.removeItem("storeInfo");
    dispatch({ type: STORE_SIGNOUT });
    document.location.href = "/";
  } catch (error) {
    dispatch({
      type: DELETE_STORE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createStoreCover =
  (email, storeId, type, date, hour, price, description, totalLimit, name) =>
  async (dispatch) => {
    dispatch({
      type: STORE_COVER_REQUEST,
      payload: {
        email,
        storeId,
        type,
        date,
        hour,
        price,
        description,
        totalLimit,
        name,
      },
    });
    try {
      const { data } = await Axios.post(`${URL}/stores/createCover`, {
        email,
        storeId,
        type,
        date,
        hour,
        price,
        description,
        totalLimit,
        name,
      });

      dispatch({ type: STORE_COVER_SUCCESS, payload: data });
      // localStorage.setItem("storeInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: STORE_COVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteStoreCover =
  (email, storeId, coverId) => async (dispatch) => {
    dispatch({
      type: DELETE_COVER_REQUEST,
      payload: { email, storeId, coverId },
    });
    try {
      const { data } = await Axios.delete(
        `${URL}/stores/covers/${coverId}?email=${email}&storeId=${storeId}`,
        {
          email,
          storeId,
        }
      );

      dispatch({ type: DELETE_COVER_SUCCESS, payload: data });
      // localStorage.setItem("storeInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: DELETE_COVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updatenStoreCover =
  (
    email,
    storeId,
    coverId,
    type,
    date,
    hour,
    price,
    description,
    totalLimit,
    name
  ) =>
  async (dispatch) => {
    dispatch({
      type: UPDATE_COVER_REQUEST,
      payload: {
        email,
        storeId,
        coverId,
        type,
        date,
        hour,
        price,
        description,
        totalLimit,
        name,
      },
    });
    try {
      const { data } = await Axios.put(`${URL}/stores/updateCover/${coverId}`, {
        email,
        storeId,
        coverId,
        type,
        date,
        hour,
        price,
        description,
        totalLimit,
        name,
      });

      dispatch({ type: UPDATE_COVER_SUCCESS, payload: data });
      // localStorage.setItem("storeInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: UPDATE_COVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signoutBussiness = () => (dispatch) => {
  localStorage.removeItem("storeInfo");
  dispatch({ type: STORE_SIGNOUT });
  document.location.href = "/";
};
