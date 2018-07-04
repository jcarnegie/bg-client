import {GAMES_CHANGED, GAMES_ERROR, GAMES_LOADING} from "../../shared/constants/actions";

const games = {
  isLoading: false,
  success: false,
  data: null,
  /* TODO - Add descriptions, use database? */
  active: [
    {
      name: "Ether Online",
      slug: "ether.online",
      description: "I am a crypto game and I am very interesting to the user.",
    },
    {
      name: "Magic Academy",
      slug: "magicacademy",
      description: "I am a crypto game and I am very interesting to the user.",
    },
  ],
  comingSoon: [
    {
      name: "Bitizens",
      slug: "bitizens",
      description: "I am a crypto game and I am very interesting to the user.",
    },
    {
      name: "Axie Infinity",
      slug: "axie",
      description: "I am a crypto game and I am very interesting to the user.",
    },
    {
      name: "Mythereum",
      slug: "mythereum",
      description: "I am a crypto game and I am very interesting to the user.",
    },
    {
      name: "Eth Town",
      slug: "eth_town",
      description: "I am a crypto game and I am very interesting to the user.",
    },
  ],
};

export default function gameReducer(state = games, action) {
  switch (action.type) {
    case GAMES_LOADING:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false,
      });
    case GAMES_CHANGED:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true,
      });
    case GAMES_ERROR:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false,
      });
    default:
      return state;
  }
}
