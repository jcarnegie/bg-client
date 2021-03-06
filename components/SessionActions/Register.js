import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as log from 'loglevel';
import Router from 'next/router';
import { path, pathOr } from 'ramda';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { inHTMLData } from 'xss-filters';
import doRegister from '@/actions/register';
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
  localQueries,
} from '@/shared/utils/apollo';


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
    query: PropTypes.shape({
      referrer: PropTypes.string,
    }),
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
    errors: [],
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

    if (!email || !nickName) {
      return null;
    }

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
        const signature = result.result;
        const language = intl.locale;
        const { data, errors } = await doRegister({ apollo: client, email, wallet: web3Wallet, nickName, signature, language });
        const registerSuccess = path(['register'], data);
        this.setState({
          registering: false,
          registerSuccess,
          errors: errors || [],
        }, async() => {
          if (!registerSuccess) return;
          this.props.analytics.ga.event({
            category: 'Site Interaction',
            action: 'Sign-up',
            label: 'Create account',
          });
          const referrer = pathOr('/', ['query', 'referrer'], this.props);
          Router.replace(referrer);
        });
      });
    });
  }

  render() {
    const { web3Wallet } = this.props;
    const { mobile } = this.props.layout.type;
    return (
      <Query query={localQueries.validationMessages}>
        {({ data }) => {
          const validationMessages = pathOr([], ['validationMessages'], data);
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
                  font-size: ${mobile ? '1.8em' : '2.6em'};
                  margin-bottom: 40px;
                  ${mobile ? 'margin-top: 0;' : ''}
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
                .register .bg-link:last-child {
                  margin-bottom: 15px;
                }
                .register .register-link {
                  margin-top: 20px;
                }
              `}</style>
              <h1><FormattedMessage id="pages.register.title" /></h1>
              <InputGroupValidation
                name="nickName"
                type="text"
                onChange={e => ::this.onChange('nickName', inHTMLData(e.target.value.trim()))}
                placeholder={nickNamePlaceholder}
                required
                data={{ validationMessages }}
              />
              <InputGroupValidation
                name="email"
                type="email"
                pattern={reEmail.source.replace('a-z', 'a-zA-Z')/* there is no `i` flag */}
                onChange={e => ::this.onChange('email', inHTMLData(e.target.value.trim()))}
                placeholder={emailPlaceholder}
                required
                data={{ validationMessages }}
              />
              <InputGroupValidation
                type="text"
                name="wallet"
                value={web3Wallet}
                maxLength="42"
                minLength="42"
                required
                readOnly
                data={{ validationMessages }}
              />

              <br />

              <BGButton disabled={!(this.state.nickName && this.state.email)} className="btn-block btn-register text-uppercase" onClick={::this.sign}>
                <FormattedMessage id="buttons.register" />
              </BGButton>
              {this.state.errors.map(e => e.message).map((m, i) => {
                if (m !== 'unique_constraint_error') return <p key={i} className="bg-error-message"><FormattedMessage id={m} /></p>;
              })}
              <div className="bg-link register-link" onClick={() => Router.push('/login')}>
                <FormattedMessage id="pages.register.already-registered" />
              </div>
              <div className="bg-link" onClick={() => Router.push('/faq')}>
                <FormattedMessage id="pages.register.questions-faq" />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Register;
