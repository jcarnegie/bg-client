import {CHAT_MESSAGE_SEND} from "@/shared/constants/actions";

export const sendChatMessage = msg => ({
  type: CHAT_MESSAGE_SEND,
  payload: msg,
});

