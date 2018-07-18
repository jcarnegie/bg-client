import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

function BGDesktopModal(props) {
  return (
    <Modal {...props}>
      {props.children}
    </Modal>
  );
}

BGDesktopModal.propTypes = {
  children: PropTypes.any,
};

export default BGDesktopModal;
