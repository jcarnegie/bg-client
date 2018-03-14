import React, {Component} from "react";
import {Modal} from "react-bootstrap";


export default class MetaMaskPopup extends Component {
  render() {
    return (
      <Modal show={typeof window !== "undefined" && !window.web3}>
        <Modal.Body>
          You have to install <a href="https://metamask.io/" target="_blank">MetaMask</a> to use this site.
        </Modal.Body>
      </Modal>
    );
  }
}
