import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39176406-c12c047aa6bfb11d5ee548958';

export async function getFetch() {
  const responce = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: 'cat',
      page: 1,
      per_page: 12
    },
  });
  return responce.data;
}

