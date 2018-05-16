import HTML from "../../client/HTML";
import {renderHTML, renderInitialMarkup} from "./render";
import {defaultLanguage, enabledLanguages} from "../../shared/constants/language";
import {localization} from "../../shared/intl/setup";
import App from "../../client/app";
import configureStore from "../../client/store";


export function renderAppToString(request, response) {

  const preloadedState = {
    intl: {
      locale: defaultLanguage,
      defaultLocale: defaultLanguage,
      enabledLanguages,
      ...(localization[defaultLanguage] || {})
    }
  };

  const store = configureStore(preloadedState);

  const context = {};

  const initialMarkup = renderInitialMarkup(request.url, store, context, App);

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    response.redirect(302, context.url);
  } else {
    console.log('renderHTML with initialMarkup');
    response.status(200).send(renderHTML(initialMarkup, store, HTML));
  }
}

