import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import Init from "../common/init";
import {readFromQueryString} from "../../utils/location";


@withRouter
export default class SandBox extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    url: ""
  };

  componentDidMount() {
    this.setState({
      url: readFromQueryString("sandbox_url", this.props.location.search) || "https://bitguild.info/"
    });
  }

  renderIframe() {
    if (!this.state.url) {
      return null;
    }
    return (<iframe src={this.state.url} style={{height: "calc(100vh - 200px)", width: "100%"}} />);
  }

  render() {
    return (
      <div>
        <Init />
        <h2>Sandbox</h2>
        {this.renderIframe()}
      </div>
    );
  }
}
