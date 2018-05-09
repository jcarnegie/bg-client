import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import {intlReducer as intl} from "react-intl-redux";
import account from "./account";
import balanceETH from "./balanceETH";
import balancePLAT from "./balancePLAT";
import chat from "./chat";
import game from "./game";
import inventory from "./inventory";
import rate from "./rate";
import network from "./network";
import messages from "./messages";
import user from "./user";


export default combineReducers({
  routing,
  account,
  balanceETH,
  balancePLAT,
  chat,
  game,
  intl,
  inventory,
  messages,
  network,
  rate,
  user
});
