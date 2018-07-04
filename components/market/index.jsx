import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedHTMLMessage, FormattedMessage, injectIntl } from "react-intl";
import { Grid, Col, Image, Row, Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import Link from "next/link";
import Router from "next/router";

import { Mobile, Desktop } from "@/components/responsive";
import Loader from "@/components/common/loader";

import { GAMES_REQUEST, INVENTORY_ITEMS_REQUEST } from "@/shared/constants/actions";

@injectIntl
@connect(
  state => ({
    items: state.items,
    games: state.games,
    game: state.game,
    user: state.user,
  })
)

export default class Market extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    items: PropTypes.object,
    games: PropTypes.object,
    game: PropTypes.object,
    user: PropTypes.object,
    lastLocation: PropTypes.shape({
      pathname: PropTypes.string, 
    }),
  };
  
  state = {
    filters: {},
  }

  renderEmpty() {
    return (
      <div className="empty">
        <div>
          <h2>
            <FormattedMessage id="pages.inventory.empty" />
          </h2>
          <Image src="/static/images/misc/empty-box.png" />
          <p>
            <FormattedHTMLMessage id="pages.inventory.faq" />
          </p>
        </div>
      </div>
    );
  }


  render() {
    return (
      <div className="marketplace">
        {this.renderEmpty()}
      </div>
    );
  };
};