import {PureComponent} from "react";
import PropTypes from "prop-types";

import style from "@/shared/constants/style";


class BGButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.object,
  }
  static defaultProps = {
    onClick: () => {},
    children: null,
    className: "",
    style: {},
  }

  render() {
    return (
      <button className={`bg-button ${this.props.className}`} onClick={::this.props.onClick} style={this.props.style}>
        <style jsx>{`
          .bg-button {
            color: white;
            background: ${style.colors.primary};
            box-shadow: ${style.boxShadow.default};
            font-size: 14px;
            font-weight: 100;
            padding: 10px 20px;
            margin: 0;
            border: 0;
            border-radius: 2px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .bg-button:hover {
            background: #3958a0;
            color: white;
          }
        `}</style>
        {this.props.children}
      </button>
    );
  }
}

export default BGButton;
