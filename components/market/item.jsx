import React, {Component, Fragment} from "react";
import {Badge, Button, ButtonGroup, Col, Thumbnail} from "react-bootstrap";
import PropTypes from "prop-types";
import {FormattedMessage, injectIntl} from "react-intl";
import {compose, filter, isNil, map, not} from "ramda";
import {isValidItemCategory, itemStats} from "../../client/utils/item";
import {connect} from "react-redux";

const notNil = compose(not, isNil);

@injectIntl
@connect(
  state => ({
  })
)
export default class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      game: PropTypes.object,
      name: PropTypes.string,
      image: PropTypes.string,
      attrs: PropTypes.object,
      presale: PropTypes.bool,
    }),
    game: PropTypes.shape({
      nft: PropTypes.object,
    }),
    maxStats: PropTypes.number,
  };

  state = {
    buy: false,
  };

  onShowBuy(e) {
    e.preventDefault();
    this.setState({
      buy: true,
    });
  }

  onHideBuy() {
    this.setState({
      buy: false,
    });
  }

  renderStats() {
    const {item, maxStats} = this.props;
    return (
      <dl>
        {map(stat => (
          <Fragment key={stat.keyLan} className="statNameAndValue">
            <dt>{stat.keyLan}<FormattedMessage id="components.colon" /></dt>
            <dd>{stat.value}</dd>
          </Fragment>
        ), itemStats(item))}
      </dl>
    );
  }

  renderAttributes() {
    const {item} = this.props;
    const attributes = filter(notNil, Object.values(item.attrs || []).map(attr => Object.values(attr)[1]));
    return (
      <div className="attrs">
        {attributes
          .filter(isValidItemCategory)
          .map(attribute =>
            <Badge key={attribute}>
              {attribute}
            </Badge>
          )}
      </div>
    );
  }

  renderBuyButton() {
    const {item, game} = this.props;
    return (
      <ButtonGroup justified>
        <Button href="#" onClick={::this.onShowBuy} className="buy">
          Buy for<img src="/static/images/icons/plat.png" className="platToken" />{item.price.plat}
          {/* <FormattedMessage id="Buy" /> */}
        </Button>
      </ButtonGroup>
    );
  }

  render() {
    const {item, game} = this.props;
    return (
      <Col sm={6} md={4} lg={3} className="item">
      <style jsx global>{`
          .item {
            padding-left: 35px;
            padding-right: 35px;
          }
          .item .thumbnail {
            padding: 0;
            border: 0;
            background-color: #FAFAFA;
            border-radius: 6px;
          }
          .item .thumbnail img {
            height: 100%;
            width: 100%;
          }
          .item .thumbnail .caption {
            padding: 0;
            background-color: #ffffff;
            border-radius: 6px;
          }
          .item .thumbnail .caption h4 {
            font-size: 18px;
            font-weight: 500;
            background-color: #F4F6F9;
            padding: 10px 15px 5px 15px;
            margin: 0;
          }
          .item .thumbnail .caption dl {
            font-size: 13px;
            background-color: #F4F6F9;
            padding: 5px 15px 5px 15px;
            margin: 0;
          }
          .item .thumbnail .caption dl dt {
            display: inline-block;
            font-weight: 300;
          }
           .item .thumbnail .caption dl dt:not(:first-child) {
            display: inline-block;
            font-weight: 300;
            padding-left: 5px;
          }
          .item .thumbnail .caption dl dd {
            display: inline-block;
            font-weight: 500;
            margin-left: 5px;
          }
          .item .thumbnail .caption .btn {
            font-size: 11px;
            text-transform: uppercase;
            line-height: 16px;
            border-radius: 0;
            border: 0;
          }
          .item .thumbnail .caption .btn.buy {
            font-weight: 500;
            color: #ffffff;
            background-color: rgb(49, 75, 136);
            height: 40px;
            font-size: 14px;
            border-radius: 0px 0px 6px 6px;
          }
          .item .thumbnail .caption .btn.buy:hover {
            background-color: rgb(83, 110, 173);
          }
          .item .thumbnail .platToken {
            display: inline-block;
            height: auto;
            width: auto;
            padding: 0px 5px 4px 5px;
            line-height: 16px;
          }
          .item .thumbnail .caption .tx {
            height: 28px;
            line-height: 28px;
            color: #FF6845;
            font-weight: 500;
            font-size: 13px;
            text-align: center;
          }
          .item .thumbnail .caption .attrs {
            background-color: #F4F6F9;
            padding: 5px 0px 10px 0px;
          }
          .item .thumbnail .caption .attrs {
            background-color: #F4F6F9;
          }
          .item .thumbnail .caption .attrs .badge:first-child {
          margin-right: 3px;
          margin-bottom: 5px;
          margin-left: 10px;
          background-color: #ffffff;
          border: 1px solid #C9C9C9;
          border-radius: 12px;
          color: #797979;
          font-weight: 300;
          font-size: 12px;
          line-height: 18px;
          cursor: pointer;
         }
        .item .thumbnail .caption .attrs .badge {
          margin-right: 3px;
          margin-bottom: 5px;
          background-color: #ffffff;
          border: 1px solid #C9C9C9;
          border-radius: 12px;
          color: #797979;
          font-weight: 300;
          font-size: 12px;
          line-height: 18px;
          cursor: pointer;
        }
        `}</style>
        <div show={this.state.buy} item={item} game={game} onHide={::this.onHideBuy} />
        <Thumbnail>
          <img src={item.image}/>
          <h4>{item.name}</h4>
          {this.renderStats()}
          {this.renderAttributes()}
          {this.renderBuyButton()}
        </Thumbnail>
      </Col>
    );
  }
}
