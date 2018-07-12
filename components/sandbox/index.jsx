import React, {Component} from "react";
import PropTypes from "prop-types";
import Init from "@/components/common/init";
import {Col, Row} from "react-bootstrap";
import * as log from "loglevel";

// const BITGUILD_INFO_URL = "https://bitguild.info/";
const HEADER_HEIGHT = "62px";
const ETHER_ONLINE_URL = "https://ether.online/";


export default class SandBox extends Component {
  static propTypes = {
    query: PropTypes.shape({
      url: PropTypes.string,
    }),
  };

  static async getInitialProps({query}) {
    log.info("getInitialProps: query: ", query);
    return {query: (query || {})};
  }

  state = {
    url: "",
  }

  dom = {
    c: {},
  }

  getDerivedStateFromProps({query}) {
    log.info("query: ", query);
    // let url = query.url && /^https?:\/\//.test(query.url) ? query.url : BITGUILD_INFO_URL;
    let url = query && query.url ? query.url : "http://test.magicacademy.bitguild.io";
    this.setState({url});
  }

  renderIframe() {
    return <iframe src={this.state.url} />;
  }

  render() {
    const {query} = this.props;
    return (
      <Row>
        <style jsx global>{`
          .sandbox iframe {
            height: calc(100vh - ${HEADER_HEIGHT});
            width: 100%;
            border: 0;
            display: block;
          }
          .url-input-wrapper {
            position: absolute;
            top: 5px;
            left: calc(50% - 300px);
            width: 400px;
            z-index: 2000;
          }
          .url-input {
            border: 3px solid gold;
            padding: 10px;
            width: 300px;
          }
          .url-input-button {
            color: black;
            background: gold;
            padding: 13px; 
            border: 0;
            outline: 0;
          }
        `}</style>
        <div className="url-input-wrapper">
          <input ref={c => (this.dom.input = c)} className="url-input" type="text" placeholder={ETHER_ONLINE_URL} />
          <button className="url-input-button" onClick={() => {
            this.setState({url: this.dom.input.value || ETHER_ONLINE_URL});
          }}>Update</button>
        </div>
        <Col className="sandbox">
          <Init />
          {this.renderIframe(query)}
        </Col>
      </Row>
    );
  }
}
