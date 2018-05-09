import {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {isEqual} from "lodash";


@connect(
  state => ({
    user: state.user
  })
)
export default class Init extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  state = {
    user: this.props.user.data,
    sources: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.user.isLoading && nextProps.user.success && !isEqual(nextProps.user.data, prevState.user)) {
      Object.keys(prevState.sources).forEach(origin => {
        prevState.sources[origin].postMessage({
          type: "user",
          user: nextProps.user.data
        }, origin);
      });

      return {
        user: nextProps.user.data
      };
    }

    return null;
  }

  componentDidMount() {
    window.addEventListener("message", ::this.receiveMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener("message", ::this.receiveMessage);
  }

  receiveMessage({data, origin, source}) {
    if (!this.state.sources[origin]) {
      this.setState({
        sources: {
          ...this.state.sources,
          [origin]: source
        }
      });
    }

    switch (data.type) {
      case "ping":
        source.postMessage({
          type: "pong"
        }, origin);
        break;
      case "user":
        source.postMessage({
          type: "user",
          user: this.state.user
        }, origin);
        break;
      default:
        break;
    }
  }

  render() {
    return null;
  }
}
