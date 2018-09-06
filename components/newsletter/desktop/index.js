import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MdClear from 'react-icons/lib/md/clear';

import style from '@/shared/constants/style';

import BGButton from '@/components/bgbutton';
import { Desktop } from '@/components/responsive';

@connect(
  state => ({
    layout: state.layout,
  })
)
export default class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      show: props.show,
    };
  }

  static propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.string,
  }

  handleChange(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    const { layout } = this.props;
    const { mobile, desktop } = layout.type;

    let containerClass = 'newsletter';
    if (this.props.show === 'false') {
      containerClass = 'newsletter-closed';
    }

    return (
      <Desktop>
        <div className={containerClass}>
          <style jsx>{`
              .newsletter {
                position: fixed;
                width: 100%;
                background: linear-gradient(to right,#D2EAF8, #B0CAFF);
                color: black;
                bottom: 0;
                z-index: 2;
                margin-right: -15px;
                margin-left: -15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                transition: ${style.transition.default};
                padding: 16px 0;
                z-index: 1000;
              }
              .newsletter-closed {
                display: none;
              }
              .newsletter-left {
                display: flex;
                align-items: center;
                width: 100%
              }
              .subscribe-text {
                font-size: 21px;
                text-transform: uppercase;
                display: inline-block;
                letter-spacing: 1px;
                margin-left: 10px;
              }
              .newsletter-right {
                width: 100%;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .validate-desktop {
                display: flex;
                justify-content: flex-end;
                padding: 0 90px 0 0;
                width: 100%;
              }
              .email-input {
                display: inline-block;
                height: 40px;
                border: none;
                border-bottom: 1px solid black;
                background-color: #F3F4FA;
                font-size: .9em;
                width: ${layout.innerWidth >= 1300 ? '250px' : '200px'};
                color: #9B9B9B;
                border-radius: 3px;
                padding-left: 10px;
                float: right;
                box-shadow: ${style.boxShadow.default};
              }
              .email-input::placeholder {
                color: #C1C1C1;
              }

              :global(.newsletter-submit-desktop) {}

              :global(.newsletter-clear-desktop) {
                margin-left: 20px;
                color: #C1C1C1;
                cursor: pointer;
              }
              :global(.newsletter-clear-desktop:hover) {
                color: gray;
              }
          `}</style>
          <div className="newsletter-left">
            <MdClear
              height={layout.innerWidth >= 1200 ? 18 : 20}
              width={layout.innerWidth >= 1200 ? 18 : 20}
              onClick={::this.props.onHide}
              className="newsletter-clear-desktop"
            />
            <div className="subscribe-text">
              <FormattedMessage id="components.newsletter.subscribe" />
            </div>
          </div>
          <div className="newsletter-right">
            <form
              action="https://livestar.us13.list-manage.com/subscribe/post?u=180843de6d5b8c61d89cb6b19&amp;id=bba305e122"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate-desktop"
              target="_blank"
            >
              <input
                type="email"
                onChange={::this.handleChange}
                value={this.state.email}
                name="EMAIL"
                className="email-input bg-input"
                id="mce-EMAIL"
                placeholder="Email address"
                autoComplete="off"
              />
              <BGButton
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="newsletter-submit-desktop"
              >
                <FormattedMessage id="components.newsletter.sub-button" />
              </BGButton>
            </form>
          </div>
        </div>
      </Desktop>
    );
  }
}
