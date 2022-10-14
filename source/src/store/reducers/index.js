import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";

export default combineReducers({
    students: studentReducer,
    auth: authReducer,
});