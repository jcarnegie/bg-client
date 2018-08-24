import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ActiveLink from '@/components/activelink';
import Language from '@/components/language';
import Balance from '@/components/balance';
import User from '@/components/user';
import FeatureFlag from '@/components/featureflag';

import style from '@/shared/constants/style';


class MenuDrawer extends Component {
  static defaultProps = {
    show: false,
  }

  static propTypes = {
    show: PropTypes.bool,
  }

  render() {
    const menuLinkActiveStyle = {
      background: 'rgba(255, 255, 255, .15)',
      borderLeft: `4px solid ${style.colors.logos}`,
    };

    const menuLinkDefaultStyle = {
      textDecoration: 'none',
      color: 'white',
      display: 'block',
      padding: '20px 20px',
      textTransform: 'uppercase',
      fontWeight: '100',
      fontSize: '15px',
      borderLeft: '4px solid transparent',
    };

    return (
      <div className="menu-drawer">
        <style jsx>{`
          .menu-drawer {
            min-width: ${this.props.show ? 'calc(50% - 20px)' : '0'};
            max-width: ${this.props.show ? '75%' : '0'};
            visibility: ${this.props.show ? 'visible' : 'hidden'};
            background: ${style.colors.primary};
            position: fixed;
            top: ${style.header.height}; /* top border width */
            bottom: 0;
            right: 0;
            padding: 20px 0 0 0;
            transition: all 0.2s ease;
            z-index: 1030; /* Bootstrap modal is 1040, 1050 respectively */
          }
          .links a, .links .navigation-link {
            display: block;
            width: 100%;
            text-decoration: none;
            color: white;
          }
          .balance-mobile {
            padding: 20px 20px;
          }
          .language-mobile {
            padding: 0;
            margin-left: -3px;
          }
          :global(.language-mobile .current-lang) {
            padding: 0 0 0 18px;
            vertical-align: middle;
          }
          :global(.language-mobile .lang-dropdown .caret) {
            transform: translate(1px, 0) !important; /* Bootstrap overrides */
        }
        `}</style>

        <User />

        <div className="links">
          <ActiveLink
            href="/inventory"
            style={menuLinkDefaultStyle}
            activeStyle={menuLinkActiveStyle}
          >
            <FormattedMessage id="components.menu.inventory" />
          </ActiveLink>
          <ActiveLink
            href="/marketplace"
            style={menuLinkDefaultStyle}
            activeStyle={menuLinkActiveStyle}
          >
            <FormattedMessage id="components.menu.marketplace" />
          </ActiveLink>
          <ActiveLink
            href={{
              pathname: '/presale',
              query: { slug: 'bitizens' }
            }}
            as="/presale/bitizens"
            style={menuLinkDefaultStyle}
            activeStyle={menuLinkActiveStyle}
          >
            <FormattedMessage id="components.menu.presale" />
          </ActiveLink>
        </div>

        <div className="balance-mobile">
          <Balance />
        </div>

        <div className="language-mobile">
          <Language />
        </div>

      </div>
    );
  }
}

export default MenuDrawer;
