import React, {Component} from "react";

import Chat from "@/components/chat";
import style from "@/shared/constants/style";


class ChatDrawer extends Component {
  static defaultProps = {
    show: false,
  }
  render() {
    return (
      <div className="chat-drawer">
        <style jsx>{`
          .chat-drawer {
            min-width: ${this.props.show ? "75%" : "0"};
            max-width: ${this.props.show ? "85%" : "0"};
            visibility: ${this.props.show ? "visible" : "hidden"};
            position: fixed;
            top: ${style.header.height};
            bottom: 0;
            right: 0;
            padding: 0;
            transition: all 0.3s ease;
          }
        `}</style>
        <Chat />
      </div>
    );
  }
}

export default ChatDrawer;