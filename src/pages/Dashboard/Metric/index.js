import React, { useEffect, useMemo, useState } from 'react';
import { Field, Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { metricSocket } from '../../../socket';
import Dashboard from '../index';
import { Container, Row } from './styles';
import Button from '../../../components/UI/Button';
import BarChart from '../../../components/Charts/BarChart';
import useIsMounted from '../../../hooks/useIsMounted';
import { MetricSchema } from '../../../validation';
import { getModulesByUser } from '../../../api/module';
import { getAnalysesByModule } from '../../../api/analysis';

function Metric() {
  const isMounted = useIsMounted();
  const [RMSD, setRMSD] = useState([]);
  const [CCDM, setCCDM] = useState([]);
  const [modules, setModules] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [loadingAnalyses, setLoadingAnalyses] = useState(true);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isRealTime, setIsRealTime] = useState(false);

  const updateModulesList = async () => {
    await getModulesByUser().then(({ data }) => {
      setModules(data);
      setLoadingModules(false);
    });
  };

  useEffect(() => {
    if (!isMounted) {
      updateModulesList();
    }
  }, []);

  useEffect(() => {
    metricSocket.connect();

    metricSocket.on('responseMetrics', (response) => {
      setRMSD(response.map((el) => el.rmsd));
      setCCDM(response.map((el) => el.ccdm));
    });

    metricSocket.on('metricsNotFound', (response) => {
      toast.error(response.message);
      setRMSD(response.rmsd);
      setCCDM(response.ccdm);
    });

    return () => metricSocket.disconnect();
  }, []);

  const handleMetrics = (values) => {
    metricSocket.emit('metrics', values);
    setIsMonitoring(true);
  };

  const handleStopMonitoring = () => {
    metricSocket.emit('metricsErase');
    setIsMonitoring(false);
  };

  const handleChangeDropDown = async (e) => {
    const moduleId = e.target.value;
    await getAnalysesByModule(moduleId)
      .then(({ data }) => {
        setAnalyses(data);
        setLoadingAnalyses(false);
      });
  };

  const modulesList = modules.map((module) => (
    <option key={module._id} value={module._id} label={module.name} />
  ));

  const analysesList = analyses.map((analysis) => (
    <option key={analysis._id} value={analysis._id} label={analysis.name} />
  ));

  const memoizedCCDM = useMemo(() => CCDM, [CCDM]);
  const memoizedRMSD = useMemo(() => RMSD, [RMSD]);

  return (
    <Dashboard>
      <Container>
        <Formik
          initialValues={{
            module: '',
            analysis: '',
            realtime: '',
          }}
          validationSchema={MetricSchema}
          onSubmit={(values) => handleMetrics(values)}
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
                    <option value="">Select a module</option>
                    {loadingModules ? null : modulesList}
                  </Field>
                </div>
                <div>
                  <label htmlFor="analysis">Analysis</label>
                  <Field
                    name="analysis"
                    as="select"
                    disabled={loadingAnalyses}
                  >
                    <option value="">Select an analysis</option>
                    {loadingAnalyses ? null : analysesList}
                  </Field>
                </div>
              </Row>
              <Row>
                <div className="metric__checkbox_realtime">
                  <label htmlFor="realtime" style={{ marginBottom: '0.5rem' }}>
                    Real Time Monitoring
                    <Field
                      type="checkbox"
                      name="realtime"
                      onChange={(e) => {
                        handleChange(e);
                        setIsRealTime(!isRealTime);
                      }}
                    />
                  </label>
                </div>
              </Row>
              <Row>
                <Button type="submit" disabled={isRealTime && isMonitoring}>
                  Monitor
                </Button>
                {isRealTime && (
                  <Button
                    type="button"
                    onClick={handleStopMonitoring}
                    disabled={!isMonitoring}
                  >
                    Stop Monitoring
                  </Button>
                )}
              </Row>
            </Form>
          )}
        </Formik>

        <BarChart
          data={memoizedRMSD}
          yLabel="RMSD"
          toast={toast}
          isRealTime={isRealTime}
          handleStopMonitoring={handleStopMonitoring}
        />
        <BarChart
          data={memoizedCCDM}
          yLabel="CCDM"
          toast={toast}
          isRealTime={isRealTime}
          handleStopMonitoring={handleStopMonitoring}
        />

      </Container>
    </Dashboard>
  );
}

export default Metric;
