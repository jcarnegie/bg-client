import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import StayScrolled from "react-stay-scrolled";
import {map} from "ramda";
import {sendChatMessage} from "../../actions/chat";
import Message from "./message";

const styles = {
  container: {backgroundColor: "#F2F3F8", borderLeft: "solid 1px #C2C3D2", display: "flex", flexDirection: "column", height: "calc(100vh - 60px)"},
  form: {display: "flex", width: "auto"},
  header: {alignItems: "center", backgroundColor: "#DEE6F4", color: "#8AA0C8", display: "flex", fontSize: 10, height: 32, justifyContent: "center"},
  messageInput: {border: "none", borderBottom: "solid 1px #D1D1D1", borderTop: "solid 1px #E5E5EB", flexGrow: 6, outline: "none", padding: "0 10px"},
  messageButton: {backgroundColor: "#4D4D83", borderRadius: 3, color: "#F9F9FB", flexGrow: 1, padding: "15px 10px"},
  messageList: {flexGrow: 1, overflowY: "scroll", paddingBottom: "10px"},
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
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>Chat</div>
        </div>
        <StayScrolled component="div" provideControllers={this.storeScrolledControllers} style={styles.messageList}>
          {map(msg => <Message key={msg.messageId} message={msg} user={user} />, messages)}
        </StayScrolled>
        <div>
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <input onChange={this.handleMessageChange} style={styles.messageInput} type="text" value={this.state.newMessage} />
            <button style={styles.messageButton}>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;