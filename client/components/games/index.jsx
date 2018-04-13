import React, {Component} from "react";
import Init from "../common/init";


export default class Games extends Component {
  render() {
    return (
      <div>
        <Init />
        <h2>Games</h2>
        <iframe src="https://bitguild.info/" />
      </div>
    );
  }
}
