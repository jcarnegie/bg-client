import { combineReducers } from 'redux';
import { intlReducer as intl } from 'react-intl-redux';
import { reducer as responsive } from 'react-responsive-redux'

import analytics from '@/client/reducers/analytics';
import layout from '@/client/reducers/layout';


export default combineReducers({
  analytics,
  intl,
  layout,
  responsive,
});
