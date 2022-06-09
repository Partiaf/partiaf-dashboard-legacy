import constantsTemplate from "../constants/constantsTemplate";
import actionsTemplate from "./actionsTemplate";

const buyConstants = new constantsTemplate("BUY");
const buyActions = new actionsTemplate(buyConstants.constants(), "buy");

export default buyActions;
