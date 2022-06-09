import Axios from "axios";

import {
  LIST_BOOKING_REQUEST,
  LIST_BOOKING_SUCCESS,
  LIST_BOOKING_FAIL,
  DELETE_BOOKING_SUCCESS,
  DELETE_BOOKING_REQUEST,
  DELETE_BOOKING_FAIL,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_FAIL,
  UPDATE_BOOKING_REQUEST,
  UPDATE_BOOKING_SUCCESS,
  UPDATE_BOOKING_FAIL,
} from "../constants/bookingConstants";

const URL = "https://partiaf-api-v2.herokuapp.com/api/v1";
// const URL = "http://localhost:4300/api/v1";

export const listBookings = (email, storeId) => async (dispatch, getState) => {
  dispatch({ type: LIST_BOOKING_REQUEST });
  try {
    const { data } = await Axios.get(
      `${URL}/booking?email=${email}&storeId=${storeId}`
    );

    console.log(data);

    dispatch({ type: LIST_BOOKING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_BOOKING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBooking =
  (email, storeId, info, cupo, date, hour, description) => async (dispatch) => {
    dispatch({
      type: CREATE_BOOKING_REQUEST,
      payload: { email, storeId, info, cupo, date, hour, description },
    });
    try {
      const { data } = await Axios.post(`${URL}/bookings/createBooking`, {
        email,
        storeId,
        info,
        cupo,
        date,
        hour,
        description,
      });

      dispatch({ type: CREATE_BOOKING_SUCCESS, payload: data });
      // localStorage.setItem("storeInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: CREATE_BOOKING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteBooking =
  (email, storeId, bookingId) => async (dispatch) => {
    dispatch({
      type: DELETE_BOOKING_REQUEST,
      payload: { email, storeId, bookingId },
    });
    try {
      const { data } = await Axios.delete(
        `${URL}/bookings/${bookingId}?email=${email}&storeId=${storeId}`,
        {
          email,
          storeId,
        }
      );

      dispatch({ type: DELETE_BOOKING_SUCCESS, payload: data });
      // localStorage.setItem("storeInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: DELETE_BOOKING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateBooking =
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
      type: UPDATE_BOOKING_REQUEST,
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
      const { data } = await Axios.put(
        `${URL}/bookings/updateBooking/${coverId}`,
        {
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
        }
      );

      dispatch({ type: UPDATE_BOOKING_SUCCESS, payload: data });
      // localStorage.setItem("storeInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: UPDATE_BOOKING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
