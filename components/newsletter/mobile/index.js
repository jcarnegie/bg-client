import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import MdClear from 'react-icons/lib/md/clear';

import style from '@/shared/constants/style';
import BGButton from '@/components/bgbutton';
import { Mobile } from '@/components/responsive';


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
    show: PropTypes.bool,
  }

  handleChange(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    let containerClass = 'newsletter';
    if (this.props.show === 'false') {
      containerClass = 'newsletter-closed';
    }

    return (
      <Mobile>
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
                align-items: center;
                justify-content: space-between;
                transition: ${style.transition.default};
                padding: 20px 0 25px 0;
                z-index: 1000;
              }
              .newsletter-closed {
                display: none;
              }
              .newsletter-left {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                margin: 0 0 10px -15px;
              }
              .subscribe-text {
                font-size: 16px;
                text-transform: uppercase;
                display: inline-block;
                letter-spacing: 1px;
              }
              .newsletter-right {
                width: 100%;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
              }
              .email-input {
                display: inline-block;
                height: 40px;
                border: none;
                border-bottom: 1px solid black;
                background-color: #F3F4FA;
                font-size: .9em;
                width: 100%;
                color: #9B9B9B;
                border-radius: 3px;
                margin: 0 0 10px 0;
                padding-left: 10px;
                font-size: 14px;
              }
              .email-input::placeholder {
                color: #C1C1C1;
              }
              :global(.newsletter-submit-mobile) {
                width: 100%;
                margin: 0 auto;
              }
              :global(.newsletter-clear-mobile) {
                color: #C1C1C1;
                cursor: pointer;
                margin: 0 10px 0 0;
              }
              :global(.newsletter-clear-mobile:hover) {
                color: gray;
              }
              .validate {
                display: inline;
                padding: 0 40px;
              }
          `}</style>
          <div className="newsletter-left">
            <MdClear
              height={20}
              width={20}
              onClick={::this.props.onHide}
              className="newsletter-clear-mobile"
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
              className="validate"
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
              />
              <BGButton
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="newsletter-submit-mobile"
              >
                <FormattedMessage id="components.newsletter.sub-button" />
              </BGButton>
            </form>
          </div>
        </div>
      </Mobile>
    );
  }
}
