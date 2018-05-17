import {Component} from "react";
import ReactGA from "react-ga";
import PropTypes from "prop-types";


export default class GAListener extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
		trackingId: PropTypes.string
	};

	static contextTypes = {
		router: PropTypes.object
	};

	componentDidMount() {
		ReactGA.initialize(this.props.trackingId);
		GAListener.sendPageView(this.context.router.history.location);
		this.context.router.history.listen(GAListener.sendPageView);
	}

	static sendPageView(location) {
		ReactGA.set({page: location.pathname});
		ReactGA.pageview(location.pathname);
	}

	render() {
		return this.props.children || null;
	}
}
