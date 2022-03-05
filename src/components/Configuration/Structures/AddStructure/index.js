import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { MdAddCircle } from 'react-icons/md';
import PropTypes from 'prop-types';
import Row from './styles';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import Input from '../../../UI/Input';
import { addStructure } from '../../../../api/structure';

export default function AddStructure({
  updateStructuresList,
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

  const handleStructure = async (data) => {
    await addStructure(data).then(() => {
      updateStructuresList();
      hideModal();
      toast.success('Structure added');
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

      <Modal show={modal} handleClose={hideModal} header="Add Structure">
        <Formik
          initialValues={{
            name: '',
            moduleId: '',
            initialFrequency: '',
            finalFrequency: '',
            increments: '',
            voltage: '',
          }}
          onSubmit={(values) => handleStructure(values)}
        >
          <Form>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <label htmlFor="moduleId">Module</label>
            <Field name="moduleId" type="text" as="select">
              <option value="" label="Select an option" disabled />
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
            <Button type="submit">Save Structure</Button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

AddStructure.propTypes = {
  updateStructuresList: PropTypes.func.isRequired,
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
