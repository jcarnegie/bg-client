import {append} from "ramda";
import {
  CHAT_INIT,
  CHAT_LOAD_MESSAGES,
  CHAT_MESSAGE_RECEIVED,
  CHAT_MESSAGE_SENT,
  CHAT_SET_CHANNEL,
  CHAT_TOGGLE,
} from "@/shared/constants/actions";

const chat = {
    sb: null,
    channels: [],
    currentChannel: null,
    messages: [],
    user: null,
    show: false,
};

export default function chatReducer(state = chat, action) {
  switch (action.type) {
    case CHAT_INIT:
      return {
        ...state,
        sb: action.payload.sb,
        user: action.payload.user,
      };
    case CHAT_LOAD_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case CHAT_MESSAGE_RECEIVED:
      const messages = action.payload.channel.url === state.currentChannel.url
        ? append(action.payload.message, state.messages)
        : state.messages;
      return {
        ...state,
        messages,
      };
    case CHAT_MESSAGE_SENT:
      return {
        ...state,
        messages: append(action.payload, state.messages),
      };
    case CHAT_SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };
    case CHAT_TOGGLE:
      return {
        ...state,
        show: !state.show,
      };
    default:
      return state;
  }
}

