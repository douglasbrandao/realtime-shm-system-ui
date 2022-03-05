import api from '../services/api';

export async function addStructure(data) {
  return api.post('/addStructure/', data);
}

export async function updateStructure(structureId, data) {
  return api.put(`/updateStructure/${structureId}/`, data);
}

export async function deleteStructure(structureId) {
  return api.delete(`/deleteStructure/${structureId}`);
}

export async function getStructureById(structureId) {
  return api.get(`readStructure/${structureId}`);
}

export async function getStructuresByModule(moduleId) {
  return api.get(`/getStructuresByModule/${moduleId}`);
}

export async function getStructuresByUser() {
  return api.get('/getStructuresByUser/');
}
