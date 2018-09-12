import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';


export default function NetworkNotSupported() {
  return (
    <div>
      <h2><FormattedMessage id="modals.metamask-network.title" /></h2>
      <br />
      <p><FormattedMessage id="modals.metamask-network.p1" /></p>
      <p className="note">
        <FormattedHTMLMessage id="modals.metamask-network.faq" />
      </p>
    </div>
  );
};
