
import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Alert} from "react-bootstrap";
import {MESSAGE_REMOVE, MESSAGE_REMOVE_ALL} from "../../shared/constants/actions";


@connect(
  state => ({
    messages: state.messages
  })
)
export default class Message extends Component {
  static propTypes = {
    messages: PropTypes.array,
    dispatch: PropTypes.func
  };

  static defaultProps = {
    messages: []
  };

  componentWillUnmount() {
    const {dispatch} = this.props;

    dispatch({
      type: MESSAGE_REMOVE_ALL
    });
  }

  onDismiss(message) {
    const {dispatch} = this.props;

    return () => {
      dispatch({
        payload: message,
        type: MESSAGE_REMOVE
      });
    };
  }

  renderMessage(message, i) {
    if (!message.status) {
      return (
        <Alert key={i} bsStyle={message.type || "danger"} onDismiss={::this.onDismiss(message)}>
          {message.message}
        </Alert>
      );
    }
    if (message.status === 404 && message.name === "user") {
      return null;
    }
    return (
      <Alert key={i} bsStyle={message.type || "danger"} onDismiss={::this.onDismiss(message)}>
        <FormattedMessage id={`errors.${message.message}`} values={message} />
      </Alert>
    );
  }

  render() {
    return null;
  }
}
