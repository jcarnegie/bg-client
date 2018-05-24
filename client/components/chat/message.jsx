import "./message.less";
import PropTypes from "prop-types";
import sanitizeHtml from "sanitize-html";
import React, {Component} from "react";
import {path} from "ramda";
import {Image} from "react-bootstrap";


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

const formatTime = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let period = "am";

  if (hours > 12) {
    period = "pm";
    hours -= 12;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}${period}`;
};

export default class Message extends Component {
  static propTypes = {
    message: PropTypes.object,
    user: PropTypes.object
  };

  renderAvatar(flag) {
    if (!flag) {
      return null;
    }

    return (
      <Image src="/images/avatar.png" width="34" height="34" />
    );
  }

  createMessage(textColor = "#393939") {
    const {message} = this.props;
    let msg = "";
    msg = message.message.replace(reWebUrl, url => `<a href="${url}" target="_blank">${url}</a>`);
    msg = sanitizeHtml(msg);
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
        <div className="avatar">
          {this.renderAvatar(!isMyMessage)}
        </div>
        <div className={"message-box" + (isMyMessage ? " my" : "")}>
          <div className="header">
            <div>{path(["sender", "nickname"], message)}</div>
            <div>{formatTime(new Date(message.createdAt))}</div>
          </div>
          <div className="body">{this.createMessage()}</div>
        </div>
        <div className="avatar">
          {this.renderAvatar(isMyMessage)}
        </div>
      </div>
    );
  }
}
