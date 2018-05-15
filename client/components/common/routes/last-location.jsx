import React, {Component} from "react";
import PropTypes from "prop-types";
import {Route} from "react-router";


export default class LastLocationRoute extends Component {
  static propTypes = {
    component: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      key: PropTypes.string,
      state: PropTypes.object
    })
  };

  state = {
    location: this.props.location,
    lastLocation: this.props.location
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location === prevState.location) {
      return null;
    }

    return {
      location: nextProps.location,
      lastLocation: prevState.location
    };
  }

  render() {
    const {component, ...rest} = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return React.createElement(component, {
            ...props,
            lastLocation: this.state.lastLocation
          });
        }}
      />
    );
  }
}
