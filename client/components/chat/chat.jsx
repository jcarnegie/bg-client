import "./chat.less";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import StayScrolled from "react-stay-scrolled";
import {sendChatMessage} from "../../actions/chat";
import Message from "./message";
import {FormattedMessage} from "react-intl";
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";


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
    user: PropTypes.object,
    sendChatMessage: PropTypes.func
  };

  state = {
    newMessage: ""
  };

  componentDidUpdate() {
    this.scrollBottom();
  }

  async handleSubmit(e) {
    const {sendChatMessage} = this.props;
    const {newMessage} = this.state;

    e.preventDefault();

    if (!newMessage.trim()) {
      return;
    }

    sendChatMessage(newMessage);
    // clear the message input
    this.setState({newMessage: ""});
  }

  handleMessageChange(e) {
    this.setState({newMessage: e.target.value});
  }

  storeScrolledControllers({scrollBottom}) {
    this.scrollBottom = scrollBottom;
  };

  render() {
    const {user, chat} = this.props;

    return (
      <div className="wrapper">
        <div className="top">
          <FormattedMessage id="chat.chat" />
        </div>
        <StayScrolled component="div" provideControllers={::this.storeScrolledControllers} className="list">
          {chat.messages.map(msg => <Message key={msg.messageId} message={msg} user={user} />)}
        </StayScrolled>
        <Form onSubmit={::this.handleSubmit}>
          <FormGroup>
            <FormControl onChange={::this.handleMessageChange} type="text" value={this.state.newMessage} />
            <Button type="submit">
              <FormattedMessage id="chat.send" />
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
