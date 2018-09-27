import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateIntl } from 'react-intl-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Image, MenuItem, DropdownButton } from 'react-bootstrap';
import { withRouter } from 'next/router';
import { path, pathOr, dissoc } from 'ramda';
import { MobileScreen, DesktopScreen } from 'react-responsive-redux';
import { enabledLanguages, enabledLanguagesNativeText } from '@/shared/constants/language';
import { localization } from '@/shared/intl/setup';
import {
  client,
  mutations,
} from '@/shared/utils/apollo';

const updateUser = (id, payload) => {
  const variables = { id, payload: dissoc('__typename', payload) };
  return client.mutate({
    mutation: mutations.updateUser,
    variables,
  });
};


@withRouter
@injectIntl
@connect()
class Language extends Component {
  static propTypes = {
    user: PropTypes.object,
    router: PropTypes.object,
    dispatch: PropTypes.func,
    intl: intlShape,
  };

  onSelect(language) {
    const { dispatch, intl, user, router } = this.props;
    const { route } = router;
    const refreshRoutes = ['/game', '/sandbox'];

    if (language !== path(['locale'], intl)) {
      document.documentElement.setAttribute('lang', language);
      dispatch(updateIntl(localization[language]));
      if (user) updateUser(user.id, { language });
    }

    if (refreshRoutes.includes(route)) window.location.reload();
  }

  renderLanguageMenuItems() {
    let dropDownLanguages = [];

    for (let i = 0; i < enabledLanguagesNativeText.length; i++) {
      dropDownLanguages.push(
        <MenuItem
          key={enabledLanguagesNativeText[i]}
          eventKey={ enabledLanguagesNativeText[i]}
          onSelect={() => { this.onSelect(enabledLanguages[i]); }}
        >
          {<div className="native-language"> {enabledLanguagesNativeText[i]} </div>}
        </MenuItem>
      );
    }
    return dropDownLanguages;
  }

  render() {
    const { intl } = this.props;

    return (
      <div className="lang-dropdown">
        <DesktopScreen>
          <style jsx global>{`
            /* Global to affect Bootstrap styles */
            .lang-menu {
              background: transparent !important; /* Bootstrap overrides*/
              border: 0;
            }

            .lang-menu .caret {
              color: white;
              transform: translate(0, 0) !important; /* Bootstrap overrides */
            }
            .lang-menu:hover .caret {
              color: white;
            }

            .lang-menu > a {
              line-height: 32px !important; /* Bootstrap overrides*/
            }

            .lang-dropdown {
              padding: 0 0 !important;
              display: flex;
              align-items: center;
            }

            .lang-dropdown,
            .lang-dropdown .dropdown,
            .lang-dropdown .dropdown .btn {
              height: 100%;
            }

            .lang-dropdown .dropdown .btn {
              padding: 15px;
            }

            .lang-dropdown .dropdown .btn img {
              transform: translateX(4px);
            }
            .lang-dropdown .dropdown .btn .caret {
              transform: translate(0, -2px);
            }

            .lang-dropdown .dropdown-menu {
              background-color: #BCC4DE;
              min-width: 0;
              margin-right: 10px;
              margin-top: 0;
              border-top-left-radius: 0;
              border-top-right-radius: 0;
            }

            .lang-dropdown .dropdown .dropdown-menu li a:focus,
            .lang-dropdown .dropdown .dropdown-menu li a:hover {
              background: #F7F7F7 !important;
            }

            .lang-menu img,
            .lang-dropdown .dropdown .dropdown-menu li a img {
              width: 25px;
            }

            .lang-dropdown .dropdown .dropdown-menu {
              min-width: 0;
              background-color: #FFFFFF;
            }

            .lang-dropdown > div > ul > li:nth-child(1) > a > img

            .lang-dropdown {
              line-height: 0;
              list-style-type: none;
              padding: 10px 15px;
            }

            .current-lang{
              color: white;
              padding-left: 12px;
              vertical-align: middle;
            }
          `}</style>
        </DesktopScreen>
        <MobileScreen>
          <style jsx global>{`
            .lang-menu,
            .lang-dropdown .dropdown .dropdown-menu,
            .lang-menu .dropdown-toggle {
              background: transparent !important; /* Bootstrap overrides */
              border: 0;
              box-shadow: none !important;
            }
            .lang-menu img,
            .lang-dropdown .dropdown .dropdown-menu li a img {
              width: 25px;
            }
            .lang-dropdown {
              padding: 0 7px;
            }
            .lang-dropdown .dropdown .btn .caret {
              color: white;
            }
            .lang-dropdown .dropdown .btn img,
            .lang-dropdown .dropdown .btn .caret {
              transform: translateX(8px);
            }
            .lang-dropdown .dropdown .dropdown-menu li a:focus,
            .lang-dropdown .dropdown .dropdown-menu li a:hover {
              background: rgba(255, 255, 255, 0.15) !important;
            }

            .current-lang {
              color: white;
              padding-left: 22px;
            }

            .native-language {
              color: white;
              font-size: 15px;
              margin-bottom: 10px;
            }
            .dropdown-menu {
              background-color: #BCC4DE;
              min-width: 0;
              margin-right: 10px;
              margin-top: 0;
              border-top-left-radius: 0;
              border-top-right-radius: 0;
              overflow-y: scroll !important;
              height: 150px !important;
            }
          `}</style>
        </MobileScreen>
        <DropdownButton
          title={
            <span>
              <Image src={'/static/images/language/globe.svg'} />
              <span className="current-lang">{pathOr('en', ['locale'], intl).toUpperCase()} </span>
            </span>
          }
          className="lang-menu" id="lang-menu"
        >
          {this.renderLanguageMenuItems()}
        </DropdownButton>
      </div>
    );
  }
}


export default Language;
