import reducerTemplate from "./reducerTemplate";
import constantsTemplate from "../constants/constantsTemplate";

const chairConstants = new constantsTemplate("CHAIR");
const chairReducer = new reducerTemplate(chairConstants.constants());

export default chairReducer;
