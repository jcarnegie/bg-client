import "./chat.less";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import StayScrolled from "react-stay-scrolled";
import {map} from "ramda";
import {sendChatMessage} from "../../actions/chat";
import Message from "./message";
import {FormattedMessage} from "react-intl";


const styles = {
  container: {backgroundColor: "#F2F3F8", borderLeft: "solid 1px #C2C3D2", display: "flex", flexDirection: "column", height: "calc(100vh - 62px)"},
  form: {display: "flex", width: "auto"},
  header: {alignItems: "center", backgroundColor: "#DEE6F4", color: "#8AA0C8", display: "flex", fontSize: 14, height: 32, justifyContent: "center", minHeight: 32},
  messageInput: {border: "none", borderBottom: "solid 1px #D1D1D1", flex: 1, outline: "none", margin: "10px 10px 15px 10px"},
  messageInputWrapper: {backgroundColor: "#FFF", borderTop: "solid 1px #E5E5EB", display: "flex", flexGrow: 6},
  messageButton: {backgroundColor: "#4D4D83", borderRadius: 3, color: "#F9F9FB", flexGrow: 1, padding: "15px 10px"},
  messageList: {flexGrow: 1, overflowY: "scroll", paddingBottom: "10px"}
};

@connect(
  state => ({
    chat: state.chat,
    user: state.user
  }),
  {sendChatMessage}
)
export default class Chat extends Component {
  static propTypes = {
    chat: PropTypes.object,
    user: PropTypes.object
  };

  state = {
    newMessage: ""
  };

  componentDidUpdate() {
    this.scrollBottom();
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {sendChatMessage} = this.props;
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
  };

  render() {
    const {messages} = this.props.chat;
    const {user} = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <FormattedMessage id="chat.chat" />
          </div>
        </div>
        <StayScrolled component="div" provideControllers={this.storeScrolledControllers} style={styles.messageList}>
          {map(msg => <Message key={msg.messageId} message={msg} user={user} />, messages)}
        </StayScrolled>
        <div>
          <form onSubmit={::this.handleSubmit} style={styles.form}>
            <div style={styles.messageInputWrapper}>
              <input onChange={::this.handleMessageChange} style={styles.messageInput} type="text" value={this.state.newMessage} />
            </div>
            <button style={styles.messageButton}>
              <FormattedMessage id="chat.send" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
