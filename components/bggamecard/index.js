import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MdPlayArrow from 'react-icons/lib/md/play-arrow';

import style from '@/shared/constants/style';

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
    playButton: PropTypes.bool,
  }

  static defaultProps = {
    margin: '2%',
    game: {},
    layout: {},
    children: null,
    onClick: () => {},
    playButton: false,
  }

  render() {
    const { mobile } = this.props.layout.type;
    const playButtonSize = mobile ? '50' : '60';
    return (
      <div className="bg-game-card-wrapper" onClick={this.props.onClick}>
        <style jsx>{`
          .bg-game-card-wrapper {
            display: flex;
            position: relative;
            flex-direction: column;
            align-content: space-between;
            justify-content: start;
            background: white;
            max-width: 300px;
            min-width: 150px;
            max-height: 440px;
            width: 30%;
            height: 35%;
            background: white;
            border-radius: 6px;
            box-shadow: ${style.boxShadow.wide};
            padding: ${mobile ? '5px' : '10px'};
            ${mobile ? 'margin: 10px 0px !important;' : ''}
            cursor: pointer;
            border: 1px solid white;
            opacity: 1;
          }
          .bg-game-card:hover {
            background: white;
            opacity: ${this.props.playButton ? '.60' : '1'};
          }
          .bg-game-card-wrapper:hover {
            transform: translateY(-5px);
            transition: ${style.transition.default};
            border: 1px solid rgb(121, 182, 250);
          }
          .bg-game-card-wrapper .play-game-button {
            visibility: hidden;
            position: absolute;
            left: calc(50% - ${Math.floor(playButtonSize / 2)}px);
            top: ${mobile ? '45%' : '50%'};
            transform: translateY(-75%);
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 1);
            width: ${playButtonSize}px;
            height: ${playButtonSize}px;
            line-height: ${playButtonSize}px;
            font-size: 0.70em;
            border-radius: 50%;
            border: 1px solid rgb(121, 182, 250);
            text-transform: uppercase;
            font-weight: 600;
          }
          .bg-game-card-wrapper:hover .play-game-button {
            visibility: visible;
          }
          .bg-game-card-img {
            width: 100%;
          }
          h6, p {
            text-align: center;
          }
          p {
            font-size: .8em;
            margin: 0;
          }
        `}</style>
        <div className="bg-game-card" onClick={this.props.onClick}>
          <img className="bg-game-card-img" src={this.props.game.thumbnailImage} alt="game thumbnail" />
          {this.props.playButton ? <div className="play-game-button"><MdPlayArrow /><FormattedMessage id="global.play" /></div> : null}
          <h6>{this.props.game.name}</h6>
          <p>{this.props.game.description}</p>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BGGameCard;
