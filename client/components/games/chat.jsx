import Promise from "bluebird";
import SendBird from "sendbird";
import PropTypes from "prop-types";
import React, {Component} from "react";
import StayScrolled from "react-stay-scrolled";
import {connect} from "react-redux";
import {append, map, prop} from "ramda";

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

// Note: sendbird callbacks put error at the end
const sbp = fn => new Promise((resolve, reject) =>
  fn((res, err) => (err) ? reject(err) : resolve(res))
);

@connect(state => ({user: state.user}))
class Chat extends Component {
  static propTypes = {
    user: PropTypes.object
  };

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

  componentWillMount() {
    const sb = new SendBird({appId: "BB1E0777-B8CE-44DF-BA37-63EBA2E858F1"});

    const doConnect = async() => {
      if (this.props.user.data) {
        try {
          const {nickName, wallet} = this.props.user;
          console.log('connecting to sendbird');
          let sbUser = await sbp(cb => sb.connect(wallet, cb));
          console.log('setting sendbird nickname');
          sbUser = await sbp(cb => sb.updateCurrentUserInfo(nickName, null, cb));
          console.log('sbUser:', sbUser);
          this.setState({sbUser});
        } catch (e) {
          console.log("SendBird Error:", e.stack);
        }
      } else {
        setTimeout(doConnect, 1000);
      }
    };

    doConnect();
  }

  componentWillUnmount() {
    this.state.sb.disconnect();
  }

  componentDidUpdate() {
    this.scrollBottom();
  }

  handleSubmit(e) {
    e.preventDefault();
    const ids = map(prop("id"), this.state.messages);
    const maxId = Math.max(...ids);
    const id = maxId + 1;
    const message = {id, userId: "0xfoo", contents: this.state.newMessage, date: new Date()};
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

export default Chat;