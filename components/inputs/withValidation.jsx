import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {omit} from "lodash";
import {VALIDATION_REMOVE} from "../../shared/constants/actions";
import {injectIntl, intlShape} from "react-intl";


export default function withValidation(Input) {
  @injectIntl
  @connect(
    state => ({
      validations: state.validations
    })
  )
  class InputWithValidation extends Component {
    static propTypes = {
      validations: PropTypes.array,
      onChange: PropTypes.func,
      dispatch: PropTypes.func,
      removeValidation: PropTypes.func,
      name: PropTypes.string,
      intl: intlShape
    };

    static defaultProps = {
      validations: [],
      onChange: Function.prototype
    };

    componentWillUnmount() {
      const {dispatch} = this.props;
      const validation = this.getValidation(this.props.name);
      if (validation) {
        dispatch({
          type: VALIDATION_REMOVE,
          payload: validation
        });
      }
    }

    onChange(e) {
      const {name, dispatch, onChange} = this.props;
      const validation = this.getValidation(name);
      if (validation) {
        dispatch({
          type: VALIDATION_REMOVE,
          payload: validation
        });
      }
      onChange(e);
    }

    getValidation(name) {
      const {validations} = this.props;
      return validations.find(validation => validation.name === name);
    }

    render() {
      const {name, intl} = this.props;
      const props = omit(this.props, ["validations", "dispatch", "intl"]);
      return (
        <Input
          {...props}
          onChange={::this.onChange}
          validation={this.getValidation(name)}
          onInvalid={e => {
            e.target.parentNode.parentNode.classList.add("has-error");
            if (e.target.validity.valueMissing) {
              e.target.setCustomValidity(intl.formatMessage({
                id: `fields.${name}.required`
              }));
            } else if (e.target.validity.typeMismatch) {
              e.target.setCustomValidity(intl.formatMessage({
                id: `fields.${name}.invalid`
              }));
            } else if (e.target.validity.tooShort) {
              e.target.setCustomValidity(intl.formatMessage({
                id: `fields.${name}.minlength`
              }));
            } else if (e.target.validity.tooLong) {
              e.target.setCustomValidity(intl.formatMessage({
                id: `fields.${name}.maxlength`
              }));
            }
          }}
          onInput={e => {
            e.target.parentNode.parentNode.classList.remove("has-error");
            e.target.setCustomValidity("");
          }}
        />
      );
    }
  }

  return InputWithValidation;
}
