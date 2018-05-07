import {
  CHAT_INIT,
  CHAT_LOAD_MESSAGES,
  CHAT_MESSAGE_SENT,
  CHAT_RECEIVE_MESSAGE,
  CHAT_SET_CHANNEL
} from "../../shared/constants/actions";

const chat = {
    sb: null,
    channels: [],
    currentChannel: null,
    messages: [],
    user: null
};

export default function chatReducer(state = chat, action) {
  switch (action.type) {
    case CHAT_INIT:
      return {
        ...state,
        sb: action.payload.sb,
        user: action.payload.user
      };
    case CHAT_LOAD_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages
      }
    case CHAT_RECEIVE_MESSAGE:
      return {
        ...state,
        wallet: null,
        isLoading: false,
        success: false
      };
    case CHAT_MESSAGE_SENT:
      return state;
    case CHAT_SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.channel
      };
    default:
      return state;
  }
}

