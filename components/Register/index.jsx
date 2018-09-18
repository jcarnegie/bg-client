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
  queries,
} from '@/shared/utils/apollo';

import * as bgLocalStorage from '@/client/utils/localStorage';


@withFormHelper
@injectIntl
@connect(
  state => ({
    layout: state.layout,
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
        }, async() => {
          if (!registerSuccess) return;
          const {
            // user,
            tokenData,
          } = data.register;
          const {
            accessToken,
            refreshToken,
          } = tokenData;

          bgLocalStorage.setItem('accessToken', accessToken);
          bgLocalStorage.setItem('refreshToken', refreshToken);

          await client.query({ query: queries.me });

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
    const { wallet, intl, layout } = this.props;
    const mobile = layout.type.mobile;

    return (
      <div className="register-form">
        <style jsx>{`
          .register-form {
            width: ${mobile ? '75%' : '50%'};
            display: block;
            margin-right: auto;
            margin-left: ${mobile ? 'auto' : '15%'};
          }
          .register-form h1 {
            text-align: center;
            margin-top: 40px;
          }
          .register-form p {
            text-align: center;
          }
          .select-language {
            width: 100%;
            background: transparent;
            height: 40px;
            margin-bottom: 10px;
            border: 2px solid black;
            text-indent: 45px;
          }
          :global(.btn-register) {
            font-size: 18px !important;
            font-weight: 500 !important
          }
          :global(.register-form .form-control) {
            border: 0;
            outline: 0;
            border-bottom: 1px solid black;
            height: 45px;
          }
          :global(.register-form label) {
            text-transform: uppercase;
            font-weight: 300;
            font-size: 12px;
          }
          :global(.register-form .form-control[disabled], .form-control[readonly], fieldset[disabled]){
            background-color: #E0E6FC;
            border: none;
          }
          .register-select-btn {
            width: ${mobile ? '80%' : '50%'};
            margin: auto;
          }
          :global(.btn-block-registration-active) {
            color: white;
            background: #314B88;
            font-size: 12px;
            font-weight: 100;
            margin: 0;
            border: 0;
            border-radius: 2px;
            text-transform: uppercase;
            letter-spacing: 1px;
            width: 50%;
            padding: 10px 0px 10px 0px !important;
          }
          :global(.btn-block-registration) {
            color: #6C5A5A !important;
            font-size: 12px;
            font-weight: 100;
            margin: 0;
            border: 0;
            border-radius: 2px;
            text-transform: uppercase;
            letter-spacing: 1px;
            width: 50%;
            background-color: #D7DEF6 !important;
            padding: 10px 0px 10px 0px !important;
          }
          .language-icon {
            position: absolute;
            padding-top: 8px;
            padding-left: 15px;
          }
        `}</style>
        <div className="register-select-btn">
          <BGButton className="btn-block-registration-active text-uppercase">
            <FormattedHTMLMessage id="pages.register.register" />
          </BGButton>
          <BGButton className="btn-block-registration text-uppercase" onClick={() => Router.push('/login')}>
            <FormattedHTMLMessage id="pages.register.login" />
          </BGButton>
        </div>
        <h1><FormattedMessage id="modals.register.title" /></h1>
        <p className="note"><FormattedMessage id="modals.register.n1" /></p>
        <span>
          <img src="/static/images/language/globe.svg" className="language-icon" />
          <select
            className="select-language"
            onChange={e => ::this.onChangeLanguage(e.target.value)}
          >
            {enabledLanguages.map(language =>
              (<FormattedMessage key={language} id={`components.language.${language}`}>
                {formattedMessage => <option selected={intl.locale === language} key={language} value={language} >{formattedMessage}</option>}
              </FormattedMessage>)
            )}
          </select>
        </span>
        <InputGroupValidation
          name="nickName"
          type="text"
          onChange={e => ::this.onChange('nickName', e.target.value)}
          placeholder={nickNamePlaceholder}
          required
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
          type="text"
          name="wallet"
          value={wallet}
          maxLength="42"
          minLength="42"
          required
          readOnly
        />

        <br />

        <BGButton className="btn-block btn-register text-uppercase" onClick={() => ::this.sign(wallet)}>
          <FormattedMessage id="buttons.register" />
        </BGButton>
      </div>
    );
  }

  component() {
    const { wallet, root } = this.props;
     if (!root.network) return null;

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
    const { layout } = this.props;
    const mobile = layout.type.mobile;

    return (
      <div className="register">
        <style jsx>{`
          .register {
            background: linear-gradient(to bottom, #B4D0F5, #D8D8EF);
            height: ${mobile ? null : 'calc(100vh - 62px)'};
          }
          .register-image-container {
            display: flex;
            align-items: center;
            width: ${mobile ? '100%' : '50%'};
            float: left;
            height: ${mobile ? null : '100%'};
            margin-top: ${mobile ? '30px' : null};
            margin-bottom: ${mobile ? '30px' : null};
          }
          .register-image {
            border-radius: 50%;
            width: 70%;
            display: block;
            margin-left: auto;
            margin-right: 15%;
            position: relative;
            max-width: 500px;
            max-height: 500px;
          }
          .register-container {
            display: flex;
            align-items: center;
            width: ${mobile ? '100%' : '50%'};
            height: ${mobile ? null : '100%'};
            padding-bottom: ${mobile ? '30px' : null};
          }
        `}</style>
        <div className="register-image-container">
          <img src="/static/images/misc/auth.png" className="register-image" />
        </div>
        <div className="register-container">
          {::this.component()}
        </div>
      </div>
    );
  }
}

export default withRoot(withWallet(Register));
