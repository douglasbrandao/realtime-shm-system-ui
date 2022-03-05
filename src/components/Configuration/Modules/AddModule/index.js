import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { MdAddCircle } from 'react-icons/md';
import PropTypes from 'prop-types';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import Input from '../../../UI/Input';
import { addModule } from '../../../../api/module';

function AddModule({ updateModulesList, toast }) {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const handleModule = async (data) => {
    await addModule(data).then(async () => {
      updateModulesList();
      hideModal();
      toast.success('Module added');
    });
  };

  return (
    <>
      <button type="button" onClick={showModal}>
        <MdAddCircle />
      </button>

      <Modal header="Add Module" show={modal} handleClose={hideModal}>
        <Formik
          initialValues={{ name: '', ipAddress: '', port: '' }}
          onSubmit={(values) => handleModule(values)}
        >
          <Form>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" component={Input} />
            <label htmlFor="ipAddress">IP Address</label>
            <Field name="ipAddress" type="text" component={Input} />
            <label htmlFor="port">Port</label>
            <Field name="port" type="text" component={Input} />
            <Button type="submit">Save Module</Button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

AddModule.propTypes = {
  updateModulesList: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

export default AddModule;
