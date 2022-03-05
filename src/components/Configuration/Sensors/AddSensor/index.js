import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { MdAddCircle } from 'react-icons/md';
import PropTypes from 'prop-types';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import Input from '../../../UI/Input';
// import api from '../../../../services/api'
import { addSensor } from '../../../../api/sensor';

export default function AddSensor({
  updateSensorsList,
  modules,
  updateModulesList,
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
    await addSensor(data).then(() => {
      updateSensorsList();
      hideModal();
      toast.success('Sensor added');
    });
  };

  useEffect(() => {
    updateModulesList();
  }, []);

  const modulesList = modules.map(({ _id, name }) => (
    <option key={_id} value={_id} label={name} />
  ));

  return (
    <>
      <button type="button" onClick={showModal}>
        <MdAddCircle />
      </button>

      <Modal show={modal} handleClose={hideModal} header="Add Sensor">
        <Formik
          initialValues={{ module: '', name: '', pinNumber: '' }}
          onSubmit={(values) => handleSensor(values)}
        >
          <Form>
            <label htmlFor="module">Module</label>
            <Field name="module" type="text" as="select">
              <option value="" label="Select an option" disabled />
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

AddSensor.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      ip_address: PropTypes.string,
    }),
  ).isRequired,
  updateModulesList: PropTypes.func.isRequired,
  updateSensorsList: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};
