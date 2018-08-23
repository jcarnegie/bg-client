import PropTypes from 'prop-types';
import Responsive from 'react-responsive';

import style from '@/shared/constants/style';

function Desktop(props) {
  return (
    <Responsive {...props} minWidth={style.desktop.minWidth}>
      <style jsx global>{`
        body {
          font-size: 18px;
        }
      `}</style>
      {props.children}
    </Responsive>
  );
}

Desktop.propTypes = {
  children: PropTypes.any,
};

export default Desktop;
