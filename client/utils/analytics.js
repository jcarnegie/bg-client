import ReactGA from "react-ga";

export const triggerPageView = () => ReactGA.pageview(window.location.pathname + window.location.search);

export const initWithHistory = history => {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID);
  /* Trigger initial page view */
  triggerPageView();
  /* Trigger page view on every history push */
  history.listen(() => triggerPageView());
};

export default {
  initWithHistory
};
