import "./message.less";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {path} from "ramda";
import {Image} from "react-bootstrap";


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

  renderAvarar(flag) {
    if (!flag) {
      return null;
    }

    return (
      <Image src="/images/avatar.png" width="34" height="34" />
    );
  }

  render() {
    const {message, user} = this.props;

    const isMyMessage = path(["sender", "userId"], message) === path(["data", "wallet"], user);

    return (
      <div className="message">
        <div className="avatar">
          {this.renderAvarar(!isMyMessage)}
        </div>
        <div className={"message-box" + (isMyMessage ? " my" : "")}>
          <div className="header">
            <div>{path(["sender", "nickname"], message)}</div>
            <div>{formatTime(new Date(message.createdAt))}</div>
          </div>
          <div className="body">{message.message}</div>
        </div>
        <div className="avatar">
          {this.renderAvarar(isMyMessage)}
        </div>
      </div>
    );
  }
}
