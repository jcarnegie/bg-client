import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {MenuItem, Nav, NavDropdown} from "react-bootstrap";
import {FormattedMessage, injectIntl} from "react-intl";
import {enabledLanguages} from "../../../shared/constants/language";
import {localization} from "../../../shared/intl/setup";
import {SWITCH_LANGUAGE} from "../../../shared/constants/actions";


@injectIntl
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
    document.documentElement.setAttribute("lang", language);
  }

  render() {
    return (
      <Nav>
        <NavDropdown title={<FormattedMessage id="components.switchLanguage" />} id="lang_menu">
          {enabledLanguages.map(language =>
            (<MenuItem key={language} eventKey={language} onSelect={::this.onSelect}>
              <FormattedMessage id={`components.language.${language}`} />
            </MenuItem>)
          )}
        </NavDropdown>
      </Nav>
    );
  }
}
