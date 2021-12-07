import { combineReducers } from "redux";
import AuthReducer from "./Auth";

// this is used as state
export default combineReducers({
  auth: AuthReducer,
});
