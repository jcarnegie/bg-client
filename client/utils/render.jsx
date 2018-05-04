import React from "react";
import {hydrate, render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import IntlWrapper from "../../shared/intl/IntlWrapper";


export default (App, store) => {
  (process.env.RENDERING === "server" ? hydrate : render)(
    <AppContainer>
      <Provider store={store}>
        <IntlWrapper>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </IntlWrapper>
      </Provider>
    </AppContainer>,
    document.getElementById("app")
  );
};
