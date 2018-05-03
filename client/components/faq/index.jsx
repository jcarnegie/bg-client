import React, {Component} from "react";
import {FormattedMessage} from "react-intl";


export default class Faq extends Component {
  render() {
    return (
      <div>
        <h2>
          <FormattedMessage id="pages.faq.title" />
        </h2>
        <dl>
          <dt>Q</dt>
          <dd>A</dd>
        </dl>
      </div>
    );
  }
}
