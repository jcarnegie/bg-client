import {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";


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
    isInitialized: false
  };

  componentDidMount() {
    window.addEventListener("message", ::this.receiveMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener("message", ::this.receiveMessage);
  }

  receiveMessage({data, origin, source}) {
    if (data.type === "ping") {
      if (!this.state.isInitialized) {
        this.setState({
          isInitialized: true
        }, () => {
          source.postMessage({
            type: "pong",
            user: this.props.user
          }, origin);
        });
      }
    }
  }

  render() {
    return null;
  }
}
