import React from "react";
import PropTypes from "prop-types";

class BGIcon extends React.PureComponent {
  static propTypes = {
    width: PropTypes.string,
    src: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    width: "75px",
    src: "",
    className: "",
  }

  render() {
    const {src, width, className} = this.props;
    return (
      <div className={`bg-icon no-select ${className || ""}`}>
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
