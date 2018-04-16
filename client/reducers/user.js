const user = {
  isLoaded: false,
  data: null
};

export default function updateUser(state = user, action) {
  switch (action.type) {
    case "USER_CHANGED":
      return Object.assign({}, user, {
        isLoaded: true,
        data: action.payload
      });
    default:
      return state;
  }
}
