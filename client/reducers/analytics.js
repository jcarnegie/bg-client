import { GA_CREATE } from '@/shared/constants/actions';

const analytics = {
  ga: {},
};

export default function accountReducer(state = analytics, action) {
  switch (action.type) {
    case GA_CREATE:
      return Object.assign({}, state, {
        ga: action.payload,
      });
    default:
      return state;
  }
}
