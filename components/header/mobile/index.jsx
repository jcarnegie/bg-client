import React, {Component} from "react";
import Link from "next/link";

import style from "@/shared/constants/style";
import MobileMenu from "@/components/mobilemenu";


export default class Header extends Component {
  mobileLogo() {
    return (
      <div className="mobile-logo">
        <style jsx>{`
          .mobile-logo {
            height: 100%;
            display: flex;
            align-items: center;
            float: left;
          }
          .logo-img {
            width: 24px;
          }
          .logo-img {
            margin: 0 0 0 15px;
          }
        `}</style>
        <Link href="/">
          <img src="/static/images/logo-small.png" className="logo-img no-select" />
        </Link>
      </div>
    );
  }

  render() {
    return (
      <header className="header">
        <style jsx>{`
          .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 1060; /* Bootstrap modal is 1040, 1050 - MenuDrawer is 1030 */
            background-color: ${style.colors.secondary};
            height: ${style.header.height};
          }
          .mobile-settings {
            position: absolute;
            top: 0;
            right: 0;
            height: 62px;
          }
        `}</style>

        {::this.mobileLogo()}

        <div className="mobile-settings">
          <MobileMenu />
        </div>
      </header>
    );
  }
}
