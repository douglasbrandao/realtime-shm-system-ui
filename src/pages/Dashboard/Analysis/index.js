import React, { useEffect, useState } from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import Dashboard from '../index';
import Container from './styles';
import {
  AddAnalysis,
  DeleteAnalysis,
} from '../../../components/Analysis/Analyses';
import Table from '../../../components/UI/Table';
import Loading from '../../../components/UI/Loading';
import useIsMounted from '../../../hooks/useIsMounted';
import { getAnalysesByUser } from '../../../api/analysis';
import { getModulesByUser } from '../../../api/module';
import { getSensorsByModule } from '../../../api/sensor';
import { getStructuresByModule } from '../../../api/structure';

function Analysis() {
  const [analyses, setAnalyses] = useState([]);
  const [modules, setModules] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [structures, setStructures] = useState([]);
  const [loadingAnalyses, setLoadingAnalyses] = useState(true);
  const isMounted = useIsMounted();

  const updateAnalysesList = async () => {
    await getAnalysesByUser().then(({ data }) => {
      setAnalyses(data);
      setLoadingAnalyses(false);
    });
  };

  const updateModulesList = async () => {
    await getModulesByUser().then(({ data }) => {
      setModules(data);
    });
  };

  const updateSensorsList = async (moduleId) => {
    await getSensorsByModule(moduleId).then(({ data }) => {
      setSensors(data);
    });
  };

  const updateStructuresList = async (moduleId) => {
    await getStructuresByModule(moduleId).then(({ data }) => {
      setStructures(data);
    });
  };

  useEffect(() => {
    if (!isMounted) {
      updateAnalysesList();
    }
  }, []);

  let analysesList;

  if (loadingAnalyses) {
    analysesList = (
      <thead>
        <tr>
          <th>
            <Loading />
          </th>
        </tr>
      </thead>
    );
  } else if (analyses.length === 0) {
    analysesList = (
      <tbody>
        <tr>
          <td>
            <p>There are no analyses created so far.</p>
          </td>
        </tr>
      </tbody>
    );
  } else {
    analysesList = (
      <>
        <thead>
          <tr>
            <th>Name</th>
            <th>Module</th>
            <th>Structure</th>
            <th>Baseline</th>
            <th>Sensors</th>
            <th>Sweep</th>
            <th>Created</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {analyses.map(({
            _id, name, module, structure, baseline, sensors, sweep, createdAt,
          }) => (
            <tr key={_id}>
              <td data-label="Name">{name}</td>
              <td data-label="Module">{module.name}</td>
              <td data-label="Structure">{structure.name}</td>
              <td data-label="Baseline">{baseline.sensorId.name}</td>
              <td data-label="Sensors">{sensors.map((sensor) => sensor.sensorId.name).join(', ')}</td>
              <td data-label="Sweep" style={{ textTransform: 'capitalize' }}>{sweep}</td>
              <td data-label="Created">{moment(createdAt).format('DD/MM/YYYY')}</td>
              <td data-label="Options" className="options-icons">
                <Link
                  to={{
                    pathname: '/realtime',
                    search: `?analysisId=${_id}`,
                  }}
                  target="_blank"
                  className="options-buttons"
                >
                  <MdRemoveRedEye />
                </Link>
                <DeleteAnalysis
                  analysisId={_id}
                  analyses={analyses}
                  setAnalyses={setAnalyses}
                  toast={toast}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }

  return (
    <Dashboard>
      <Container>
        <Table>
          <caption>Analyses</caption>
          {analysesList}
          <tfoot>
            <tr>
              <td>
                <AddAnalysis
                  modules={modules}
                  sensors={sensors}
                  structures={structures}
                  updateAnalysesList={updateAnalysesList}
                  updateModulesList={updateModulesList}
                  updateSensorsList={updateSensorsList}
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

export default Analysis;
