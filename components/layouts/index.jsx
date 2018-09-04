import PropTypes from 'prop-types';

import style from '@/shared/constants/style';
import DesktopLayout from './desktop';
import MobileLayout from './mobile';
import Main from './Main';


function Layout ({ children = null }) {
  return <div className="layout">{children}</div>;
}

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
  return (<Content {...props} padding="40px 10%" />);
}
function MobileContent(props) {
  return (<Content {...props} padding="4%" />);
}

Content.Desktop = DesktopContent;
Content.Mobile = MobileContent;

Layout.Content = Content;
Layout.Main = Main;
Layout.Desktop = DesktopLayout;
Layout.Mobile = MobileLayout;

export {
  Layout,
  DesktopLayout,
  MobileLayout,
  Content,
  DesktopContent,
  MobileContent,
};

export default Layout;
