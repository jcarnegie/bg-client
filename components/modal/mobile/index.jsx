import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";

function BGMobileModal(props) {
  return (
    <Modal {...props}>
      <style jsx>{`
        :global(.modal-dialog) {
          max-width: 95% !important;
          margin-top: 70px !important;
        }
      `}</style>
      {props.children}
    </Modal>
  );
}

BGMobileModal.propTypes = {
  children: PropTypes.any,
};

export default BGMobileModal;
