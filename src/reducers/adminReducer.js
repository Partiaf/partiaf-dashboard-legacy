import {
  ADMIN_SIGNIN_FAIL,
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNOUT,
  CREATE_STORE_FAIL,
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_RESET,
  LIST_STORE_REQUEST,
  LIST_STORE_SUCCESS,
  LIST_STORE_FAIL,
  STORE_SIGNIN_REQUEST,
  STORE_SIGNIN_SUCCESS,
  STORE_SIGNIN_FAIL,
  STORE_SIGNOUT,
  STORE_COVER_REQUEST,
  STORE_COVER_SUCCESS,
  STORE_COVER_FAIL,
  STORE_COVER_RESET,
  LIST_COVER_REQUEST,
  LIST_COVER_SUCCESS,
  LIST_COVER_FAIL,
  DELETE_COVER_REQUEST,
  DELETE_COVER_SUCCESS,
  DELETE_COVER_FAIL,
  DELETE_COVER_RESET,
  UPDATE_COVER_REQUEST,
  UPDATE_COVER_SUCCESS,
  UPDATE_COVER_FAIL,
  UPDATE_COVER_RESET,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  UPDATE_STORE_RESET,
} from "../constants/adminConstants";

export const adminSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_SIGNIN_REQUEST:
      return { loading: true };
    case ADMIN_SIGNIN_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const createStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_STORE_REQUEST:
      return { loading: true };
    case CREATE_STORE_SUCCESS:
      return { loading: false, storeInfo: action.payload };
    case CREATE_STORE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_STORE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STORE_REQUEST:
      return { loading: true };
    case UPDATE_STORE_SUCCESS:
      return { loading: false, storeInfo: action.payload };
    case UPDATE_STORE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_STORE_RESET:
      return {};
    default:
      return state;
  }
};

export const storeListReducer = (state = { stores: [] }, action) => {
  switch (action.type) {
    case LIST_STORE_REQUEST:
      return { loading: true };
    case LIST_STORE_SUCCESS:
      return { loading: false, stores: action.payload };
    case LIST_STORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const storeSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_SIGNIN_REQUEST:
      return { loading: true };
    case STORE_SIGNIN_SUCCESS:
      return { loading: false, storeInfo: action.payload };
    case STORE_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case STORE_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const createStoreCoverReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_COVER_REQUEST:
      return { loading: true };
    case STORE_COVER_SUCCESS:
      return { loading: false, success: true };
    case STORE_COVER_FAIL:
      return { loading: false, error: action.payload };
    case STORE_COVER_RESET:
      return {};
    default:
      return state;
  }
};

export const coverListReducer = (state = { covers: [] }, action) => {
  switch (action.type) {
    case LIST_COVER_REQUEST:
      return { loading: true };
    case LIST_COVER_SUCCESS:
      return { loading: false, covers: action.payload };
    case LIST_COVER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteStoreCoverReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COVER_REQUEST:
      return { loading: true };
    case DELETE_COVER_SUCCESS:
      return { loading: false, success: true };
    case DELETE_COVER_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_COVER_RESET:
      return {};
    default:
      return state;
  }
};

export const updateStoreCoverReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COVER_REQUEST:
      return { loading: true };
    case UPDATE_COVER_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_COVER_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_COVER_RESET:
      return {};
    default:
      return state;
  }
};

export const adminActiveEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADMIN_ACTIVE_EMAIL_REQUEST":
      return { loading: true };
    case "ADMIN_ACTIVE_EMAIL_SUCCESS":
      return { loading: false, success: true };
    case "ADMIN_ACTIVE_EMAIL_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
