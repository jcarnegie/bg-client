import { combineReducers } from 'redux';
import { intlReducer as intl } from 'react-intl-redux';

import analytics from '@/client/reducers/analytics';
import chat from '@/client/reducers/chat';
import layout from '@/client/reducers/layout';


export default combineReducers({
  analytics,
  chat,
  intl,
  layout,
});
