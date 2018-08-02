import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StayScrolled from 'react-stay-scrolled';
import { isEmpty, map } from 'ramda';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';

import style from '@/shared/constants/style';
import { sendChatMessage } from '@/client/actions/chat';
import Message from './message';


@connect(
  state => ({
    chat: state.chat,
    user: state.user,
  }),
  { sendChatMessage }
)
export default class Chat extends Component {
  static propTypes = {
    chat: PropTypes.object,
    user: PropTypes.object,
    parentCollapsed: PropTypes.bool,
  };

  static defaultProps = {
    parentCollapsed: false,
  }

  state = {
    newMessage: '',
  };

  componentDidUpdate() {
    this.scrollBottom();
  }

  async handleSubmit(e) {
    const { sendChatMessage } = this.props;
    const { newMessage } = this.state;

    e.preventDefault();

    if (isEmpty(newMessage.trim())) {
      return;
    }

    sendChatMessage(this.state.newMessage);
    // clear the message input
    this.setState({ newMessage: '' });
  }

  handleMessageChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  storeScrolledControllers = ({ stayScrolled, scrollBottom }) => {
    this.stayScrolled = stayScrolled;
    this.scrollBottom = scrollBottom;
  };

  sendButton() {
    return (
      <Button type="submit">
        <style jsx>{`
          .send-button {
            height: 30px;
            width: 30px;
          }
          .send-button polygon {
            fill: ${style.colors.primary};
          }
        `}</style>
        <svg className="send-button" enableBackground="new 0 0 535.5 535.5" version="1.1" viewBox="0 0 535.5 535.5" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0 497.25 535.5 267.75 0 38.25 0 216.75 382.5 267.75 0 318.75" fill="#006DF0" />
        </svg>
      </Button>
    );
  }

  sendButtonWithoutBootstrap() {
    return (
      <button onClick={::this.handleSubmit}>
        <style jsx>{`
          button {
            background-color: #FFF;
            border-radius: 3px;
            color: #F9F9FB;
            padding: 15px 10px;
            text-transform: uppercase;
            width: 60px;
            height: 60px;
            border: 0;
            border-top: 1px solid lightgray;
            cursor: default;
            outline: none;
          }
          .send-button {
            height: 30px;
            width: 30px;
          }
          .send-button polygon {
            fill: ${style.colors.primary};
          }
        `}</style>
        <svg className="send-button" enableBackground="new 0 0 535.5 535.5" version="1.1" viewBox="0 0 535.5 535.5" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0 497.25 535.5 267.75 0 38.25 0 216.75 382.5 267.75 0 318.75" fill="#006DF0" />
        </svg>
      </button>
    );
  }

  render() {
    const { messages } = this.props.chat;
    const { user, parentCollapsed } = this.props;

    const renderMessages = map(msg => <Message key={msg.messageId} message={msg} user={user} />, messages);

    return (
      <div className="chat">
        <div className="wrapper">
          <style jsx global>{`
            .chat {
              background: white;
              z-index: 1020;
            }
            .chat .wrapper {
              background-color: white;
              border-left: solid 1px #C2C3D2;
              display: flex;
              flex-direction: column;
              height: calc(100vh + 68px);
            }
            .chat .wrapper .list {
              flex-grow: 1;
              overflow-y: scroll;
              padding-bottom: 10px;
            }
            .chat form {
              width: auto;
              margin: 0;
            }
            .chat form .form-group {
              background-color: #FFF;
              border-top: solid 1px #E5E5EB;
              display: flex;
              flex-grow: 6;
              margin-bottom: 0;
            }
            .chat form .form-group .form-control[type=text] {
              border: none;
              border-bottom: 1px solid lightgray;
              flex: 1;
              outline: none;
              margin: 10px 10px 15px 10px;
              box-shadow: none;
              padding: 0;
              padding-left: 10px;
              height: auto;
              background-color: transparent !important; /* Bootstrap overrides */
              font-weight: 100;
              border-radius: 0;
            }
            .chat form .form-group .btn {
              background-color: #FFF;
              border-radius: 3px;
              color: #F9F9FB;
              flex-grow: 1;
              padding: 15px 10px;
              text-transform: uppercase;
              max-width: 60px;
            }
          `}</style>
          <StayScrolled className="list" component="div" provideControllers={this.storeScrolledControllers}>
            {parentCollapsed ? null : renderMessages}
          </StayScrolled>
          {parentCollapsed ? ::this.sendButtonWithoutBootstrap() : (
            <Form onSubmit={::this.handleSubmit}>
              <FormGroup>
                <FormControl onChange={::this.handleMessageChange} type="text" value={this.state.newMessage} placeholder='Write Something' />
                {this.sendButton()}
              </FormGroup>
            </Form>
          )}
        </div>
      </div>
    );
  }
}
