import * as log from "loglevel";
import queryString from "query-string";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {withRouter} from "next/router";
import {GAME_REQUEST} from "../../shared/constants/actions";
import InitGameIframeConnection from "../common/init";
import Loader from "../common/loader";
import {defaultLanguage} from "../../shared/constants/language";


@connect(
  state => ({
    game: state.game,
    user: state.user,
  })
)
class Game extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    game: PropTypes.object,
    user: PropTypes.object,
    id: PropTypes.string,
    query: PropTypes.object,
  };

  static getInitialProps({err, req, res, query, store, isServer}) {
    if (err) {
      log.error(err);
    }
    return {...query};
  };

  componentDidMount() {
    const {dispatch, game, id} = this.props;

    if (!game || !game.data || game.data.id !== id) {
      dispatch({
        type: GAME_REQUEST,
        payload: {id},
      });
    }
  }

  renderGame() {
    const {game, user, query} = this.props;

    if (!game) return null;

    const gameLoadingOrNoData = game.isLoading || (!game.success && !game.data);
    if (gameLoadingOrNoData) {
      return <Loader />;
    }

    const gameFetchFailure = !game.success || (!game.data || !game.data.url);
    if (gameFetchFailure) {
      return (
        <FormattedMessage id="errors.page-not-found" />
      );
    }

    const url = game.data.url + (game.data.url.includes("?") ? "&" : "?") + queryString.stringify(query);
    return (<iframe src={url} key={user.data ? user.data.language : defaultLanguage} className="game" />);
  }

  render() {
    return (
      <div>
        <style jsx global>{`
          iframe.game {
            height: calc(100vh - 62px);
            width: 100%;
            border: 0;
            display: block;
          }
        `}</style>
        <InitGameIframeConnection />
        {this.renderGame()}
      </div>
    );
  }
}

export default withRouter(Game);
