import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from '@/shared/constants/style';

class Main extends Component {
  componentDidMount() {
    window.scroll({
     top: 0,
     left: 0,
     behavior: 'instant',
    });
  }

  render() {
    return (
      <main>
        <style jsx>{`
          main {
            width: 100%;
            margin-top: ${style.header.height};
            transition: ${style.transition.default};
          }
        `}</style>
        {this.props.children}
      </main>
    );
  }
}

Main.propTypes = {
  children: PropTypes.any,
};

Main.defaultProps = {
  children: null,
};

export default Main;
