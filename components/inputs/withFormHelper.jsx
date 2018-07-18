import React, { Component } from 'react';


export default function withFormHelper(WrappedComponent) {
  return class FormHelper extends Component {
    state = {
      // don't remove
    };

    onChange(e) {
      const { name, type, checked, value } = e.target;
      if (e.target.tagName === 'SELECT') {
        if (type === 'select-one') {
          switch (e.target.getAttribute('type')) {
            case 'number':
              return this.setState({
                [name]: value === '' ? value : parseFloat(value),
              });
            default:
              return this.setState({
                [name]: value,
              });
          }
        } else { // select-multiple
          switch (e.target.getAttribute('type')) {
            case 'number':
              return this.setState({
                [name]: [].slice.call(e.target.selectedOptions).map(a => parseFloat(a.value)),
              });
            default:
              return this.setState({
                [name]: [].slice.call(e.target.selectedOptions).map(a => a.value),
              });
          }
        }
      } else { // INPUT
        switch (type) {
          case 'number':
            return this.setState({
              [name]: value === '' ? value : parseFloat(value),
            });
          case 'checkbox':
            return this.setState({
              [name]: checked,
            });
          case 'text':
          case 'email':
          case 'password':
          default:
            return this.setState({
              [name]: value,
            });
        }
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          formData={this.state}
          onChange={::this.onChange}
          setState={::this.setState}
        />
      );
    }
  };
}
