import "./language.less";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Image, MenuItem, NavDropdown} from "react-bootstrap";
import {enabledLanguages} from "../../../shared/constants/language";
import {localization} from "../../../shared/intl/setup";
import {UPDATE_USER} from "../../../shared/constants/actions";
import {updateIntl} from "react-intl-redux";
import {injectIntl, intlShape} from "react-intl";


@injectIntl
@connect(
  state => ({
    user: state.user
  })
)
export default class Language extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    intl: intlShape
  };

  onSelect(language) {
    const {dispatch} = this.props;

    dispatch(updateIntl(localization[language]));
    dispatch({
      type: UPDATE_USER,
      payload: {
        language
      }
    });
    document.documentElement.setAttribute("lang", language);
  }

  render() {
    const {user, intl} = this.props;

    const language = !user.isLoading && user.success ? user.data.language : intl.locale;

    return (
      <NavDropdown title={<Image src={`/images/language/${language}.png`} />} className="lang-menu" id="lang-menu">
        {enabledLanguages.map(language =>
          (<MenuItem key={language} eventKey={language} onSelect={::this.onSelect}>
            <Image src={`/images/language/${language}.png`} />
          </MenuItem>)
        )}
      </NavDropdown>
    );
  }
}
