import "./game.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {GAME_REQUEST} from "../../../shared/constants/actions";
import Init from "../common/init";
import Loader from "../common/loader";


@connect(
  state => ({
    game: state.game
  })
)
export default class Game extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    game: PropTypes.object,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.props.dispatch({
      type: GAME_REQUEST,
      payload: this.props.match.params
    });
  }

  renderIframe() {
    const {game} = this.props;
    if (game.isLoading) {
      return (
        <Loader />
      );
    }
    if (!game.success) {
      return (
        <FormattedMessage id="errors.page-not-found" />
      );
    }

    return (<iframe src={game.data.url} />);
  }

  render() {
    return (
      <Row className="game">
        <Col className="grap sandbox">
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
