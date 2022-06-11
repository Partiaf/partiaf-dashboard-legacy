import constantsTemplate from "../constants/constantsTemplate";
import actionsTemplate from "./actionsTemplate";

const storeConstants = new constantsTemplate("STORE");
const storeActions = new actionsTemplate(storeConstants.constants(), "stores");

export default storeActions;
