import Axios from "axios";

export default class actionsTemplate {
  constructor(constants, api) {
    this.LIST_REQUEST = constants.LIST_REQUEST;
    this.LIST_SUCCESS = constants.LIST_SUCCESS;
    this.LIST_FAIL = constants.LIST_FAIL;

    this.CREATE_REQUEST = constants.CREATE_REQUEST;
    this.CREATE_SUCCESS = constants.CREATE_SUCCESS;
    this.CREATE_FAIL = constants.CREATE_FAIL;
    this.CREATE_RESET = constants.CREATE_RESET;

    this.UPDATE_REQUEST = constants.UPDATE_REQUEST;
    this.UPDATE_SUCCESS = constants.UPDATE_SUCCESS;
    this.UPDATE_FAIL = constants.UPDATE_FAIL;
    this.UPDATE_RESET = constants.UPDATE_RESET;

    this.DELETE_REQUEST = constants.DELETE_REQUEST;
    this.DELETE_SUCCESS = constants.DELETE_SUCCESS;
    this.DELETE_FAIL = constants.DELETE_FAIL;
    this.DELETE_RESET = constants.DELETE_RESET;

    this.api = api;
    // this.URL = "https://partiaf-api-v2.herokuapp.com/api/v1";
    this.URL = "http://localhost:5000/api/v2";
    
    // this.URL = "http://localhost:4300/api/v1";
  }

  list = (id) => async (dispatch) => {
    dispatch({ type: this.LIST_REQUEST });
    try {
      const { data } = await Axios.get(
        `${this.URL}/${this.api}/${id}`
      );

      dispatch({ type: this.LIST_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: this.LIST_FAIL, payload: err });
    }
  };

  create = (props) => async (dispatch) => {
    dispatch({ type: this.CREATE_REQUEST, payload: props });
    try {
      const { data } = await Axios.post(
        `${this.URL}/${this.api}`,
        props
      );
      dispatch({ type: this.CREATE_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: this.CREATE_FAIL, payload: err });
    }
  };

  update = (props) => async (dispatch, getState) => {
    dispatch({ type: this.UPDATE_REQUEST, payload: { props } });

    try {
      const { data } = await Axios.put(`${this.URL}/${this.api}/${props._id}`, {
        props,
      });
      dispatch({ type: this.UPDATE_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: this.UPDATE_FAIL, payload: err });
    }
  };

  delete = (id, email, storeId, menuId) => async (dispatch, getState) => {
    console.log(email, storeId);
    dispatch({ type: this.DELETE_REQUEST, payload: id });
    try {
      const { data } = await Axios.delete(
        `${this.URL}/${this.api}/${id}?email=${email}&storeId=${storeId}&menuId=${menuId}`
      );
      dispatch({ type: this.DELETE_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: this.DELETE_FAIL, payload: err });
    }
  };
}
