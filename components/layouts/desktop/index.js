import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '@/components/header/desktop';
import Footer from '@/components/footer/desktop';
import Main from '@/components/layouts/Main';
import { Desktop } from '@/components/responsive';


function DesktopLayout({ children, ...props }) {
  return (
    <Desktop {...props}>
      <div className="wrapper">
        <Header />
        <Main>
          {children}
        </Main>
      </div>
      <Footer />
    </Desktop>
  );
}

DesktopLayout.propTypes = {
  dispatch: PropTypes.func,
  children: PropTypes.any,
}

DesktopLayout.defaultProps = {
  children: null,
}


export default DesktopLayout;