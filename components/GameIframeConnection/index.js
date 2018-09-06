import { Component } from 'react';
import PropTypes from 'prop-types';
import { equals, path } from 'ramda';


class GameIframeConnection extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  static defaultProps = {
    user: {},
  };

  state = {
    user: {},
    sources: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props;
    const prevUser = prevProps.user;
    const { sources } = this.state;

    if (!user) return null;
    
    if (!equals(user.wallet, prevUser.wallet)) {
      ::this.postUserToSources(user);
    }
  }

  componentDidMount() {
    window.addEventListener('message', ::this.receiveMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', ::this.receiveMessage);
  }

  postUserToSources(user) {
    const { sources } = this.state;
    Object.keys(sources).forEach(origin => {
      sources[origin].postMessage({
        type: 'user',
        user,
      }, origin);
    });
  }

  receiveMessage({ data, origin, source }) {
    const { user } = this.props;
    const { sources } = this.state;
    if (!sources[origin]) {
      this.setState({
        sources: {
          ...sources,
          [origin]: source,
        },
      }, () => ::this.postUserToSources(user));
    }

    switch (data.type) {
      case 'ping':
        source.postMessage({
          type: 'pong',
        }, origin);
        break;
      case 'user':
        source.postMessage({
          type: 'user',
          user,
        }, origin);
        break;
      default:
        break;
    }
  }

  render() {
    return null;
  }
}


export default GameIframeConnection;
