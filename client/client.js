import App from "./app";
import render from "./utils/render";
import configureStore from "./store";


const store = configureStore(window.__INITIAL_STATE__);

render(App, store);

if (module.hot) {
  module.hot.accept("./app", () => {
    render(App, store);
  });
}
