import reducerTemplate from "./reducerTemplate";
import constantsTemplate from "../constants/constantsTemplate";

const buyConstants = new constantsTemplate("BUY");
const buyReducer = new reducerTemplate(buyConstants.constants());

export default buyReducer;
