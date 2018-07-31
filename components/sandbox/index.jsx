import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Init from '@/components/common/init';
import { Col, Row } from 'react-bootstrap';
import * as log from 'loglevel';

import style from '@/shared/constants/style';

const BITGUILD_INFO_URL = 'https://bitguild.info/';

export default class SandBox extends Component {
  static propTypes = {
    query: PropTypes.shape({
      url: PropTypes.string,
    }),
  };

  static async getInitialProps({ query }) {
    log.info('getInitialProps: query: ', query);
    return { query: (query || {}) };
  }

  renderIframe(query) {
    log.info('Rendering iFrame with query: ', query);
    return <iframe src={query ? query.url : BITGUILD_INFO_URL} />;
  }

  render() {
    return (
      <Row>
        <style jsx global>{`
          .sandbox iframe {
            height: calc(100vh - ${style.header.height});
            width: 100%;
            border: 0;
            display: block;
          }
        `}</style>
        <Col className="sandbox">
          <Init />
          {this.renderIframe(this.props.query)}
        </Col>
      </Row>
    );
  }
}
