import reducerTemplate from "./reducerTemplate";
import constantsTemplate from "../constants/constantsTemplate";

const menuConstants = new constantsTemplate("MENU");
const menuReducer = new reducerTemplate(menuConstants.constants());

export default menuReducer;
