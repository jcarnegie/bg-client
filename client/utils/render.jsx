import React from "react";
import {hydrate, render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Router} from "react-router-dom";
import {Provider} from "react-intl-redux";
import history from "@/utils/history";
import analytics from "@/utils/analytics";

analytics.initWithHistory(history);

export default (App, store) => {
  (process.env.RENDERING === "server" ? hydrate : render)(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById("app")
  );
};
