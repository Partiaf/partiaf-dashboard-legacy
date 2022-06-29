import axios from "axios";
import constantsTemplate from "../constants/constantsTemplate";
import actionsTemplate from "./actionsTemplate";

const coverConstants = new constantsTemplate("COVER");
const coverActions = new actionsTemplate(coverConstants.constants(), "covers");

// const URL = "http://localhost:5000/api/v2";
const URL = "https://partiaf-api-recache.herokuapp.com/api/v2";
export const getCover = (id) => async (dispatch, getState) => {
    dispatch({ type: 'GET_COVER_REQUEST' });
    try {
      const { data } = await axios.get(
        `${URL}/cover/${id}`
      );
  
      dispatch({ type: 'GET_COVER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'GET_COVER_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export default coverActions;
