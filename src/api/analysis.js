import api from '../services/api';

export async function addAnalysis(data) {
  return api.post('/addAnalysis/', data);
}

export async function deleteAnalysis(analysisId) {
  return api.delete(`/deleteAnalysis/${analysisId}`);
}

export async function getAnalysesByUser() {
  return api.get('/getAnalysesByUser');
}

export async function getAnalysesByModule(moduleId) {
  return api.get(`/getAnalysesByModule/${moduleId}`);
}

export async function readAnalysis(analysisId) {
  return api.get(`/readAnalysis/${analysisId}`);
}
