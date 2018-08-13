import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMEssage } from 'react-intl';
import { connect } from 'react-redux';
import MdClear from 'react-icons/lib/md/clear';
import cx from 'classnames';

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

    let containerClass = 'newsletter';
    if (this.props.show === 'false') {
      containerClass = 'newsletter-closed';
    }

    return (
      <div className={containerClass}>
        <style jsx>{`
            .newsletter {
              position: fixed;
              height: ${layout.type.mobile ? '65px' : '60px;'};
              width: ${layout.type.mobile ? '100%' : 'calc(100% - 285px)'};
              background: linear-gradient(to right,#D2EAF8, #B0CAFF);
              color: black;
              bottom: 0;
              z-index: 2;
              margin-right: -15px;
              margin-left: -15px;
              display: ${layout.type.mobile ? null : 'flex'};
              align-items: center;
              justify-content: space-between;
            }
            .newsletter-closed {
              display: none;
            }
             .subscribe-text {
              font-size: ${layout.type.mobile ? '18px' : layout.innerWidth >= 1200 ? '23px' : '21px'};
              text-transform: uppercase;
              display: inline-block;
              letter-spacing: 1px;
              margin-left: ${layout.type.mobile ? null : '10px'};
            }
            .email-input {
              display: inline-block;
              height: ${layout.type.mobile ? '30px' : '40px'};
              border: none;
              border-bottom: 1px solid black;
              background-color: #F3F4FA;
              font-size: .9em;
              width: ${layout.type.mobile ? '65%' : layout.innerWidth >= 1300 ? '300px' : '200px'};
              color: #9B9B9B;
              border-radius: 3px;
              margin-right: 15px;
              margin-left: ${layout.type.mobile ? '15px' : null};
              padding-left: 10px;
              font-size: ${layout.type.mobile ? '12px' : null};
              float: ${layout.type.mobile ? null : 'right'};
            }
            .email-input::placeholder {
              color: #C1C1C1;
            }
            .newsletter-submit {
              display: inline-block;
              height: ${layout.type.mobile ? '31px' : '40px'};
              width: ${layout.type.mobile ? '85px' : layout.innerWidth >= 1300 ? '140px' : '100px'};
              color: white;
              background-color: #314B88;
              border: none;
              border-radius: 3px;
              text-transform: uppercase;
              padding: ${layout.innerWidth <= 1300 || layout.type.mobile ? null : '7px 20px 10px 20px'};
              font-size: ${layout.type.mobile ? '12px' : null};
              float: ${layout.type.mobile ? null : 'right'};
            }
            :global(.newsletter-clear) {
              margin-left: 10px;
            }
            .newsletter-left {
              display: flex;
              align-items: center;
              width: 100%
            }
            .newsletter-right {
              margin-top: ${layout.type.mobile ? '3px' : null};
              padding-right: ${layout.type.mobile ? null : '10px'};
              width: 100%;
            }
            .validate {
              display: inline;
            }
        `}</style>
        <div className="newsletter-left">
          <MdClear
            color="#C1C1C1"
            height={layout.innerWidth >= 1200 ? 35 : 30}
            width={layout.innerWidth >= 1200 ? 35 : 30}
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
                layout.type.mobile ? null
                : (<button
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="newsletter-submit"
                  >
                    <FormattedMessage id="components.newsletter.sub-button" />
                  </button>
                )
              }
              <input
                type="email"
                onChange={::this.handleChange}
                value={this.state.email}
                name="EMAIL"
                className="email-input"
                id="mce-EMAIL"
                placeholder="Email address"
              />
              {
                layout.type.mobile
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
