import "./sandbox.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import Init from "../common/init";
import {Col, Row} from "react-bootstrap";
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
    return (<iframe src={this.state.url} />);
  }

  render() {
    return (
      <Row className="sandbox">
        <Col className="grap">
          <Init />
          {this.renderIframe()}
        </Col>
        <Col className="chat">
          Chat
        </Col>
      </Row>
    );
  }
}
