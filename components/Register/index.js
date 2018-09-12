import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as log from 'loglevel';
import Router from 'next/router';
import { path } from 'ramda';
import { FormattedHTMLMessage, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { updateIntl } from 'react-intl-redux/lib/index';
import { connect } from 'react-redux';

import withFormHelper from '@/components/inputs/withFormHelper';
import { withRoot } from '@/components/wrappers';
import { localization } from '@/shared/intl/setup';
import {
  withWallet,
} from '@/shared/utils/context';
import {
  email as emailPlaceholder,
  nickName as nickNamePlaceholder,
} from '@/shared/constants/placeholder';
import { reEmail } from '@/shared/constants/regexp';
import { enabledLanguages } from '@/shared/constants/language';
import BGButton from '@/components/bgbutton';
import DataLoading from '@/components/DataLoading';
import InputGroupValidation from '@/components/inputs/input.group.validation';
import NetworkNotSupported from '@/components/NetworkNotSupported';
import LoginToWeb3 from '@/components/LoginToWeb3';

import {
  client,
  mutations,
} from '@/shared/utils/apollo';

import * as bgLocalStorage from '@/client/utils/localStorage';


@withFormHelper
@injectIntl
@connect(
  state => ({
    analytics: state.analytics,
  })
)
class Register extends Component {
  static propTypes = {
    analytics: PropTypes.object,
    dispatch: PropTypes.func,
    wallet: PropTypes.string,
    intl: intlShape,
    root: PropTypes.object,
  };

  state = {
    nickName: '',
    email: '',
    registering: false,
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.formData.language !== nextProps.intl.locale) {
      nextProps.setState({
        language: nextProps.intl.locale,
      });
    }

    return null;
  }

  onChange(k, v) {
    this.setState({ [k]: v });
  }

  static toHex(text) {
    return '0x' + Buffer.from(text, 'utf8').toString('hex');
  }

  async sign() {
    const {
      wallet,
      intl,
    } = this.props;
    const {
      email,
      nickName,
    } = this.state;

    const { data } = await client.mutate({
      mutation: mutations.createSigningMessage,
      variables: { wallet, action: 'register' },
    });

    const signingMessage = path(['createSigningMessage', 'signingMessage'], data);

    window.web3.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [Register.toHex(signingMessage), wallet],
      from: wallet,
    }, async(err, result) => {
      if (err || result.error) {
        log.error(err || result.error);
        return;
      }

      this.setState({ registering: true }, async() => {
        const { data, error } = await client.mutate({
          mutation: mutations.register,
          variables: {
            email,
            wallet,
            nickName,
            signature: result.result,
            language: intl.locale,
          },
        });
        const registerSuccess = path(['register'], data);
        this.setState({
          registering: false,
          registerSuccess,
          error,
        }, () => {
          if (!registerSuccess) return;
          const {
            // user,
            tokenData,
          } = data.register;
          const {
            // accessToken,
            refreshToken,
          } = tokenData;

          bgLocalStorage.setItem('refreshToken', refreshToken);

          this.props.analytics.ga.event({
            category: 'Site Interaction',
            action: 'Sign-up',
            label: 'Create account',
          });

          Router.push('/');
        });
      });
    });
  }

  onChangeLanguage(language) {
    this.props.dispatch(updateIntl(localization[language]));
  }

  registerForm() {
    const { wallet, intl } = this.props;
    return (
      <div className="register-form">
        <h2><FormattedMessage id="modals.register.title" /></h2>
        <InputGroupValidation
          name="language"
          componentClass="select"
          value={intl.locale}
          onChange={e => ::this.onChangeLanguage(e.target.value)}
          required
        >
          {enabledLanguages.map(language =>
            (<FormattedMessage key={language} id={`components.language.${language}`}>
              {formattedMessage => <option key={language} value={language}>{formattedMessage}</option>}
            </FormattedMessage>)
          )}
        </InputGroupValidation>
        <InputGroupValidation
          type="text"
          name="wallet"
          value={wallet}
          maxLength="42"
          minLength="42"
          required
          readOnly
        />
        <InputGroupValidation
          name="email"
          type="email"
          pattern={reEmail.source.replace('a-z', 'a-zA-Z')/* there is no `i` flag */}
          onChange={e => ::this.onChange('email', e.target.value)}
          placeholder={emailPlaceholder}
          required
        />
        <InputGroupValidation
          name="nickName"
          type="text"
          onChange={e => ::this.onChange('nickName', e.target.value)}
          placeholder={nickNamePlaceholder}
          required
        />

        <p className="note"><FormattedMessage id="modals.register.n1" /></p>
        <p className="note"><FormattedMessage id="modals.register.n2" /></p>

        <br />

        <BGButton className="btn-block text-uppercase" onClick={() => ::this.sign(wallet)}>
          <FormattedMessage id="buttons.register" />
        </BGButton>

        <div className="register-already-registered bg-link" onClick={() => Router.push('/login')}>
          <FormattedHTMLMessage id="pages.register.already-registered" />
        </div>
      </div>
    );
  }

  component() {
    const { wallet, root } = this.props;
    if (!root.network.available) {
      return <DataLoading />;
    }
    if (!root.network.supported) {
      return <NetworkNotSupported />;
    }
    if (!wallet) {
      return <LoginToWeb3 />;
    }
    if (this.state.registering) {
      return <DataLoading />;
    }
    if (this.state.registerSuccess) {
      return (
        <div className="register-success">
          Success!
        </div>
      );
    }
    return ::this.registerForm();
  }

  render() {
    return (
      <div className="register">
      <style jsx>{`
        .register {
          max-width: 500px;
          margin: 150px auto 0 auto;
        }
      `}</style>
        {::this.component()}
      </div>
    );
  }
}

export default withRoot(withWallet(Register));
