import {Component} from "react";
import ReactGA from "react-ga";
import PropTypes from "prop-types";


export default class GAListener extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    trackingId: PropTypes.string,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  static getInitialProps(ctx) {
    return {trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID};
  }

  componentDidMount() {
    if (!process.browser) return;
    ReactGA.initialize(this.props.trackingId);
    GAListener.sendPageView(this.context.router.pathname);
    this.context.router.beforePopState(pathname => GAListener.sendPageView(pathname));
  }

  static sendPageView(pathname) {
    if (pathname) {
      ReactGA.set({page: pathname});
      ReactGA.pageview(pathname);
    }
  }

  render() {
    return this.props.children || null;
  }
}
