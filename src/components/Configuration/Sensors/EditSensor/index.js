import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { MdModeEdit } from 'react-icons/md';
import PropTypes from 'prop-types';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import Input from '../../../UI/Input';
import { updateSensor } from '../../../../api/sensor';

export default function EditSensor({
  updateSensorsList,
  updateModulesList,
  modules,
  sensor,
  toast,
}) {
  const [modal, setModal] = useState(false);

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  const handleSensor = async (data) => {
    await updateSensor(data, sensor._id).then(() => {
      updateSensorsList();
      hideModal();
      toast.success('Sensor updated');
    });
  };

  useEffect(() => {
    updateModulesList();
  }, []);

  const modulesList = modules.map((module) => (
    <option key={module._id} value={module._id} label={module.name} />
  ));

  return (
    <>
      <button type="button" className="options-buttons" onClick={showModal}>
        <MdModeEdit />
      </button>

      <Modal show={modal} handleClose={hideModal} header="Edit Sensor">
        <Formik
          initialValues={{
            module: sensor.module._id,
            name: sensor.name,
            pinNumber: sensor.pinNumber,
          }}
          onSubmit={(values) => handleSensor(values)}
        >
          <Form>
            <label htmlFor="module">Module</label>
            <Field name="module" type="text" as="select">
              {modulesList}
            </Field>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" component={Input} />
            <label htmlFor="pinNumber">Pin</label>
            <Field name="pinNumber" type="text" component={Input} />
            <Button type="submit">Save Sensor</Button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

EditSensor.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      ipAddress: PropTypes.string,
      port: PropTypes.string,
    }),
  ).isRequired,
  sensor: PropTypes.shape({
    _id: PropTypes.string,
    module: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
    name: PropTypes.string,
    pinNumber: PropTypes.number,
    status: PropTypes.number,
  }).isRequired,
  updateModulesList: PropTypes.func.isRequired,
  updateSensorsList: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};
