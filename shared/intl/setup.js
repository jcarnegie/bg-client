import { enabledLanguages } from '../constants/language';

// here you bring in "intl" browser polyfill and language-specific polyfills
// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
// as well as react-intl"s language-specific data
// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)
import { addLocaleData } from 'react-intl';

// need Intl polyfill, Intl not supported in Safari
import Intl from 'intl';
import areIntlLocalesSupported from 'intl-locales-supported';

// bring in intl polyfill, react-intl, and app-specific language data
import 'intl/locale-data/jsonp/en';
import en from 'react-intl/locale-data/en';
import enData from './localization/en';

import 'intl/locale-data/jsonp/zh';
import zh from 'react-intl/locale-data/zh';
import zhData from './localization/zh';


import 'intl/locale-data/jsonp/fr';
import fr from 'react-intl/locale-data/fr';
import frData from './localization/fr';


import 'intl/locale-data/jsonp/pt';
import pt from 'react-intl/locale-data/pt';
import ptData from './localization/pt';


import 'intl/locale-data/jsonp/ja';
import ja from 'react-intl/locale-data/ja';
import jaData from './localization/ja';


import 'intl/locale-data/jsonp/ru';
import ru from 'react-intl/locale-data/ru';
import ruData from './localization/ru';


import 'intl/locale-data/jsonp/es';
import es from 'react-intl/locale-data/es';
import esData from './localization/es';

// this object will have language-specific data added to it which will be placed in the state when that language is active
// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages
export const localization = {};

if (global.Intl) {
	// Determine if the built-in `Intl` has the locale data we need.
	if (!areIntlLocalesSupported(enabledLanguages)) {
		// `Intl` exists, but it doesn't have the data we need, so load the
		// polyfill and patch the constructors we need with the polyfill"s.
		global.Intl.NumberFormat = Intl.NumberFormat;
		global.Intl.DateTimeFormat = Intl.DateTimeFormat;
	}
} else {
	// No `Intl`, so use and load the polyfill.
	global.Intl = Intl;
}

// use this to allow nested messages, taken from docs:
// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
function flattenMessages(nestedMessages = {}, prefix = '') {
	return Object.keys(nestedMessages).reduce((messages, key) => {
		const value = nestedMessages[key];
		const prefixedKey = prefix ? `${prefix}.${key}` : key;

		if (typeof value === 'string') {
			messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
		} else {
			Object.assign(messages, flattenMessages(value, prefixedKey));
		}

		return messages;
	}, {});
}
addLocaleData(en);
const defaultMessages = flattenMessages(enData);
localization.en = {
  locale: 'en',
	messages: defaultMessages,
};
addLocaleData(zh);
localization.zh = {
  locale: 'zh',
	messages: Object.assign({}, defaultMessages, flattenMessages(zhData)),
};
addLocaleData(fr);
localization.fr = {
  locale: 'fr',
	messages: Object.assign({}, defaultMessages, flattenMessages(frData)),
};
addLocaleData(pt);
localization.pt = {
  locale: 'pt',
	messages: Object.assign({}, defaultMessages, flattenMessages(ptData)),
};
addLocaleData(ja);
localization.ja = {
  locale: 'ja',
	messages: Object.assign({}, defaultMessages, flattenMessages(jaData)),
};
addLocaleData(ru);
localization.ru = {
  locale: 'ru',
	messages: Object.assign({}, defaultMessages, flattenMessages(ruData)),
};
addLocaleData(es);
localization.es = {
  locale: 'es',
	messages: Object.assign({}, defaultMessages, flattenMessages(esData)),
};

