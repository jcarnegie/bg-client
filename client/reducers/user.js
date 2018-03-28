const user = null;

export default function updateUser(state = user, action) {
  switch (action.type) {
    case "USER_CHANGED":
      return action.payload;
    default:
      return state;
  }
}
