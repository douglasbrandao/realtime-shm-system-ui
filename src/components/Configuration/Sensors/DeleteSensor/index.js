import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import Row from './styles';
import { deleteSensor } from '../../../../api/sensor';

export default function DeleteSensor({ updateSensorsList, sensorId, toast }) {
  const [modal, setModal] = useState(false);

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  const handleDeleteSensor = async () => {
    await deleteSensor(sensorId).then(() => {
      updateSensorsList();
      hideModal();
      toast.error('Sensor removed');
    });
  };

  return (
    <>
      <button type="button" className="options-buttons" onClick={showModal}>
        <MdDelete />
      </button>

      <Modal header="Delete Sensor" show={modal} handleClose={hideModal}>
        <p>Are you sure that you want to perform this action?</p>
        <Row>
          <Button type="button" onClick={hideModal}>
            Cancel
          </Button>
          <Button type="button" onClick={handleDeleteSensor}>
            Confirm
          </Button>
        </Row>
      </Modal>
    </>
  );
}

DeleteSensor.propTypes = {
  sensorId: PropTypes.string.isRequired,
  updateSensorsList: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};
