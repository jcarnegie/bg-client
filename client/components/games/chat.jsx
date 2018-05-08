import Promise from "bluebird";
import SendBird from "sendbird";
import PropTypes from "prop-types";
import React, {Component} from "react";
import StayScrolled from "react-stay-scrolled";
import {connect} from "react-redux";
import {map, merge} from "ramda";
import {sendChatMessage} from "../../actions/chat";
import {sbp} from "../../utils/chat";

const styles = {
  container: {display: "flex", flexDirection: "column", height: "calc(100vh - 60px)"},
  form: {display: "flex", width: "auto"},
  header: {alignItems: "center", backgroundColor: "#DEE6F4", color: "#E6DBDA", display: "flex", fontSize: 18, height: 40, justifyContent: "center"},
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

const Message = ({message, user}) => {
  let backgroundColor = "#FFF";
  let headerColor = "#E6DBDA";
  const isMyMessage = message.sender.userId === user.data.wallet;
  if (isMyMessage) {
    backgroundColor = "#DEECFB";
    headerColor = "white";
  }
  return (
    <div className="message" style={styles.message}>
      {
        !isMyMessage &&
        <div className="avatar-left" style={styles.avatarLeft}>
          <div style={styles.avatarIconLeft}>
            <div>AL</div>
          </div>
        </div>
      }
      <div className="message-box" style={merge(styles.messageBox, {backgroundColor})}>
        <div className="header" style={merge(styles.messageBoxHeader, {color: headerColor})}>
          <div>{message.sender.nickname}</div>
          <div>{formatTime(new Date(message.createdAt))}</div>
        </div>
        <div className="contents" style={styles.messageContents}>{message.message}</div>
      </div>
      {
        isMyMessage &&
        <div className="avatar-right" style={styles.avatarRight}>
          <div style={styles.avatarIconRight}>
            <div>AR</div>
          </div>
        </div>
      }
      </div>
  );
};

@connect(
  state => ({chat: state.chat, user: state.user}),
  {sendChatMessage}
)
class Chat extends Component {
  static propTypes = {
    chat: PropTypes.object,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {newMessage: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  componentDidUpdate() {
    this.scrollBottom();
  }

  async handleSubmit(e) {
    const {sendChatMessage} = this.props;
    e.preventDefault();
    sendChatMessage(this.state.newMessage);
    // clear the message input
    this.setState({newMessage: ""});
  }

  handleMessageChange(e) {
    this.setState({newMessage: e.target.value});
  }

  storeScrolledControllers = ({stayScrolled, scrollBottom}) => {
    this.stayScrolled = stayScrolled;
    this.scrollBottom = scrollBottom;
  }

  render() {
    const {messages} = this.props.chat;
    const {user} = this.props;
    console.log(messages);
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>Chat</div>
        </div>
        <StayScrolled component="div" provideControllers={this.storeScrolledControllers} style={styles.messageList}>
          { map(msg => <Message key={msg.messageId} message={msg} user={user} />, messages) }
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

export default Chat;