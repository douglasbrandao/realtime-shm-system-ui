import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { MdAddCircle } from 'react-icons/md';
import PropTypes from 'prop-types';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import Row from './styles';
import { addBaseline } from '../../../../api/baseline';

export default function AddBaseline({
  updateBaselinesList,
  updateModulesList,
  updateSensorsList,
  updateStructuresList,
  modules,
  sensors,
  structures,
  toast,
}) {
  const [modal, setModal] = useState(false);

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  useEffect(() => {
    updateModulesList();
  }, []);

  const handleChangeDropDown = (e) => {
    const { value } = e.target;
    updateStructuresList(value);
    updateSensorsList(value);
  };

  const modulesList = modules.map(({ _id, name }) => (
    <option key={_id} value={_id} label={name} />
  ));

  const sensorsList = sensors.map(({ _id, name }) => (
    <option key={_id} value={_id} label={name} />
  ));

  const structuresList = structures.map(({ _id, name }) => (
    <option key={_id} value={_id} label={name} />
  ));

  const handleBaseline = async (data) => {
    await addBaseline(data)
      .then(() => {
        updateBaselinesList();
        hideModal();
        toast.success('Baseline added');
      })
      .catch(
        ({
          response: {
            data: { error },
          },
        }) => {
          hideModal();
          toast.error(error);
        },
      );
  };

  return (
    <>
      <button type="button" onClick={showModal}>
        <MdAddCircle />
      </button>

      <Modal show={modal} handleClose={hideModal} header="Add Baseline">
        <Formik
          initialValues={{ module: '', structure: '', sensor: '' }}
          onSubmit={(values) => handleBaseline(values)}
        >
          {({ handleChange }) => (
            <Form>
              <Row>
                <div>
                  <label htmlFor="module">Module</label>
                  <Field
                    name="module"
                    onChange={(e) => {
                      handleChange(e);
                      handleChangeDropDown(e);
                    }}
                    as="select"
                  >
                    <option value="" label="Select an option" disabled />
                    {modulesList}
                  </Field>
                </div>
              </Row>
              <Row>
                <div>
                  <label htmlFor="structure">Structure</label>
                  <Field name="structure" type="text" as="select">
                    <option value="" label="Select an option" disabled />
                    {structuresList}
                  </Field>
                </div>
              </Row>
              <Row>
                <div>
                  <label htmlFor="sensor">Sensor</label>
                  <Field name="sensor" type="text" as="select">
                    <option value="" label="Select an option" disabled />
                    {sensorsList}
                  </Field>
                </div>
              </Row>
              <Button type="submit">Add Baseline</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

AddBaseline.propTypes = {
  updateStructuresList: PropTypes.func.isRequired,
  updateModulesList: PropTypes.func.isRequired,
  updateSensorsList: PropTypes.func.isRequired,
  updateBaselinesList: PropTypes.func.isRequired,
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      ipAddress: PropTypes.string,
      port: PropTypes.string,
    }),
  ).isRequired,
  sensors: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      moduleId: PropTypes.string,
      name: PropTypes.string,
      pinNumber: PropTypes.number,
    }),
  ).isRequired,
  structures: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      moduleId: PropTypes.string,
      name: PropTypes.string,
      initialFrequency: PropTypes.number,
      finalFrequency: PropTypes.number,
      increments: PropTypes.number,
      voltage: PropTypes.number,
    }),
  ).isRequired,
  toast: PropTypes.func.isRequired,
};
