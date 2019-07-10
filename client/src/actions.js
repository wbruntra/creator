import { createAction } from 'redux-starter-kit';
import axios from 'axios';

export const updateStatus = createAction('user/status');

export const getStatus = () => dispatch => {
  return axios
    .get('/api/users/status')
    .then(({ data }) => dispatch(updateStatus(data)))
    .catch(err => {
      console.log('An error occurred');
    });
};
