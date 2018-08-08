import { combineReducers } from 'redux';
import { intlReducer as intl } from 'react-intl-redux';

import account from '@/client/reducers/account';
import analytics from '@/client/reducers/analytics';
import chat from '@/client/reducers/chat';
import layout from '@/client/reducers/layout';
import messages from '@/client/reducers/messages';
import network from '@/client/reducers/network';
import user from '@/client/reducers/user';
import validations from '@/client/reducers/validations';


export default combineReducers({
  analytics,
  account,
  chat,
  intl,
  layout,
  messages,
  network,
  user,
  validations,
});
