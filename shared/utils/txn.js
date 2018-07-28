import * as log from 'loglevel';
import { path } from 'ramda';

import {
  web3IsInstalled,
} from '@/shared/utils/network';

export const ETH_UNIT_MAP = {
  'wei':          '1',
  'kwei':         '1000',
  'ada':          '1000',
  'femtoether':   '1000',
  'mwei':         '1000000',
  'babbage':      '1000000',
  'picoether':    '1000000',
  'gwei':         '1000000000',
  'shannon':      '1000000000',
  'nanoether':    '1000000000',
  'nano':         '1000000000',
  'szabo':        '1000000000000',
  'microether':   '1000000000000',
  'micro':        '1000000000000',
  'finney':       '1000000000000000',
  'milliether':   '1000000000000000',
  'milli':        '1000000000000000',
  'ether':        '1000000000000000000',
  'kether':       '1000000000000000000000',
  'grand':        '1000000000000000000000',
  'einstein':     '1000000000000000000000',
  'mether':       '1000000000000000000000000',
  'gether':       '1000000000000000000000000000',
  'tether':       '1000000000000000000000000000000',
};

const HEX_15e4 = web3IsInstalled() ? web3.toHex(6e5) : '0x3d090';
export const MAX_GAS_HEX = HEX_15e4;

export const ETH2WEI = Number(ETH_UNIT_MAP.ether);

export const DEFAULT_GAS_PRICE = 1000000;

export const gasOptionsFromGasAndSpeed = (gas, speed = 'fast') => {
  const gasData = path(['data'] , gas);
  if (!gasData) { log.error(`Using a default gasPrice: ${DEFAULT_GAS_PRICE}`); }
  return {
    gas: MAX_GAS_HEX,
    // gasPrice: window.web3.toHex(gasData ? gasData[speed] : DEFAULT_GAS_PRICE),
    gasPrice: DEFAULT_GAS_PRICE,
  };
};
