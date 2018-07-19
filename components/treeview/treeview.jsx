import React from 'react';
import PropTypes from 'prop-types';

class TreeView extends React.PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool,
    defaultCollapsed: PropTypes.bool,
    nodeLabel: PropTypes.node.isRequired,
    className: PropTypes.string,
    imgSource: PropTypes.string,
    children: PropTypes.any,
    itemClassName: PropTypes.string,
    childrenClassName: PropTypes.string,
    treeViewClassName: PropTypes.string,
    onClick: PropTypes.func,
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
      ...rest
    } = this.props;

    let gameImageClassName = 'tree-view_game';
    let containerClassName = 'tree-view_children';
    if (collapsed) {
      containerClassName += ' tree-view_children-collapsed';
    }

    const gameImage = (
      <img
        className={className + ' ' + gameImageClassName}
        src={imgSource}
        onClick={this.handleClick}
      />
    );
    return (
      <div className={'tree-view ' + treeViewClassName}>
        <div className={'tree-view_item ' + itemClassName}
          onClick={this.handleClick}>
          {gameImage}
          {nodeLabel}
        </div>
        <div className={containerClassName + ' ' + childrenClassName}>
          {collapsed ? null : children}
        </div>
      </div>
    );
  }
}

export default TreeView;
