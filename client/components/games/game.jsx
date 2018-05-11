import "./game.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {GAME_REQUEST} from "../../../shared/constants/actions";
import Init from "../common/init";
import Loader from "../common/loader";
import Chat from "../chat/chat";
import {defaultLanguage} from "../../../shared/constants/language";


@connect(
  state => ({
    game: state.game,
    user: state.user
  })
)
export default class Game extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    game: PropTypes.object,
    user: PropTypes.object,
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
    const {game, user} = this.props;

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

    return (<iframe src={game.data.url} key={user.data ? user.data.language : defaultLanguage} />);
  }

  render() {
    return (
      <Row className="game">
        <Col className="grap content">
          <Init />
          {this.renderIframe()}
        </Col>
        <Col className="chat">
          <Chat />
        </Col>
      </Row>
    );
  }
}
