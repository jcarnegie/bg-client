import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MdClear from 'react-icons/lib/md/clear';
import cx from 'classnames';

import style from '@/shared/constants/style';

import BGButton from '@/components/bgbutton';

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

    let offsetRight = '0px';
    if (desktop) {
       offsetRight = layout.asideRightCollapsed ? layout.asideRightCollapsedWidth : layout.asideRightWidth;
    }

    return (
      <div className={containerClass}>
        <style jsx>{`
            .newsletter {
              position: fixed;
              height: ${mobile ? '65px' : '60px;'};
              width: calc(100% - ${offsetRight});
              background: linear-gradient(to right,#D2EAF8, #B0CAFF);
              color: black;
              bottom: 0;
              z-index: 2;
              margin-right: -15px;
              margin-left: -15px;
              display: ${mobile ? 'initial' : 'flex'};
              align-items: center;
              justify-content: space-between;
              transition: ${style.transition.default};
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
              font-size: ${mobile ? '18px' : '21px'};
              text-transform: uppercase;
              display: inline-block;
              letter-spacing: 1px;
              margin-left: ${mobile ? 'initial' : '10px'};
            }
            .newsletter-right {
              margin-top: ${mobile ? '3px' : 'initial'};
              padding-right: ${mobile ? 'initial' : '15px'};
              width: 100%;
              position: relative;
            }
            .email-input {
              display: inline-block;
              height: ${mobile ? '30px' : '40px'};
              border: none;
              border-bottom: 1px solid black;
              background-color: #F3F4FA;
              font-size: .9em;
              width: ${mobile ? '65%' : layout.innerWidth >= 1300 ? '300px' : '200px'};
              color: #9B9B9B;
              border-radius: 3px;
              margin-right: 15px;
              margin-left: ${mobile ? '15px' : 'initial'};
              padding-left: 10px;
              font-size: ${mobile ? '12px' : 'initial'};
              float: ${mobile ? 'none' : 'right'};
            }
            .email-input::placeholder {
              color: #C1C1C1;
            }
            :global(.newsletter-submit) {
              display: inline-block;
              height: ${mobile ? '31px' : '40px'};
              width: ${mobile ? '85px' : layout.innerWidth >= 1300 ? '140px' : '100px'};
              color: white;
              background-color: #314B88;
              border: none;
              border-radius: 3px;
              text-transform: uppercase;
              padding: ${layout.innerWidth <= 1300 || mobile ? null : '7px 20px 10px 20px'};
              font-size: ${mobile ? '12px' : '0'};
              float: ${mobile ? 'none' : 'right !important'};
            }
            :global(.newsletter-clear) {
              margin-left: 10px;
              color: #C1C1C1;
              cursor: pointer;
            }
            :global(.newsletter-clear:hover) {
              color: gray;
            }
            .validate {
              display: inline;
            }
        `}</style>
        <div className="newsletter-left">
          <MdClear
            height={layout.innerWidth >= 1200 ? 16 : 30}
            width={layout.innerWidth >= 1200 ? 16 : 30}
            onClick={::this.props.onHide}
            className={cx('newsletter-clear')}
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
            target="_blank" >
              {
                mobile ? null
                : (
                  <BGButton
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="newsletter-submit"
                  >
                    <FormattedMessage id="components.newsletter.sub-button" />
                  </BGButton>
                )
              }
              <input
                type="email"
                onChange={::this.handleChange}
                value={this.state.email}
                name="EMAIL"
                className="email-input bg-input"
                id="mce-EMAIL"
                placeholder="Email address"
              />
              {
                mobile
                ? (<button
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="newsletter-submit"
                >
                  <FormattedMessage id="components.newsletter.sub-button" />
                </button>
                )
                : null
              }
          </form>
        </div>
      </div>
    );
  }
}
