import React, {Component} from "react";
import {map} from "ramda";

const styles = {
  container: {display: "flex", flexDirection: "column", height: "calc(100vh - 60px)"},
  form: {display: "flex"},
  header: {alignItems: "center", backgroundColor: "#DEE6F3", color: "#8CA2C7", display: "flex", fontSize: 18, height: 40, justifyContent: "center"},
  messageInput: {flexGrow: 1},
  messageButton: {backgroundColor: "#4D4D83", borderRadius: 3, color: "#F9F9FB", padding: "15px 10px"},
  messageList: {flexGrow: 1},
  message: {display: "flex", marginTop: 20},
  avatarLeft: {alignSelf: "flex-end", flexGrow: 1, margin: "0 10px"},
  avatarIconLeft: {backgroundColor: "#5FD8BA", borderRadius: 40, display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, textAlign: "center"},
  messageBox: {backgroundColor: "#FFF", borderRadius: 5, flexGrow: 10, padding: "5px 10px 10px 10px", width: 200},
  messageBoxHeader: {color: "#E3E3E3", display: "flex", justifyContent: "space-between"},
  messageContents: {marginTop: 5},
  avatarRight: {alignSelf: "flex-end", flexGrow: 1, margin: "0 10px"},
  avatarIconRight: {backgroundColor: "#5ED1FB", borderRadius: 40, display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, textAlign: "center"},
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

const Message = ({message}) => {
  return (
    <div className="message" style={styles.message}>
      <div className="avatar-left" style={styles.avatarLeft}>
        <div style={styles.avatarIconLeft}>
          <div>AL</div>
        </div>
      </div>
      <div className="message-box" style={styles.messageBox}>
        <div className="header" style={styles.messageBoxHeader}>
          <div>{message.userId}</div>
          <div>{formatTime(message.date)}</div>
        </div>
        <div className="contents" style={styles.messageContents}>{message.contents}</div>
      </div>
      <div className="avatar-right" style={styles.avatarRight}>
        <div style={styles.avatarIconRight}>
          <div>AR</div>
        </div>
      </div>
    </div>
  );
};

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {userId: "0xblah", contents: "Lorem ipsum is not simply random text. It has roots in a piece.", date: new Date()},
        {userId: "0xfoo", contents: "foo", date: new Date()},
        {userId: "0xbar", contents: "bar", date: new Date()},
      ]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("submitted message:", e.target.value);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>Chat</div>
        </div>
        <div style={styles.messageList}>
          { map(msg => <Message message={msg} />, this.state.messages) }
        </div>
        <div>
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <input style={styles.messageInput} type="text" />
            <button style={styles.messageButton}>Send</button>
          </form>
        </div>
      </div>
    );
  }
}
