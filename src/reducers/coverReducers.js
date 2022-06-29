import reducerTemplate from "./reducerTemplate";
import constantsTemplate from "../constants/constantsTemplate";

const coverConstants = new constantsTemplate("COVER");
const coverReducer = new reducerTemplate(coverConstants.constants());

export const getCoverReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case 'GET_COVER_REQUEST':
        return { loading: true };
      case 'GET_COVER_SUCCESS':
        return { loading: false, cover: action.payload };
      case 'GET_COVER_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

export default coverReducer;
