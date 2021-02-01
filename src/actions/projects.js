import axios from 'axios';
import { SERVER_URL  } from '../config';
import { PROJECTS_GET_PROJECTS, PROJECTS_RES } from './types';

export const getProjects = (callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      SERVER_URL + '/api/projects?token='+token
    );

    if(response.data.success){
      dispatch({ type: PROJECTS_GET_PROJECTS, payload: response.data.data });
      callback(response.data.data);
    }else{
      dispatch({ type: PROJECTS_RES, payload: {success: false, message: "Unknown problem with ajax, while get projects 0"} });
    }

  } catch(e){
     dispatch({ type: PROJECTS_RES, payload: {success: false, message: "Unknown problem with ajax, while get projects"} });
  }
};


export const saveProject = (project, callback) => async  dispatch => {

  const token = localStorage.getItem('token');

  try {
    let response = null;
    if( project.id ){
      response = await axios.put(
        SERVER_URL + '/api/projects/'+project.id+'?token='+token,
        project
      );
    }else{
      response = await axios.post(
        SERVER_URL + '/api/projects?token='+token,
        project
      );
    }

    if(!response.data.success){
      dispatch({ type: PROJECTS_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: PROJECTS_RES, payload: {success: true, message: "Data was saved"} });
      //dispatch({ type: PROJECTS_SAVE_PROJECT, payload: project });
      callback();
    }

  } catch (e) {
     console.log('___probem with ajax______', e);
     dispatch({ type: PROJECTS_RES, payload: {success: false, message: "Unknown problem with ajax, while save pproject"} });
  }
};


export const saveTask = (task, callback) => async  dispatch => {

  const token = localStorage.getItem('token');

  try {
    let response = null;
    if( task.id ){
      response = await axios.put(
        SERVER_URL + '/api/tasks/'+task.id+'?token='+token,
        task
      );
    }else{
      response = await axios.post(
        SERVER_URL + '/api/tasks?token='+token,
        task
      );
    }

    if(!response.data.success){
      dispatch({ type: PROJECTS_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: PROJECTS_RES, payload: {success: true, message: "Data was saved"} });
      //dispatch({ type: PROJECTS_SAVE_PROJECT, payload: task });
      callback();
    }

  } catch (e) {
     console.log('___probem with ajax______', e);
     dispatch({ type: PROJECTS_RES, payload: {success: false, message: "Unknown problem with ajax, while save task"} });
  }
};

export const deleteProject = (projectId, callback) =>  async dispatch => {

  const token = localStorage.getItem('token');

  try{
    const response = await axios.delete(
      SERVER_URL + '/api/projects/'+projectId+'?token='+token
    );

    if(!response.data.success){
      dispatch({ type: PROJECTS_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: PROJECTS_RES, payload: {success: true, message: "Data was saved"} });
      callback();
    }

  } catch(e){
     dispatch({ type: PROJECTS_RES, payload: {success: false, message: "Unknown problem with ajax, while deleteing proj"} });
  }
}


export const deleteTask = (taskId, callback) =>  async dispatch => {

  const token = localStorage.getItem('token');

  try{
    const response = await axios.delete(
      SERVER_URL + '/api/tasks/'+taskId+'?token='+token
    );

    if(!response.data.success){
      dispatch({ type: PROJECTS_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: PROJECTS_RES, payload: {success: true, message: "Data was saved"} });
      callback();
    }

  } catch(e){
     dispatch({ type: PROJECTS_RES, payload: {success: false, message: "Unknown problem with ajax, while deleteing task"} });
  }
}
