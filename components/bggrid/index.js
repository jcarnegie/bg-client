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
    style: PropTypes.object,
    title: PropTypes.node,
    titleIconSrc: PropTypes.node,
    titleIconWidth: PropTypes.string,
    backgroundImage: PropTypes.string,
    underlayImage: PropTypes.string,
    children: PropTypes.array,
  }

  static defaultProps = {
    layout: {},
    style: {},
    title: "",
    titleIconSrc: null,
    titleIconWidth: "75px",
    backgroundImage: "linear-gradient(#F0F6FE 50%, #F0F6FE 75%, white 50%)",
    underlayImage: null,
    children: null,
  }

  title() {
    const {mobile} = this.props.layout.type;
    return this.props.title ? (
      <h5 className="title">
        <style jsx>{`
          .title {
            margin: 0 0 0 ${mobile ? "5%" : "2%"};
            text-transform: uppercase;
            display: inline-block;
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

  render() {
    const {mobile} = this.props.layout.type;
    return (
      <div className="bg-grid-wrapper" style={this.props.style}>
        <style jsx>{`
          .bg-grid-wrapper,
          .bg-grid-header,
          .bg-grid {
            padding: ${mobile ? "5px" : "15px"};
          }
          .bg-grid-wrapper {
            background: #F0F6FE;
            background-image: ${this.props.backgroundImage};
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
            justify-content: start;
          }
          :global(.bg-grid-wrapper .bg-grid > *) {
            margin: ${mobile ? "10px 5px" : "20px"};
            z-index: 2;
          }
          .underlay {
            position: absolute;
            right: 0;
            top: 0;
            height: calc(100% - 40px);
            margin: 20px;
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
