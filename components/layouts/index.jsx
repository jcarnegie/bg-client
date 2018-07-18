import PropTypes from 'prop-types';

import style from '@/shared/constants/style';
import DesktopLayout from './desktop';
import MobileLayout from './mobile';


function Content({ padding = '20px', children = null }) {
  return (
    <div className="bg-content">
      <style jsx>{`
        .bg-content {
          padding: ${padding};
          background-color: ${style.colors.background};
        }
      `}</style>
      {children}
    </div>
  );
}

Content.propTypes = {
  padding: PropTypes.string,
  children: PropTypes.any,
};

function DesktopContent(props) {
  return (<Content {...props} padding="40px 8%" />);
}
function MobileContent(props) {
  return (<Content {...props} padding="4%" />);
}

export {
  DesktopLayout,
  MobileLayout,
  Content,
  DesktopContent,
  MobileContent,
};
