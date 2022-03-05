import React, { useEffect, useState } from 'react';
import { Field, Formik, Form } from 'formik';
// import { toast } from 'react-toastify';
import Dashboard from '../index';
import { Container, Row } from './styles';
import Button from '../../../components/UI/Button';
import useIsMounted from '../../../hooks/useIsMounted';
import { MetricSchema } from '../../../validation';
import { getModulesByUser } from '../../../api/module';
import { getAnalysesByModule } from '../../../api/analysis';

function Metric() {
  const isMounted = useIsMounted();
  const [modules, setModules] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [loadingAnalyses, setLoadingAnalyses] = useState(true);

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

  return (
    <Dashboard>
      <Container>
        <Formik
          initialValues={{
            module: '',
            analysis: '',
          }}
          validationSchema={MetricSchema}
          onSubmit={{}}
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
                <Button type="submit">
                  Monitor
                </Button>
              </Row>
            </Form>
          )}
        </Formik>

      </Container>
    </Dashboard>
  );
}

export default Metric;
