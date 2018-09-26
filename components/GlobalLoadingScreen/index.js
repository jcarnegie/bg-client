import React from 'react';
import PropTypes from 'prop-types';
import { Fade } from 'react-bootstrap';
import style from '@/shared/constants/style';


const GlobalLoadingScreen = ({ show }) => {
  return (
    <Fade in={show} unmountOnExit>
      <div className="global-loading-screen">
        <style jsx>{`
          .global-loading-screen,
          .global-loading-header,
          .global-loading-main {
            z-index: 3000000000;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
          }
          .global-loading-screen,
          .global-loading-main {
            bottom: 0;
          }
          .global-loading-header {
            height: ${style.header.height};
            background: ${style.colors.primary};
          }
          .global-loading-screen {
            position: fixed;
          }
          .global-loading-main {
            top: ${style.header.height};
            height: calc(100vh - ${style.header.height});
            background: linear-gradient(to bottom, #B4D0F5, #D8D8EF);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            12.5% { transform: rotate(45deg); }
            25% { transform: rotate(90deg); }
            37.5% { transform: rotate(135deg); }
            50% { transform: rotate(180deg); }
            62.5% { transform: rotate(225deg); }
            75% { transform: rotate(270deg); }
            87.5% { transform: rotate(315deg); }
            100% { transform: rotate(360deg); }
          }
          .global-loading-screen-indicator {
            border-radius: 50%;
            width: 60px;
            margin: 30px;
            animation: rotate 4s infinite;
          }
        `}</style>
        <div className="global-loading-header" />
        <div className="global-loading-main">
          <img src="/static/images/misc/loading-indicator.svg" alt="loading" className="global-loading-screen-indicator" />
        </div>
      </div>
    </Fade>
  );
};

GlobalLoadingScreen.propTypes = {
  show: PropTypes.bool,
};

export default GlobalLoadingScreen;
