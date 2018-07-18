import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chat from '@/components/chat';
import style from '@/shared/constants/style';


class ChatDrawer extends Component {
  static propTypes = {
    show: PropTypes.bool,
  }

  static defaultProps = {
    show: false,
  }

  render() {
    return (
      <div className="chat-drawer">
        <style jsx>{`
          .chat-drawer {
            min-width: ${this.props.show ? '100%' : '0'};
            max-width: ${this.props.show ? '100%' : '0'};
            visibility: ${this.props.show ? 'visible' : 'hidden'};
            position: fixed;
            top: ${style.header.height};
            bottom: 0;
            right: 0;
            padding: 0;
            transition: all 0.3s ease;
            z-index: 1020;
          }
        `}</style>
        <Chat />
      </div>
    );
  }
}

export default ChatDrawer;
