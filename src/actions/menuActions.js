import constantsTemplate from "../constants/constantsTemplate";
import actionsTemplate from "./actionsTemplate";

const menuConstants = new constantsTemplate("MENU");
const menuActions = new actionsTemplate(menuConstants.constants(), "menu");

export default menuActions;
