import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

export default class Bugbounty extends Component {
  render() {
    return (
      <div className="bug-bounty">
        <style jsx global>{`
        .bug-bounty h1 {
          font-weight: 700;
          font-size: 36px;
          margin: 0 0 30px 0;
          margin-bottom: ;
        }
        .bug-bounty h2 {
          font-weight: 600;
          font-size: 20px;
          margin: 0 0 30px 0;
        }
        .bug-bounty h3 {
          font-weight: 600;
          font-size: 18px;
        }
        .bug-bounty p,
        .bug-bounty ul,
        .bug-bounty ol {
          margin-bottom: 35px;
        }
        .bug-bounty p,
        .bug-bounty li {
          font-weight: 300;
        }
        .bug-bounty img {
          margin: 60px auto 0 auto;
          margin-bottom: 40px;
          display: block;
          width: 80%;
        }
        .bug-bounty strong {
          font-weight: 600;
        }
        .bug-bounty lh {
          right: 40px;
          position: relative;
        }
        .bug-bounty p,
        .bug-bounty li,
        .bug-bounty strong {
          font-size: 18px;
        }
        .bug-bounty ul {
          font-size: 18px;
        }
        .bug-bounty ul lh {
          font-weight: 600;
        }
        .bug-bounty ul li {
          font-weight: 300;
          font-size: 10px;
        }
        .bug-bounty ul li span {
          font-weight: 300;
          font-size: 18px;
        }
        .bug-bounty .rewards li:nth-of-type(even) {
          font-weight: 600;
          list-style: none;
        }
        .bug-bounty .rewards li:nth-of-type(even) span {
          font-weight: 600;
        }
        .bug-bounty a {
          color: black;
          text-decoration: underline;
        }
      `}</style>
        <h1><FormattedMessage id="pages.bugbounty.title" /></h1>

        <h2><FormattedMessage id="pages.bugbounty.hey-bitizens" /></h2>

        <FormattedMessage id="pages.bugbounty.info" />

        <img src="/static/images/misc/bugbounty.png" />

        <ul>
          <lh><FormattedMessage id="pages.bugbounty.conditions-header" /></lh>
          <li><FormattedMessage id="pages.bugbounty.conditions-1" /></li>
          <li><FormattedMessage id="pages.bugbounty.conditions-2" /></li>
          <li><FormattedMessage id="pages.bugbounty.conditions-3" /></li>
        </ul>

        <ul className="rewards">
          <lh><FormattedMessage id="pages.bugbounty.rewards-header" /></lh>
          <li><FormattedMessage id="pages.bugbounty.rewards-info-1" /></li>
          <li><FormattedMessage id="pages.bugbounty.rewards-reward-1" /></li>
          <li><FormattedMessage id="pages.bugbounty.rewards-info-2" /></li>
          <li><FormattedMessage id="pages.bugbounty.rewards-reward-2" /></li>
          <li><FormattedMessage id="pages.bugbounty.rewards-info-3" /></li>
          <li><FormattedMessage id="pages.bugbounty.rewards-reward-3" /></li>
          <li><FormattedMessage id="pages.bugbounty.rewards-info-4" /></li>
          <li><FormattedMessage id="pages.bugbounty.rewards-reward-4" /></li>
        </ul>

        <ol>
          <lh><FormattedMessage id="pages.bugbounty.report-header" /></lh>
          <li><FormattedMessage id="pages.bugbounty.report-1" /></li>
          <li><FormattedHTMLMessage id="pages.bugbounty.report-2" /></li>
        </ol>

        <p><FormattedHTMLMessage id="pages.bugbounty.processing" /></p>

        <h3><FormattedMessage id="pages.bugbounty.looking-forward" /></h3>
        <FormattedMessage id="pages.bugbounty.team" />
      </div>
    );
  }
}

