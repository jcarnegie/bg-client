import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import Router from 'next/router';

import ActiveLink from '@/components/activelink';

import {
  GlobalContext,
} from '@/shared/utils/context';

import { shouldFooterHide } from '@/components/footer';

import style from '@/shared/constants/style';


class Footer extends Component {
  static propTypes = {
    offsetRight: PropTypes.string,
  }

  render() {
    const hide = shouldFooterHide();
    return (
      <GlobalContext.Consumer>
        {({ me }) => {
          return (
            <div className="footer">
              <style jsx global>{`
                .footer {
                  position: relative;
                  height: ${Router.router && Router.router.route === '/' && !me ? '190px' : '130px'};
                  width: calc(100% - ${this.props.offsetRight || '0px'});
                  transition: ${style.transition.default};
                  display: ${hide ? 'none' : 'flex'};
                  background-color: #B6D0F7;
                }
                .wrapper {
                  padding-bottom: ${hide ? '0px !important' : '130px'};
                }
                .footer img {
                  display: inline-block;
                  height: 60px;
                  width: 60px;
                  float: left;
                  margin-right: 15px;
                }
                .footer-text-block {
                  display: inline-block;
                }
                .footer-text-block h2 {
                  font-weight: 600;
                  font-size: 16px;
                  margin: 0 0 10px 0;
                  text-transform: uppercase;
                }
                .social-footer h2 {
                  font-weight: 600;
                  font-size: 16px;
                  margin: 3px 0 15px 0;
                  text-transform: uppercase;
                  width: 235px;
                }
                .footer-text-block span {
                  display: block;
                  font-size: 16px;
                  margin-top: 3px;
                }
                .footer .players-footer {
                  min-width: 25%;
                  margin-top: 30px;
                  margin-left: 45px;
                }
                .footer .developer-footer {
                  min-width: 30%;
                  max-width: 35%;
                  margin-top: 30px;
                }
                .footer .social-footer {
                  margin-top: 30px;
                }
                .footer .social-footer span {
                  display: block;
                }
                .social-icons {
                  width: 235px;
                  display: flex;
                  justify-content: space-between;
                }
                .footer .social-icons img {
                  height: 25px;
                  width: 25px;
                  justify-content: space-between;
                  margin: 0;
                }
              `}</style>
              <div className="players-footer">
                <img src="/static/images/icons/players.png" />
                <div className="footer-text-block">
                  <h2><FormattedMessage id="components.footer.for-players" /></h2>
                  <ActiveLink href="/faq">
                    <span className="navigation-link">
                      <FormattedHTMLMessage id="components.footer.faq" />
                    </span>
                  </ActiveLink>
                  <FormattedHTMLMessage id="components.footer.feedback" />
                </div>
              </div>
              <div className="developer-footer">
                <img src="/static/images/icons/developers.png" />
                <div className="footer-text-block">
                  <h2><FormattedMessage id="components.footer.for-developers" /></h2>
                  <ActiveLink href="/bounty">
                    <span className="navigation-link">
                      <FormattedHTMLMessage id="components.footer.bug-bounty" />
                    </span>
                  </ActiveLink>
                  <FormattedHTMLMessage id="components.footer.portal-sdk" />
                  </div>
              </div>
              <div className="social-footer">
                <h2><FormattedMessage id="components.footer.join" /></h2>
                <div className="social-icons">
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
        }}
      </GlobalContext.Consumer>
    );
  }
}

export default Footer;
