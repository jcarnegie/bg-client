import {PureComponent} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import MdPlayArrow from "react-icons/lib/md/play-arrow";

import style from "@/shared/constants/style";

@connect(
  state => ({
    layout: state.layout,
  })
)
class BGGameCard extends PureComponent {
  static propTypes = {
    margin: PropTypes.string,
    children: PropTypes.any,
    game: PropTypes.object,
    layout: PropTypes.object,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    margin: "2%",
    game: {},
    layout: {},
    children: null,
    onClick: () => {},
  }

  render() {
    const {mobile} = this.props.layout.type;
    const playButtonSize = mobile ? "50" : "60";
    return (
      <div className="bg-game-card" onClick={this.props.onClick}>
        <style jsx>{`
          @keyframes card-hover-float {
            0% {
              box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.4);
              transform: translateY(-5px);
            }
            50% {
              box-shadow: 0 6px 10px 2px rgba(0, 0, 0, 0.2);
              transform: translateY(-10px);
            }
          }
          .bg-game-card {
            display: flex;
            position: relative;
            flex-direction: column;
            align-content: space-between;
            justify-content: start;
            background: white;
            max-width: 300px;
            min-width: 140px;
            max-height: 440px;
            width: 30%;
            height: 35%;
            background: white;
            border-radius: 6px;
            box-shadow: ${style.boxShadow.default};
            padding: 10px;
            cursor: pointer;
          }
          .bg-game-card:hover {
            transform: translateY(-5px);
            animation: card-hover-float 4s ease-in-out infinite;
            transition: ${style.transition.slow};
          }
          .bg-game-card .play-game-button {
            visibility: hidden;
            position: absolute;
            left: calc(50% - ${Math.floor(playButtonSize / 2)}px);
            top: ${mobile ? "45%" : "50%"};
            transform: translateY(-75%);
            display: inline;
            background: white;
            border-radius: 50%;
            width: ${playButtonSize}px;
            height: ${playButtonSize}px;
            vertical-align: middle;
            line-height: ${playButtonSize}px;
          }
          .bg-game-card:hover .play-game-button {
            visibility: visible;
          }
          .bg-game-card-img {
            width: 100%;
          }
          h6, p {
            text-align: center;
            font-size: 1em;
          }
          p {
            font-size: .8em;
            margin: 0;
          }
        `}</style>
          <img className="bg-game-card-img" src={`/static/images/games/${this.props.game.slug}/thumbnail.jpg`} alt="game thumbnail" />
          <div className="play-game-button"><MdPlayArrow /><FormattedMessage id="global.play" /></div>
          <h6>{this.props.game.name}</h6>
          <p>{this.props.game.description}</p>
          {this.props.children}
      </div>
    );
  }
}

export default BGGameCard;
