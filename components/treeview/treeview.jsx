import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MdChevronRight from 'react-icons/lib/md/chevron-right';

import style from '@/shared/constants/style';

class TreeView extends React.PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool,
    defaultCollapsed: PropTypes.bool,
    nodeLabel: PropTypes.node.isRequired,
    className: PropTypes.string,
    imgSource: PropTypes.string,
    chevronSize: PropTypes.number,
    children: PropTypes.any,
    itemClassName: PropTypes.string,
    childrenClassName: PropTypes.string,
    treeViewClassName: PropTypes.string,
    onClick: PropTypes.func,
    noChevron: PropTypes.bool,
  }

  static defaultProps = {
    chevronSize: 20,
  }

  constructor(props) {
    super(props);

    this.state = {
      collapsed: props.defaultCollapsed,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(...args) {
    this.setState({ collapsed: !this.state.collapsed });
    if (this.props.onClick) {
      this.props.onClick(...args);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.noChevron === false && props.defaultCollapsed !== state.collapsed) {
      return { collapsed: props.defaultCollapsed };
    } else {
      return { collapsed: state.collapsed };
    }
  }

  render() {
    const {
      collapsed = this.state.collapsed,
      className = '',
      itemClassName = '',
      treeViewClassName = '',
      childrenClassName = '',
      nodeLabel,
      children,
      defaultCollapsed,
      imgSource,
      chevronSize,
      noChevron,
      ...rest
    } = this.props;

    let imageClassName = 'tree-view_image';
    let containerClassName = 'tree-view_children';
    if (collapsed) {
      containerClassName += ' tree-view_children-collapsed';
    }

    const image = (
      <img
        className={`${className} ${imageClassName}`}
        src={imgSource}
        onClick={this.handleClick}
      />
    );
    return (
      <div
        className={cx({
          'tree-view': true,
          [treeViewClassName]: true,
          'tree-view-collapsed': collapsed,
        })}
      >
        <style jsx>{`
          .tree-view_item-children-collapsed {
            height: 0;
          }
          .tree-view_item {
            position: relative;
            transition: ${style.transition.default};
          }
          :global(.tree-view_item > .chevron) {
            position: absolute;
            right: 10px;
            top: 50%;
            transform-origin: center;
            transform: translateY(-50%) rotate(-90deg);
            transition: ${style.transition.default};
          }
          :global(.tree-view .transform-down) {
            transform-origin: center;
            transition: ${style.transition.default};
            transform: translateY(-50%) rotate(90deg);
          }
        `}</style>
        <div
          className={cx({
            'tree-view_item': true,
            [itemClassName]: true,
            'tree-view_item-collapsed': collapsed,
          })}
          onClick={this.handleClick}
        >
          {image}
          {nodeLabel}
          {noChevron === false
            ? null
            : <MdChevronRight
              color="black"
              height={chevronSize}
              width={chevronSize}
              className={cx({
                'transform-down': !collapsed,
              }, 'chevron')}
              />
          }
        </div>
        <div
          className={cx({
            [containerClassName]: true,
            [childrenClassName]: true,
            'tree-view_item-children-collapsed': collapsed,
          })}
        >
          {collapsed ? null : children}
        </div>
      </div>
    );
  }
}

export default TreeView;
