import ReactGA from 'react-ga';
import * as log from 'loglevel';

class BGReactGA {
  constructor(trackingId) {
    this.engine = ReactGA;
    this.initialize(trackingId || process.env.GOOGLE_ANALYTICS_TRACKING_ID);

    this.initialize = ::this.initialize;
    this.pageview = ::this.pageview;
    this.event = ::this.event;
  }

  initialize(trackingId) {
    log.info(`Initializing Google Analytics with Tracking ID: ${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`);
    return this.engine.initialize(trackingId);
  }

  pageview(path) {
    log.info(`Sending Google Analytics pageview for path: ${path}`);
    return this.engine.pageview(path);
  }

  event(event) {
    log.info('Sending Google Analytics event: ', event);
    return this.engine.event(event);
  }
};


export default BGReactGA;
