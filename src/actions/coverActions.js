import constantsTemplate from "../constants/constantsTemplate";
import actionsTemplate from "./actionsTemplate";

const coverConstants = new constantsTemplate("COVER");
const coverActions = new actionsTemplate(coverConstants.constants(), "covers");

export default coverActions;
