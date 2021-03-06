import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { Form, Button } from 'react-bootstrap';

export default function InstallWeb3() {
  return (
    <div>
      <h2><FormattedMessage id="modals.metamask-install.title" /></h2>
      <br />
      <p><FormattedMessage id="modals.metamask-install.p1" /></p>
      <p><FormattedMessage id="modals.metamask-install.p2" /></p>

      <br />

      <Form>
        <Button className="btn-block text-uppercase" href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
          <FormattedMessage id="buttons.install" />
        </Button>
      </Form>
      <p className="note">
        <FormattedHTMLMessage id="modals.metamask-install.faq" />
      </p>
    </div>
  );
}
