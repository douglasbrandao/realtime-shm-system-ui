import api from '../services/api';

async function addDamage(data) {
  return api.post('/addDamage/', data);
}

export default addDamage;
