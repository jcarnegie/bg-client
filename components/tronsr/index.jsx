import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { connect } from 'react-redux';

@connect(
  state => ({
    layout: state.layout,
  })
)
export default class TronSR extends Component {
  static propTypes = {
    layout: PropTypes.object,
  }

  renderLinks() {
    const { mobile } = this.props.layout.type;

    return (
      <div className="intro-links">
        <style jsx>{`
          .intro-links {
            float: left;
            width: ${mobile ? '100%' : '30%'};
            margin-top: ${mobile ? '0px' : '40px'}
          }
        `}</style>
        <div>
          <FormattedHTMLMessage id="pages.super-rep.links-1" />
        </div>
        <div>
          <FormattedHTMLMessage id="pages.super-rep.links-2" />
        </div>
        <div>
          <FormattedHTMLMessage id="pages.super-rep.links-3" />
        </div>
        <div>
          <FormattedHTMLMessage id="pages.super-rep.links-4" />
        </div>
        <div>
          <FormattedHTMLMessage id="pages.super-rep.links-5" />
        </div>
        <div>
          <FormattedHTMLMessage id="pages.super-rep.links-6" />
        </div>
        <div>
          <FormattedHTMLMessage id="pages.super-rep.links-7" />
        </div>
        <div>
          <FormattedHTMLMessage id="pages.super-rep.links-8" />
        </div>
      </div>
    );
  }

  render() {
    const { mobile } = this.props.layout.type;

    return (
      <div className="super-rep-container">
        <style jsx>{`
          .super-rep-container {
            background: linear-gradient(to bottom, #E7F1FF, #A6C3F4);
            width: 100vw;
            padding-bottom: 200px;
          }
          .super-rep-background-image {
            display: block;
            margin: auto;
            position: absolute;
            left: 0;
            right: 0;
          }
          .super-rep-overlay-container {
            display: block;
            width: 75%;
            position: relative;
            background: white;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 1px 1px 1px 1px #B2B1B1;
            overflow: scroll;
            top: 100px;
            padding-bottom: 50px;
          }
          .super-rep-banner {
            display: block;
            width: 80%;
            margin-right: auto;
            margin-left: auto;
            margin-top: 50px;
            margin-bottom: 25px;
          }
          .super-rep-filler-image {
            background: gray;
            height: 300px;
            width: 75%;
            margin: auto;
            margin-top: 50px;
          }
          .section-container {
            display: block;
            margin: auto;
            width: 80%;
          }
          .sr-header {
            float: left;
            display: inline-block;
            width: 100%;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 18px;
            border-bottom: 1px solid #3A73C5;
            margin-bottom: 10px;
            margin-top: 10px;
          }
          .info {
            float: right;
            width: ${mobile ? '100%' : '70%'};
            margin-bottom: 20px;
          }
          .bold {
            font-weight: 600;
          }
          .team-info {
            float: right;
            width: ${mobile ? '100%' : '70%'};
            margin-bottom: 40px;
          }
          .team-member {
            display: inline-block;
            width: 100%;
            margin-bottom: 20px;
          }
          .team-member-image {
            margin-left: ${mobile ? '30px' : '100px'};
          }
          .team-member-image-rainy {
            margin-left: ${mobile ? '30px' : '100px'};
            width: 150px;
            height: 150px;
            border-radius: 50%;
          }
          .ceo-header {
            float: right;
            margin-top: ${mobile ? '40px' : null};
            width: ${mobile ? '100%' : '70%'};
            font-weight: 600;
          }
          .team-member-header {
            float: right;
            width: ${mobile ? '100%' : '70%'};
            font-weight: 600;
            margin-top: 40px;
          }
          .team-member-info {
            width: 100%;
            margin-top: 10px;
            font-weight: 300;
          }
          .server-header {
            float: right;
            width: ${mobile ? '100%' : '70%'};
            text-decoration: underline;
          }
          .system-info {
            float: right;
            width: ${mobile ? '100%' : '70%'};
          }
          .budget-list {
            float: right;
            width: ${mobile ? '100%' : '70%'};
            margin-bottom: 10px;
            padding-left: 30px;
          }
        `}</style>
        <img src='/static/images/misc/superrep.png' className="super-rep-background-image" />
        <div className="super-rep-overlay-container">
          <img src='/static/images/misc/superrep-banner.jpg' className="super-rep-banner" />
          <div className="section-container">
            <div className="sr-header">
              <FormattedMessage id="pages.super-rep.intro" />
            </div>
              {mobile ? null : this.renderLinks() }
            <div className="info">
              <FormattedMessage id="pages.super-rep.intro-info-1" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.intro-info-2" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.intro-info-3" />
            </div>
            {mobile ? this.renderLinks() : null}
          </div>
          <div className="section-container">
            <div className="sr-header">
              <FormattedMessage id="pages.super-rep.why-bitguild-header" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.why-bitguild-info-1" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.why-bitguild-info-2" />
            </div>
          </div>
          <div className="section-container">
            <div className="sr-header">
              <FormattedMessage id="pages.super-rep.team-header" />
            </div>
            <div className="team-info">
              <FormattedMessage id="pages.super-rep.team-info" />
            </div>
            <div className="team-member">
              <img src="/static/images/team/jared.png" className="team-member-image"/>
              <div className="ceo-header">
                <FormattedMessage id="pages.super-rep.jared-header" />
                <div className="team-member-info">
                  <FormattedMessage id="pages.super-rep.jared-info-1" />
                </div>
                <div className="team-member-info">
                  <FormattedMessage id="pages.super-rep.jared-info-2" />
                </div>
              </div>
            </div>
            <div className="team-member">
              <img src="/static/images/team/curtis.png" className="team-member-image" />
              <div className="team-member-header">
                <FormattedMessage id="pages.super-rep.curtis-header" />
                <div className="team-member-info">
                  <FormattedMessage id="pages.super-rep.curtis-info" />
                </div>
              </div>
            </div>
            <div className="team-member">
              <img src="/static/images/team/mikhail.png" className="team-member-image" />
              <div className="team-member-header">
                <FormattedMessage id="pages.super-rep.mikhail-header" />
                <div className="team-member-info">
                  <FormattedMessage id="pages.super-rep.mikhail-info" />
                </div>
              </div>
            </div>
            <div className="team-member">
              <img src="/static/images/team/rainy.jpg" className="team-member-image-rainy" />
              <div className="team-member-header">
                <FormattedMessage id="pages.super-rep.rainy-header" />
                <div className="team-member-info">
                  <FormattedMessage id="pages.super-rep.rainy-info" />
                </div>
              </div>
            </div>
            <div className="info bold">
              <FormattedMessage id="pages.super-rep.and-more-1" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.and-more-2" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.and-more-3" />
            </div>
          </div>
          <div className="section-container">
            <div className="sr-header">
              <FormattedMessage id="pages.super-rep.rewards-header" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.rewards-info-1" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.rewards-info-2" />
            </div>
          </div>
          <div className="section-container">
            <div className="sr-header">
              <FormattedMessage id="pages.super-rep.server-config-header" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.server-config-info" />
            </div>
            <div className="server-header">
              <FormattedMessage id="pages.super-rep.server-config-placement-header" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.server-config-placement-info" />
            </div>
            <div className="server-header">
              <FormattedMessage id="pages.super-rep.system-config-header" />
            </div>
            <div className="system-info">
              <span className="bold">
                <FormattedMessage id="pages.super-rep.system-config-1-1" />
              </span>
              <FormattedMessage id="pages.super-rep.system-config-1-2" />
            </div>
            <div className="system-info">
              <span className="bold">
                <FormattedMessage id="pages.super-rep.system-config-2-1" />
              </span>
              <FormattedMessage id="pages.super-rep.system-config-2-2" />
            </div>
            <div className="system-info">
              <span className="bold">
                <FormattedMessage id="pages.super-rep.system-config-3-1" />
              </span>
              <FormattedMessage id="pages.super-rep.system-config-3-2" />
            </div>
            <div className="system-info">
              <span className="bold">
                <FormattedMessage id="pages.super-rep.system-config-4-1" />
              </span>
              <FormattedMessage id="pages.super-rep.system-config-4-2" />
            </div>
            <div className="system-info">
              <span className="bold">
                <FormattedMessage id="pages.super-rep.system-config-5-1" />
              </span>
              <FormattedMessage id="pages.super-rep.system-config-5-2" />
            </div>
            <div className="system-info">
              <span className="bold">
                <FormattedMessage id="pages.super-rep.system-config-6-1" />
              </span>
              <FormattedMessage id="pages.super-rep.system-config-6-2" />
            </div>
          </div>
          <div className="section-container">
            <div className="sr-header">
              <FormattedMessage id="pages.super-rep.budget-header" />
            </div>
            <div className="info">
              <FormattedMessage id="pages.super-rep.budget-info-1" />
            </div>
            <ul className="budget-list">
              <li className="budget-list-item">
                <FormattedMessage id="pages.super-rep.budget-info-2" />
              </li>
              <li className="budget-list-item">
                <FormattedMessage id="pages.super-rep.budget-info-3" />
              </li>
              <li className="budget-list-item">
                <FormattedMessage id="pages.super-rep.budget-info-4" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
