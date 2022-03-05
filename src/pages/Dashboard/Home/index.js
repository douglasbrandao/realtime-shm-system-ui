import React, { useEffect, useState } from 'react';
import {
  MdDeviceHub,
  MdWifi,
  MdShowChart,
  MdDashboard,
  MdAccessTime,
} from 'react-icons/md';
import { FiCalendar } from 'react-icons/fi';
import moment from 'moment';
import Dashboard from '../index';
import { Container, Card } from './styles';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import Smile from '../../../assets/smile.png';
import Loading from '../../../components/UI/Loading';
import Table from '../../../components/UI/Table';

function Home() {
  const { user } = useAuth();
  const [info, setInfo] = useState([]);

  useEffect(async () => {
    await api.get('/dashboard')
      .then((response) => {
        setInfo(response.data);
      });
  }, []);

  let damagesList;

  if (!info.damages) {
    damagesList = (
      <thead>
        <tr>
          <th>
            <Loading />
          </th>
        </tr>
      </thead>
    );
  } else if (info.damages.length === 0) {
    damagesList = (
      <tbody>
        <tr>
          <td>
            <p>There are no damages recorded so far.</p>
          </td>
        </tr>
      </tbody>
    );
  } else {
    damagesList = (
      <>
        <thead>
          <tr>
            <th>Module</th>
            <th>Sensor</th>
            <th>
              <FiCalendar style={{ marginRight: '.25rem' }} />
              Day
            </th>
            <th>
              <MdAccessTime style={{ marginRight: '.25rem' }} />
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {info.damages.map((damage) => (
            <tr key={damage._id}>
              <td data-label="Module">{damage.sensor.module.name}</td>
              <td data-label="Sensor">{damage.sensor.name}</td>
              <td data-label="Day">
                {moment(damage.date).format('DD/MM/YYYY')}
              </td>
              <td data-label="Time">
                {moment(damage.date).format('HH:mm:ss')}
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }

  return (
    <Dashboard>
      <Card style={{
        width: '90%', marginTop: '3rem', alignItems: 'flex-start', padding: '2rem',
      }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
          <span style={{ fontSize: '2rem' }}>
            Welcome,
            {' '}
            <strong>
              {user.username}
              !
            </strong>
          </span>
          <img src={Smile} alt="Smile" />
        </div>
        <p style={{ marginTop: '0.75rem', fontSize: '1.175rem', color: 'var(--text-email)' }}>
          Take a look on the latest updated information down below
        </p>
      </Card>
      <Container>
        <Card>
          <div className="dashboard__items">
            <div className="outer-svg">
              <MdDeviceHub />
            </div>
            <div className="info">
              <span className="info__title">Modules</span>
              <span className="info__total">{ info.modules }</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="dashboard__items">
            <div className="outer-svg">
              <MdDashboard />
            </div>
            <div className="info">
              <span className="info__title">Structures</span>
              <span className="info__total">{ info.structures }</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="dashboard__items">
            <div className="outer-svg">
              <MdWifi />
            </div>
            <div className="info">
              <span className="info__title">Sensors</span>
              <span className="info__total">{ info.sensors }</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="dashboard__items">
            <div className="outer-svg">
              <MdShowChart />
            </div>
            <div className="info">
              <span className="info__title">Analyses</span>
              <span className="info__total">{ info.analyses }</span>
            </div>
          </div>
        </Card>
        <div style={{ gridColumn: 'span 4' }}>
          <Table>
            <caption style={{ marginBottom: '1rem' }}>
              Last 5 damage records
            </caption>
            {damagesList}
          </Table>
        </div>
      </Container>
    </Dashboard>
  );
}

export default Home;
