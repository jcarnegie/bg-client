import PropTypes from "prop-types";
import xssFilters from "xss-filters";
import React, {Component} from "react";
import {path} from "ramda";
import {Image} from "react-bootstrap";

import style from "@/shared/constants/style";


const reWebUrl = new RegExp(
  "^" +
    // protocol identifier
    "(?:(?:https?|ftp)://)" +
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
      // host name
      "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
      // domain name
      "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
      // TLD identifier
      "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
      // TLD may end with dot
      "\\.?" +
    ")" +
    // port number
    "(?::\\d{2,5})?" +
    // resource path
    "(?:[/?#]\\S*)?" +
  "$", "ig"
);


export default class Message extends Component {
  static propTypes = {
    message: PropTypes.object,
    user: PropTypes.object,
  };

  renderAvatar({diameter = 32, icon = "/static/images/icons/avatar.png"}) {
    return (
      <Image src={icon} width={diameter} height={diameter} />
    );
  }

  createMessage() {
    const {message} = this.props;
    let msg = xssFilters.inHTMLData(message.message);
    msg = msg.replace(reWebUrl, url => `<a rel="noopener noreferrer" href="${url}" target="_blank">${url}</a>`);

    return (
      <div
        className="contents"
        dangerouslySetInnerHTML={{__html: msg}}
      />
    );
  }

  render() {
    const {message, user} = this.props;

    const isMyMessage = path(["sender", "userId"], message) === path(["data", "wallet"], user);

    return (
      <div className="message">
        <style jsx global>{`
          .chat .message {
            display: flex;
            margin: 20px 10px 0 10px;
          }
          .chat .message .message-box-container {
            flex-grow: 10;
            width: 100%;
          }
          .chat .message .message-box {
            background-color: #F3F3F3;
            border-radius: 10px;
            flex-grow: 10;
            padding: 5px 10px 10px;
            width: 100%;
          }
          .chat .message .message-box.my {
            background-color: #6795FF;
          }
          .chat .message-box.my .body {
            font-size: 13px;
            margin-top: 5px;
            color: #FFF;
          }
          .chat .message .header {
            color: #9FB1CD;
            display: block;
            font-size: 10px;
            margin-bottom: 5px;
            margin-left: 10px;
          }
          .chat .message .message-box .body {
            font-size: 13px;
            margin-top: 5px;
            display: block;
          }
          .chat .message .message-box .body .contents {
            overflow-wrap: break-word;
          }
          .chat .message .avatar-left {
            align-self: flex-end;
            flex-grow: 1;
            margin: 0 10px 0 0;
          }
          .chat .message .avatar-right {
            align-self: flex-end;
            flex-grow: 1;
            margin: 0 0 0 10px;
          }
        `}</style>
        {isMyMessage ? (
          <>
            <div className="message-box-container">
              <div className="message-box my">
                <div className="body contents">{this.createMessage()}</div>
              </div>
            </div>
            <div className="avatar-right">
              {this.renderAvatar({diameter: 18, icon: "/static/images/icons/avatar_my.png"})}
            </div>
          </>
        ) : (
          <>
            <div className="avatar-left">
              {this.renderAvatar({diameter: 32})}
            </div>
            <div className="message-box-container">
              <div className="header">
                <div className="nickname">{path(["sender", "nickname"], message)}</div>
              </div>
              <div className="message-box">
                <div className="body contents">{this.createMessage()}</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
