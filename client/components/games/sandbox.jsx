import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import Init from "../common/init";
import {FormattedMessage} from "react-intl";
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
    let url = readFromQueryString("url", this.props.location.search);
    if (!url) {
      url = "https://bitguild.info/";
    } else if (!/^https?:\/\//.test(url)) {
      alert(`Url is invalid ${url}`);
      return;
    }
    this.setState({url});
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
        <h2>
          <FormattedMessage id="pages.sandbox.title" />
        </h2>
        {this.renderIframe()}
      </div>
    );
  }
}
