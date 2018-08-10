import React, { Component } from 'react';
import Link from 'next/link';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <style jsx global>{`
          .footer {
            position: relative;
            width: 100%;
            height: 200px;
            background-color: #B6D0F7;
          }
          .footer img {
            display: inline-block;
            height: 70px;
            width: 70px;
            float: left;
            margin-right: 15px;
          }
          .mobile-footer-block {
            width: 100%;
            display: flex;
            padding-left: 2%;
            padding-right: 2%;
          }
          .footer-text-block {
            display: block;
          }
          .footer-text-block h2 {
            font-weight: 600;
            font-size: 16px;
            margin: 0;
            text-transform: uppercase;
          }
          .social-footer h2 {
            font-weight: 600;
            font-size: 16px;
            margin: 0 0 15px 0;
            text-transform: uppercase;
          }
          .footer-text-block span {
            display: block;
            font-size: 16px;
            margin-top: 3px;
          }
          .footer .players-footer {
            display: block;
            width: 50%;
            margin-top: 5%;
          }
          .footer .developer-footer {
            display: block;
            width: 50%;
            margin-top: 5%;
          }
          .footer .social-footer {
            display: block;
            width: 100%;
            margin-top: 20px;
          }
          .footer .social-footer span {
            display: block;
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
          <div className="players-footer">
            <img src="/static/images/icons/players.png" />
            <div className="footer-text-block">
              <h2><FormattedMessage id="components.footer.for-players" /></h2>
              <FormattedHTMLMessage id="components.footer.faq" />
              <FormattedHTMLMessage id="components.footer.feedback" />
            </div>
          </div>
          <div className="developer-footer">
            <img src="/static/images/icons/developers.png" />
            <div className="footer-text-block">
              <h2><FormattedMessage id="components.footer.for-developers" /></h2>
              <FormattedHTMLMessage id="components.footer.bug-bounty" />
              <FormattedHTMLMessage id="components.footer.portal-sdk" />
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
