import React, { Component } from 'react';
import { compose } from 'react-apollo';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import Router from 'next/router';
import { path } from 'ramda';

import {
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';

import { shouldFooterHide } from '@/components/footer';


class Footer extends Component {
  render() {
    const user = path(['viewUserByWallet'], this.props.user);
    const hide = shouldFooterHide();
    return (
      <div className="footer">
        <style jsx global>{`
          .footer {
            position: relative;
            width: 100%;
            height: ${Router.router && Router.router.route === '/' && !user ? '305px' : '240px'};
            display: ${hide ? 'none' : null};
            background-color: #B6D0F7;
          }
          .mobile-wrapper {
            padding-bottom: ${hide ? '0px !important' : '200px'};
          }
          .footer img {
            height: 70px;
            width: 70px;
          }
          .mobile-footer-block {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            padding: 0 2%;
          }
          .footer-text-block {
          }
          .footer-text-block h2 {
            font-weight: 600;
            font-size: 16px;
            margin: 15px 0 5px 0;
            text-transform: uppercase;
          }
          .footer-text-block span {
            font-size: 16px;
            margin-top: 3px;
            text-align: center;
          }
          .footer .players-footer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 50%;
            margin-top: 8%;
          }
          .footer .developer-footer {
            width: 50%;
            text-align: center;
            margin-top: 8%;
          }
          .footer .social-footer {
            width: 100%;
          }
          .social-footer h2 {
            font-weight: 600;
            font-size: 16px;
            margin: 40px 0 15px 0;
            text-transform: uppercase;
            text-align: center;
          }
          .footer .social-footer span {
            text-align: center;
          }
          .mobile-social-icons {
            width: 235px;
            margin: auto;
            display: flex;
            justify-content: space-between;
          }
          .footer .mobile-social-icons img {
            height: 25px;
            width: 25px;
            justify-content: space-between;
            margin: 0;
          }
        `}</style>
        <div className='mobile-footer-block'>
          <div className="footer-icon-block players-footer">
            <img src="/static/images/icons/players.png" />
            <div className="footer-text-block">
              <h2><FormattedMessage id="components.footer.for-players" /></h2>
              <div><FormattedHTMLMessage id="components.footer.faq" /></div>
              <div><FormattedHTMLMessage id="components.footer.feedback" /></div>
            </div>
          </div>
          <div className="footer-icon-block developer-footer">
            <img src="/static/images/icons/developers.png" />
            <div className="footer-text-block">
              <h2><FormattedMessage id="components.footer.for-developers" /></h2>
              <div><FormattedHTMLMessage id="components.footer.bug-bounty" /></div>
              <div><FormattedHTMLMessage id="components.footer.portal-sdk" /></div>
            </div>
          </div>
        </div>
        <div className="social-footer">
          <h2><FormattedMessage id="components.footer.join" /></h2>
          <div className="mobile-social-icons">
            <a href="https://www.facebook.com/BitGuildPLAT" target="_blank" rel="noopener noreferrer">
              <img src="/static/images/icons/facebook.png" />
            </a>
            <a href="https://twitter.com/BitGuildPLAT" target="_blank" rel="noopener noreferrer">
              <img src="/static/images/icons/twitter.png" />
            </a>
            <a href="https://discord.gg/pPC2frB " target="_blank" rel="noopener noreferrer">
              <img src="/static/images/icons/discord.png" />
            </a>
            <a href="https://www.reddit.com/r/BitGuild/" target="_blank" rel="noopener noreferrer">
              <img src="/static/images/icons/reddit.png" />
            </a>
            <a href="https://medium.com/the-notice-board" target="_blank" rel="noopener noreferrer">
              <img src="/static/images/icons/medium.png" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  viewUserByWalletQuery,
)(Footer);
