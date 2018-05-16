/* eslint-disable react/react-in-jsx-scope */
import Document, {Head, Main, NextScript} from "next/document";
import flush from "styled-jsx/server";

export default class BGDocument extends Document {
  static getInitialProps({renderPage}) {
    const {html, head, errorHtml, chunks} = renderPage();
    const styles = flush();
    return {html, head, errorHtml, chunks, styles};
  }
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="BitGuild is a decentralized gaming platform designed to eliminate burdensome fees, fraud, and regulations while creating a tokenized gaming marketplace." />
          <meta name="keywords" content="keywords" />
          <meta name="robots" content="all" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <title>BitGuild</title>
          <link rel="shortcut icon" href={"/favicon.png"} />
          <link rel="stylesheet" href="https://use.typekit.net/woi6egk.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />

          {this.props.styles}

          <style jsx global>{`
            .no-gutter {
              padding-right: 0;
              padding-left: 0;
            }
            .no-select{
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -o-user-select: none;
              user-select: none;
            }
          `}</style>
          <style global jsx>{`
            body {
              font-family: "futura-pt", futura, "Myriad Pro", "Proxima Nova", sans-serif;
              color: #130029;
            }
            h2 {
              font-size: 24px;
            }
            a {
              color: #314B88;
            }
            a:hover {
              color: #536EAD;
            }
            .gap {
              padding-left: 90px;
              padding-right: 90px;
            }
            .grap {
              position: relative;
              float: left;
              width: calc(100vw - 285px);
              min-height: calc(100vh - 62px);
            }
          `}</style>
          <style jsx global>{`
            .modal.in {
              display: flex !important;
            }
            .modal .modal-dialog {
              margin: auto;
            }
            .modal .modal-content {
              box-shadow: none;
              border: 0;
            }
            .modal .modal-content .modal-header button {
              opacity: 1;
            }
            .modal .modal-content .modal-header button span:first-child {
              background: url("/static/images/buttons/close/close.png");
              width: 16px;
              height: 16px;
              display: block;
              text-indent: 100%;
              overflow: hidden;
            }
            .modal .modal-content .modal-header button span:first-child:hover {
              background: url("/static/images/buttons/close/close_clicked.png");
            }
            .modal .modal-content .modal-body {
              padding: 50px 25px;
              min-height: 310px;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
            .modal .modal-content h2 {
              font-weight: 500;
              font-size: 35px;
              margin-top: 0;
            }
            .modal .modal-content p {
              font-size: 15px;
            }
            .modal .modal-content .note {
              font-weight: 400;
              font-size: 12px;
              margin-top: 15px;
              opacity: .5;
            }
            .modal .modal-content .note a {
              color: #130029;
              text-decoration: underline;
            }
            .modal-backdrop {
              background: linear-gradient(to bottom, #98B9E5 0%, #CBCAE1 100%);
            }
            .modal-backdrop.in {
              opacity: 1;
            }
            .modal-backdrop.semi {
              opacity: .9;
            }
            .register .dup-error {
              color: #d0021b;
            }
          `}</style>
          <style jsx global>{`
            form {
              width: 340px;
              margin: 0 auto;
            }
            form .form-group {
              text-align: left;
            }
            form .form-group .control-label {
              font-weight: 500;
              font-size: 11px;
              opacity: .35;
            }
            form .form-group .form-control[type=text],
            form .form-group .form-control[type=email],
            form .form-group .form-control[type=number] {
              font-weight: 500;
              font-size: 13px;
              box-shadow: none;
              border: none;
              border-bottom: 1px solid #130029;
              border-radius: 4px;
              background-color: #F3F4FA;
              padding: 10px 12px;
              height: 40px;
            }
            form .form-group .form-control[type=text][readonly],
            form .form-group .form-control[type=email][readonly],
            form .form-group .form-control[type=number][readonly] {
              background-color: #DFDFF0;
              border-bottom: 0;
              cursor: default;
            }
            form .form-group.has-error .control-label {
              opacity: 1;
              color: #D0021B;
            }
            form .form-group.has-error .form-control[type=text],
            form .form-group.has-error .form-control[type=email],
            form .form-group.has-error .form-control[type=number] {
              color: #0d0826;
              border-bottom: 1px solid #D0021B;
              background-color: #FBDFE4;
              opacity: .71;
            }
            form .btn {
              font-size: 14px;
              background-color: #314B88;
              color: #ffffff;
              border: 0;
              padding: 10px;
              border-radius: 2px;
            }
            form .btn:hover,
            form .btn:focus,
            form .btn:active,
            form .btn:focus:active {
              background-color: #536EAD;
              color: #ffffff;
              outline: 0;
              box-shadow: none;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
