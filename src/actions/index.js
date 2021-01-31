import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from '../actions/types';
import { SERVER_URL } from '../config';


export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      SERVER_URL+'/api/login',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.data.token });
    localStorage.setItem('token', response.data.data.token);


    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = ( callback ) => dispatch => {
  localStorage.removeItem('token');

  dispatch({ type: AUTH_USER, payload: '' });
  callback();
};
