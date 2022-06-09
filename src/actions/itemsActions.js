import constantsTemplate from "../constants/constantsTemplate";
import actionsTemplate from "./actionsTemplate";

const itemsConstants = new constantsTemplate("ITEM");
const itemsActions = new actionsTemplate(itemsConstants.constants(), "item");

export default itemsActions;
