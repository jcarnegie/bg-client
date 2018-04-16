const account = {
  isLoaded: false,
  wallet: null
};

export default function hashReducer(state = account, action) {
  switch (action.type) {
    case "CHANGE_ACCOUNT":
      return Object.assign({}, state, {
        isLoaded: true,
        wallet: action.payload.wallet
      });
    default:
      return state;
  }
}
