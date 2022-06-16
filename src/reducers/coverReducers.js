import reducerTemplate from "./reducerTemplate";
import constantsTemplate from "../constants/constantsTemplate";

const coverConstants = new constantsTemplate("COVER");
const coverReducer = new reducerTemplate(coverConstants.constants());

export default coverReducer;
