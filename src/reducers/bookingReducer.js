import {
  LIST_BOOKING_REQUEST,
  LIST_BOOKING_SUCCESS,
  LIST_BOOKING_FAIL,
  DELETE_BOOKING_SUCCESS,
  DELETE_BOOKING_REQUEST,
  DELETE_BOOKING_FAIL,
  DELETE_BOOKING_RESET,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_RESET,
  CREATE_BOOKING_FAIL,
  UPDATE_BOOKING_REQUEST,
  UPDATE_BOOKING_SUCCESS,
  UPDATE_BOOKING_FAIL,
  UPDATE_BOOKING_RESET,
} from "../constants/bookingConstants";

export const bookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOOKING_REQUEST:
      return { loading: true };
    case CREATE_BOOKING_SUCCESS:
      return { loading: false, success: true };
    case CREATE_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_BOOKING_RESET:
      return {};
    default:
      return state;
  }
};

export const bookingListReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case LIST_BOOKING_REQUEST:
      return { loading: true };
    case LIST_BOOKING_SUCCESS:
      return { loading: false, bookings: action.payload };
    case LIST_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookingDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BOOKING_REQUEST:
      return { loading: true };
    case DELETE_BOOKING_SUCCESS:
      return { loading: false, success: true };
    case DELETE_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_BOOKING_RESET:
      return {};
    default:
      return state;
  }
};

export const bookingUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BOOKING_REQUEST:
      return { loading: true };
    case UPDATE_BOOKING_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_BOOKING_RESET:
      return {};
    default:
      return state;
  }
};
