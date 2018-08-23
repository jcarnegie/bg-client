import React from 'react';
import PropTypes from 'prop-types';

import BGIcon from '@/components/bgicon';

class GameIcon extends React.PureComponent {
  static propTypes = {
    game: PropTypes.shape({
      slug: PropTypes.string,
    }),
    width: PropTypes.string,
  }

  static defaultProps = {
    game: null,
    width: '75px',
  }

  render() {
    const { game } = this.props;
    return (
      <BGIcon src={game ? `/static/images/games/${game.slug}/icon.png` : null} {...this.props} />
    );
  }
}

export default GameIcon;
