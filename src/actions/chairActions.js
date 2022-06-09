import constantsTemplate from "../constants/constantsTemplate";
import actionsTemplate from "./actionsTemplate";

const chairConstants = new constantsTemplate("CHAIR");
const chairActions = new actionsTemplate(chairConstants.constants(), "chairs");

export default chairActions;
