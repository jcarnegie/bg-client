import {PureComponent} from "react";
import PropTypes from "prop-types";

import style from "@/shared/constants/style";


class BGGameCard extends PureComponent {
  static propTypes = {
    margin: PropTypes.string,
    children: PropTypes.any,
    game: PropTypes.object,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    margin: "2%",
    game: {},
    children: null,
    onClick: () => {},
  }

  render() {
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
          <h6>{this.props.game.name}</h6>
          <p>{this.props.game.description}</p>
          {this.props.children}
      </div>
    );
  }
}

export default BGGameCard;
