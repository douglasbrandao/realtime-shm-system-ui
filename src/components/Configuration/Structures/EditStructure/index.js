import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { MdModeEdit } from 'react-icons/md';
import PropTypes from 'prop-types';
import Row from './styles';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import Input from '../../../UI/Input';
import { updateStructure } from '../../../../api/structure';

export default function EditStructure({
  updateStructuresList,
  structure,
  updateModulesList,
  modules,
  toast,
}) {
  const [modal, setModal] = useState(false);

  function showModal() {
    setModal(true);
  }

  function hideModal() {
    setModal(false);
  }

  const handleEditStructure = async (data) => {
    await updateStructure(structure._id, data).then(() => {
      updateStructuresList();
      hideModal();
      toast.success('Structure updated');
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

      <Modal show={modal} handleClose={hideModal} header="Edit Structure">
        <Formik
          initialValues={{
            name: structure.name,
            moduleId: structure.moduleId,
            initialFrequency: structure.initialFrequency,
            finalFrequency: structure.finalFrequency,
            increments: structure.increments,
            voltage: structure.voltage,
          }}
          onSubmit={(values) => handleEditStructure(values)}
        >
          <Form>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <label htmlFor="moduleId">Module</label>
            <Field name="moduleId" type="text" as="select">
              {modulesList}
            </Field>
            <Row>
              <div>
                <label htmlFor="initialFrequency">
                  Initial Frequency (KHz)
                </label>
                <Field name="initialFrequency" type="text" component={Input} />
              </div>
              <div>
                <label htmlFor="increments">Increments</label>
                <Field name="increments" type="text" component={Input} />
              </div>
            </Row>
            <Row>
              <div>
                <label htmlFor="finalFrequency">Final Frequency (KHz)</label>
                <Field name="finalFrequency" type="text" component={Input} />
              </div>
              <div>
                <label htmlFor="voltage">Voltage (V)</label>
                <Field name="voltage" type="text" as="select">
                  <option value="" label="Select an option" disabled />
                  <option value="0" label="2V" />
                  <option value="1" label="200mV" />
                  <option value="2" label="400mV" />
                  <option value="3" label="1V" />
                </Field>
              </div>
            </Row>
            <Button type="submit">Update Structure</Button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

EditStructure.propTypes = {
  updateStructuresList: PropTypes.func.isRequired,
  structure: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    moduleId: PropTypes.string.isRequired,
    initialFrequency: PropTypes.number.isRequired,
    finalFrequency: PropTypes.number.isRequired,
    increments: PropTypes.number.isRequired,
    voltage: PropTypes.number.isRequired,
  }).isRequired,
  updateModulesList: PropTypes.func.isRequired,
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      ipAddress: PropTypes.string,
      port: PropTypes.string,
    }),
  ).isRequired,
  toast: PropTypes.func.isRequired,
};
