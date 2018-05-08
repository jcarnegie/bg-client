import PropTypes from "prop-types";
import React from "react";
import {merge} from "ramda";

const styles = {
  message: {display: "flex", marginTop: 20},
  avatarLeft: {alignSelf: "flex-end", flexGrow: 1, margin: "0 10px", width: 34},
  messageBox: {backgroundColor: "#FFF", borderRadius: 5, flexGrow: 10, padding: "5px 10px 10px 10px", width: 185},
  messageBoxHeader: {color: "#E3E3E3", display: "flex", fontSize: 10, justifyContent: "space-between"},
  messageContents: {fontSize: 13, marginTop: 5},
  avatarRight: {alignSelf: "flex-end", flexGrow: 1, margin: "0 10px", width: 34}
};

const formatTime = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let period = "am";

  if (hours > 12) {
    period = "pm";
    hours -= 12;
}
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes}${period}`;
};

const Message = ({message, user}) => {
  let backgroundColor = "#FFF";
  let textColor = "#393939";
  let headerColor = "#9FB1CD";
  const isMyMessage = message.sender.userId === user.data.wallet;
  if (isMyMessage) {
    backgroundColor = "#DEECFB";
    textColor = "#191F24";
}
  return (
    <div className="message" style={styles.message}>
      <div className="avatar-left" style={styles.avatarLeft}>
        {
          !isMyMessage &&
          <img src="/images/avatar.png" width="34" height="34" />
      }
      </div>
      <div className="message-box" style={merge(styles.messageBox, {backgroundColor})}>
        <div className="header" style={merge(styles.messageBoxHeader, {color: headerColor})}>
          <div>{message.sender.nickname}</div>
          <div>{formatTime(new Date(message.createdAt))}</div>
        </div>
        <div className="contents" style={merge(styles.messageContents, {textColor})}>{message.message}</div>
      </div>
      <div className="avatar-right" style={styles.avatarRight}>
        {
          isMyMessage &&
          <img src="/images/avatar.png" width="34" height="34" />
      }
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.object,
  user: PropTypes.object
};

export default Message;