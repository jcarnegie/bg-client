import React, {Component} from "react";
import PropTypes from "prop-types";
import Init from "../common/init";
import {Col, Row} from "react-bootstrap";

const BITGUILD_INFO_URL = "https://bitguild.info/";
const HEADER_HEIGHT = "62px";

export default class SandBox extends Component {
  static propTypes = {
    query: PropTypes.shape({
      url: PropTypes.string,
    }),
  };

  static async getInitialProps({query}) {
    console.log('getInitialProps: query: ', query);
    return {query: (query || {})};
  }

  renderIframe(query) {
    console.log('query: ', query);
    // let url = query.url && /^https?:\/\//.test(query.url) ? query.url : BITGUILD_INFO_URL;
    let url = query && query.url ? query.url : 'http://test.magicacademy.bitguild.io'
    return <iframe src={url} />;
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
        `}</style>
        <Col className="sandbox">
          <Init />
          {this.renderIframe(query)}
        </Col>
      </Row>
    );
  }
}
