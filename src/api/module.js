import api from '../services/api';

export async function addModule(data) {
  return api.post('/addModule', data);
}

export async function updateModule(moduleId, data) {
  return api.put(`/updateModule/${moduleId}/`, data);
}

export async function deleteModule(moduleId) {
  return api.delete(`/deleteModule/${moduleId}`);
}

export async function getModulesByUser() {
  return api.get('/getModulesByUser');
}
