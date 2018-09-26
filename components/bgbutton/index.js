import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import style from '@/shared/constants/style';


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
    className: '',
    style: {},
  }

  render() {
    return (
      <button {...this.props} className={`bg-button ${this.props.className}`}>
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
          .bg-button:not([disabled]):hover {
            background: #3958a0;
            color: white;
          }
          .bg-button:disabled, .bg-button[disabled] {
            background: rgb(87, 112, 160);
            cursor: not-allowed;
          }
        `}</style>
        {this.props.children}
      </button>
    );
  }
}

export default BGButton;
