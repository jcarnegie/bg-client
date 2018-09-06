import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'ramda';
import { injectIntl, intlShape } from 'react-intl';

import {
  compose,
  graphql,
} from 'react-apollo';

import {
  client,
  localQueries,
  localMutations,
} from '@/shared/utils/apollo';


export default function withValidation(Input) {
  @injectIntl
  class InputWithValidation extends Component {
    static propTypes = {
      data: PropTypes.shape({
        validationMessages: PropTypes.array,
      }),
      onChange: PropTypes.func,
      removeValidation: PropTypes.func,
      name: PropTypes.string,
      intl: intlShape,
    };

    static defaultProps = {
      data: {},
      onChange: Function.prototype,
    };

    componentWillUnmount() {
      client.mutate({ mutation: localMutations.removeAllValidations });
    }

    onChange(e) {
      const { onChange } = this.props;
      ::this.removeValidation();
      onChange(e);
    }

    getValidation(name) {
      const { validationMessages } = this.props.data;
      if (!validationMessages) return null;
      return validationMessages.find(validation => validation.name === name);
    }

    async removeValidation() {
      const validation = this.getValidation(this.props.name);
      if (validation) {
        await client.mutate({ mutation: localMutations.removeValidation, variables: { validation } });
      }
    }

    render() {
      const { name, intl } = this.props;
      const props = omit(['data', 'intl'], this.props);
      return (
        <Input
          {...props}
          onChange={::this.onChange}
          validation={this.getValidation(name)}
          onInvalid={e => {
            e.target.parentNode.parentNode.classList.add('has-error');
            if (e.target.validity.valueMissing) {
              e.target.setCustomValidity(intl.formatMessage({
                id: `fields.${name}.required`,
              }));
            } else if (e.target.validity.typeMismatch) {
              e.target.setCustomValidity(intl.formatMessage({
                id: `fields.${name}.invalid`,
              }));
            } else if (e.target.validity.tooShort) {
              e.target.setCustomValidity(intl.formatMessage({
                id: `fields.${name}.minlength`,
              }));
            } else if (e.target.validity.tooLong) {
              e.target.setCustomValidity(intl.formatMessage({
                id: `fields.${name}.maxlength`,
              }));
            }
          }}
          onInput={e => {
            e.target.parentNode.parentNode.classList.remove('has-error');
            e.target.setCustomValidity('');
          }}
        />
      );
    }
  }

  return compose(
    graphql(localQueries.root)
  )(InputWithValidation);
}
