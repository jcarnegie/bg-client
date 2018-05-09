import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import {intlReducer as intl} from "react-intl-redux";
import messages from "./messages";
import account from "./account";
import user from "./user";
import rate from "./rate";
import network from "./network";
import inventory from "./inventory";
import balanceETH from "./balanceETH";
import balancePLAT from "./balancePLAT";
import chat from "./chat";


export default combineReducers({
  routing,
  account,
  inventory,
  balanceETH,
  balancePLAT,
  messages,
  intl,
  network,
  rate,
  user,
  chat
});
