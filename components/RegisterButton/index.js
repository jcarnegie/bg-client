import React, {Component} from "react";
import PropTypes from "prop-types";
import {injectIntl, FormattedMessage} from "react-intl";
import {connect} from "react-redux";

import {USER_SHOW_REGISTER_WORKFLOW} from "@/shared/constants/actions";

@injectIntl
@connect(
  state => ({
    user: state.user,
  })
)
class RegisterButton extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
  }
  render() {
    const {dispatch, user} = this.props;
    return (
      <button className="register-button" onClick={() => dispatch({
        type: USER_SHOW_REGISTER_WORKFLOW,
        payload: !user.showRegisterWorkflow,
      })}>
        <style jsx>{`
          .register-button {
            display: ${user.data ? "none" : "initial"};
            color: white;
            margin: 0 -15px 0 0;
            border: 0;
            background-color: #5DBE81;
            padding: 0 30px;
            text-transform: uppercase;
            font-weight: 100;
            font-size: 14px;
            letter-spacing: 1px;
            height: 62px;
            outline: none;
          }
          :global(.settings .register-button span) {
            vertical-align: middle;
          }
          .register-button:hover, .register-button:focus {
            background-color: #54A97C;
          }
          .register-icon {
            width: 14px;
            height: 24px;
            margin-right: 8px;
          }
        `}</style>
        <img className="register-icon" src="/static/images/icons/register.png" />
        <FormattedMessage id="buttons.register" />
      </button>
    );
  }
}

export default RegisterButton;
