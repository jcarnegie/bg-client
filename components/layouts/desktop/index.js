import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '@/components/header/desktop';
import Footer from '@/components/footer/desktop';
import Main from '@/components/layouts/main';
import { Desktop } from '@/components/responsive';


@connect(
  state => ({
    layout: state.layout,
  })
)
class DesktopLayout extends React.Component {
  static propTypes = {
    main: PropTypes.any,
    dispatch: PropTypes.func,
    layout: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
    main: null,
    children: null,
  }

  render() {
    /* dispatch should not be passed to children */
    const props = Object.assign({}, this.props);
    delete props.dispatch;

    let offsetRight = '0';

    return (
      <Desktop {...props}>
        <div className="wrapper">
          <Header />
          <Main offsetRight={offsetRight}>
            {this.props.main}
          </Main>
          {this.props.children}
        </div>
        <Footer offsetRight={offsetRight} />
      </Desktop>
    );
  }
}


export default DesktopLayout;
