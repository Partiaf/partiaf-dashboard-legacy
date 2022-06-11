import reducerTemplate from "./reducerTemplate";
import constantsTemplate from "../constants/constantsTemplate";

const storeConstants = new constantsTemplate("STORE");
const storeReducer = new reducerTemplate(storeConstants.constants());

export const storeAddressMapReducer = (state = {}, action) => {
    switch (action.type) {
        case 'STORE_ADDRESS_MAP_CONFIRM':
            return {address: action.payload};
        default:
            return state;
    }
}

export default storeReducer;
