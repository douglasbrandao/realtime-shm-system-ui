import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import Wrapper from './styles';

function Modal({
  header, handleClose, show, children,
}) {
  let modal = null;

  if (show) {
    modal = (
      <Wrapper>
        <div className="modal-content">
          <div className="modal-header">
            <h3>{header}</h3>
            <button type="button" onClick={handleClose}>
              <MdClose />
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </Wrapper>
    );
  }

  return modal;
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
