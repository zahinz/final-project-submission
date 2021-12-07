import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import DoctorReducer from "./Doctors"
import QueueReducer from "./Queue"

// this is used as state
export default combineReducers({
  auth: AuthReducer,
  doctor: DoctorReducer,
  queue: QueueReducer
});
