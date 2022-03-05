/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { MdAddCircle } from 'react-icons/md';
import PropTypes from 'prop-types';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import Row from './styles';
import { addAnalysis } from '../../../../api/analysis';

export default function AddAnalysis({
  updateAnalysesList,
  updateModulesList,
  updateSensorsList,
  updateStructuresList,
  modules,
  sensors,
  structures,
  toast,
}) {
  const [modal, setModal] = useState(false);
  const [sweepType, setSweepType] = useState(null);
  const [minutesBetweenAnalysis, setMinutesBetweenAnalysis] = useState(5);

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

  const handleAnalysis = async (data) => {
    await addAnalysis(data)
      .then(() => {
        updateAnalysesList();
        hideModal();
        toast.success('Analysis added');
      })
      .catch(({ response }) => {
        hideModal();
        toast.error(response.data.error);
      });
  };

  const handleSweepType = (e) => {
    const { value } = e.target;
    setSweepType(value);
  };

  const handleMinutesBetweenAnalysis = (e) => {
    const { value } = e.target;
    setMinutesBetweenAnalysis(value);
  };

  return (
    <>
      <button type="button" onClick={showModal}>
        <MdAddCircle />
      </button>

      <Modal show={modal} handleClose={hideModal} header="Add Analysis">
        <Formik
          initialValues={{
            name: '',
            module: '',
            structure: '',
            baseline: '',
            sensors: '',
            sweep: '',
            continuousConfig: {
              interval: 5,
              numberAnalyses: 1,
            },
          }}
          onSubmit={(values) => {
            const updatedValues = { ...values };

            updatedValues.baseline = {
              sensorId: values.baseline,
            };
            updatedValues.sensors = [];

            values.sensors.forEach((sensor) => {
              updatedValues.sensors.push({ sensorId: sensor });
            });

            if (sweepType === 'single') {
              delete updatedValues.continuousConfig;
            }

            handleAnalysis(updatedValues);
          }}
        >
          {({ handleChange }) => (
            <Form>
              <Row>
                <div>
                  <label htmlFor="name">
                    Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                  />
                  <label htmlFor="module">
                    Module
                  </label>
                  <Field
                    name="module"
                    type="text"
                    onChange={(e) => {
                      handleChange(e);
                      handleChangeDropDown(e);
                    }}
                    as="select"
                  >
                    <option value="" label="Select an option" />
                    {modulesList}
                  </Field>
                </div>
              </Row>
              <Row>
                <div>
                  <label htmlFor="structure">
                    Structure
                  </label>
                  <Field name="structure" type="text" as="select" disabled={!(structuresList.length > 0)}>
                    <option value="" label="Select an option" />
                    {structuresList}
                  </Field>
                </div>
              </Row>
              <Row>
                <div>
                  <label htmlFor="baseline">
                    Baseline Sensor
                  </label>
                  <Field name="baseline" type="text" as="select" disabled={!(sensorsList.length > 0)}>
                    <option value="" label="Select an option" />
                    {sensorsList}
                  </Field>
                </div>
              </Row>
              <Row>
                <div>
                  <label htmlFor="sensors">
                    Analysis sensors
                  </label>
                  <Field name="sensors" type="text" as="select" multiple disabled={!(sensorsList.length > 0)}>
                    <option value="" label="Select an option" />
                    {sensorsList}
                  </Field>
                </div>
              </Row>
              <Row>
                <label>Sweep Settings</label>
                <div
                  onChange={(e) => {
                    handleChange(e);
                    handleSweepType(e);
                  }}
                >
                  <fieldset style={{ marginBottom: '0.5rem' }}>
                    <Field type="radio" name="sweep" value="single" />
                    <label htmlFor="sweep">Single</label>
                    <Field type="radio" name="sweep" value="continuous" />
                    <label htmlFor="sweep">Continuous</label>
                  </fieldset>
                </div>
              </Row>

              {sweepType && sweepType === 'continuous' ? (
                <Row>
                  <label htmlFor="continuousConfig.interval">
                    Interval between analysis:
                    {minutesBetweenAnalysis
                        && ` ${minutesBetweenAnalysis} minutes`}
                  </label>
                  <Field
                    type="range"
                    name="continuousConfig.interval"
                    min="1"
                    max="30"
                    step="1"
                    onChange={(e) => {
                      handleChange(e);
                      handleMinutesBetweenAnalysis(e);
                    }}
                  />
                  <label htmlFor="continuousConfig.numberAnalyses">
                    Number of Analysis
                  </label>
                  <Field
                    name="continuousConfig.numberAnalyses"
                    type="number"
                    min="1"
                    max="60"
                  />
                </Row>
              ) : null}
              <Button type="submit">Add Analysis</Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
