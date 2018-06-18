import PropTypes from "prop-types";
import xssFilters from "xss-filters";
import React, {Component} from "react";
import {path, merge} from "ramda";
import {Image} from "react-bootstrap";

const styles = {
  message: {display: "flex", marginTop: 20},
  avatarLeft: {alignSelf: "flex-end", flexGrow: 1, margin: "0 10px", width: 34},
  messageBox: {backgroundColor: "#FFF", borderRadius: 5, flexGrow: 10, padding: "5px 10px 10px 10px", width: 185},
  messageBoxHeader: {color: "#E3E3E3", display: "flex", fontSize: 10, justifyContent: "space-between"},
  messageContents: {fontSize: 13, marginTop: 5},
  avatarRight: {alignSelf: "flex-end", flexGrow: 1, margin: "0 10px", width: 34},
};


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
    user: PropTypes.object,
  };

  renderAvatar(flag, diameter = 34) {
    if (!flag) {
      return null;
    }

    return (
      <Image src="/static/images/icons/avatar.png" width={diameter} height={diameter} />
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

    let backgroundColor = "#FFF";
    let textColor = "#393939";
    let headerColor = "#9FB1CD";

    if (isMyMessage) {
      backgroundColor = "#DEECFB";
      textColor = "#191F24";
    }


    return (
      <div className="message" style={styles.message}>
        <style jsx global>{`
          .chat .message {
            display: flex;
            margin-top: 20px;
          }
          .chat .message .message-box {
            background-color: #FFF;
            border-radius: 5px;
            flex-grow: 10;
            padding: 5px 10px 10px;
            width: 185px;
          }
          .chat .message .message-box.my {
            background-color: #DEECFB;
          }
          .chat .message .message-box .header {
            color: #9FB1CD;
            display: flex;
            font-size: 10px;
            justify-content: space-between;
          }
          .chat .message .message-box .body {
            font-size: 13px;
            margin-top: 5px;
          }
          .chat .message .message-box .body .contents {
            overflow-wrap: break-word;
          }
          .chat .message .avatar {
            align-self: flex-end;
            flex-grow: 1;
            margin: 0 10px;
            width: 34px;
          }
        `}</style>
        <div className="avatar" style={styles.avatarLeft}>
          {this.renderAvatar(!isMyMessage)}
        </div>
        <div className={"message-box" + (isMyMessage ? " my" : "")} style={merge(styles.messageBox, {backgroundColor})}>
          <div className="header" style={merge(styles.messageBoxHeader, {color: headerColor})}>
            <div>{path(["sender", "nickname"], message)}</div>
            <div>{formatTime(new Date(message.createdAt))}</div>
          </div>
          <div className="body contents" style={merge(styles.messageContents, {textColor, overflowWrap: "break-word"})}>{this.createMessage()}</div>
        </div>
        <div className="avatar" style={styles.avatarRight}>
          {this.renderAvatar(isMyMessage, 18)}
        </div>
      </div>
    );
  }
}
