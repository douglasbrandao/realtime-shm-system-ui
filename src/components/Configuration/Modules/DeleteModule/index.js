import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';
import Row from './styles';
import Button from '../../../UI/Button';
import Modal from '../../../UI/Modal';
import { deleteModule } from '../../../../api/module';

export default function DeleteModule({
  moduleId,
  updateModulesList,
  updateSensorsList,
  updateStructuresList,
  toast,
}) {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const handleDeleteModule = async () => {
    await deleteModule(moduleId).then(() => {
      updateModulesList();
      updateSensorsList();
      updateStructuresList();
      hideModal();
      toast.error('Module removed');
    });
  };

  return (
    <>
      <button type="button" className="options-buttons" onClick={showModal}>
        <MdDelete />
      </button>

      <Modal header="Delete Module" show={modal} handleClose={hideModal}>
        <p>Are you sure that you want to perform this action?</p>
        <p>
          Be careful! All the structures and sensors attached to this module
          will be deleted as well.
        </p>
        <Row>
          <Button type="button" onClick={hideModal}>
            Cancel
          </Button>
          <Button type="button" onClick={() => handleDeleteModule()}>
            Confirm
          </Button>
        </Row>
      </Modal>
    </>
  );
}

DeleteModule.propTypes = {
  moduleId: PropTypes.string.isRequired,
  updateModulesList: PropTypes.func.isRequired,
  updateSensorsList: PropTypes.func.isRequired,
  updateStructuresList: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};
