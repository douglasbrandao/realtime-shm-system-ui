import api from '../services/api';

export async function addBaseline(data) {
  return api.post('/addBaseline', data);
}

export async function deleteBaseline(baselineId) {
  return api.delete(`/deleteBaseline/${baselineId}`);
}

export async function getBaselinesByUser() {
  return api.get('/getBaselinesByUser');
}
