import reducerTemplate from "./reducerTemplate";
import constantsTemplate from "../constants/constantsTemplate";

const itemsConstants = new constantsTemplate("ITEM");
const itemsReducer = new reducerTemplate(itemsConstants.constants());

export default itemsReducer;
