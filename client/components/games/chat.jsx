import React, {Component} from "react";
import StayScrolled, { scrolled } from "react-stay-scrolled";
import {append, map} from "ramda";

const styles = {
  container: {display: "flex", flexDirection: "column", height: "calc(100vh - 60px)"},
  form: {display: "flex", width: "auto"},
  header: {alignItems: "center", backgroundColor: "#DEE6F3", color: "#8CA2C7", display: "flex", fontSize: 18, height: 40, justifyContent: "center"},
  messageInput: {border: "none", flexGrow: 6, outline: "none", padding: "0 10px"},
  messageButton: {backgroundColor: "#4D4D83", borderRadius: 3, color: "#F9F9FB", flexGrow: 1, padding: "15px 10px"},
  messageList: {flexGrow: 1, overflowY: "scroll", paddingBottom: "10px"},
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

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: "",
      messages: [
        {id: 1, userId: "0xblah", contents: "Lorem ipsum is not simply random text. It has roots in a piece.", date: new Date()},
        {id: 2, userId: "0xfoo", contents: "foo", date: new Date()},
        {id: 3, userId: "0xbar", contents: "bar", date: new Date()},
      ]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    this.scrollBottom();
  }


  handleSubmit(e) {
    e.preventDefault();
    const message = {userId: "0xfoo", contents: this.state.newMessage, date: new Date()};
    this.setState({newMessage: "", messages: append(message, this.state.messages)});
  }

  handleMessageChange(e) {
    this.setState({newMessage: e.target.value});
  }

  storeScrolledControllers = ({stayScrolled, scrollBottom}) => {
    this.stayScrolled = stayScrolled;
    this.scrollBottom = scrollBottom;
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>Chat</div>
        </div>
        <StayScrolled component="div" provideControllers={this.storeScrolledControllers} style={styles.messageList}>
          { map(msg => <Message key={msg.id} message={msg} />, this.state.messages) }
        </StayScrolled>
        <div>
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <input onChange={this.handleMessageChange} style={styles.messageInput} type="text" value={this.state.newMessage}/>
            <button style={styles.messageButton}>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default scrolled(Chat);