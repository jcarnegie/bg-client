import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';


export default function LoginToWeb3() {
  return (
    <div>
      <h2><FormattedMessage id="modals.metamask-login.title" /></h2>
      <br />
      <p><FormattedMessage id="modals.metamask-login.p1" /></p>
      <p className="note">
        <FormattedHTMLMessage id="modals.metamask-login.faq" />
      </p>
    </div>
  );
}
