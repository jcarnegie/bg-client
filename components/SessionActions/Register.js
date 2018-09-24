import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as log from 'loglevel';
import Router from 'next/router';
import { path, pathOr } from 'ramda';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';

import { toHex } from '@/shared/utils';
import {
  email as emailPlaceholder,
  nickName as nickNamePlaceholder,
} from '@/shared/constants/placeholder';
import { reEmail } from '@/shared/constants/regexp';
import BGButton from '@/components/bgbutton';
import InputGroupValidation from '@/components/inputs/input.group.validation';
import withFormHelper from '@/components/inputs/withFormHelper';

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
    intl: intlShape,
    web3Wallet: PropTypes.string,
    layout: PropTypes.shape({
      type: PropTypes.shape({
        mobile: PropTypes.bool,
        desktop: PropTypes.bool,
      }),
    }),
    query: PropTypes.object, // TODO - redirect context
  };

  static defaultProps = {
    layout: {
      type: {
        mobile: false,
        desktop: true,
      },
    },
  }

  state = {
    nickName: '',
    email: '',
    registering: false,
  };

  onChange(k, v) {
    this.setState({ [k]: v });
  }

  async sign() {
    const {
      intl,
      web3Wallet,
    } = this.props;

    const {
      email,
      nickName,
    } = this.state;

    const { data } = await client.mutate({
      mutation: mutations.createSigningMessage,
      variables: { wallet: web3Wallet, action: 'register' },
    });

    const signingMessage = path(['createSigningMessage', 'signingMessage'], data);

    window.web3.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [toHex(signingMessage), web3Wallet],
      from: web3Wallet,
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
            wallet: web3Wallet,
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

          const referrer = pathOr('/', ['query', 'pathname'], this.props);
          Router.replace(referrer, referrer);
        });
      });
    });
  }

  render() {
    const { web3Wallet } = this.props;
    const { mobile } = this.props.layout.type;
    return (
      <div className="register">
        <style jsx>{`
          .register {
            display: flex;
            align-items: center;
            flex-direction: column;
            width: ${mobile ? '70%' : '70%'};
          }
          :global(.register .form-group) {
            width: 100%;
          }
          .register h1 {
            text-align: center;
            margin-bottom: 40px;
          }
          .register p {
            text-align: center;
          }
          :global(.btn-register) {
            font-size: 18px !important;
            font-weight: 500 !important
          }
          :global(.register .form-control) {
            border: 0;
            outline: 0;
            width: 100%;
            border-bottom: 1px solid black;
            height: 45px;
          }
          :global(.register label) {
            text-transform: uppercase;
            font-weight: 300;
            font-size: 12px;
          }
          :global(.register .form-control[disabled], .form-control[readonly], fieldset[disabled]){
            background-color: #E0E6FC;
            border: none;
          }
          .register-select-btn {
            width: ${mobile ? '80%' : '50%'};
            margin: auto;
          }
          .register .bg-link {
            margin: 5px auto 0 auto;
          }
          .register .register-link {
            margin-top: 20px;
          }
        `}</style>
        <h1><FormattedMessage id="pages.register.title" /></h1>
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
          value={web3Wallet}
          maxLength="42"
          minLength="42"
          required
          readOnly
        />

        <br />

        <BGButton className="btn-block btn-register text-uppercase" onClick={::this.sign}>
          <FormattedMessage id="buttons.register" />
        </BGButton>
        <div className="bg-link register-link" onClick={() => Router.push('/login')}>
          <FormattedMessage id="pages.register.already-registered" />
        </div>
        <div className="bg-link" onClick={() => Router.push('/register')}>
          <FormattedMessage id="pages.register.questions-faq" />
        </div>
      </div>
    );
  }
}

export default Register;
