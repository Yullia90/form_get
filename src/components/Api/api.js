import axios from 'axios';
import { API_KEY } from '../../key/pixabay-key';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImage = async (search, pageNum) => {
  const response = await axios.get('', {
    params: {
      key: API_KEY,
      q: search,
      page: pageNum,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return response.data;
};
