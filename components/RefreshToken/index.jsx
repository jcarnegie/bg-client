import React, { Component } from 'react';
import DataLoading from '@/components/DataLoading';

class RefreshToken extends Component {
  render() {
    /* Show loading page while refreshing token, then redirect */
    return (
      <div>
        <DataLoading />
      </div>
    );
  }
}

export default RefreshToken;
