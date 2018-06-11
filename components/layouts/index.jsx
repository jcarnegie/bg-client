import style from "@/shared/constants/style";

import DesktopLayout from "./desktop";
import MobileLayout from "./mobile";

function Content({padding = "20px", children = null}) {
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

function DesktopContent(props) {
  return (<Content {...props} padding="20px 40px" />);
}
function MobileContent(props) {
  return (<Content {...props} padding="5px 20px" />);
}

export {
  DesktopLayout,
  MobileLayout,
  Content,
  DesktopContent,
  MobileContent,
};
