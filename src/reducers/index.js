import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import projects from './projects';
import users from './users';

export default combineReducers({
  auth,
  users,
  projects,
  form: formReducer
});
