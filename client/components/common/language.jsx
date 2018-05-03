import "./language.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Image, MenuItem, Nav, NavDropdown} from "react-bootstrap";
import {defaultLanguage, enabledLanguages} from "../../../shared/constants/language";
import {localization} from "../../../shared/intl/setup";
import {SWITCH_LANGUAGE, UPDATE_USER} from "../../../shared/constants/actions";


@connect(
  state => ({
    user: state.user
  })
)
export default class Language extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func
  };

  onSelect(language) {
    this.props.dispatch({
      type: SWITCH_LANGUAGE,
      ...localization[language]
    });
    this.props.dispatch({
      type: UPDATE_USER,
      payload: {
        language
      }
    });
    document.documentElement.setAttribute("lang", language);
  }

  render() {
    const {user} = this.props;

    const language = !user.isLoading && user.success ? user.data.language : defaultLanguage;

    return (
      <Nav>
        <NavDropdown title={<Image src={`/images/language/${language}.png`} />} id="lang_menu">
          {enabledLanguages.map(language =>
            (<MenuItem key={language} eventKey={language} onSelect={::this.onSelect}>
              <Image src={`/images/language/${language}.png`} />
            </MenuItem>)
          )}
        </NavDropdown>
      </Nav>
    );
  }
}
