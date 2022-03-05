import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Dashboard from '../index';
import Container from './styles';
import {
  AddModule,
  DeleteModule,
  EditModule,
} from '../../../components/Configuration/Modules';
import {
  AddSensor,
  DeleteSensor,
  EditSensor,
} from '../../../components/Configuration/Sensors';
import {
  AddStructure,
  DeleteStructure,
  EditStructure,
} from '../../../components/Configuration/Structures';
import Table from '../../../components/UI/Table';
import convertValueVoltage from '../../../utils/convertValueVoltage';
import useIsMounted from '../../../hooks/useIsMounted';
import Loading from '../../../components/UI/Loading';
import { getModulesByUser } from '../../../api/module';
import { getSensorsByUser } from '../../../api/sensor';
import { getStructuresByUser } from '../../../api/structure';

function Configuration() {
  const [modules, setModules] = useState([]);
  const [structures, setStructures] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [loadingSensors, setLoadingSensors] = useState(true);
  const [loadingStructures, setLoadingStructures] = useState(true);
  const isMounted = useIsMounted();

  const updateModulesList = async () => {
    await getModulesByUser().then(({ data }) => {
      setModules(data);
      setLoadingModules(false);
    });
  };

  const updateSensorsList = async () => {
    await getSensorsByUser().then(({ data }) => {
      setSensors(data);
      setLoadingSensors(false);
    });
  };

  const updateStructuresList = async () => {
    await getStructuresByUser().then(({ data }) => {
      setStructures(data);
      setLoadingStructures(false);
    });
  };

  useEffect(() => {
    if (!isMounted) {
      updateModulesList();
      updateSensorsList();
      updateStructuresList();
    }
  }, []);

  /*
  Table Data
  */

  let modulesList;
  let sensorsList;
  let structuresList;

  if (loadingModules) {
    modulesList = (
      <thead>
        <tr>
          <th>
            <Loading />
          </th>
        </tr>
      </thead>
    );
  } else if (modules.length === 0) {
    modulesList = (
      <tbody>
        <tr>
          <td>
            <p>There are no modules added so far.</p>
          </td>
        </tr>
      </tbody>
    );
  } else {
    modulesList = (
      <>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module._id}>
              <td data-label="Name">{module.name}</td>
              <td data-label="Address">
                {module.ipAddress}
                :
                {module.port}
              </td>
              <td data-label="Options" className="options-icons">
                <EditModule
                  updateModulesList={updateModulesList}
                  module={module}
                  toast={toast}
                />
                <DeleteModule
                  updateModulesList={updateModulesList}
                  updateSensorsList={updateSensorsList}
                  updateStructuresList={updateStructuresList}
                  moduleId={module._id}
                  toast={toast}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }

  if (loadingSensors) {
    sensorsList = (
      <thead>
        <tr>
          <th>
            <Loading />
          </th>
        </tr>
      </thead>
    );
  } else if (sensors.length === 0) {
    sensorsList = (
      <tbody>
        <tr>
          <td>
            <p>There are no sensors added so far.</p>
          </td>
        </tr>
      </tbody>
    );
  } else {
    sensorsList = (
      <>
        <thead>
          <tr>
            <th>Module</th>
            <th>Name</th>
            <th>Pin</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor._id}>
              <td data-label="Module">{sensor.module.name}</td>
              <td data-label="Sensor">{sensor.name}</td>
              <td data-label="Pin">{sensor.pinNumber}</td>
              <td data-label="Options" className="options-icons">
                <EditSensor
                  updateSensorsList={updateSensorsList}
                  updateModulesList={updateModulesList}
                  modules={modules}
                  sensor={sensor}
                  toast={toast}
                />
                <DeleteSensor
                  updateSensorsList={updateSensorsList}
                  sensorId={sensor._id}
                  toast={toast}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }

  if (loadingStructures) {
    structuresList = (
      <thead>
        <tr>
          <th>
            <Loading />
          </th>
        </tr>
      </thead>
    );
  } else if (structures.length === 0) {
    structuresList = (
      <tbody>
        <tr>
          <td>
            <p>There are no structures added so far.</p>
          </td>
        </tr>
      </tbody>
    );
  } else {
    structuresList = (
      <>
        <thead>
          <tr>
            <th>Name</th>
            <th>Initial Frequency</th>
            <th>Final Frequency</th>
            <th>Increments</th>
            <th>Voltage</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {
           structures.map((structure) => (
             <tr key={structure._id}>
               <td data-label="Name">{structure.name}</td>
               <td data-label="Initial Frequency">
                 {structure.initialFrequency}
                 {' '}
                 KHz
               </td>
               <td data-label="Final Frequency">
                 {structure.finalFrequency}
                 {' '}
                 KHz
               </td>
               <td data-label="Increments">{structure.increments}</td>
               <td data-label="Voltage">{convertValueVoltage(structure.voltage)}</td>
               <td data-label="Options" className="options-icons">
                 <EditStructure
                   updateStructuresList={updateStructuresList}
                   updateModulesList={updateModulesList}
                   modules={modules}
                   structure={structure}
                   toast={toast}
                 />
                 <DeleteStructure
                   updateStructuresList={updateStructuresList}
                   structureId={structure._id}
                   toast={toast}
                 />
               </td>
             </tr>
           ))
        }
        </tbody>
      </>
    );
  }

  return (
    <Dashboard>
      <Container>
        <Table>
          <caption>Modules</caption>
          {modulesList}
          <tfoot>
            <tr>
              <td>
                <AddModule
                  updateModulesList={updateModulesList}
                  toast={toast}
                />
              </td>
            </tr>
          </tfoot>
        </Table>
        <Table>
          <caption>Sensors</caption>
          {sensorsList}
          <tfoot>
            <tr>
              <td>
                <AddSensor
                  updateModulesList={updateModulesList}
                  modules={modules}
                  updateSensorsList={updateSensorsList}
                  toast={toast}
                />
              </td>
            </tr>
          </tfoot>
        </Table>

        <Table>
          <caption>Structures</caption>
          {structuresList}
          <tfoot>
            <tr>
              <td>
                <AddStructure
                  updateModulesList={updateModulesList}
                  modules={modules}
                  updateStructuresList={updateStructuresList}
                  toast={toast}
                />
              </td>
            </tr>
          </tfoot>
        </Table>
      </Container>
    </Dashboard>
  );
}

export default Configuration;
