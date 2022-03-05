import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import { Row } from './styles';
import { deleteBaseline } from '../../../../api/baseline';

export default function DeleteBaseline({
  baselineId,
  updateBaselinesList,
  toast,
}) {
  const [modal, setModal] = useState(false);

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  const handleDeleteBaseline = async () => {
    await deleteBaseline(baselineId).then(() => {
      updateBaselinesList();
      hideModal();
      toast.error('Baseline removed');
    });
  };

  return (
    <>
      <button type="button" className="options-buttons" onClick={showModal}>
        <MdDelete />
      </button>

      <Modal header="Delete Baseline" show={modal} handleClose={hideModal}>
        <p>Are you sure that you want to perform this action?</p>
        <Row>
          <Button type="button" onClick={hideModal}>
            Cancel
          </Button>
          <Button type="button" onClick={() => handleDeleteBaseline()}>
            Confirm
          </Button>
        </Row>
      </Modal>
    </>
  );
}

DeleteBaseline.propTypes = {
  baselineId: PropTypes.string.isRequired,
  updateBaselinesList: PropTypes.func.isRequired,
  toast: PropTypes.func,
};
