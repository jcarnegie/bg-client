import {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Image} from "react-bootstrap";

@connect(
  state => ({
    layout: state.layout,
  })
)
class BGGrid extends PureComponent {
  static propTypes = {
    layout: PropTypes.object,
    title: PropTypes.node,
    titleIconSrc: PropTypes.node,
    titleIconWidth: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundImageStats: PropTypes.object,
    underlayImage: PropTypes.string,
    children: PropTypes.array,
  }

  static defaultProps = {
    layout: {},
    title: "",
    titleIconSrc: null,
    titleIconWidth: "70px",
    backgroundColor: "#F0F6FE",
    backgroundImage: "none",
    backgroundImageStats: null,
    underlayImage: null,
    children: null,
  }

  title() {
    const {mobile} = this.props.layout.type;
    return this.props.title ? (
      <h5 className="title">
        <style jsx>{`
          .title {
            margin: 0 0 0 ${mobile ? "3%" : "1.5%"};
            text-transform: uppercase;
            display: inline-block;
            font-weight: 600;
          }
        `}</style>
        {this.props.title}
      </h5>
    ) : null;
  }

  titleIcon() {
    const {
      titleIconSrc,
      titleIconWidth,
    } = this.props;
    return titleIconSrc ? <Image src={titleIconSrc} circle width={titleIconWidth} /> : null;
  }

  backgroundImageFromStats() {
    const {backgroundImageStats} = this.props;
    if (!backgroundImageStats) return "none";
    const {colors, gap} = backgroundImageStats;
    return `linear-gradient(${colors[0]} 50%, ${colors[1]} calc(100% - ${gap}), ${colors[2]} ${gap})`;
  }

  render() {
    const {mobile} = this.props.layout.type;
    return (
      <div className="bg-grid-wrapper">
        <style jsx>{`
          .bg-grid-wrapper,
          .bg-grid-header,
          .bg-grid {
            padding: ${mobile ? "5px" : "15px"};
          }
          .bg-grid-wrapper {
            background: ${this.props.backgroundColor};
            background-image: ${this.props.backgroundImageStats ? ::this.backgroundImageFromStats() : this.props.backgroundImage};
            width: 100%;
            position: relative;
          }
          .bg-grid-header {
            padding: ${mobile ? "5px" : "30px 30px 15px 30px"};
            display: flex;
            align-items: center;
          }
          .bg-grid-wrapper .bg-grid {
            padding-top: 5px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: ${mobile ? "space-evenly" : "start"};
          }
          :global(.bg-grid-wrapper .bg-grid > *) {
            margin: ${mobile ? "10px 5px" : "20px"};
            z-index: 2;
          }
          .underlay {
            display: ${mobile ? "none" : "inline"};
            position: absolute;
            right: 0;
            top: 0;
            height: ${mobile ? "calc(100% - 40px)" : "calc(100% - 80px)"};
            margin: ${mobile ? "20px" : "40px"};
            z-index: 1;
          }
        `}</style>
        <div className="bg-grid-header">
          {::this.titleIcon()}
          {::this.title()}
        </div>
        {this.props.underlayImage ? <img className="underlay" src={this.props.underlayImage} /> : null}
        <div className="bg-grid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BGGrid;
