const account = {
  wallet: null
};

export default function hashReducer(state = account, action) {
	switch (action.type) {
		case "CHANGE_ACCOUNT":
      return Object.assign({}, state, {wallet: action.payload.wallet});
		default:
			return state;
	}
}
