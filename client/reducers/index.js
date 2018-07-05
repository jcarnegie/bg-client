import {combineReducers} from "redux";
import {intlReducer as intl} from "react-intl-redux";

import account from "@/client/reducers/account";
import analytics from "@/client/reducers/analytics";
import balanceETH from "@/client/reducers/balanceETH";
import balancePLAT from "@/client/reducers/balancePLAT";
import chat from "@/client/reducers/chat";
import game from "@/client/reducers/game";
import games from "@/client/reducers/games";
import gas from "@/client/reducers/gas";
import gifts from "@/client/reducers/gifts";
import items from "@/client/reducers/items";
import layout from "@/client/reducers/layout";
import messages from "@/client/reducers/messages";
import network from "@/client/reducers/network";
import rate from "@/client/reducers/rate";
import user from "@/client/reducers/user";
import validations from "@/client/reducers/validations";


export default combineReducers({
  analytics,
  account,
  balanceETH,
  balancePLAT,
  chat,
  game,
  games,
  gas,
  gifts,
  intl,
  items,
  layout,
  messages,
  network,
  rate,
  user,
  validations,
});
