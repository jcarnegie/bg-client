import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as log from 'loglevel';
import { Button, Form, Modal } from 'react-bootstrap';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

import {
  compose,
  graphql,
} from 'react-apollo';

import BGModal from '@/components/modal';
import withFormHelper from '@/components/inputs/withFormHelper';
import { updateIntl } from 'react-intl-redux/lib/index';
import { localization } from '@/shared/intl/setup';

import { email, nickName, wallet } from '@/shared/constants/placeholder';
import { reEmail } from '@/shared/constants/regexp';
import { enabledLanguages } from '@/shared/constants/language';
import InputGroupValidation from '@/components/inputs/input.group.validation';

import {
  client,
  localQueries,
  createUser,
} from '@/shared/utils/apollo';


@withFormHelper
@injectIntl
@connect(
  state => ({
    analytics: state.analytics,
  })
)
class RegisterPopup extends Component {
  static defaultProps = {
    onHide: () => {},
  }

  static propTypes = {
    account: PropTypes.object,
    analytics: PropTypes.object,
    formData: PropTypes.object,
    dispatch: PropTypes.func,
    setState: PropTypes.func,
    onChange: PropTypes.func,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    intl: intlShape,
  };

  state = {};

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.formData.wallet !== nextProps.data.wallet) {
      nextProps.setState({
        wallet: nextProps.data.wallet,
      });
    }

    if (nextProps.formData.language !== nextProps.intl.locale) {
      nextProps.setState({
        language: nextProps.intl.locale,
      });
    }

    return null;
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.isValid()) {
      return false;
    }

    this.sign();
  }

  isValid() {
    const { intl, formData } = this.props;

    let e;
    let isValid = true;
    for (let i in formData) {
      switch (i) {
        case 'wallet':
          if (!window.web3.isAddress(formData[i])) {
            e = document.getElementsByName(i)[0];
            e.parentNode.parentNode.classList.add('has-error');
            e.setCustomValidity(intl.formatMessage({
              id: 'fields.wallet.invalid',
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

  static toHex(text) {
    return '0x' + Buffer.from(text, 'utf8').toString('hex');
  }

  sign() {
    const { intl, formData } = this.props;
    const message = RegisterPopup.toHex(intl.formatMessage({ id: 'modals.register.text' }));

    window.web3.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [message, formData.wallet],
      from: formData.wallet,
    }, (err, result) => {
      if (err || result.error) {
        log.error(err || result.error);
        return;
      }

      window.web3.currentProvider.sendAsync({
        method: 'personal_ecRecover',
        params: [message, result.result],
        from: formData.wallet,
      }, async(err, recovered) => {
        if (err || result.error) {
          return;
        }

        if (recovered.result !== formData.wallet) {
          log.error(new Error(intl.formatMessage({ id: 'errors.spoofing-attempt' }, {
            wallet1: recovered.result,
            wallet2: formData.wallet,
          })));
          return;
        }

        await createUser(intl.locale, formData);
        this.props.analytics.ga.event({
          category: 'Site Interaction',
          action: 'Sign-up',
          label: 'Create account',
        });
        await client.resetStore();
      });
    });
  }

  onChangeLang(e) {
    const { dispatch, onChange } = this.props;
    dispatch(updateIntl(localization[e.target.value]));
    onChange(e);
  }

  render() {
    const { show, formData, onChange, onHide } = this.props;
    return (
      <BGModal show={show} className={cx('register', { show })} onHide={onHide}>
        <Modal.Body>
          <Form onSubmit={::this.onSubmit}>
            <h2>
              <FormattedMessage id="modals.register.title" />
            </h2>
            <InputGroupValidation
              name="language"
              componentClass="select"
              value={formData.language}
              onChange={::this.onChangeLang}
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
              defaultValue={formData.wallet}
              onChange={onChange}
              placeholder={wallet}
              maxLength="42"
              minLength="42"
              required
              readOnly
            />
            <InputGroupValidation
              type="email"
              name="email"
              pattern={reEmail.source.replace('a-z', 'a-zA-Z')} // there is no `i` flag
              defaultValue={formData.email}
              onChange={onChange}
              placeholder={email}
              required
            />
            <InputGroupValidation
              type="text"
              name="nickName"
              defaultValue={formData.nickName}
              onChange={onChange}
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
      </BGModal>
    );
  }
}

export default compose(
  graphql(localQueries.root)
)(RegisterPopup);
