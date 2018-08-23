import React, { Component } from 'react';
import Link from 'next/link';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import style from '@/shared/constants/style';

import RegisterButton from '@/components/RegisterButton';
import ActiveLink from '@/components/activelink';
import Language from '@/components/language';
import Balance from '@/components/balance';
import User from '@/components/user';


@injectIntl
@connect(
  state => ({
    chat: state.chat,
  })
)
class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    chat: PropTypes.object,
  };

  navigation() {
    const activeNavigationLinkStyle = {
      boxShadow: 'inset 0px -4px 0px 0px #ffd57d',
      background: 'rgba(255, 255, 255, .15)',
    };
    const defaultNavigationLinkStyle = {
      textDecoration: 'none',
      margin: '0',
      padding: '0 20px',
    };
    return (
      <div className="navigation">
        <style jsx>{`
          .navigation {
            height: 100%;
            display: flex;
            align-items: center;
            float: left;
          }
          .navigation .navigation-link {
            color: white;
            text-transform: uppercase;
            text-decoration: none;
            line-height: 62px;
            font-size: 13px;
            font-weight: 100;
          }
          .navigation :global(.navigation-link span) {
            vertical-align: middle;
          }
          .logo-img {
            width: 24px;
            margin: 0 0 0 30px;
          }
          .logo-text > a {
            margin: 0 45px 0 10px;
            color: ${style.colors.logos};
            text-decoration: none;
            font-size: 20px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .04em;
          }
        `}</style>
        <Link href="/">
          <img src="/static/images/icons/bitguild_logo@1x.png" className="logo-img no-select" />
        </Link>
        <span className="logo-text">
          <Link href="/">
            <a><FormattedMessage id="components.title" /></a>
          </Link>
        </span>
        <ActiveLink
          href="/inventory"
          activeStyle={activeNavigationLinkStyle}
          style={Object.assign({}, defaultNavigationLinkStyle, { marginLeft: 0 })}
        >
          <span className="navigation-link"><FormattedMessage id="components.menu.inventory" /></span>
        </ActiveLink>
        <ActiveLink
          href="/marketplace"
          activeStyle={activeNavigationLinkStyle}
          style={defaultNavigationLinkStyle}
        >
          <span className="navigation-link"><FormattedMessage id="components.menu.marketplace" /></span>
        </ActiveLink>
        <ActiveLink
          href={{
            pathname: '/presale',
            query: { slug: 'bitizens' },
          }}
          as="/presale/bitizens"
          activeStyle={activeNavigationLinkStyle}
          style={Object.assign({}, defaultNavigationLinkStyle, { marginLeft: 0 })}
        >
          <span className="navigation-link"><FormattedMessage id="components.menu.presale" /></span>
        </ActiveLink>
      </div>
    );
  }

  settings() {
    return (
      <div className="settings">
        <style jsx>{`
          .settings {
            height: 100%;
            width: auto;
            display: flex;
            float: right;
            margin: 0 15px 0 0;
          }
          .settings div {
            display: flex;
            align-items: center;
          }
        `}</style>
          <Balance />
          <User />
        <Language />
        <RegisterButton />
      </div>
    );
  }

  render() {
    return (
      <header className="header">
        <style jsx>{`
          .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 1060; /* Bootstrap modal is 1040, 1050 - MenuDrawer is 1030 */
            background-color: ${style.colors.primary};
            height: ${style.header.height};
            border-bottom: ${style.header.border};
          }
        `}</style>
        {::this.navigation()}
        {::this.settings()}
      </header>
    );
  }
}

export default Header;
