import React, {Component} from "react";
import PropTypes from "prop-types";
import Init from "../common/init";
import {Col, Row} from "react-bootstrap";
import Chat from "../chat";

const BITGUILD_INFO_URL = "https://bitguild.info/";

export default class SandBox extends Component {
  static propTypes = {
    query: PropTypes.shape({
      url: PropTypes.string
    })
  };

  static async getInitialProps({query}) {
    return {query: query || {}};
  }

  render() {
    const {query} = this.props;
    let url = query.url && /^https?:\/\//.test(query.url) ? query.url : BITGUILD_INFO_URL;

    return (
      <>
        <style jsx="true">{`
          .sandbox {
            iframe {
              height: calc(100vh - 62px);
              width: 100%;
              border: 0;
              display: block;
            }
          }
        `}</style>
        <Row>
          <Col className="grap sandbox">
            <Init />
            <iframe src={url} />
          </Col>
          <Col className="chat">
            <Chat />
          </Col>
        </Row>
      </>
    );
  }
}
