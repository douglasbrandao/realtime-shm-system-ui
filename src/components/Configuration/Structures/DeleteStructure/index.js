import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import Row from './styles';
import { deleteStructure } from '../../../../api/structure';

export default function DeleteStructure({
  structureId,
  updateStructuresList,
  toast,
}) {
  const [modal, setModal] = useState(false);

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  const handleDeleteStructure = async () => {
    await deleteStructure(structureId).then(() => {
      updateStructuresList();
      hideModal();
      toast.error('Structure removed');
    });
  };

  return (
    <>
      <button type="button" className="options-buttons" onClick={showModal}>
        <MdDelete />
      </button>
      <Modal header="Delete Structure" show={modal} handleClose={hideModal}>
        <p>Are you sure that you want to perform this action?</p>
        <Row>
          <Button type="button" onClick={hideModal}>
            Cancel
          </Button>
          <Button type="button" onClick={handleDeleteStructure}>
            Confirm
          </Button>
        </Row>
      </Modal>
    </>
  );
}

DeleteStructure.propTypes = {
  structureId: PropTypes.string.isRequired,
  updateStructuresList: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};
