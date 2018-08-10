import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

@connect(
  state => ({
    layout: state.layout,
  })
)

export default class ThankYou extends Component {
  render() {
    const { layout } = this.props;
    return (
      <div className="thank-you">
        <style jsx>{`
          .thank-you {
            height: 100%;
          }
          .white-box {
            position: relative;
            top: ${layout.type.mobile ? '17%' : '30%'};
            margin: auto;
            width: ${layout.type.mobile ? '300px' : '450px'};
            height: ${layout.type.mobile ? '250px' : '350px'};
            background-color: white;
            text-align: center;
            border-radius: 5px;
            box-shadow: 1px 1px 4px #999;
          }
          .thank-you-image {
            height: ${layout.type.mobile ? '80px' : '125px'};
            width: ${layout.type.mobile ? '80px' : '125px'};
            margin-top: 15%;
          }
          .thank-you-message {
            display: inline-block;
            font-size: ${layout.type.mobile ? '20px' : '28px'};
            width: 80%;
            font-weight: 500;
            margin-top: 30px;
          }
      `}</style>
        <div className="white-box">
          <img src="/static/images/icons/thankyou.png" className="thank-you-image"/>
          <span className="thank-you-message">
            Thank you for subscribing to our mailing list!
          </span>
        </div>
      </div>
    );
  }
}

