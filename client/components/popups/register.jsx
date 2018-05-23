import "./modal.less";
import "./form.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl, intlShape} from "react-intl";
import {email, nickName, wallet} from "../../../shared/constants/placeholder";
import {reEmail} from "../../../shared/constants/regexp";
import {CREATE_USER, MESSAGE_ADD} from "../../../shared/constants/actions";
import {enabledLanguages} from "../../../shared/constants/language";
import InputGroupValidation from "../../components/common/inputs/input.group.validation";


@injectIntl
@connect(
  state => ({
    account: state.account,
    messages: state.messages
  })
)
export default class RegisterPopup extends Component {
  static propTypes = {
    account: PropTypes.object,
    dispatch: PropTypes.func,
    show: PropTypes.bool,
    intl: intlShape,
    messages: PropTypes.array
  };

  state = {
    formData: {
      get(key) {
        return this[key];
      },
      wallet: this.props.account.wallet,
      language: this.props.intl.locale
    }
  };

  static getDerivedStateFromProps(nextProps) {
    return {
      formData: {
        get(key) {
          return this[key];
        },
        wallet: nextProps.account.wallet,
        language: nextProps.intl.locale
      }
    };
  }


  onSubmit(e) {
    e.preventDefault();

    if (!this.isValid(Array.from(e.target.elements))) {
      return false;
    }

    this.setState({
      formData: new FormData(e.target)
    }, this.sign);
  }

  isValid(a) {
    const {intl} = this.props;

    let isValid = true;
    for (let e of a) {
      switch (e.name) {
        case "wallet":
          if (!window.web3.isAddress(e.value)) {
            e.parentNode.parentNode.classList.add("has-error");
            e.setCustomValidity(intl.formatMessage({
              id: "fields.wallet.invalid"
            }));
            isValid = false;
          }
          break;
        default:
          break;
      }
    }

    return isValid;
  }

  sign() {
    const {dispatch, intl} = this.props;
    const message = window.web3.toHex(intl.formatMessage({id: "modals.register.text"}));
    const from = this.state.formData.get("wallet");

    window.web3.currentProvider.sendAsync({
      method: "personal_sign",
      params: [message, from],
      from
    }, (err, result) => {
      if (err || result.error) {
        dispatch({
          type: MESSAGE_ADD,
          payload: err || result.error
        });
        return;
      }

      window.web3.currentProvider.sendAsync({
        method: "personal_ecRecover",
        params: [message, result.result],
        from
      }, (err, recovered) => {
        if (err || result.error) {
          dispatch({
            type: MESSAGE_ADD,
            payload: err || result.error
          });
          return;
        }

        if (recovered.result === from) {
          dispatch({
            type: CREATE_USER,
            payload: Array.from(this.state.formData.entries()).reduce((memo, pair) => ({
              ...memo,
              [pair[0]]: pair[1]
            }), {})
          });
        } else {
          dispatch({
            type: MESSAGE_ADD,
            payload: new Error(intl.formatMessage({
              id: "errors.spoofing-attempt"
            }, {
              wallet1: recovered.result,
              wallet2: from
            }))
          });
        }
      });
    });
  }

  render() {
    const {show} = this.props;

    return (
      <Modal show={show} className="register">
        <Modal.Body>
          <Form onSubmit={::this.onSubmit}>
            <h2>
              <FormattedMessage id="modals.register.title" />
            </h2>
            <InputGroupValidation
              name="language"
              componentClass="select"
              value={this.state.formData.get("language")}
              required
            >
              {enabledLanguages.map(language =>
                (<FormattedMessage key={language} id={`components.language.${language}`}>
                  {formattedMessage => <option key={language} value={language}>{formattedMessage}</option>}
                </FormattedMessage>)
              )}
            </InputGroupValidation>
            <InputGroupValidation
              name="wallet"
              defaultValue={this.state.formData.get("wallet")}
              placeholder={wallet}
              maxLength="42"
              minLength="42"
              required
              readOnly
            />
            <InputGroupValidation
              type="email"
              name="email"
              pattern={reEmail.source.replace("a-z", "a-zA-Z")} // there is no `i` flag
              defaultValue={this.state.formData.get("email")}
              placeholder={email}
              required
            />
            <InputGroupValidation
              type="text"
              name="nickName"
              defaultValue={this.state.formData.get("nickName")}
              placeholder={nickName}
              required
            />

            <p className="note"><FormattedMessage id="modals.register.n1" /></p>
            <p className="note"><FormattedMessage id="modals.register.n2" /></p>

            <br />

            <Button type="submit" className="btn-block text-uppercase">
              <FormattedMessage id="buttons.register" />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
