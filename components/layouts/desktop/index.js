import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '@/components/header/desktop';
import Footer from '@/components/footer/desktop';
import Main from '@/components/layouts/Main';
import { DesktopScreen } from 'react-responsive-redux';


function DesktopLayout({ children, ...props }) {
  return (
    <DesktopScreen {...props}>
      <div className="wrapper">
        <Header />
        <Main>
          {children}
        </Main>
      </div>
      <Footer />
    </DesktopScreen>
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