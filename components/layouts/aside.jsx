import React from 'react';
import PropTypes from 'prop-types';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import MdChevronLeft from 'react-icons/lib/md/chevron-left';
import { connect } from 'react-redux';

import { LAYOUT_ASIDE_RIGHT_COLLAPSED } from '@/shared/constants/actions';

import style from '@/shared/constants/style';

@connect(
  state => ({
    layout: state.layout,
  })
)
class Aside extends React.Component {
  static propTypes = {
    layout: PropTypes.object,
    dispatch: PropTypes.func,
    offsetTop: PropTypes.string,
    children: PropTypes.any,
    collapsedWidth: PropTypes.string,
    onCollapse: PropTypes.func,
  }

  static defaultProps = {
    layout: {},
    offsetTop: '0px',
    children: null,
    collapsedWidth: '60px',
    onCollapse: () => {},
  }

  render() {
    const { asideRightCollapsed, asideRightWidth } = this.props.layout;
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        parentCollapsed: asideRightCollapsed,
      })
    );

    return (
      <aside className={asideRightCollapsed ? 'collapsed' : ''}>
        <style jsx>{`
          aside {
            position: fixed;
            right: 0;
            top: ${this.props.offsetTop};
            bottom: 0;
            width: ${asideRightCollapsed ? this.props.collapsedWidth : asideRightWidth};
            transition: ${style.transition.default};
          }

          .aside-button {
            color: ${style.colors.primary};
          }
          :global(.aside-button svg) {
            vertical-align: top !important; /* react-icons override */
          }
          .aside-collapse-button {
            display: ${asideRightCollapsed ? 'none' : 'initial'};
            font-size: 35px;
            height: 35px;
            width: 35px;
            position: absolute;
            cursor: pointer;
            left: 5px;
            top: 5px;
            visibility: hidden;
            border-radius: 50%;
            color: white;
            background-color: ${style.colors.primary};
            box-shadow: ${style.boxShadow.default};
            transition: ${style.transition.button};
            opacity: .7;
          }

          .aside-collapse-button:hover {
            opacity: 1;
          }

          aside:hover .aside-collapse-button {
            visibility: visible;
          }
          
          .aside-uncollapse-button {
            display: ${asideRightCollapsed ? 'initial' : 'none'};
            font-size: ${this.props.collapsedWidth};
            position: absolute;
            cursor: pointer;
            right: 0px;
            top: 0px;
          }
        `}</style>
        <div
          className="aside-button aside-collapse-button"
          onClick={() => {
            this.props.dispatch({
              type: LAYOUT_ASIDE_RIGHT_COLLAPSED,
              payload: true,
            });
            this.props.onCollapse({ asideWidth: this.props.collapsedWidth });
          }}
        >
          <MdChevronRight />
        </div>
        <div
          className="aside-button aside-uncollapse-button"
          onClick={() => {
            this.props.dispatch({
              type: LAYOUT_ASIDE_RIGHT_COLLAPSED,
              payload: false,
            });
            this.props.onCollapse({ asideWidth: asideRightWidth });
          }}
        >
          <MdChevronLeft />
        </div>
        {childrenWithProps}
      </aside>
    );
  }
};


export default Aside;
