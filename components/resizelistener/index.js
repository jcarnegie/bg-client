import {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {APP_RESIZE} from "@/shared/constants/actions";


@connect()
class ResizeListener extends Component {
  constructor(props) {
    super(props);
    this.resize = ::this.resize;
  }

  static propTypes = {
    dispatch: PropTypes.func,
  }

  resize() {
    if (!window) return;

    this.props.dispatch({
      type: APP_RESIZE,
      payload: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      },
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    /* Fire once on mount */
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  render() {
    return null;
  }
}

export default ResizeListener;
