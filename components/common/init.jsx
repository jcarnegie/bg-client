import { Component } from 'react';
import PropTypes from 'prop-types';
import { equals } from 'ramda';

import {
  compose,
} from 'react-apollo';

import {
  viewUserByWalletQuery,
} from '@/shared/utils/apollo';


class Init extends Component {
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.user.loading && nextProps.user.viewUserByWallet &&
      !equals(nextProps.user.viewUserByWallet, prevState.user.viewUserByWallet)) {
      Object.keys(prevState.sources).forEach(origin => {
        prevState.sources[origin].postMessage({
          type: 'user',
          user: nextProps.user.viewUserByWallet,
        }, origin);
      });

      return {
        user: {},
      };
    }

    return null;
  }

  componentDidMount() {
    window.addEventListener('message', ::this.receiveMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', ::this.receiveMessage);
  }

  receiveMessage({ data, origin, source }) {
    if (!this.state.sources[origin]) {
      this.setState({
        sources: {
          ...this.state.sources,
          [origin]: source,
        },
      });
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
          user: this.state.user,
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


export default compose(viewUserByWalletQuery)(Init);
