import api from '../services/api';

export async function addSensor(data) {
  return api.post('/addSensor', data);
}

export async function updateSensor(sensorId, data) {
  return api.put(`/updateSensor/${sensorId}`, data);
}

export async function deleteSensor(sensorId) {
  return api.delete(`/deleteSensor/${sensorId}`);
}

export async function getSensorById(sensorId) {
  const sensor = await api.get(`/readSensor/${sensorId}`);
  return sensor;
}

export async function getSensorsByModule(moduleId) {
  return api.get(`/getSensorsByModule/${moduleId}`);
}

export async function getSensorsByUser() {
  return api.get('/getSensorsByUser/');
}
