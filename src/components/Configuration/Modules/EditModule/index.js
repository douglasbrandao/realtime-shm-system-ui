import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { MdModeEdit } from 'react-icons/md';
import PropTypes from 'prop-types';
import Button from '../../../UI/Button';
import Modal from '../../../UI/Modal';
import Input from '../../../UI/Input';
import { updateModule } from '../../../../api/module';

export default function EditModule({ module, updateModulesList, toast }) {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const handleEditModule = async (data) => {
    await updateModule(module._id, data).then(async () => {
      updateModulesList();
      hideModal();
      toast.success('Module updated');
    });
  };

  return (
    <>
      <button type="button" className="options-buttons" onClick={showModal}>
        <MdModeEdit />
      </button>

      <Modal header="Edit Module" show={modal} handleClose={hideModal}>
        <Formik
          enableReinitialize
          initialValues={{
            name: module.name,
            ipAddress: module.ipAddress,
            port: module.port,
          }}
          validateOnChange
          onSubmit={(values) => {
            handleEditModule(values);
          }}
        >
          <Form>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" component={Input} />
            <label htmlFor="ipAddress">IP Address</label>
            <Field name="ipAddress" type="text" component={Input} />
            <label htmlFor="port">Port</label>
            <Field name="port" type="text" component={Input} />
            <Button type="submit">Update Module</Button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

EditModule.propTypes = {
  module: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ipAddress: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,
  }).isRequired,
  updateModulesList: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};
