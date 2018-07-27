import { GAMES_CHANGED, GAMES_ERROR, GAMES_LOADING } from '@/shared/constants/actions';

const games = {
  isLoading: false,
  success: false,
  data: null,
  /* TODO - Add descriptions, use database? */
  active: [
    {
      name: 'Ether Online',
      slug: 'ether.online',
      description: '',
    },
    {
      name: 'Magic Academy',
      slug: 'magicacademy',
      description: '',
    },
  ],
  comingSoon: [
    {
      name: 'Bitizens',
      slug: 'bitizens',
      description: '',
    },
    {
      name: 'Axie Infinity',
      slug: 'axie',
      description: '',
    },
    {
      name: 'Mythereum',
      slug: 'mythereum',
      description: '',
    },
    {
      name: 'Eth Town',
      slug: 'eth_town',
      description: '',
    },
    {
      name: 'Cryptage',
      slug: 'cryptage',
      description: '',
    },
    {
      name: 'CryptoDungeons',
      slug: 'cryptodungeons',
      description: '',
    },
    {
      name: 'Blockchain Cuties',
      slug: 'blockchaincuties',
      description: '',
    },
    {
      name: 'Pixo Arena',
      slug: 'pixoarena',
      description: '',
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
