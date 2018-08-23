import React from 'react';
import PropTypes from 'prop-types';

class BGIcon extends React.PureComponent {
  static propTypes = {
    width: PropTypes.string,
    src: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    width: '75px',
    src: '',
    className: '',
    style: {},
  }

  render() {
    const { src, style, width, className } = this.props;
    return (
      <div className={`bg-icon no-select ${className || ''}`} style={style}>
        <style jsx>{`
          .bg-icon img {
            width: ${width};
          }
        `}</style>
        <img src={src} />
      </div>
    );
  }
}

export default BGIcon;
