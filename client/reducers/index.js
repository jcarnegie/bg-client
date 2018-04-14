import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import intl from "./intl";
import messages from "./messages";
import account from "./account";
import user from "./user";


export default combineReducers({
  routing,
  account,
  messages,
  intl,
  user
});
