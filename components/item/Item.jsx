import React, { Component, Fragment } from 'react';
import { Badge, Thumbnail } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose, filter, isNil, not } from 'ramda';


import { isValidItemCategory, itemStats } from '@/client/utils/item';
import style from '@/shared/constants/style';


const notNil = compose(not, isNil);


@injectIntl
class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      game: PropTypes.object,
      name: PropTypes.string,
      image: PropTypes.string,
      attrs: PropTypes.object,
      presale: PropTypes.bool,
      saleExpiration: PropTypes.string,
      saleState: PropTypes.string,
    }),
    game: PropTypes.shape({
      nft: PropTypes.object,
    }),
    maxStats: PropTypes.number,
    buttons: PropTypes.any,
    className: PropTypes.string,
    handler: PropTypes.func,
  };

  static defaultProps = {
    buttons: null,
    className: '',
  }

  expiryBanner() {
    let { saleExpiration, saleState } = this.props.item;

    if (saleState !== 'listed') {
      return (
        <div className="expiry-banner-null">
          <style jsx>{`
          :global(.expiry-banner-null) {
            width: 100%;
            height: 16px;
            padding: 1px 16px;
            background-color: #F4F6F9;
          }
        `}</style>
            <>
            </>
        </div>
      );
    }

    const msInOneDay = 24 * 60 * 60 * 1000;
    const expirationDate = new Date(saleExpiration);
    const now = new Date();
    const daysDiff = (expirationDate / msInOneDay) - (now / msInOneDay);
    const days = Math.round(daysDiff);

    let msg;

    if (daysDiff <= 0) {
      msg = <FormattedMessage id="global.expired" />;
    } else if (daysDiff < 1) {
      msg = <FormattedMessage id="pages.marketplace.expires-today" />;
    } else if (daysDiff < 2) {
      msg = <><FormattedMessage id="pages.marketplace.expires-in" /> 1 <FormattedMessage id="pages.global.day" /></>;
    } else {
      msg = <><FormattedMessage id="pages.marketplace.expires-in" /> {days} <FormattedMessage id="pages.global.days" /></>;
    }

    return (
      <div className="expiry-banner">
        <style jsx>{`
          :global(.expiry-banner) {
            width: 100%;
            height: 16px;
            color: white;
            background: linear-gradient(to right, #5989F8, #8BC8FF);
            font-size: 11px;
            padding: 1px 16px;
            letter-spacing: 1px;
          }
        `}</style>
        {msg}
      </div>
    );
  }

  priceBanner() {
    let { salePrice, saleState } = this.props.item;

    if (saleState !== 'listed') {
      return (
        <div className="price-banner-null">
          <style jsx>{`
            :global(.price-banner-null) {
              width: 100%;
              height: 16px;
              background: #F4F6F9;
              padding: 1px 16px;
            }
          `}</style>
          <>
          </>
        </div>
      );
    }

    return (
      <div className="price-banner">
        <style jsx>{`
          :global(.price-banner) {
            width: 100%;
            height: 16px;
            color: #6E85B4;
            background: #E6EDF6;
            font-size: 11px;
            padding: 1px 16px;
            letter-spacing: 1px;
          }
        `}</style>
        <>
          <FormattedMessage id="pages.marketplace.listed-for" /> {salePrice} PLAT
        </>
      </div>
    );
  }

  renderStats() {
    const { item } = this.props;
    return (
      <dl>
        {itemStats(item).slice(0, 2).map(stat => (
          <Fragment key={stat.keyLan}>
            <dt>{stat.keyLan}<FormattedMessage id="components.colon" /></dt>
            <dd>{stat.value}</dd>
          </Fragment>
        ))}
      </dl>
    );
  }

  renderAttributes() {
    const { item, handler } = this.props;
    const attributes = filter(notNil, Object.values(item.attrs || []).map(attr => {
      return typeof Object.values(attr)[1] === 'number' ? null : Object.values(attr)[0];
    }));
    const badges = attributes
      .filter(isValidItemCategory)
      .map(attribute => <Badge key={'item' + attribute} onClick={() => handler(attribute)}>
          {attribute}
        </Badge>
      ).slice(0, 2);
    return (
      <div className="attrs">
        <style jsx>{`
          .attrs {
            overflow: hidden;
            background-color: #F4F6F9;
            padding: 5px 0 7px 15px;
            display: flex;
            align-items: flex-start;
            font-size: 0.9em;
          }
          :global(.item .thumbnail .caption .attrs .badge) {
            margin-right: 8px;
            background-color: #E7EDFD;
            border: 1px solid #BECFFB;
            border-radius: 6px;
            color: #6A7CAC;
            font-weight: 300;
            line-height: 18px;
            cursor: pointer;
            max-width: 110px;
            min-width: 45px;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0px;
          }
        `}</style>
        {badges}
      </div>
    );
  }

  render() {
    const { item, className } = this.props;
    return (
      <div className={`item ${className}`}>
        <style jsx global>{`
          .item {
            width: 170px;
            display: inline-block;
            font-size: 0.9em;
          }
          .item .thumbnail {
            padding: 0;
            border: 0;
            background-color: #FAFAFA;
            border-radius: 6px;
            box-shadow: ${style.boxShadow.dark};
          }
          .item .thumbnail .itemImage {
            display: block;
            margin: auto auto;
            height: 100%;
            width: 100%;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
          }
          .item .thumbnail .caption {
            padding: 0;
            background-color: #ffffff;
            border-radius: 6px;
            box-shadow: 0px 0px 20px 10px #EAECF0;
          }
          .item .thumbnail .caption h4 {
            font-size: 0.9em;
            font-weight: 500;
            background-color: #F4F6F9;
            padding: 5px 15px 3px 15px;
            margin: 0;
          }
          .item .thumbnail .caption dl,
          .item .thumbnail .caption dl dt,
          .item .thumbnail .caption dl dd {
            font-size: 0.85em;
          }
          .item .thumbnail .caption dl {
            display: grid;
            grid-template-columns: minmax(0%, 30%);
            column-gap: 5px;
            background-color: #F4F6F9;
            padding: 0px 15px 0px 15px;
            margin: 0;
            columns: 2;
            min-height: 30px;
          }
          .item .thumbnail .caption dl dt {
            grid-column-start: 1;
            display: inline-block;
            font-weight: 300;
          }
          .item .thumbnail .caption dl dd {
            grid-column-start: 2;
            display: inline-block;
            font-weight: 300;
          }
          .item .thumbnail .caption .btn {
            font-size: 11px;
            line-height: 16px;
            border-radius: 0;
            border: 0;
          }
          .item .thumbnail .caption .btn.buy {
            height: 30px;
            font-weight: 500;
            color: #ffffff;
            background-color: rgb(49, 75, 136);
            font-size: 13px;
            border-radius: 0px 0px 6px 6px;
          }
          .item .thumbnail .caption .btn.buy:hover {
            background-color: rgb(83, 110, 173);
          }
          .item .thumbnail .platToken {
            display: inline-block;
            height: 20px;
            width: auto;
            padding: 0px 5px 4px 5px;
            line-height: 16px;
            margin-top: 4px;
          }
          .renew-token {
            display: inline-block;
            height: 15px;
            width: auto;
          }
          .item .thumbnail .caption .tx {
            height: 28px;
            line-height: 28px;
            color: #FF6845;
            font-weight: 500;
            font-size: 13px;
            text-align: center;
          }
          .buy-for {
            vertical-align: middle;
          }
        `}</style>
        <Thumbnail>
          <img src={item.image} className="itemImage" />
          {::this.expiryBanner()}
          <h4>{item.name}</h4>
          {this.renderStats()}
          {this.renderAttributes()}
          {this.priceBanner()}
          {this.props.buttons ? this.props.buttons : null}
        </Thumbnail>
      </div>
    );
  }
}


export default Item;
