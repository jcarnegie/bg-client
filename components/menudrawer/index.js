import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";

import ActiveLink from "@/components/activelink";
import Language from "@/components/language";
import Balance from "@/components/balance";
import User from "@/components/user";

import style from "@/shared/constants/style";


class MenuDrawer extends Component {
  static defaultProps = {
    show: false,
  }

  static propTypes = {
    show: PropTypes.bool,
  }

  render() {
    return (
      <div className="menu-drawer">
        <style jsx>{`
          .menu-drawer {
            min-width: ${this.props.show ? "50%" : "0"};
            max-width: ${this.props.show ? "75%" : "0"};
            visibility: ${this.props.show ? "visible" : "hidden"};
            background: ${style.colors.secondary};
            position: fixed;
            top: ${style.header.height}; /* top border width */
            bottom: 0;
            right: 0;
            padding: 0;
            transition: all 0.2s ease;
            z-index: 1030; /* Bootstrap modal is 1040, 1050 respectively */
        }
          .links a, .links .navigation-link {
            display: block;
            width: 100%;
            text-decoration: none;
            color: white;
          }
        `}</style>

        <User />

        <div className="links">
          <ActiveLink
            href="/inventory"
            style={{
              textDecoration: "none",
              color: "white",
              display: "block",
              padding: "20px 27px",
              textTransform: "uppercase",
              fontWeight: "100",
              fontSize: "14px",
            }}
            activeStyle={{background: "rgba(255, 255, 255, .15)"}}
          >
            <FormattedMessage id="components.menu.inventory" />
          </ActiveLink>
        </div>

        <Balance />
        <Language />

      </div>
    );
  }
}

export default MenuDrawer;
