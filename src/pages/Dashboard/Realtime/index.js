import React, { useEffect, useState } from 'react';
import { analysisSocket } from '../../../socket';
import Dashboard from '../index';
import {
  Status, Container, Row, Info,
} from './styles';
import Button from '../../../components/UI/Button';
import Alert from '../../../components/UI/Alert';
import Badge from '../../../components/UI/Badge';
import LineChart from '../../../components/Charts/LineChart';
import useQuery from '../../../hooks/useQuery';
import api from '../../../services/api';
import convertValueVoltage from '../../../utils/convertValueVoltage';
import Loading from '../../../components/UI/Loading';
import { readAnalysis } from '../../../api/analysis';

function RealTime() {
  const [currentSensor, setCurrentSensor] = useState('Waiting...');
  const [chartData, setChartData] = useState([]);
  const [analysis, setAnalysis] = useState({});
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);
  const [status, setStatus] = useState(4);

  const query = useQuery();

  const getAnalysis = async (analysisId) => {
    await readAnalysis(analysisId).then(({ data }) => {
      setAnalysis(data);
      setLoadingAnalysis(false);
    });
  };

  const emitAnalysisData = async (analysisData) => {
    analysisSocket.emit('analysisArguments', analysisData);
  };

  const handleAddAnalysis = async () => {
    await api
      .put('/addParameters', {
        analysis: analysis._id,
      })
      .then(async ({ data }) => {
        emitAnalysisData(data.analysis);
      });
  };

  useEffect(async () => {
    const analysisQuery = query.get('analysisId');
    await getAnalysis(analysisQuery);
  }, []);

  useEffect(() => {
    analysisSocket.connect();
    analysisSocket.on('analysis', async (response) => {
      setChartData(response);
      setCurrentSensor(response.sensorId.name);
    });

    analysisSocket.on('status', async (response) => {
      setStatus(response);
    });

    return () => analysisSocket.disconnect();
  }, []);

  let statusMessage;

  switch (status) {
    case 0:
      statusMessage = <Badge type="warning" text="Status: Calibrating..." />;
      break;
    case 1:
      statusMessage = <Badge type="success" text="Status: Reading baseline" />;
      break;
    case 2:
      statusMessage = <Badge type="success" text="Status: Reading sensor" />;
      break;
    case 3:
      statusMessage = <Badge type="danger" text="Status: Analysis Finished" />;
      break;
    default:
      statusMessage = <Badge text="Status: Stopped" />;
  }

  let infoBox;

  if (loadingAnalysis) {
    infoBox = <Loading />;
  } else {
    infoBox = (
      <Row>
        <Info>
          <h3>Structure Information</h3>
          <Alert>
            <div className="structure-information">
              <p>
                <strong>Initial Frequency / Final Frequency:</strong>
                {' '}
                {analysis.structure.initialFrequency}
                {' '}
                /
                {analysis.structure.finalFrequency}
                {' '}
                KHz
              </p>
              <p>
                <strong>Increments:</strong>
                {' '}
                {analysis.structure.increments}
              </p>
              <p>
                <strong>Voltage:</strong>
                {' '}
                {convertValueVoltage(analysis.structure.voltage)}
              </p>
            </div>
          </Alert>
        </Info>
        <Info>
          <h3>Analysis Information</h3>
          <Alert>
            <div className="analysis-information">
              <p>
                <strong>Module:</strong>
                {' '}
                {analysis.module.name}
              </p>
              <p>
                <strong>Structure:</strong>
                {' '}
                {analysis.structure.name}
              </p>
              <p>
                <strong>Current Sensor:</strong>
                {' '}
                <span>{currentSensor}</span>
              </p>
            </div>
          </Alert>
        </Info>
      </Row>
    );
  }

  return (
    <Dashboard>
      <Container>
        <Status>
          <Button
            width="160px"
            onClick={handleAddAnalysis}
            disabled={status !== 4}
          >
            Start
          </Button>
          {statusMessage}
        </Status>
        {infoBox}

        <Row>
          <LineChart
            label="Real"
            xLabel="Frequency (KHz)"
            yLabel="Real Part Impedance (Ω)"
            dataset="real"
            data={chartData}
          />
          <LineChart
            label="Imaginary"
            xLabel="Frequency (KHz)"
            yLabel="Imaginary Part Impedance (Ω)"
            dataset="imaginary"
            data={chartData}
          />
        </Row>

        <Row>
          <LineChart
            label="Magnitude"
            xLabel="Frequency (KHz)"
            yLabel="Magnitude Part Impedance (Ω)"
            dataset="magnitude"
            data={chartData}
          />
          <LineChart
            label="Phase"
            xLabel="Frequency (KHz)"
            yLabel="Phase Part Impedance (Ω)"
            dataset="phase"
            data={chartData}
          />
        </Row>
      </Container>
    </Dashboard>
  );
}

export default RealTime;
