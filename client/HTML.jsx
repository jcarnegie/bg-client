import React from "react";
import PropTypes from "prop-types";


export default class HTML extends React.Component {
  static propTypes = {
    initialMarkup: PropTypes.string,
    initialState: PropTypes.object
  };

  renderScripts() {
    if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
      return (
        <div>
          <script src="https://unpkg.com/react@16.3.2/umd/react.production.min.js" type="text/javascript" crossOrigin="anonymous" />
          <script src="https://unpkg.com/react-dom@16.3.2/umd/react-dom.production.min.js" type="text/javascript" crossOrigin="anonymous" />
        </div>
      );
    } else {
      return null;
    }
  }

  renderChat() {
    if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
      return (
        <div>
          <div id="sb_widget" />
          <script src="https://cdn.jsdelivr.net/npm/sendbird@3.0.60/SendBird.min.js" type="text/javascript" crossOrigin="anonymous" />
          <script src="/js/widget.SendBird.js" type="text/javascript" crossOrigin="anonymous" />
          <script dangerouslySetInnerHTML={{
            __html: `
              sbWidget.start('BB1E0777-B8CE-44DF-BA37-63EBA2E858F1');
            `
          }} />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="BitGuild is a decentralized gaming platform designed to eliminate burdensome fees, fraud, and regulations while creating a tokenized gaming marketplace." />
          <meta name="keywords" content="keywords" />
          <meta name="robots" content="all" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="shortcut icon" href={"/favicon.ico"} />
          <link href={"/bundle/client.css"} rel="stylesheet" />
          <link rel="stylesheet" href="https://use.typekit.net/woi6egk.css" />
          <title>BitGuild Crowdsale Whitelisting</title>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.initialMarkup}} />
          <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`}} />
          {this.renderScripts()}
          <script src={"/bundle/client.js"} type="text/javascript" crossOrigin="anonymous" />
          {this.renderChat()}
        </body>
      </html>
    );
  }
}
